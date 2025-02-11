import { SidebarConfig, NavigationItem, NavigationGroup } from '@/types/sidebar'
import {
  Building,
  CalendarDays,
  Flag,
  Landmark,
  MapPinHouse,
  Users,
  Map
} from 'lucide-react'

export const sidebarConfig: SidebarConfig = [
  {
    title: 'Eventos',
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
      }
    ]
  },
  {
    title: 'Política',
    items: [
      {
        label: 'Partidos',
        href: '/partidos',
        icon: Flag
      },
      {
        label: 'Deputados',
        href: '/deputados',
        icon: Users
      }
    ]
  },
  {
    title: 'Localidades',
    items: [
      {
        label: 'Territórios',
        href: '/territorios',
        icon: Map
      },
      {
        label: 'Municípios',
        href: '/municipios',
        icon: MapPinHouse
      }
    ]
  }
] as const

export function isNavigationGroup(
  item: NavigationItem
): item is NavigationGroup {
  return 'items' in item && Array.isArray(item.items) && item.items.length > 0
}
