import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { CounselorTabs } from '@/features/counselors/components/counselor-tabs'
import { CreateInvitationModal } from '@/features/invitations/components/create-invitation-modal'
import { InvitationFilters } from '@/features/invitations/components/invitation-filters'
import { InvitationsListView } from '@/features/invitations/components/invitations-list-view'
import { InvitationsTableSkeleton } from '@/features/invitations/components/invitations-table-skeleton'
import { invitationsSearchParams } from '@/features/invitations/lib/search-params'
import { Divider } from '@mantine/core'
import { Users } from 'lucide-react'
import { Metadata } from 'next'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Convites'
}

export default async function Convites({
  searchParams,
  params
}: {
  searchParams: Promise<SearchParams>
  params: { eventId: string }
}) {
  const parsedParams = await invitationsSearchParams.parse(searchParams)

  const suspenseKey = `invitation-${JSON.stringify(parsedParams)}`

  const items: BreadcrumbItem[] = [
    {
      label: 'Conselheiros',
      icon: Users
    }
  ]
  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
        <Divider orientation="vertical" className="my-auto h-6" />
        <CounselorTabs />
      </DashboardHeader>
      <DashboardContent>
        <DashboardMainSection>
          <div className="mb-5 flex justify-between space-x-4">
            <Suspense>
              <InvitationFilters />
            </Suspense>
            <CreateInvitationModal />
          </div>
          <Suspense fallback={<InvitationsTableSkeleton />} key={suspenseKey}>
            <InvitationsListView params={params} />
          </Suspense>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
