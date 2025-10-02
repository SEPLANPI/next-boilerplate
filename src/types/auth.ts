import { Role } from './roles'

export interface BaseUser {
  name: string
  email: string
  id: string
  cpf?: string
  roles: Role[]
  permissions?: string[]
}
