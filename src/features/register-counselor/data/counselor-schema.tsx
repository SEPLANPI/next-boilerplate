import { z } from 'zod'

const baseAddressSchema = z.object({
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  municipio_id: z.string().min(1, 'Município inválido')
})

const ruralAddressSchema = baseAddressSchema.extend({
  tipo_endereco: z.literal('RURAL'),
  referencia: z.string().min(1, 'Referência obrigatória para zona rural')
})

const urbanAddressSchema = baseAddressSchema.extend({
  tipo_endereco: z.literal('URBANA'),
  rua: z.string().min(3, 'Rua inválida'),
  numero: z.string().min(1, 'Número obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(3, 'Bairro inválido')
})

const addressSchema = z.discriminatedUnion('tipo_endereco', [
  ruralAddressSchema,
  urbanAddressSchema
])

export const counselorSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  rg: z.string().min(5, 'RG deve ter pelo menos 5 dígitos'),
  data_nascimento: z.date({ invalid_type_error: 'Data inválida' }),
  telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  email: z.string().email('Email inválido'),

  endereco: addressSchema,

  // Passo 3: Conselho
  conselho: z.enum([
    'VALE_DO_SAMBITO',
    'CHAPADAS_DAS_MANGABEIRAS',
    'ENTRE_RIOS',
    'SERRA_DA_CAPIRAVA',
    'VALE_DO_CANINDE',
    'VALE_DO_PIAUI_E_ITAUEIRA',
    'CARNAUBAIS',
    'COCAIS',
    'PLANICIE_LITORANEA',
    'TABULEIRO_DO_ALTO_PARNAIBA',
    'VALE_DO_ITAIM',
    'VALE_DO_RIO_GUARIBAS'
  ]),
  tipo_conselho: z.enum(['PODER_PUBLICO', 'SOCIEDADE_CIVIL']),
  tipo_membro: z.enum(['NUCLEO_GESTOR', 'MEMBRO']),

  // Passo 4: Dados Bancários
  banco_id: z.string().min(1, 'Banco é obrigatório'),
  agencia: z.number().min(3, 'Agência inválida'),
  conta: z.number().min(3, 'Conta inválida'),
  tipo_conta: z.enum(['POUPANCA', 'CORRENTE']),

  // Passo 5: Oficina
  oficina: z.string().min(3, 'Oficina inválida'),

  // Passo 6: Documentos
  rg_frente: z.instanceof(File),
  rg_verso: z.instanceof(File),
  comprovante_residencia: z.instanceof(File),
  comprovante_conselho: z.instanceof(File),
  comprovante_bancario: z.instanceof(File)
})
