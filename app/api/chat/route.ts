import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BOOKING_LINK = 'https://calendly.com/wild-roots-custom/30min'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

function normalizeMessages(input: unknown): Message[] {
  if (!Array.isArray(input)) return []

  return input
    .filter((item) => {
      return !!item && typeof item === 'object' && typeof (item as { content?: unknown }).content === 'string'
    })
    .map((item) => {
      const source = item as { role?: unknown; content: string }
      const role: Message['role'] = source.role === 'assistant' ? 'assistant' : 'user'

      return {
        role,
        content: source.content.trim(),
      }
    })
    .filter((item) => item.content.length > 0)
    .slice(-12)
}

function getLastUserMessage(messages: Message[]) {
  return [...messages].reverse().find((message) => message.role === 'user')?.content.toLowerCase() || ''
}

function buildReply(text: string) {
  if (text.includes('price') || text.includes('cost') || text.includes('estimate') || text.includes('quote') || text.includes('how much')) {
    return `Please book a consultation so the Wild Roots team can review your project details. Booking link: ${BOOKING_LINK}`
  }

  if (text.includes('book') || text.includes('schedule') || text.includes('appointment') || text.includes('consultation')) {
    return `You can book a Wild Roots consultation here: ${BOOKING_LINK}. Please include your name, phone number, city, and a short description of your outdoor project.`
  }

  if (text.includes('turf') || text.includes('grass')) {
    return 'Artificial turf is a low-maintenance option for outdoor areas. Wild Roots can help with turf areas, layout planning, and clean installation guidance. To move forward, please share your city, yard size, and project goal.'
  }

  if (text.includes('paver') || text.includes('patio') || text.includes('driveway') || text.includes('walkway')) {
    return 'Pavers work well for patios, walkways, driveways, and courtyard areas. Wild Roots can help review layout, access, drainage, and design needs. Please share your city, project area, and preferred timeline.'
  }

  if (text.includes('irrigation') || text.includes('water') || text.includes('drip') || text.includes('sprinkler')) {
    return 'Irrigation support can include installation, repair, water efficiency, and system checks. Wild Roots can help review plant needs, coverage, and controller setup. Please share your city and what issue you are noticing.'
  }

  if (text.includes('plant') || text.includes('tree') || text.includes('cleanup') || text.includes('yard')) {
    return 'Wild Roots can help with planting, tree care, cleanup, and seasonal refresh work. A good next step is to describe what you want changed, what is currently in the yard, and your city.'
  }

  if (text.includes('service') || text.includes('offer') || text.includes('do you do')) {
    return `Wild Roots services include artificial turf, pavers, irrigation, landscape maintenance, planting, tree care, cleanup, and custom landscape design. To choose the best service, share your city, project goal, and what you want improved.`
  }

  return `I can help with turf, pavers, irrigation, landscape maintenance, planting, tree care, cleanup, custom design, and booking. Tell me what you want to improve, your city, and your project timeline. Booking link: ${BOOKING_LINK}`
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const messages = normalizeMessages(body?.messages)
  const lastUserMessage = getLastUserMessage(messages)

  return NextResponse.json({ message: buildReply(lastUserMessage) })
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
