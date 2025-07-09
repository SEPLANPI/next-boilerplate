import { Modal, Button, Group, ScrollArea } from '@mantine/core'
import { FiltersModalProps } from '../types'
import { useFilters } from '../hooks/use-filters'
import { Search } from 'lucide-react'

export function FiltersModal({
  opened,
  onClose,
  onApply,
  children,
  modalProps = {}
}: FiltersModalProps) {
  const { clearAll, getTotalSelectedCount } = useFilters()

  const totalSelected = getTotalSelectedCount()
  const hasSelectedFilters = totalSelected > 0

  const handleClearAll = () => {
    clearAll()
  }

  const handleApply = () => {
    onApply()
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
        header: 'pb-3',
        body: 'p-0'
      }}
      {...modalProps}
    >
      <div className="flex h-full flex-col">
        <ScrollArea className="flex-1 px-4 pb-3">
          <div className="space-y-4">{children}</div>
        </ScrollArea>

        <div className="px-4 pb-4">
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
