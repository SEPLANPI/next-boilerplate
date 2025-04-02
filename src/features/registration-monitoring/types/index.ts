export type Registration = {
  id: string
  nome: string
  cpf?: string
  eixo: {
    id: string
    nome: string
  }
  status: {
    atual: 'PENDENTE' | 'APROVADO' | 'REJEITADO'
  }
  usuario?: {
    nome: string
  }
  responsavel?: {
    nome: string
  }
}
