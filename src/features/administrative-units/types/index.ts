export interface AdministrativeUnit {
  numero: string
  nome: string
  sigla: string
}

export interface AdministrativeUnitsResponse {
  count: number
  results: AdministrativeUnit[]
}
