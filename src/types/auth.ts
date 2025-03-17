import { Role } from './roles'

export interface BaseUser {
  name: string
  email: string
  id: string
  cpf: string
  fullName: string
  birthDate: string
  roles: Role[]
}
