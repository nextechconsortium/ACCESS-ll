"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Users,
  Briefcase,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Star,
  TrendingUp,
  Globe,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const features = [
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Connect with industry professionals and experienced mentors who guide your career journey.",
    href: "/mentors",
    color: "from-[#2066c3] to-[#1a5aaa]",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Get instant answers and personalized guidance powered by advanced AI technology.",
    href: "/ai-assistant",
    color: "from-[#26a69a] to-[#1e8a7f]",
  },
  {
    icon: MessageCircle,
    title: "Community Chat",
    description: "Join discussions, share experiences, and network with fellow students and professionals.",
    href: "/chatbox",
    color: "from-[#2573d4] to-[#2066c3]",
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description: "Discover internships, jobs, and career paths tailored to your interests and skills.",
    href: "/careers",
    color: "from-[#2d9d92] to-[#26a69a]",
  },
  {
    icon: Award,
    title: "Scholarships",
    description: "Find and apply for scholarships, grants, and funding opportunities for your education.",
    href: "/scholarships",
    color: "from-[#4a90d9] to-[#2066c3]",
  },
  {
    icon: GraduationCap,
    title: "Universities",
    description: "Explore top universities worldwide and find the perfect fit for your academic goals.",
    href: "/universities",
    color: "from-[#1a5aaa] to-[#0f3d6e]",
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurship",
    description: "Learn about startups, business development, and entrepreneurial opportunities.",
    href: "/entrepreneurship",
    color: "from-[#26a69a] to-[#2066c3]",
  },
]

const stats = [
  { label: "Active Mentors", value: "500+", icon: Users },
  { label: "Students Helped", value: "10,000+", icon: GraduationCap },
  { label: "Success Stories", value: "2,500+", icon: Star },
  { label: "Countries Reached", value: "25+", icon: Globe },
]

const testimonials = [
  {
    name: "Sarah Wanjiku",
    role: "Computer Science Student",
    image: "/young-african-woman-student.png",
    content:
      "ACCESS helped me find the perfect mentor who guided me through my internship applications. I landed my dream job at a tech company!",
  },
  {
    name: "David Kimani",
    role: "Engineering Graduate",
    image: "/young-african-engineer.png",
    content:
      "The scholarship opportunities I found through ACCESS made my education possible. Now I'm giving back as a mentor myself.",
  },
  {
    name: "Grace Achieng",
    role: "Young Entrepreneur",
    image: "/young-african-woman-entrepreneur.png",
    content:
      "The entrepreneurship resources and mentorship helped me launch my startup. ACCESS is truly empowering the next generation.",
  },
]

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const kenyaTime = new Intl.DateTimeFormat("en-KE", {
        timeZone: "Africa/Nairobi",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now)
      setCurrentTime(kenyaTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      <div className="futuristic-bg"></div>
      <div className="content-wrapper">
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 glass-card border-[#2066c3]/40 text-[#4a90d9] font-medium">
                Empowering Students Since 2025
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text text-white tracking-tight">
                Your Gateway to
                <span className="block bg-gradient-to-r from-[#4a90d9] via-[#26a69a] to-[#2066c3] bg-clip-text text-transparent">
                  Academic Excellence
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with expert mentors, discover opportunities, and make informed career choices with ACCESS - your
                comprehensive student success platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link href="/careers">
                  <Button size="lg" className="neon-button text-white text-lg px-8 py-3 font-semibold">
                    Explore Career Fields
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-slate-400">Current time in Kenya: {currentTime}</div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="futuristic-card p-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-4 text-[#26a69a]" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-slate-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Everything You Need to <span className="text-[#26a69a]">Succeed</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Comprehensive tools and resources designed to support your academic and career journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link key={index} href={feature.href}>
                  <Card className="futuristic-card h-full cursor-pointer group">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-white group-hover:text-[#4a90d9] transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-400">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Success Stories from Our <span className="text-[#4a90d9]">Community</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Real students, real results. See how ACCESS has transformed academic and career journeys.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="futuristic-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-[#2066c3]/30">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 italic leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-[#26a69a] fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Founders Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Meet Our <span className="text-[#26a69a]">Founders</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Passionate leaders dedicated to empowering the next generation of African students and professionals
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* 1. CEO & Founder - Fadhili Darren */}
              <Card className="futuristic-card group">
                <CardContent className="p-5 text-center">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 ring-2 ring-[#2066c3]/30">
                    <Image
                      src="/founders/fadhili-darren.png"
                      alt="Fadhili Darren"
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Fadhili Darren</h3>
                  <p className="text-[#4a90d9] font-semibold mb-3">CEO & Founder</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Visionary leader with extensive experience in educational technology and student empowerment.
                    Passionate about creating opportunities for African students to access global education and career
                    prospects.
                  </p>
                  <div className="flex justify-center mt-4 gap-2">
                    <Badge variant="secondary" className="bg-[#2066c3]/20 text-[#4a90d9] text-xs font-medium">
                      Leadership
                    </Badge>
                    <Badge variant="secondary" className="bg-[#26a69a]/20 text-[#26a69a] text-xs font-medium">
                      EdTech
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Lead Developer - Victor Manee */}
              <Card className="futuristic-card group">
                <CardContent className="p-5 text-center">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 ring-2 ring-[#26a69a]/30">
                    <Image
                      src="/founders/victor-manee.jpeg"
                      alt="Victor Manee"
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Victor Manee</h3>
                  <p className="text-[#26a69a] font-semibold mb-3">Lead Developer</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Expert full-stack developer specializing in modern web technologies and scalable applications.
                    Dedicated to building robust platforms that enhance student learning experiences.
                  </p>
                  <div className="flex justify-center mt-4 gap-2">
                    <Badge variant="secondary" className="bg-[#26a69a]/20 text-[#26a69a] text-xs font-medium">
                      Development
                    </Badge>
                    <Badge variant="secondary" className="bg-[#2066c3]/20 text-[#4a90d9] text-xs font-medium">
                      Full-Stack
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 3. Lead Designer - Isaac Maloba */}
              <Card className="futuristic-card group">
                <CardContent className="p-5 text-center">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 ring-2 ring-[#4a90d9]/30">
                    <Image
                      src="/founders/isaac-maloba.png"
                      alt="Isaac Maloba"
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Isaac Maloba</h3>
                  <p className="text-[#4a90d9] font-semibold mb-3">Lead Designer</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Creative UI/UX designer with a passion for creating intuitive and engaging user experiences. Focuses
                    on making educational technology accessible and visually appealing.
                  </p>
                  <div className="flex justify-center mt-4 gap-2">
                    <Badge variant="secondary" className="bg-[#4a90d9]/20 text-[#4a90d9] text-xs font-medium">
                      UI/UX Design
                    </Badge>
                    <Badge variant="secondary" className="bg-[#26a69a]/20 text-[#26a69a] text-xs font-medium">
                      Creative
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 4. Chief Financial Officer - Andreane Kaniaru */}
              <Card className="futuristic-card group">
                <CardContent className="p-5 text-center">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 ring-2 ring-[#2d9d92]/30">
                    <Image
                      src="/founders/andreane-kaniaru.jpeg"
                      alt="Andreane Kaniaru"
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Andreane Kaniaru</h3>
                  <p className="text-[#2d9d92] font-semibold mb-3">Chief Financial Officer</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Experienced financial strategist with expertise in startup funding and sustainable business growth.
                    Ensures ACCESS maintains financial stability while expanding its impact across Africa.
                  </p>
                  <div className="flex justify-center mt-4 gap-2">
                    <Badge variant="secondary" className="bg-[#2d9d92]/20 text-[#2d9d92] text-xs font-medium">
                      Finance
                    </Badge>
                    <Badge variant="secondary" className="bg-[#2066c3]/20 text-[#4a90d9] text-xs font-medium">
                      Strategy
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 5. Consultant - James Gichaga */}
              <Card className="futuristic-card group">
                <CardContent className="p-5 text-center">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 ring-2 ring-[#1a5aaa]/30">
                    <Image
                      src="/founders/james-gichaga.png"
                      alt="James Gichaga"
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">James Gichaga</h3>
                  <p className="text-[#4a90d9] font-semibold mb-3">Consultant</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Strategic advisor with deep knowledge of the African education landscape and industry partnerships.
                    Provides valuable insights for platform development and market expansion.
                  </p>
                  <div className="flex justify-center mt-4 gap-2">
                    <Badge variant="secondary" className="bg-[#1a5aaa]/20 text-[#4a90d9] text-xs font-medium">
                      Consulting
                    </Badge>
                    <Badge variant="secondary" className="bg-[#26a69a]/20 text-[#26a69a] text-xs font-medium">
                      Strategy
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 6. Market Analyst - Jackson Kagema */}
              <Card className="futuristic-card group">
                <CardContent className="p-5 text-center">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 ring-2 ring-[#2066c3]/30">
                    <Image
                      src="/founders/jackson-kagema.jpeg"
                      alt="Jackson Kagema"
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Jackson Kagema</h3>
                  <p className="text-[#2066c3] font-semibold mb-3">Market Analyst</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Data-driven market researcher specializing in educational trends and student needs analysis. Ensures
                    ACCESS stays ahead of market demands and user expectations.
                  </p>
                  <div className="flex justify-center mt-4 gap-2">
                    <Badge variant="secondary" className="bg-[#2066c3]/20 text-[#4a90d9] text-xs font-medium">
                      Analytics
                    </Badge>
                    <Badge variant="secondary" className="bg-[#26a69a]/20 text-[#26a69a] text-xs font-medium">
                      Research
                    </Badge>
                  </div>
                </CardContent>
              </Card>


            </div>

            <div className="text-center mt-12">
              <p className="text-slate-400 text-lg">
                Together, we're building the future of education and career development in Africa
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="futuristic-card p-12 border-[#2066c3]/30">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Ready to Transform Your Future?</h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Join thousands of students who have already started their journey to success with ACCESS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="neon-button text-white text-lg px-8 py-3 font-semibold">
                    Get Started Today
                    <TrendingUp className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/mentors">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-card border-[#26a69a]/50 text-white hover:bg-[#26a69a]/15 hover:border-[#26a69a]/70 text-lg px-8 py-3 bg-transparent font-semibold transition-all"
                  >
                    Explore Mentors
                    <Users className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
