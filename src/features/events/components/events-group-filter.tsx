'use client'

import { Button, Popover, Select } from '@mantine/core'
import { ListTree } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'

const groupOptions = [
  {
    value: '',
    label: 'Nenhum'
  },
  {
    value: 'ug',
    label: 'Secretaria'
  },
  {
    value: 'municipio',
    label: 'Município'
  }
] as const

const sortOptions = [
  { value: 'name.asc', label: 'A - Z' },
  { value: 'name.desc', label: 'Z - A' },
  { value: 'value.asc', label: 'Maior Valor' },
  { value: 'value.desc', label: 'Menor Valor' }
] as const

export function EventsGroupFilter() {
  const [{ group, sort }, setGrouping] = useQueryStates(
    {
      group: parseAsString.withDefault(''),
      sort: parseAsString.withDefault('name.asc')
    },
    {
      urlKeys: {
        sort: 'groupSort'
      }
    }
  )
  return (
    <Popover width={300} position="bottom-start" shadow="md">
      <Popover.Target>
        <Button leftSection={<ListTree className="size-4" />} variant="default">
          Agrupar
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex space-x-2">
          <Select
            className="flex-grow-2"
            comboboxProps={{
              withinPortal: false
            }}
            data={groupOptions}
            value={group}
            onChange={(value) =>
              setGrouping({
                sort,
                group: value
              })
            }
          />
          <Select
            className="flex-grow-1"
            comboboxProps={{
              withinPortal: false
            }}
            data={sortOptions}
            value={sort}
            onChange={(value) =>
              setGrouping({
                group,
                sort: value
              })
            }
          />
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
