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
  eixo: { id: string; nome: string }
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

export interface CounselorInfo {
  id: string
  nome: string
  cpf: string
  rg: string
  data_nascimento: string
  telefone: string
  email: string
  poder_publico: boolean
  tipo_membro: string
  status_atual: 'PENDENTE' | 'APROVADO' | 'REJEITADO'
  propostas_enviadas: number
  aceitou_termos: boolean
  ajuda_custo: boolean
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
