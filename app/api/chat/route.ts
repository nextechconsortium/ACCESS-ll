import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: openai("gpt-4o"),
      system: `You are a helpful AI career assistant for the ACCESS platform. You specialize in:
      - Career guidance and advice
      - Academic planning and study strategies
      - University and scholarship information
      - Professional development
      - Educational pathways
      
      Provide personalized, actionable advice based on the user's questions. Be encouraging, informative, and supportive. Focus on helping students make informed decisions about their academic and career futures.`,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
