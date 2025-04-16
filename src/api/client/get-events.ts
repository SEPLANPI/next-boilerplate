'use client'

import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'
import { DjangoError } from '@/types/actions'
import { buildErrorMessage } from '@/utils/format-django-errors'

export type Event = {
  id: string
  nome: string
  evento_finalizado: boolean
  inicio_inscricao: string
  fim_inscricao: string
}

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await clientApi.get(`/eventos/`)

    if (!response.ok) {
      const error: DjangoError = await response.json()
      throw new Error(buildErrorMessage(error))
    }

    const data: Event[] = await response.json()
    return data
  } catch (error) {
    throw new Error(API.UNEXPECTED_FETCH_ERROR)
  }
}
