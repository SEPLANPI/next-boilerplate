import { auth } from '@/auth'
import { RegisterCounselorForm } from '@/features/register-counselor/components/register-counselor-form'
import { registerCounselorSearchParams } from '@/features/register-counselor/lib/search-params'
import { Avatar, Button, Divider } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { SearchParams } from 'nuqs/server'

interface CadastroConselheiroFormProps {
  searchParams: Promise<SearchParams>
}

export default async function CadastroConselheiroForm({
  searchParams
}: CadastroConselheiroFormProps) {
  const params = await registerCounselorSearchParams.parse(searchParams)
  const data = await auth()

  const formatName = (fullName: string = '') => {
    const names = fullName.split(' ')
    if (names.length <= 1) return fullName
    return `${names[0]} ${names[names.length - 1]}`
  }

  const displayName = formatName(data?.user.name)

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center p-5">
      <Image
        src="/background-conselheiro-form.png"
        width={5760}
        height={3240}
        quality={100}
        alt="Senhor com fundo verde"
        className="fixed left-0 top-0 z-0 h-[100dvh] w-full object-cover"
      />
      <div className="x relative z-10 mt-16 flex w-full max-w-[672px] flex-col space-y-4">
        <div className="h-[72px] w-full bg-gray-200"></div>
        <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md">
          <h1 className="font-montserrat text-xl font-bold">
            Cadastro de Conselheiros
          </h1>
          <p className="text-gray-700">
            Preencha os dados abaixo para realizar seu cadastro e participar do
            evento.
          </p>
          <Divider />
          <div className="flex items-center">
            <Avatar
              radius="xl"
              size="sm"
              color="initials"
              key={displayName}
              name={displayName}
              alt="Avatar do usuário"
              variant="filled"
            />
            <span className="ml-3 text-sm text-gray-700">{displayName}</span>
            <Button
              component={Link}
              href={`/api/auth/sign-out?redirect=/conselheiros/cadastro?code=${params.code}`}
              size="sm"
              variant="subtle"
              className="ml-auto"
            >
              sair
            </Button>
          </div>
        </div>
        <RegisterCounselorForm />
      </div>
    </div>
  )
}
