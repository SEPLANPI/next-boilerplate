'use server'

import { getActiveEvent } from '@/api/get-active-event'
import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ActionState, DjangoError } from '@/types/actions'

export async function registerPerson(
  input: any
): Promise<ActionState<{ success: boolean }>> {
  try {
    const result = await getActiveEvent()

    if (result.error) {
      return { error: result.error }
    }

    const event = result.data

    console.log(event)

    console.log({
      ...input,
      evento_id: event?.id,
      cadastrado_presencialmente: false
    })

    const response = await api.post('/pessoas/', {
      body: {
        ...input,
        evento_id: event?.id,
        cadastrado_presencialmente: false
      }
    })

    if (!response.ok) {
      const error: DjangoError = await response.json()

      console.log(error)
      return { error }
    }

    return { data: { success: true } }
  } catch (error) {
    console.error('Erro ao registrar pessoa:', error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
