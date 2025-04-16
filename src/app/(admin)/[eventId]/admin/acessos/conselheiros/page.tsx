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
import { RegistrationFilters } from '@/features/registration-monitoring/components/registration-filters'
import { RegistrationListView } from '@/features/registration-monitoring/components/registration-list-view'
import { RegistrationTableSkeleton } from '@/features/registration-monitoring/components/registration-table-skeleton'
import { registrationSearchParams } from '@/features/registration-monitoring/lib/search-params'
import { Divider } from '@mantine/core'
import { DoorOpen } from 'lucide-react'
import { Metadata } from 'next'
import { SearchParams } from 'nuqs'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Conselheiros'
}

interface CadastrosProps {
  searchParams: SearchParams
  params: { eventId: string }
}

export default async function Cadastros({
  searchParams,
  params
}: CadastrosProps) {
  const parsedParams = await registrationSearchParams.parse(searchParams)
  const suspenseKey = `registration-${JSON.stringify(parsedParams)}`
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
      <DashboardContent>
        <DashboardMainSection>
          <div className="mb-5">
            <Suspense>
              <RegistrationFilters />
            </Suspense>
          </div>
          <Suspense fallback={<RegistrationTableSkeleton />} key={suspenseKey}>
            <RegistrationListView params={params} />
          </Suspense>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
