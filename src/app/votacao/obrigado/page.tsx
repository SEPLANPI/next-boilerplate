import Image from 'next/image'

export default function VotingThanksPage() {
  return (
    <div className="relative flex min-h-[100dvh] w-full justify-center bg-gray-50 p-5">
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
          <h1 className="font-bold sm:text-lg">Voto registrado com sucesso!</h1>
          <div className="space-y-2 text-sm text-secondary-foreground">
            <p>Muito obrigado por participar do Diálogos pelo Piauí.</p>
            <p>
              Sua opinião foi registrada e vai ajudar a construir soluções
              melhores para nossa comunidade e para o nosso estado.
            </p>
            <p>Juntos, a gente faz a diferença!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
