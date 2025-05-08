'use client'

import { Modal } from '@mantine/core'
import { Invitation } from '../types'
import { EditInvitationForm } from './edit-invitation-form'

interface EditInvitationModalProps {
  invitation: Invitation
  opened: boolean
  onClose: () => void
  onComplete?: (success: boolean) => void
}

export function EditInvitationModal({
  invitation,
  opened,
  onClose,
  onComplete
}: EditInvitationModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar link de Cadastro"
      centered
      classNames={{
        title: ' font-semibold'
      }}
    >
      <EditInvitationForm
        id="edit-invitation"
        invitation={invitation}
        onComplete={(success) => {
          if (success) {
            onClose()
          }
          onComplete?.(success)
        }}
      />
    </Modal>
  )
}
