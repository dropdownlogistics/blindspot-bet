import { NextRequest, NextResponse } from 'next/server'

const SPORT_KEYS: Record<string, string> = {
  'NCAA Basketball': 'basketball_ncaab',
  'NBA': 'basketball_nba',
  'MLB': 'baseball_mlb',
  'NFL': 'americanfootball_nfl',
  'NHL': 'icehockey_nhl',
  'NCAA Football': 'americanfootball_ncaaf',
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sport = searchParams.get('sport') || 'NCAA Basketball'
  const sportKey = SPORT_KEYS[sport] || 'basketball_ncaab'

  const apiKey = process.env.ODDS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'No odds API key' }, { status: 500 })
  }

  try {
    const res = await fetch(
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${apiKey}&regions=us&markets=h2h,spreads&oddsFormat=american&dateFormat=iso`,
      { next: { revalidate: 300 } } // cache 5 minutes
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Odds API error', status: res.status }, { status: 502 })
    }

    const data = await res.json()

    // Shape the response — pull top 10 games with best lines
    const games = data.slice(0, 10).map((game: any) => {
      const dk = game.bookmakers?.find((b: any) => b.key === 'draftkings')
        || game.bookmakers?.find((b: any) => b.key === 'fanduel')
        || game.bookmakers?.[0]

      const spread = dk?.markets?.find((m: any) => m.key === 'spreads')
      const h2h = dk?.markets?.find((m: any) => m.key === 'h2h')

      return {
        id: game.id,
        sport: sport,
        home: game.home_team,
        away: game.away_team,
        commenceTime: game.commence_time,
        bookmaker: dk?.title || 'N/A',
        spread: spread ? {
          home: spread.outcomes?.find((o: any) => o.name === game.home_team),
          away: spread.outcomes?.find((o: any) => o.name === game.away_team),
        } : null,
        moneyline: h2h ? {
          home: h2h.outcomes?.find((o: any) => o.name === game.home_team),
          away: h2h.outcomes?.find((o: any) => o.name === game.away_team),
        } : null,
      }
    })

    return NextResponse.json({ sport, games })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch odds' }, { status: 500 })
  }
}
