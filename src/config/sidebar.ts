import { SidebarConfig, NavigationItem, NavigationGroup } from '@/types/sidebar'
import { FileText, Grid2x2, Grip, File } from 'lucide-react'

export const sidebarConfig: SidebarConfig = [
  {
    title: 'Páginas',
    items: [
      {
        label: 'Página Exemplo',
        href: '/',
        icon: File
      },
      {
        label: 'Exemplo Form',
        href: '/exemplo-form',
        icon: FileText
      }
    ]
  },
  {
    title: 'Exemplos Sidebar',
    items: [
      {
        label: 'Item Simples',
        href: '#',
        icon: Grip
      },
      {
        label: 'Item Aninhado',
        icon: Grid2x2,
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

export function isNavigationGroup(
  item: NavigationItem
): item is NavigationGroup {
  return 'items' in item && Array.isArray(item.items) && item.items.length > 0
} 