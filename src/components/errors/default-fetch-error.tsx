import { API } from "@/constants/messages"
import { Alert } from "@mantine/core"

export function DefaultFetchError() {
  return (
    <Alert
      title="Erro inesperado"
      variant="outline"
      color="red"
      className="max-w-xl"
    >
      {API.UNEXPECTED_FETCH_ERROR}
    </Alert>
  )
}
