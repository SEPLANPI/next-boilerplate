import { SidebarConfig, NavigationItem, NavigationGroup } from '@/types/sidebar'
import { Building, CalendarDays, Landmark, Users } from 'lucide-react'

export const sidebarConfig: SidebarConfig = [
  {
    title: 'Geral',
    items: [
      {
        label: 'Eventos',
        href: '/',
        icon: CalendarDays
      },
      {
        label: 'Empresas',
        href: '/empresas',
        icon: Building
      },
      {
        label: 'Unidades Gestoras',
        href: '/ugs',
        icon: Landmark
      },
      {
        label: 'Deputados',
        href: '/deputados',
        icon: Users
      }
    ]
  }
] as const

export function isNavigationGroup(
  item: NavigationItem
): item is NavigationGroup {
  return 'items' in item && Array.isArray(item.items) && item.items.length > 0
}
