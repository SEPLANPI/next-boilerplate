'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath } from 'next/cache'
import { ActionState, DjangoError } from '@/types/actions'

export async function deleteInvitation(id: string): Promise<ActionState<void>> {
  try {
    const response = await api.delete(`/convites/${id}/`)

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    revalidatePath('/admin/convites')
    return { data: undefined }
  } catch (error) {
    console.error(error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
