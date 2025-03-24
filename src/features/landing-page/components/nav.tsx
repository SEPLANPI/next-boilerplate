'use client'
import { Button, Anchor, ActionIcon, Drawer } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Lock, Menu } from 'lucide-react'

const LINK_CLASSES_DESKTOP =
  'block text-white font-semibold text-md py-3 px-2 data-[isfloating=true]:text-gray-700'
const LINK_CLASSES_MOBILE =
  'block text-gray-700 font-semibold text-md py-3 px-2'

const BUTTON_PROPS = {
  color: 'yellow.4',
  size: 'sm' as const,
  leftSection: <Lock className="size-4" />,
  component: 'a' as const,
  href: '/api/auth/role-redirect',
  className: 'text-gray-900'
}

export function Nav({ isFloating = false }: { isFloating: boolean }) {
  const [opened, { toggle, close }] = useDisclosure()
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <>
        <ActionIcon
          color={isFloating ? '' : 'white'}
          variant="subtle"
          onClick={toggle}
          size="lg"
        >
          <Menu className="size-8" />
        </ActionIcon>
        <Drawer
          size={'75%'}
          opened={opened}
          withCloseButton={false}
          onClose={close}
          position="right"
        >
          <div className="space-y-3">
            <nav>
              <ul className="flex flex-col">
                <li>
                  <Anchor
                    href="#sobre"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Sobre
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#ppa"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    PPA
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#eixos"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Eixos
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#como-funciona"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Como Funciona
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#como-participar"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Como Participar
                  </Anchor>
                </li>
              </ul>
            </nav>
            <Button {...BUTTON_PROPS} fullWidth>
              Acessar Sistema
            </Button>
          </div>
        </Drawer>
      </>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <nav>
        <ul className="flex">
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#sobre"
              className={LINK_CLASSES_DESKTOP}
            >
              Sobre
            </Anchor>
          </li>
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#ppa"
              className={LINK_CLASSES_DESKTOP}
            >
              PPA
            </Anchor>
          </li>
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#eixos"
              className={LINK_CLASSES_DESKTOP}
            >
              Eixos
            </Anchor>
          </li>
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#como-funciona"
              className={LINK_CLASSES_DESKTOP}
            >
              Como Funciona
            </Anchor>
          </li>
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#como-participar"
              className={LINK_CLASSES_DESKTOP}
            >
              Como Participar
            </Anchor>
          </li>
        </ul>
      </nav>
      <Button {...BUTTON_PROPS}>Acessar Sistema</Button>
    </div>
  )
}
