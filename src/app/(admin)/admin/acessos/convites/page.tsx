import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { AccessTabs } from '@/features/access/components/access-tabs'
import { InvitationFilters } from '@/features/invitations/components/invitation-filters'
import { InvitationForm } from '@/features/invitations/components/invitation-form'
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
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await invitationsSearchParams.parse(searchParams)

  const suspenseKey = `invitation-${JSON.stringify(params)}`

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
        <DashboardMainSection>
          <div className="mb-5 flex justify-between space-x-4">
            <Suspense>
              <InvitationFilters />
            </Suspense>
            <InvitationForm />
          </div>
          <Suspense fallback={<InvitationsTableSkeleton />} key={suspenseKey}>
            <InvitationsListView />
          </Suspense>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
