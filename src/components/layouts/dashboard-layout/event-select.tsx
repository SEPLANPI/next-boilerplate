'use client'

import { useEffect, useState } from 'react'
import {
  Input,
  InputBase,
  Combobox,
  useCombobox,
  ScrollArea,
  Alert
} from '@mantine/core'
import { useParams, useRouter, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getEvents } from '@/api/client/get-events'
import { API } from '@/constants/messages'
import Cookies from 'js-cookie'

export function EventSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const { eventId } = useParams<{ eventId: string }>()
  const [value, setValue] = useState<string | null>(eventId)

  useEffect(() => {
    setValue(eventId)
  }, [eventId])

  const {
    data: events,
    error,
    isLoading
  } = useQuery({
    queryKey: ['active-event'],
    queryFn: getEvents,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })

  if (error) {
    return (
      <Alert
        color="red"
        classNames={{
          title: 'text-xs'
        }}
        title={error.message || API.UNEXPECTED_FETCH_ERROR}
      />
    )
  }

  const options = events?.map((event) => (
    <Combobox.Option value={event.id.toString()} key={event.id}>
      {event.nome}
    </Combobox.Option>
  ))

  function getOptionLabel(value: string) {
    const event = events?.find((event) => event.id.toString() === value)
    if (!event) return null
    return event.nome
  }

  const handleOptionSubmit = (val: string) => {
    setValue(val)
    combobox.closeDropdown()

    Cookies.set('selectedEventId', val, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    const newPath = pathname.replace(`/${eventId}/`, `/${val}/`)
    router.push(newPath)
  }

  return (
    <Combobox
      position="bottom-start"
      width={280}
      store={combobox}
      onOptionSubmit={handleOptionSubmit}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          disabled={isLoading}
        >
          {value ? (
            <p className="truncate">{getOptionLabel(value)}</p>
          ) : (
            <Input.Placeholder>Selecionar evento</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <ScrollArea.Autosize type="scroll" mah={200}>
          <Combobox.Options>{options}</Combobox.Options>
        </ScrollArea.Autosize>
      </Combobox.Dropdown>
    </Combobox>
  )
}
