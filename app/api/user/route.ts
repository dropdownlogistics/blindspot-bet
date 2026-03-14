import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Bet } from '@prisma/client'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      bets: { orderBy: { betDate: 'desc' }, take: 10 },
      rebuys: { orderBy: { createdAt: 'desc' } },
    }
  })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const settledBets = user.bets.filter((b: Bet) => b.result !== null)
  const wins = settledBets.filter((b: Bet) => b.result === 'W').length
  const totalStaked = settledBets.reduce((a: number, b: Bet) => a + b.stakeTokens, 0)
  const totalNetChange = settledBets.reduce((a: number, b: Bet) => a + (b.netChange ?? 0), 0)
  const roi = totalStaked > 0 ? ((totalNetChange / totalStaked) * 100).toFixed(2) : '0.00'

  return NextResponse.json({
    ...user,
    stats: {
      totalBets: settledBets.length,
      wins,
      losses: settledBets.length - wins,
      winRate: settledBets.length > 0 ? ((wins / settledBets.length) * 100).toFixed(1) : '0.0',
      roi,
      totalNetChange,
      rebuys: user.rebuys.length,
    }
  })
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

  const user = await prisma.user.create({
    data: { email, tokenBalance: 1000 }
  })
  return NextResponse.json(user, { status: 201 })
}