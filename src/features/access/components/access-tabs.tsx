'use client'

import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import {
  ChartColumnBig,
  FilePen,
  FileSpreadsheet,
  UserPlus
} from 'lucide-react'
import { useParams } from 'next/navigation'

export function AccessTabs() {
  const { eventId } = useParams<{ eventId: string }>()

  const accessTabItems: TabItem[] = [
    { value: 'visao-geral', icon: ChartColumnBig, label: 'Visão Geral' },
    { value: 'inscricoes-gerais', icon: FilePen, label: 'Inscrições Gerais' },
    { value: 'conselheiros', icon: FileSpreadsheet, label: 'Conselheiros' },
    { value: 'convites', icon: UserPlus, label: 'Convites' }
  ]

  return (
    <NavigationTabs
      items={accessTabItems}
      basePath={`/${eventId}/admin/acessos`}
      defaultValue="conselheiros"
    />
  )
}
