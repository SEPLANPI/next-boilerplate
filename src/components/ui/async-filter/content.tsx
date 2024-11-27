import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { Input, Checkbox, Divider, Button, Loader, Alert } from '@mantine/core'
import { Search } from 'lucide-react'
import { ContentProps } from './types'
import { useSelectedItems } from './selected-items-provider'

export function Content<T>({
  loadOptions,
  renderOption,
  getOptionValue,
  filterId,
  filterFn
}: ContentProps<T>) {
  const [search, setSearch] = useDebouncedState('', 100)
  const { selectedItems, toggle, clear } = useSelectedItems()
  const { data, error, isFetching } = useQuery({
    queryKey: [`async-filter-${filterId}`],
    queryFn: () => loadOptions(),
    staleTime: 30 * 60 * 1000 // 30m
  })

  if (isFetching) {
    return (
      <div className="flex flex-col items-center space-y-4 p-6">
        <Loader size="sm" />
        <span className="text-sm font-semibold text-secondary-foreground">
          Carregando...
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        color="red"
        title="Não foi possível buscar as opções."
        className="m-2"
      />
    )
  }

  const filteredOptions =
    data?.filter((option) => filterFn(option, search)) || []

  const selectedOptions = filteredOptions.filter((option) =>
    selectedItems.has(getOptionValue(option))
  )

  return (
    <>
      <header className="border-b p-1">
        <Input
          classNames={{
            input: 'border-none'
          }}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Pesquisar"
          rightSection={<Search className="size-4" />}
        />
      </header>
      <ul className="max-h-96 w-full overflow-y-auto overflow-x-clip">
        {selectedOptions.length > 0 && (
          <>
            <span className="block p-2 text-xs font-semibold text-secondary-foreground">
              Selecinados
            </span>
            {selectedOptions.map((option) => (
              <li key={getOptionValue(option)} className="group">
                <label className="flex w-full cursor-pointer space-x-2 p-2 text-xs hover:bg-gray-100">
                  <Checkbox
                    className="mt-0.5"
                    size="xs"
                    checked={selectedItems.has(getOptionValue(option))}
                    onChange={() => toggle(getOptionValue(option))}
                  />
                  {renderOption(option)}
                </label>
              </li>
            ))}
            <Divider className="my-2" />
          </>
        )}
        {filteredOptions.map(
          (option) =>
            !selectedItems.has(getOptionValue(option)) && (
              <li key={getOptionValue(option)} className="group">
                <label className="flex w-full cursor-pointer space-x-2 p-2 text-xs hover:bg-gray-100">
                  <Checkbox
                    className="mt-0.5"
                    size="xs"
                    checked={selectedItems.has(getOptionValue(option))}
                    onChange={() => toggle(getOptionValue(option))}
                  />
                  {renderOption(option)}
                </label>
              </li>
            )
        )}
      </ul>
      {selectedOptions.length > 0 && (
        <footer className="border-t">
          <Button variant="white" size="sm" onClick={() => clear()}>
            Limpar
          </Button>
        </footer>
      )}
    </>
  )
}
