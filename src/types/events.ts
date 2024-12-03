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
  valor: number
  eventos_url: string
  subgrupos?: EventGroup[]
}
