import { FetchError } from '@/components/errors/fetch-error'
import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { getProposal } from '@/features/proposals/api/get-proposals'
import ProposalDetails from '@/features/proposals/components/proposal-details'
import { ClipboardList } from 'lucide-react'

export default async function Proposta({ params }: { params: { id: string } }) {
  const { data: propostaData, error: error } = await getProposal(params.id)
  if (propostaData === undefined) {
    return (
      <div className="p-8">
        <FetchError error={error} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <FetchError error={error} />
      </div>
    )
  }

  const items: BreadcrumbItem[] = [
    {
      label: 'Propostas',
      href: '/admin/propostas',
      icon: ClipboardList
    },
    {
      label: propostaData?.titulo || '?'
    }
  ]
  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
      </DashboardHeader>
      <DashboardContent className="flex-row gap-8">
        <DashboardMainSection>
          <ProposalDetails proposta={propostaData} />
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
