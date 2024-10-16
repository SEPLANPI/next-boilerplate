import { auth } from '@/auth'
import { Container } from '@mantine/core'

export default async function Home() {
  const session = await auth()
  return (
    <Container size="xl">
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">
        Página Exemplo
      </h1>
      <p>{JSON.stringify(session)}</p>
    </Container>
  )
}
