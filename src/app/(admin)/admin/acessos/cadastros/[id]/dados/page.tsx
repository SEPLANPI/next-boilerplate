import { Metadata } from 'next'
import { DashboardContent } from '@/components/layouts/dashboard-layout/content'
import { Suspense } from 'react'
import { CounselorPageContent } from '@/features/registration-monitoring/components/counselor-page-content'
import { CounselorPageSkeleton } from '@/features/registration-monitoring/components/counselor-page-skeleton'

export const metadata: Metadata = {
  title: 'Dados do Conselheiro'
}

export default async function Dados({ params }: { params: { id: string } }) {
  return (
    <>
      <DashboardContent>
        <Suspense fallback={<CounselorPageSkeleton />}>
          <CounselorPageContent id={params.id} />
        </Suspense>
      </DashboardContent>
    </>
  )
}
