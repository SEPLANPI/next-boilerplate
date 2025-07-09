import React from 'react'

export interface ColumnHeaderProps {
  column: string
  title: React.ReactNode
  sortKey: string | null
  onSort: (key: string | null) => void
  className?: string
}

export interface SortOption {
  icon: React.ElementType
  label: string
  key: string | null
}
