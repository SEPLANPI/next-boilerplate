'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ActionState } from '@/types/actions'
import { Deputy } from '../types'
import { revalidatePath } from 'next/cache'

export async function updateDeputy(
  id: number,
  formData: FormData
): Promise<ActionState<Deputy>> {
  try {
    const response = await api.patch(`/deputados/${id}/`, {
      body: formData,
      contentType: 'form-data'
    })

    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: Deputy = await response.json()
    revalidatePath('/deputados')
    revalidatePath(`/deputados/${id}`)
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
