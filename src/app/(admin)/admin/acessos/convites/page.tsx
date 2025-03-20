import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import { DashboardContent } from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { AccessTabs } from '@/features/access/components/access-tabs'
import { InvitationFilters } from '@/features/invitations/components/invitation-filters'
import { InvitationsListView } from '@/features/invitations/components/invitations-list-view'
import { InvitationsTableSkeleton } from '@/features/invitations/components/invitations-table-skeleton'
import { invitationsSearchParams } from '@/features/invitations/lib/search-params'
import { Users } from 'lucide-react'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export default async function Convites({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  await invitationsSearchParams.parse(searchParams)

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
      </DashboardHeader>
      <AccessTabs />
      <DashboardContent>
        <div className="mb-5">
          <InvitationFilters />
        </div>
        <Suspense fallback={<InvitationsTableSkeleton />}>
          <InvitationsListView />
        </Suspense>
      </DashboardContent>
    </>
  )
}
