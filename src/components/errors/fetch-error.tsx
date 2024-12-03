import { API } from '@/constants/messages'
import { Alert } from '@mantine/core'

interface FetchErrorProps {
  error?: string
}

export function FetchError({ error }: FetchErrorProps) {
  return (
    <Alert
      title="Erro inesperado"
      variant="outline"
      color="red"
      className="max-w-xl"
    >
      {error || API.UNEXPECTED_FETCH_ERROR}
    </Alert>
  )
}