import { signOut } from '@/auth'

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams
  const redirectTo = searchParams.get('redirect')
  await signOut({ redirectTo: redirectTo || '' })
}
