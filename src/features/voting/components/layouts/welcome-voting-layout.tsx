import { PropsWithChildren } from 'react'

export function WelcomeVotingLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-md flex-col space-y-12 rounded-md bg-white p-8 shadow-md">
        {children}
      </div>
    </main>
  )
}
