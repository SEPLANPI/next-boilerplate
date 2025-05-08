import { CPF } from '@/utils/cpf'
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

export const editCounselorSchema = z
  .object({
    nome: z.string().min(10, 'Nome deve ter pelo menos 10 caracteres'),
    cpf: z
      .string()
      .length(11, 'CPF deve ter 11 dígitos')
      .refine((cpf) => CPF.isValid(cpf), {
        message: 'CPF inválido'
      }),
    email: z.string().email('Email inválido'),
    data_nascimento: z.date({
      message: 'Data de nascimento deve ser uma data válida'
    }),
    rg: z
      .string()
      .min(7, 'RG deve ter pelo menos 7 dígitos')
      .max(20, 'RG inválido'),
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos'),
    endereco: addressSchema,
    conselho_id: z.string().min(1, 'Selecione um conselho'),
    tipo_conselho: z.enum(['PODER_PUBLICO', 'SOCIEDADE_CIVIL']),
    tipo_membro: z.enum(['NUCLEO_GESTOR', 'MEMBRO']),
    banco_id: z.string().nullable(),
    agencia: z.string().nullable(),
    conta: z.string().nullable(),
    nome_titular: z.string().nullable(),
    comprovante_residencia: z.instanceof(File).nullable(),
    comprovante_conselho: z.instanceof(File).nullable(),
    comprovante_bancario: z.instanceof(File).nullable(),
    ajuda_custo: z.boolean()
  })
  .superRefine((data, ctx) => {
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
          message: 'Agência é obrigatória',
          path: ['agencia']
        })
      }
      if (!data.conta) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Conta é obrigatória',
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
    }
  })
