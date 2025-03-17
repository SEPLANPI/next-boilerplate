import { RegisterCounselorForm } from '@/features/register-counselor/components/register-counselor-form'
import { SignInGovpiButton } from '@/features/register-counselor/components/signin-govpi-button'
import { registerCounselorSearchParams } from '@/features/register-counselor/lib/search-params'
import { Button, Divider } from '@mantine/core'
import Image from 'next/image'
import { SearchParams } from 'nuqs/server'

interface CadastroConselheiroProps {
  searchParams: Promise<SearchParams>
}

export default async function CadastroConselheiro({
  searchParams
}: CadastroConselheiroProps) {
  await registerCounselorSearchParams.parse(searchParams)
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center py-5 sm:justify-end sm:pr-20">
      <Image
        src="/background-conselheiro-form.png"
        width={5760}
        height={3240}
        quality={100}
        alt="Senhor com fundo verde"
        className="fixed left-0 top-0 z-0 h-[100dvh] w-full object-cover"
      />
      <div className="relative z-10 flex min-h-[90dvh] w-[90%] flex-col gap-8 rounded-md bg-white p-6 shadow sm:min-h-[680px] sm:w-[600px]">
        <h2 className="text-lg font-bold">
          Para que possamos atender você melhor, é necessário que se autentique
          no sistema com sua conta ACESSO.GOV.BR.
        </h2>
        <Divider />
        <p className="text-lg">
          Clique no botão abaixo para acessar os serviços do Governo.
        </p>
        <SignInGovpiButton />
        <p>
          Você será redirecionado(a) para uma página externa (gov.pi), para
          realizar o seu login ou para criar uma nova conta.
        </p>
      </div>
    </div>
  )
}
