'use server'
import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ActionState, DjangoError } from '@/types/actions'
import { revalidatePath } from 'next/cache'

export async function registerCounselor(
  input: FormData
): Promise<ActionState<{ success: boolean }>> {
  try {
    const response = await api.post('/conselheiros/', {
      contentType: 'form-data',
      body: input
    })

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    revalidatePath('/admin/acessos/conselheiros')
    revalidatePath('/admin/acessos/convites')

    return { data: { success: true } }
  } catch (error) {
    console.error('Error registering counselor:', error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
