'use server'

import { api } from '@/lib/server-api'
import { ActionState, DjangoError } from '@/types/actions'
import { revalidatePath } from 'next/cache'

interface UpdateInviteLinkParams {
  identificador: string
}

export async function updateInviteLink(
  id: string,
  data: UpdateInviteLinkParams
): Promise<ActionState<null>> {
  try {
    const response = await api.put(`/convites/${id}/`, {
      body: data
    })
    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    revalidatePath('/admin/acessos/convites')
    return { data: null }
  } catch (error: any) {
    return { data: null, error: error.response?.data }
  }
}
