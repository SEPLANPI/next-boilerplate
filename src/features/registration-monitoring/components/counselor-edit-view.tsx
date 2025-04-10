import { FetchError } from '@/components/errors/fetch-error'
import { getCounselorById } from '../api/get-counselor-by-id'
import EditCounselorDrawer from './counselor-edit-drawer'

export default async function CounselorEditView({ id }: { id: string }) {
  const { data, error } = await getCounselorById(id)
  if (error) {
    return <FetchError title="Erro ao carregar dados do conselheiro" />
  }

  return <EditCounselorDrawer counselor={data} />
}
