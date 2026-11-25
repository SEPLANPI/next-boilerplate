"use client"

import { MantineProvider, mergeThemeOverrides } from "@mantine/core"
import { theme as temaDaLib } from "@ui/mantine-config"
import { compatibilidadeMantine8, cssVariablesResolver } from "@/lib/mantine"
import { Suspense } from "react"
import { ErrorContent } from "./error-content"

const theme = mergeThemeOverrides(temaDaLib, compatibilidadeMantine8)

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
