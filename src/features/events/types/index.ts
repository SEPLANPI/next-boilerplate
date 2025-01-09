import { AdministrativeUnit } from '@/features/administrative-units/types'

export interface EventGroup {
  nome: string
  quantidade: number
  valor: number
  eventos_url: string
  subgrupos?: EventGroup[]
}

export interface Event {
  id: number
  nome: string
  descricao: string | null
  municipio: string | null
  municipio_id: number | null
  local: string | null
  data: string | null
  objetivo: string
  ugs: {
    name: string
    sigla: string
  }[]
  contratos: number[]
  valor: number
  editado: boolean
  categoria: string | null
  subcategoria: string | null
  natureza_gasto: number[]
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

export interface FilterOptionCategory {
  id: number
  nome: string
  subcategorias: FilterOptionCategory[]
}

export interface FilterOptionExpenseNature {
  id: number
  nome: string
}

export interface FilterOptionUnit {
  number: number
  name: string
  sigla: string
  has_events: boolean
}

export interface Contractor {
  cnpj: string
  descricao_servico: string
  nome: string
}

export interface Contract {
  numero_contrato: number
  contratados: Contractor[]
  eventos: string[]
  titulo: string
  valor: number
  valor_total: number
  status: 'STATUS_ASSINADO' | 'STATUS_CADASTRADO'
  situacao: 'A_CONTRATAR' | 'EM_VIGOR' | 'ENCERRADO' | 'LICITADO' | 'LICITADO_E'
  autor_emenda: string | null
  ug: number
}

export interface EventDetail {
  id: number
  nome: string
  editado: boolean
  data: string | null
  local: string | null
  valor: number
  descricao: string | null
  objetivo: string
  municipio: string | null
  municipio_id: number | null
  avalia: string | null
  publico: string | null
  contratos: Contract[]
  ugs: AdministrativeUnit[]
  categoria: string | null
  categoria_nome?: string | null
  subcategoria: string | null
  natureza_gasto: number[]
  natureza_gasto_nomes?: string[]
}
