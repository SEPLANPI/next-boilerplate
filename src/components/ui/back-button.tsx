'use client'
import { ActionIcon } from '@mantine/core'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <ActionIcon variant="default" onClick={() => router.back()}>
      <ArrowLeft className="size-4" />
    </ActionIcon>
  )
}
