'use client'

import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { updateInviteLink } from '../actions/update-invite-link'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { API } from '@/constants/messages'
import { BaseInvitationForm } from './base-invitation-form'
import { Invitation } from '../types'

interface EditInvitationFormProps {
  id: string
  invitation: Invitation
  onComplete?: (success: boolean) => void
}

export function EditInvitationForm({
  id,
  invitation,
  onComplete
}: EditInvitationFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values: { identificador: string }) {
    try {
      setIsSubmitting(true)
      const { error } = await updateInviteLink(invitation.id, values)

      if (error) {
        setIsSubmitting(false)
        setError(buildErrorMessage(error))
        onComplete?.(false)
        return
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
    <BaseInvitationForm
      id={id}
      initialValues={invitation}
      onSubmit={handleSubmit}
      error={error}
      isSubmitting={isSubmitting}
      token={invitation.token}
      submitLabel="Salvar"
    />
  )
}
