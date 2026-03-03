import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Check if Supabase environment variables are configured
  // If not, allow request to pass through (app will handle missing auth)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[v0] Supabase not configured in middleware. Auth routes will work but session detection will not. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      )
    }
    // Allow request to pass through - app will handle missing auth gracefully
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  try {
    // Create a Supabase client configured to use cookies
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Protected routes that require authentication
    const protectedRoutes = [
      "/dashboard",
      "/profile",
      "/mentors",
      "/scholarships",
      "/universities",
      "/careers",
      "/entrepreneurship",
    ]

    // Auth routes that should redirect if already authenticated
    const authRoutes = ["/auth/signin", "/auth/signup"]

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )

    // Check if current path is an auth route
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

    // Redirect to signin if trying to access protected route without auth
    if (isProtectedRoute && !session) {
      const signinUrl = new URL("/(auth)/signin", request.url)
      signinUrl.searchParams.set("redirectTo", pathname)
      return NextResponse.redirect(signinUrl)
    }

    // Redirect to dashboard if trying to access auth routes while authenticated
    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return response
  } catch (error) {
    // If there's an error in middleware, log it and allow request through
    if (process.env.NODE_ENV === "development") {
      console.error("[v0] Middleware auth check failed:", error instanceof Error ? error.message : error)
    }
    // Don't crash the app - just allow the request through
    // The auth provider will handle it on the client
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
