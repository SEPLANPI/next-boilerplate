import { SidebarConfig, NavigationItem, NavigationGroup } from '@/types/sidebar'
import { CalendarDays } from 'lucide-react'

export const sidebarConfig: SidebarConfig = [
  {
    title: 'Geral',
    items: [
      {
        label: 'Eventos',
        href: '/',
        icon: CalendarDays
      },
    ]
  }
] as const

export function isNavigationGroup(
  item: NavigationItem
): item is NavigationGroup {
  return 'items' in item && Array.isArray(item.items) && item.items.length > 0
} 