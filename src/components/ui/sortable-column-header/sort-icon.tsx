import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

interface SortIconProps {
  isSorted: boolean
  isDescending: boolean
}

export function SortIcon({ isSorted, isDescending, ...props }: SortIconProps) {
  if (!isSorted)
    return (
      <span className="ml-2 flex size-5 items-center justify-center rounded-full">
        <ChevronsUpDown
          className="size-3 text-content-muted transition-colors group-hover:text-content data-[sorted=true]:text-content"
          {...props}
        />
      </span>
    )

  return (
    <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary-600/[0.08]">
      {isDescending ? (
        <ArrowDown className="size-3 text-primary-600" {...props} />
      ) : (
        <ArrowUp className="size-3 text-primary-600" {...props} />
      )}
    </span>
  )
}
