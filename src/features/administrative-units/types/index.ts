export interface AdministrativeUnit {
  number: string
  name: string
  sigla: string
}

export interface AdministrativeUnitsResponse {
  count: number
  results: AdministrativeUnit[]
}
