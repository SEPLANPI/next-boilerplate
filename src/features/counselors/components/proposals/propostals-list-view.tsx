import { FetchError } from '@/components/errors/fetch-error'
import { SearchParams } from 'nuqs'
import { getMinhasPropostas } from '../../api/get-minhasPropostas'
import { propostaSearchParams } from '../../lib/search-params'
import ProposalsList from './proposals-list'

export default async function PropostasListView({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = propostaSearchParams.parse(await searchParams)
  const { data: minhasPropostas, error: error } =
    await getMinhasPropostas(params)

  if (error) {
    return <FetchError error={error} />
  }
  if (minhasPropostas && minhasPropostas.length === 0) {
    return <div className="pt-6 text-center">Nenhuma proposta encontrada.</div>
  }

  return <ProposalsList propostas={minhasPropostas || []} />
}
