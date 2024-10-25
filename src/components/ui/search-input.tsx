'use client'

import { Input } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { Search } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { ChangeEvent, useEffect, useRef } from 'react'

type SearchInputProps = {
  placeholder?: string
}

export function SearchInput({ placeholder }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [{ search }, setQuery] = useQueryStates(
    {
      search: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1)
    },
    {
      shallow: false
    }
  )

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery({
        search: event.target.value,
        page: 1
      })
    },
    500
  )

  useEffect(() => {
    if (inputRef.current && search === '') inputRef.current.value = ''
  }, [search])

  return (
    <Input
      defaultValue={search}
      ref={inputRef}
      onChange={handleSearch}
      className="max-w-96"
      placeholder={placeholder || 'Pesquisar'}
      rightSection={<Search className="size-4" />}
    />
  )
}
