import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      console.error("[v0] Supabase client not initialized")
      return NextResponse.json(
        { error: "Authentication service not configured" },
        { status: 500 }
      )
    }

    // Get the origin from request header for redirect
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const redirectUrl = `${origin}/auth/callback`

    console.log("[v0] Initiating Google OAuth with redirect:", redirectUrl)

    // Generate Google OAuth URL
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      console.error("[v0] Google OAuth error:", {
        message: error.message,
        status: error.status,
        name: error.name,
      })
      return NextResponse.json(
        { error: error.message || "Failed to initiate Google OAuth" },
        { status: 400 }
      )
    }

    // Supabase returns the OAuth URL in the data object
    // The actual URL depends on Supabase version
    const oauthUrl = data?.url || null

    console.log("[v0] Google OAuth URL generated:", !!oauthUrl)

    return NextResponse.json({
      url: oauthUrl,
      success: !!oauthUrl,
    })
  } catch (error) {
    console.error("[v0] Google OAuth exception:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: "An error occurred during Google OAuth initialization" },
      { status: 500 }
    )
  }
}
