import { FetchError } from '@/components/errors/fetch-error'
import { getCounselorById } from '@/features/registration-monitoring/api/get-counselor-by-id'
import { CounselorInfoView } from '../../counselors/components/counselor-info-view'
import { DashboardMainSection } from '@/components/layouts/dashboard-layout/content'
import { BackButton } from '@/components/ui/back-button'

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
      <div className="mb-6 flex items-center space-x-3">
        <BackButton />
        <span className="text-xs font-bold text-secondary-foreground">
          {data.nome}
        </span>
      </div>
      <DashboardMainSection>
        <CounselorInfoView data={data} />
      </DashboardMainSection>
    </>
  )
}
