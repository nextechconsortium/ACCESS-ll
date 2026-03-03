import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Create a Supabase client configured to use cookies
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/mentors",
    "/scholarships",
    "/universities",
    "/careers",
    "/entrepreneurship",
  ]

  // Auth routes
  const authRoutes = ["/auth/signin", "/auth/signup"]

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Redirect to signin if trying to access protected route without auth
  if (isProtectedRoute && !session) {
    const signinUrl = new URL("/auth/signin", request.url)
    signinUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(signinUrl)
  }

  // Redirect to dashboard if trying to access auth routes while authenticated
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
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
