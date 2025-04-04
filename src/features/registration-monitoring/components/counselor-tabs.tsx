'use client'

import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import { FileSpreadsheet, User } from 'lucide-react'
import { useParams } from 'next/navigation'

export function CounselorTabs() {
  const accessTabItems: TabItem[] = [
    { value: 'dados', icon: User, label: 'Dados Pessoais' },
    { value: 'propostas', icon: FileSpreadsheet, label: 'Propostas' }
  ]

  const { id } = useParams<{ id: string }>()

  return (
    <NavigationTabs
      items={accessTabItems}
      basePath={`/admin/acessos/conselheiros/${id}`}
      defaultValue="dados"
    />
  )
}
