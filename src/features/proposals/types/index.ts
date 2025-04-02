export type Proposal = {
    id: string
    titulo: string
    eixo: Axis
    status: 'PENDENTE' | 'APROVADA' | 'REJEITADA' | 'EM_VOTACAO' | 'CANCELADA'
    conteudo: string
    autor: Author
    tipo_autor: string
    criado_em: string
    historicos: Log[]
}

type Author = {
    id: number
    nome: string
    tipo_membro: string
    conselho: string
}

export type Log = {
    id: number
    status: 'PENDENTE' | 'APROVADA' | 'REJEITADA' | 'EM_VOTACAO' | 'CANCELADA'
    comentário: string
    dados_antigos: {
        titulo: string
        conteudo: string
    }
    alterado_por: string
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