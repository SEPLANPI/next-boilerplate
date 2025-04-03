import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { AccessTabs } from '@/features/proposals/components/access-tabs'
import { ProposalsListView } from '@/features/proposals/components/proposals-list-view'
import ProposalsModal from '@/features/proposals/components/proposals-modal'
import { ProposalsTableSkeleton } from '@/features/proposals/components/proposals-table-skeleton'
import { proposalsSearchParams } from '@/features/proposals/lib/search-params'
import { Divider } from '@mantine/core'
import { ClipboardList } from 'lucide-react'
import { Metadata } from 'next'
import { SearchParams } from 'nuqs'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Propostas'
}

interface PropostasProps {
  searchParams: SearchParams
}
export default async function Propostas({ searchParams }: PropostasProps) {
  const params = await proposalsSearchParams.parse(searchParams)
  const suspenseKey = JSON.stringify(params)
  const items: BreadcrumbItem[] = [
    {
      label: 'Propostas',
      icon: ClipboardList
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
        <DashboardMainSection>
          <div className="mb-5 flex justify-end">
            <ProposalsModal />
          </div>
          <Suspense fallback={<ProposalsTableSkeleton />} key={suspenseKey}>
            <ProposalsListView />
          </Suspense>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
