import { createServerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabase } from "@/lib/supabase-client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      fullName,
      username,
      phone,
      educationLevel,
      careerInterests,
      kcseCompleted,
    } = body

    // Validate required fields
    if (!email || !password || !fullName || !username) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if username already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      )
    }

    // Create user in Supabase Auth
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: username,
        },
      },
    })

    if (signupError || !data.user) {
      return NextResponse.json(
        { message: signupError?.message || "Failed to create account" },
        { status: 400 }
      )
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          full_name: fullName,
          username: username,
          email: email,
          phone_number: phone || null,
          education_level: educationLevel,
          career_interests: careerInterests || [],
          kcse_completed: kcseCompleted || false,
        },
      ])

    if (profileError) {
      return NextResponse.json(
        { message: "Failed to create user profile" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName,
          username,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: "An error occurred during signup" },
      { status: 500 }
    )
  }
}
