import type { Event } from '@/types/events'

export type EventsResponse = {
  count: number
  totals: {
    total_empresas: number
    total_municipios: number
    total_valor: number
  }
  percentages: {
    eventos_percentage: number
    valor_percentage: number
    empresas_percentage: number
    municipios_percentage: number
  }
  results: Event[]
}
