import { NextRequest, NextResponse } from 'next/server'
import { BaseUser } from '@/types/auth'
import { auth } from '@/auth'
import { env } from '@/config/env'
import { routingConfig } from '@/config/routing'
import { cookies } from 'next/headers'
import { getEvents } from '@/api/get-events'

export async function GET(request: NextRequest) {
  const session = await auth()
  const user = session?.user as BaseUser | undefined

  if (!user) {
    return NextResponse.redirect(
      new URL(
        `${env.APP_URL}/api/auth/sign-in?redirectTo=/api/auth/role-redirect`,
        request.url
      )
    )
  }

  const cookieStore = cookies()
  let eventId = cookieStore.get('selectedEventId')?.value

  if (!eventId) {
    const { data: events, error } = await getEvents()
    if (!error && events) {
      const activeEvent = events
        .filter((e) => !e.evento_finalizado)
        .sort(
          (a, b) =>
            new Date(a.inicio_inscricao).getTime() -
            new Date(b.inicio_inscricao).getTime()
        )[0]

      if (activeEvent) {
        eventId = activeEvent.id
        cookieStore.set('selectedEventId', eventId)
      }
    }
  }

  if (user.roles.includes('admin')) {
    return NextResponse.redirect(
      new URL(
        `${env.APP_URL}/${eventId}/admin/acessos/visao-geral`,
        request.url
      )
    )
  }

  if (user.roles.includes('advisor')) {
    return NextResponse.redirect(
      new URL(`${env.APP_URL}/conselheiros/dados`, request.url)
    )
  }

  return NextResponse.redirect(
    new URL(
      `${env.APP_URL}${routingConfig.defaults.redirects.defaultAccessDeniedPath}`,
      request.url
    )
  )
}
