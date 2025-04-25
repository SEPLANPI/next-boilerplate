import { NextRequest, NextResponse } from 'next/server'
import { BaseUser } from '@/types/auth'
import { auth } from '@/auth'
import { env } from '@/config/env'
import { routingConfig } from '@/config/routing'
import { cookies } from 'next/headers'
import { getEvents } from '@/api/get-events'
import { buildErrorMessage } from '@/utils/format-django-errors'

type Event = {
  id: string
  evento_finalizado: boolean
  inicio_inscricao: string
}
type RedirectResult = { url: string; eventId?: string }

const createRedirectUrl = (path: string, request: NextRequest): URL =>
  new URL(`${env.APP_URL}${path}`, request.url)

const createErrorRedirect = (
  message: string,
  request: NextRequest
): NextResponse =>
  NextResponse.redirect(createRedirectUrl(`/error?message=${message}`, request))

const findActiveEvent = (events: Event[]) =>
  events
    .filter((e) => !e.evento_finalizado)
    .sort(
      (a, b) =>
        new Date(a.inicio_inscricao).getTime() -
        new Date(b.inicio_inscricao).getTime()
    )[0]

const findLastFinalizedEvent = (events: Event[]) =>
  events
    .filter((e) => e.evento_finalizado)
    .sort(
      (a, b) =>
        new Date(b.inicio_inscricao).getTime() -
        new Date(a.inicio_inscricao).getTime()
    )[0]

const getRedirectForRole = (
  user: BaseUser,
  eventId: string
): RedirectResult => {
  if (user.roles.includes('admin')) {
    return { url: `/${eventId}/admin/visao-geral`, eventId }
  }
  if (user.roles.includes('advisor')) {
    return { url: '/conselheiros/dados', eventId }
  }
  return {
    url: routingConfig.defaults.redirects.defaultAccessDeniedPath,
    eventId
  }
}

const selectEvent = (events: Event[]): Event | null => {
  const activeEvent = findActiveEvent(events)
  return activeEvent || findLastFinalizedEvent(events)
}

export async function GET(request: NextRequest) {
  const session = await auth()
  const user = session?.user as BaseUser | undefined

  if (!user) {
    return NextResponse.redirect(
      createRedirectUrl(
        '/api/auth/sign-in?redirectTo=/api/auth/role-redirect',
        request
      )
    )
  }

  const cookieStore = cookies()
  let eventId = cookieStore.get('selectedEventId')?.value

  if (!eventId) {
    const { data: events, error } = await getEvents()

    if (error) {
      return createErrorRedirect(
        buildErrorMessage(error) || 'Erro ao carregar eventos',
        request
      )
    }

    if (!events?.length) {
      return createErrorRedirect('Nenhum evento disponível', request)
    }

    const selectedEvent = selectEvent(events)
    if (!selectedEvent) {
      return createErrorRedirect('Nenhum evento encontrado', request)
    }

    eventId = selectedEvent.id
    cookieStore.set('selectedEventId', eventId)
  }

  const { url } = getRedirectForRole(user, eventId)
  return NextResponse.redirect(createRedirectUrl(url, request))
}
