import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  const bets = await prisma.bet.findMany({
    where: { userId },
    orderBy: { betDate: 'desc' },
  })
  return NextResponse.json(bets)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    userId, betDate, sport, betType, platform,
    oddsEntry, stakeTokens, contextNote, parlayId, isLeg
  } = body

  if (!userId || !sport || !betType || !platform || !oddsEntry || !stakeTokens) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  if (user.tokenBalance < stakeTokens) {
    return NextResponse.json({ error: 'Insufficient token balance' }, { status: 400 })
  }

  const bet = await prisma.bet.create({
    data: {
      userId,
      betDate: betDate ? new Date(betDate) : new Date(),
      sport,
      betType,
      platform,
      oddsEntry,
      stakeTokens,
      contextNote,
      parlayId,
      isLeg: isLeg ?? false,
    }
  })

  await prisma.user.update({
    where: { id: userId },
    data: { tokenBalance: { decrement: stakeTokens } }
  })

  return NextResponse.json(bet, { status: 201 })
}