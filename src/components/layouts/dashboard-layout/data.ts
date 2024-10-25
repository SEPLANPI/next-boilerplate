import { LucideProps, CalendarDays } from 'lucide-react'
import { ComponentType } from 'react'

interface BaseItem {
  label: string
}

interface LinkItem extends BaseItem {
  href: string
  items?: never
  Icon?: ComponentType<LucideProps>
}

interface ChildItem extends BaseItem {
  href: string
}

interface NestedItem extends BaseItem {
  items: readonly ChildItem[]
  href?: never
  Icon: ComponentType<LucideProps>
}

export type Item = LinkItem | NestedItem

interface Section {
  title: string
  items: Item[]
}

export function isNested(item: Item): boolean {
  return !!item.items && item.items.length > 0
}

export const items: Section[] = [
  {
    title: 'Geral',
    items: [
      {
        label: 'Eventos',
        href: '/',
        Icon: CalendarDays
      }
    ]
  }
] as const
