import { API } from '@/constants/messages'
import { DjangoError } from '@/types/actions'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { Alert } from '@mantine/core'

interface FetchErrorProps {
  error?: DjangoError
  title?: string
}

export function FetchError({
  error,
  title = 'Erro inesperado'
}: FetchErrorProps) {
  return (
    <Alert title={title} variant="light" color="red" className="max-w-xl">
      {error ? buildErrorMessage(error) : API.UNEXPECTED_FETCH_ERROR}
    </Alert>
  )
}
