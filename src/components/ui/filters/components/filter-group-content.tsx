import { useDebouncedState } from '@mantine/hooks'
import { Input, Checkbox, Divider, Button, ScrollArea } from '@mantine/core'
import { Search } from 'lucide-react'
import { useFilters } from '../hooks/use-filters'

interface FilterGroupContentProps<T> {
  groupKey: string
  options: T[]
  renderOption: (option: T) => JSX.Element
  getOptionValue: (option: T) => string
  getOptionLabel: (option: T) => string
  isDisabled: (option: T) => boolean
  filterFn: (option: T, search: string) => boolean
  showSearch?: boolean
  showSelectedOnTop?: boolean
}

export function FilterGroupContent<T>({
  groupKey,
  options,
  renderOption,
  getOptionValue,
  isDisabled,
  filterFn,
  showSearch = true,
  showSelectedOnTop = true
}: FilterGroupContentProps<T>) {
  const { getGroupSelected, toggleOption, clearGroup } = useFilters()
  const [search, setSearch] = useDebouncedState('', 100)

  const selectedItems = getGroupSelected(groupKey)

  const filteredOptions = options.filter((option) => filterFn(option, search))
  const selectedOptions = filteredOptions.filter((option) =>
    selectedItems.has(getOptionValue(option))
  )

  const renderCheckboxItem = (option: T) => (
    <li key={getOptionValue(option)} className="group">
      <label
        className={`flex w-full cursor-pointer space-x-2 px-3 py-1.5 text-sm hover:bg-gray-100 ${
          isDisabled(option) ? 'cursor-not-allowed text-content-muted' : ''
        }`}
      >
        <Checkbox
          className="mt-0.5"
          size="xs"
          checked={selectedItems.has(getOptionValue(option))}
          onChange={() =>
            !isDisabled(option) &&
            toggleOption(groupKey, getOptionValue(option))
          }
          disabled={isDisabled(option)}
        />
        {renderOption(option)}
      </label>
    </li>
  )

  return (
    <div>
      {showSearch && (
        <div className="p-3">
          <Input
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Busca"
            rightSection={<Search className="size-4 text-primary-600" />}
          />
        </div>
      )}

      <div className="relative">
        <ScrollArea.Autosize className="w-full" type="scroll" mah={224}>
          {filteredOptions.length === 0 ? (
            <div className="p-6 text-center">
              <span className="text-sm">Nenhuma opção encontrada</span>
            </div>
          ) : (
            <div>
              {showSelectedOnTop && selectedOptions.length > 0 && (
                <>
                  <div className="px-3 py-1.5">
                    <span className="text-xxs font-semibold uppercase tracking-wide text-content-muted">
                      Selecionados
                    </span>
                  </div>
                  <ul>{selectedOptions.map(renderCheckboxItem)}</ul>
                  <Divider className="mx-3 my-1" />
                </>
              )}
              <ul>
                {showSelectedOnTop
                  ? filteredOptions.map(
                      (option) =>
                        !selectedItems.has(getOptionValue(option)) &&
                        renderCheckboxItem(option)
                    )
                  : filteredOptions.map(renderCheckboxItem)}
              </ul>
            </div>
          )}
        </ScrollArea.Autosize>
      </div>

      {selectedItems.size > 0 && (
        <div className="mx-3 mt-3 border-t py-2">
          <Button
            variant="subtle"
            size="xs"
            className="-translate-x-2"
            onClick={() => clearGroup(groupKey)}
          >
            Limpar
          </Button>
        </div>
      )}
    </div>
  )
}
