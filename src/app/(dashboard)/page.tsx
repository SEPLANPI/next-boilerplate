import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bem-vindo ao Next.js Boilerplate</h1>
        <p className="text-muted-foreground mt-2">
          Template com Mantine, Tailwind CSS e biblioteca @seplan/diti-ds
        </p>
      </div>

      <Card.Root className="bg-blue-50 border-blue-200">
        <Card.Header>
          <Card.Title className="text-blue-800 flex items-center gap-2">
            🎯 Biblioteca @seplan/diti-ds v0.0.26
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-blue-700 mb-4">
            Explore os componentes da biblioteca através dos exemplos interativos.
          </p>
          <Link href="/exemplos">
            <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer">
              Ver Exemplos →
            </span>
          </Link>
        </Card.Content>
      </Card.Root>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card.Root>
          <Card.Header>
            <Card.Title>🚀 Tecnologias</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-2">
              <li>• <strong>Next.js 14</strong> - Framework React</li>
              <li>• <strong>Mantine</strong> - Biblioteca de componentes</li>
              <li>• <strong>Tailwind CSS</strong> - Framework CSS</li>
              <li>• <strong>TypeScript</strong> - Tipagem estática</li>
              <li>• <strong>@seplan/diti-ds</strong> - Design System</li>
            </ul>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>📚 Recursos</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-2">
              <li>• <strong>App Router</strong> - Roteamento moderno</li>
              <li>• <strong>Server Components</strong> - Renderização no servidor</li>
              <li>• <strong>Dark Mode</strong> - Suporte a tema escuro</li>
              <li>• <strong>Responsivo</strong> - Design mobile-first</li>
              <li>• <strong>Acessível</strong> - WCAG 2.1 compliant</li>
            </ul>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  )
}
