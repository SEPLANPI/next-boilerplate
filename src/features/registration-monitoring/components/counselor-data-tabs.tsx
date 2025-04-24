'use client'

import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import { FileSpreadsheet, User } from 'lucide-react'
import { useParams } from 'next/navigation'

export function CounselorDataTabs() {
  const { id, eventId } = useParams<{ id: string; eventId: string }>()

  const accessTabItems: TabItem[] = [
    { value: 'dados', icon: User, label: 'Dados Pessoais' },
    { value: 'propostas', icon: FileSpreadsheet, label: 'Propostas' }
  ]

  return (
    <NavigationTabs
      items={accessTabItems}
      basePath={`/${eventId}/admin/conselheiros/cadastros/${id}`}
      defaultValue="dados"
    />
  )
}
