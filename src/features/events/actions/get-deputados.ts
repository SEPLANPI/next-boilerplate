'use server'

import { api } from '@/lib/api'
import { ActionState } from '@/types/actions'

type Deputado = {
  nome: string
}
export async function getDeputados(): Promise<ActionState<Deputado[]>> {
  const response = await api.get('/deputados')
  if (!response.ok) {
    const error = await response.json()
    return { error: (error.detail as string) || 'Ocorreu um erro inesperado.' }
  }

  const data: Deputado[] = await response.json()

  return { data }
}
