import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import { DashboardContent } from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { BarChartBig } from 'lucide-react'
import { Suspense } from 'react'
import { OverviewPageContent } from '@/features/registration-monitoring/components/overview-page-content'
import { OverviewPageSkeleton } from '@/features/registration-monitoring/components/overview-page-skeleton'

export default function Dashboard({ params }: { params: { eventId: string } }) {
  const items: BreadcrumbItem[] = [
    {
      label: 'VisaoGeral',
      icon: BarChartBig
    }
  ]

  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
      </DashboardHeader>
      <DashboardContent className="p-6">
        <Suspense fallback={<OverviewPageSkeleton />}>
          <OverviewPageContent params={params} />
        </Suspense>
      </DashboardContent>
    </>
  )
}
