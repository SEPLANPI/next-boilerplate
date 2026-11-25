import { DEFAULT_THEME, mergeMantineTheme } from "@mantine/core"
import { describe, expect, it } from "vitest"
import { cssVariablesResolver, theme } from "."

// Valores conferidos contra o Mantine 8.3.18 com o mesmo tema: variante
// `light` com transparência (o 9 usa cor sólida) e peso medium 500 (o 9 usa 600).
describe("visual do Mantine 8 no Mantine 9", () => {
  const variaveis = cssVariablesResolver(
    mergeMantineTheme(DEFAULT_THEME, theme),
  )

  it("mantém a variante light com transparência", () => {
    expect(variaveis.light["--mantine-color-primary-light"]).toBe(
      "rgba(3, 82, 170, 0.1)",
    )
    expect(variaveis.light["--mantine-color-red-light"]).toMatch(
      /^rgba\(.*0\.1\)$/,
    )
  })

  it("mantém o peso medium em 500", () => {
    expect(variaveis.variables["--mantine-font-weight-medium"]).toBe("500")
  })
})
