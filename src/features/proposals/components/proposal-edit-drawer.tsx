'use client'
import { Button, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Pencil } from 'lucide-react'
import { Proposal } from '../types'
import ProposalsForm from './proposals-form'

export default function ProposalEditDrawer({
  proposal
}: {
  proposal: Proposal
}) {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Button onClick={() => open()} leftSection={<Pencil size={'16px'}/>}>
        Editar
      </Button>
      <Drawer
        title="Editar Proposta"
        size="md"
        position="right"
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
        <ProposalsForm onClose={close} items={proposal} edit={true} />
      </Drawer>
    </>
  )
}
