'use server'

import { api } from '@/lib/api'
import { ActionState } from '@/types/actions'

type Ug = {
  number: number
  name: string
  sigla: string
}
export async function getUgs(): Promise<ActionState<Ug[]>> {
  const response = await api.get('/ugs')
  if (!response.ok) {
    const error = await response.json()
    return { error: (error.detail as string) || 'Ocorreu um erro inesperado.' }
  }

  const data: Ug[] = await response.json()

  return { data }
}
