'use client'

import { Button, Divider, Popover, Select } from '@mantine/core'
import { ListTree } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'

const groupOptions = [
  {
    value: '',
    label: 'Nenhum'
  },
  {
    value: 'ug',
    label: 'Unidade Gestora'
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

function getGroupLabel(value: string): string | null {
  const option = groupOptions.find((option) => option.value === value)
  return option ? option.label : null
}

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
    <Popover width={320} position="bottom-start" shadow="md">
      <Popover.Target>
        <Button
          data-active={!!group}
          variant="default-filled"
          classNames={{
            root: 'data-[active=true]:bg-govBlue-50 data-[active=true]:text-govBlue-700'
          }}
          leftSection={<ListTree className="size-4" />}
        >
          Agrupar
          {group && (
            <>
              <Divider
                orientation="vertical"
                className="m-2 border-govBlue-300"
              />
              <p className="text-xs font-semibold">{getGroupLabel(group)}</p>
            </>
          )}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex space-x-2">
          <Select
            classNames={{
              root: 'w-full'
            }}
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
            classNames={{
              root: 'w-32'
            }}
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
