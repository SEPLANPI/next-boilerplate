export type SortDirection = 'asc' | 'desc' | null

export interface SortConfig {
  column: string
  direction: SortDirection
}

export interface SortOption {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: SortDirection
}

export interface ColumnHeaderProps {
  column: string
  title: string
  sortKey: string | null
  onSort: (value: string | null) => void
}
