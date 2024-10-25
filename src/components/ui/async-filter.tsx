'use client'

import { createContext, useContext, useState, PropsWithChildren } from 'react'
import { getUgs } from '@/features/events/actions/get-ugs'
import { Button, Checkbox, Input, Popover, Badge, Loader } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ChevronDown, Search } from 'lucide-react'

type SelectedUgsContextType = {
  selectedUgs: Set<number>
  toggleUg: (ugNumber: number) => void
}

const SelectedUgsContext = createContext<SelectedUgsContextType | undefined>(
  undefined
)

function useSelectedUgs() {
  const context = useContext(SelectedUgsContext)
  if (!context) {
    throw new Error(
      'useSelectedUgs must be used within a SelectedUgsContext.Provider'
    )
  }
  return context
}

function Content() {
  const [search, setSearch] = useDebouncedState('', 500)

  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['events-ugs'],
    queryFn: () => getUgs(),
    staleTime: 30 * 60 * 1000
  })

  const { selectedUgs, toggleUg } = useSelectedUgs()

  if (isFetching) {
    return (
      <div className="flex flex-col items-center space-y-4 p-4">
        <Loader size="sm" />
        <p className="text-medium text-muted-foreground">Carregando</p>
      </div>
    )
  }

  if (error) {
    return <>Erro</>
  }

  const filteredData = data.data?.filter(
    (ug) =>
      ug.name.toLowerCase().includes(search.toLowerCase()) ||
      ug.sigla.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <header className="border-b p-1">
        <Input
          data-auto-focus
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Pesquisar"
          classNames={{
            input: 'border-none'
          }}
          rightSection={<Search className="size-4" />}
        />
      </header>
      <ul className="max-h-96 w-full overflow-y-auto overflow-x-clip">
        {filteredData?.map((ug) => (
          <li
            key={ug.number}
            className="flex w-full space-x-2 p-2 text-xs hover:bg-gray-100"
          >
            <Checkbox
              size="xs"
              id={ug.number.toString()}
              checked={selectedUgs.has(ug.number)}
              onChange={() => toggleUg(ug.number)}
            />
            <label htmlFor={ug.number.toString()} className="font-medium">
              {ug.name}
            </label>
          </li>
        ))}
      </ul>
      <footer className="border-t">
        <Button size="sm" variant="transparent">
          Limpar
        </Button>
      </footer>
    </>
  )
}

type AsyncFilterProps = {} & PropsWithChildren

export function AsyncFilter({ children }: AsyncFilterProps) {
  const [selectedUgs, setSelectedUgs] = useState<Set<number>>(new Set())

  const toggleUg = (ugNumber: number) => {
    setSelectedUgs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(ugNumber)) {
        newSet.delete(ugNumber)
      } else {
        newSet.add(ugNumber)
      }
      return newSet
    })
  }

  return (
    <SelectedUgsContext.Provider value={{ selectedUgs, toggleUg }}>
      <Popover width={300} position="bottom-start" shadow="xl">
        <Popover.Target>
          <Button
            variant="default"
            classNames={{
              root: ''
            }}
            rightSection={<ChevronDown className="size-4" />}
          >
            {children}
            {selectedUgs.size > 0 && (
              <Badge circle size="sm" variant="filled" className="ml-2">
                {selectedUgs.size}
              </Badge>
            )}
          </Button>
        </Popover.Target>
        <Popover.Dropdown className="p-0">
          <Content />
        </Popover.Dropdown>
      </Popover>
    </SelectedUgsContext.Provider>
  )
}
