import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import CounselorEditView from '@/features/registration-monitoring/components/counselor-edit-view'
import { CounselorDataTabs } from '@/features/registration-monitoring/components/counselor-data-tabs'
import { ValidateCounselorModal } from '@/features/registration-monitoring/components/validate-counselor-modal'
import { Users } from 'lucide-react'

export default async function AdminCounselorViewLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string; eventId: string }
}) {
  const items: BreadcrumbItem[] = [
    {
      label: 'Conselheiros',
      href: `/${params.eventId}/admin/conselheiros/cadastros`
    },
    {
      label: 'Dados do Conselheiro'
    }
  ]

  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
      </DashboardHeader>
      <div className="flex items-center justify-between border-b pl-4 pr-8">
        <CounselorDataTabs />
        <div className="flex gap-2">
          <CounselorEditView id={params.id} />
          <ValidateCounselorModal counselorId={params.id} />
        </div>
      </div>
      {children}
    </>
  )
}
