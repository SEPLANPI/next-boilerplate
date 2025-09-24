"use client"

import { Button } from "@mantine/core"
import { X } from "lucide-react"
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs"
import { ReactNode, useMemo } from "react"

interface ClearFiltersButtonProps {
  /**
   * Array of URL parameter keys that should be considered as filters.
   * If not provided, all parameters will be considered filters.
   */
  filterParamKeys?: string[]
  /**
   * Button variant
   */
  variant?: "outline" | "subtle" | "filled" | "white" | "default" | "light"
  /**
   * Button size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  /**
   * Custom className
   */
  className?: string
  /**
   * Button content. Defaults to "Limpar filtros" if not provided.
   */
  children?: ReactNode
}

export function ClearFiltersButton({
  filterParamKeys,
  variant = "light",
  size = "sm",
  className,
  children = "Limpar",
}: ClearFiltersButtonProps) {
  const queryStateConfig = useMemo(() => {
    if (!filterParamKeys) return {}

    return filterParamKeys.reduce(
      (acc, key) => {
        acc[key] = parseAsArrayOf(parseAsString).withDefault([]).withOptions({
          shallow: false,
        })
        return acc
      },
      {} as Record<string, ReturnType<typeof parseAsArrayOf<string>>>,
    )
  }, [filterParamKeys])

  const [queryStates, setQueryStates] = useQueryStates(queryStateConfig)

  const hasActiveFilters = useMemo(() => {
    if (!filterParamKeys) {
      // If no specific keys provided, check all query states
      return Object.values(queryStates).some((value) =>
        Array.isArray(value) ? value.length > 0 : Boolean(value),
      )
    }

    // Check only specified filter parameters
    return filterParamKeys.some((key) => {
      const value = queryStates[key]
      return Array.isArray(value) ? value.length > 0 : Boolean(value)
    })
  }, [queryStates, filterParamKeys])

  const clearFilters = () => {
    if (!filterParamKeys) {
      // Clear all query states
      const clearedStates = Object.keys(queryStates).reduce(
        (acc, key) => {
          acc[key] = null
          return acc
        },
        {} as Record<string, null>,
      )
      setQueryStates(clearedStates)
    } else {
      // Clear only specific filter parameters
      const clearedStates = filterParamKeys.reduce(
        (acc, key) => {
          acc[key] = null
          return acc
        },
        {} as Record<string, null>,
      )
      setQueryStates(clearedStates)
    }
  }

  if (!hasActiveFilters) {
    return null
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={clearFilters}
      leftSection={<X className="size-4" />}
      className={className}
    >
      {children}
    </Button>
  )
}
