import { DashboardMainSection } from '@/components/layouts/dashboard-layout/content'
import CounselorInfoSkeleton from '@/features/counselors/components/counselor-info-skeleton'
import { Divider, Skeleton } from '@mantine/core'

export function CounselorPageSkeleton() {
  return (
    <>
      <DashboardMainSection>
        <div className="flex w-full flex-col space-y-2">
          <Skeleton w="70%" h={18} />
          <Skeleton w="25%" h={14} />
        </div>
        <Divider className="my-6" />
        <CounselorInfoSkeleton />
      </DashboardMainSection>
    </>
  )
}
