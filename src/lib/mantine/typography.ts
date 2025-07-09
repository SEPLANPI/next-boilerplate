/**
 * Typography configuration for the Mantine theme
 * Includes font families, headings, font sizes, and line heights
 */

/**
 * Font family definitions
 */
export const fontFamilies = {
  base: 'Figtree, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  monospace:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace'
}

/**
 * Heading configurations with responsive sizing
 */
export const headings = {
  fontFamily:
    'Figtree, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  fontWeight: '700',
  textWrap: 'wrap' as const,
  sizes: {
    h1: {
      fontSize: 'calc(2.125rem * var(--mantine-scale))',
      lineHeight: '1.3'
    },
    h2: {
      fontSize: 'calc(1.625rem * var(--mantine-scale))',
      lineHeight: '1.35'
    },
    h3: {
      fontSize: 'calc(1.375rem * var(--mantine-scale))',
      lineHeight: '1.4'
    },
    h4: {
      fontSize: 'calc(1.125rem * var(--mantine-scale))',
      lineHeight: '1.45'
    },
    h5: {
      fontSize: 'calc(1rem * var(--mantine-scale))',
      lineHeight: '1.5'
    },
    h6: {
      fontSize: 'calc(0.875rem * var(--mantine-scale))',
      lineHeight: '1.5'
    }
  }
}

/**
 * Font size scale with responsive calculations
 * Using 'm' prefix for numeric values to prevent Mantine pixel fallback
 */
export const fontSizes = {
  xxs: 'calc(0.625rem * var(--mantine-scale))', // 10px - matches Tailwind
  xs: 'calc(0.75rem * var(--mantine-scale))', // 12px - matches Tailwind
  sm: 'calc(0.875rem * var(--mantine-scale))', // 14px - matches Tailwind
  md: 'calc(1rem * var(--mantine-scale))', // 16px - matches Tailwind
  lg: 'calc(1.125rem * var(--mantine-scale))', // 18px - matches Tailwind
  xl: 'calc(1.25rem * var(--mantine-scale))', // 20px - matches Tailwind
  m2xl: 'calc(1.5rem * var(--mantine-scale))', // 24px - matches Tailwind (2xl)
  m3xl: 'calc(2rem * var(--mantine-scale))', // 32px - matches Tailwind (3xl)
  m4xl: 'calc(2.25rem * var(--mantine-scale))', // 36px - matches Tailwind (4xl)
  m5xl: 'calc(3rem * var(--mantine-scale))', // 48px - matches Tailwind (5xl)
  m6xl: 'calc(3.75rem * var(--mantine-scale))', // 60px - matches Tailwind (6xl)
  m7xl: 'calc(4.5rem * var(--mantine-scale))', // 72px - matches Tailwind (7xl)
  m8xl: 'calc(6rem * var(--mantine-scale))', // 96px - matches Tailwind (8xl)
  m9xl: 'calc(8rem * var(--mantine-scale))' // 128px - matches Tailwind (9xl)
} as const

/**
 * Line height scale for consistent vertical rhythm
 */
export const lineHeights = {
  xs: '1.4',
  sm: '1.45',
  md: '1.55',
  lg: '1.6',
  xl: '1.65'
}
