'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ActionState } from '@/types/actions'
import { PoliticalParty } from '../types'
import { revalidatePath } from 'next/cache'

export async function updatePoliticalParty(
  id: number,
  formData: FormData
): Promise<ActionState<PoliticalParty>> {
  try {
    const response = await api.patch(`/partidos/${id}/`, {
      body: formData,
      contentType: 'form-data'
    })

    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: PoliticalParty = await response.json()
    revalidatePath('/partidos')
    revalidatePath(`/partidos/${id}`)
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
