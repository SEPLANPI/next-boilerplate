export interface ColumnHeaderProps {
  column: string
  title: string
  sortKey: string | null
  onSort: (key: string | null) => void
  ascendingLabel?: string
  descendingLabel?: string
  className?: string
}

export interface SortOption {
  icon: React.ElementType
  label: string
  key: string | null
}
