import { z } from 'zod'
import { CPF } from '../../../utils/cpf'

export enum RegistrationType {
  OFICINA = 'OFICINA',
  PLENARIA = 'PLENARIA'
}

export const personSchema = z
  .object({
    nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    cpf: z
      .string()
      .length(11, 'CPF deve ter 11 caracteres')
      .refine((cpf) => CPF.isValid(cpf), {
        message: 'CPF inválido'
      }),
    data_nascimento: z
      .date({
        message: 'Data de nascimento deve ser uma data válida'
      })
      .nullable(),
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos'),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    municipio_id: z.string().min(1, 'Município é obrigatório'),

    tipo_inscricao: z.nativeEnum(RegistrationType, {
      errorMap: () => ({ message: 'Selecione um tipo de inscrição' })
    }),
    eixo_id: z.string()
  })
  .refine(
    (data) => {
      if (data.tipo_inscricao === RegistrationType.OFICINA) {
        return !!data.eixo_id
      }
      return true
    },
    {
      message: 'Eixo é obrigatório para inscrição em oficina',
      path: ['eixo_id']
    }
  )
