"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  platform: [
    { name: "Find Mentors", href: "/mentors" },
    { name: "AI Assistant", href: "/ai-assistant" },
    { name: "Community Chat", href: "/chatbox" },
    { name: "Career Guidance", href: "/careers" },
  ],
  opportunities: [
    { name: "Scholarships", href: "/scholarships" },
    { name: "Universities", href: "/universities" },
    { name: "Entrepreneurship", href: "/entrepreneurship" },
    { name: "Success Stories", href: "/success-stories" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/accessplatform" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/accessplatform" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/accessplatform" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/accessplatform" },
]

export default function Footer() {
  return (
    <footer className="glass-card border-t border-[#2066c3]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-16 h-12">
                <Image src="/images/access-logo.png" alt="ACCESS Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-bold gradient-text">ACCESS</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">Power to Choose Better</p>
            <div className="space-y-2">
              <div className="flex items-center text-slate-400">
                <MapPin className="h-4 w-4 mr-2 text-[#26a69a]" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Mail className="h-4 w-4 mr-2 text-[#26a69a]" />
                <span>254access@gmail.com</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Phone className="h-4 w-4 mr-2 text-[#26a69a]" />
                <span>0750226857</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-[#4a90d9]">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#4a90d9] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-[#26a69a]">Opportunities</h3>
            <ul className="space-y-2">
              {footerLinks.opportunities.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#26a69a] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-[#2d9d92]">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#2d9d92] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-[#2066c3]/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-slate-400">Get the latest opportunities and updates delivered to your inbox.</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-[#1a2942]/50 border border-[#2066c3]/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#2066c3]/60"
              />
              <Button className="neon-button text-white font-semibold">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#2066c3]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 mb-4 md:mb-0">
            © 2025 ACCESS Platform. All rights reserved. Power to Choose Better.
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-slate-400 hover:text-[#4a90d9] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
