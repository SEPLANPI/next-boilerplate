'use client'
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Plus } from 'lucide-react'
import ProposalsForm from './proposals-form'

export default function ProposalsModal() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button className="rounded-xl" leftSection={<Plus />} onClick={open}>
        Adicionar Proposta
      </Button>
      <Modal
        title="Adicionar Proposta"
        size="md"
        opened={opened}
        onClose={close}
        styles={{
          header: {
            paddingLeft: '24px',
            paddingRight: '24px'
          },
          title: {
            fontWeight: 600,
            fontSize: '14px',
            fontStyle: 'normal'
          },
          body: { paddingLeft: '24px', paddingRight: '24px' }
        }}
      >
        <ProposalsForm />
      </Modal>
    </>
  )
}
