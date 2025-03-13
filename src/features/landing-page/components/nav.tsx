'use client'
import { Button, Anchor, ActionIcon, Drawer } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Lock, Menu } from 'lucide-react'

const LINK_CLASSES_DESKTOP = 'block text-white font-semibold text-md py-3 px-2'
const LINK_CLASSES_MOBILE =
  'block text-gray-700 font-semibold text-md py-3 px-2'

export function Nav() {
  const [opened, { toggle, close }] = useDisclosure()
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <>
        <ActionIcon color="white" variant="subtle" onClick={toggle} size="lg">
          <Menu className="size-8" />
        </ActionIcon>
        <Drawer
          size={"75%"}
          opened={opened}
          withCloseButton={false}
          onClose={close}
          position="right"
        >
          <div className="space-y-3">
            <nav>
              <ul className="flex flex-col">
                <li>
                  <Anchor className={LINK_CLASSES_MOBILE}>Sobre</Anchor>
                </li>
                <li>
                  <Anchor className={LINK_CLASSES_MOBILE}>PPA</Anchor>
                </li>
                <li>
                  <Anchor className={LINK_CLASSES_MOBILE}>Eixos</Anchor>
                </li>
                <li>
                  <Anchor className={LINK_CLASSES_MOBILE}>Como Funciona</Anchor>
                </li>
                <li>
                  <Anchor className={LINK_CLASSES_MOBILE}>
                    Como Participar
                  </Anchor>
                </li>
              </ul>
            </nav>
            <Button
              size="md"
              fullWidth
              leftSection={<Lock className="size-4" />}
            >
              <div className="flex flex-col space-y-1">
                <span className="text-[9px] font-normal">Acesso exclusivo</span>
                <span className="text-xs">Conselheiros</span>
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
            <Anchor className={LINK_CLASSES_DESKTOP}>Sobre</Anchor>
          </li>
          <li>
            <Anchor className={LINK_CLASSES_DESKTOP}>PPA</Anchor>
          </li>
          <li>
            <Anchor className={LINK_CLASSES_DESKTOP}>Eixos</Anchor>
          </li>
          <li>
            <Anchor className={LINK_CLASSES_DESKTOP}>Como Funciona</Anchor>
          </li>
          <li>
            <Anchor className={LINK_CLASSES_DESKTOP}>Como Participar</Anchor>
          </li>
        </ul>
      </nav>
      <Button size="md" leftSection={<Lock className="size-4" />}>
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-normal">Acesso exclusivo</span>
          <span className="text-xs">Conselheiros</span>
        </div>
      </Button>
    </div>
  )
}
