import { auth } from '@/auth'
import { RegisterCounselorForm } from '@/features/register-counselor/components/register-counselor-form'
import { Avatar, Button, Divider } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

export default async function CadastroConselheiroForm({
  params
}: {
  params: { token: string }
}) {
  const data = await auth()

  const formatName = (fullName: string = '') => {
    const names = fullName.split(' ')
    if (names.length <= 1) return fullName
    return `${names[0]} ${names[names.length - 1]}`
  }

  const displayName = formatName(data?.user.fullName)

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center p-5">
      <div className="fixed left-0 top-0 z-0 h-[100dvh] w-full">
        <Image
          src="/conselheiro-form/bg.png"
          fill
          sizes={'100vw'}
          quality={100}
          alt="Senhor com fundo verde"
          className="object-cover"
        />
      </div>
      <div className="x relative z-10 flex w-full max-w-[672px] flex-col space-y-4 sm:mt-16">
        <Image
          src="/conselheiro-form/header.png"
          className="w-full"
          alt="Logo diálogos com listras do piauí em gradiente"
          quality={100}
          width={1350}
          height={144}
        />
        <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md">
          <h1 className="text-xl font-bold">Cadastro de Conselheiros</h1>
          <p className="">
            Preencha os dados abaixo para realizar seu cadastro e participar do
            evento.
          </p>
          <Divider />
          <div className="flex items-center">
            <Avatar
              size="sm"
              color="initials"
              key={displayName}
              name={displayName}
              alt="Avatar do usuário"
              variant="filled"
            />
            <span className="ml-3 text-sm">{displayName}</span>
            <Button
              component={Link}
              prefetch={false}
              href={`/api/auth/sign-out?redirectTo=/conselheiros/cadastro/${params.token}/`}
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
