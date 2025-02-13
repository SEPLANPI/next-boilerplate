export interface Term {
  id: number
  data_inicio: string
  data_fim: string
}

export interface Deputy {
  nome: string
  foto?: string
  cpf?: string
  partido?: {
    id: number
    nome: string
    sigla: string
    foto?: string
  }
  id: number
  vigencias: Term[]
  ultimo_mandato?: Omit<Term, 'id'>
  mandato_atual?: boolean
}

export interface DeputiesResponse {
  count: number
  results: Deputy[]
}
