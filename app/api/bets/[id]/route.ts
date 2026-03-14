import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { result, exitValue, fullPayoutValue } = await req.json()
  const bet = await prisma.bet.findUnique({ where: { id } })
  if (!bet) return NextResponse.json({ error: 'Bet not found' }, { status: 404 })

  let netChange = 0
  if (result === 'W') {
    const odds = bet.oddsEntry
    netChange = odds > 0
      ? Math.round(bet.stakeTokens * (odds / 100))
      : Math.round(bet.stakeTokens * (100 / Math.abs(odds)))
  } else if (result === 'L') {
    netChange = -bet.stakeTokens
  } else if (result === 'CASHOUT' && exitValue) {
    netChange = exitValue - bet.stakeTokens
  }

  const user = await prisma.user.findUnique({ where: { id: bet.userId } })
  const tokenBalanceAfter = (user?.tokenBalance ?? 0) + netChange + bet.stakeTokens

  const updated = await prisma.bet.update({
    where: { id },
    data: { result, netChange, tokenBalanceAfter, exitValue, fullPayoutValue }
  })

  await prisma.user.update({
    where: { id: bet.userId },
    data: { tokenBalance: tokenBalanceAfter }
  })

  return NextResponse.json(updated)
}