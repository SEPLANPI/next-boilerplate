import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | string) {
  return (
    'R$ ' +
    parseFloat(value.toString()).toLocaleString('pt-BR', {
      minimumFractionDigits: 2
    })
  )
}

export function calculateExpiryTime(expiresIn: number, buffer = 60): number {
  return Date.now() + (expiresIn - buffer) * 1000
}
