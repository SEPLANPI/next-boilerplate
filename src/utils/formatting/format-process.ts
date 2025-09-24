import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | string) {
  if (value == null) {
    return 0
  }
  return (
    "R$ " +
    parseFloat(value.toString()).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })
  )
}

export function calculateExpiryTime(expiresIn: number, buffer = 60): number {
  return Date.now() + (expiresIn - buffer) * 1000
}

export function formatProcesso(value: string) {
  if (!value) return ""

  const numbers = value.replace(/\D/g, "")

  if (numbers.length !== 17) return value

  const unidade = numbers.slice(0, 5)
  const sequencial = numbers.slice(5, 11)
  const ano = numbers.slice(11, 15)
  const mes = numbers.slice(15, 17)

  return `${unidade}.${sequencial}/${ano}-${mes}`
}

export function formatarProcessoInput(value: string): string {
  let numbers = value.replace(/\D/g, "")

  let formatted = numbers

  if (numbers.length > 17) {
    numbers = numbers.slice(0, 17)
  }

  formatted = numbers

  if (numbers.length > 5) {
    formatted = formatted.replace(/(\d{5})(\d)/, "$1.$2")
  }
  if (numbers.length > 11) {
    formatted = formatted.replace(/(\d{5})\.(\d{6})(\d)/, "$1.$2/$3")
  }
  if (numbers.length > 15) {
    formatted = formatted.replace(
      /(\d{5})\.(\d{6})\/(\d{4})(\d)/,
      "$1.$2/$3-$4",
    )
  }

  return formatted
}

export function formatarValorMonetario(value: string): string {
  const rawValue = value.replace(/\D/g, "")
  const cents = parseInt(rawValue) || 0
  const reais = (cents / 100).toFixed(2)
  return reais
}

export function limparNumeroProcesso(value: string) {
  return value.replace(/\D/g, "")
}
