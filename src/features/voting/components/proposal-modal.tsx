'use client'

import { useState } from 'react'
import { Modal, NumberInput, Button, ActionIcon } from '@mantine/core'
import { Minus, Plus } from 'lucide-react'

interface ProposalModalProps {
  isOpen: boolean
  onClose: () => void
  proposal: {
    id: string
    nome: string
    descricao: string
  }
  currentPoints: number
  onPointsConfirm: (points: number) => void
  remainingPoints: number
}

export function ProposalModal({
  isOpen,
  onClose,
  proposal,
  currentPoints,
  onPointsConfirm,
  remainingPoints
}: ProposalModalProps) {
  const [points, setPoints] = useState(currentPoints)
  const maxAllowedPoints = remainingPoints + currentPoints

  const validatePoints = (newValue: number) => {
    const validPoints = Math.min(Math.max(0, newValue), maxAllowedPoints)
    setPoints(validPoints)
  }

  const handleIncrement = () => {
    validatePoints(points + 1)
  }

  const handleDecrement = () => {
    validatePoints(points - 1)
  }

  const handleChange = (value: string | number) => {
    validatePoints(Number(value) || 0)
  }

  const handleConfirm = () => {
    onPointsConfirm(points)
    onClose()
  }

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      title="Visualizar proposta"
      classNames={{
        title: 'text-secondary-foreground font-semibold'
      }}
      size="md"
    >
      <div className="mb-6 flex flex-col space-y-4">
        <div>
          <span className="text-xs font-semibold text-secondary-foreground">
            Título
          </span>
          <p className="text-sm">{proposal.nome}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-secondary-foreground">
            Descrição
          </span>
          <p className="text-sm">{proposal.descricao}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NumberInput
          leftSection={
            <ActionIcon variant="subtle" size="md" onClick={handleDecrement}>
              <Minus className="size-4" />
            </ActionIcon>
          }
          rightSection={
            <ActionIcon variant="subtle" size="md" onClick={handleIncrement}>
              <Plus className="size-4" />
            </ActionIcon>
          }
          value={points}
          onChange={handleChange}
          min={0}
          max={maxAllowedPoints}
          className="w-[140px]"
          leftSectionWidth={34}
          rightSectionWidth={34}
          hideControls={true}
          clampBehavior="strict"
        />
        <Button onClick={handleConfirm} className="w-full">
          Confirmar pontos
        </Button>
      </div>
      <p className="mt-2 text-center text-xs text-secondary-foreground">
        Você tem <span className="font-semibold">{remainingPoints}</span> pontos
        restantes
      </p>
    </Modal>
  )
}
