'use client'

import { Anchor, Button, Menu } from '@mantine/core'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils'

type App = {
  key: string
  name: string
  link: string
}

const apps: App[] = [
  { key: 'dialogos', name: 'Diálogos', link: 'https://dialogos.pi.gov.br/' },
  {
    key: 'opa',
    name: 'OPA',
    link: 'https://opa.seplan.pi.gov.br/'
  },
  { key: 'dadospi', name: 'dadosPI', link: 'https://dados.pi.gov.br/' },
  {
    key: 'pactos',
    name: 'Pactos pelo Piauí',
    link: 'https://pactospelopiaui.pi.gov.br/'
  },
  {
    key: 'retribuir',
    name: 'Retribuir',
    link: 'https://www.seplan.pi.gov.br/projetos/retribuir/'
  },
  { key: 'psi', name: 'PSI', link: 'https://psi.seplan.pi.gov.br/' },
  {
    key: 'pilares',
    name: 'Pilares',
    link: 'https://www.seplan.pi.gov.br/projetos/pilares-ii/'
  }
]

interface SeplanAppsBarProps {
  currentApp?: string
  className?: string
  contentClassName?: string
}

export function SeplanAppsBar({
  currentApp,
  className,
  contentClassName
}: SeplanAppsBarProps) {
  return (
    <header
      className={cn(
        'flex h-[64px] items-center justify-between bg-primary-700 px-8 sm:h-[84px]',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1120px] items-center justify-between',
          contentClassName
        )}
      >
        <div className="flex items-center gap-5">
          <Button
            variant="white"
            component={Link}
            className="hidden sm:block"
            href="https://www.seplan.pi.gov.br/"
          >
            Site da SEPLAN
          </Button>

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <Menu shadow="md" width={200} position="bottom-start">
              <Menu.Target>
                <Button
                  variant="transparent"
                  color="white"
                  size="xs"
                  className="-translate-x-3"
                  rightSection={<ChevronDown className="size-4" />}
                >
                  Programas e projetos
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {apps
                  .filter((app) => app.key !== currentApp)
                  .map((app) => (
                    <Menu.Item key={app.key} component="a" href={app.link}>
                      {app.name}
                    </Menu.Item>
                  ))}
              </Menu.Dropdown>
            </Menu>
          </div>

          <nav className="hidden gap-5 sm:flex">
            {apps
              .filter((app) => app.key !== currentApp)
              .map((app) => (
                <Anchor
                  key={app.key}
                  href={app.link}
                  className="text-sm font-medium text-white"
                >
                  {app.name}
                </Anchor>
              ))}
          </nav>
        </div>
        <Anchor href="https://www.seplan.pi.gov.br/">
          <Image
            src="/logo-seplan-white.svg"
            alt="SEPLAN"
            width={161}
            height={60}
            priority
            className="h-[40px] w-auto object-cover sm:h-[60px]"
          />
        </Anchor>
      </div>
    </header>
  )
}
