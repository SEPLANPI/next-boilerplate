'use client'

import { SidebarConfig } from '@/types/sidebar'
import { ClipboardList, DoorOpen, Vote } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Diálogos'
  },
  sections: [
    {
      items: [
        {
          label: 'Acessos',
          href: '/:eventId/admin/acessos/conselheiros',
          match: '/admin/acessos',
          icon: DoorOpen
        },
        {
          label: 'Propostas',
          href: '/:eventId/admin/propostas',
          match: '/admin/propostas',
          icon: ClipboardList
        },
        {
          label: 'Votação',
          href: '/:eventId/admin/votacao',
          match: '/admin/votacao',
          icon: Vote
        }
      ]
    }
  ]
} as const
