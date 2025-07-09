import { forwardRef, PropsWithChildren } from 'react'
import { Button, Badge } from '@mantine/core'
import { ChevronDown } from 'lucide-react'
import { useSelectedItems } from '../providers/selected-items-provider'

export const FilterButton = forwardRef<HTMLButtonElement, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    const { selectedItems } = useSelectedItems()
    const hasSelectedItems = selectedItems.size > 0

    return (
      <Button
        data-active={hasSelectedItems}
        ref={ref}
        variant="default"
        rightSection={<ChevronDown className="size-4" />}
        {...props}
      >
        {children}
        {hasSelectedItems && (
          <Badge
            circle
            size="sm"
            variant="light"
            color="primary"
            className="ml-2"
          >
            {selectedItems.size}
          </Badge>
        )}
      </Button>
    )
  }
)

FilterButton.displayName = 'FilterButton'
