'use client'

import React from 'react'
import { Modal, Button, Group } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { deleteInvitation } from '../actions/delete-invitation'
import { buildErrorMessage } from '@/utils/format-django-errors'

interface DeleteInvitationModalProps {
  opened: boolean
  onClose: () => void
  invitationId: string | null
}

export function DeleteInvitationModal({
  opened,
  onClose,
  invitationId
}: DeleteInvitationModalProps) {
  const [loading, setLoading] = React.useState(false)

  const handleDelete = async () => {
    if (!invitationId) return
    setLoading(true)

    const result = await deleteInvitation(invitationId)

    if (result.error) {
      notifications.show({
        title: 'Erro',
        message: buildErrorMessage(result.error),
        color: 'red'
      })
    } else {
      notifications.show({
        title: 'Sucesso',
        message: 'Convite excluído com sucesso',
        color: 'green'
      })
      onClose()
    }

    setLoading(false)
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Excluir convite" centered>
      <p>Tem certeza que deseja excluir este convite?</p>
      <Group justify="flex-end" mt="md">
        <Button variant="subtle" color="gray" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="red" loading={loading} onClick={handleDelete}>
          Excluir
        </Button>
      </Group>
    </Modal>
  )
}
