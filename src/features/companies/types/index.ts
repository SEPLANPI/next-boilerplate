export interface Company {
  cnpj: string
  nome: string
  // responsavel: string
}

export interface CompaniesResponse {
  count: number
  results: Company[]
}
