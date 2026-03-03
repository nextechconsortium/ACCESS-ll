import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Helper function to validate Supabase configuration
function validateSupabaseConfig() {
  const hasUrl = !!supabaseUrl
  const hasAnonKey = !!supabaseAnonKey

  if (process.env.NODE_ENV === "development") {
    console.log("[v0] Supabase server config status:", { hasUrl, hasAnonKey })
  }

  if (!hasUrl || !hasAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[v0] Supabase environment variables not fully configured. Auth features will not work until NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
      )
    }
    return false
  }

  return true
}

/**
 * Create a server-side Supabase client with user session
 * Uses cookies for session persistence
 * Safe to call even if env variables are missing
 */
export const createServerClient = async () => {
  // Return null client if env variables are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "[v0] Cannot create Supabase server client: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set"
    )
    return null
  }

  const cookieStore = await cookies()

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Cookie setting may fail in middleware context
        }
      },
    },
  })
}

/**
 * Create a server-side Supabase client for admin operations
 * Uses service role key for elevated privileges
 * NOTE: Only use for server-side admin operations, never expose key to client
 */
export const createAdminClient = () => {
  // Return null if service role key is missing
  if (!supabaseUrl || !supabaseServiceKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[v0] Admin Supabase client not available: SUPABASE_SERVICE_ROLE_KEY not set"
      )
    }
    return null
  }

  // Use createSupabaseServerClient with service role key
  // This is safe because it's server-side only
  return createSupabaseServerClient(supabaseUrl, supabaseServiceKey, {
    cookies: {
      getAll() {
        return []
      },
      setAll() {
        // Admin client doesn't need session cookies
      },
    },
  })
}
