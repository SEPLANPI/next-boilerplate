'use client'

import { BasePoliticalPartyForm } from './base-political-party-form'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { createPoliticalParty } from '../actions/create-political-party'

interface CreatePoliticalPartyFormProps {
  id: string
  onComplete?: (success: boolean) => void
  onSubmit?: () => void
}

export function CreatePoliticalPartyForm({
  id,
  onComplete,
  onSubmit
}: CreatePoliticalPartyFormProps) {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(values: {
    nome: string
    sigla: string
    foto: File | null
  }) {
    onSubmit?.()
    try {
      const formData = new FormData()
      formData.append('nome', values.nome)
      formData.append('sigla', values.sigla)
      if (values.foto) {
        formData.append('foto', values.foto)
      }

      const { error } = await createPoliticalParty(formData)

      if (error) {
        setError('Não foi possível criar o partido. Tente novamente.')
        onComplete?.(false)
        return
      }

      notifications.show({
        title: 'Partido criado',
        message: 'O partido foi criado com sucesso',
        color: 'green'
      })

      onComplete?.(true)
      setError(null)
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.')
      onComplete?.(false)
    }
  }

  return (
    <BasePoliticalPartyForm id={id} onSubmit={handleSubmit} error={error} />
  )
}
