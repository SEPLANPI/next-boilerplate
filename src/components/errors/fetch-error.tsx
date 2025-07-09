import { API } from '@/constants/messages'
import { DjangoError } from '@/types/actions'
import { buildErrorMessage } from '@/lib/utils'
import { Alert } from '@mantine/core'
import { ApiError } from '@/lib/api/errors'

interface FetchErrorProps {
  error?: DjangoError | ApiError
  title?: string
}

export function FetchError({
  error,
  title = 'Erro inesperado'
}: FetchErrorProps) {
  const getErrorMessage = () => {
    if (!error) {
      return API.UNEXPECTED_FETCH_ERROR
    }
    if (error instanceof ApiError) {
      return error.getErrorMessage()
    }
    return buildErrorMessage(error)
  }
  return (
    <Alert title={title} variant="light" color="red" className="max-w-xl">
      {getErrorMessage()}
    </Alert>
  )
}
