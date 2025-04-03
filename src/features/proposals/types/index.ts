export type Proposal = {
    id: string
    titulo: string
    eixo: Axis
    status: 'PENDENTE' | 'APROVADA' | 'REJEITADA' | 'EM_VOTACAO' | 'CANCELADA'
    conteudo: string
    autor: string
    tipo_autor: string
    criado_em: string
}

export type Axis = {
    id: number
    nome: string
    descricao: string
    criado_em: string
    limite_inscricoes: number
    total_inscricoes: number
    vagas_restantes: number
    vagas_disponiveis: true
}

export type ActiveEvent = {
    id: number
    nome: string
    descricao: string
    municipio: {
        id: number
        nome: string
        territorio_nome: string
    }
    pontos_por_votante: number
    limite_propostas: number
    data_evento: string
    ativo: boolean
}