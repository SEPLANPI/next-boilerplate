import { z } from 'zod'
import { AddressType } from '../types/counselor'

// Define the urban address schema
const urbanAddressSchema = z.object({
  tipo_endereco: z.literal(AddressType.URBAN),
  rua: z.string(),
  numero: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  cep: z.string(),
  municipio_id: z.string()
})

// Define the rural address schema
const ruralAddressSchema = z.object({
  tipo_endereco: z.literal(AddressType.RURAL),
  referencia: z.string(),
  cep: z.string(),
  municipio_id: z.string()
})

// Combine the address schemas in a union
const addressSchema = z.discriminatedUnion('tipo_endereco', [
  urbanAddressSchema,
  ruralAddressSchema
])

// Define the main counselor schema
export const counselorSchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  rg: z.string(),
  data_nascimento: z.string(),
  telefone: z.string(),
  email: z.string().email(),
  endereco: addressSchema,
  conselho: z.string(),
  tipo_conselho: z.string(),
  tipo_membro: z.string(),
  banco_id: z.string(),
  agencia: z.string(),
  conta: z.string(),
  tipo_conta: z.string(),
  oficina: z.string(),
  rg_frente: z.any().optional(),
  rg_verso: z.any().optional(),
  comprovante_residencia: z.any().optional(),
  comprovante_conselh: z.any().optional(), // Note: typo in original code, keeping it consistent
  comprovante_bancario: z.any().optional()
})

export type CounselorFormData = z.infer<typeof counselorSchema>
