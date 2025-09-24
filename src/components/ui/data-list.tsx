"use client"

import { cn } from "@/utils"

import { HTMLAttributes, ReactNode, createContext, useContext } from "react"

interface DataListContextType {
  orientation: "vertical" | "horizontal"
  minWidth?: string
  maxWidth?: string
}

const DataListContext = createContext<DataListContextType | undefined>(
  undefined,
)

const spacingMap = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-5",
  xl: "gap-6",
} as const

type SpacingSize = keyof typeof spacingMap

interface DataListRootProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  orientation?: "vertical" | "horizontal"
  spacing?: SpacingSize
  minWidth?: string
  maxWidth?: string
}

interface DataListItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface DataListLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

interface DataListValueProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

function DataList({
  children,
  className,
  orientation = "vertical",
  spacing = "md",
  minWidth,
  maxWidth,
  ...props
}: DataListRootProps) {
  const spacingValue = spacingMap[spacing]

  return (
    <DataListContext.Provider value={{ orientation, minWidth, maxWidth }}>
      <dl
        className={cn(
          "overflow-wrap-anywhere flex flex-col",
          spacingValue,
          className,
        )}
        {...props}
      >
        {children}
      </dl>
    </DataListContext.Provider>
  )
}

export function DataListItem({
  children,
  className,
  ...props
}: DataListItemProps) {
  const context = useContext(DataListContext)
  const orientation = context?.orientation ?? "horizontal"

  const gridTemplateColumns =
    context?.minWidth && context?.maxWidth
      ? `minmax(${context.minWidth}, ${context.maxWidth}) 2fr`
      : context?.minWidth
        ? `minmax(${context.minWidth}, 1fr) 2fr`
        : context?.maxWidth
          ? `minmax(0, ${context.maxWidth}) 2fr`
          : "1fr 2fr"

  const style =
    orientation === "horizontal" ? { gridTemplateColumns } : undefined

  return (
    <div
      className={cn(
        orientation === "vertical"
          ? "flex flex-col gap-1"
          : "grid items-baseline",

        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

export function DataListLabel({
  children,
  className,
  ...props
}: DataListLabelProps) {
  return (
    <span
      className={cn("text-sm font-medium text-content-emphasis", className)}
      {...props}
    >
      {children}
    </span>
  )
}

export function DataListValue({
  children,
  className,
  ...props
}: DataListValueProps) {
  return (
    <span className={cn("min-w-0 text-sm", className)} {...props}>
      {children}
    </span>
  )
}

DataList.Item = DataListItem
DataList.Label = DataListLabel
DataList.Value = DataListValue

export { DataList }
