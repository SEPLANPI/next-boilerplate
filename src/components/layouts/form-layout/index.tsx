'use client'

import { ActionIcon, Divider } from '@mantine/core'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FormLayoutHeader({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-10 flex w-full justify-between border-b bg-white px-4 py-2">
      <div className="flex flex-grow items-center space-x-3">
        <ActionIcon variant="ghost" onClick={() => router.back()}>
          <X className="h-4 w-4" />
        </ActionIcon>
        <Divider orientation="vertical" className="my-1" />
        {children}
      </div>
    </header>
  )
}

export function FormLayoutTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-md flex-grow font-semibold">{children}</h2>
}

export function FormLayoutContent({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto my-6 max-w-7xl px-5">{children}</div>
}
