'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath } from 'next/cache'
import { ActionState } from '@/types/actions'
import { Event } from '../types'

type UpdateEventInput = {
  id: number
  nome: string
  descricao?: string
  data?: string
  local?: string
  municipio_id?: string | null
}

export async function updateEvent(
  input: UpdateEventInput
): Promise<ActionState<Event>> {
  try {
    const response = await api.patch(`/eventos/${input.id}/`, {
      body: input
    })

    if (!response.ok) {
      const error = await response.json()
      console.log(error)
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: Event = await response.json()
    revalidatePath('/')
    return { data }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
