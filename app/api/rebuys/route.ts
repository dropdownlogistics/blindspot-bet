import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  const rebuys = await prisma.rebuy.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(rebuys)
}

export async function POST(req: NextRequest) {
  const { userId, triggerContext } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const rebuy = await prisma.rebuy.create({
    data: {
      userId,
      priorBalance: user.tokenBalance,
      tokensReceived: 1000,
      triggerContext,
    }
  })

  await prisma.user.update({
    where: { id: userId },
    data: { tokenBalance: 1000 }
  })

  return NextResponse.json(rebuy, { status: 201 })
}