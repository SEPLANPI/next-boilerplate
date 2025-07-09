# Dashboard Layout Architecture

A developer-friendly, composable page header system optimized for excellent DX (Developer Experience).

## 🏗️ Project Structure

```
dashboard-layout/
├── components/
│   ├── page-header/           # Modern components (recommended)
│   │   ├── page-header.tsx    # Core building blocks
│   │   ├── header-patterns.tsx # Convenience components
│   │   └── index.ts
│   └── legacy/                # Legacy components (deprecated)
│       ├── header.tsx         # Old DashboardHeader
│       ├── toolbar.tsx        # Old DashboardToolbar
│       └── index.ts
├── layout.tsx                 # Main dashboard layout
├── content.tsx                # Dashboard content wrapper
├── main-nav.tsx              # Navigation sidebar
├── nav-item.tsx              # Navigation items
├── user-menu.tsx             # User menu component
├── event-select.tsx          # Event selector
├── index.ts                  # Main exports
└── README.md                 # This file
```

## 🚀 Quick Start

### Import the Components
```tsx
import { 
  PageHeader, 
  BreadcrumbRow, 
  SearchRow, 
  TabsRow 
} from '@/components/layouts/dashboard-layout'
```

### Basic Usage
```tsx
// Simple breadcrumbs
<PageHeader>
  <BreadcrumbRow breadcrumbs={breadcrumbs} />
</PageHeader>

// With actions
<PageHeader>
  <BreadcrumbRow 
    breadcrumbs={breadcrumbs}
    actions={<Button>Add User</Button>}
  />
</PageHeader>

// Multiple rows
<PageHeader>
  <BreadcrumbRow breadcrumbs={breadcrumbs} />
  <SearchRow 
    placeholder="Search..."
    filters={<FiltersButton />}
    actions={<Button>Export</Button>}
  />
</PageHeader>
```

## 📦 Component API

### Modern Components (Recommended)

#### Core Building Blocks
- **`PageHeader`** - Main container for all header content
- **`HeaderRow`** - Individual horizontal row with consistent layout
- **`HeaderContent`** - Left-aligned content area with automatic spacing
- **`HeaderActions`** - Right-aligned actions area with automatic spacing

#### Convenience Components
- **`BreadcrumbRow`** - Pre-configured breadcrumbs + optional actions
- **`SearchRow`** - Pre-configured search + filters + optional actions  
- **`TabsRow`** - Pre-configured navigation tabs + optional actions

### Legacy Components (Deprecated)
- **`DashboardHeader`** - ⚠️ Use `BreadcrumbRow` instead
- **`DashboardToolbar`** - ⚠️ Use `HeaderRow` instead
- **`DashboardToolbarActions`** - ⚠️ Use `HeaderActions` instead

## 🔄 Migration Guide

### From DashboardHeader
```tsx
// ❌ Old (deprecated)
<DashboardHeader breadcrumbs={items}>
  <Button>Action</Button>
</DashboardHeader>

// ✅ New (recommended)
<PageHeader>
  <BreadcrumbRow breadcrumbs={items} actions={<Button>Action</Button>} />
</PageHeader>
```

### From DashboardToolbar
```tsx
// ❌ Old (deprecated)
<DashboardToolbar>
  <SearchInput />
  <DashboardToolbarActions>
    <Button>Action</Button>
  </DashboardToolbarActions>
</DashboardToolbar>

// ✅ New (recommended)
<PageHeader>
  <SearchRow actions={<Button>Action</Button>} />
</PageHeader>
```

### Complex Migration
```tsx
// ❌ Old (verbose)
<DashboardHeader breadcrumbs={breadcrumbs}>
  <Button>Export</Button>
</DashboardHeader>
<DashboardToolbar>
  <SearchInput placeholder="Search..." />
  <FiltersButton onClick={openFilters} />
  <DashboardToolbarActions>
    <Button>Add User</Button>
  </DashboardToolbarActions>
</DashboardToolbar>

// ✅ New (concise)
<PageHeader>
  <BreadcrumbRow 
    breadcrumbs={breadcrumbs}
    actions={<Button>Export</Button>}
  />
  <SearchRow 
    placeholder="Search..."
    filters={<FiltersButton onClick={openFilters} />}
    actions={<Button>Add User</Button>}
  />
</PageHeader>
```

## 🎯 Design Philosophy

### 1. **Progressive Disclosure**
- **Level 1**: Use convenience components (`BreadcrumbRow`, `SearchRow`)
- **Level 2**: Compose with building blocks (`HeaderRow` + `HeaderContent`)
- **Level 3**: Full customization with className overrides

### 2. **Intuitive Naming**
- `PageHeader` - clearly the main header
- `HeaderRow` - obviously a row in the header
- `BreadcrumbRow` - a row with breadcrumbs
- No confusing prefixes or implementation details

### 3. **Minimal Boilerplate**
Common patterns require minimal code while maintaining full flexibility.

### 4. **Consistent Behavior**
- All rows have identical spacing and alignment
- All content areas handle child spacing automatically
- All action areas align to the right consistently

## 🛠️ Advanced Usage

### Custom Composition
When convenience components aren't enough:

```tsx
<PageHeader>
  <HeaderRow>
    <HeaderContent>
      <Breadcrumbs items={breadcrumbs} />
    </HeaderContent>
    <HeaderActions>
      <Button>Export</Button>
    </HeaderActions>
  </HeaderRow>
  
  <HeaderRow>
    <HeaderContent>
      <SearchInput />
      <CustomFilter />
      <StatusIndicator />
    </HeaderContent>
    <HeaderActions>
      <CustomActionButton />
    </HeaderActions>
  </HeaderRow>
</PageHeader>
```

## 📋 Best Practices

1. **Start Simple** - Use convenience components first
2. **Consistent Actions** - Keep action buttons concise across pages
3. **Logical Grouping** - Group related content in the same `HeaderContent`
4. **Responsive Design** - Keep action counts reasonable for mobile

## 🔧 Component Reference

### `BreadcrumbRow`
```tsx
interface BreadcrumbRowProps {
  breadcrumbs: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
}
```

### `SearchRow`
```tsx
interface SearchRowProps {
  placeholder?: string
  searchClassName?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}
```

### `TabsRow`
```tsx
interface TabsRowProps {
  tabs: TabItem[]
  basePath: string
  defaultValue: string
  actions?: React.ReactNode
  className?: string
}
```

## 🚨 Breaking Changes

### v2.0.0 (Current)
- Moved components to organized folder structure
- Deprecated `DashboardHeader`, `DashboardToolbar` components
- Introduced convenience components for better DX

### Migration Timeline
- **Phase 1**: New components available alongside legacy (current)
- **Phase 2**: Legacy components marked as deprecated (next release)
- **Phase 3**: Legacy components removed (future major version) 