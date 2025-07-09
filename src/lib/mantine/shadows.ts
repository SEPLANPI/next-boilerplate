/**
 * Shadow definitions for the Mantine theme
 * Progressive elevation system for depth and hierarchy
 * Matches Tailwind shadow configuration
 * Using 'm' prefix for numeric values to prevent Mantine pixel fallback
 */

export const shadows = {
  // Custom numbered shadows from Tailwind config with 'm' prefix
  'm0.5':
    '0px 1.5px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px 1.5px 2px 0px rgba(0, 0, 85, 0.02) inset',
  m1: '0px 0.5px 3px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px -1px rgba(0, 0, 0, 0.05)',
  m2: '0px 1px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px 1px 3px 0px rgba(0, 0, 0, 0.05)',
  m3: '0px 1px 3px 0px rgba(0, 0, 0, 0.05), 0px 2px 1px -1px rgba(0, 0, 0, 0.05)',
  m4: '0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)',
  m5: '0px 4px 6px -4px rgba(24, 39, 75, 0.12), 0px 8px 8px -4px rgba(24, 39, 75, 0.08)',
  m6: '0px 6px 8px -6px rgba(24, 39, 75, 0.12), 0px 8px 16px -6px rgba(24, 39, 75, 0.08)',
  m7: '0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)',
  m8: '0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.10)',
  m9: '0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)',
  m10: '0px 8px 22px -6px rgba(24, 39, 75, 0.12), 0px 14px 64px -4px rgba(24, 39, 75, 0.12)',
  m11: '0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)',

  // Standard Tailwind shadows
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // matches Tailwind xs
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // matches Tailwind sm
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // matches Tailwind md
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // matches Tailwind lg
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // matches Tailwind xl
  m2xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)', // matches Tailwind 2xl

  // Custom light shadow
  light: '0 4px 20px rgba(238, 238, 238, 0.94)'
} as const
