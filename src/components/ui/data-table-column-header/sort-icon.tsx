import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import { SortDirection } from './types'

interface SortIconProps {
  direction: SortDirection
  className?: string
}
export function SortIcon({ direction, className }: SortIconProps) {
  const icons = {
    asc: <ArrowUp className={className} />,
    desc: <ArrowDown className={className} />,
    null: <ChevronsUpDown className={className} />
  } as const

  return icons[direction ?? 'null']
}
