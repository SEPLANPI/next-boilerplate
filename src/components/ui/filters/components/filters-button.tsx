import { forwardRef } from 'react'
import { Button, Badge } from '@mantine/core'
import { ListFilter } from 'lucide-react'
import { useFilters } from '../hooks/use-filters'

interface FiltersButtonProps {
  onClick: () => void
  children?: React.ReactNode
}

export const FiltersButton = forwardRef<HTMLButtonElement, FiltersButtonProps>(
  ({ onClick, children }, ref) => {
    const { getTotalSelectedCount } = useFilters()
    const totalSelected = getTotalSelectedCount()
    const hasSelectedFilters = totalSelected > 0

    return (
      <Button
        ref={ref}
        onClick={onClick}
        variant="default"
        rightSection={
          hasSelectedFilters && (
            <Badge circle size="sm" variant="light" color="primary">
              {totalSelected}
            </Badge>
          )
        }
        leftSection={<ListFilter className="size-4" />}
      >
        {children || 'Filtros'}
      </Button>
    )
  }
)

FiltersButton.displayName = 'FiltersButton'
