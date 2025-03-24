'use client'

import { useWindowScroll } from '@mantine/hooks'
import { Nav } from './nav'
import Image from 'next/image'

export function Header() {
  const [scroll] = useWindowScroll()

  const isFloating = scroll.y > 20

  return (
    <header
      data-fixed={isFloating}
      className="fixed left-[50%] top-0 z-20 w-full -translate-x-[50%] items-center justify-between px-8 py-4 transition-colors data-[fixed=true]:bg-white data-[fixed=true]:shadow-sm md:py-4"
    >
      <div className="content mx-auto flex w-full max-w-[1120px] items-center justify-between">
        <Image
          data-isfloating={isFloating}
          width={288}
          height={80}
          src="/lp/logo-verde.png"
          alt="Logo Diálogos"
          className="hidden h-[30px] w-auto data-[isfloating=true]:block sm:h-[40px]"
        />
        <Image
          data-isfloating={isFloating}
          width={288}
          height={80}
          src="/lp/logo.png"
          alt="Logo Diálogos"
          className="block h-[30px] w-auto data-[isfloating=true]:hidden sm:h-[40px]"
        />
        <Nav isFloating={isFloating} />
      </div>
    </header>
  )
}
