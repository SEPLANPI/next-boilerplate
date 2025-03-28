type BaseInvitation = {
  id: string
  admin: {
    id: string
    nome: string
    cpf: string
  }
  token: string
  identificador: string
  criado_em: string
}

export type Invitation =
  | (BaseInvitation & {
      usado: true
      conselheiro: {
        id: string
        nome: string
        cpf: string
      }
    })
  | (BaseInvitation & {
      usado: false
      conselheiro: null
    })
