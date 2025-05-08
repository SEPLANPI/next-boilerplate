import { theme } from '@ui/mantine-config'
import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'media',
  theme: {
    colors: {
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
        950: '#030712'
      },
      stone: {
        50: '#FAFAF9',
        100: '#F5F5F4',
        200: '#E7E5E4',
        300: '#D6D3D1',
        400: '#A8A29E',
        500: '#78716C',
        600: '#57534E',
        700: '#44403C',
        800: '#292524',
        900: '#1C1917',
        950: '#0C0A09'
      },

      red: {
        50: '#FFF3F1',
        100: '#FFE4DF',
        200: '#FFCEC5',
        300: '#FFAB9C',
        400: '#FF7B64',
        500: '#FF5133',
        600: '#EF4123',
        700: '#C8290D',
        800: '#A5250F',
        900: '#892413',
        950: '#4B0E04'
      },
      orange: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
        950: '#431407'
      },
      yellow: {
        50: '#FEFCE8',
        100: '#FEF9C3',
        200: '#FEF08A',
        300: '#FDE047',
        400: '#FACC15',
        500: '#EAB308',
        600: '#CA8A04',
        700: '#A16207',
        800: '#854D0E',
        900: '#713F12',
        950: '#422006'
      },
      green: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
        950: '#052E16'
      },
      blue: {
        50: '#F0F6FF',
        100: '#E0EDFE',
        200: '#BADAFD',
        300: '#7DBDFC',
        400: '#389CF8',
        500: '#0E7FE9',
        600: '#0262C7',
        700: '#0352AA',
        800: '#074385',
        900: '#0C396E',
        950: '#082449'
      },
      purple: {
        50: '#f3f0ff',
        100: '#e5dbff',
        200: '#d0bfff',
        300: '#b197fc',
        400: '#9775fa',
        500: '#845ef7',
        600: '#7950f2',
        700: '#7048e8',
        800: '#6741d9',
        900: '#5f3dc4'
      },
      pink: {
        50: '#fff0f6',
        100: '#ffdeeb',
        200: '#fcc2d7',
        300: '#faa2c1',
        400: '#f783ac',
        500: '#f06595',
        600: '#e64980',
        700: '#d6336c',
        800: '#c2255c',
        900: '#a61e4d'
      },
      cyan: {
        50: '#e3fafc',
        100: '#c5f6fa',
        200: '#99e9f2',
        300: '#66d9e8',
        400: '#3bc9db',
        500: '#22b8cf',
        600: '#15aabf',
        700: '#1098ad',
        800: '#0c8599',
        900: '#0b7285'
      },
      lime: {
        50: '#F7FEE7',
        100: '#ECFCCB',
        200: '#D9F99D',
        300: '#BEF264',
        400: '#A3E635',
        500: '#84CC16',
        600: '#65A30D',
        700: '#4D7C0F',
        800: '#3F6212',
        900: '#365314',
        950: '#1A2E05'
      },
      amber: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
        950: '#451A03'
      },
      emerald: {
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B',
        950: '#022C22'
      },
      teal: {
        50: '#F0FDFA',
        100: '#CCFBF1',
        200: '#99F6E4',
        300: '#5EEAD4',
        400: '#2DD4BF',
        500: '#14B8A6',
        600: '#0D9488',
        700: '#0F766E',
        800: '#115E59',
        900: '#134E4A',
        950: '#042F2E'
      },
      govGreen: {
        50: '#F2FFF6',
        100: '#E0FFE9',
        200: '#C4FFD7',
        300: '#97FFBA',
        400: '#61FF9A',
        500: '#009E3A',
        600: '#00822F',
        700: '#006A26',
        800: '#00531E',
        900: '#003D16',
        950: '#002911'
      },
      govYellow: {
        50: '#FFF8EB',
        100: '#FFF2C6',
        200: '#FEE889',
        300: '#FED24B',
        400: '#FDB913',
        500: '#F79C09',
        600: '#DB7504',
        700: '#B65107',
        800: '#933E0D',
        900: '#79340E',
        950: '#461902'
      },
      neutral: {
        0: '#ffffff',
        1000: '#000000'
      },
      white: '#fff',
      black: '#000',
      transparent: 'transparent'
    },
    fontFamily: {
      sans: [
        'Figtree, -apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji'
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    },
    fontSize: {
      xs: 'calc(0.75rem * var(--mantine-scale))',
      sm: 'calc(0.875rem * var(--mantine-scale))',
      base: 'calc(1rem * var(--mantine-scale))',
      lg: 'calc(1.125rem * var(--mantine-scale))',
      xl: 'calc(1.25rem * var(--mantine-scale))',
      '2xl': 'calc(1.5rem * var(--mantine-scale))',
      '3xl': 'calc(1.875rem * var(--mantine-scale))',
      '4xl': 'calc(2.25rem * var(--mantine-scale))',
      '5xl': 'calc(3rem * var(--mantine-scale))',
      '6xl': 'calc(3.75rem * var(--mantine-scale))',
      '7xl': 'calc(4.5rem * var(--mantine-scale))',
      '8xl': 'calc(6rem * var(--mantine-scale))',
      '9xl': 'calc(8rem * var(--mantine-scale))'
    },
    screens: {
      xs: '36em',
      sm: '48em',
      md: '62em',
      lg: '75em',
      xl: '88em'
    },
    extend: {
      borderColor: ({ colors }) => ({
        DEFAULT: colors.gray[200]
      }),
      colors: {
        background: 'white',
        foreground: '#211F20',
        primary: {
          DEFAULT: '#034793',
          foreground: 'white'
        },
        secondary: {
          DEFAULT: '#f8f9fa',
          foreground: '#4B5563'
        },
        muted: {
          DEFAULT: '#e9ecef',
          foreground: '#868e96'
        },
      },
      borderRadius: {
        xs: 'calc(0.1875rem * var(--mantine-scale))',    // 3px
        sm: 'calc(0.25rem * var(--mantine-scale))',      // 4px
        md: 'calc(0.375rem * var(--mantine-scale))',     // 6px
        lg: 'calc(0.5rem * var(--mantine-scale))',       // 8px
        xl: 'calc(0.75rem * var(--mantine-scale))',      // 12px
        '2xl': 'calc(1rem * var(--mantine-scale))',      // 16px
        '3xl': 'calc(1.25rem * var(--mantine-scale))',   // 20px
        '4xl': 'calc(1.5rem * var(--mantine-scale))'     // 24px
      },
      spacing: {
        xs: 'calc(0.625rem * var(--mantine-scale))',
        sm: 'calc(0.75rem * var(--mantine-scale))',
        md: 'calc(1rem * var(--mantine-scale))',
        lg: 'calc(1.25rem * var(--mantine-scale))',
        xl: 'calc(2rem * var(--mantine-scale))'
      },
      lineHeight: {
        xs: '1.4',
        sm: '1.45',
        md: '1.55',
        lg: '1.6',
        xl: '1.65'
      },
      boxShadow: {
        '2xs': '0 1px rgb(0 0 0 / 0.05)',
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        light: '0 4px 20px rgba(238, 238, 238, 0.94)',
      }
    }
  },
  plugins: []
}
export default config
