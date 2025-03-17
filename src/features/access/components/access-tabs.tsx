'use client'
import { InvitationForm } from '@/features/invitations/components/invitation-form'
import { Tabs, TabsList, TabsTab } from '@mantine/core'
import { FileSpreadsheet, UserPlus } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'

export default function AccessTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const id = params.id as string

  const getActiveTab = () => {
    const segments = pathname.split('/')
    if (segments[segments.length - 1] === id) {
      return 'geral'
    }
    return segments[segments.length - 1]
  }

  const activeTab = getActiveTab()

  const handleTabChange = (value: string | null) => {
    router.push(`/acessos/${value}`)
  }

  const tabItems = [
    { value: 'cadastros', icon: FileSpreadsheet, label: 'Cadastros' },
    { value: 'convites', icon: UserPlus, label: 'Convites' }
  ]

  return (
    <Tabs className="relative" value={activeTab} onChange={handleTabChange}>
      <TabsList className="items-center pl-1 pr-5">
        <div className="flex gap-4">
          {tabItems.map((tab, index) => (
            <TabsTab
              key={index}
              value={tab.value}
              defaultValue="cadastros"
              className={`px-3 py-4 text-sm ${
                activeTab === tab.value
                  ? 'font-bold text-govBlue-600'
                  : 'font-normal text-gray-700'
              }`}
              leftSection={
                <tab.icon
                  className={`size-4 ${activeTab === tab.value ? 'text-govBlue-600' : ''}`}
                />
              }
            >
              <div className="flex items-center gap-2">
                <span>{tab.label}</span>
              </div>
            </TabsTab>
          ))}
        </div>
        <div className="ml-auto">
          <InvitationForm />
        </div>
      </TabsList>
    </Tabs>
  )
}
