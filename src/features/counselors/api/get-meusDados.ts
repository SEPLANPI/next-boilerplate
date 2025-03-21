import { API } from "@/constants/messages";
import { api } from "@/lib/server-api";
import { ServerResult } from "@/types/server-result";

interface EnderecoData {
    tipo_zona: string
    cep: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    referencia: string
    municipio: {
        id: number
        nome: string
        territorio: string
    }
}

interface EventoData {
    id: string
    nome: string
    data_evento: string
    municipio: {
        id: string
        nome: string
        territorio_nome: string
    }
}

interface InscricoesData {
    id: string
    evento: EventoData
    eixo: string
    tipo_inscricao: string
    status: string
    validado_em: string
}

interface DadosBancariosData {
    banco: {
        id: number
        nome: string
        codigo: string
    }
    agencia: string
    conta: string
    tipo_conta: string
    cpf_titular: string
    nome_titular: string
}

interface ArquivoData {
    id: string
    nome: string
    url: string
}

export interface DocumentosData {
    id: string
    tipo_documento: string
    arquivo: ArquivoData
    criado_em: string
}

export interface DadosResponse {
    id: string
    nome: string
    cpf: string
    rg: string
    data_nascimento: string
    telefone: string
    email: string
    poder_publico: boolean
    tipo_membro: string
    status_atual: string
    propostas_enviadas: number
    aceitou_termos: boolean
    auditado: boolean
    criado_em: string
    atualizado_em: string
    conselho: {
        id: string
        nome: string
    }
    endereco: EnderecoData
    dados_bancarios: DadosBancariosData
    documentos: DocumentosData[]
    inscricoes: InscricoesData[]
    propostas: []
    historico_validacao: []
}


export async function getMeusDados(): Promise<ServerResult<DadosResponse>> {
    try {
        const response = await api.get('/meus-dados/')
        if (!response.ok) {
            const error = await response.json()
            return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
        }
        const data = await response.json()
        return { data }
    } catch (error) {
        console.log(error)
        return { error: API.UNEXPECTED_FETCH_ERROR }
    }
}