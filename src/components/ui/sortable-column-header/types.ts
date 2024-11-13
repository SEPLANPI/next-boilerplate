export interface ColumnHeaderProps {
  column: string
  title: string
  sortKey: string | null
  onSort: (key: string | null) => void
}

export interface SortOption {
  icon: React.ElementType
  label: string
  key: string | null
}
