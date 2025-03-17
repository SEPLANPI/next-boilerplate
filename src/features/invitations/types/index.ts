export type Invitation = {
  id: string
  nome: string
  situacao: 'SUBMETIDO' | 'PENDENTE'
  criado_em: string
  responsavel: {
    nome: string
    avatar?: string
  }
}
