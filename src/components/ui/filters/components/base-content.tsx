import { Button, Checkbox, Divider, Input } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { Search } from "lucide-react"
import { useSelectedItems } from "../providers/selected-items-provider"
import { BaseContentProps } from "../types"

export function BaseContent<T>({
  options,
  renderOption,
  getOptionValue,
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
        className={`flex w-full cursor-pointer space-x-2 px-3 py-1.5 text-sm hover:bg-gray-100 ${
          isDisabled(option) ? "cursor-not-allowed text-content-muted" : ""
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
            classNames={{
              input: "border-none ring-0 focus:ring-0",
            }}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Busca"
            rightSection={<Search className="size-4 text-primary-600" />}
          />
        </header>
      )}
      <ul className="max-h-80 overflow-y-auto rounded-xl py-1">
        {showSelectedOnTop && selectedOptions.length > 0 && (
          <>
            <div className="px-3 py-1.5">
              <span className="text-xxs font-semibold uppercase tracking-wide text-content-muted">
                Selecionados
              </span>
            </div>
            {selectedOptions.map(renderCheckboxItem)}
            <Divider className="mx-3 my-1" />
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
        <div className="mx-3 mt-3 border-t py-2">
          <Button
            variant="subtle"
            size="xs"
            className="-translate-x-2"
            onClick={() => clear()}
          >
            Limpar
          </Button>
        </div>
      )}
    </>
  )
}
