import { Button, Group, Modal, ScrollArea } from "@mantine/core"
import { Search } from "lucide-react"
import { useFilters } from "../hooks/use-filters"
import { FiltersModalProps } from "../types"

export function FiltersModal({
  opened,
  onClose,
  onApply,
  children,
  modalProps = {},
}: FiltersModalProps) {
  const { clearAll, getTotalSelectedCount, applyFilters } = useFilters()

  const totalSelected = getTotalSelectedCount()
  const hasSelectedFilters = totalSelected > 0

  const handleClearAll = () => {
    clearAll()
  }

  const handleApply = () => {
    applyFilters()
    onApply?.()
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Filtros"
      size="md"
      centered
      classNames={{
        header: "pb-3",
        body: "p-0",
      }}
      {...modalProps}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <div className="flex h-full  flex-col">
        <div className="space-y-4 px-4 pb-16">{children}</div>

        <div className="fixed px-4 py-4 z-20 bg-white  w-full bottom-0">
          <Group justify="space-between">
            <Button
              variant="white"
              onClick={handleClearAll}
              disabled={!hasSelectedFilters}
            >
              Limpar filtros
            </Button>

            <Button
              onClick={handleApply}
              leftSection={<Search className="size-4" />}
            >
              Buscar
            </Button>
          </Group>
        </div>
      </div>
    </Modal>
  )
}
