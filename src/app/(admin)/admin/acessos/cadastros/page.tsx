import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import { DashboardContent } from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { RegistrationListView } from '@/features/registration-monitoring/components/registration-list-view'
import { Suspense } from 'react'
import { RegistrationTableSkeleton } from '@/features/registration-monitoring/components/registration-table-skeleton'
import { Users } from 'lucide-react'
import { SearchParams } from 'nuqs'
import { registrationSearchParams } from '@/features/registration-monitoring/lib/search-params'
import { RegistrationFilters } from '@/features/registration-monitoring/components/registration-filters'
import { AccessTabs } from '@/features/access/components/access-tabs'

interface CadastrosProps {
  searchParams: SearchParams
}

export default async function Cadastros({ searchParams }: CadastrosProps) {
  await registrationSearchParams.parse(searchParams)
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
          <RegistrationFilters />
        </div>
        <Suspense fallback={<RegistrationTableSkeleton />}>
          <RegistrationListView />
        </Suspense>
      </DashboardContent>
    </>
  )
}
