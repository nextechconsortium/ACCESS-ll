import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function POST(request: NextRequest) {
  try {
    // Sign out user
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json(
        { message: error.message || "Failed to sign out" },
        { status: 400 }
      )
    }

    const response = NextResponse.json(
      { message: "Signed out successfully" },
      { status: 200 }
    )

    // Clear session cookies
    response.cookies.delete("supabase-access-token")
    response.cookies.delete("supabase-refresh-token")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { message: "An error occurred during logout" },
      { status: 500 }
    )
  }
}
