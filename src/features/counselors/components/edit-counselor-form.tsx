'use client'

import { API } from '@/constants/messages'
import { Person } from '@/features/general-registration/types'
import { AddressType } from '@/features/register-counselor/types/counselor'
import { dayjs } from '@/lib/dayjs'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { BaseEditCounselorForm, FormValues } from './base-edit-counselor-form'

interface EditCounselorFormProps {
  id: string
  person: Person | null
  onComplete?: (success: boolean) => void
}

export function EditCounselorForm({
  id,
  person,
  onComplete
}: EditCounselorFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values: FormValues) {
    try {
      setIsSubmitting(true)
      //   const { error } = await updateInviteLink(invitation.id, values)

      //   if (error) {
      //     setIsSubmitting(false)
      //     setError(buildErrorMessage(error))
      //     onComplete?.(false)
      //     return
      //   }
      const formData = new FormData()
      formData.append('id', person?.id || '')
      formData.append('nome', values.nome)
      formData.append('cpf', values.cpf)
      formData.append('pessoa_id', person?.id || '')
      formData.append('rg', values.rg)
      formData.append('telefone', values.telefone)
      formData.append('email', values.email)
      formData.append(
        'data_nascimento',
        dayjs(values.data_nascimento).format('YYYY-MM-DD')
      )

      formData.append('endereco_tipo_zona', values.endereco.tipo_endereco)
      formData.append('endereco_cep', values.endereco.cep)
      formData.append('endereco_municipio', values.endereco.municipio_id)

      if (values.endereco.tipo_endereco === AddressType.URBAN) {
        formData.append('endereco_logradouro', values.endereco.rua)
        formData.append('endereco_numero', values.endereco.numero)
        formData.append(
          'endereco_complemento',
          values.endereco.complemento || ''
        )
        formData.append('endereco_bairro', values.endereco.bairro)
      }

      if (values.endereco.tipo_endereco === AddressType.RURAL) {
        formData.append('endereco_referencia', values.endereco.referencia)
      }

      formData.append('tipo_membro', values.tipo_membro)
      formData.append('conselho_id', values.conselho_id)
      formData.append(
        'poder_publico',
        values.tipo_conselho === 'PODER_PUBLICO' ? 'true' : 'false'
      )
      formData.append('ajuda_custo', values.ajuda_custo ? 'true' : 'false')

      if (values.ajuda_custo && values.tipo_conselho === 'SOCIEDADE_CIVIL') {
        formData.append('banco_id', values.banco_id || '')
        formData.append('banco_agencia', values.agencia || '')
        formData.append('banco_conta', values.conta || '')
        formData.append('banco_nome_titular', values.nome_titular || '')
        formData.append('banco_cpf_titular', person?.cpf || '')

        if (values.comprovante_residencia instanceof File) {
          formData.append(
            'comprovante_residencia',
            values.comprovante_residencia
          )
        }
        if (values.comprovante_conselho instanceof File) {
          formData.append('comprovante_conselho', values.comprovante_conselho)
        }
        if (values.comprovante_bancario instanceof File) {
          formData.append('comprovante_bancario', values.comprovante_bancario)
        }
      }
      setIsSubmitting(false)
      notifications.show({
        message: 'Convite atualizado com sucesso',
        color: 'green'
      })
      setError('')
      onComplete?.(true)
    } catch (error) {
      setError(API.UNEXPECTED_FETCH_ERROR)
      onComplete?.(false)
    }
  }

  return (
    <BaseEditCounselorForm
      id={id}
      onSubmit={handleSubmit}
      person={person}
      error={error}
      isSubmitting={isSubmitting}
    />
  )
}
