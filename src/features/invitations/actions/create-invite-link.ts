'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath } from 'next/cache'
import { ActionState, DjangoError } from '@/types/actions'

type CreateInviteLinkInput = {
  identificador: string
}

export async function createInviteLink(
  input: CreateInviteLinkInput
): Promise<ActionState<{ token: string }>> {
  try {
    const response = await api.post(`/convites/`, {
      body: input
    })

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: { token: string } = await response.json()
    revalidatePath('/admin/acessos/convites')
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
