'use client'

import { CloseButton, Input } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { Search } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { ChangeEvent, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type SearchInputProps = {
  placeholder?: string
  className?: string
  inputClassName?: string
}

export function SearchInput({
  placeholder,
  className,
  inputClassName
}: SearchInputProps) {
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

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      setQuery({
        search: '',
        page: 1
      })
    }
  }

  return (
    <Input
      defaultValue={search}
      ref={inputRef}
      onChange={handleSearch}
      className={cn('w-full max-w-[300px]', className)}
      classNames={{
        input: cn(inputClassName)
      }}
      placeholder={placeholder || 'Busca'}
      rightSectionPointerEvents="all"
      rightSection={
        search ? (
          <CloseButton aria-label="Limpar pesquisa" onClick={clearSearch} />
        ) : (
          <Search className="size-4 text-primary-600" />
        )
      }
    />
  )
}
