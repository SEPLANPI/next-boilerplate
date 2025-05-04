import { Calendar } from 'lucide-react'
import { ReactNode } from 'react'
import { TitleBadge } from '../title-badge'

export interface CityPanelProps {
  className?: string
}

interface CityPanelRootProps {
  className?: string
  children: ReactNode
}

interface CityPanelContentProps {
  children: ReactNode
}

export function CityPanelRoot({ className, children }: CityPanelRootProps) {
  return <div className={className}>{children}</div>
}

export function CityPanelHeaderRoot({ children }: { children: ReactNode }) {
  return <div className="mb-2 flex w-full flex-col gap-1">{children}</div>
}

export function CityPanelHeaderBadge({ isCurrent }: { isCurrent?: boolean }) {
  return (
    <TitleBadge className='mb-4'>
      {isCurrent ? 'Onde estamos agora' : 'Por onde passamos'}
    </TitleBadge>
  )
}

export function CityPanelHeaderTitle({ territory }: { territory: string }) {
  return (
    <h2 className="truncate text-[22px] font-semibold text-lime-700 sm:text-[29px]">
      {territory}
    </h2>
  )
}

export function CityPanelHeaderDate({ date }: { date: string }) {
  return (
    <div className="flex items-center text-sm text-stone-500 ">
      <Calendar className="mr-1 size-4 text-lime-700" />
      <span>{date}</span>
    </div>
  )
}

export function CityPanelContent({ children }: CityPanelContentProps) {
  return <div className="flex flex-col space-y-2">{children}</div>
}

export function CityPanelActions({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex">{children}</div>
}
