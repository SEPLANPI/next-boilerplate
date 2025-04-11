'use client'
import { Button, Anchor, ActionIcon, Drawer } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Lock, Menu } from 'lucide-react'

const LINK_CLASSES_DESKTOP =
  'block text-white font-semibold text-md py-3 px-2 data-[isfloating=true]:text-gray-700'
const LINK_CLASSES_MOBILE =
  'block text-gray-700 font-semibold text-md py-3 px-2'

const BUTTON_PROPS = {
  color: 'govYellow.4',
  size: 'sm' as const,
  leftSection: <Lock className="size-4" />,
  component: 'a' as const,
  href: '/api/auth/role-redirect',
  className: 'text-gray-900 font-sans'
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
                    href="#event-info"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Informações do Evento
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#services"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Serviços
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#about-dialogos"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Sobre o Diálogos
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#event-structure"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Como Funciona
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#schedule"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Cronograma
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#strategic-axes"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Eixos Estratégicos
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    href="#participation-guide"
                    className={LINK_CLASSES_MOBILE}
                    onClick={close}
                  >
                    Como Participar
                  </Anchor>
                </li>
              </ul>
            </nav>
            <Button {...BUTTON_PROPS} fullWidth>
              <div className="flex flex-col">
                <span className="text-[9px] font-normal">Acesso exclusivo</span>
                <span className="text-xs font-semibold">Conselheiros</span>
              </div>
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
              href="#event-info"
              className={LINK_CLASSES_DESKTOP}
            >
              Onde estamos
            </Anchor>
          </li>
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#about-dialogos"
              className={LINK_CLASSES_DESKTOP}
            >
              Sobre
            </Anchor>
          </li>
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#event-structure"
              className={LINK_CLASSES_DESKTOP}
            >
              Como Funciona
            </Anchor>
          </li>
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#pluriannual-plan"
              className={LINK_CLASSES_DESKTOP}
            >
              PPA
            </Anchor>
          </li>
          <li>
            <Anchor
              data-isfloating={isFloating}
              href="#strategic-axes"
              className={LINK_CLASSES_DESKTOP}
            >
              Eixos
            </Anchor>
          </li>
        </ul>
      </nav>
      <Button {...BUTTON_PROPS}>
        <div className="flex flex-col">
          <span className="text-[9px] font-normal">Acesso exclusivo</span>
          <span className="text-xs font-semibold">Conselheiros</span>
        </div>
      </Button>
    </div>
  )
}
