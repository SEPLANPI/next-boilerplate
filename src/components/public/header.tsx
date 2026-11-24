import { Container } from "@mantine/core"
import Image from "next/image"
import { PropsWithChildren } from "react"

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="sticky top-0 z-20 w-full items-center justify-between bg-white py-2 shadow-sm transition-all md:py-3">
      <Container className="flex w-full items-center justify-between">
        <Image
          width={166}
          height={53}
          priority
          src="/logo.svg"
          alt="Logo Conferência Estadual das Cidades"
          className="h-8 w-auto sm:h-10 md:h-[53px]"
        />
      </Container>
      <div className="ml-auto flex space-x-2">{children}</div>
    </header>
  )
}
