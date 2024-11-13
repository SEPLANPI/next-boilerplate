import { Alert } from '@mantine/core'

export function DefaultFetchError() {
  return (
    <Alert
      title="Erro inesperado"
      variant="outline"
      color="red"
      className="max-w-xl"
    >
      Ocorreu um erro inesperado ao buscar dados no servidor.
    </Alert>
  )
}
