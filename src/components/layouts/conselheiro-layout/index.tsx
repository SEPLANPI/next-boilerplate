import { PropsWithChildren } from 'react'
import { Header } from './header'
import { api } from '@/lib/server-api'
import { StatusBadge } from './status-badge'
import {
  Alert,
  Divider,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget
} from '@mantine/core'
import { formatDate } from '@/utils/format-date'

type Status = {
  status: 'PENDENTE' | 'REJEITADO' | 'APROVADO'
  motivo_rejeicao?: string
  validado_em: string
}

export async function ConselheiroLayout({ children }: PropsWithChildren) {
  const response = await api.get('/conselheiros/status/')

  if (!response.ok) {
    return <div>Erro ao carregar dados do conselheiro</div>
  }

  const data: Status = await response.json()

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <HoverCard width={320} shadow="md">
          <HoverCardTarget>
            <StatusBadge status={data.status} />
          </HoverCardTarget>
          <HoverCardDropdown>
            <div className="flex flex-col space-y-2">
              {data.motivo_rejeicao && (
                <>
                  <p className="text-sm text-secondary-foreground">
                    {data.motivo_rejeicao}
                  </p>
                  <Divider />
                </>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-semibold">
                  Última atualização
                </span>
                <span className="text-sm text-secondary-foreground">
                  {formatDate(
                    data.validado_em,
                    'DD [de] MMMM [de] YYYY [às] HH:mm'
                  )}
                </span>
              </div>
            </div>
          </HoverCardDropdown>
        </HoverCard>
      </Header>
      {data.status === 'REJEITADO' && (
        <Alert color="red" title="Cadastro reprovado" className="px-12">
          {data.motivo_rejeicao}
        </Alert>
      )}
      <main className="flex-1 bg-gray-50 p-4 sm:p-6 md:p-6">{children}</main>
    </div>
  )
}
