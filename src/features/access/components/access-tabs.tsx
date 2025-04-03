'use client'

import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import { FileSpreadsheet, UserPlus } from 'lucide-react'

export function AccessTabs() {
  const accessTabItems: TabItem[] = [
    { value: 'cadastros', icon: FileSpreadsheet, label: 'Cadastros' },
    { value: 'convites', icon: UserPlus, label: 'Convites' }
  ]

  return (
    <NavigationTabs
      items={accessTabItems}
      basePath={`/admin/acessos`}
      defaultValue="cadastros"
    />
  )
}
