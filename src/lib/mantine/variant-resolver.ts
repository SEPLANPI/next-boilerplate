import {
  defaultVariantColorsResolver,
  VariantColorsResolver,
} from "@mantine/core"

/**
 * Custom variant color resolver for extended button styles
 * Provides additional 'secondary' and 'ghost' variants beyond Mantine defaults
 */
export const variantColorResolver: VariantColorsResolver = (button) => {
  const defaultResolvedColors = defaultVariantColorsResolver(button)

  if (button.variant === "ghost") {
    return {
      background: "transparent",
      color: "var(--mantine-color-text)",
      hover: "var(--mantine-color-gray-2)",
      border: "none",
    }
  }

  return defaultResolvedColors
}
