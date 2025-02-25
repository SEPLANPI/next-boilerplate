'use client'
import { ActionIcon } from '@mantine/core'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <ActionIcon variant="default" onClick={() => router.back()}>
      <ChevronLeft className="size-4" />
    </ActionIcon>
  )
}
