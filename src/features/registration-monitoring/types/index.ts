export type Registration = {
  id: string
  nome: string
  cpf?: string
  eixo: {
    id: string
    nome: string
  }
  status: {
    atual: 'PENDENTE' | 'APROVADO' | 'REPROVADO'
  }
  usuario?: {
    nome: string
  }
  responsavel?: {
    nome: string
  }
}
