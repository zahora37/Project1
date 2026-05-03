import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `You are the friendly AI assistant for Wild Roots Custom Landscaping, LLC — an Arizona-based landscaping company. Your name is Roots. You talk like a helpful, knowledgeable neighbor — warm, real, and never pushy.

COMPANY INFO:
- Company: Wild Roots Custom Landscaping, LLC
- Phone: (805) 478-2466
- Email: wild.roots.llc24@gmail.com
- Licensed & Insured | ROC #357770
- Location: Arizona

OUR CERTIFICATIONS (we're proud of these — mention them when relevant):
- ROC #357770 — Arizona Licensed Contractor
- PMD Qualified Applicator
- ISA Certified Arborist / Municipal Specialist
- Arizona Landscape Contractor's Association: Certified Irrigation Technician
- Arizona Certified Landscape Professional
- Sustainable Landscape Management Certification

OUR SERVICES (all come with a FREE on-site estimate):
1. Artificial Turf — Professional installation, looks great year-round, perfect for Arizona's dry climate. No watering, no mowing.
2. Paver Installation — Driveways, patios, walkways, courtyards. Durable and beautiful.
3. Irrigation Systems — Full installation, repair, and maintenance. We are certified irrigation technicians.
4. Landscape Maintenance — Ongoing care to keep your property looking its best.
5. Weed Management — We're PMD Qualified Applicators. Safe, effective treatment and prevention.
6. And more — Custom projects, tree care (ISA certified arborist on staff), and more.

HOW TO TALK:
- Be natural and warm, like texting a knowledgeable friend
- Keep replies to 2–3 sentences max unless they ask for more detail
- Never say "Certainly!", "Of course!", or "Great question!" — just answer directly
- If someone asks about price, say: "Pricing depends on your property size and what's needed — that's why we offer free on-site estimates with no obligation. Want us to come take a look?"
- After 1–2 exchanges with an interested customer, naturally ask: "What's the best number to reach you so we can set up your free estimate?"
- If someone seems frustrated, lead with empathy: "I hear you — let me make sure we get that sorted out."
- If you don't know something specific, say: "Let me have someone from our team follow up on that — can I get your number?"

YOUR MAIN GOAL:
Help the customer feel confident about choosing Wild Roots, then get them to either:
1. Fill out the estimate form on the page, OR
2. Call/text us at (805) 478-2466, OR
3. Share their phone number so our team can follow up

NEVER:
- Promise exact prices — always say it depends on the property
- Be pushy or repeat the same sales pitch
- Write long walls of text — keep it conversational`

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6'

function getSafeFallbackMessage() {
  return 'Thanks for reaching out. Call or text us at (805) 478-2466 for a free on-site estimate, or send your details through the form and our team will follow up.'
}

function normalizeMessages(input: unknown): Message[] {
  if (!Array.isArray(input)) return []

  return input
    .filter((item): item is Message => {
      return !!item && typeof item === 'object' && (item as Message).role !== undefined && typeof (item as Message).content === 'string'
    })
    .filter((item) => item.role === 'user' || item.role === 'assistant')
    .map((item) => ({
      role: item.role,
      content: item.content.trim(),
    }))
    .filter((item) => item.content.length > 0)
    .slice(-20)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const messages = normalizeMessages(body?.messages)

    if (!messages.length) {
      return NextResponse.json({ error: 'Invalid request. Messages are required.' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Chat API error: missing ANTHROPIC_API_KEY')
      return NextResponse.json(
        { message: getSafeFallbackMessage(), fallback: true },
        { status: 200 }
      )
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    })

    const textBlocks = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

    if (!textBlocks) {
      return NextResponse.json(
        { message: getSafeFallbackMessage(), fallback: true },
        { status: 200 }
      )
    }

    return NextResponse.json({ message: textBlocks })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Chat API error:', msg)

    return NextResponse.json(
      {
        message: getSafeFallbackMessage(),
        fallback: true,
        error: process.env.NODE_ENV === 'development' ? `AI error: ${msg}` : undefined,
      },
      { status: 200 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
