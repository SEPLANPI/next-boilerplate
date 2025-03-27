export type Proposal = {
    id: string
    titulo: string
    eixo: Axis
    status: 'PENDENTE' | 'APROVADO' | 'REPROVADO'
    autor: string
    tipo_autor: string
    criado_em: string
}

interface Axis {
    id: number
    nome: string
}