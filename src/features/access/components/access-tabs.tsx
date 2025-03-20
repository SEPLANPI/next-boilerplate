import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import { FileSpreadsheet, UserPlus } from 'lucide-react'
import { useParams } from 'next/navigation'

export function AccessTabs() {
  const accessTabItems: TabItem[] = [
    { value: 'cadastros', icon: FileSpreadsheet, label: 'Cadastros' },
    { value: 'convites', icon: UserPlus, label: 'Convites' }
  ]

  return (
    <NavigationTabs
      items={accessTabItems}
      basePath={`/acessos`}
      defaultValue="cadastros"
    />
  )
}
