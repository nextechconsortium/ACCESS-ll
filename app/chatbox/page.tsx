"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Send,
  User,
  MoreHorizontal,
  Reply,
  ThumbsUp,
  Share,
  Bookmark,
  Flag,
  ImageIcon,
  Smile,
  Hash,
  TrendingUp,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: string
  content: string
  author: string
  authorId: string
  authorAvatar?: string
  timestamp: any
  likes: number
  likedBy: string[]
}

interface Post {
  id: string
  content: string
  author: string
  authorId: string
  authorAvatar?: string
  authorRole?: string
  timestamp: any
  likes: number
  likedBy: string[]
  comments: Comment[]
  shares: number
  bookmarks: number
  hashtags: string[]
  mentions: string[]
}

const trendingTopics = [
  { tag: "#StudyAbroad", posts: 234 },
  { tag: "#TechCareers", posts: 189 },
  { tag: "#Scholarships2025", posts: 156 },
  { tag: "#MentorshipMonday", posts: 98 },
  { tag: "#StartupLife", posts: 87 },
]

const suggestedUsers = [
  { name: "Dr. Sarah Johnson", role: "Cardiology Mentor", avatar: "/doctor-woman.png", verified: true },
  { name: "Alex Mwangi", role: "Software Engineer", avatar: "/young-african-man.png", verified: false },
  { name: "Maria Santos", role: "Business Mentor", avatar: "/confident-business-woman.png", verified: true },
]

export default function ChatboxPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData: Post[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        postsData.push({
          id: doc.id,
          ...data,
          likedBy: data.likedBy || [],
          comments: data.comments || [],
          shares: data.shares || 0,
          bookmarks: data.bookmarks || 0,
          hashtags: data.hashtags || [],
          mentions: data.mentions || [],
        } as Post)
      })
      setPosts(postsData)
    })

    return () => unsubscribe()
  }, [])

  const extractHashtagsAndMentions = (content: string) => {
    const hashtags = content.match(/#\w+/g) || []
    const mentions = content.match(/@\w+/g) || []
    return { hashtags, mentions }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newPost.trim()) return

    setLoading(true)
    try {
      const { hashtags, mentions } = extractHashtagsAndMentions(newPost)

      await addDoc(collection(db, "posts"), {
        content: newPost,
        author: user.displayName || user.email || "Anonymous",
        authorId: user.uid,
        authorAvatar: user.photoURL || "",
        authorRole: "Student", // This could be fetched from user profile
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: [],
        comments: [],
        shares: 0,
        bookmarks: 0,
        hashtags,
        mentions,
      })
      setNewPost("")
      toast({
        title: "Post shared!",
        description: "Your post has been shared with the community.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share your post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId: string) => {
    if (!user) return

    const post = posts.find((p) => p.id === postId)
    if (!post) return

    const isLiked = post.likedBy.includes(user.uid)
    const newLikedBy = isLiked ? post.likedBy.filter((id) => id !== user.uid) : [...post.likedBy, user.uid]

    try {
      await updateDoc(doc(db, "posts", postId), {
        likes: newLikedBy.length,
        likedBy: newLikedBy,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleComment = async (postId: string) => {
    if (!user || !replyContent.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      content: replyContent,
      author: user.displayName || user.email || "Anonymous",
      authorId: user.uid,
      authorAvatar: user.photoURL || "",
      timestamp: new Date(),
      likes: 0,
      likedBy: [],
    }

    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion(newComment),
      })

      setReplyContent("")
      setReplyingTo(null)

      toast({
        title: "Comment added!",
        description: "Your comment has been posted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "Just now"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return "Just now"
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return `${Math.floor(diff / 86400000)}d ago`
  }

  const renderPostContent = (content: string) => {
    return content.split(" ").map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span key={index} className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
            {word}{" "}
          </span>
        )
      } else if (word.startsWith("@")) {
        return (
          <span key={index} className="text-purple-400 hover:text-purple-300 cursor-pointer">
            {word}{" "}
          </span>
        )
      }
      return word + " "
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <div className="futuristic-bg"></div>
        <div className="content-wrapper">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4 text-white">Join the Community</h1>
            <p className="text-white/70 mb-8">Sign in to share your thoughts and connect with fellow students.</p>
            <Button asChild className="neon-button text-white">
              <a href="/auth">Sign In</a>
            </Button>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="futuristic-bg"></div>
      <div className="content-wrapper">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Community Hub</h1>
            <p className="text-lg text-white/70">Connect, share, and grow with fellow students and mentors</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Trending & Suggestions */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="futuristic-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-cyan-400" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                    >
                      <div>
                        <p className="text-cyan-400 font-medium">{topic.tag}</p>
                        <p className="text-white/60 text-xs">{topic.posts} posts</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="futuristic-card">
                <CardHeader>
                  <CardTitle className="text-white">Suggested Connections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestedUsers.map((suggestedUser, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={suggestedUser.avatar || "/placeholder.svg"} alt={suggestedUser.name} />
                          <AvatarFallback className="bg-purple-500/20 text-purple-300">
                            {suggestedUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-white text-sm font-medium">{suggestedUser.name}</p>
                            {suggestedUser.verified && (
                              <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 text-xs">
                                ✓
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/60 text-xs">{suggestedUser.role}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass-card border-white/20 text-white bg-transparent"
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* New Post Form */}
              <Card className="futuristic-card">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Share with the community</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitPost} className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                        <AvatarFallback className="bg-cyan-500/20 text-cyan-300">
                          {user.displayName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="What's on your mind? Share your thoughts, questions, or experiences... Use #hashtags and @mentions!"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[100px] resize-none"
                          disabled={loading}
                        />
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-white/60 hover:text-cyan-400"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-white/60 hover:text-cyan-400"
                            >
                              <Smile className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-white/60 hover:text-cyan-400"
                            >
                              <Hash className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            type="submit"
                            disabled={loading || !newPost.trim()}
                            className="neon-button text-white"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            {loading ? "Posting..." : "Post"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="futuristic-card">
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                            <AvatarFallback className="bg-cyan-500/20 text-cyan-300">
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white">{post.author}</h4>
                              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                                {post.authorRole || "Member"}
                              </Badge>
                            </div>
                            <p className="text-sm text-white/60">{formatTimestamp(post.timestamp)}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glass-card border-white/20">
                            <DropdownMenuItem className="text-white/80 hover:text-cyan-300">
                              <Bookmark className="mr-2 h-4 w-4" />
                              Save Post
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white/80 hover:text-cyan-300">
                              <Flag className="mr-2 h-4 w-4" />
                              Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-white/80 leading-relaxed">{renderPostContent(post.content)}</p>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <div className="flex items-center space-x-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`text-white/60 hover:text-red-400 transition-colors ${
                              post.likedBy.includes(user.uid) ? "text-red-400" : ""
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 mr-2 ${post.likedBy.includes(user.uid) ? "fill-current" : ""}`}
                            />
                            {post.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleComments(post.id)}
                            className="text-white/60 hover:text-cyan-400 transition-colors"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {post.comments.length}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/60 hover:text-green-400 transition-colors"
                          >
                            <Share className="h-4 w-4 mr-2" />
                            {post.shares}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(post.id)}
                          className="text-white/60 hover:text-purple-400 transition-colors"
                        >
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>

                      {/* Comments Section */}
                      {(showComments[post.id] || post.comments.length <= 2) && post.comments.length > 0 && (
                        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                          {post.comments.slice(0, showComments[post.id] ? undefined : 2).map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} />
                                <AvatarFallback className="bg-purple-500/20 text-purple-300 text-xs">
                                  {comment.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-white/5 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-medium text-white text-sm">{comment.author}</h5>
                                  <span className="text-xs text-white/40">{formatTimestamp(comment.timestamp)}</span>
                                </div>
                                <p className="text-white/70 text-sm mb-2">{comment.content}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-white/40 hover:text-red-400 transition-colors p-0 h-auto"
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {comment.likes}
                                </Button>
                              </div>
                            </div>
                          ))}

                          {post.comments.length > 2 && !showComments[post.id] && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleComments(post.id)}
                              className="text-cyan-400 hover:text-cyan-300 text-sm ml-11"
                            >
                              View {post.comments.length - 2} more comments
                            </Button>
                          )}
                        </div>
                      )}

                      {/* Reply Input */}
                      {replyingTo === post.id && (
                        <div className="mt-4 border-t border-white/10 pt-4">
                          <div className="flex items-start space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                              <AvatarFallback className="bg-cyan-500/20 text-cyan-300 text-xs">
                                {user.displayName
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("") || user.email?.[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder="Write a comment..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[80px] resize-none"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    handleComment(post.id)
                                  }
                                }}
                              />
                              <div className="flex items-center justify-between mt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setReplyingTo(null)
                                    setReplyContent("")
                                  }}
                                  className="text-white/60 hover:text-white"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleComment(post.id)}
                                  className="neon-button text-white"
                                  disabled={!replyContent.trim()}
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Comment
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {posts.length === 0 && (
                <Card className="futuristic-card">
                  <CardContent className="p-12 text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-white/40" />
                    <h3 className="text-xl font-semibold mb-2 text-white">No posts yet</h3>
                    <p className="text-white/70 mb-4">Be the first to share something with the community!</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Sidebar - Community Stats */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="futuristic-card">
                <CardHeader>
                  <CardTitle className="text-white">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Active Members</span>
                    <span className="text-cyan-400 font-semibold">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Posts Today</span>
                    <span className="text-purple-400 font-semibold">{posts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Online Now</span>
                    <span className="text-green-400 font-semibold">423</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Your Posts</span>
                    <span className="text-yellow-400 font-semibold">
                      {posts.filter((p) => p.authorId === user.uid).length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="futuristic-card">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full neon-button text-white justify-start">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full glass-card border-white/20 text-white justify-start bg-transparent"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Direct Messages
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full glass-card border-white/20 text-white justify-start bg-transparent"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Saved Posts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
