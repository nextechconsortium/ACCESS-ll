"use client"

import { useState } from "react"
import Image from "next/image"
import { Download, Play, ExternalLink, TrendingUp, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Entrepreneur {
  id: string
  name: string
  company: string
  industry: string
  story: string
  image: string
  achievements: string[]
  guideLink: string
}

interface Article {
  id: string
  title: string
  category: string
  description: string
  readTime: string
  content: string
}

interface Video {
  id: string
  title: string
  category: string
  description: string
  duration: string
  embedId: string
}

const entrepreneurs: Entrepreneur[] = [
  {
    id: "1",
    name: "Elon Musk",
    company: "Tesla, SpaceX",
    industry: "Technology",
    story: "From PayPal co-founder to revolutionizing electric vehicles and space exploration.",
    image: "/images/elon-musk.jpg",
    achievements: ["Founded PayPal", "CEO of Tesla", "Founded SpaceX", "Richest person in the world"],
    guideLink: "/guides/elon-musk-guide.pdf",
  },
  {
    id: "2",
    name: "Oprah Winfrey",
    company: "Harpo Productions",
    industry: "Media",
    story: "Built a media empire from humble beginnings, becoming one of the most influential women in the world.",
    image: "/images/oprah-winfrey.jpg",
    achievements: ["Media Mogul", "Philanthropist", "First African American Billionaire", "Cultural Icon"],
    guideLink: "/guides/oprah-guide.pdf",
  },
  {
    id: "3",
    name: "Jeff Bezos",
    company: "Amazon",
    industry: "E-commerce",
    story: "Started Amazon in a garage and built it into the world's largest online retailer.",
    image: "/images/jeff-bezos.jpg",
    achievements: ["Founded Amazon", "Blue Origin", "World's richest person", "Space pioneer"],
    guideLink: "/guides/bezos-guide.pdf",
  },
  {
    id: "4",
    name: "Sara Blakely",
    company: "Spanx",
    industry: "Fashion",
    story: "Self-made billionaire who revolutionized women's undergarments with $5,000 savings.",
    image: "/images/sara-blakely.jpg",
    achievements: ["Founded Spanx", "Self-made billionaire", "Youngest female billionaire", "Philanthropist"],
    guideLink: "/guides/blakely-guide.pdf",
  },
]

const articles: Article[] = [
  {
    id: "1",
    title: "How to Validate Your Business Idea",
    category: "Starting",
    description: "Learn the essential steps to validate your business idea before investing time and money.",
    readTime: "8 min read",
    content: "Validating your business idea is crucial for entrepreneurial success...",
  },
  {
    id: "2",
    title: "Funding Your Startup: A Complete Guide",
    category: "Funding",
    description: "Explore different funding options from bootstrapping to venture capital.",
    readTime: "12 min read",
    content: "Understanding funding options is essential for startup growth...",
  },
  {
    id: "3",
    title: "Scaling Your Business: Strategies That Work",
    category: "Scaling",
    description: "Proven strategies to scale your business sustainably and profitably.",
    readTime: "10 min read",
    content: "Scaling a business requires careful planning and execution...",
  },
  {
    id: "4",
    title: "Building a Strong Company Culture",
    category: "Scaling",
    description: "How to create and maintain a positive company culture as you grow.",
    readTime: "7 min read",
    content: "Company culture is the foundation of successful organizations...",
  },
]

const videos: Video[] = [
  {
    id: "1",
    title: "Entrepreneurship 101: Getting Started",
    category: "Starting",
    description: "A comprehensive introduction to entrepreneurship for beginners.",
    duration: "15:30",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Pitch Perfect: How to Present Your Idea",
    category: "Funding",
    description: "Master the art of pitching your business idea to investors.",
    duration: "22:45",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Digital Marketing for Startups",
    category: "Scaling",
    description: "Cost-effective digital marketing strategies for growing businesses.",
    duration: "18:20",
    embedId: "dQw4w9WgXcQ",
  },
]

export default function EntrepreneurshipPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  return (
    <div className="min-h-screen">
      <div className="futuristic-bg"></div>
      <div className="content-wrapper">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Entrepreneurship Hub</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Learn from successful entrepreneurs, access valuable resources, and start your entrepreneurial journey
              with confidence and knowledge.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-cyan mb-2">{entrepreneurs.length}</div>
                  <div className="text-sm text-white/70">Success Stories</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-magenta mb-2">{articles.length}</div>
                  <div className="text-sm text-white/70">Expert Articles</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-violet mb-2">{videos.length}</div>
                  <div className="text-sm text-white/70">Video Tutorials</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                  <div className="text-sm text-white/70">Success Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="entrepreneurs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-card">
              <TabsTrigger value="entrepreneurs" className="data-[state=active]:bg-white/20 text-white">
                Success Stories
              </TabsTrigger>
              <TabsTrigger value="articles" className="data-[state=active]:bg-white/20 text-white">
                Articles
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-white/20 text-white">
                Videos
              </TabsTrigger>
            </TabsList>

            {/* Entrepreneurs Tab */}
            <TabsContent value="entrepreneurs" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {entrepreneurs.map((entrepreneur) => (
                  <Card key={entrepreneur.id} className="futuristic-card hover:scale-105 transition-all duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="aspect-square relative rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
                          <Image
                            src={
                              entrepreneur.image ||
                              "/placeholder.svg?height=300&width=300&query=successful entrepreneur"
                            }
                            alt={entrepreneur.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl text-white">{entrepreneur.name}</CardTitle>
                              <CardDescription className="neon-cyan font-medium">
                                {entrepreneur.company}
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                              {entrepreneur.industry}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-white/70 text-sm">{entrepreneur.story}</p>
                          <div>
                            <h4 className="font-semibold mb-2 text-sm text-white neon-magenta">Key Achievements:</h4>
                            <div className="space-y-1">
                              {entrepreneur.achievements.slice(0, 3).map((achievement, index) => (
                                <div key={index} className="flex items-center text-xs text-white/70">
                                  <TrendingUp className="h-3 w-3 mr-2 text-green-400" />
                                  {achievement}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button asChild className="w-full neon-button text-white">
                            <a href={entrepreneur.guideLink} download>
                              <Download className="h-4 w-4 mr-2" />
                              Download Success Guide
                            </a>
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    className="futuristic-card cursor-pointer hover:scale-105 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-white/70">{article.readTime}</span>
                      </div>
                      <CardTitle className="text-lg text-white">{article.title}</CardTitle>
                      <CardDescription className="text-white/70">{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full neon-button text-white border-white/20 bg-transparent"
                        onClick={() => setSelectedArticle(article)}
                      >
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="futuristic-card hover:scale-105 transition-all duration-300">
                    <div className="aspect-video relative bg-white/10 rounded-t-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="lg" className="rounded-full neon-button text-white">
                          <Play className="h-6 w-6 ml-1" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {video.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-white">{video.title}</CardTitle>
                      <CardDescription className="text-white/70">{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full neon-button text-white">
                        <a
                          href={`https://www.youtube.com/watch?v=${video.embedId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Watch on YouTube
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Article Dialog */}
          {selectedArticle && (
            <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
              <DialogContent className="futuristic-card max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between text-white">
                    <span>{selectedArticle.title}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {selectedArticle.category}
                      </Badge>
                      <span className="text-sm text-white/70">{selectedArticle.readTime}</span>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-white">
                  <p className="text-white/70">{selectedArticle.description}</p>
                  <div className="prose prose-sm max-w-none text-white/80">
                    <p>{selectedArticle.content}</p>
                    <p>
                      This is a comprehensive guide that covers all the essential aspects of{" "}
                      {selectedArticle.title.toLowerCase()}. The content includes practical tips, real-world examples,
                      and actionable strategies that you can implement immediately.
                    </p>
                    <p>
                      Whether you're just starting out or looking to improve your existing approach, this article
                      provides valuable insights from industry experts and successful entrepreneurs who have been
                      through the same journey.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="futuristic-card text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 mx-auto mb-4 neon-cyan" />
                <h3 className="text-2xl font-bold mb-2 text-white">10,000+</h3>
                <p className="text-white/70">Aspiring Entrepreneurs</p>
              </CardContent>
            </Card>
            <Card className="futuristic-card text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-400" />
                <h3 className="text-2xl font-bold mb-2 text-white">500+</h3>
                <p className="text-white/70">Success Stories</p>
              </CardContent>
            </Card>
            <Card className="futuristic-card text-center">
              <CardContent className="p-6">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-2xl font-bold mb-2 text-white">$50M+</h3>
                <p className="text-white/70">Funding Raised</p>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
