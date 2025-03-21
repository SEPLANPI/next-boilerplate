import { SignInGovpiButton } from '@/features/register-counselor/components/signin-govpi-button'
import { Divider } from '@mantine/core'
import Image from 'next/image'

export default async function CadastroConselheiro() {
  return (
    <div className="flex min-h-[100dvh] w-full gap-8 bg-white p-8 sm:justify-end">
      <div className="relative hidden flex-1 overflow-hidden rounded-md object-cover sm:flex">
        <Image
          src="/conselheiro-form/capa-login.png"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover"
          alt="senhor sorrindo em fundo verde"
        />
      </div>
      <section className="flex w-full flex-shrink-0 flex-col items-center justify-center space-y-12 xs:px-12 sm:mx-8 sm:w-[512px]">
        <Image
          src="/marca-dialogos-vertical.png"
          width={368}
          height={328}
          quality={100}
          className="w-44"
          alt="senhor sorrindo em fundo verde"
        />
        <div className="flex flex-col items-center space-y-3 text-center font-montserrat">
          <h1 className="text-xl font-bold">Bem vindo(a), Conselheiro(a)!</h1>
          <p className="text-sm text-secondary-foreground">
            Preencha os dados abaixo para realizar seu cadastro e participar do
            evento.
          </p>
        </div>
        <Divider className="w-full" />
        <p className="font-bold">
          Para continuar com o preenchimento do formulário, siga os passos
          abaixo para realizar o login no GovPI Cidadão:
        </p>
        <SignInGovpiButton />
        <Divider className="w-full" />
        <p className="text-sm text-secondary-foreground">
          Você será redirecionado(a) para uma página externa (gov.pi), para
          realizar o seu login ou para criar uma nova conta.
        </p>
      </section>
    </div>
  )
}
