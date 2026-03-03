import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log env variable status in development only
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const hasUrl = !!supabaseUrl
  const hasKey = !!supabaseAnonKey
  console.log("[v0] Supabase config status:", { hasUrl, hasKey })
  if (!hasUrl || !hasKey) {
    console.warn(
      "[v0] Supabase environment variables not set. Auth features will not work. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    )
  }
}

let supabase: ReturnType<typeof createBrowserClient> | null = null

// Only create client if env variables are available
if (supabaseUrl && supabaseAnonKey) {
  supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
