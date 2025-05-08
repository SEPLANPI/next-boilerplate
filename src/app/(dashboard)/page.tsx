import {
  BreadcrumbItem,
  DashboardBreadcrumbs
} from '@/components/layouts/dashboard-layout/breadcrumbs'
import {
  DashboardContent,
  DashboardMainSection
} from '@/components/layouts/dashboard-layout/content'
import { DashboardHeader } from '@/components/layouts/dashboard-layout/header'
import { File } from 'lucide-react'

export default async function Home() {
  const items: BreadcrumbItem[] = [
    {
      icon: File,
      label: 'Página Exemplo'
    }
  ]
  return (
    <>
      <DashboardHeader>
        <DashboardBreadcrumbs items={items} />
      </DashboardHeader>
      <DashboardContent>
        <DashboardMainSection>
          <h1>Página Exemplo</h1>
        </DashboardMainSection>
      </DashboardContent>
    </>
  )
}
