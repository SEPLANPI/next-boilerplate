import { Anchor, Breadcrumbs, Container } from '@mantine/core'
import { ChevronRight } from 'lucide-react'

const items = [
  { title: 'Item 1', href: '#' },
  { title: 'Item 2', href: '#' },
  { title: 'Página Exemplo', href: '#' }
].map(({ href, title }, index) => (
  <Anchor fw={500} href={href} size="sm" key={index}>
    {title}
  </Anchor>
))

export default function Home() {
  return (
    <Container size="xl">
      <Breadcrumbs separator={<ChevronRight className="size-3" />}>
        {items}
      </Breadcrumbs>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">
        Página Exemplo
      </h1>
    </Container>
  )
}
