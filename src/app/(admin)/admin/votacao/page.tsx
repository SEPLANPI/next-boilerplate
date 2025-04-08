import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { QRCodeButton } from '@/features/admin-voting/components/generate-qrcode-button'
import { Vote } from 'lucide-react'

export default async function Votacao() {
  const items: BreadcrumbItem[] = [
    {
      label: 'Votação',
      icon: Vote
    }
  ]
  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
      </DashboardHeader>
      <DashboardContent>
        <DashboardMainSection>
          <QRCodeButton />
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
