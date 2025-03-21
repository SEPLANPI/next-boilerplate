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
  conselho_id: z.string().min(1, 'Selecione um conselho'),
  tipo_conselho: z.enum(['PODER_PUBLICO', 'SOCIEDADE_CIVIL'], {
    errorMap: () => ({ message: 'Selecione um tipo de conselho' })
  }),
  tipo_membro: z.enum(['NUCLEO_GESTOR', 'MEMBRO'], {
    errorMap: () => ({ message: 'Selecione um tipo de membro' })
  }),

  // Passo 4: Dados Bancários - now optional fields
  banco_id: z.string().optional(),
  agencia: z.coerce.number().optional(),
  conta: z.coerce.number().optional(),
  nome_titular: z.string().optional(),

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
  comprovante_bancario: z.instanceof(File).nullable(),
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
}).superRefine((data, ctx) => {
  if (data.tipo_conselho === 'SOCIEDADE_CIVIL') {
    if (!data.banco_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Banco é obrigatório',
        path: ['banco_id']
      });
    }
    if (!data.agencia) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Número de agência inválido',
        path: ['agencia']
      });
    }
    if (!data.conta) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Número de conta inválido',
        path: ['conta']
      });
    }
    if (!data.nome_titular) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nome do titular é obrigatório',
        path: ['nome_titular']
      });
    }
    if (!(data.comprovante_bancario instanceof File)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Comprovante bancário é obrigatório',
        path: ['comprovante_bancario']
      });
    }
  }
})
