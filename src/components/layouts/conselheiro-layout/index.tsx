import { PropsWithChildren } from 'react'
import { Header } from './header'
import { api } from '@/lib/server-api'
import { StatusBadge } from './status-badge'

export async function ConselheiroLayout({ children }: PropsWithChildren) {
  const response = await api.get('/conselheiros/status/')

  if (!response.ok) {
    return <div>Erro ao carregar dados do conselheiro</div>
  }

  const { status }: { status: 'PENDENTE' | 'REJEITADO' | 'APROVADO' } =
    await response.json()

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <StatusBadge status={status} />
      </Header>
      <main className="flex-1 bg-gray-50 p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  )
}
