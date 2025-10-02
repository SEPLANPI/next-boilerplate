import { BreadcrumbsWrapper } from '@/components/ui/breadcrumbs-wrapper'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export default async function ExemplosPage() {
  const items: BreadcrumbItem[] = [
    {
      label: 'Exemplos'
    }
  ]

  const exemplos = [
    {
      title: 'Breadcrumbs',
      description: 'Navegação breadcrumb com suporte a links e hierarquia',
      href: '/exemplos/breadcrumbs',
      icon: '🍞'
    },
    {
      title: 'Cards',
      description: 'Cards com diferentes variações e estilos',
      href: '/exemplos/cards',
      icon: '🃏'
    },
    {
      title: 'Filtros',
      description: 'Sistema de filtros estáticos e assíncronos',
      href: '/exemplos/filtros',
      icon: '🔍'
    },
    {
      title: 'Busca',
      description: 'Campo de busca com funcionalidades avançadas',
      href: '/exemplos/busca',
      icon: '🔎'
    },
    {
      title: 'Navegação',
      description: 'Navegação por abas e paginação',
      href: '/exemplos/navegacao',
      icon: '🧭'
    },
    {
      title: 'Layout Completo',
      description: 'Exemplo completo com todos os componentes integrados',
      href: '/exemplos/layout-completo',
      icon: '🎨'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <BreadcrumbsWrapper items={items} />
      </div>
        <div>
          <h1 className="text-3xl font-bold">Exemplos da Biblioteca @seplan/diti-ds</h1>
          <p className="text-muted-foreground mt-2">
            Demonstrações práticas dos componentes disponíveis na biblioteca v0.0.26
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exemplos.map((exemplo) => (
            <Link key={exemplo.href} href={exemplo.href}>
              <Card.Root className="hover:shadow-lg transition-shadow cursor-pointer">
                <Card.Header>
                  <Card.Title className="flex items-center gap-2">
                    <span className="text-2xl">{exemplo.icon}</span>
                    {exemplo.title}
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-muted-foreground">{exemplo.description}</p>
                </Card.Content>
              </Card.Root>
            </Link>
          ))}
        </div>

        <Card.Root className="bg-blue-50 border-blue-200">
          <Card.Header>
            <Card.Title className="text-blue-800">📚 Documentação</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-blue-700">
              Para mais informações sobre os componentes, consulte a documentação oficial da biblioteca.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-blue-600">
                <strong>Versão atual:</strong> 0.0.26
              </p>
              <p className="text-sm text-blue-600">
                <strong>Status:</strong> Em desenvolvimento
              </p>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  )
}
