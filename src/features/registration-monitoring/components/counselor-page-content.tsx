import { FetchError } from '@/components/errors/fetch-error'
import { getCounselorById } from '@/features/registration-monitoring/api/get-counselor-by-id'
import { CounselorInfoView } from '../../counselors/components/counselor-info-view'
import { DashboardMainSection } from '@/components/layouts/dashboard-layout/content'
import { Divider } from '@mantine/core'
import { CounselorStatusBadge } from '@/components/ui/counselor-status-badge'

export async function CounselorPageContent({ id }: { id: string }) {
  const { data, error } = await getCounselorById(id)

  if (error) {
    return <FetchError error={error} />
  }

  if (!data) {
    return <FetchError error="No data" />
  }

  return (
    <>
      <DashboardMainSection>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col space-y-1">
            <h1 className="text-lg font-semibold">{data.nome}</h1>
            <p className="text-sm">{data.conselho.nome}</p>
          </div>
          <CounselorStatusBadge status={data.status_atual} />
        </div>
        <Divider className="my-6" />
        <CounselorInfoView data={data} />
      </DashboardMainSection>
    </>
  )
}
