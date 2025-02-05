'use client'
import { BasePoliticalPartyForm } from './base-political-party-form'
import { PoliticalParty } from '../types'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { updatePoliticalParty } from '../actions/update-political-party'

interface EditPoliticalPartyFormProps {
  id: string
  politicalParty: PoliticalParty
  onComplete?: (success: boolean) => void
  onSubmit?: () => void
}

export function EditPoliticalPartyForm({
  id,
  politicalParty,
  onComplete,
  onSubmit
}: EditPoliticalPartyFormProps) {
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

      const { error } = await updatePoliticalParty(politicalParty.id, formData)

      if (error) {
        setError('Não foi possível atualizar o partido. Tente novamente.')
        onComplete?.(false)
        return
      }

      notifications.show({
        title: 'Partido atualizado',
        message: 'As alterações foram salvas com sucesso',
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
    <BasePoliticalPartyForm
      id={id}
      initialValues={politicalParty}
      onSubmit={handleSubmit}
      error={error}
    />
  )
}
