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
  Bot,
  Star,
  TrendingUp,
  Globe,
  Award,
  Heart,
  Send,
  MoreHorizontal,
  Reply,
  ThumbsUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

// Mock chat data for preview
const mockChatPosts = [
  {
    id: "1",
    author: {
      name: "Alex Mwangi",
      avatar: "/young-african-man.png",
      role: "Computer Science Student",
      verified: true,
    },
    content:
      "Just got accepted into the Google Summer of Code program! 🎉 Thanks to everyone who helped me prepare. The mentorship here is incredible!",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Maria Santos",
          avatar: "/young-woman-smiling.png",
          role: "Software Engineer",
        },
        content: "Congratulations Alex! That's amazing news. GSoC is such a great opportunity!",
        timestamp: "1 hour ago",
        likes: 5,
      },
      {
        id: "1-2",
        author: {
          name: "John Ochieng",
          avatar: "/young-african-man-glasses.png",
          role: "Tech Mentor",
        },
        content: "Well deserved! Your dedication during our mentoring sessions really paid off. Proud of you! 👏",
        timestamp: "45 minutes ago",
        likes: 8,
      },
    ],
    liked: false,
  },
  {
    id: "2",
    author: {
      name: "Priya Patel",
      avatar: "/young-indian-woman.png",
      role: "Medical Student",
      verified: false,
    },
    content:
      "Looking for study partners for the upcoming MCAT exam. Anyone interested in forming a study group? We could meet virtually every weekend. #StudyGroup #MCAT",
    timestamp: "4 hours ago",
    likes: 12,
    comments: 15,
    replies: [
      {
        id: "2-1",
        author: {
          name: "James Wilson",
          avatar: "/young-man-medical.png",
          role: "Pre-Med Student",
        },
        content: "I'm interested! I've been looking for a study group too. When are you planning to start?",
        timestamp: "3 hours ago",
        likes: 3,
      },
    ],
    liked: true,
  },
  {
    id: "3",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/professional-woman-doctor.png",
      role: "Cardiology Mentor",
      verified: true,
    },
    content:
      "Reminder: The scholarship application deadline for the Medical Excellence Fund is next week. Don't miss this opportunity! I'm happy to review applications for anyone who needs feedback. 📚💙",
    timestamp: "6 hours ago",
    likes: 45,
    comments: 12,
    replies: [],
    liked: false,
  },
]

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("")
  const [chatPosts, setChatPosts] = useState(mockChatPosts)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [showAllComments, setShowAllComments] = useState<Record<string, boolean>>({})

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

  const handleLike = (postId: string, replyId?: string) => {
    setChatPosts((posts) =>
      posts.map((post) => {
        if (post.id === postId) {
          if (replyId) {
            // Like a reply
            return {
              ...post,
              replies: post.replies.map((reply) =>
                reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply,
              ),
            }
          } else {
            // Like the main post
            return {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          }
        }
        return post
      }),
    )
  }

  const handleComment = (postId: string) => {
    if (!newComment.trim()) return

    const newReply = {
      id: `${postId}-${Date.now()}`,
      author: {
        name: "You",
        avatar: "/diverse-user-avatars.png",
        role: "Student",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
    }

    setChatPosts((posts) =>
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: [...post.replies, newReply],
              comments: post.comments + 1,
            }
          : post,
      ),
    )

    setNewComment("")
    setReplyingTo(null)
  }

  const toggleComments = (postId: string) => {
    setShowAllComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

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
                <Link href="/mentors">
                  <Button size="lg" className="neon-button text-white text-lg px-8 py-3 font-semibold">
                    Find Your Mentor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/ai-assistant">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-card border-[#26a69a]/50 text-white hover:bg-[#26a69a]/20 hover:border-[#26a69a]/70 text-lg px-8 py-3 bg-transparent font-semibold transition-all"
                  >
                    Try AI Assistant
                    <Bot className="ml-2 h-5 w-5" />
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

        {/* Community Chat Preview Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Join Our <span className="text-[#26a69a]">Community</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Connect with fellow students, share experiences, and get support from our vibrant community
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chat Feed */}
              <div className="lg:col-span-2">
                <Card className="futuristic-card">
                  <CardHeader className="border-b border-[#2066c3]/20">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-[#26a69a]" />
                        Community Feed
                      </CardTitle>
                      <Link href="/chatbox">
                        <Button
                          variant="outline"
                          size="sm"
                          className="neon-button text-white border-[#2066c3]/30 bg-transparent"
                        >
                          Join Discussion
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto">
                      {chatPosts.map((post) => (
                        <div key={post.id} className="border-b border-[#2066c3]/15 p-6 hover:bg-[#2066c3]/5 transition-colors">
                          {/* Post Header */}
                          <div className="flex items-start space-x-3 mb-4">
                            <Avatar className="w-10 h-10 ring-2 ring-[#2066c3]/20">
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                              <AvatarFallback className="bg-[#2066c3]/20 text-[#4a90d9]">
                                {post.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-white">{post.author.name}</h4>
                                {post.author.verified && (
                                  <Badge variant="secondary" className="bg-[#26a69a]/20 text-[#26a69a] text-xs font-medium">
                                    Verified
                                  </Badge>
                                )}
                                <span className="text-xs text-slate-400">{post.author.role}</span>
                              </div>
                              <p className="text-sm text-slate-500">{post.timestamp}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Post Content */}
                          <div className="mb-4">
                            <p className="text-slate-200 leading-relaxed">{post.content}</p>
                          </div>

                          {/* Post Actions */}
                          <div className="flex items-center gap-6 mb-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id)}
                              className={`text-slate-400 hover:text-[#26a69a] transition-colors ${
                                post.liked ? "text-[#26a69a]" : ""
                              }`}
                            >
                              <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-current" : ""}`} />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleComments(post.id)}
                              className="text-slate-400 hover:text-[#4a90d9] transition-colors"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              {post.comments}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyingTo(post.id)}
                              className="text-slate-400 hover:text-[#2066c3] transition-colors"
                            >
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                          </div>

                          {/* Comments/Replies */}
                          {(showAllComments[post.id] || post.replies.length <= 2) && post.replies.length > 0 && (
                            <div className="space-y-3 ml-8 border-l-2 border-[#2066c3]/20 pl-4">
                              {post.replies.slice(0, showAllComments[post.id] ? undefined : 2).map((reply) => (
                                <div key={reply.id} className="flex items-start space-x-3">
                                  <Avatar className="w-8 h-8 ring-1 ring-[#26a69a]/20">
                                    <AvatarImage
                                      src={reply.author.avatar || "/placeholder.svg"}
                                      alt={reply.author.name}
                                    />
                                    <AvatarFallback className="bg-[#26a69a]/15 text-[#26a69a] text-xs">
                                      {reply.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h5 className="font-medium text-white text-sm">{reply.author.name}</h5>
                                      <span className="text-xs text-slate-500">{reply.author.role}</span>
                                      <span className="text-xs text-slate-600">•</span>
                                      <span className="text-xs text-slate-500">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-2">{reply.content}</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleLike(post.id, reply.id)}
                                      className="text-slate-500 hover:text-[#26a69a] transition-colors p-0 h-auto"
                                    >
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      {reply.likes}
                                    </Button>
                                  </div>
                                </div>
                              ))}

                              {post.replies.length > 2 && !showAllComments[post.id] && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleComments(post.id)}
                                  className="text-[#4a90d9] hover:text-[#2066c3] text-sm font-medium"
                                >
                                  View {post.replies.length - 2} more replies
                                </Button>
                              )}
                            </div>
                          )}

                          {/* Reply Input */}
                          {replyingTo === post.id && (
                            <div className="mt-4 ml-8 flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-[#2066c3]/20 text-[#4a90d9] text-xs">You</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex items-center space-x-2">
                                <Input
                                  placeholder="Write a reply..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  className="bg-[#1a2942]/50 border-[#2066c3]/30 text-white placeholder:text-slate-500 focus:border-[#2066c3]/50"
                                  onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleComment(post.id)}
                                  className="neon-button text-white"
                                  disabled={!newComment.trim()}
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Community Stats & Quick Actions */}
              <div className="space-y-6">
                <Card className="futuristic-card">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Active Members</span>
                      <span className="text-[#4a90d9] font-semibold">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Posts Today</span>
                      <span className="text-[#26a69a] font-semibold">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Online Now</span>
                      <span className="text-[#2d9d92] font-semibold">423</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="futuristic-card">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/chatbox">
                      <Button className="w-full neon-button text-white justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Join Chat
                      </Button>
                    </Link>
                    <Link href="/mentors">
                      <Button
                        variant="outline"
                        className="w-full glass-card border-[#2066c3]/30 text-white justify-start bg-transparent hover:bg-[#2066c3]/10"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Find Mentors
                      </Button>
                    </Link>
                    <Link href="/scholarships">
                      <Button
                        variant="outline"
                        className="w-full glass-card border-[#2066c3]/30 text-white justify-start bg-transparent hover:bg-[#2066c3]/10"
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Browse Scholarships
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="futuristic-card">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Trending Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">#StudyAbroad</span>
                      <Badge variant="secondary" className="bg-[#2066c3]/20 text-[#4a90d9] font-medium">
                        Hot
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">#TechCareers</span>
                      <Badge variant="secondary" className="bg-[#26a69a]/20 text-[#26a69a] font-medium">
                        Trending
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">#Scholarships2025</span>
                      <Badge variant="secondary" className="bg-[#2d9d92]/20 text-[#2d9d92] font-medium">
                        New
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
