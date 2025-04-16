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
import { GeneralRegistrationFilters } from '@/features/general-registration/components/general-registration-filters'
import { GeneralRegistrationListView } from '@/features/general-registration/components/general-registration-list-view'
import { generalRegistrationSearchParams } from '@/features/general-registration/lib/search-params'
import { RegistrationTableSkeleton } from '@/features/registration-monitoring/components/registration-table-skeleton'
import { Divider } from '@mantine/core'
import { DoorOpen } from 'lucide-react'
import { Metadata } from 'next'
import { SearchParams } from 'nuqs'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Inscrições Gerais'
}

interface CadastrosProps {
  searchParams: SearchParams
  params: { eventId: string }
}

export default async function InscricoesGerais({
  searchParams,
  params
}: CadastrosProps) {
  const paramsParsed = await generalRegistrationSearchParams.parse(searchParams)
  const suspenseKey = `registration-${JSON.stringify(paramsParsed)}`

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
              <GeneralRegistrationFilters />
            </Suspense>
          </div>
          <Suspense fallback={<RegistrationTableSkeleton />} key={suspenseKey}>
            <GeneralRegistrationListView params={params} />
          </Suspense>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
