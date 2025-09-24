import { Button, Checkbox, Divider, Input } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { Search } from "lucide-react"
import { useSelectedItems } from "./selected-items-provider"
import { BaseContentProps } from "./types"

export function BaseContent<T>({
  options,
  renderOption,
  getOptionValue,
  getOptionLabel,
  isDisabled,
  filterFn,
  showSearch = true,
  showSelectedOnTop = true,
}: BaseContentProps<T>) {
  const [search, setSearch] = useDebouncedState("", 100)
  const { selectedItems, toggle, clear } = useSelectedItems()

  const filteredOptions = options.filter((option) => filterFn(option, search))
  const selectedOptions = filteredOptions.filter((option) =>
    selectedItems.has(getOptionValue(option)),
  )

  const renderCheckboxItem = (option: T) => (
    <li key={getOptionValue(option)} className="group">
      <label
        className={`flex w-full cursor-pointer space-x-2 p-2 text-xs hover:bg-gray-100 ${isDisabled(option) ? "text-content-muted cursor-not-allowed" : ""
          }`}
      >
        <Checkbox
          className="mt-0.5"
          size="xs"
          checked={selectedItems.has(getOptionValue(option))}
          onChange={() => !isDisabled(option) && toggle(getOptionValue(option))}
          disabled={isDisabled(option)}
        />
        {renderOption(option)}
      </label>
    </li>
  )

  return (
    <>
      {showSearch && (
        <header className="border-b p-1">
          <Input
            classNames={{ input: "border-none" }}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar"
            rightSection={<Search className="size-4" />}
          />
        </header>
      )}
      <ul className="max-h-96 w-full overflow-y-auto overflow-x-clip">
        {showSelectedOnTop && selectedOptions.length > 0 && (
          <>
            <span className="block p-2 text-xs font-semibold">
              Selecionados
            </span>
            {selectedOptions.map(renderCheckboxItem)}
            <Divider className="my-2" />
          </>
        )}
        {showSelectedOnTop
          ? filteredOptions.map(
            (option) =>
              !selectedItems.has(getOptionValue(option)) &&
              renderCheckboxItem(option),
          )
          : filteredOptions.map(renderCheckboxItem)}
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
