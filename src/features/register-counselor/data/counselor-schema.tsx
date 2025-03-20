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
  rg: z.string().min(7, 'RG deve ter pelo menos 7 dígitos'),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\)\s\d{5}-\d{4}$/,
      'Telefone deve estar no formato (00) 00000-0000'
    ),

  endereco: addressSchema,

  // Passo 3: Conselho
  conselho: z.enum(
    [
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
    ],
    {
      errorMap: () => ({ message: 'Selecione um conselho' })
    }
  ),
  tipo_conselho: z.enum(['PODER_PUBLICO', 'SOCIEDADE_CIVIL'], {
    errorMap: () => ({ message: 'Selecione um tipo de conselho' })
  }),
  tipo_membro: z.enum(['NUCLEO_GESTOR', 'MEMBRO'], {
    errorMap: () => ({ message: 'Selecione um tipo de membro' })
  }),

  // Passo 4: Dados Bancários
  banco_id: z.string().min(1, 'Banco é obrigatório'),
  agencia: z.coerce.number().min(1, 'Número de agência inválido'),
  conta: z.coerce.number().min(1, 'Número de conta inválido'),
  nome_titular: z.string().min(1, 'Nome do titular é obrigatório'),

  // Passo 5: Oficina
  eixo_id: z.string().min(1, 'Oficina é obrigatório'),

  // Passo 6: Documentos
  rg_frente: z.instanceof(File, {
    message: 'Arquivo da frente do RG é obrigatório'
  }),
  rg_verso: z.instanceof(File, {
    message: 'Arquivo do verso do RG é obrigatório'
  }),
  comprovante_residencia: z.instanceof(File, {
    message: 'Comprovante de residência é obrigatório'
  }),
  comprovante_conselho: z.instanceof(File, {
    message: 'Comprovante do conselho é obrigatório'
  }),
  comprovante_bancario: z.instanceof(File, {
    message: 'Comprovante bancário é obrigatório'
  }),

  // Passo 7: Declarações
  aceite_termos: z
    .boolean({
      required_error: 'Você precisa aceitar os termos e condições'
    })
    .refine(
      (val) => val === true,
      'Você precisa aceitar os termos e condições'
    ),

  aceite_veracidade: z
    .boolean({
      required_error: 'Você precisa declarar a veracidade das informações'
    })
    .refine(
      (val) => val === true,
      'Você precisa declarar a veracidade das informações'
    )
})
