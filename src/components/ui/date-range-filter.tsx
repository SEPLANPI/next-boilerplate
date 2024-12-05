'use client'

import React, { useEffect } from 'react'
import { dayjs } from '@/lib/dayjs'
import { ChevronDown, Check } from 'lucide-react'
import { useQueryStates, parseAsIsoDateTime, parseAsInteger } from 'nuqs'
import { DatePicker } from '@mantine/dates'
import { Button, Divider, Popover } from '@mantine/core'

type Shortcut = {
  label: string
  fn: () => { fromDate: Date; toDate: Date }
}

interface DateRangeFilterProps {
  children?: React.ReactNode
  minDate?: Date
  maxDate?: Date
  shortcuts?: Shortcut[]
}

export function DateRangeFilter({
  children,
  minDate,
  maxDate,
  shortcuts
}: DateRangeFilterProps) {
  const [dateRange, setDateRange] = useQueryStates(
    {
      fromDate: parseAsIsoDateTime,
      toDate: parseAsIsoDateTime,
      page: parseAsInteger.withDefault(1)
    },
    {
      shallow: false
    }
  )

  const [tempRange, setTempRange] = React.useState({
    fromDate: dateRange.fromDate,
    toDate: dateRange.toDate
  })

  const handleApply = () => {
    if (tempRange.fromDate && tempRange.toDate) {
      setDateRange({
        fromDate: dayjs(tempRange.fromDate).startOf('day').toDate(),
        toDate: dayjs(tempRange.toDate).endOf('day').toDate(),
        page: 1
      })
    }
  }

  const handleShortcutClick = (shortcut: Shortcut) => {
    const range = shortcut.fn()
    setTempRange(range)
  }

  const handleClear = () => {
    setTempRange({ fromDate: null, toDate: null })
    setDateRange({ fromDate: null, toDate: null })
  }

  // Resetar inputs quando botão de limpar filtros é utilizado
  useEffect(() => {
    if (!dateRange.toDate && !dateRange.fromDate) {
      setTempRange({
        fromDate: null,
        toDate: null
      })
    }
  }, [dateRange])

  const formatDateRange = () => {
    if (!dateRange.fromDate || !dateRange.toDate) return ''
    return `${dayjs(dateRange.fromDate).format('DD/MM/YYYY')} - ${dayjs(dateRange.toDate).format('DD/MM/YYYY')}`
  }

  const hasSelectedDate = !!(dateRange.fromDate && dateRange.toDate)

  const isShortcutActive = (shortcut: Shortcut) => {
    const range = shortcut.fn()
    return (
      dayjs(tempRange.fromDate).isSame(range.fromDate, 'day') &&
      dayjs(tempRange.toDate).isSame(range.toDate, 'day')
    )
  }

  return (
    <Popover
      position="bottom-start"
      shadow="md"
      classNames={{ dropdown: 'p-0' }}
    >
      <Popover.Target>
        <Button
          data-active={hasSelectedDate}
          variant="secondary"
          color=""
          classNames={{
            root: 'data-[active=true]:bg-govBlue-50 data-[active=true]:text-govBlue-700'
          }}
          rightSection={<ChevronDown className="size-4" />}
        >
          {children}

          {dateRange.fromDate && dateRange.toDate && (
            <>
              <Divider
                orientation="vertical"
                className="m-2 border-govBlue-300"
              />
              <p className="text-xs font-semibold uppercase">
                {formatDateRange()}
              </p>
            </>
          )}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex items-stretch">
          {shortcuts && shortcuts.length > 0 && (
            <div className="flex w-min flex-col items-start gap-2 border-r p-2">
              {shortcuts.map((shortcut) => (
                <Button
                  key={shortcut.label}
                  variant="ghost"
                  size="xs"
                  color="gray"
                  onClick={() => handleShortcutClick(shortcut)}
                  rightSection={
                    isShortcutActive(shortcut) ? (
                      <Check className="size-3" strokeWidth={2.5} />
                    ) : (
                      <span className="w-3" />
                    )
                  }
                >
                  {shortcut.label}
                </Button>
              ))}
            </div>
          )}
          <div className="flex flex-col">
            <DatePicker
              className="px-3 py-2"
              type="range"
              numberOfColumns={2}
              value={[tempRange.fromDate, tempRange.toDate]}
              onChange={(dates) =>
                setTempRange({
                  fromDate: dates[0],
                  toDate: dates[1]
                })
              }
              minDate={minDate}
              maxDate={maxDate}
              size="xs"
            />
            <Divider />
            <div className="flex w-full items-center justify-between px-3 py-2">
              <div className="flex space-x-2">
                <Button
                  onClick={handleApply}
                  disabled={!tempRange.fromDate || !tempRange.toDate}
                  size="sm"
                >
                  Aplicar
                </Button>
                <Button size="sm" onClick={handleClear} variant="transparent">
                  Limpar
                </Button>
              </div>
              {tempRange.fromDate && tempRange.toDate ? (
                <p className="text-xs font-medium text-secondary-foreground">
                  {dayjs(tempRange.fromDate).format('D [de] MMMM[, ]YYYY')} -{' '}
                  {dayjs(tempRange.toDate).format('D [de] MMMM[, ]YYYY')}
                </p>
              ) : (
                <p className="text-xs font-medium text-muted-foreground">
                  Escolha um intervalo de datas
                </p>
              )}
            </div>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
