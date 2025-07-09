export function calculateExpiryTime(expiresIn: number, buffer = 30): number {
  return Date.now() + (expiresIn - buffer) * 1000
}
