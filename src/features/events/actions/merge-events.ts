'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath, revalidateTag } from 'next/cache'
import { ActionState } from '@/types/actions'
import { Event } from '../types'

type MergeEventsInput = {
  eventos_ids: number[]
  editado: boolean
  nome: string
  descricao?: string
  data?: string
  local: string | null
  municipio?: string | null
  categoria?: string | null
  contratos_naturezas: {
    id: number
    naturezas_gasto: string[]
  }[]
}

export async function mergeEvents(
  input: MergeEventsInput
): Promise<ActionState<number>> {
  try {
    const response = await api.post(`/eventos/merge/`, {
      body: input
    })

    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: { id: number } = await response.json()
    revalidatePath('/')
    revalidateTag('events-quantities')
    return { data: data.id }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
