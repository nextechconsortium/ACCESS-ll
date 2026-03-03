import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    // Sign in user
    const { data, error: signinError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signinError || !data.user) {
      return NextResponse.json(
        { message: signinError?.message || "Invalid email or password" },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    // Create response with session data
    const response = NextResponse.json(
      {
        message: "Signed in successfully",
        user: {
          id: data.user.id,
          email: data.user.email,
          ...profile,
        },
        session: {
          access_token: data.session?.access_token,
          refresh_token: data.session?.refresh_token,
        },
      },
      { status: 200 }
    )

    // Set session cookies
    if (data.session) {
      response.cookies.set("supabase-access-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      response.cookies.set("supabase-refresh-token", data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    }

    return response
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json(
      { message: "An error occurred during signin" },
      { status: 500 }
    )
  }
}
