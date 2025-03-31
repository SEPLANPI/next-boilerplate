import { z } from 'zod'

export enum RegistrationType {
  OFICINA = 'OFICINA',
  PLENARIA = 'PLENARIA'
}

export const personSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      'CPF deve estar no formato 000.000.000-00'
    ),
  data_nascimento: z.date({
    message: 'Data de nascimento deve ser uma data válida',
    required_error: 'Data de nascimento é obrigatória'
  }),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\)\s\d{5}-\d{4}$/,
      'Telefone deve estar no formato (00) 00000-0000'
    ),
  email: z.string().email('Email inválido'),
  municipio_id: z.string().min(1, 'Município é obrigatório'),

  documento_identificacao_frente: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Arquivo obrigatório'),
  documento_identificacao_verso: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Arquivo obrigatório'),

  tipo_inscricao: z.nativeEnum(RegistrationType, {
    errorMap: () => ({ message: 'Selecione um tipo de inscrição' })
  }),
  eixo_id: z.string().min(1, 'Eixo é obrigatório')
})
