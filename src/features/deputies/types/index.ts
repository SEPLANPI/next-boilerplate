export interface Deputy {
  nome: string
  foto?: string
  partido?: {
    id: number
    nome: string
    sigla: string
    foto?: string
  }
  id: number
}

export interface DeputiesResponse {
  count: number
  results: Deputy[]
}
