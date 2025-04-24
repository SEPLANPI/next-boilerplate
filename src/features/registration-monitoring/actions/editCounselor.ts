'use server'
import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ActionState, DjangoError } from '@/types/actions'
import { revalidatePath } from 'next/cache'

export async function editAdminCounselor(
  input: FormData,
  id: string | undefined
): Promise<ActionState<{ success: boolean }>> {
  try {
    const response = await api.put(`/conselheiros/${id}/atualizar/`, {
      contentType: 'form-data',
      body: input
    })

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    revalidatePath(`/admin/conselheiros/cadastros/${id}/dados`)

    return { data: { success: true } }
  } catch (error) {
    console.error('Error registering counselor:', error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}

export async function editCounselor(
  input: FormData
): Promise<ActionState<{ success: boolean }>> {
  try {
    const response = await api.put(`/atualizar-meus-dados/`, {
      contentType: 'form-data',
      body: input
    })

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    revalidatePath(`/conselheiros/dados`)

    return { data: { success: true } }
  } catch (error) {
    console.error('Error registering counselor:', error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
