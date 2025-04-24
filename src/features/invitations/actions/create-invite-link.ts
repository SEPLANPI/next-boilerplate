'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath } from 'next/cache'
import { ActionState, DjangoError } from '@/types/actions'
import { cookies } from 'next/headers'

type CreateInviteLinkInput = {
  identificador: string
}

export async function createInviteLink(
  input: CreateInviteLinkInput
): Promise<ActionState<{ token: string }>> {
  const cookieStore = cookies()
  const eventId = cookieStore.get('selectedEventId')?.value

  if (!eventId) {
    return { error: 'Evento não selecionado' }
  }

  try {
    const response = await api.post(`/convites/`, {
      body: {
        ...input,
        evento_id: eventId
      }
    })

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: { token: string } = await response.json()
    revalidatePath('/admin/convites')
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
