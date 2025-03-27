'use client'

import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import { FileSpreadsheet } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function AccessTabs() {
  const { data } = useSession()

  const accessTabItems: TabItem[] = [
    { value: 'propostas', icon: FileSpreadsheet, label: 'Propostas Gerais' }
  ]

  return (
    <NavigationTabs
      items={accessTabItems}
      basePath={`/admin/`}
      defaultValue="propostas"
    />
  )
}
