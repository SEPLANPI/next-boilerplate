import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core"

/**
 * Extended custom colors that include government brand colors
 */
type ExtendedCustomColors =
  | "govGreen"
  | "govRed"
  | "govYellow"
  | "govBlue"
  | "govBlack"
  | "sky"
  | "fuchsia"
  | "rose"
  | "neutral"
  | DefaultMantineColor

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>
  }

  export interface ButtonProps {
    variant?: ButtonVariant | "ghost"
    selected?: boolean
  }

  export interface MantineThemeSizesOverride {
    spacing: Record<
      | "m0"
      | "px"
      | "m0.5"
      | "m1"
      | "m1.5"
      | "m2"
      | "m2.5"
      | "m3"
      | "m3.5"
      | "m4"
      | "m5"
      | "m6"
      | "m7"
      | "m8"
      | "m9"
      | "m10"
      | "m11"
      | "m12"
      | "m14"
      | "m16"
      | "m20"
      | "m24"
      | "m28"
      | "m32"
      | "m36"
      | "m40"
      | "m44"
      | "m48"
      | "m52"
      | "m56"
      | "m60"
      | "m64"
      | "m72"
      | "m80"
      | "m96"
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl",
      string
    >
    fontSizes: Record<
      | "xxs"
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "m2xl"
      | "m3xl"
      | "m4xl"
      | "m5xl"
      | "m6xl"
      | "m7xl"
      | "m8xl"
      | "m9xl",
      string
    >
    radius: Record<
      "xs" | "sm" | "md" | "lg" | "xl" | "m2xl" | "m3xl" | "m4xl" | "full",
      string
    >
    shadows: Record<
      | "m0.5"
      | "m1"
      | "m2"
      | "m3"
      | "m4"
      | "m5"
      | "m6"
      | "m7"
      | "m8"
      | "m9"
      | "m10"
      | "m11"
      | "light"
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "m2xl",
      string
    >
  }
}
