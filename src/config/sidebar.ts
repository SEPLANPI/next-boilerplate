'use client'

import { SidebarConfig } from '@/types/sidebar'
import {
  BarChartBig,
  Bot,
  ClipboardList,
  FileUser,
  HandHelping,
  MessageSquareText,
  Users,
  Vote
} from 'lucide-react'

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
          label: 'Visão Geral',
          href: '/:eventId/admin/visao-geral',
          match: '/admin/visao-geral',
          icon: BarChartBig,
          authorizedRoles: ['admin']
        },
        {
          label: 'Inscrições Abertas',
          href: '/:eventId/admin/inscricoes-abertas',
          match: '/admin/inscricoes-abertas',
          icon: FileUser,
          authorizedRoles: ['admin']
        },
        {
          label: 'Conselheiros',
          icon: Users,
          href: '/:eventId/admin/conselheiros/cadastros',
          match: '/admin/conselheiros/cadastros',
          authorizedRoles: ['admin']
        }
      ]
    },

    {
      title: 'Votação',
      items: [
        {
          label: 'Gerar Propostas por IA',
          href: '/:eventId/admin/geracao-propostas',
          match: '/admin/geracao-propostas',
          icon: Bot,
          authorizedRoles: ['admin']
        },
        {
          label: 'Gerenciar Propostas',
          href: '/:eventId/admin/propostas',
          match: '/admin/propostas',
          icon: ClipboardList,
          authorizedRoles: ['admin']
        },
        {
          label: 'Votação',
          href: '/:eventId/admin/votacao',
          match: '/admin/votacao',
          icon: Vote,
          authorizedRoles: ['admin']
        }
      ]
    },
    {
      title: 'Avaliações',
      items: [
        {
          label: 'Avaliações',
          href: '/:eventId/admin/avaliacoes',
          match: '/admin/avaliacoes',
          icon: MessageSquareText,
          authorizedRoles: ['admin']
        }
      ]
    },
    {
      title: 'Atendimentos',
      items: [
        {
          label: 'Atendimentos',
          href: '/:eventId/admin/atendimentos',
          match: '/admin/atendimentos',
          icon: HandHelping,
          authorizedRoles: ['admin']
        }
      ]
    }
  ]
} as const
