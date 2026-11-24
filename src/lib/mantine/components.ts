import { cn } from "@/utils"
import {
  Badge,
  rem,
  Button,
  Checkbox,
  Drawer,
  Input,
  InputProps,
  InputWrapper,
  InputWrapperProps,
  MantineThemeOverride,
  Menu,
  Modal,
  Pagination,
  Container,
  PaginationProps,
  Popover,
  ScrollArea,
  Select,
  SelectProps,
  Table,
  Tabs,
  TabsProps,
} from "@mantine/core"

const CONTAINER_SIZES: Record<string, number> = {
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1120,
  xxl: 1320
}

export const components: MantineThemeOverride["components"] = {
  Popover: Popover.extend({
    classNames: {
      dropdown: "rounded-xl shadow-5",
    },
  }),

  Modal: Modal.extend({
    defaultProps: {
      scrollAreaComponent: ScrollArea.Autosize,
    },
    classNames: {
      content: "rounded-xl",
      header: "p-4",
      title: "font-semibold text-content-emphasis",
      close:
        "border border-solid border-gray-300  rounded-full shadow-3 size-8 p-1 ",
    },
  }),

  Badge: Badge.extend({
    classNames: (theme, props) => {
      const defaultStyles = {
        root: "capitalize font-semibold tracking-wide ",
      }

      if ((props.size === "sm" || !props.size) && !props.circle) {
        return {
          root: defaultStyles.root + "py-0.5 px-1.5 text-xs",
        }
      }
      return defaultStyles
    },
  }),

  Button: Button.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      // default size: sm
      const styles = {
        root: "h-8 px-3 text-sm",
      }

      // sizess
      if (props.size === "xs") {
        styles.root = cn(styles.root, "h-6 px-2 rounded-sm text-xs")
      }
      if (props.size === "md") {
        styles.root = cn(styles.root, "h-9 text-sm")
      }

      if (props.size === "lg") {
        styles.root = cn(styles.root, "h-[42px] text-sm ")
      }

      if (props.variant === "default") {
        styles.root = cn(styles.root, "shadow-3")
      }

      // variants
      if (props.variant === "ghost") {
        styles.root = cn(
          styles.root,
          "bg-transparent text-content-default hover:bg-gray-100",
        )
      }

      if (props.variant === "default" && props.selected) {
        styles.root = cn(styles.root, "bg-gray-100")
      }

      return styles
    },
  }),

  InputWrapper: InputWrapper.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      const styles: InputWrapperProps["classNames"] = {
        label: "w-full text-sm font-medium text-content-emphasis",
        error: "text-xs",
      }

      return styles
    },
  }),

  Input: Input.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      const styles: InputProps["classNames"] = {
        wrapper: "",
        input:
          "transition text-sm focus:border-primary-600 focus:ring focus:ring-primary-500/25 border-gray-200 placeholder:text-content-muted",
      }
      if (props.__staticSelector === "Textarea") {
        return styles
      }

      if (props.size === "xs") {
        styles.wrapper = cn(styles.wrapper, "h-6 min-h-6")
        styles.input = cn(styles.input, " text-xs leading-6")
      }

      if (props.size === "sm" || !props.size) {
        styles.wrapper = cn(styles.wrapper, "h-8 min-h-8")
        styles.input = cn(styles.input, "h-8 min-h-8 leading-8")
      }

      if (props.size === "md") {
        styles.wrapper = cn(styles.wrapper, "h-[38px] min-h-[38px]")
        styles.input = cn(styles.input, "h-[38px] min-h-[38px] leading-[38px]")
      }

      return styles
    },
  }),
  Select: Select.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      const styles: SelectProps["classNames"] = {
        option: "text-sm",
      }

      return styles
    },
  }),

  Pagination: Pagination.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      // default size: sm
      const styles: PaginationProps["classNames"] = {
        control: "size-6 border-gray-200 shadow-3 leading-6",
      }

      return styles
    },
  }),

  Table: Table.extend({
    defaultProps: {
      horizontalSpacing: "m3",
      verticalSpacing: "m2",
    },
    vars: (theme) => ({
      table: {
        "--table-border-color": theme.colors.gray[2],
      },
    }),
    classNames: {
      thead: "bg-gray-100  [&>tr]:border-0",
      th: "text-xs  text-content-emphasis font-semibold last:rounded-r-md first:rounded-l-md",
    },
  }),

  Tabs: Tabs.extend({
    classNames: (theme, props) => {
      if (props.unstyled) return {}

      const styles: TabsProps["classNames"] = {
        list: "flex h-full before:hidden border-b",
        tab: "flex  items-center h-full font-medium px-3 hover:border-transparent text-sm data-[active=true]:font-semibold data-[active=true]:text-primary-600  data-[active=true]:border-b-2  data-[active=true]:border-primary-600",
        tabLabel: "leading-[20px]",
        tabSection: "data-[position=left]:mr-2 data-[position=right]:ml-2",
      }

      return styles
    },
  }),

  Checkbox: Checkbox.extend({
    classNames: {
      input: "rounded-xs",
    },
  }),

  Drawer: Drawer.extend({
    classNames: {
      header: "p-4",
      title: "font-semibold text-content-emphasis",
      close:
        "border border-solid border-gray-300  rounded-full shadow-3 size-8 p-1 ",
    },
  }),

  Menu: Menu.extend({
    classNames: {
      dropdown: "shadow-5 rounded-xl p-2",
      item: "text-sm font-semibold h-8 py-0 px-3",
    },
  }),

  ScrollArea: ScrollArea.extend({
    defaultProps: {
      scrollbarSize: 6,
    },
    classNames: {
      thumb: "bg-gray-400 rounded-full",
      scrollbar: "bg-gray-200 rounded-full",
    },
  }),
  Container: Container.extend({
    defaultProps: {
      size: 'xl'
    },
    classNames: {
      root: 'px-5 sm:px-8'
    },
    vars: (_, { size, fluid }) => ({
      root: {
        '--container-size': fluid
          ? '100%'
          : typeof size === 'number'
            ? rem(size)
            : rem(
                CONTAINER_SIZES[
                  (typeof size === 'string' && size in CONTAINER_SIZES
                    ? size
                    : 'xl') as keyof typeof CONTAINER_SIZES
                ]
              )
      }
    })
  })
}
