import { API } from "@/constants/messages"
import { buildParams } from "@/lib/api-utils"
import { api } from "@/lib/server-api"
import { ServerResult } from "@/types/server-result"

export interface PropostasData {
    id: string
    titulo: string
    conteudo: string
    eixo: { id: number, nome: string }
    status: string
    em_votação: boolean
    total_pontos: number
    criado_em: string
}

interface PropostasParams {
    search?: string
}

export async function getMinhasPropostas(params: PropostasParams): Promise<ServerResult<PropostasData[]>> {
    const queryParams = buildParams({ search: params.search })
    try {
        const response = await api.get(`/minhas-propostas/?${queryParams}`)
        if (!response.ok) {
            const error = await response.json()
            return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
        }
        const data = await response.json()
        return { data }
    } catch (error) {
        return { error: API.UNEXPECTED_FETCH_ERROR }
    }
}