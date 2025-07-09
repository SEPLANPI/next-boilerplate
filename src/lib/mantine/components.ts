import {
  Button,
  Checkbox,
  Input,
  Table,
  Badge,
  Drawer,
  Menu,
  ScrollArea,
  InputWrapper,
  Pagination,
  PaginationProps,
  MantineThemeOverride,
  Modal,
  Popover,
  InputProps,
  InputWrapperProps,
  Select,
  SelectProps
} from '@mantine/core'
import { cn } from '../utils'

/**
 * Component customizations for the Mantine theme
 * Each component extension includes styling overrides and default props
 */

export const components: MantineThemeOverride['components'] = {
  Popover: Popover.extend({
    classNames: {
      dropdown: 'rounded-xl shadow-5'
    }
  }),

  Modal: Modal.extend({
    classNames: {
      content: 'rounded-xl',
      header: '',
      title: 'font-semibold text-content-emphasis'
    }
  }),

  Badge: Badge.extend({
    classNames: (theme, props) => {
      const defaultStyles = {
        root: 'capitalize font-semibold tracking-wide '
      }

      if ((props.size === 'sm' || !props.size) && !props.circle) {
        return {
          root: defaultStyles.root + 'py-0.5 px-1.5 text-xs'
        }
      }
      return defaultStyles
    }
  }),

  Button: Button.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      // default size: sm
      const styles = {
        root: 'h-8 px-3 text-sm'
      }

      // sizess
      if (props.size === 'xs') {
        styles.root = cn(styles.root, 'h-6 px-2 text-xs')
      }
      if (props.size === 'md') {
        styles.root = cn(styles.root, 'h-9 text-sm')
      }

      if (props.size === 'lg') {
        styles.root = cn(styles.root, 'h-[42px] text-sm ')
      }

      if (props.variant === 'default') {
        styles.root = cn(styles.root, 'shadow-3')
      }

      // variants
      if (props.variant === 'ghost') {
        styles.root = cn(
          styles.root,
          'bg-transparent text-content-default hover:bg-gray-100'
        )
      }

      if (props.variant === 'default' && props.selected) {
        styles.root = cn(styles.root, 'bg-gray-100')
      }

      return styles
    }
  }),

  InputWrapper: InputWrapper.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      const styles: InputWrapperProps['classNames'] = {
        label: 'w-full text-xs font-medium text-content-emphasis',
        error: 'text-xs'
      }

      return styles
    }
  }),

  Input: Input.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      const styles: InputProps['classNames'] = {
        wrapper: '',
        input:
          'transition leading-none text-sm focus:border-primary-600 focus:ring focus:ring-primary-500/25 border-gray-200 placeholder:text-content-muted'
      }

      // @ts-expect-error - component is not typed
      if (props.component === 'textarea') {
        return styles
      }

      if (props.size === 'xs') {
        styles.wrapper = cn(styles.wrapper, 'h-6 min-h-6')
        styles.input = cn(styles.input, ' text-xs')
      }

      if (props.size === 'sm' || !props.size) {
        styles.wrapper = cn(styles.wrapper, 'h-8 min-h-8')
        styles.input = cn(styles.input, 'h-8 min-h-8')
      }

      if (props.size === 'md') {
        styles.wrapper = cn(styles.wrapper, 'h-[38px] min-h-[38px]')
        styles.input = cn(styles.input, 'h-[38px] min-h-[38px]')
      }

      return styles
    }
  }),
  Select: Select.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      const styles: SelectProps['classNames'] = {
        option: 'text-sm'
      }

      return styles
    }
  }),

  Pagination: Pagination.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      // default size: sm
      const styles: PaginationProps['classNames'] = {
        control: 'size-6 border-gray-200 shadow-3 leading-6'
      }

      return styles
    }
  }),

  Table: Table.extend({
    defaultProps: {
      horizontalSpacing: 'm3',
      verticalSpacing: 'm2'
    },
    vars: (theme) => ({
      table: {
        '--table-border-color': theme.colors.gray[2]
      }
    }),
    classNames: {
      thead: 'bg-gray-100  [&>tr]:border-0',
      th: 'text-xs  text-content-emphasis font-semibold last:rounded-r-md first:rounded-l-md'
    }
  }),

  Checkbox: Checkbox.extend({
    classNames: {
      input: 'rounded-xs'
    }
  }),

  Drawer: Drawer.extend({
    classNames: {
      title: 'font-semibold text-content-emphasis text-lg'
    }
  }),

  Menu: Menu.extend({
    classNames: {
      dropdown: 'shadow-5 rounded-xl p-2',
      item: 'text-sm font-semibold h-8 py-0 px-3'
    }
  }),

  ScrollArea: ScrollArea.extend({
    defaultProps: {
      scrollbarSize: 10
    },
    classNames: {
      thumb: 'bg-gray-400 rounded-full',
      scrollbar: 'bg-gray-200 rounded-full'
    }
  })
}
