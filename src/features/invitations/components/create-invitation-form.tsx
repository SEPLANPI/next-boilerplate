'use client'

import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { createInviteLink } from '../actions/create-invite-link'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { API } from '@/constants/messages'
import { BaseInvitationForm } from './base-invitation-form'
import { useParams } from 'next/navigation'

interface CreateInvitationFormProps {
  id: string
  onComplete?: (success: boolean) => void
}

export function CreateInvitationForm({
  id,
  onComplete
}: CreateInvitationFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [token, setToken] = useState('')

  async function handleSubmit(values: { identificador: string }) {
    try {
      setIsSubmitting(true)
      const { data, error } = await createInviteLink(values)

      if (error) {
        setIsSubmitting(false)
        setError(buildErrorMessage(error))
        onComplete?.(false)
        return
      }
      setIsSubmitting(false)
      notifications.show({
        message: 'Convite gerado com sucesso',
        color: 'green'
      })
      setError('')
      setToken(data?.token || '')
      onComplete?.(true)
    } catch (error) {
      setError(API.UNEXPECTED_FETCH_ERROR)
      onComplete?.(false)
    }
  }

  return (
    <BaseInvitationForm
      id={id}
      onSubmit={handleSubmit}
      error={error}
      isSubmitting={isSubmitting}
      token={token}
    />
  )
}
