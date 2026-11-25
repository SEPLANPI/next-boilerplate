"use client"

import { MantineProvider } from "@mantine/core"
import { theme } from "@ui/mantine-config"
import { cssVariablesResolver } from "@/lib/mantine"
import { Suspense } from "react"
import { ErrorContent } from "./error-content"

export default function ErrorPage() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <MantineProvider
        theme={theme}
        cssVariablesResolver={cssVariablesResolver}
      >
        <Suspense fallback={<div>Carregando...</div>}>
          <ErrorContent />
        </Suspense>
      </MantineProvider>
    </div>
  )
}
