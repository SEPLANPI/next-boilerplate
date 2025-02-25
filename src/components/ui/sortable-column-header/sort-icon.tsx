import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'

interface SortIconProps {
  isSorted: boolean
  isDescending: boolean
  className?: string
}

export function SortIcon({ isSorted, isDescending, className }: SortIconProps) {
  if (!isSorted) return <ChevronsUpDown className={className} />
  return isDescending
? (
    <ArrowDown className={className} />
  )
: (
    <ArrowUp className={className} />
  )
}
