export const CPF = {
  isValid(cpf: string): boolean {
    const cleaned = cpf.replace(/\D/g, "")

    if (cleaned.length !== 11) return false
    if (/^(\d)\1+$/.test(cleaned)) return false

    const digits = cleaned.split("").map(Number)

    let sum = digits.slice(0, 9).reduce((acc, digit, i) => {
      return acc + digit * (10 - i)
    }, 0)

    let remainder = (sum * 10) % 11
    const firstDigit = remainder === 10 ? 0 : remainder
    if (digits[9] !== firstDigit) return false

    sum = digits.slice(0, 10).reduce((acc, digit, i) => {
      return acc + digit * (11 - i)
    }, 0)

    remainder = (sum * 10) % 11
    const secondDigit = remainder === 10 ? 0 : remainder
    return digits[10] === secondDigit
  },

  mask(value: string): string {
    const cleaned = value.replace(/\D/g, "")
    const groups = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/)

    if (!groups) return cleaned

    const [, g1, g2, g3, g4] = groups

    if (!g2) return g1
    if (!g3) return `${g1}.${g2}`
    if (!g4) return `${g1}.${g2}.${g3}`
    return `${g1}.${g2}.${g3}-${g4}`
  },

  hide(cpf: string): string {
    return cpf.replace(/\D/g, "").slice(0, 11)
  },
}
