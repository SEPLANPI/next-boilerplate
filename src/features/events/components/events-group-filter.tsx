'use client'

import { Button, Divider, Popover, Select } from '@mantine/core'
import { ListTree } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'
import { pageParameterParser } from '../lib/search-params'

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
  },
  {
    value: 'deputado',
    label: 'Deputado'
  }
] as const

const sortOptions = [
  { value: '-valor', label: 'Maior Valor' },
  { value: 'valor', label: 'Menor Valor' },
  { value: 'quantidade', label: 'Menos Eventos' },
  { value: '-quantidade', label: 'Mais Eventos' },
  { value: 'nome', label: 'A - Z' },
  { value: '-nome', label: 'Z - A' }
] as const

function getGroupLabel(value: string): string | null {
  const option = groupOptions.find((option) => option.value === value)
  return option ? option.label : null
}

export function EventsGroupFilter() {
  const [{ group, sort }, setGrouping] = useQueryStates(
    {
      group: parseAsString.withDefault(''),
      sort: parseAsString.withDefault(''),
      page: pageParameterParser
    },
    {
      urlKeys: {
        sort: 'groupSort'
      },
      shallow: false
    }
  )

  return (
    <Popover width={360} position="bottom-start" shadow="md">
      <Popover.Target>
        <Button
          data-active={!!group}
          variant="secondary"
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
                sort: sort || '-valor',
                group: value,
                page: 1
              })
            }
          />
          <Select
            disabled={!group}
            classNames={{
              root: 'w-72'
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
