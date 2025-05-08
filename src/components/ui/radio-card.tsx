import { Radio, Tooltip, RadioCardProps } from '@mantine/core'
import { Info } from 'lucide-react'

export function RadioCard({
  value,
  label,
  description,
  disabled,
  disabledTooltip
}: RadioCardProps & {
  label: string
  description?: string
  disabledTooltip?: string
}) {
  return (
    <Radio.Card
      className="flex items-center space-x-4 rounded border p-3 text-sm text-secondary-foreground transition-colors disabled:bg-gray-50 disabled:text-gray-500 data-[checked=true]:border-govGreen-600 data-[checked=true]:bg-govGreen-50/50"
      value={value}
      disabled={disabled}
    >
      <div className="flex w-full items-start">
        <div className="flex flex-1 flex-col space-y-1">
          <div className="flex items-start space-x-3">
            <Radio.Indicator />
            <div className="flex flex-col">
              <span className="font-medium">{label}</span>
              {description && (
                <p className="text-content-muted text-sm">{description}</p>
              )}
            </div>
          </div>
        </div>
        {disabled && disabledTooltip && (
          <Tooltip label={disabledTooltip}>
            <Info className="size-4 shrink-0" />
          </Tooltip>
        )}
      </div>
    </Radio.Card>
  )
}
