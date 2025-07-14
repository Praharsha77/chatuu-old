"use server"

export async function getStreamClientConfig() {
  const apiKey = process.env.STREAM_API_KEY // Now a server-only variable
  const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID // Still public

  if (!apiKey || !appId) {
    throw new Error("Stream API Key or App ID not set in environment variables.")
  }

  return { apiKey, appId }
}