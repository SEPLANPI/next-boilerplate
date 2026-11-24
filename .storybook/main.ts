import type { StorybookConfig } from "@storybook/nextjs-vite"

// O env do cliente (src/config/client-env.ts) é validado com zod ao importar.
// Sem .env (CI, clone novo) as stories que o usam não carregariam: valores
// fictícios como padrão; um .env local continua tendo prioridade.
process.env.NEXT_PUBLIC_APP_URL ??= "http://localhost:6006"
process.env.NEXT_PUBLIC_CLIENT_API_URL ??= "http://localhost:6006/api"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return config
  },
  staticDirs: ["../public"],
}
export default config
