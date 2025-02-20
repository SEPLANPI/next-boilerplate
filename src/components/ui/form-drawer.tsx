'use client'

import { Drawer, DrawerProps } from '@mantine/core'
import { PropsWithChildren, ReactNode } from 'react'

interface FormDrawerRootProps extends Omit<DrawerProps, 'children'> {
  children: ReactNode
  onClose: () => void
}

function FormDrawerRoot({ children, onClose, ...props }: FormDrawerRootProps) {
  return (
    <Drawer.Root onClose={onClose} position="right" size="xl" {...props}>
      <Drawer.Overlay />
      <Drawer.Content>
        <div className="flex h-full flex-col">{children}</div>
      </Drawer.Content>
    </Drawer.Root>
  )
}


function FormDrawerHeader({ children }: PropsWithChildren) {
  return (
    <Drawer.Header className="border-b px-5 py-4">
      <Drawer.Title className="text-lg font-semibold">{children}</Drawer.Title>
      <Drawer.CloseButton />
    </Drawer.Header>
  )
}

interface FormDrawerContentProps {
  children: ReactNode
}

function FormDrawerContent({ children }: FormDrawerContentProps) {
  return <Drawer.Body className="flex flex-1 flex-col p-5">{children}</Drawer.Body>
}


function FormDrawerFooter({children
}: PropsWithChildren) {
  return (
    <footer className="sticky bottom-0 border-t bg-white p-5">
      {children}
    </footer>
  )
}

export const FormDrawer = {
  Root: FormDrawerRoot,
  Header: FormDrawerHeader,
  Content: FormDrawerContent,
  Footer: FormDrawerFooter
}
