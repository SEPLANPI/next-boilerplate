import type { Config } from "tailwindcss"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    colors: {
      // gray: {
      //   50: '#F9FAFB',
      //   100: '#F3F4F6',
      //   200: '#E5E7EB',
      //   300: '#D1D5DB',
      //   400: '#9CA3AF',
      //   500: '#6B7280',
      //   600: '#4B5563',
      //   700: '#374151',
      //   800: '#1F2937',
      //   900: '#111827',
      //   950: '#030712'
      // },
      // zinc
      gray: {
        50: "#FAFAFA",
        100: "#F4F4F5",
        200: "#E4E4E7",
        300: "#D4D4D8",
        400: "#A1A1AA",
        500: "#71717A",
        600: "#52525B",
        700: "#3F3F46",
        800: "#27272A",
        900: "#18181B",
        950: "#09090B",
      },
      // stone
      stone: {
        50: "#FAFAF9",
        100: "#F5F5F4",
        200: "#E7E5E4",
        300: "#D6D3D1",
        400: "#A8A29E",
        500: "#78716C",
        600: "#57534E",
        700: "#44403C",
        800: "#292524",
        900: "#1C1917",
        950: "#0C0A09",
      },
      sky: {
        50: "#F0F9FF",
        100: "#E0F2FE",
        200: "#BAE6FD",
        300: "#7DD3FC",
        400: "#38BDF8",
        500: "#0EA5E9",
        600: "#0284C7",
        700: "#0369A1",
        800: "#075985",
        900: "#0C4A6E",
        950: "#082F49",
      },
      red: {
        50: "#FEF2F2",
        100: "#FEE2E2",
        200: "#FECACA",
        300: "#FCA5A5",
        400: "#F87171",
        500: "#EF4444",
        600: "#DC2626",
        700: "#B91C1C",
        800: "#991B1B",
        900: "#7F1D1D",
        950: "#450A0A",
      },
      orange: {
        50: "#FFF7ED",
        100: "#FFEDD5",
        200: "#FED7AA",
        300: "#FDBA74",
        400: "#FB923C",
        500: "#F97316",
        600: "#EA580C",
        700: "#C2410C",
        800: "#9A3412",
        900: "#7C2D12",
        950: "#431407",
      },
      yellow: {
        50: "#FEFCE8",
        100: "#FEF9C3",
        200: "#FEF08A",
        300: "#FDE047",
        400: "#FACC15",
        500: "#EAB308",
        600: "#CA8A04",
        700: "#A16207",
        800: "#854D0E",
        900: "#713F12",
        950: "#422006",
      },
      green: {
        50: "#F0FDF4",
        100: "#DCFCE7",
        200: "#BBF7D0",
        300: "#86EFAC",
        400: "#4ADE80",
        500: "#22C55E",
        600: "#16A34A",
        700: "#15803D",
        800: "#166534",
        900: "#14532D",
        950: "#052E16",
      },
      blue: {
        50: "#EFF6FF",
        100: "#DBEAFE",
        200: "#BFDBFE",
        300: "#93C5FD",
        400: "#60A5FA",
        500: "#3B82F6",
        600: "#2563EB",
        700: "#1D4ED8",
        800: "#1E40AF",
        900: "#1E3A8A",
        950: "#172554",
      },
      indigo: {
        50: "#EEF2FF",
        100: "#E0E7FF",
        200: "#C7D2FE",
        300: "#A5B4FC",
        400: "#818CF8",
        500: "#6366F1",
        600: "#4F46E5",
        700: "#4338CA",
        800: "#3730A3",
        900: "#312E81",
        950: "#1E1B4B",
      },
      violet: {
        50: "#F5F3FF",
        100: "#EDE9FE",
        200: "#DDD6FE",
        300: "#C4B5FD",
        400: "#A78BFA",
        500: "#8B5CF6",
        600: "#7C3AED",
        700: "#6D28D9",
        800: "#5B21B6",
        900: "#4C1D95",
        950: "#2E1065",
      },
      purple: {
        50: "#FAF5FF",
        100: "#F3E8FF",
        200: "#E9D5FF",
        300: "#D8B4FE",
        400: "#C084FC",
        500: "#A855F7",
        600: "#9333EA",
        700: "#7E22CE",
        800: "#6D21A8",
        900: "#581C87",
        950: "#3B0764",
      },
      fuchsia: {
        50: "#FDF4FF",
        100: "#FAE8FF",
        200: "#F5D0FE",
        300: "#F0ABFC",
        400: "#E879F9",
        500: "#D946EF",
        600: "#C026D3",
        700: "#A21CAF",
        800: "#86198F",
        900: "#701A75",
        950: "#4A044E",
      },
      pink: {
        50: "#FDF2F8",
        100: "#FCE7F3",
        200: "#FBCFE8",
        300: "#F9A8D4",
        400: "#F472B6",
        500: "#EC4899",
        600: "#DB2777",
        700: "#BE185D",
        800: "#9D174D",
        900: "#831843",
        950: "#500724",
      },
      rose: {
        50: "#FFF1F2",
        100: "#FFE4E6",
        200: "#FECDD3",
        300: "#FDA4AF",
        400: "#FB7185",
        500: "#F43F5E",
        600: "#E11D48",
        700: "#BE123C",
        800: "#9F1239",
        900: "#881337",
        950: "#4C0519",
      },
      cyan: {
        50: "#ECFEFF",
        100: "#CFFAFE",
        200: "#A5F3FC",
        300: "#67E8F9",
        400: "#22D3EE",
        500: "#06B6D4",
        600: "#0891B2",
        700: "#0E7490",
        800: "#155E75",
        900: "#164E63",
        950: "#083344",
      },
      lime: {
        50: "#F7FEE7",
        100: "#ECFCCB",
        200: "#D9F99D",
        300: "#BEF264",
        400: "#A3E635",
        500: "#84CC16",
        600: "#65A30D",
        700: "#4D7C0F",
        800: "#3F6212",
        900: "#365314",
        950: "#1A2E05",
      },
      amber: {
        50: "#FFFBEB",
        100: "#FEF3C7",
        200: "#FDE68A",
        300: "#FCD34D",
        400: "#FBBF24",
        500: "#F59E0B",
        600: "#D97706",
        700: "#B45309",
        800: "#92400E",
        900: "#78350F",
        950: "#451A03",
      },
      emerald: {
        50: "#ECFDF5",
        100: "#D1FAE5",
        200: "#A7F3D0",
        300: "#6EE7B7",
        400: "#34D399",
        500: "#10B981",
        600: "#059669",
        700: "#047857",
        800: "#065F46",
        900: "#064E3B",
        950: "#022C22",
      },
      teal: {
        50: "#F0FDFA",
        100: "#CCFBF1",
        200: "#99F6E4",
        300: "#5EEAD4",
        400: "#2DD4BF",
        500: "#14B8A6",
        600: "#0D9488",
        700: "#0F766E",
        800: "#115E59",
        900: "#134E4A",
        950: "#042F2E",
      },
      govGreen: {
        50: "#F5FBF5",
        100: "#D8FDB8",
        200: "#ADDFB5",
        300: "#8DD099",
        400: "#5CB871",
        500: "#1CA14C",
        600: "#007932",
        700: "#045526",
        800: "#04411E",
        900: "#003213",
        950: "#01200D",
        DEFAULT: "#007932",
      },
      govRed: {
        50: "#FFF3F1",
        100: "#FFE4DF",
        200: "#FFCEC5",
        300: "#FFAB9C",
        400: "#FF7B64",
        500: "#FF5133",
        600: "#EF4123",
        700: "#C8290D",
        800: "#A5250F",
        900: "#892413",
        950: "#4B0E04",
        DEFAULT: "#EF4123",
      },
      govYellow: {
        50: "#FFFDF7",
        100: "#FFF8E8",
        200: "#FFEFCC",
        300: "#FFE4A6",
        400: "#FFD67D",
        500: "#FFC854",
        600: "#FDB913",
        700: "#E4A10B",
        800: "#B98209",
        900: "#8B6107",
        950: "#483205",
        DEFAULT: "#FDB913",
      },
      govBlue: {
        50: "#F0F6FF",
        100: "#D0E7FF",
        200: "#7DBDFC",
        300: "#389CF8",
        400: "#0E7FE9",
        500: "#0262C7",
        600: "#0352AA",
        700: "#074385",
        800: "#0C396E",
        900: "#082449",
        950: "#081C37",
        DEFAULT: "#0262C7",
      },
      govBlack: {
        50: "#FBF7F8",
        100: "#F0EEEE",
        200: "#DED9DA",
        300: "#C1BBBB",
        400: "#9F9196",
        500: "#847379",
        600: "#6C5D62",
        700: "#584C50",
        800: "#4B4144",
        900: "#302729",
        950: "#231F20",
        DEFAULT: "#231F20",
      },
      neutral: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0A0A0A",
      },
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      primary: {
        50: '#F0F6FF',
        100: '#D0E7FF',
        200: '#7DBDFC',
        300: '#389CF8',
        400: '#0E7FE9',
        500: '#0262C7',
        600: '#0352AA',
        700: '#074385',
        800: '#0C396E',
        900: '#082449',
        950: '#081C37'
      }
    },
    fontFamily: {
      sans: [
        "Figtree, -apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    fontSize: {
      xxs: ["calc(0.625rem * var(--mantine-scale))", "1.65"], // 10px
      xs: ["calc(0.75rem * var(--mantine-scale))", "1.60"], // 12px
      sm: ["calc(0.875rem * var(--mantine-scale))", "1.55"], // 14px
      md: ["calc(1rem * var(--mantine-scale))", "1.2"], // 16px
      lg: ["calc(1.125rem * var(--mantine-scale))", "1.2"], // 18px
      xl: ["calc(1.25rem * var(--mantine-scale))", "1.2"], // 20px
      "2xl": ["calc(1.5rem * var(--mantine-scale))", "1.2"], // 24px
      "3xl": ["calc(2rem * var(--mantine-scale))", "1.2"], // 32px
      "4xl": ["calc(2.25rem * var(--mantine-scale))", "1.2"], // 36px
      "5xl": ["calc(3rem * var(--mantine-scale))", "1.2"], // 48px
      "6xl": ["calc(3.75rem * var(--mantine-scale))", "1.2"], // 60px
      "7xl": ["calc(4.5rem * var(--mantine-scale))", "1.2"], // 72px
      "8xl": ["calc(6rem * var(--mantine-scale))", "1.2"], // 96px
      "9xl": ["calc(8rem * var(--mantine-scale))", "1.2"], // 128px
      base: ["calc(1rem * var(--mantine-scale))", "1.2"],
    },
    screens: {
      xs: "36em",
      sm: "48em",
      md: "62em",
      lg: "75em",
      xl: "88em",
    },
    extend: {
      borderColor: ({ colors }) => ({
        DEFAULT: colors.gray[300],
        secondary: colors.gray[300],
      }),
      colors: ({ colors }) => ({
        background: "white",
        foreground: "#211F20",
        content: {
          emphasis: colors.gray[900],
          DEFAULT: colors.gray[600],
          muted: colors.gray[400],
        },
      }),
      borderRadius: {
        xs: "calc(0.1875rem * var(--mantine-scale))", // 3px
        sm: "calc(0.25rem * var(--mantine-scale))", // 4px
        md: "calc(0.375rem * var(--mantine-scale))", // 6px
        lg: "calc(0.5rem * var(--mantine-scale))", // 8px
        xl: "calc(0.75rem * var(--mantine-scale))", // 12px
        "2xl": "calc(1rem * var(--mantine-scale))", // 16px
        "3xl": "calc(1.25rem * var(--mantine-scale))", // 20px
        "4xl": "calc(1.5rem * var(--mantine-scale))", // 24px,
        full: "9999px",
      },
      spacing: {
        0: "0px", // 0px
        px: "1px", // 1px
        0.5: "calc(0.125rem * var(--mantine-scale))", // 2px
        1: "calc(0.25rem * var(--mantine-scale))", // 4px
        1.5: "calc(0.375rem * var(--mantine-scale))", // 6px
        2: "calc(0.5rem * var(--mantine-scale))", // 8px
        2.5: "calc(0.625rem * var(--mantine-scale))", // 10px
        3: "calc(0.75rem * var(--mantine-scale))", // 12px
        3.5: "calc(0.875rem * var(--mantine-scale))", // 14px
        4: "calc(1rem * var(--mantine-scale))", // 16px
        5: "calc(1.25rem * var(--mantine-scale))", // 20px
        6: "calc(1.5rem * var(--mantine-scale))", // 24px
        7: "calc(1.75rem * var(--mantine-scale))", // 28px
        8: "calc(2rem * var(--mantine-scale))", // 32px
        9: "calc(2.25rem * var(--mantine-scale))", // 36px
        10: "calc(2.5rem * var(--mantine-scale))", // 40px
        11: "calc(2.75rem * var(--mantine-scale))", // 44px
        12: "calc(3rem * var(--mantine-scale))", // 48px
        14: "calc(3.5rem * var(--mantine-scale))", // 56px
        16: "calc(4rem * var(--mantine-scale))", // 64px
        20: "calc(5rem * var(--mantine-scale))", // 80px
        24: "calc(6rem * var(--mantine-scale))", // 96px
        28: "calc(7rem * var(--mantine-scale))", // 112px
        32: "calc(8rem * var(--mantine-scale))", // 128px
        36: "calc(9rem * var(--mantine-scale))", // 144px
        40: "calc(10rem * var(--mantine-scale))", // 160px
        44: "calc(11rem * var(--mantine-scale))", // 176px
        48: "calc(12rem * var(--mantine-scale))", // 192px
        52: "calc(13rem * var(--mantine-scale))", // 208px
        56: "calc(14rem * var(--mantine-scale))", // 224px
        60: "calc(15rem * var(--mantine-scale))", // 240px
        64: "calc(16rem * var(--mantine-scale))", // 256px
        72: "calc(18rem * var(--mantine-scale))", // 288px
        80: "calc(20rem * var(--mantine-scale))", // 320px
        96: "calc(24rem * var(--mantine-scale))", // 384px
        // Mantine-style semantic spacing
        xs: "calc(0.625rem * var(--mantine-scale))", // 10px
        sm: "calc(0.75rem * var(--mantine-scale))", // 12px
        md: "calc(1rem * var(--mantine-scale))", // 16px
        lg: "calc(1.25rem * var(--mantine-scale))", // 20px
        xl: "calc(2rem * var(--mantine-scale))", // 32px
      },
      lineHeight: {
        xs: "1.4",
        sm: "1.45",
        md: "1.55",
        lg: "1.6",
        xl: "1.65",
      },
      boxShadow: {
        0.5: "0px 1.5px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px 1.5px 2px 0px rgba(0, 0, 85, 0.02) inset",
        1: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px -1px rgba(0, 0, 0, 0.05)",
        2: "0px 1px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
        3: "0px 1px 3px 0px rgba(0, 0, 0, 0.05), 0px 2px 1px -1px rgba(0, 0, 0, 0.05)",
        4: "0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)",
        5: "0px 4px 6px -4px rgba(24, 39, 75, 0.12), 0px 8px 8px -4px rgba(24, 39, 75, 0.08)",
        6: "0px 6px 8px -6px rgba(24, 39, 75, 0.12), 0px 8px 16px -6px rgba(24, 39, 75, 0.08)",
        7: "0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)",
        8: "0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.10)",
        9: "0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)",
        10: "0px 8px 22px -6px rgba(24, 39, 75, 0.12), 0px 14px 64px -4px rgba(24, 39, 75, 0.12)",
        11: "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",

        // Input
        // Mantendo algumas sombras originais para compatibilidade
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        light: "0 4px 20px rgba(238, 238, 238, 0.94)",
      },
    },
  },
  plugins: [],
}
export default config
