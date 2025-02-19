'use client'

import { SidebarConfig } from '@/types/sidebar'
import {
  Building,
  CalendarDays,
  Flag,
  Landmark,
  MapPinHouse,
  Users,
  Map
} from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Piauí365'
  },
  sections: [
    {
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
  ]
} as const
