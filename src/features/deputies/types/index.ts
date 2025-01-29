export interface Deputy {
  nome: string
  foto: string
  partido: string
  id: number
}

export interface DeputiesResponse {
  count: number
  results: Deputy[]
}
