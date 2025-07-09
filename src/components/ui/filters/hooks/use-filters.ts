import { useContext } from 'react'
import {
  FiltersContext,
  FiltersContextType
} from '../providers/filters-provider'

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }
  return context
}
