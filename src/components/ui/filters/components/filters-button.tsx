import { Badge, Button } from "@mantine/core"
import { ListFilter } from "lucide-react"
import { forwardRef } from "react"
import { useFilters } from "../hooks/use-filters"

interface FiltersButtonProps {
  onClick: () => void
  children?: React.ReactNode
}

export const FiltersButton = forwardRef<HTMLButtonElement, FiltersButtonProps>(
  ({ onClick, children }, ref) => {
    const { getTotalAppliedCount } = useFilters()
    const totalApplied = getTotalAppliedCount()
    const hasSelectedFilters = totalApplied > 0

    return (
      <Button
        ref={ref}
        onClick={onClick}
        variant="default"
        rightSection={
          hasSelectedFilters && (
            <Badge circle size="sm" variant="light" color="primary">
              {totalApplied}
            </Badge>
          )
        }
        leftSection={<ListFilter className="size-4" />}
      >
        {children || "Filtros"}
      </Button>
    )
  },
)

FiltersButton.displayName = "FiltersButton"
