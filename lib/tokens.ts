"use server"

import { SignJWT } from "jose"

export async function generateStreamToken(userId: string) {
  const apiSecret = process.env.STREAM_API_SECRET

  if (!apiSecret) {
    throw new Error("Stream API Secret not set in environment variables.")
  }

  const secret = new TextEncoder().encode(apiSecret)
  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 // Token valid for 1 hour
  const issuedAt = Math.floor(Date.now() / 1000)

  const token = await new SignJWT({
    user_id: userId,
    type: "user", // Required for Stream user tokens
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(issuedAt)
    .setExpirationTime(expirationTime)
    .sign(secret)

  return token
}