export type Registration = {
  id: string
  usuario: {
    nome: string
    avatar?: string
  }
  eixo: string
  ultimo_status: 'PENDENTE' | 'APROVADO' | 'REPROVADO'
  responsavel: {
    nome: string
    avatar?: string
  }
}
