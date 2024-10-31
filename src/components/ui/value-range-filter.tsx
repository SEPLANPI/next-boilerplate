import React from 'react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { RangeSlider, Button, Popover, TextInput } from '@mantine/core'
import { ChevronDown } from 'lucide-react'

interface ValueRangeFilterProps {
  min: number
  max: number
  data: { value: number; count: number }[]
  children: React.ReactNode
}

const SHORTCUTS = [
  { label: '0 - 100', range: [0, 100] },
  { label: '100 - 500', range: [100, 500] },
  { label: '500 - 1000', range: [500, 1000] },
  { label: '1000 - 5000', range: [1000, 5000] },

  { label: '5000 - 10000', range: [5000, 10000] }
]

export function ValueRangeFilter({
  min,
  max,
  data,
  children
}: ValueRangeFilterProps) {
  const [valueRange, setValueRange] = useQueryStates({
    fromValue: parseAsInteger,
    toValue: parseAsInteger
  })

  const [tempRange, setTempRange] = React.useState({
    fromValue: min,
    toValue: max
  })

  const handleApply = () => {
    setValueRange({
      fromValue: tempRange.fromValue,
      toValue: tempRange.toValue
    })
  }

  const handleShortcutClick = (shortcut: (typeof SHORTCUTS)[0]) => {
    setTempRange({ fromValue: shortcut.range[0], toValue: shortcut.range[1] })
  }

  const handleClear = () => {
    setTempRange({ fromValue: min, toValue: max })
    setValueRange({ fromValue: min, toValue: max })
  }

  const formatValueRange = () => {
    if (valueRange.fromValue === min && valueRange.toValue === max) return ''
    return `${valueRange.fromValue?.toLocaleString()} - ${valueRange.toValue?.toLocaleString()}`
  }

  const hasSelectedRange =
    valueRange.fromValue !== min || valueRange.toValue !== max

  const maxCount = Math.max(...data.map((item) => item.count))

  const isInRange = (value: number) =>
    value >= tempRange.fromValue && value <= tempRange.toValue

  return (
    <Popover position="bottom-start" shadow="md">
      <Popover.Target>
        <Button
          data-active={hasSelectedRange}
          variant="default-filled"
          className="data-[active=true]:bg-govBlue-50 data-[active=true]:text-govBlue-700"
          rightSection={<ChevronDown className="size-4" />}
        >
          <div className="flex items-center">
            {children}
            {valueRange.fromValue !== min ||
              (valueRange.toValue !== max && (
                <p className="ml-1 border-l border-primary pl-1 text-xs font-semibold uppercase">
                  {formatValueRange()}
                </p>
              ))}
          </div>
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <TextInput
              value={tempRange.fromValue?.toLocaleString()}
              onChange={(event) =>
                setTempRange((prev) => ({
                  ...prev,

                  fromValue: parseFloat(
                    event.currentTarget.value.replace(/[^0-9.-]+/g, '')
                  )
                }))
              }
              placeholder="From value"
              className="w-48"
            />
            <TextInput
              value={tempRange.toValue?.toLocaleString()}
              onChange={(event) =>
                setTempRange((prev) => ({
                  ...prev,
                  toValue: parseFloat(
                    event.currentTarget.value.replace(/[^0-9.-]+/g, '')
                  )
                }))
              }
              placeholder="To value"
              className="w-48"
            />
          </div>
          <div className="mb-1 flex h-[100px] items-end justify-between space-x-1">
            {data.map((item) => (
              <div
                key={item.value}
                className={`w-2 flex-1 rounded-sm transition-colors ${
                  isInRange(item.value) ? 'bg-govBlue-600' : 'bg-gray-300'
                }`}
                style={{
                  height: `${(item.count / maxCount) * 100}px` // Scale height to max 100px
                }}
              />
            ))}
          </div>

          <RangeSlider
            min={min}
            max={max}
            value={[tempRange.fromValue, tempRange.toValue]}
            onChange={(value) => {
              setTempRange({
                fromValue: value[0],
                toValue: value[1]
              })
            }}
          />

          <div className="flex items-center justify-between">
            <Button onClick={handleApply}>Apply</Button>

            <Button variant="default" onClick={handleClear}>
              Clear
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
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

export default ValueRangeFilter
