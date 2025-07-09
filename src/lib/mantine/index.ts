import { createTheme } from '@mantine/core'
import { colors } from './colors'
import { fontFamilies, headings, fontSizes, lineHeights } from './typography'
import { spacing, radius, breakpoints } from './layout'
import { shadows } from './shadows'
import { components } from './components'
import { variantColorResolver } from './variant-resolver'

/**
 * Main Mantine theme configuration
 * Combines all theme modules into a cohesive design system
 */
export const theme = createTheme({
  // Core settings
  scale: 1,
  fontSmoothing: true,
  focusRing: 'auto',
  white: '#fff',
  black: '#000',

  // Color system
  colors,
  primaryShade: {
    light: 6,
    dark: 8
  },
  primaryColor: 'govGreen',
  autoContrast: true,
  luminanceThreshold: 0.3,

  // Typography
  fontFamily: fontFamilies.base,
  fontFamilyMonospace: fontFamilies.monospace,
  headings,
  fontSizes,
  lineHeights,

  // Layout and spacing
  spacing,
  radius,
  breakpoints,

  // Visual effects
  shadows,

  // Interaction and animation
  respectReducedMotion: false,
  cursorType: 'default',

  // Default styling
  defaultGradient: {
    from: 'blue',
    to: 'cyan',
    deg: 45
  },
  defaultRadius: 'md',
  activeClassName: 'mantine-active',
  focusClassName: '',

  // Component customizations
  components,

  // Custom variant resolver
  variantColorResolver
})

// Re-export all modules for direct access if needed
export * from './colors'
export * from './typography'
export * from './layout'
export * from './shadows'
export * from './components'
export * from './variant-resolver'
