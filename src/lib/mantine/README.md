# Mantine Theme System

A well-organized, modular theme system for Mantine components that promotes maintainability and developer experience.

## Structure

The theme has been refactored into focused modules for better organization:

```
src/lib/mantine/
├── index.ts              # Main theme export & configuration
├── colors.ts             # Color palette & color configuration
├── typography.ts         # Fonts, headings, sizes, line heights
├── layout.ts             # Spacing, radius, breakpoints
├── shadows.ts            # Shadow definitions
├── components.ts         # Component customizations
├── variant-resolver.ts   # Custom variant color resolver
└── README.md            # This documentation
```

## Usage

### Basic Usage

```tsx
import { MantineProvider } from '@mantine/core'
import { theme } from '@/lib/mantine'

function App() {
  return <MantineProvider theme={theme}>{/* Your app */}</MantineProvider>
}
```

### Working with Individual Modules

You can import and use individual modules when needed:

```tsx
import { colors, fontSizes } from '@/lib/mantine'
import { spacing, radius } from '@/lib/mantine/layout'

// Use in custom components
const customStyles = {
  padding: spacing.md,
  borderRadius: radius.lg,
  backgroundColor: colors.primary[6],
  fontSize: fontSizes.sm
}
```

## Module Details

### Colors (`colors.ts`)

- **Purpose**: Centralized color palette management
- **Includes**: All color scales, primary color configuration
- **Features**: Semantic color naming, government brand colors

### Typography (`typography.ts`)

- **Purpose**: Font and text styling configuration
- **Includes**: Font families, heading styles, font sizes, line heights
- **Features**: Responsive typography with CSS custom properties

### Layout (`layout.ts`)

- **Purpose**: Spatial relationships and responsive design
- **Includes**: Spacing scale, border radius, breakpoints
- **Features**: Consistent spacing system, mobile-first breakpoints

### Shadows (`shadows.ts`)

- **Purpose**: Depth and elevation system
- **Includes**: Progressive shadow scale from subtle to prominent
- **Features**: Modern shadow definitions with alpha transparency

### Components (`components.ts`)

- **Purpose**: Component-specific customizations
- **Includes**: Styled extensions for Mantine components
- **Features**: Consistent component styling, size variants

### Variant Resolver (`variant-resolver.ts`)

- **Purpose**: Custom button variant logic
- **Includes**: Secondary and ghost button variants
- **Features**: Extends Mantine's default variant system

## Benefits of This Structure

### 🎯 **Focused Responsibility**

Each file has a single, clear purpose making it easy to locate and modify specific aspects of the theme.

### 🔧 **Better Maintainability**

Changes to colors, typography, or components are isolated to their respective files.

### 👥 **Team Collaboration**

Multiple developers can work on different aspects of the theme without conflicts.

### 📖 **Improved Understanding**

Clear module boundaries make it easier for new team members to understand the design system.

### 🚀 **Performance**

Tree-shaking works better with modular exports, potentially reducing bundle size.

### 🧪 **Testing**

Individual modules can be tested in isolation.

## Extending the Theme

### Adding New Colors

```tsx
// colors.ts
export const colors = {
  // ... existing colors
  customBrand: [
    '#f0f9ff',
    '#e0f2fe'
    // ... rest of color scale
  ]
}
```

### Adding New Components

```tsx
// components.ts
import { NewComponent } from '@mantine/core'

export const components = {
  // ... existing components
  NewComponent: NewComponent.extend({
    classNames: {
      root: 'custom-styles'
    }
  })
}
```

### Customizing Typography

```tsx
// typography.ts
export const fontSizes = {
  // ... existing sizes
  '10xl': 'calc(10rem * var(--mantine-scale))'
}
```

## Migration Guide

If you're migrating from the monolithic `theme.ts` file:

1. Update imports from `@/lib/mantine/theme` to `@/lib/mantine`
2. The theme object structure remains the same - no breaking changes
3. Individual modules are available for granular imports if needed

## Best Practices

- **Import granularly**: Only import what you need from individual modules
- **Maintain consistency**: Follow the established patterns when extending
- **Document changes**: Update this README when adding new modules or significant changes
- **Use semantic naming**: Follow the existing color and spacing naming conventions
