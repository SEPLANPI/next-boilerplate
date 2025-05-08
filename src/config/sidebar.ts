'use client'

import { SidebarConfig } from '@/types/sidebar'
import { File } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Boilerplate',
    logos: {
      collapsed: '/logo.svg',
      expanded: '/logo.svg'
    }
  },
  sections: [
    {
      items: [
        {
          label: 'Página Exemplo',
          href: '/',
          icon: File
        }
      ]
    }
  ]
} as const
