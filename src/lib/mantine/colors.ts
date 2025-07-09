/**
 * Color palette definitions for the Mantine theme
 * Organized by color families with semantic naming
 */

import { MantineThemeOverride } from '@mantine/core'

export const colors: MantineThemeOverride['colors'] = {
  // Match Tailwind gray (zinc) - Neutral colors
  gray: [
    '#FAFAFA', // 50
    '#F4F4F5', // 100
    '#E4E4E7', // 200
    '#D4D4D8', // 300
    '#A1A1AA', // 400
    '#71717A', // 500
    '#52525B', // 600
    '#3F3F46', // 700
    '#27272A', // 800
    '#18181B' // 900
  ],

  primary: [
    '#F5FBF5', // 50
    '#D8FDB8', // 100
    '#ADDFB5', // 200
    '#8DD099', // 300
    '#5CB871', // 400
    '#1CA14C', // 500
    '#007932', // 600 (DEFAULT)
    '#045526', // 700
    '#04411E', // 800
    '#003213' // 900
  ],

  // Match Tailwind stone
  stone: [
    '#FAFAF9', // 50
    '#F5F5F4', // 100
    '#E7E5E4', // 200
    '#D6D3D1', // 300
    '#A8A29E', // 400
    '#78716C', // 500
    '#57534E', // 600
    '#44403C', // 700
    '#292524', // 800
    '#1C1917' // 900
  ],

  // Match Tailwind red
  red: [
    '#FEF2F2', // 50
    '#FEE2E2', // 100
    '#FECACA', // 200
    '#FCA5A5', // 300
    '#F87171', // 400
    '#EF4444', // 500
    '#DC2626', // 600
    '#B91C1C', // 700
    '#991B1B', // 800
    '#7F1D1D' // 900
  ],

  // Match Tailwind pink
  pink: [
    '#FDF2F8', // 50
    '#FCE7F3', // 100
    '#FBCFE8', // 200
    '#F9A8D4', // 300
    '#F472B6', // 400
    '#EC4899', // 500
    '#DB2777', // 600
    '#BE185D', // 700
    '#9D174D', // 800
    '#831843' // 900
  ],

  // Match Tailwind purple
  purple: [
    '#FAF5FF', // 50
    '#F3E8FF', // 100
    '#E9D5FF', // 200
    '#D8B4FE', // 300
    '#C084FC', // 400
    '#A855F7', // 500
    '#9333EA', // 600
    '#7E22CE', // 700
    '#6D21A8', // 800
    '#581C87' // 900
  ],

  // Match Tailwind violet
  violet: [
    '#F5F3FF', // 50
    '#EDE9FE', // 100
    '#DDD6FE', // 200
    '#C4B5FD', // 300
    '#A78BFA', // 400
    '#8B5CF6', // 500
    '#7C3AED', // 600
    '#6D28D9', // 700
    '#5B21B6', // 800
    '#4C1D95' // 900
  ],

  // Match Tailwind indigo
  indigo: [
    '#EEF2FF', // 50
    '#E0E7FF', // 100
    '#C7D2FE', // 200
    '#A5B4FC', // 300
    '#818CF8', // 400
    '#6366F1', // 500
    '#4F46E5', // 600
    '#4338CA', // 700
    '#3730A3', // 800
    '#312E81' // 900
  ],

  // Match Tailwind blue
  blue: [
    '#EFF6FF', // 50
    '#DBEAFE', // 100
    '#BFDBFE', // 200
    '#93C5FD', // 300
    '#60A5FA', // 400
    '#3B82F6', // 500
    '#2563EB', // 600
    '#1D4ED8', // 700
    '#1E40AF', // 800
    '#1E3A8A' // 900
  ],

  // Match Tailwind cyan
  cyan: [
    '#ECFEFF', // 50
    '#CFFAFE', // 100
    '#A5F3FC', // 200
    '#67E8F9', // 300
    '#22D3EE', // 400
    '#06B6D4', // 500
    '#0891B2', // 600
    '#0E7490', // 700
    '#155E75', // 800
    '#164E63' // 900
  ],

  // Match Tailwind teal
  teal: [
    '#F0FDFA', // 50
    '#CCFBF1', // 100
    '#99F6E4', // 200
    '#5EEAD4', // 300
    '#2DD4BF', // 400
    '#14B8A6', // 500
    '#0D9488', // 600
    '#0F766E', // 700
    '#115E59', // 800
    '#134E4A' // 900
  ],

  // Match Tailwind emerald
  emerald: [
    '#ECFDF5', // 50
    '#D1FAE5', // 100
    '#A7F3D0', // 200
    '#6EE7B7', // 300
    '#34D399', // 400
    '#10B981', // 500
    '#059669', // 600
    '#047857', // 700
    '#065F46', // 800
    '#064E3B' // 900
  ],

  // Match Tailwind green
  green: [
    '#F0FDF4', // 50
    '#DCFCE7', // 100
    '#BBF7D0', // 200
    '#86EFAC', // 300
    '#4ADE80', // 400
    '#22C55E', // 500
    '#16A34A', // 600
    '#15803D', // 700
    '#166534', // 800
    '#14532D' // 900
  ],

  // Match Tailwind lime
  lime: [
    '#F7FEE7', // 50
    '#ECFCCB', // 100
    '#D9F99D', // 200
    '#BEF264', // 300
    '#A3E635', // 400
    '#84CC16', // 500
    '#65A30D', // 600
    '#4D7C0F', // 700
    '#3F6212', // 800
    '#365314' // 900
  ],

  // Match Tailwind yellow
  yellow: [
    '#FEFCE8', // 50
    '#FEF9C3', // 100
    '#FEF08A', // 200
    '#FDE047', // 300
    '#FACC15', // 400
    '#EAB308', // 500
    '#CA8A04', // 600
    '#A16207', // 700
    '#854D0E', // 800
    '#713F12' // 900
  ],

  // Match Tailwind amber
  amber: [
    '#FFFBEB', // 50
    '#FEF3C7', // 100
    '#FDE68A', // 200
    '#FCD34D', // 300
    '#FBBF24', // 400
    '#F59E0B', // 500
    '#D97706', // 600
    '#B45309', // 700
    '#92400E', // 800
    '#78350F' // 900
  ],

  // Match Tailwind orange
  orange: [
    '#FFF7ED', // 50
    '#FFEDD5', // 100
    '#FED7AA', // 200
    '#FDBA74', // 300
    '#FB923C', // 400
    '#F97316', // 500
    '#EA580C', // 600
    '#C2410C', // 700
    '#9A3412', // 800
    '#7C2D12' // 900
  ],

  // Match Tailwind sky
  sky: [
    '#F0F9FF', // 50
    '#E0F2FE', // 100
    '#BAE6FD', // 200
    '#7DD3FC', // 300
    '#38BDF8', // 400
    '#0EA5E9', // 500
    '#0284C7', // 600
    '#0369A1', // 700
    '#075985', // 800
    '#0C4A6E' // 900
  ],

  // Match Tailwind fuchsia
  fuchsia: [
    '#FDF4FF', // 50
    '#FAE8FF', // 100
    '#F5D0FE', // 200
    '#F0ABFC', // 300
    '#E879F9', // 400
    '#D946EF', // 500
    '#C026D3', // 600
    '#A21CAF', // 700
    '#86198F', // 800
    '#701A75' // 900
  ],

  // Match Tailwind rose
  rose: [
    '#FFF1F2', // 50
    '#FFE4E6', // 100
    '#FECDD3', // 200
    '#FDA4AF', // 300
    '#FB7185', // 400
    '#F43F5E', // 500
    '#E11D48', // 600
    '#BE123C', // 700
    '#9F1239', // 800
    '#881337' // 900
  ],

  // Match Tailwind neutral
  neutral: [
    '#FAFAFA', // 50
    '#F5F5F5', // 100
    '#E5E5E5', // 200
    '#D4D4D4', // 300
    '#A3A3A3', // 400
    '#737373', // 500
    '#525252', // 600
    '#404040', // 700
    '#262626', // 800
    '#171717' // 900
  ],

  // Government colors from Tailwind
  govGreen: [
    '#F5FBF5', // 50
    '#D8FDB8', // 100
    '#ADDFB5', // 200
    '#8DD099', // 300
    '#5CB871', // 400
    '#1CA14C', // 500
    '#007932', // 600 (DEFAULT)
    '#045526', // 700
    '#04411E', // 800
    '#003213' // 900
  ],

  govRed: [
    '#FFF3F1', // 50
    '#FFE4DF', // 100
    '#FFCEC5', // 200
    '#FFAB9C', // 300
    '#FF7B64', // 400
    '#FF5133', // 500
    '#EF4123', // 600 (DEFAULT)
    '#C8290D', // 700
    '#A5250F', // 800
    '#892413' // 900
  ],

  govYellow: [
    '#FFFDF7', // 50
    '#FFF8E8', // 100
    '#FFEFCC', // 200
    '#FFE4A6', // 300
    '#FFD67D', // 400
    '#FFC854', // 500
    '#FDB913', // 600 (DEFAULT)
    '#E4A10B', // 700
    '#B98209', // 800
    '#8B6107' // 900
  ],

  govBlue: [
    '#F0F6FF', // 50
    '#D0E7FF', // 100
    '#7DBDFC', // 200
    '#389CF8', // 300
    '#0E7FE9', // 400
    '#0262C7', // 500 (DEFAULT)
    '#0352AA', // 600
    '#074385', // 700
    '#0C396E', // 800
    '#082449' // 900
  ],

  govBlack: [
    '#FBF7F8', // 50
    '#F0EEEE', // 100
    '#DED9DA', // 200
    '#C1BBBB', // 300
    '#9F9196', // 400
    '#847379', // 500
    '#6C5D62', // 600
    '#584C50', // 700
    '#4B4144', // 800
    '#231F20' // 900 (DEFAULT)
  ]
}
