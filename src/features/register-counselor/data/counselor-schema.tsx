import { z } from 'zod'

const baseAddressSchema = z.object({
  cep: z.string().length(8, 'CEP inválido'),
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

export const counselorSchema = z
  .object({
    rg: z
      .string()
      .min(7, 'RG deve ter pelo menos 7 dígitos')
      .max(20, 'RG inválido'),
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos'),

    endereco: addressSchema,

    // Passo 3: Conselho
    conselho_id: z.string().min(1, 'Selecione um conselho'),
    tipo_conselho: z.enum(['PODER_PUBLICO', 'SOCIEDADE_CIVIL'], {
      errorMap: () => ({ message: 'Selecione um tipo de conselho' })
    }),
    tipo_membro: z.enum(['NUCLEO_GESTOR', 'MEMBRO'], {
      errorMap: () => ({ message: 'Selecione um tipo de membro' })
    }),

    // Passo 4: Dados Bancários - optional fields
    banco_id: z.string().nullable(),
    agencia: z.coerce.number().nullable(),
    conta: z.coerce.number().nullable(),
    nome_titular: z.string().nullable(),

    // Passo 5: Oficina
    eixo_id: z.string().min(1, 'Oficina é obrigatório'),

    comprovante_residencia: z.instanceof(File).nullable(),
    comprovante_conselho: z.instanceof(File).nullable(),
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
      ),

    ajuda_custo: z.boolean().default(false)
  })
  .superRefine((data, ctx) => {
    // Only validate bank details and documents if SOCIEDADE_CIVIL AND ajuda_custo
    if (data.tipo_conselho === 'SOCIEDADE_CIVIL' && data.ajuda_custo) {
      if (!data.banco_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Banco é obrigatório',
          path: ['banco_id']
        })
      }
      if (!data.agencia) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Número de agência inválido',
          path: ['agencia']
        })
      }
      if (!data.conta) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Número de conta inválido',
          path: ['conta']
        })
      }
      if (!data.nome_titular) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nome do titular é obrigatório',
          path: ['nome_titular']
        })
      }

      if (
        !data.comprovante_residencia ||
        !(data.comprovante_residencia instanceof File)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Comprovante de residência é obrigatório',
          path: ['comprovante_residencia']
        })
      }

      if (
        !data.comprovante_conselho ||
        !(data.comprovante_conselho instanceof File)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Comprovante do conselho é obrigatório',
          path: ['comprovante_conselho']
        })
      }

      if (
        !data.comprovante_bancario ||
        !(data.comprovante_bancario instanceof File)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Comprovante bancário é obrigatório',
          path: ['comprovante_bancario']
        })
      }
    }
  })
