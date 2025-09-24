/**
 * Aplica a máscara de CPF (XXX.XXX.XXX-XX) a uma string.
 * Remove todos os caracteres não numéricos e formata o resultado.
 * Funciona corretamente para CPFs completos ou incompletos.
 *
 * @param cpf A string do CPF, com ou sem máscara. Pode conter apenas números ou outros caracteres.
 * @returns O CPF formatado. Se a entrada for nula, indefinida ou vazia, retorna uma string vazia.
 */
export function mascaraCPF(cpf: string | undefined): string {
  if (!cpf) {
    return ""
  }

  const cpfLimpo = String(cpf).replace(/\D/g, "")

  const cpfTruncado = cpfLimpo.slice(0, 11)
  let cpfFormatado = cpfTruncado.replace(/(\d{3})(\d)/, "$1.$2")
  cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2")
  cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

  return cpfFormatado
}
