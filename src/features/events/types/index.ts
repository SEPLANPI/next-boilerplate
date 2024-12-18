export interface Event {
  id: number
  nome: string
  descricao?: string
  municipio?: string
  municipio_id?: number
  local?: string
  data?: string
  objetivo: string
  ugs: {
    name: string
    sigla: string
  }[]
  contratos: number[]
  valor: string
  editado: boolean
}

export interface EventGroup {
  nome: string
  quantidade: number
  valor: number
  eventos_url: string
  subgrupos?: EventGroup[]
}

export interface EventsResponse {
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

export interface EventGroupResponse {
  count: number
  results: EventGroup[]
}

export interface Municipio {
  id: number
  nome: string
}

export interface Deputado {
  nome: string
}

export interface UnidadeGestora {
  number: number
  name: string
  sigla: string
  has_events: boolean
}

export interface FilterOptionDeputy {
  nome: string
}

export interface FilterOptionCity {
  id: number
  nome: string
}

export interface FilterOptionUnit {
  number: number
  name: string
  sigla: string
  has_events: boolean
}
