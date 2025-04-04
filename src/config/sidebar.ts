'use client'

import { SidebarConfig } from '@/types/sidebar'
import { ClipboardList, Users } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Diálogos'
  },
  sections: [
    {
      items: [
        {
          label: 'Acessos',
          href: '/admin/acessos/conselheiros',
          match: '/admin/acessos',
          icon: Users
        },
        {
          label: 'Propostas',
          href: '/admin/propostas',
          match: '/admin/propostas',
          icon: ClipboardList
        }
      ]
    }
  ]
} as const
