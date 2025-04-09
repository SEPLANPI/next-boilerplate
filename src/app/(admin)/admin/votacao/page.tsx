import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import {
  DashboardHeader,
  DashboardHeaderActions
} from '@/components/layouts/dashboard-layout/header'
import { Vote } from 'lucide-react'
import { Metadata } from 'next'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { votingSearchParams } from '@/features/admin-voting/lib/search-params'
import { VotingListView } from '@/features/admin-voting/components/voting-list-view'
import { VotingFilters } from '@/features/admin-voting/components/voting-filters'
import { VotingTableSkeleton } from '@/features/admin-voting/components/voting-table-skeleton'
import { QRCodeButton } from '@/features/admin-voting/components/generate-qrcode-button'

export const metadata: Metadata = {
  title: 'Votação'
}

export default async function Votacoes({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await votingSearchParams.parse(searchParams)
  const suspenseKey = `voting-${JSON.stringify(params)}`

  const items: BreadcrumbItem[] = [
    {
      label: 'Votação',
      icon: Vote
    }
  ]

  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
        <DashboardHeaderActions>
          <QRCodeButton />
        </DashboardHeaderActions>
      </DashboardHeader>
      <DashboardContent>
        <DashboardMainSection>
          <div className="mb-5 flex justify-between space-x-4">
            <Suspense>
              <VotingFilters />
            </Suspense>
          </div>
          <Suspense fallback={<VotingTableSkeleton />} key={suspenseKey}>
            <VotingListView />
          </Suspense>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
