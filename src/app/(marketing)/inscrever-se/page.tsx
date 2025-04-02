import { RegisterPersonForm } from '@/features/register-person/components/register-person-form'
import Image from 'next/image'

export const metadata = {
  title: 'Inscreva-se',
  description:
    'Inscreva-se para o evento Diálogos Pelo Piauí e contribua com ideias para um futuro mais justo e sustentável.'
}

export default function Register() {
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
          <h1 className="font-montserrat text-xl font-bold">
            Cadastro de Participantes
          </h1>
          <p className="text-secondary-foreground">
            Preencha os dados abaixo para garantir sua participação no evento e
            contribuir com ideias para um futuro mais justo e sustentável.
          </p>
        </div>
        <RegisterPersonForm />
      </div>
    </div>
  )
}
