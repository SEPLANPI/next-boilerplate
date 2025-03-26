import { SearchInput } from '@/components/ui/search-input'
import ProposalsModal from '@/features/counselors/components/proposals/proposals-modal'
import PropostasListView from '@/features/counselors/components/proposals/propostals-list-view'
import { propostaSearchParams } from '@/features/counselors/lib/search-params'
import { Card, Loader } from '@mantine/core'
import { Metadata } from 'next'
import { SearchParams } from 'nuqs'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Propostas'
}

export interface Propostas {
  titulo: string
  descricao: string
  status: string
}

export default async function Propostas({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = propostaSearchParams.parse(await searchParams)
  const suspenseKey = JSON.stringify(params)

  return (
    <div className="-mb-[32px]  flex min-h-screen flex-col">
      <Card
        shadow="xs"
        padding="md"
        withBorder
        className="border-1 flex-grow rounded-t-xl bg-white p-6"
      >
        <div className="flex gap-4">
          <SearchInput className="max-w-full flex-1"/>
          <ProposalsModal />
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
          }
          key={suspenseKey}
        >
          <PropostasListView searchParams={searchParams} />
        </Suspense>
      </Card>
    </div>
  )
}
