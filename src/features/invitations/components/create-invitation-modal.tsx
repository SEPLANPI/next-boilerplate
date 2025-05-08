'use client'

import { Modal, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link } from 'lucide-react'
import { CreateInvitationForm } from './create-invitation-form'

export function CreateInvitationModal() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Gerar link de Cadastro"
        centered
        classNames={{
          title: ' font-semibold'
        }}
      >
        <CreateInvitationForm id="create-invitation" />
      </Modal>
      <Button onClick={open} leftSection={<Link className="size-4" />}>
        Criar link de convite
      </Button>
    </>
  )
}
