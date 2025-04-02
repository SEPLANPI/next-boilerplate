'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { revalidatePath, revalidateTag } from 'next/cache'
import { ActionState, DjangoError } from '@/types/actions'
import console from 'console'

type ValidateCounselorInput = {
  counselorId: string
  status: 'APROVADO' | 'REJEITADO'
  motivo_rejeicao?: string
}

export async function validateCounselor(
  input: ValidateCounselorInput
): Promise<ActionState<null>> {
  try {
    const response = await api.post(`/validacao-conselheiro/`, {
      body: {
        conselheiro_id: input.counselorId,
        status: input.status,
        motivo_rejeicao: input.motivo_rejeicao
      }
    })

    if (!response.ok) {
      const error: DjangoError = await response.json()

      return { error }
    }

    revalidatePath(`/admin/acessos/cadastros/${input.counselorId}`)

    return { data: null }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
