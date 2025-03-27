import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { SearchParams } from 'nuqs'
import { registrationSearchParams } from '@/features/registration-monitoring/lib/search-params'
import { AccessTabs } from '@/features/access/components/access-tabs'
import { RegistrationFilters } from '@/features/registration-monitoring/components/registration-filters'
import { RegistrationListView } from '@/features/registration-monitoring/components/registration-list-view'
import { RegistrationTableSkeleton } from '@/features/registration-monitoring/components/registration-table-skeleton'
import { Suspense } from 'react'
import { Divider } from '@mantine/core'
import { Users } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cadastros'
}

interface CadastrosProps {
  searchParams: SearchParams
}

export default async function Cadastros({ searchParams }: CadastrosProps) {
  const params = await registrationSearchParams.parse(searchParams)
  const suspenseKey = `registration-${JSON.stringify(params)}`
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
          <div className="mb-5">
            <Suspense>
              <RegistrationFilters />
            </Suspense>
          </div>
          <Suspense fallback={<RegistrationTableSkeleton />} key={suspenseKey}>
            <RegistrationListView />
          </Suspense>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
