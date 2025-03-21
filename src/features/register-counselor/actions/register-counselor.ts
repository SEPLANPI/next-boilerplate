'use server'
import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ActionState } from '@/types/actions'
import { redirect } from 'next/navigation'

export async function registerCounselor(
  input: FormData
): Promise<ActionState<never>> {

  const response = await api.post('/conselheiros/', {
    contentType: 'form-data',
    body: input
  })

  if (!response.ok) {
    const error = await response.json()
    console.log(error)
    return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
  }

  redirect('/conselheiros/cadastro/sucesso/')
}
