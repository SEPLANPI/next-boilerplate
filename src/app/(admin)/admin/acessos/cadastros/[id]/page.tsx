import { FetchError } from '@/components/errors/fetch-error'
import { getCounselorById } from '@/features/registration-monitoring/api/get-counselor-by-id'
import { ActionIcon, Divider } from '@mantine/core'
import { Metadata } from 'next'
import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import { DashboardContent } from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { AccessTabs } from '@/features/access/components/access-tabs'
import { Users } from 'lucide-react'
import { Suspense } from 'react'
import { CounselorPageContent } from '@/features/registration-monitoring/components/counselor-page-content'
import { CounselorPageSkeleton } from '@/features/registration-monitoring/components/counselor-page-skeleton'

export const metadata: Metadata = {
  title: 'Dados do Conselheiro'
}

export default async function Dados({ params }: { params: { id: string } }) {
  const items: BreadcrumbItem[] = [
    {
      label: 'Acessos',
      icon: Users
    }
  ]

  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
        <Divider orientation="vertical" className="my-auto h-6" />
        <AccessTabs />
      </DashboardHeader>
      <DashboardContent>
        <Suspense fallback={<CounselorPageSkeleton />}>
          <CounselorPageContent id={params.id} />
        </Suspense>
      </DashboardContent>
    </>
  )
}
