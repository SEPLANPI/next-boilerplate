import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import { DashboardContent } from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { SearchParams } from 'nuqs'
import { registrationSearchParams } from '@/features/registration-monitoring/lib/search-params'
import { AccessTabs } from '@/features/access/components/access-tabs'
import { RegistrationFilters } from '@/features/registration-monitoring/components/registration-filters'
import { RegistrationListView } from '@/features/registration-monitoring/components/registration-list-view'
import { RegistrationTableSkeleton } from '@/features/registration-monitoring/components/registration-table-skeleton'
import { Suspense } from 'react'
import { AxisCards } from '@/features/access/components/axis-cards'
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
        <Divider orientation="vertical" className="my-auto h-6" />
        <AccessTabs />
      </DashboardHeader>
      <h2 className="font-montserrat text-xl font-bold">Cadastros</h2>
      {/* <div className="z-10 grid grid-cols-12 gap-6 bg-gray-100 p-8 pb-0">
        <AxisCards />
      </div>
      <DashboardContent>
        <div className="mb-5">
          <RegistrationFilters />
        </div>
        <Suspense fallback={<RegistrationTableSkeleton />}>
          <RegistrationListView />
        </Suspense>
      </DashboardContent> */}
    </>
  )
}
