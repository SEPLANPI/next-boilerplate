'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath, revalidateTag } from 'next/cache'
import { ActionState } from '@/types/actions'
import { Event } from '../types'

type UpdateEventInput = {
  id: number
  editado: boolean
  nome: string
  descricao?: string
  data?: string
  local: string | null
  municipio_id?: string | null
  categoria?: string | null
  natureza_gasto?: string[]
}

export async function updateEvent(
  input: UpdateEventInput
): Promise<ActionState<Event>> {
  try {
    const response = await api.patch(`/eventos/${input.id}/`, {
      body: input
    })

    console.log(input)

    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: Event = await response.json()
    revalidatePath('/')
    revalidatePath(`/${input.id}`)
    revalidateTag('events-quantities')
    return { data }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
