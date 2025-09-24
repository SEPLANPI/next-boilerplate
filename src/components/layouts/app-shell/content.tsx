import { cn } from "@/utils"
import { ScrollArea } from "@mantine/core"
import { PropsWithChildren } from "react"

export function DashboardContent({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "flex max-h-[100dvh] flex-1 bg-gray-100 py-3 pr-3",
        className,
      )}
    >
      <ScrollArea className="flex-1 rounded-xl border bg-white">
        <div className="flex flex-1 flex-col gap-6 p-6">{children}</div>
      </ScrollArea>
    </div>
  )
}
