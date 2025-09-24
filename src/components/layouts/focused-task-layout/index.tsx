import { PropsWithChildren } from "react"

export function FocusedTaskLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[100dvh] justify-center bg-gray-100 p-4">
      <div className="flex h-fit w-full max-w-md flex-col space-y-6 rounded-md bg-white p-4 shadow-md sm:mt-16 sm:p-8">
        {children}
      </div>
    </main>
  )
}

export function FocusedTaskTitle({ children }: PropsWithChildren) {
  return (
    <h1 className="mx-auto mb-2 text-lg font-semibold text-content-emphasis">
      {children}
    </h1>
  )
}

export function FocusedTaskDescription({ children }: PropsWithChildren) {
  return <div className="space-y-2 text-sm">{children}</div>
}
