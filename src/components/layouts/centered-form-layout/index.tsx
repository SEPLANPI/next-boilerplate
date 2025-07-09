import Image from 'next/image'
import { PropsWithChildren } from 'react'

export function CenteredFormHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col space-y-3 rounded-md bg-white p-6 shadow-md">
      {children}
    </div>
  )
}

export function CenteredFormTitle({ children }: PropsWithChildren) {
  return (
    <h1 className="font-semibold text-content-emphasis sm:text-lg">
      {children}
    </h1>
  )
}

export function CenteredFormDescription({ children }: PropsWithChildren) {
  return <p className="text-sm">{children}</p>
}

export function CenteredFormContent({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col rounded-md bg-white p-6 shadow-md">
      {children}
    </div>
  )
}

export function CenteredFormLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-[100dvh] w-full justify-center p-4">
      <div className="fixed left-0 top-0 z-0 h-[100dvh] w-full">
        <Image
          src="/form-bg.png"
          fill
          sizes={'100vw'}
          quality={100}
          alt="Senhor com fundo verde"
          className="object-cover"
        />
      </div>
      <div className="x relative z-10 flex w-full max-w-[672px] flex-col space-y-4 sm:mt-16">
        <Image
          src="/form-header.png"
          className="w-full"
          alt="Logo diálogos com listras do piauí em gradiente"
          quality={100}
          width={1350}
          height={144}
        />
        {children}
      </div>
    </div>
  )
}
