export type Event = {
  id: number
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

export interface EventGroup {
  nome: string
  quantidade: number
  valor_total: number
  filtros: Record<string, string | number>
  subgrupos?: EventGroup[]
}
