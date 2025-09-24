/**
 * Layout configuration for the Mantine theme
 * Includes spacing, border radius, and responsive breakpoints
 * Matches Tailwind configuration for consistency
 * Types extended in mantine.d.ts for custom radius values
 */

/**
 * Spacing scale with consistent increments - matches Tailwind full scale
 * Using 'm' prefix for numeric values to prevent Mantine pixel fallback
 */
export const spacing = {
  // Exact pixel values
  m0: "0px", // 0
  px: "1px",

  // Fractional rem values with 'm' prefix
  "m0.5": "calc(0.125rem * var(--mantine-scale))", // 2px (0.5)
  m1: "calc(0.25rem * var(--mantine-scale))", // 4px (1)
  "m1.5": "calc(0.375rem * var(--mantine-scale))", // 6px (1.5)
  m2: "calc(0.5rem * var(--mantine-scale))", // 8px (2)
  "m2.5": "calc(0.625rem * var(--mantine-scale))", // 10px (2.5)
  m3: "calc(0.75rem * var(--mantine-scale))", // 12px (3)
  "m3.5": "calc(0.875rem * var(--mantine-scale))", // 14px (3.5)
  m4: "calc(1rem * var(--mantine-scale))", // 16px (4)
  m5: "calc(1.25rem * var(--mantine-scale))", // 20px (5)
  m6: "calc(1.5rem * var(--mantine-scale))", // 24px (6)
  m7: "calc(1.75rem * var(--mantine-scale))", // 28px (7)
  m8: "calc(2rem * var(--mantine-scale))", // 32px (8)
  m9: "calc(2.25rem * var(--mantine-scale))", // 36px (9)
  m10: "calc(2.5rem * var(--mantine-scale))", // 40px (10)
  m11: "calc(2.75rem * var(--mantine-scale))", // 44px (11)
  m12: "calc(3rem * var(--mantine-scale))", // 48px (12)
  m14: "calc(3.5rem * var(--mantine-scale))", // 56px (14)
  m16: "calc(4rem * var(--mantine-scale))", // 64px (16)
  m20: "calc(5rem * var(--mantine-scale))", // 80px (20)
  m24: "calc(6rem * var(--mantine-scale))", // 96px (24)
  m28: "calc(7rem * var(--mantine-scale))", // 112px (28)
  m32: "calc(8rem * var(--mantine-scale))", // 128px (32)
  m36: "calc(9rem * var(--mantine-scale))", // 144px (36)
  m40: "calc(10rem * var(--mantine-scale))", // 160px (40)
  m44: "calc(11rem * var(--mantine-scale))", // 176px (44)
  m48: "calc(12rem * var(--mantine-scale))", // 192px (48)
  m52: "calc(13rem * var(--mantine-scale))", // 208px (52)
  m56: "calc(14rem * var(--mantine-scale))", // 224px (56)
  m60: "calc(15rem * var(--mantine-scale))", // 240px (60)
  m64: "calc(16rem * var(--mantine-scale))", // 256px (64)
  m72: "calc(18rem * var(--mantine-scale))", // 288px (72)
  m80: "calc(20rem * var(--mantine-scale))", // 320px (80)
  m96: "calc(24rem * var(--mantine-scale))", // 384px (96)

  // Semantic spacing - matches Tailwind
  xs: "calc(0.625rem * var(--mantine-scale))", // 10px - matches Tailwind
  sm: "calc(0.75rem * var(--mantine-scale))", // 12px - matches Tailwind
  md: "calc(1rem * var(--mantine-scale))", // 16px - matches Tailwind
  lg: "calc(1.25rem * var(--mantine-scale))", // 20px - matches Tailwind
  xl: "calc(2rem * var(--mantine-scale))", // 32px - matches Tailwind
} as const

/**
 * Border radius scale from subtle to full rounded - matches Tailwind
 * Includes custom numeric values for extended theme support
 * Using 'm' prefix for numeric values to prevent Mantine pixel fallback
 */
export const radius = {
  xs: "calc(0.1875rem * var(--mantine-scale))", // 3px - matches Tailwind
  sm: "calc(0.25rem * var(--mantine-scale))", // 4px - matches Tailwind
  md: "calc(0.375rem * var(--mantine-scale))", // 6px - matches Tailwind
  lg: "calc(0.5rem * var(--mantine-scale))", // 8px - matches Tailwind
  xl: "calc(0.75rem * var(--mantine-scale))", // 12px - matches Tailwind
  m2xl: "calc(1rem * var(--mantine-scale))", // 16px - matches Tailwind (2xl)
  m3xl: "calc(1.25rem * var(--mantine-scale))", // 20px - matches Tailwind (3xl)
  m4xl: "calc(1.5rem * var(--mantine-scale))", // 24px - matches Tailwind (4xl)
  full: "9999px",
} as const

/**
 * Responsive breakpoints for different screen sizes - matches Tailwind
 */
export const breakpoints = {
  xs: "36em", // 576px - matches Tailwind
  sm: "48em", // 768px - matches Tailwind
  md: "62em", // 992px - matches Tailwind
  lg: "75em", // 1200px - matches Tailwind
  xl: "88em", // 1408px - matches Tailwind
} as const
