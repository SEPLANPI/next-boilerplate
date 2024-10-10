'use client'
import { useDisclosure } from '@mantine/hooks'
import { Drawer, UnstyledButton } from '@mantine/core'
import { Menu } from 'lucide-react'
import { MainNav } from './main-nav'

export function MobileNav() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer.Root size="xs" opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Body className="h-full p-0">
            <MainNav />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <UnstyledButton onClick={open}>
        <Menu className="size-5" />
      </UnstyledButton>
    </>
  )
}
