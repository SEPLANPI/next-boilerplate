"use client"

import { ApiResponse, asQuery } from "@/lib/api"
import { Alert, Badge, Button, Collapse, Loader } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useFilters } from "../hooks/use-filters"
import { DefaultOption } from "../types"
import { FilterGroupContent } from "./filter-group-content"

export interface AsyncFilterGroupProps<T extends object> {
  title: string
  searchParamKey: string
  filterId: string
  loadOptions: () => Promise<ApiResponse<T[]>>
  getOptionValue?: (option: T) => string
  getOptionLabel?: (option: T) => string
  renderOption?: (option: T) => React.JSX.Element
  isDisabled?: (option: T) => boolean
  filterFn?: (option: T, search: string) => boolean
  showSearch?: boolean
  showSelectedOnTop?: boolean
  children?: React.ReactNode
}

export function AsyncFilterGroup<T extends object>({
  title,
  searchParamKey,
  filterId,
  loadOptions,
  getOptionValue,
  getOptionLabel,
  renderOption,
  isDisabled,
  filterFn,
  showSearch = true,
  showSelectedOnTop = true,
  children,
}: AsyncFilterGroupProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const { getGroupSelectedCount } = useFilters()

  const selectedCount = getGroupSelectedCount(searchParamKey)

  const { data, error, isFetching } = useQuery({
    queryKey: [`filter-${filterId}`],
    queryFn: asQuery(loadOptions),
    enabled: isOpen,
  })

  const isDefaultOption = (option: T): option is T & DefaultOption =>
    "id" in option && "label" in option

  const handlers = {
    getValue: (option: T): string => {
      if (getOptionValue) return getOptionValue(option)
      if (isDefaultOption(option)) return String(option.id)
      throw new Error("getOptionValue is required for non-DefaultOption types")
    },
    getLabel: (option: T): string => {
      if (getOptionLabel) return getOptionLabel(option)
      if (isDefaultOption(option)) return option.label
      throw new Error("getOptionLabel is required for non-DefaultOption types")
    },
  }

  const finalRenderOption =
    renderOption ||
    ((option: T) => (
      <span
        className={`flex-grow ${isDisabled?.(option) ? "text-gray-400" : ""}`}
      >
        {handlers.getLabel(option)}
      </span>
    ))

  const finalFilterFn =
    filterFn ||
    ((option: T, search: string) =>
      handlers.getLabel(option).toLowerCase().includes(search.toLowerCase()))

  const finalIsDisabled = isDisabled || (() => false)
  const finalOptions = data || []

  return (
    <div className="overflow-hidden rounded-lg border shadow-3">
      <Button
        unstyled
        onClick={() => setIsOpen(!isOpen)}
        classNames={{
          root: "w-full py-2 px-3 text-content-default font-semibold",
          label: "w-full text-sm flex justify-between items-center",
        }}
      >
        {title}

        {selectedCount > 0 ? (
          <Badge variant="light" color="primary" size="md" circle>
            {selectedCount}
          </Badge>
        ) : (
          <span className="text-xs font-semibold text-content-muted">
            Selecionar
          </span>
        )}
      </Button>

      <Collapse in={isOpen}>
        <div>
          {children ? (
            children
          ) : isFetching ? (
            <div className="flex flex-col items-center space-y-4 p-6">
              <Loader size="sm" />
              <span className="text-sm font-semibold">Carregando...</span>
            </div>
          ) : error ? (
            <Alert color="red" title="Erro ao carregar opções" className="m-4">
              {(error as Error).message}
            </Alert>
          ) : (
            <FilterGroupContent
              groupKey={searchParamKey}
              options={finalOptions}
              renderOption={finalRenderOption}
              getOptionValue={handlers.getValue}
              getOptionLabel={handlers.getLabel}
              isDisabled={finalIsDisabled}
              filterFn={finalFilterFn}
              showSearch={showSearch}
              showSelectedOnTop={showSelectedOnTop}
            />
          )}
        </div>
      </Collapse>
    </div>
  )
}
