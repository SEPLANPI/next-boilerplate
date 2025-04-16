import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import CounselorEditView from '@/features/registration-monitoring/components/counselor-edit-view'
import { CounselorTabs } from '@/features/registration-monitoring/components/counselor-tabs'
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
      label: 'Acessos',
      icon: Users
    },
    {
      label: 'Conselheiros',
      href: `/${params.eventId}/admin/acessos/conselheiros`
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
        <CounselorTabs />
        <div className="flex gap-2">
          <CounselorEditView id={params.id} />
          <ValidateCounselorModal counselorId={params.id} />
        </div>
      </div>
      {children}
    </>
  )
}
