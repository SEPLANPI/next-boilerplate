"use server"

import { cookies } from "next/headers"
import { login } from "@/actions/login"

export async function ensureSiafeToken(): Promise<string | null> {
  let token = cookies().get("token")?.value

  if (!token) {
    await login()
    token = cookies().get("token")?.value
  }

  return token || null
}
