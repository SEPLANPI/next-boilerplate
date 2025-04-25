import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { ProposalsFilters } from '@/features/proposals/components/proposals-filters'
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
  params: { eventId: string }
}

export default async function Propostas({
  searchParams,
  params
}: PropostasProps) {
  const paramsParsed = await proposalsSearchParams.parse(searchParams)
  const suspenseKey = JSON.stringify(paramsParsed)
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
      </DashboardHeader>
      <DashboardContent>
        <DashboardMainSection>
          <div className="mb-5 flex justify-end space-x-4">
            <ProposalsFilters />
            <ProposalsModal />
          </div>
          <Suspense fallback={<ProposalsTableSkeleton />} key={suspenseKey}>
            <ProposalsListView params={params} />
          </Suspense>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
