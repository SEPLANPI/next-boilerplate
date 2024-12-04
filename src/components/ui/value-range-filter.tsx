import React, { useCallback, useEffect } from 'react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { RangeSlider, Button, Popover, TextInput, Divider } from '@mantine/core'
import { ChevronDown, Minus } from 'lucide-react'

interface ValueRangeFilterProps {
  min: number
  max: number
  data: { value: number; count: number }[]
  children: React.ReactNode
}

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

  const handleClear = () => {
    setTempRange({ fromValue: min, toValue: max })
    setValueRange({ fromValue: null, toValue: null })
  }
  const handleFromValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cleanValue = parseFloat(
        event.currentTarget.value.replace(/[^0-9.-]+/g, '')
      )
      setTempRange((prev) => ({
        ...prev,
        fromValue: isNaN(cleanValue) ? min : cleanValue
      }))
    },
    [min]
  )

  const handleToValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cleanValue = parseFloat(
        event.currentTarget.value.replace(/[^0-9.-]+/g, '')
      )
      setTempRange((prev) => ({
        ...prev,
        toValue: isNaN(cleanValue) ? max : cleanValue
      }))
    },
    [max]
  )

  // Resetar inputs quando botão de limpar filtros é utilizado
  useEffect(() => {
    if (!valueRange.toValue && !valueRange.fromValue) {
      setTempRange({ fromValue: min, toValue: max })
    }
  }, [valueRange, min, max])

  const formatValueRange = () => {
    return `R$ ${valueRange.fromValue?.toLocaleString()} - R$ ${valueRange.toValue?.toLocaleString()}`
  }

  const hasRangeApplied =
    (!!valueRange.fromValue || !!valueRange.toValue) &&
    (valueRange.fromValue !== min || valueRange.toValue !== max)

  const isValidRangeSelected =
    tempRange.fromValue !== min || tempRange.toValue !== max

  const maxCount = Math.max(...data.map((item) => item.count))

  const isInRange = (value: number) =>
    value >= tempRange.fromValue && value <= tempRange.toValue

  return (
    <Popover position="bottom-start" shadow="md">
      <Popover.Target>
        <Button
          data-active={hasRangeApplied}
          variant="secondary"
          className="data-[active=true]:bg-govBlue-50 data-[active=true]:text-govBlue-700"
          rightSection={<ChevronDown className="size-4" />}
        >
          {children}
          {hasRangeApplied && (
            <>
              <Divider
                orientation="vertical"
                className="m-2 border-govBlue-300"
              />
              <p className="text-xs font-semibold uppercase">
                {formatValueRange()}
              </p>
            </>
          )}
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <div className="flex flex-col space-y-4">
          <div className="mb-1 flex h-[100px] items-end justify-between space-x-1">
            {data.map((item) => (
              <div
                data-in-range={isInRange(item.value)}
                key={item.value}
                className="w-2 flex-1 rounded-sm bg-gray-300 transition-colors data-[in-range=true]:bg-govBlue-600"
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
          <div className="flex items-center space-x-2">
            <TextInput
              leftSection={
                <span className="mt-0.5 block text-sm font-medium text-secondary-foreground">
                  R$
                </span>
              }
              value={tempRange.fromValue?.toLocaleString()}
              onChange={handleFromValueChange}
              className="w-32"
            />
            <Minus className="size-3" />
            <TextInput
              leftSection={
                <span className="mt-0.5 block text-sm font-medium text-secondary-foreground">
                  R$
                </span>
              }
              value={tempRange.toValue?.toLocaleString()}
              onChange={handleToValueChange}
              className="w-32"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleApply}
              size="sm"
              disabled={!isValidRangeSelected}
            >
              Aplicar
            </Button>
            <Button variant="default" onClick={handleClear} size="sm">
              Limpar
            </Button>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}

export default ValueRangeFilter
