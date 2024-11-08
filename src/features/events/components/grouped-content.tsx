import { EventsCards } from './events-cards'
import { EventsGroupAccordions } from './group-accordions'

export type GroupItem = {
  name: string
  count: number
  value: number
  id: string
}

type GroupedEventsResponse = {
  count: number
  eventos_percentage: number
  total_valor: number
  total_valor_percentage: number
  total_empresas: number
  empresas_percentage: number
  total_municipios: number
  municipios_percentage: number
  results: GroupItem[]
}

const data: GroupedEventsResponse = {
  count: 2,
  eventos_percentage: 20,
  total_valor: 2000,
  total_valor_percentage: 20,
  total_empresas: 100,
  empresas_percentage: 20,
  total_municipios: 100,
  municipios_percentage: 20,
  results: [
    {
      name: 'SECULT',
      count: 366,
      value: 82425406.0,
      id: '510101'
    },

    {
      name: 'CENDEFOL',
      count: 474,
      value: 99523456,
      id: '110114'
    }
  ]
}

export async function EventsGroupedContent() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

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
      <EventsGroupAccordions items={data.results} count={data.count} />
    </>
  )
}
