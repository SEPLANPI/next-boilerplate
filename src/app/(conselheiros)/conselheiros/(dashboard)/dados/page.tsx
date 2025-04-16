import { FetchError } from '@/components/errors/fetch-error'
import { getMeusDados } from '@/features/counselors/api/get-meusDados'
import { Metadata } from 'next'
import { CounselorInfoView } from '@/features/counselors/components/counselor-info-view'
import { Card } from '@mantine/core'
import EditCounselorDrawer from '@/features/registration-monitoring/components/counselor-edit-drawer'

export const metadata: Metadata = {
  title: 'Dados'
}

export default async function Dados() {
  const { data: myData, error: error } = await getMeusDados()
  if (error) {
    return <FetchError error={error} />
  }

  if (!myData) {
    return <FetchError error="No data" />
  }

  return (
    <Card
      className="p-5"
      withBorder
      radius={24}
      shadow="sm"
      style={{ borderColor: '#e5e7eb' }}
    >
      <CounselorInfoView data={myData} />
    </Card>
  )
}
