'use server'

import { api } from '@/lib/server-api'
import { ActionState, DjangoError } from '@/types/actions'
import { redirect } from 'next/navigation'

interface VerifyCPFInput {
  cpf: string
}

type VerifyCPFOutput = {
  inscricao_id: string
}

export async function verifyCPF(
  input: VerifyCPFInput
): Promise<ActionState<never>> {
  const response = await api.post('/votacao/validar_cpf/', {
    body: input
  })

  if (!response.ok) {
    const error: DjangoError = await response.json()
    return { error }
  }

  const data: VerifyCPFOutput = await response.json()

  redirect(`/votacao/${data.inscricao_id}`)
}
