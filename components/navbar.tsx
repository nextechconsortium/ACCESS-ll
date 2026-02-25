"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Careers", href: "/careers" },
  { name: "Scholarships", href: "/scholarships" },
  { name: "Universities", href: "/universities" },
  { name: "Entrepreneurship", href: "/entrepreneurship" },
  { name: "AI Assistant", href: "/ai-assistant" },
  { name: "Chat", href: "/chatbox" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <nav className="glass-card border-b border-[#2066c3]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-10">
              <Image
                src="/images/access-logo.png"
                alt="ACCESS Logo"
                fill
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-2xl font-bold gradient-text">ACCESS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-[#2066c3]/20 text-white border border-[#2066c3]/30"
                    : "text-slate-300 hover:text-white hover:bg-[#2066c3]/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-[#2066c3]/10">
                    <Avatar className="w-8 h-8 ring-2 ring-[#2066c3]/30">
                      <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                      <AvatarFallback className="bg-[#2066c3]/20 text-[#4a90d9]">
                        {user.displayName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.displayName || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card border-[#2066c3]/30">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="text-slate-300 hover:text-[#4a90d9] cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile?tab=settings" className="text-slate-300 hover:text-[#4a90d9] cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-slate-300 hover:text-[#4a90d9] cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button className="neon-button text-white font-semibold">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-[#2066c3]/10"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#2066c3]/20 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-[#2066c3]/20 text-white border border-[#2066c3]/30"
                      : "text-slate-300 hover:text-white hover:bg-[#2066c3]/10"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-[#2066c3]/20 pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <Avatar className="w-8 h-8 ring-2 ring-[#2066c3]/30">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                        <AvatarFallback className="bg-[#2066c3]/20 text-[#4a90d9]">
                          {user.displayName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white text-sm">{user.displayName || user.email}</span>
                    </div>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-white border-[#2066c3]/30 bg-transparent justify-start hover:bg-[#2066c3]/10"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      onClick={signOut}
                      variant="outline"
                      size="sm"
                      className="w-full text-white border-[#2066c3]/30 bg-transparent justify-start hover:bg-[#2066c3]/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full neon-button text-white font-semibold">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
