import { Badge } from '@mantine/core'
import { Check, Circle, X } from 'lucide-react'

type Status = 'PENDENTE' | 'APROVADO' | 'REJEITADO'

interface StatusBadgeProps {
  status: Status
}

const statusConfig = {
  PENDENTE: {
    color: 'amber',
    icon: Circle,
    label: 'Pendente'
  },
  APROVADO: {
    color: 'govGreen',
    icon: Check,
    label: 'Aprovado'
  },
  REJEITADO: {
    color: 'red',
    icon: X,
    label: 'Rejeitado'
  }
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge
      variant="light"
      color={config.color}
      leftSection={<Icon size={12} strokeWidth={3} />}
    >
      {config.label}
    </Badge>
  )
}
