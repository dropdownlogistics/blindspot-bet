"use client";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SPORTS = ["NCAA Basketball", "MLB", "NFL", "NBA", "NHL", "NCAA Football"];
const BET_TYPES = ["Spread", "Moneyline", "Over/Under", "Prop", "Parlay", "Futures", "Live"];
const PLATFORMS = ["DraftKings", "FanDuel", "BetMGM", "Caesars", "Barstool", "PointsBet", "Other"];

function formatOdds(n: number) { return n > 0 ? `+${n}` : `${n}`; }
function formatSpread(n: number) { return n > 0 ? `+${n}` : `${n}`; }
function timeUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff < 0) return "Live";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h > 24) return `${Math.floor(h/24)}d`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function BetModal({ userId, tokenBalance, onClose, onSuccess, prefill }: {
  userId: string; tokenBalance: number;
  onClose: () => void; onSuccess: () => void;
  prefill?: { odds: string; sport: string };
}) {
  const [form, setForm] = useState({
    sport: prefill?.sport || "", betType: "", platform: "",
    oddsEntry: prefill?.odds || "", stakeTokens: "", contextNote: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const calcPayout = () => {
    const odds = parseInt(form.oddsEntry), stake = parseInt(form.stakeTokens);
    if (isNaN(odds) || isNaN(stake)) return null;
    return odds > 0 ? Math.round(stake * (odds / 100)) : Math.round(stake * (100 / Math.abs(odds)));
  };

  const canProceed = form.sport && form.betType && form.platform &&
    form.oddsEntry && form.stakeTokens && form.contextNote.length >= 3;

  const submit = async () => {
    setLoading(true); setError("");
    const res = await fetch("/api/bets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId, sport: form.sport, betType: form.betType, platform: form.platform,
        oddsEntry: parseInt(form.oddsEntry), stakeTokens: parseInt(form.stakeTokens),
        contextNote: form.contextNote, betDate: new Date().toISOString(),
      }),
    });
    setLoading(false);
    if (res.ok) { setDone(true); setTimeout(() => { onSuccess(); onClose(); }, 1800); }
    else { const d = await res.json(); setError(d.error || "Something went wrong"); }
  };

  const payout = calcPayout();
  const stake = parseInt(form.stakeTokens) || 0;

  return (
    <>
      <style>{`
        .modal-backdrop{position:fixed;inset:0;background:rgba(10,18,28,0.92);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:flex-end;justify-content:center;animation:fadeIn 0.2s ease}
        .modal-sheet{background:#0f2237;border:1px solid #1A3048;border-bottom:none;border-radius:16px 16px 0 0;padding:24px 24px 40px;width:100%;max-width:540px;animation:slideUp 0.3s ease;position:relative;overflow:hidden;max-height:90vh;overflow-y:auto}
        .modal-sheet::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#22C55E,transparent)}
        .modal-handle{width:36px;height:3px;background:#1A3048;border-radius:2px;margin:0 auto 18px}
        .modal-title{font-size:16px;font-weight:700;letter-spacing:-0.01em;margin-bottom:3px}
        .modal-sub{font-family:'JetBrains Mono',monospace;font-size:10px;color:#6B8AA0;margin-bottom:20px}
        .field{margin-bottom:14px}
        .field-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:#6B8AA0;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:6px}
        .chip-row{display:flex;gap:6px;flex-wrap:wrap}
        .chip{font-family:'JetBrains Mono',monospace;font-size:10px;padding:7px 11px;border-radius:6px;border:1px solid #1A3048;background:#0a1a2e;color:#6B8AA0;cursor:pointer;transition:all 0.15s;white-space:nowrap}
        .chip.active{border-color:#22C55E;color:#22C55E;background:rgba(34,197,94,0.08)}
        .field-input{width:100%;background:#0a1a2e;border:1px solid #1A3048;border-radius:6px;padding:11px 14px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#E2E8F0;outline:none;transition:border-color 0.2s}
        .field-input:focus{border-color:rgba(34,197,94,0.3)}
        .field-input::placeholder{color:#2A4A60}
        .odds-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .payout-bar{background:#0a1a2e;border:1px solid #1A3048;border-radius:8px;padding:12px 16px;display:flex;justify-content:space-between;margin-bottom:16px}
        .payout-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:#6B8AA0;letter-spacing:0.08em;margin-bottom:3px}
        .payout-val{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;color:#22C55E}
        .btn-submit{width:100%;background:#22C55E;color:#0D2137;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;padding:14px;border-radius:6px;border:none;cursor:pointer;transition:opacity 0.2s}
        .btn-submit:disabled{opacity:0.4;cursor:not-allowed}
        .btn-cancel{width:100%;background:transparent;border:none;font-family:'JetBrains Mono',monospace;font-size:11px;color:#2A4A60;padding:10px;cursor:pointer;margin-top:6px}
        .error-msg{font-family:'JetBrains Mono',monospace;font-size:11px;color:#EF4444;margin-top:8px;text-align:center}
        .done-state{text-align:center;padding:24px 0}
        .done-check{font-size:2.5rem;margin-bottom:10px}
        .done-text{font-family:'JetBrains Mono',monospace;font-size:12px;color:#22C55E}
        .context-hint{font-family:'JetBrains Mono',monospace;font-size:9px;color:#2A4A60;margin-top:4px;line-height:1.5}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      `}</style>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-sheet" onClick={e => e.stopPropagation()}>
          <div className="modal-handle" />
          {done ? (
            <div className="done-state">
              <div className="done-check">✓</div>
              <div className="done-text">Bet logged. signal → structure → edge</div>
            </div>
          ) : (
            <>
              <div className="modal-title">Log a Bet</div>
              <div className="modal-sub">Balance: {tokenBalance.toLocaleString()} tokens · stake deducted immediately</div>
              <div className="field">
                <div className="field-label">Sport</div>
                <div className="chip-row">{SPORTS.map(s => <div key={s} className={`chip${form.sport===s?" active":""}`} onClick={()=>set("sport",s)}>{s}</div>)}</div>
              </div>
              <div className="field">
                <div className="field-label">Bet Type</div>
                <div className="chip-row">{BET_TYPES.map(b => <div key={b} className={`chip${form.betType===b?" active":""}`} onClick={()=>set("betType",b)}>{b}</div>)}</div>
              </div>
              <div className="field">
                <div className="field-label">Platform</div>
                <div className="chip-row">{PLATFORMS.map(p => <div key={p} className={`chip${form.platform===p?" active":""}`} onClick={()=>set("platform",p)}>{p}</div>)}</div>
              </div>
              <div className="odds-row">
                <div className="field">
                  <div className="field-label">Odds (American)</div>
                  <input className="field-input" type="number" placeholder="-110" value={form.oddsEntry} onChange={e=>set("oddsEntry",e.target.value)} />
                </div>
                <div className="field">
                  <div className="field-label">Stake (tokens)</div>
                  <input className="field-input" type="number" placeholder="100" value={form.stakeTokens} onChange={e=>set("stakeTokens",e.target.value)} />
                </div>
              </div>
              {payout !== null && stake > 0 && (
                <div className="payout-bar">
                  <div><div className="payout-label">Win payout</div><div className="payout-val">+{payout} tokens</div></div>
                  <div style={{textAlign:"right"}}><div className="payout-label">Risk</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:"#EF4444"}}>-{stake} tokens</div></div>
                </div>
              )}
              <div className="field">
                <div className="field-label">Why this bet?</div>
                <input className="field-input" type="text" placeholder="e.g. Strong line value, injured starter, weather..." value={form.contextNote} onChange={e=>set("contextNote",e.target.value)} />
                <div className="context-hint">Required — this becomes your decision record. Be honest with yourself.</div>
              </div>
              {error && <div className="error-msg">{error}</div>}
              <button className="btn-submit" disabled={!canProceed||loading} onClick={submit}>{loading?"Logging...":"Log Bet →"}</button>
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function LiveLines({ onBetClick }: { onBetClick: (odds: string, sport: string) => void }) {
  const [sport, setSport] = useState("NCAA Basketball");
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true); setError("");
    fetch(`/api/odds?sport=${encodeURIComponent(sport)}`)
      .then(r => r.json())
      .then(d => { setGames(d.games || []); setLoading(false); })
      .catch(() => { setError("Could not load lines"); setLoading(false); });
  }, [sport]);

  return (
    <div style={{marginTop:28}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <div style={{fontSize:13,fontWeight:600,letterSpacing:"-0.01em"}}>Live Lines</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {SPORTS.map(s => (
            <button key={s} onClick={()=>setSport(s)} style={{
              fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",padding:"5px 10px",
              borderRadius:6,border:`1px solid ${sport===s?"#22C55E":"#1A3048"}`,
              background:sport===s?"rgba(34,197,94,0.08)":"#0a1a2e",
              color:sport===s?"#22C55E":"#6B8AA0",cursor:"pointer",letterSpacing:"0.06em",
            }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{background:"#0a1a2e",border:"1px solid #1A3048",borderRadius:10,overflow:"hidden"}}>
        {loading ? (
          <div style={{padding:"32px",textAlign:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#2A4A60"}}>Loading lines...</div>
        ) : error ? (
          <div style={{padding:"32px",textAlign:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#EF4444"}}>{error}</div>
        ) : games.length === 0 ? (
          <div style={{padding:"32px",textAlign:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#2A4A60"}}>No games scheduled</div>
        ) : (
          <div>
            {/* Header */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 80px 80px 80px 80px 60px",gap:0,padding:"10px 18px",background:"#0f2237",borderBottom:"1px solid #1A3048"}}>
              {["Matchup","Spread","ML Home","ML Away","Book","Time"].map(h => (
                <div key={h} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#2A4A60",letterSpacing:"0.1em",textTransform:"uppercase"}}>{h}</div>
              ))}
            </div>
            {games.map((game: any) => (
              <div key={game.id} style={{display:"grid",gridTemplateColumns:"1fr 80px 80px 80px 80px 60px",gap:0,padding:"14px 18px",borderBottom:"1px solid #1A3048",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:"#E2E8F0",marginBottom:2}}>{game.away} <span style={{color:"#2A4A60",fontWeight:400}}>@</span> {game.home}</div>
                </div>
                <div>
                  {game.spread?.home ? (
                    <button onClick={()=>onBetClick(String(game.spread.home.price), sport)} style={{
                      fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#22C55E",
                      background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",
                      borderRadius:4,padding:"3px 8px",cursor:"pointer",display:"block",marginBottom:3,
                    }}>
                      {formatSpread(game.spread.home.point)} ({formatOdds(game.spread.home.price)})
                    </button>
                  ) : <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#2A4A60"}}>—</span>}
                </div>
                <div>
                  {game.moneyline?.home ? (
                    <button onClick={()=>onBetClick(String(game.moneyline.home.price), sport)} style={{
                      fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#E2E8F0",
                      background:"#0f2237",border:"1px solid #1A3048",borderRadius:4,
                      padding:"3px 8px",cursor:"pointer",
                    }}>{formatOdds(game.moneyline.home.price)}</button>
                  ) : <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#2A4A60"}}>—</span>}
                </div>
                <div>
                  {game.moneyline?.away ? (
                    <button onClick={()=>onBetClick(String(game.moneyline.away.price), sport)} style={{
                      fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#E2E8F0",
                      background:"#0f2237",border:"1px solid #1A3048",borderRadius:4,
                      padding:"3px 8px",cursor:"pointer",
                    }}>{formatOdds(game.moneyline.away.price)}</button>
                  ) : <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#2A4A60"}}>—</span>}
                </div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6B8AA0"}}>{game.bookmaker}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#2A4A60"}}>{timeUntil(game.commenceTime)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#2A4A60",marginTop:8,letterSpacing:"0.06em"}}>
        Click any line to pre-fill odds in bet log · Refreshes every 5 minutes · Powered by The Odds API
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [prefill, setPrefill] = useState<{odds:string;sport:string}|undefined>();

  const fetchData = useCallback(async (userId: string) => {
    const res = await fetch(`/api/user?userId=${userId}`);
    if (res.ok) { const d = await res.json(); setUserData(d); setBets(d.bets || []); }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoaded && !user) router.push("/sign-in");
    if (isLoaded && user) fetchData(user.id);
  }, [isLoaded, user, fetchData]);

  const handleBetClick = (odds: string, sport: string) => {
    setPrefill({ odds, sport });
    setShowModal(true);
  };

  if (!isLoaded || loading) return (
    <div style={{minHeight:"100vh",background:"#0D2137",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#2A4A60",letterSpacing:"0.1em"}}>Loading...</div>
    </div>
  );

  const stats = userData?.stats;
  const balance = userData?.tokenBalance ?? 1000;

  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        .glow-orb{position:fixed;border-radius:50%;filter:blur(140px);pointer-events:none;z-index:0}
        .glow-1{width:700px;height:700px;background:radial-gradient(circle,rgba(34,197,94,0.05) 0%,transparent 70%);top:-200px;right:-200px}
        .glow-2{width:500px;height:500px;background:radial-gradient(circle,rgba(134,239,172,0.03) 0%,transparent 70%);bottom:0;left:-200px}
        .main{position:relative;z-index:1}
        body{font-family:'Space Grotesk',sans-serif;background:#0D2137;color:#E2E8F0;min-height:100vh}
        nav{position:sticky;top:0;z-index:100;padding:14px 24px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(12px);background:rgba(13,33,55,0.92);border-bottom:1px solid #1A3048}
        .logo{display:flex;align-items:center;gap:10px}
        .logo-mark{width:26px;height:26px;background:#0f2237;border-radius:5px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(34,197,94,0.2)}
        .logo-text{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:0.05em;color:#E2E8F0}
        .logo-text strong{color:#22C55E}
        .main{max-width:1200px;margin:0 auto;padding:28px 32px 80px}
        .page-eyebrow{font-family:'JetBrains Mono',monospace;font-size:9px;color:#22C55E;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px}
        .page-title{font-size:1.5rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:24px}
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px}
        .stat-card{background:#0a1a2e;border:1px solid #1A3048;border-radius:10px;padding:18px 16px}
        .stat-num{font-size:1.7rem;font-weight:700;letter-spacing:-0.04em;margin-bottom:4px}
        .stat-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:#2A4A60;letter-spacing:0.08em;text-transform:uppercase}
        .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
        .section-title{font-size:13px;font-weight:600;letter-spacing:-0.01em}
        .btn-log{background:#22C55E;color:#0D2137;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;padding:9px 18px;border-radius:6px;border:none;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s}
        .btn-log:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(34,197,94,0.25)}
        .bets-table{background:#0a1a2e;border:1px solid #1A3048;border-radius:10px;overflow:hidden}
        .bet-row{display:grid;grid-template-columns:140px 90px 70px 70px 70px 70px;padding:12px 18px;border-bottom:1px solid #1A3048;align-items:center}
        .bet-row:last-child{border:none}
        .bet-row.header{background:#0f2237;padding:9px 18px}
        .bet-col{font-family:'JetBrains Mono',monospace;font-size:10px;color:#6B8AA0}
        .bet-col.label{color:#2A4A60;font-size:9px;letter-spacing:0.08em;text-transform:uppercase}
        .bet-col.sport{color:#E2E8F0;font-size:11px;font-weight:600}
        .win{color:#22C55E}.loss{color:#EF4444}.open{color:#2A4A60}
        .rebuy-btn{background:transparent;border:1px solid #1A3048;color:#6B8AA0;font-family:'JetBrains Mono',monospace;font-size:10px;padding:6px 12px;border-radius:6px;cursor:pointer;transition:all 0.2s}
        .rebuy-btn:hover{border-color:rgba(34,197,94,0.3);color:#22C55E}
        .empty-state{padding:40px 24px;text-align:center}
        .empty-state p{font-family:'JetBrains Mono',monospace;font-size:11px;color:#2A4A60;line-height:1.8}
        .empty-state strong{color:#22C55E}
        @media(max-width:640px){
          .stats-row{grid-template-columns:1fr 1fr}
          .bet-row{grid-template-columns:1fr 1fr 1fr}
          .bet-col.odds,.bet-col.stake{display:none}
        }
      `}</style>

      <nav>
        <div className="logo">
          <div className="logo-mark">
            <svg width="14" height="14" viewBox="0 0 26 26" fill="none">
              <path d="M9 3C9 3 17 7 17 10.5C17 14 9 16 9 19.5C9 23 17 24 17 24" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M17 3C17 3 9 7 9 10.5C9 14 17 16 17 19.5C17 23 9 24 9 24" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="10" y1="7.5" x2="16" y2="7.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="13" x2="16" y2="13" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="18.5" x2="16" y2="18.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="logo-text"><strong>blindspot</strong>.bet</div>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#2A4A60"}}>{user?.emailAddresses?.[0]?.emailAddress}</span>
          <a href="/analytics" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#22C55E",textDecoration:"none",letterSpacing:"0.06em"}}>Analytics</a>
          <a href="/" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#2A4A60",textDecoration:"none"}}>← Home</a>
        </div>
      </nav>

      <div className="glow-orb glow-1" />
      <div className="glow-orb glow-2" />
      <div className="main">
        <div className="page-eyebrow">Dashboard · signal → structure → edge</div>
        <div className="page-title">Your blind spots, visible.</div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num" style={{color:balance<200?"#EF4444":"#22C55E"}}>{balance.toLocaleString()}</div>
            <div className="stat-label">Token Balance</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{color:"#86EFAC"}}>{stats?.winRate ?? "—"}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{color:parseFloat(stats?.roi)>=0?"#22C55E":"#EF4444"}}>
              {stats?.roi !== undefined ? `${parseFloat(stats.roi)>=0?"+":""}${stats.roi}%` : "—"}
            </div>
            <div className="stat-label">ROI</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{color:"#E2E8F0"}}>{stats?.totalBets ?? 0}</div>
            <div className="stat-label">Bets Logged</div>
          </div>
        </div>

        <div className="section-header">
          <div className="section-title">Recent Bets</div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {balance < 200 && (
              <button className="rebuy-btn" onClick={async()=>{
                await fetch("/api/rebuys",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:user?.id,triggerContext:"Low balance rebuy"})});
                fetchData(user!.id);
              }}>↺ Rebuy</button>
            )}
            <button className="btn-log" onClick={()=>{setPrefill(undefined);setShowModal(true);}}>+ Log Bet</button>
          </div>
        </div>

        <div className="bets-table">
          <div className="bet-row header">
            {["Sport","Type","Odds","Stake","Result","Net"].map(h=>(
              <div key={h} className="bet-col label">{h}</div>
            ))}
          </div>
          {bets.length === 0 ? (
            <div className="empty-state">
              <p>No bets logged yet.<br /><strong>Hit + Log Bet to start building your edge.</strong></p>
            </div>
          ) : bets.map((bet:any) => (
            <div key={bet.id} className="bet-row">
              <div className="bet-col sport">{bet.sport}</div>
              <div className="bet-col">{bet.betType}</div>
              <div className="bet-col">{bet.oddsEntry>0?`+${bet.oddsEntry}`:bet.oddsEntry}</div>
              <div className="bet-col">{bet.stakeTokens}</div>
              <div className={`bet-col ${bet.result==="W"?"win":bet.result==="L"?"loss":"open"}`}>{bet.result??"Open"}</div>
              <div className={`bet-col ${bet.netChange>0?"win":bet.netChange<0?"loss":""}`}>
                {bet.netChange!==null?`${bet.netChange>0?"+":""}${bet.netChange}`:"—"}
              </div>
            </div>
          ))}
        </div>

        <LiveLines onBetClick={handleBetClick} />
      </div>

      {showModal && user && (
        <BetModal userId={user.id} tokenBalance={balance}
          onClose={()=>{setShowModal(false);setPrefill(undefined);}}
          onSuccess={()=>fetchData(user.id)}
          prefill={prefill} />
      )}
    </>
  );
}
