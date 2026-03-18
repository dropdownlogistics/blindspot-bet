"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SPORTS = ["NCAA Basketball", "MLB", "NFL", "NBA", "NHL", "NCAA Football"];
const BET_TYPES = ["Spread", "Moneyline", "Over/Under", "Prop", "Parlay", "Futures", "Live"];
const PLATFORMS = ["DraftKings", "FanDuel", "BetMGM", "Caesars", "Barstool", "PointsBet", "Other"];

function BetModal({ userId, tokenBalance, onClose, onSuccess }: {
  userId: string;
  tokenBalance: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<"form"|"confirm"|"done">("form");
  const [form, setForm] = useState({
    sport: "",
    betType: "",
    platform: "",
    oddsEntry: "",
    stakeTokens: "",
    contextNote: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const calcPayout = () => {
    const odds = parseInt(form.oddsEntry);
    const stake = parseInt(form.stakeTokens);
    if (isNaN(odds) || isNaN(stake)) return null;
    if (odds > 0) return Math.round(stake * (odds / 100));
    return Math.round(stake * (100 / Math.abs(odds)));
  };

  const canProceed = form.sport && form.betType && form.platform &&
    form.oddsEntry && form.stakeTokens && form.contextNote.length >= 3;

  const submit = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/bets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        sport: form.sport,
        betType: form.betType,
        platform: form.platform,
        oddsEntry: parseInt(form.oddsEntry),
        stakeTokens: parseInt(form.stakeTokens),
        contextNote: form.contextNote,
        betDate: new Date().toISOString(),
      }),
    });
    setLoading(false);
    if (res.ok) {
      setStep("done");
      setTimeout(() => { onSuccess(); onClose(); }, 1800);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  };

  const payout = calcPayout();
  const stake = parseInt(form.stakeTokens) || 0;

  return (
    <>
      <style>{`
        .modal-backdrop{position:fixed;inset:0;background:rgba(10,18,28,0.9);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:flex-end;justify-content:center;animation:fadeIn 0.2s ease}
        .modal-sheet{background:#0f2237;border:1px solid #1A3048;border-bottom:none;border-radius:16px 16px 0 0;padding:28px 28px 40px;width:100%;max-width:520px;animation:slideUp 0.3s ease;position:relative;overflow:hidden}
        .modal-sheet::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#22C55E,transparent)}
        .modal-handle{width:36px;height:3px;background:#1A3048;border-radius:2px;margin:0 auto 20px}
        .modal-title{font-size:16px;font-weight:700;letter-spacing:-0.01em;margin-bottom:4px}
        .modal-sub{font-family:'JetBrains Mono',monospace;font-size:10px;color:#6B8AA0;margin-bottom:24px}
        .field{margin-bottom:16px}
        .field-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:#6B8AA0;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:6px}
        .chip-row{display:flex;gap:6px;flex-wrap:wrap}
        .chip{font-family:'JetBrains Mono',monospace;font-size:10px;padding:7px 12px;border-radius:6px;border:1px solid #1A3048;background:#0a1a2e;color:#6B8AA0;cursor:pointer;transition:all 0.15s;white-space:nowrap}
        .chip.active{border-color:#22C55E;color:#22C55E;background:rgba(34,197,94,0.08)}
        .field-input{width:100%;background:#0a1a2e;border:1px solid #1A3048;border-radius:6px;padding:11px 14px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#E2E8F0;outline:none;transition:border-color 0.2s}
        .field-input:focus{border-color:#22C55E30}
        .field-input::placeholder{color:#2A4A60}
        .odds-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .payout-bar{background:#0a1a2e;border:1px solid #1A3048;border-radius:8px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
        .payout-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:#6B8AA0;letter-spacing:0.08em}
        .payout-val{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;color:#22C55E}
        .btn-submit{width:100%;background:#22C55E;color:#0D2137;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;padding:14px;border-radius:6px;border:none;cursor:pointer;transition:opacity 0.2s}
        .btn-submit:disabled{opacity:0.4;cursor:not-allowed}
        .btn-cancel{width:100%;background:transparent;border:none;font-family:'JetBrains Mono',monospace;font-size:11px;color:#2A4A60;padding:12px;cursor:pointer;margin-top:8px}
        .error-msg{font-family:'JetBrains Mono',monospace;font-size:11px;color:#EF4444;margin-top:8px;text-align:center}
        .done-state{text-align:center;padding:20px 0}
        .done-state .check{font-size:2.5rem;margin-bottom:12px}
        .done-state p{font-family:'JetBrains Mono',monospace;font-size:12px;color:#22C55E}
        .context-hint{font-family:'JetBrains Mono',monospace;font-size:9px;color:#2A4A60;margin-top:4px;line-height:1.5}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      `}</style>

      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-sheet" onClick={e => e.stopPropagation()}>
          <div className="modal-handle" />

          {step === "done" ? (
            <div className="done-state">
              <div className="check">✓</div>
              <p>Bet logged. signal → structure → edge</p>
            </div>
          ) : (
            <>
              <div className="modal-title">Log a Bet</div>
              <div className="modal-sub">Balance: {tokenBalance.toLocaleString()} tokens · stake deducted immediately</div>

              <div className="field">
                <div className="field-label">Sport</div>
                <div className="chip-row">
                  {SPORTS.map(s => (
                    <div key={s} className={`chip${form.sport === s ? " active" : ""}`} onClick={() => set("sport", s)}>{s}</div>
                  ))}
                </div>
              </div>

              <div className="field">
                <div className="field-label">Bet Type</div>
                <div className="chip-row">
                  {BET_TYPES.map(b => (
                    <div key={b} className={`chip${form.betType === b ? " active" : ""}`} onClick={() => set("betType", b)}>{b}</div>
                  ))}
                </div>
              </div>

              <div className="field">
                <div className="field-label">Platform</div>
                <div className="chip-row">
                  {PLATFORMS.map(p => (
                    <div key={p} className={`chip${form.platform === p ? " active" : ""}`} onClick={() => set("platform", p)}>{p}</div>
                  ))}
                </div>
              </div>

              <div className="odds-row">
                <div className="field">
                  <div className="field-label">Odds (American)</div>
                  <input className="field-input" type="number" placeholder="-110" value={form.oddsEntry}
                    onChange={e => set("oddsEntry", e.target.value)} />
                </div>
                <div className="field">
                  <div className="field-label">Stake (tokens)</div>
                  <input className="field-input" type="number" placeholder="100" value={form.stakeTokens}
                    onChange={e => set("stakeTokens", e.target.value)} />
                </div>
              </div>

              {payout !== null && stake > 0 && (
                <div className="payout-bar">
                  <div>
                    <div className="payout-label">Win payout</div>
                    <div className="payout-val">+{payout} tokens</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div className="payout-label">Risk</div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:"#EF4444"}}>-{stake} tokens</div>
                  </div>
                </div>
              )}

              <div className="field">
                <div className="field-label">Why this bet?</div>
                <input className="field-input" type="text" placeholder="e.g. Strong line value, injured starter, weather..."
                  value={form.contextNote} onChange={e => set("contextNote", e.target.value)} />
                <div className="context-hint">Required — this becomes your decision record. Be honest with yourself.</div>
              </div>

              {error && <div className="error-msg">{error}</div>}

              <button className="btn-submit" disabled={!canProceed || loading} onClick={submit}>
                {loading ? "Logging..." : "Log Bet →"}
              </button>
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (userId: string) => {
    const res = await fetch(`/api/user?userId=${userId}`);
    if (res.ok) {
      const data = await res.json();
      setUserData(data);
      setBets(data.bets || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoaded && !user) router.push("/sign-in");
    if (isLoaded && user) fetchData(user.id);
  }, [isLoaded, user]);

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
        :root{--bg:#0D2137;--surface:#0a1a2e;--card:#0f2237;--green:#22C55E;--green-light:#86EFAC;--text:#E2E8F0;--text-mid:#6B8AA0;--text-dim:#2A4A60;--border:#1A3048;--border-green:#22C55E30;--red:#EF4444}
        body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
        nav{position:sticky;top:0;z-index:100;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(12px);background:rgba(13,33,55,0.9);border-bottom:1px solid var(--border)}
        .logo{display:flex;align-items:center;gap:10px}
        .logo-mark{width:28px;height:28px;background:var(--card);border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-green)}
        .logo-text{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:0.05em}
        .logo-text strong{color:var(--green)}
        .nav-right{display:flex;align-items:center;gap:12px}
        .nav-email{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim)}
        .main{max-width:900px;margin:0 auto;padding:32px 24px 80px}
        .page-header{margin-bottom:28px}
        .page-eyebrow{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px}
        .page-title{font-size:1.6rem;font-weight:700;letter-spacing:-0.02em}
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px}
        .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:20px 18px}
        .stat-num{font-size:1.8rem;font-weight:700;letter-spacing:-0.04em;margin-bottom:4px}
        .stat-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-dim);letter-spacing:0.08em;text-transform:uppercase}
        .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
        .section-title{font-size:13px;font-weight:600;letter-spacing:-0.01em}
        .btn-log{background:var(--green);color:#0D2137;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;padding:10px 20px;border-radius:6px;border:none;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;display:flex;align-items:center;gap:6px}
        .btn-log:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(34,197,94,0.25)}
        .bets-table{background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden}
        .bet-row{display:grid;grid-template-columns:120px 100px 90px 80px 80px 80px;gap:0;padding:14px 18px;border-bottom:1px solid var(--border);align-items:center}
        .bet-row:last-child{border:none}
        .bet-row.header{background:var(--card);padding:10px 18px}
        .bet-col{font-family:'JetBrains Mono',monospace;font-size:10px}
        .bet-col.label{color:var(--text-dim);letter-spacing:0.08em;text-transform:uppercase;font-size:9px}
        .bet-col.sport{color:var(--text);font-size:11px;font-weight:600}
        .bet-col.type{color:var(--text-mid)}
        .bet-col.odds{color:var(--text-mid)}
        .bet-col.stake{color:var(--text-mid)}
        .bet-col.result.win{color:var(--green)}
        .bet-col.result.loss{color:var(--red)}
        .bet-col.result.open{color:var(--text-dim)}
        .net.win{color:var(--green)}
        .net.loss{color:var(--red)}
        .empty-state{padding:48px 24px;text-align:center}
        .empty-state p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-dim);line-height:1.8}
        .empty-state strong{color:var(--green)}
        .rebuy-btn{background:transparent;border:1px solid var(--border);color:var(--text-mid);font-family:'JetBrains Mono',monospace;font-size:10px;padding:6px 14px;border-radius:6px;cursor:pointer;transition:all 0.2s}
        .rebuy-btn:hover{border-color:var(--border-green);color:var(--green)}
        .balance-low{color:var(--red) !important}
        @media(max-width:640px){
          .stats-row{grid-template-columns:1fr 1fr}
          .bet-row{grid-template-columns:1fr 1fr 1fr;gap:8px}
          .bet-col.odds,.bet-col.stake{display:none}
        }
      `}</style>

      <nav>
        <div className="logo">
          <div className="logo-mark">
            <svg width="16" height="16" viewBox="0 0 26 26" fill="none">
              <path d="M9 3C9 3 17 7 17 10.5C17 14 9 16 9 19.5C9 23 17 24 17 24" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M17 3C17 3 9 7 9 10.5C9 14 17 16 17 19.5C17 23 9 24 9 24" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="10" y1="7.5" x2="16" y2="7.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="13" x2="16" y2="13" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="18.5" x2="16" y2="18.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="logo-text"><strong>blindspot</strong>.bet</div>
        </div>
        <div className="nav-right">
          <span className="nav-email">{user?.emailAddresses?.[0]?.emailAddress}</span>
          <a href="/" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"var(--text-dim)",textDecoration:"none"}}>← Home</a>
        </div>
      </nav>

      <div className="main">
        <div className="page-header">
          <div className="page-eyebrow">Dashboard · signal → structure → edge</div>
          <div className="page-title">Your blind spots, visible.</div>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className={`stat-num${balance < 100 ? " balance-low" : ""}`} style={{color: balance < 100 ? "var(--red)" : "var(--green)"}}>
              {balance.toLocaleString()}
            </div>
            <div className="stat-label">Token Balance</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{color:"var(--green-light)"}}>{stats?.winRate ?? "—"}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{color: parseFloat(stats?.roi) >= 0 ? "var(--green)" : "var(--red)"}}>
              {stats?.roi !== undefined ? `${parseFloat(stats.roi) >= 0 ? "+" : ""}${stats.roi}%` : "—"}
            </div>
            <div className="stat-label">ROI</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{color:"var(--text)"}}>{stats?.totalBets ?? 0}</div>
            <div className="stat-label">Bets Logged</div>
          </div>
        </div>

        <div className="section-header">
          <div className="section-title">Recent Bets</div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {balance < 200 && (
              <button className="rebuy-btn" onClick={async () => {
                await fetch("/api/rebuys", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({userId:user?.id, triggerContext:"Low balance rebuy"}) });
                fetchData(user!.id);
              }}>↺ Rebuy</button>
            )}
            <button className="btn-log" onClick={() => setShowModal(true)}>
              <span>+</span> Log Bet
            </button>
          </div>
        </div>

        <div className="bets-table">
          <div className="bet-row header">
            <div className="bet-col label">Sport</div>
            <div className="bet-col label">Type</div>
            <div className="bet-col label">Odds</div>
            <div className="bet-col label">Stake</div>
            <div className="bet-col label">Result</div>
            <div className="bet-col label">Net</div>
          </div>
          {bets.length === 0 ? (
            <div className="empty-state">
              <p>No bets logged yet.<br /><strong>Hit + Log Bet to start building your edge.</strong></p>
            </div>
          ) : bets.map((bet: any) => (
            <div key={bet.id} className="bet-row">
              <div className="bet-col sport">{bet.sport}</div>
              <div className="bet-col type">{bet.betType}</div>
              <div className="bet-col odds">{bet.oddsEntry > 0 ? `+${bet.oddsEntry}` : bet.oddsEntry}</div>
              <div className="bet-col stake">{bet.stakeTokens}</div>
              <div className={`bet-col result ${bet.result === "W" ? "win" : bet.result === "L" ? "loss" : "open"}`}>
                {bet.result ?? "Open"}
              </div>
              <div className={`bet-col net ${bet.netChange > 0 ? "win" : bet.netChange < 0 ? "loss" : ""}`}>
                {bet.netChange !== null ? `${bet.netChange > 0 ? "+" : ""}${bet.netChange}` : "—"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && user && (
        <BetModal
          userId={user.id}
          tokenBalance={balance}
          onClose={() => setShowModal(false)}
          onSuccess={() => fetchData(user.id)}
        />
      )}
    </>
  );
}
