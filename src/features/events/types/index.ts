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
    numero: number
    nome: string
    sigla: string
  }[]
  contratos: {
    id: number
    numero: number
    titulo: string
    valor: number
    naturezas_gasto: { id: number }[]
  }[]
  valor: number
  editado: boolean
  categoria: string | null
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

export interface Contract {
  id: number
  numero: number
  empresa: {
    cnpj: string
    nome: string
  }
  titulo: string
  valor: number
  valor_empenhado: number
  valor_liquidado: number
  valor_pago: number
  status: 'ASSINADO' | 'CADASTRADO'
  situacao: 'A_CONTRATAR' | 'EM_VIGOR' | 'ENCERRADO' | 'LICITADO'
  autor_emenda: string | null
  ug_nome: number
  naturezas_gasto: { id: number }[]
  naturezas_gasto_nomes: string[]
  execucoes: (
    | {
      id: number
      ano: number
      mes: number
      valor_empenhado: number
      valor_liquidado: number
      valor_pago: number
      fonte: 'GOVERNO'
    }
    | {
      id: number
      ano: number
      mes: number
      valor_empenhado: number
      valor_liquidado: number
      valor_pago: number
      fonte: 'EMENDA'
      deputado: { nome: string; id: number; partido: string; foto: string }
    }
  )[]
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
  natureza_gasto_nomes?: string[]
  valor_empenhado: number
  valor_liquidado: number
  valor_pago: number
  deputados: { nome: string }[]
}
