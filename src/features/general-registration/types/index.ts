export interface People {
    id: string
    nome: string
    cpf: string
    telefone: string
    email: string
    municipio: number
    criado_em: string
    cadastrado_presencialmente: boolean
    inscricao: Inscricao
}

export interface Inscricao {
    tipo_inscricao: 'ouvinte' | 'votante'
    tipo_membro: string
    eixo?: {
        id: number
        nome: string
    }
}