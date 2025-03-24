'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath } from 'next/cache'
import { ActionState } from '@/types/actions'

export async function deleteInvitation(id: string): Promise<ActionState<void>> {
  try {
    const response = await api.delete(`/convites/${id}/`)

    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    revalidatePath('/admin/acessos/convites')
    return { data: undefined }
  } catch (error) {
    console.error(error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
