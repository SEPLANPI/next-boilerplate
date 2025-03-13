'use client'

import { SidebarConfig } from '@/types/sidebar'
import { Users } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Diálogos'
  },
  sections: [
    {
      items: [
        {
          label: 'Acessos',
          href: '/admin/acessos/cadastros',
          icon: Users
        }
      ]
    }
  ]
} as const
