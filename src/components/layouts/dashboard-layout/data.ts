import { LucideProps, Grip, Grid2x2, File, FileText } from 'lucide-react'
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
    title: 'Páginas',
    items: [
      {
        label: 'Página Exemplo',
        href: '/',
        Icon: File
      },
      {
        label: 'Exemplo Form',
        href: '/exemplo-form',
        Icon: FileText
      }
    ]
  },
  {
    title: 'Exemplos Sidebar',
    items: [
      {
        label: 'Item Simples',
        href: '#',
        Icon: Grip
      },
      {
        label: 'Item Aninhado',
        Icon: Grid2x2,
        items: [
          {
            label: 'Item',
            href: '#'
          }
        ]
      }
    ]
  }
] as const
