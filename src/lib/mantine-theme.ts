import {
  Button,
  Checkbox,
  createTheme,
  defaultVariantColorsResolver,
  Input,
  InputWrapper,
  MantineTheme,
  Table,
  VariantColorsResolver
} from '@mantine/core'

const variantColorResolver: VariantColorsResolver = (button) => {
  const defaultResolvedColors = defaultVariantColorsResolver(button)

  if (button.variant === 'secondary') {
    return {
      background: 'var(--mantine-color-gray-2)',
      color: 'var(--mantine-color-text)',
      hover: 'var(--mantine-color-gray-3)',
      border: 'none'
    }
  }
  if (button.variant === 'ghost') {
    return {
      background: 'transparent',
      color: 'var(--mantine-color-text)',
      hover: 'var(--mantine-color-gray-2)',
      border: 'none'
    }
  }

  return defaultResolvedColors
}

export const theme = createTheme({
  scale: 1,
  fontSmoothing: true,
  focusRing: 'auto',
  white: '#fff',
  black: '#000',

  colors: {
    gray: [
      '#F9FAFB',
      '#F3F4F6',
      '#E5E7EB',
      '#D1D5DB',
      '#9CA3AF',
      '#6B7280',
      '#4B5563',
      '#374151',
      '#1F2937',
      '#111827'
    ],
    stone: [
      '#FAFAF9',
      '#F5F5F4',
      '#E7E5E4',
      '#D6D3D1',
      '#A8A29E',
      '#78716C',
      '#57534E',
      '#44403C',
      '#292524',
      '#1C1917'
    ],
    red: [
      '#FFF3F1',
      '#FFE4DF',
      '#FFCEC5',
      '#FFAB9C',
      '#FF7B64',
      '#FF5133',
      '#EF4123',
      '#C8290D',
      '#A5250F',
      '#892413'
    ],
    pink: [
      '#fff0f6',
      '#ffdeeb',
      '#fcc2d7',
      '#faa2c1',
      '#f783ac',
      '#f06595',
      '#e64980',
      '#d6336c',
      '#c2255c',
      '#a61e4d'
    ],
    grape: [
      '#f8f0fc',
      '#f3d9fa',
      '#eebefa',
      '#e599f7',
      '#da77f2',
      '#cc5de8',
      '#be4bdb',
      '#ae3ec9',
      '#9c36b5',
      '#862e9c'
    ],
    violet: [
      '#f3f0ff',
      '#e5dbff',
      '#d0bfff',
      '#b197fc',
      '#9775fa',
      '#845ef7',
      '#7950f2',
      '#7048e8',
      '#6741d9',
      '#5f3dc4'
    ],
    indigo: [
      '#edf2ff',
      '#dbe4ff',
      '#bac8ff',
      '#91a7ff',
      '#748ffc',
      '#5c7cfa',
      '#4c6ef5',
      '#4263eb',
      '#3b5bdb',
      '#364fc7'
    ],
    blue: [
      '#F0F6FF',
      '#E0EDFE',
      '#BADAFD',
      '#7DBDFC',
      '#389CF8',
      '#0E7FE9',
      '#0262C7',
      '#0352AA',
      '#074385',
      '#0C396E'
    ],
    cyan: [
      '#e3fafc',
      '#c5f6fa',
      '#99e9f2',
      '#66d9e8',
      '#3bc9db',
      '#22b8cf',
      '#15aabf',
      '#1098ad',
      '#0c8599',
      '#0b7285'
    ],
    green: [
      '#F0FDF4',
      '#DCFCE7',
      '#BBF7D0',
      '#86EFAC',
      '#4ADE80',
      '#22C55E',
      '#16A34A',
      '#15803D',
      '#166534',
      '#14532D'
    ],
    govGreen: [
      '#F2FFF6',
      '#E0FFE9',
      '#C4FFD7',
      '#97FFBA',
      '#61FF9A',
      '#009E3A',
      '#00822F',
      '#006A26',
      '#00531E',
      '#003D16'
    ],
    lime: [
      '#F7FEE7',
      '#ECFCCB',
      '#D9F99D',
      '#BEF264',
      '#A3E635',
      '#84CC16',
      '#65A30D',
      '#4D7C0F',
      '#3F6212',
      '#365314'
    ],
    yellow: [
      '#FEFCE8',
      '#FEF9C3',
      '#FEF08A',
      '#FDE047',
      '#FACC15',
      '#EAB308',
      '#CA8A04',
      '#A16207',
      '#854D0E',
      '#713F12',
      '#422006'
    ],
    amber: [
      '#FFFBEB',
      '#FEF3C7',
      '#FDE68A',
      '#FCD34D',
      '#FBBF24',
      '#F59E0B',
      '#D97706',
      '#B45309',
      '#92400E',
      '#78350F',
      '#451A03'
    ],
    govYellow: [
      '#FFF8EB',
      '#FFF2C6',
      '#FEE889',
      '#FED24B',
      '#FDB913',
      '#F79C09',
      '#DB7504',
      '#B65107',
      '#933E0D',
      '#79340E'
    ],
    orange: [
      '#FFF7ED',
      '#FFEDD5',
      '#FED7AA',
      '#FDBA74',
      '#FB923C',
      '#F97316',
      '#EA580C',
      '#C2410C',
      '#9A3412',
      '#7C2D12'
    ],
    purple: [
      '#f3f0ff',
      '#e5dbff',
      '#d0bfff',
      '#b197fc',
      '#9775fa',
      '#845ef7',
      '#7950f2',
      '#7048e8',
      '#6741d9',
      '#5f3dc4'
    ],
    teal: [
      '#F0FDFA',
      '#CCFBF1',
      '#99F6E4',
      '#5EEAD4',
      '#2DD4BF',
      '#14B8A6',
      '#0D9488',
      '#0F766E',
      '#115E59',
      '#134E4A',
      '#042F2E'
    ],
    emerald: [
      '#ECFDF5',
      '#D1FAE5',
      '#A7F3D0',
      '#6EE7B7',
      '#34D399',
      '#10B981',
      '#059669',
      '#047857',
      '#065F46',
      '#064E3B',
      '#022C22'
    ]
  },
  primaryShade: {
    light: 6,
    dark: 8
  },
  primaryColor: 'govGreen',
  autoContrast: true,
  luminanceThreshold: 0.3,
  fontFamily:
    'Figtree, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  fontFamilyMonospace:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  respectReducedMotion: false,

  cursorType: 'default',
  defaultGradient: {
    from: 'blue',
    to: 'cyan',
    deg: 45
  },
  defaultRadius: 'md',
  activeClassName: 'mantine-active',
  focusClassName: '',
  headings: {
    fontFamily:
      'Figtree, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    fontWeight: '700',
    textWrap: 'wrap',
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
  },
  fontSizes: {
    xs: 'calc(0.75rem * var(--mantine-scale))',
    sm: 'calc(0.875rem * var(--mantine-scale))',
    md: 'calc(1rem * var(--mantine-scale))',
    lg: 'calc(1.125rem * var(--mantine-scale))',
    xl: 'calc(1.25rem * var(--mantine-scale))'
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65'
  },
  radius: {
    xs: 'calc(0.1875rem * var(--mantine-scale))',    // 3px
    sm: 'calc(0.25rem * var(--mantine-scale))',      // 4px
    md: 'calc(0.375rem * var(--mantine-scale))',     // 6px
    lg: 'calc(0.5rem * var(--mantine-scale))',       // 8px
    xl: 'calc(0.75rem * var(--mantine-scale))',      // 12px
    '2xl': 'calc(1rem * var(--mantine-scale))',      // 16px
    '3xl': 'calc(1.25rem * var(--mantine-scale))',   // 20px
    '4xl': 'calc(1.5rem * var(--mantine-scale))',     // 24px
    full: '9999px',
  },
  spacing: {
    xs: 'calc(0.625rem * var(--mantine-scale))',
    sm: 'calc(0.75rem * var(--mantine-scale))',
    md: 'calc(1rem * var(--mantine-scale))',
    lg: 'calc(1.25rem * var(--mantine-scale))',
    xl: 'calc(2rem * var(--mantine-scale))'
  },
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em'
  },
  shadows: {
    '2xs': '0 1px rgb(0 0 0 / 0.05)',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  other: {},
  components: {
    Button: Button.extend({
      classNames: {
        root: 'shadow-xs'
      }
    }),
    InputWrapper: InputWrapper.extend({
      classNames: {
        label: 'text-secondary-foreground'
      }
    }),
    Input: Input.extend({
      classNames: (theme, props) => {
        return {
          input: '[&:not(:focus)]:border-gray-200 shadow-xs'
        }
      }
    }),
    Table: Table.extend({
      vars: (theme) => ({
        table: {
          '--table-border-color': theme.colors.gray[2],
        },
      }),
      classNames: {
        thead: 'bg-gray-100 text-secondary-foreground [&>tr]:border-0',
        th: 'font-semibold last:rounded-r-md first:rounded-l-md'
      }
    }),
    Checkbox: Checkbox.extend({
      classNames: {
        input: 'rounded-xs'
      }
    })
  },
  variantColorResolver: variantColorResolver
})
