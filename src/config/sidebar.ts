'use client'

import { SidebarConfig } from '@/types/sidebar'
import { File } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Boilerplate',
    logo: undefined
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
