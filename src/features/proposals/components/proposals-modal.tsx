'use client'
import { Button, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { FilePlus } from 'lucide-react'
import ProposalsForm from './proposals-form'

export default function ProposalsModal() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button
        className="rounded-xl"
        leftSection={<FilePlus size={16} />}
        onClick={open}
      >
        Cadastrar Proposta
      </Button>
      <Drawer
        title="Adicionar Proposta"
        size="md"
        position='right'
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
        <ProposalsForm onClose={close}/>
      </Drawer>
    </>
  )
}
