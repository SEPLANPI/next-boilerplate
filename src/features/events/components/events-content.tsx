import { EventsEmptyState } from '@/features/events/components/empty-state'
import { api } from '@/lib/api'
import { EventsTable } from './events-table'
import { EventsCards } from './events-cards'
import { Alert } from '@mantine/core'
import dayjs from 'dayjs'
import { eventsSearchParams } from '../lib/search-params'

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

type EventsResponse = {
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
  const { page, search, ugs, fromDate, toDate } = eventsSearchParams.all()
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('nome', search)
  if (fromDate) {
    params.append('data_inicio', dayjs(fromDate).format('YYYY-MM-DD'))
  }
  if (toDate) {
    params.append('data_after', dayjs(toDate).format('YYYY-MM-DD'))
  }

  if (ugs) {
    ugs.forEach((ug) => params.append('ugs', ug.toString()))
  }

  const response = await api.get(`/eventos?${params.toString()}`)

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
