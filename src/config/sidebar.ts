'use client'

import { SidebarConfig } from '@/types/sidebar'
import { BarChartBig, ClipboardList, FileUser, Users, Vote } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Diálogos',
    logos: {
      collapsed: '/logo/icon/verde-verde.png',
      expanded: '/logo/horizontal/verde-verde.png'
    }
  },
  sections: [
    {
      title: 'Inscrições',
      items: [
        {
          label: 'Visão Geral',
          href: '/:eventId/admin/visao-geral',
          match: '/admin/visao-geral',
          icon: BarChartBig
        },
        {
          label: 'Inscrições Abertas',
          href: '/:eventId/admin/inscricoes-abertas',
          match: '/admin/inscricoes-abertas',
          icon: FileUser
        },
        {
          label: 'Conselheiros',
          href: '/:eventId/admin/conselheiros/cadastros',
          match: '/admin/conselheiros',
          icon: Users
        }
      ]
    },

    {
      title: 'Votação',
      items: [
        {
          label: 'Gerenciar Propostas',
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
