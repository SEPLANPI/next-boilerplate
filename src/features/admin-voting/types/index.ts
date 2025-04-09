export type ProposalVotingInfo = {
  titulo: string
  eixo: {
    nome: string
    descricao: string
  }
  total_pontos: number
}

export type GetVotingResponse = {
  total_geral_pontos: number
  total_geral_votantes: number
  total_propostas: number
  propostas: ProposalVotingInfo[]
}
