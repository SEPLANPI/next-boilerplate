'use client';

import { ActionIcon } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <ActionIcon onClick={() => router.back()} size="md" radius="full" variant="default">
      <ArrowLeft className="size-4" />
    </ActionIcon>
  );
}
