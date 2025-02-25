import { API } from '@/constants/messages'
import { Alert } from '@mantine/core'

interface FetchErrorProps {
  error?: string
  title?: string
}

export function FetchError({
  error,
  title = 'Erro inesperado'
}: FetchErrorProps) {
  return (
    <Alert title={title} variant="light" color="red" className="max-w-xl">
      {error || API.UNEXPECTED_FETCH_ERROR}
    </Alert>
  )
}
