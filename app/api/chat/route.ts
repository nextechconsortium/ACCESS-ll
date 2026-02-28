import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { generateAISystemPrompt } from "@/lib/site-content"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Generate dynamic system prompt with current site content
    const systemPrompt = generateAISystemPrompt()

    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
