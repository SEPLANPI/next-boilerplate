'use client'

import React, { useEffect } from 'react'

import dayjs from 'dayjs'
import { ChevronDown } from 'lucide-react'
import { useQueryStates, parseAsIsoDateTime } from 'nuqs'
import { DateInput } from '@mantine/dates'
import { Button, Divider, Popover } from '@mantine/core'

interface DateRangeFilterProps {
  children?: React.ReactNode
  minDate?: Date
  maxDate?: Date
}

const SHORTCUTS = [
  {
    label: 'Última semana',
    fn: () => ({
      fromDate: dayjs().subtract(7, 'day').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Último mês',
    fn: () => ({
      fromDate: dayjs().subtract(1, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Últimos 3 meses',
    fn: () => ({
      fromDate: dayjs().subtract(3, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Últimos 6 meses',
    fn: () => ({
      fromDate: dayjs().subtract(6, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },

  {
    label: 'Último ano',
    fn: () => ({
      fromDate: dayjs().subtract(1, 'year').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  }
]

export function DateRangeFilter({
  children,
  minDate,
  maxDate
}: DateRangeFilterProps) {
  const [dateRange, setDateRange] = useQueryStates(
    {
      fromDate: parseAsIsoDateTime,
      toDate: parseAsIsoDateTime
    },
    {
      history: 'push'
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
        toDate: dayjs(tempRange.toDate).endOf('day').toDate()
      })
    }
  }

  const handleShortcutClick = (shortcut: (typeof SHORTCUTS)[0]) => {
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

  return (
    <Popover position="bottom-start" shadow="md">
      <Popover.Target>
        <Button
          data-active={hasSelectedDate}
          variant="default-filled"
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
        <div className="flex items-start space-x-4">
          <div className="border-r pr-4">
            <div className="flex flex-col space-y-4">
              <DateInput
                className="min-w-52"
                label="Data de início"
                value={tempRange.fromDate}
                onChange={(date) =>
                  setTempRange((prev) => ({ ...prev, fromDate: date }))
                }
                minDate={minDate}
                maxDate={tempRange.toDate || maxDate}
                clearable
                valueFormat="DD/MM/YYYY"
                popoverProps={{
                  withinPortal: false
                }}
              />
              <DateInput
                className="min-w-52"
                label="Data de fim"
                value={tempRange.toDate}
                onChange={(date) =>
                  setTempRange((prev) => ({ ...prev, toDate: date }))
                }
                minDate={tempRange.fromDate || minDate}
                maxDate={maxDate}
                valueFormat="DD/MM/YYYY"
                clearable
                popoverProps={{
                  withinPortal: false
                }}
              />
              <div className="flex space-x-2">
                <Button
                  onClick={handleApply}
                  disabled={!tempRange.fromDate || !tempRange.toDate}
                  size="sm"
                  fullWidth
                >
                  Aplicar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleClear}
                  fullWidth
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>

          <div className="flex w-min max-w-40 flex-wrap items-start gap-2">
            {SHORTCUTS.map((shortcut) => (
              <Button
                key={shortcut.label}
                variant="light"
                size="xs"
                radius="xl"
                onClick={() => handleShortcutClick(shortcut)}
              >
                {shortcut.label}
              </Button>
            ))}
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
