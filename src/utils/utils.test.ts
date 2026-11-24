import { describe, expect, it } from "vitest"
import { parseApiErrors } from "./api-error"
import { CPF } from "./cpf"

describe("CPF", () => {
  it("valida dígitos verificadores", () => {
    expect(CPF.isValid("529.982.247-25")).toBe(true)
    expect(CPF.isValid("52998224725")).toBe(true)
    expect(CPF.isValid("529.982.247-24")).toBe(false)
  })

  it("recusa tamanho errado e dígitos repetidos", () => {
    expect(CPF.isValid("123")).toBe(false)
    expect(CPF.isValid("111.111.111-11")).toBe(false)
  })

  it("mascara progressivamente", () => {
    expect(CPF.mask("529")).toBe("529")
    expect(CPF.mask("5299")).toBe("529.9")
    expect(CPF.mask("5299822")).toBe("529.982.2")
    expect(CPF.mask("52998224725")).toBe("529.982.247-25")
    expect(CPF.mask("529.982.247-25xyz")).toBe("529.982.247-25")
  })
})

describe("parseApiErrors", () => {
  it("objeto de erros do DRF vira uma linha por mensagem", () => {
    expect(parseApiErrors({ nome: ["Obrigatório."], cpf: ["Inválido."] })).toBe(
      "Obrigatório.\nInválido.",
    )
  })

  it("lista com { error } por item", () => {
    expect(parseApiErrors([{ error: { campo: ["A"] } }, "texto solto"])).toBe(
      "A\ntexto solto",
    )
  })

  it("texto passa direto", () => {
    expect(parseApiErrors("falhou")).toBe("falhou")
  })

  it("null cai na mensagem genérica", () => {
    expect(parseApiErrors(null)).toBe(
      "Erro desconhecido ao processar resposta.",
    )
  })
})
