'use client'

import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import { FilePen, FileSpreadsheet, UserPlus } from 'lucide-react'

export function AccessTabs() {
  const accessTabItems: TabItem[] = [
    { value: 'inscricoes-gerais', icon: FilePen, label: 'Inscrições Gerais' },
    { value: 'conselheiros', icon: FileSpreadsheet, label: 'Conselheiros' },
    { value: 'convites', icon: UserPlus, label: 'Convites' }
  ]

  return (
    <NavigationTabs
      items={accessTabItems}
      basePath={`/admin/acessos`}
      defaultValue="conselheiros"
    />
  )
}
