'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath } from 'next/cache'
import { ActionState } from '@/types/actions'

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
      console.log(await response.text())
      const error = await response.json()
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: { token: string } = await response.json()
    revalidatePath('/admin/acessos/convites')
    return { data }
  } catch (error) {
    console.log(error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
