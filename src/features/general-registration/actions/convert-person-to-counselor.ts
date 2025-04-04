'use server'
import { api } from '@/lib/server-api'
import { ActionState, DjangoError } from '@/types/actions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function convertPersonToCounselor(
  input: FormData
): Promise<ActionState<never>> {
  const response = await api.post('/conversao-pessoa-conselheiro/', {
    contentType: 'form-data',
    body: input
  })

  if (!response.ok) {
    const error: DjangoError = await response.json()
    console.log(error)
    return { error }
  }

  const data: { id: string } = await response.json()

  revalidatePath('/admin/acessos/conselheiros')
  revalidatePath('/admin/acessos/inscricoes-gerais')
  redirect(`/admin/acessos/conselheiros/${data.id}/dados`)
}
