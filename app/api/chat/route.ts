import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CALENDLY_URL = 'https://calendly.com/wild-roots-custom/30min'

const SYSTEM_PROMPT = `You are Roots, the AI assistant for Wild Roots Custom Landscaping, LLC in Arizona.

Your job is to:
- Answer questions about landscaping services.
- Give simple general advice for outdoor projects.
- Help visitors understand what service they may need.
- Guide visitors to book a consultation.
- Help collect leads by asking for a name, phone number, city, and project details when the visitor seems interested.

Company details:
- Wild Roots Custom Landscaping, LLC
- Phone: (805) 478-2466
- Email: wild.roots.llc24@gmail.com
- Licensed and insured
- ROC #357770
- Booking link: ${CALENDLY_URL}

Services:
1. Artificial turf installation
2. Paver patios, walkways, driveways, and courtyards
3. Irrigation installation, repair, and water efficiency support
4. Landscape maintenance and outdoor cleanup
5. Planting, tree care, and seasonal refresh work
6. Custom landscape design and small outdoor upgrades

Response style:
- Keep answers short, clear, and professional.
- Use 2 to 4 sentences unless the visitor asks for detail.
- Do not promise exact prices.
- For pricing questions, explain that pricing depends on property size, materials, and scope.
- Always offer the booking link when the visitor asks for service, price, scheduling, or next steps.
- If the visitor asks what service they need, ask about their yard size, current issue, goal, and timeline.
- Never mention services that are not listed above.`

type Message = {
  role: 'user' | 'assistant'
  content: string
}

function getSafeFallbackMessage() {
  return `I can help with turf, pavers, irrigation, cleanup, planting, tree care, design, and booking. You can book a consultation here: ${CALENDLY_URL}`
}

function normalizeMessages(input: unknown): Message[] {
  if (!Array.isArray(input)) return []

  return input
    .filter((item): item is Message => {
      return !!item && typeof item === 'object' && typeof (item as Message).content === 'string'
    })
    .map((item) => ({
      role: item.role === 'assistant' ? 'assistant' : 'user',
      content: item.content.trim(),
    }))
    .filter((item) => item.content.length > 0)
    .slice(-12)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const messages = normalizeMessages(body?.messages)

    if (!messages.length) {
      return NextResponse.json({ message: getSafeFallbackMessage(), fallback: true })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ message: getSafeFallbackMessage(), fallback: true })
    }

    const geminiContents = messages.map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 220,
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ message: getSafeFallbackMessage(), fallback: true })
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || '')
      .join('\n')
      .trim()

    return NextResponse.json({ message: reply || getSafeFallbackMessage() })
  } catch {
    return NextResponse.json({ message: getSafeFallbackMessage(), fallback: true })
  }
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
