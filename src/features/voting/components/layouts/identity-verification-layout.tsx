import { PropsWithChildren } from 'react'

export function IdentityVerificationLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-md flex-col space-y-6 rounded-md bg-white p-8 shadow-md">
        {children}
      </div>
    </main>
  )
}
