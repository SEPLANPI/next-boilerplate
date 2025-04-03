import { Radio, RadioCardProps } from '@mantine/core'
import { Check, X } from 'lucide-react'

export function ValidationRadioCard({
  value,
  label,
  variant = 'approve'
}: RadioCardProps & {
  label: string
  variant?: 'approve' | 'reject'
}) {
  return (
    <Radio.Card
      className={`flex flex-1 items-center space-x-4 rounded border p-3 text-sm transition-colors ${
        variant === 'approve'
          ? 'data-[checked=true]:border-govGreen-600 data-[checked=true]:bg-govGreen-50/50 data-[checked=true]:text-govGreen-700'
          : 'data-[checked=true]:border-red-600 data-[checked=true]:bg-red-50/50 data-[checked=true]:text-red-700'
      }`}
      value={value}
    >
      <div className="flex w-full items-center space-x-2">
        {variant === 'approve' ? (
          <Check className="size-5" />
        ) : (
          <X className="size-5" />
        )}
        <span className="font-medium">{label}</span>
      </div>
    </Radio.Card>
  )
}
