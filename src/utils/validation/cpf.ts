export function formatCPF(cpf: string): string {
  // Remove non-numeric characters
  const cleanedCPF = cpf.replace(/\D/g, "")

  // Apply CPF formatting: XXX.XXX.XXX-XX
  if (cleanedCPF.length <= 11) {
    return cleanedCPF
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }

  return cpf // Return original if more than 11 digits
}

export function isValidCPF(cpf: string): boolean {
  const cleanedCPF = cpf.replace(/\D/g, "")

  // Check if CPF has 11 digits
  if (cleanedCPF.length !== 11) {
    return false
  }

  // Check if all digits are the same (invalid CPF)
  if (/^(\d)\1+$/.test(cleanedCPF)) {
    return false
  }

  // Calculate and validate check digits
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (10 - i)
  }
  let checkDigit1 = (sum * 10) % 11
  if (checkDigit1 === 10) checkDigit1 = 0

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (11 - i)
  }
  let checkDigit2 = (sum * 10) % 11
  if (checkDigit2 === 10) checkDigit2 = 0

  return (
    checkDigit1 === parseInt(cleanedCPF.charAt(9)) &&
    checkDigit2 === parseInt(cleanedCPF.charAt(10))
  )
}
