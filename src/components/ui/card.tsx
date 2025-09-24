import React from "react"
import { Badge } from "@mantine/core"
import { cn } from "@/utils"
import { TrendingDown, TrendingUp } from "lucide-react"

// Base Card Root component
interface CardRootProps {
  children: React.ReactNode
  className?: string
}

function CardRoot({
  children,
  className,
  ...props
}: CardRootProps & React.HTMLAttributes<HTMLDivElement>) {
  const baseStyles =
    "bg-white rounded-xl p-4 overflow-hidden border flex-1 shadow-1"

  return (
    <div className={cn(baseStyles, className)} {...props}>
      {children}
    </div>
  )
}

// Card Header
interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
}

function CardHeader({
  children,
  className,
  orientation = "horizontal",
}: CardHeaderProps) {
  if (orientation === "vertical") {
    return (
      <div className={cn("mb-2 flex flex-col gap-1", className)}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn("mb-2 flex items-center justify-between gap-2", className)}
    >
      {children}
    </div>
  )
}

// Card Title
interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn("text-xs font-semibold", className)}>{children}</h3>
}

// Card Value Display
interface CardValueProps {
  children: React.ReactNode
  /** Unit that appears before the value */
  prefix?: string
  /** Unit that appears after the value */
  suffix?: string
  className?: string
}

function CardValue({ children, prefix, suffix, className }: CardValueProps) {
  return (
    <div
      className={cn("text-2xl font-semibold text-content-emphasis", className)}
    >
      {prefix && <span className="text-content-muted">{prefix}</span>}
      {children}
      {suffix && <span className="text-content-muted">{suffix}</span>}
    </div>
  )
}

// Card Description
interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-xs text-content-muted", className)}>{children}</p>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("flex flex-1 items-end gap-2", className)}>
      {children}
    </div>
  )
}

// Card Footer for actions, additional info
interface CardFooterProps {
  children: React.ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
}

function CardFooter({
  children,
  className,
  orientation = "horizontal",
}: CardFooterProps) {
  if (orientation === "vertical") {
    return (
      <div className={cn("mt-2", className)}>
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    )
  }

  return (
    <div className={cn("mt-2", className)}>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}

// Card Icon container
interface CardIconProps {
  children: React.ReactNode
  className?: string
}

function CardIcon({ children, className }: CardIconProps) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100",
        className,
      )}
    >
      {children}
    </div>
  )
}

// Card Chart container
interface CardChartProps {
  children: React.ReactNode
  className?: string
  height?: number
}

function CardChart({ children, className, height = 200 }: CardChartProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)} style={{ height }}>
      {children}
    </div>
  )
}

// Card Trend component that auto-determines styling
interface CardTrendProps {
  value: number
}

function CardTrend({ value }: CardTrendProps) {
  const isPositive = value >= 0
  const isNegative = value < 0

  return (
    <Badge variant="light" color={isPositive ? "green" : "red"} radius="sm">
      <span className="flex items-center gap-1">
        {isPositive && <TrendingUp className="size-3" />}
        {isNegative && <TrendingDown className="size-3" />}
        {Math.abs(value)}
      </span>
    </Badge>
  )
}

// Card List container for organizing cards horizontally
interface CardListProps {
  children: React.ReactNode
  className?: string
}

function CardList({ children, className }: CardListProps) {
  return <div className={cn("flex w-full gap-4", className)}>{children}</div>
}

// Main Card export with composition pattern
export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Value: CardValue,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  Icon: CardIcon,
  Chart: CardChart,
  Trend: CardTrend,
  List: CardList,
}

// Type exports for easier usage
export type {
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardValueProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardIconProps,
  CardChartProps,
  CardTrendProps,
  CardListProps,
}
