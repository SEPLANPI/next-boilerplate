import { cn } from "@/utils/formatting/format-process"
import { PropsWithChildren } from "react"

type PanelProps = PropsWithChildren<{
  variant?: "white" | "gray"
}>

function Panel({ children, variant = "gray" }: PanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border p-4",
        variant === "gray" ? "bg-gray-50" : "bg-white",
      )}
    >
      {children}
    </div>
  )
}

function PanelHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-between items-center gap-4 mb-3">
      {children}
    </div>
  )
}

function PanelTitle({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 font-semibold text-sm text-content-emphasis">
      {children}
    </div>
  )
}

function PanelActions({ children }: PropsWithChildren) {
  return <div className="flex ml-auto gap-2">{children}</div>
}

function PanelContent({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>
}

Panel.Header = PanelHeader
Panel.Title = PanelTitle
Panel.Actions = PanelActions
Panel.Content = PanelContent

export { Panel }
