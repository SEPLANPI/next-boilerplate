import {
  HeaderContent,
  PageHeader
} from '@/components/layouts/dashboard-layout'

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs'

export default async function Home() {
  const items: BreadcrumbItem[] = [
    {
      label: 'Página Exemplo'
    }
  ]
  return (
    <>
      <PageHeader>
        <HeaderContent>
          <Breadcrumbs items={items} />
        </HeaderContent>
      </PageHeader>
      <h1>Página Exemplo</h1>
    </>
  )
}
