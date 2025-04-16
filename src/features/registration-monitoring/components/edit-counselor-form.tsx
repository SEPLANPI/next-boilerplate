'use client'

import { API } from '@/constants/messages'
import { CounselorInfo } from '@/features/counselors/types'
import { AddressType } from '@/features/register-counselor/types/counselor'
import { dayjs } from '@/lib/dayjs'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { editAdminCounselor, editCounselor } from '../actions/editCounselor'
import { BaseEditCounselorForm, FormValues } from './base-edit-counselor-form'

interface EditCounselorFormProps {
  id: string
  counselor: CounselorInfo | undefined
  isSubmitting?: boolean
  admin?: boolean
  setIsSubmitting: (isSubmitting: boolean) => void
  onComplete?: (success: boolean) => void
}

export function EditCounselorForm({
  id,
  counselor,
  onComplete,
  isSubmitting,
  admin = true,
  setIsSubmitting
}: EditCounselorFormProps) {
  const [error, setError] = useState<string>()

  async function handleSubmit(values: FormValues) {
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append('nome', values.nome)
      formData.append('cpf', values.cpf)
      formData.append('pessoa_id', counselor?.id || '')
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
        formData.append('banco_cpf_titular', counselor?.cpf || '')

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

      if (admin) {
        const { error } = await editAdminCounselor(formData, counselor?.id)
        if (error) {
          notifications.show({
            message: 'Falha ao editar conselheiro: ' + error,
            title: 'Erro',
            color: 'red'
          })
          setError(API.UNEXPECTED_FETCH_ERROR)
          onComplete?.(false)
          return
        }
      } else {
        const { error } = await editCounselor(formData)
        if (error) {
          notifications.show({
            message: 'Falha ao editar conselheiro: ' + error,
            title: 'Erro',
            color: 'red'
          })
          setError(API.UNEXPECTED_FETCH_ERROR)
          onComplete?.(false)
          return
        }
      }

      setIsSubmitting(false)
      notifications.show({
        title: 'Sucesso',
        message: 'Conselheiro editado com sucesso',
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
      counselor={counselor}
      error={error}
      isSubmitting={isSubmitting}
    />
  )
}
