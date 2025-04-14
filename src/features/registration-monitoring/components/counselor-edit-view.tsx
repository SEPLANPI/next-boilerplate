import { getCounselorById } from '../api/get-counselor-by-id'
import EditCounselorDrawer from './counselor-edit-drawer'

export default async function CounselorEditView({ id }: { id: string }) {
  const { data, error } = await getCounselorById(id)

  return (
    <>
      {!error && (
        <div>
          <EditCounselorDrawer counselor={data} />
        </div>
      )}
    </>
  )
}
