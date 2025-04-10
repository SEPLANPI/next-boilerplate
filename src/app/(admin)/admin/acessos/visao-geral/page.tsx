import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import { DashboardContent } from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { AccessTabs } from '@/features/access/components/access-tabs'
import { Divider } from '@mantine/core'
import { DoorOpen } from 'lucide-react'
import { Suspense } from 'react'
import { OverviewPageContent } from '@/features/registration-monitoring/components/overview-page-content'
import { OverviewPageSkeleton } from '@/features/registration-monitoring/components/overview-page-skeleton'

export default function Dashboard() {
  const items: BreadcrumbItem[] = [
    {
      label: 'Acessos',
      icon: DoorOpen
    }
  ]

  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
        <Divider orientation="vertical" className="my-auto h-6" />
        <AccessTabs />
      </DashboardHeader>
      <DashboardContent className="p-6">
        <Suspense fallback={<OverviewPageSkeleton />}>
          <OverviewPageContent />
        </Suspense>
      </DashboardContent>
    </>
  )
}
