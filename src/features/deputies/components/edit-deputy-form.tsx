'use client'
import { BaseDeputyForm } from './base-deputy-form'
import { Deputy } from '../types'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { updateDeputy } from '../actions/update-deputy'

interface EditDeputyFormProps {
  id: string
  deputy: Deputy
  onComplete?: (success: boolean) => void
  onSubmit?: () => void
}

export function EditDeputyForm({
  id,
  deputy,
  onComplete,
  onSubmit
}: EditDeputyFormProps) {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(values: {
    nome: string
    partido: string
    foto: File | null
  }) {
    onSubmit?.()
    try {
      const formData = new FormData()
      formData.append('nome', values.nome)
      formData.append('partido_id', values.partido)
      if (values.foto) {
        formData.append('foto', values.foto)
      }

      const { error } = await updateDeputy(deputy.id, formData)

      if (error) {
        setError('Não foi possível atualizar o deputado. Tente novamente.')
        onComplete?.(false)
        return
      }

      notifications.show({
        title: 'Deputado atualizado',
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
    <BaseDeputyForm
      id={id}
      initialValues={{
        nome: deputy.nome,
        partido: deputy.partido?.id.toString(),
        foto: deputy.foto
      }}
      onSubmit={handleSubmit}
      error={error}
    />
  )
}
