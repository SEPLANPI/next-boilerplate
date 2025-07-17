import { PageHeader } from '@/components/layouts/app-shell'

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
        <PageHeader.Content>
          <Breadcrumbs items={items} />
        </PageHeader.Content>
      </PageHeader>
      <h1>Página Exemplo</h1>
    </>
  )
}
