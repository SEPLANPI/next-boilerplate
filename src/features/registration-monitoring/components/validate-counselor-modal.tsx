'use client'

import { Modal, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CircleCheck } from 'lucide-react'
import { ValidateCounselorForm } from './validate-counselor-form'

interface ValidateCounselorModalProps {
  counselorId: string
}

export function ValidateCounselorModal({
  counselorId
}: ValidateCounselorModalProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Validar Cadastro"
        centered
        classNames={{
          title: ' font-semibold'
        }}
      >
        <ValidateCounselorForm
          id="validate-counselor"
          counselorId={counselorId}
          onComplete={(success) => {
            if (success) close()
          }}
        />
      </Modal>
      <Button
        size="compact-md"
        className="text-sm"
        onClick={open}
        leftSection={<CircleCheck className="size-4" />}
      >
        Validar Cadastro
      </Button>
    </>
  )
}
