'use client'

import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import { FileSpreadsheet, UserPlus } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function AccessTabs() {
  const { data } = useSession()

  console.log(data?.accessToken)
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
