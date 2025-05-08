import { forwardRef, PropsWithChildren } from 'react'
import { Button, Badge } from '@mantine/core'
import { ChevronDown } from 'lucide-react'
import { useSelectedItems } from './selected-items-provider'

export const FilterButton = forwardRef<HTMLButtonElement, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    const { selectedItems } = useSelectedItems()
    const hasSelectedItems = selectedItems.size > 0

    return (
      <Button
        data-active={hasSelectedItems}
        ref={ref}
        variant="default"
        classNames={{
          root: 'data-[active=true]:bg-primary-50 data-[active=true]:text-primary-700'
        }}
        rightSection={<ChevronDown className="size-4" />}
        {...props}
      >
        {children}
        {hasSelectedItems && (
          <Badge circle size="sm" variant="filled" className="ml-2">
            {selectedItems.size}
          </Badge>
        )}
      </Button>
    )
  }
)

FilterButton.displayName = 'FilterButton'
