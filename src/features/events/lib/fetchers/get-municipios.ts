'use server'

import { api } from '@/lib/server-api'
import { ActionState } from '@/types/actions'

type Municipio = {
  id: number
  nome: string
}
export async function getMunicipios(): Promise<ActionState<Municipio[]>> {
  const response = await api.get('/municipios')
  if (!response.ok) {
    const error = await response.json()
    return { error: (error.detail as string) || 'Ocorreu um erro inesperado.' }
  }

  const data = await response.json()
  const municipios: Municipio[] = data.results

  return { data: municipios }
}
