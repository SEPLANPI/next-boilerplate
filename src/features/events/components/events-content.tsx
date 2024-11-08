import { EventsEmptyState } from '@/features/events/components/empty-state'
import { EventsTable } from './events-table'
import { EventsCards } from './events-cards'
import { Alert } from '@mantine/core'
import { getEvents } from '../actions/get-events'

export type Event = {
  nome: string
  municipio?: string
  data?: string
  ugs: {
    name: string
    sigla: string
  }[]
  contratos: number[]
  valor: string
}

export type EventsResponse = {
  count: number
  eventos_percentage: number
  total_valor: number
  total_valor_percentage: number
  total_empresas: number
  empresas_percentage: number
  total_municipios: number
  municipios_percentage: number
  results: Event[]
}

export async function EventsContent() {
  const response = await getEvents()
  if (!response.ok) {
    return (
      <Alert
        title="Erro inesperado"
        variant="outline"
        color="red"
        className="max-w-xl"
      >
        Ocorreu um erro inesperado ao buscar dados no servidor.
      </Alert>
    )
  }

  const data: EventsResponse = await response.json()

  if (data.results.length === 0) return <EventsEmptyState />

  return (
    <>
      <EventsCards
        quantity={data.count}
        quantityPercentage={data.eventos_percentage}
        value={data.total_valor}
        valuePercentage={data.total_valor_percentage}
        empresas={data.total_empresas}
        empresasPercentage={data.empresas_percentage}
        municipios={data.total_municipios}
        municipiosPercentage={data.municipios_percentage}
      />
      <EventsTable events={data.results} count={data.count} />
    </>
  )
}
