import "../src/app/globals.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"

import type { Preview } from "@storybook/nextjs-vite"
import { MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NuqsTestingAdapter } from "nuqs/adapters/testing"
import { theme } from "../src/lib/mantine"
import React from "react"

// Create a query client for Storybook
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story, { parameters }) => {
      // Get initial search params from story parameters if provided
      const { nuqs } = parameters
      const searchParams = nuqs?.searchParams || ""

      return (
        <QueryClientProvider client={queryClient}>
          <NuqsTestingAdapter searchParams={searchParams}>
            <DatesProvider settings={{ locale: "pt-br" }}>
              <MantineProvider theme={theme}>
                <Story />
              </MantineProvider>
            </DatesProvider>
          </NuqsTestingAdapter>
        </QueryClientProvider>
      )
    },
  ],
}

export default preview
