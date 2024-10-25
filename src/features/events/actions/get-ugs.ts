'use server'

import { api } from '@/lib/api'

type Ug = {
  number: number
  name: string
  sigla: string
}

type Response =
  | {
      data: Ug[]
      error?: undefined
    }
  | {
      error: string
      data?: undefined
    }

export async function getUgs(): Promise<Response> {
  const response = await api.get('/ugs')
  if (!response.ok) {
    const error = await response.json()
    return { error: (error.detail as string) || 'Ocorreu um erro inesperado.' }
  }

  const data: Ug[] = await response.json()

  return { data }
}
