import { Alert, Badge, Button, Collapse, Loader } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useFilters } from "../hooks/use-filters"
import { DefaultOption, FilterGroupProps } from "../types"
import { FilterGroupContent } from "./filter-group-content"

export function FilterGroup<T extends object>({
  title,
  searchParamKey,
  filterId,
  options,
  loadOptions,
  getOptionValue,
  getOptionLabel,
  renderOption,
  isDisabled,
  filterFn,
  showSearch = true,
  showSelectedOnTop = true,
  children,
}: FilterGroupProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const { getGroupSelectedCount } = useFilters()

  const selectedCount = getGroupSelectedCount(searchParamKey)
  const isAsync = !!loadOptions

  // Async data loading (only for async filters)
  const { data, error, isFetching } = useQuery({
    queryKey: [`filter-group-${filterId}`],
    queryFn: () => loadOptions!(),
    enabled: isAsync && isOpen,
  })

  // Determine final options (static or async)
  const finalOptions = isAsync ? data || [] : options || []

  // Type guards and handlers
  const isDefaultOption = (option: T): option is T & DefaultOption =>
    "id" in option && "label" in option

  const handlers = {
    getValue: (option: T): string => {
      if (getOptionValue) return getOptionValue(option)
      if (isDefaultOption(option)) return option.id
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
          ) : isAsync && isFetching ? (
            <div className="flex flex-col items-center space-y-4 p-6">
              <Loader size="sm" />
              <span className="text-sm font-semibold">Carregando...</span>
            </div>
          ) : error ? (
            <Alert color="red" title="Erro ao carregar opções" className="m-4">
              {error.message}
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
