import { useDisclosure } from "@mantine/hooks"
import { FiltersButton } from "./components/filters-button"
import { FiltersModal } from "./components/filters-modal"
import { FiltersProvider } from "./providers/filters-provider"
import { FilterManagerProps } from "./types"

export function FilterManager({
  children,
  onApply,
  buttonText,
  groupKeys = [],
}: FilterManagerProps) {
  const [opened, { open, close }] = useDisclosure(false)

  const handleApply = () => {
    onApply?.()
  }

  return (
    <FiltersProvider groupKeys={groupKeys}>
      <FiltersButton onClick={open}>{buttonText}</FiltersButton>
      <FiltersModal opened={opened} onClose={close} onApply={handleApply}>
        {children}
      </FiltersModal>
    </FiltersProvider>
  )
}
