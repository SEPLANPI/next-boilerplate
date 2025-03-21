import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'media', // or 'class'
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
        50: '#FFFBEB',
        100: '#FFF2C6',
        200: '#FEE689',
        300: '#FED24B',
        400: '#FDB913',
        500: '#F79C09',
        600: '#DB7504',
        700: '#B65107',
        800: '#933E0D',
        900: '#79340E',
        950: '#461902'
      },
      green: {
        50: '#ECFFF4',
        100: '#D3FFE5',
        200: '#AAFFCE',
        300: '#69FFA9',
        400: '#21FF7C',
        500: '#00F25A',
        600: '#00CA47',
        700: '#009E3A',
        800: '#007932',
        900: '#02652C',
        950: '#003916',
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
        50: '#f4fce3',
        100: '#e9fac8',
        200: '#d8f5a2',
        300: '#c0eb75',
        400: '#a9e34b',
        500: '#94d82d',
        600: '#82c91e',
        700: '#74b816',
        800: '#66a80f',
        900: '#5c940d'
      },
      neutral: {
        0: '#ffffff', // White
        1000: '#000000' // Black
      },
      white: '#fff',
      black: '#000',
      transparent: 'transparent'
    },
    fontFamily: {
      montserrat: 'var(--font-montserrat)',
      sans: [
        'Roboto, -apple-system',
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
      // Definindo os breakpoints de acordo com o tema fornecido
      xs: '36em', // 576px
      sm: '48em', // 768px
      md: '62em', // 992px
      lg: '75em', // 1200px
      xl: '88em' // 1408px
    },
    extend: {
      borderColor: {
        DEFAULT: '#E5E7EB'
      },
      colors: {
        background: 'white',
        foreground: '#211F20',
        primary: {
          DEFAULT: '#034793',
          foreground: 'white'
        },
        secondary: {
          DEFAULT: '#f8f9fa',
          foreground: '#6B7280'
        },
        muted: {
          DEFAULT: '#e9ecef',
          foreground: '#868e96'
        }
      },
      borderRadius: {
        xs: 'calc(0.125rem * var(--mantine-scale))',
        sm: 'calc(0.25rem * var(--mantine-scale))',
        md: 'calc(0.5rem * var(--mantine-scale))',
        lg: 'calc(1rem * var(--mantine-scale))',
        xl: 'calc(2rem * var(--mantine-scale))'
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
        xs: '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)',
        sm: '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem',
        md: '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.625rem 0.625rem -0.3125rem',
        lg: '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.75rem 1.4375rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 0.75rem 0.75rem -0.4375rem',
        xl: '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 2.25rem 1.75rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 1.0625rem 1.0625rem -0.4375rem'
      }
    }
  },
  plugins: []
}
export default config