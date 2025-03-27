import { DashboardMainSection } from '@/components/layouts/dashboard-layout/content'
import CounselorInfoSkeleton from '@/features/counselors/components/counselor-info-skeleton'
import { ActionIcon, Skeleton } from '@mantine/core'
import { ArrowLeft } from 'lucide-react'

export function CounselorPageSkeleton() {
  return (
    <>
      <div className="mb-6 flex items-center space-x-3">
        <ActionIcon size="md" radius="xl" variant="default">
          <ArrowLeft className="size-4" />
        </ActionIcon>
        <Skeleton height={14} width="200" />
      </div>
      <DashboardMainSection>
        <CounselorInfoSkeleton />
      </DashboardMainSection>
    </>
  )
}
