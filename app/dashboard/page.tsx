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
  if (h > 24) return `${Math.floor(h / 24)}d`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #060e14; color: #e8f0f7; font-family: 'Space Grotesk', sans-serif; min-height: 100vh; overflow-x: hidden; }

  @keyframes bs-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes bs-pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }
  @keyframes bs-pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(134,239,172,0.3)} 50%{box-shadow:0 0 0 6px rgba(134,239,172,0)} }
  @keyframes bs-fade-up { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes bs-slide-up { from{transform:translateY(100%)} to{transform:translateY(0)} }

  .bs-ticker-bar { background:rgba(134,239,172,0.04); border-bottom:1px solid #142334; overflow:hidden; padding:7px 0; position:relative; }
  .bs-ticker-bar::before, .bs-ticker-bar::after { content:''; position:absolute; top:0; bottom:0; width:60px; z-index:2; pointer-events:none; }
  .bs-ticker-bar::before { left:0; background:linear-gradient(90deg,#060e14,transparent); }
  .bs-ticker-bar::after { right:0; background:linear-gradient(-90deg,#060e14,transparent); }
  .bs-ticker-inner { display:flex; white-space:nowrap; width:max-content; animation:bs-ticker 40s linear infinite; }
  .bs-ticker-item { display:inline-flex; align-items:center; gap:8px; padding:0 24px; font-family:'JetBrains Mono',monospace; font-size:10px; border-right:1px solid #142334; }
  .bs-t-teams { color:#e8f0f7; font-weight:600; }
  .bs-t-up { color:#86EFAC; font-weight:700; }
  .bs-t-dn { color:#f87171; font-weight:700; }
  .bs-t-ml { color:rgba(232,240,247,0.3); }
  .bs-t-book { color:#3d6480; font-size:9px; }
  .bs-t-live { display:inline-flex; align-items:center; gap:4px; color:#86EFAC; font-size:8px; font-weight:700; letter-spacing:0.08em; }
  .bs-t-dot { width:5px; height:5px; border-radius:50%; background:#86EFAC; animation:bs-pulse-dot 1.4s ease infinite; display:inline-block; }

  .bs-nav { display:flex; align-items:center; justify-content:space-between; padding:0 28px; height:48px; border-bottom:1px solid #142334; background:rgba(10,22,34,0.9); backdrop-filter:blur(8px); position:sticky; top:0; z-index:100; }
  .bs-nav-brand { font-family:'JetBrains Mono',monospace; font-size:14px; font-weight:700; display:flex; align-items:center; gap:1px; }
  .bs-nav-links { display:flex; align-items:center; gap:24px; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.06em; text-transform:uppercase; }
  .bs-nav-link { color:#3d6480; text-decoration:none; cursor:pointer; }
  .bs-nav-link.active { color:#86EFAC; }

  .bs-main { max-width:1140px; margin:0 auto; padding:28px 24px 60px; }

  .bs-hero { position:relative; margin-bottom:28px; padding-bottom:28px; border-bottom:1px solid #142334; }
  .bs-hero::before { content:''; position:absolute; top:-60px; left:-100px; width:500px; height:300px; background:radial-gradient(ellipse,rgba(134,239,172,0.05) 0%,transparent 70%); pointer-events:none; }
  .bs-eyebrow { display:flex; align-items:center; gap:8px; margin-bottom:6px; font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#86EFAC; }
  .bs-eyebrow-dot { color:#3d6480; }
  .bs-title { font-size:28px; font-weight:800; color:#e8f0f7; line-height:1.15; }
  .bs-title em { font-style:normal; color:#86EFAC; }

  .bs-kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:28px; animation:bs-fade-up 0.5s ease both; }
  .bs-kpi-card { background:#0d1c2a; border:1px solid #142334; border-radius:10px; padding:18px 20px; position:relative; overflow:hidden; }
  .bs-kpi-card.highlight { border-color:rgba(134,239,172,0.2); background:linear-gradient(135deg,rgba(134,239,172,0.04),#0d1c2a); }
  .bs-kpi-card.highlight::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#86EFAC,transparent); }
  .bs-kpi-accent { width:24px; height:3px; border-radius:2px; margin-bottom:12px; }
  .bs-kpi-label { font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#3d6480; margin-bottom:6px; }
  .bs-kpi-value { font-size:32px; font-weight:800; line-height:1; margin-bottom:4px; }
  .bs-kpi-sub { font-family:'JetBrains Mono',monospace; font-size:9px; color:#3d6480; }

  .bs-quick-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:28px; }
  .bs-qs-card { background:#0d1c2a; border:1px solid #142334; border-radius:10px; padding:16px 20px; display:flex; align-items:center; gap:14px; }
  .bs-qs-icon { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
  .bs-qs-label { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:0.1em; color:#3d6480; text-transform:uppercase; margin-bottom:3px; }
  .bs-qs-value { font-size:18px; font-weight:700; color:#e8f0f7; }
  .bs-qs-sub { font-family:'JetBrains Mono',monospace; font-size:9px; color:#3d6480; margin-top:2px; }

  .bs-section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:10px; }
  .bs-section-title { font-size:14px; font-weight:700; color:#e8f0f7; display:flex; align-items:center; gap:8px; }
  .bs-section-count { font-family:'JetBrains Mono',monospace; font-size:9px; color:#3d6480; background:#0a1622; border:1px solid #142334; padding:2px 8px; border-radius:3px; }
  .bs-section-count.live { color:#86EFAC; border-color:rgba(134,239,172,0.2); background:rgba(134,239,172,0.06); }

  .bs-bet-log-wrap { background:#0d1c2a; border:1px solid #142334; border-radius:10px; overflow:hidden; margin-bottom:28px; }
  .bs-table-header { display:grid; grid-template-columns:140px 90px 70px 70px 70px 70px; padding:10px 20px; background:rgba(0,0,0,0.2); border-bottom:1px solid #142334; font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#3d6480; gap:8px; }
  .bs-bet-row { display:grid; grid-template-columns:140px 90px 70px 70px 70px 70px; padding:12px 20px; border-bottom:1px solid #0e1e2c; align-items:center; gap:8px; }
  .bs-bet-row:last-child { border-bottom:none; }
  .bs-bet-col { font-family:'JetBrains Mono',monospace; font-size:10px; color:#4a7a9b; }
  .bs-bet-col.sport { color:#e8f0f7; font-size:11px; font-weight:600; }
  .bs-bet-col.win { color:#86EFAC; }
  .bs-bet-col.loss { color:#f87171; }

  .bs-empty-state { padding:48px 24px; text-align:center; }
  .bs-empty-icon { width:48px; height:48px; border-radius:50%; background:rgba(134,239,172,0.06); border:1px solid rgba(134,239,172,0.15); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-size:20px; }
  .bs-empty-title { font-size:14px; font-weight:700; color:#e8f0f7; margin-bottom:6px; }
  .bs-empty-body { font-family:'JetBrains Mono',monospace; font-size:11px; color:#3d6480; margin-bottom:16px; }
  .bs-empty-body span { color:#86EFAC; }

  .bs-log-btn { display:inline-flex; align-items:center; gap:6px; background:#86EFAC; color:#060e14; border:none; border-radius:6px; padding:9px 18px; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; letter-spacing:0.04em; cursor:pointer; animation:bs-pulse-glow 2.5s ease infinite; }
  .bs-log-btn:hover { background:#4ADE80; }
  .bs-log-btn-sm { display:inline-flex; align-items:center; background:#86EFAC; color:#060e14; border:none; border-radius:4px; padding:6px 14px; font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; }
  .bs-rebuy-btn { background:transparent; border:1px solid #142334; color:#4a7a9b; font-family:'JetBrains Mono',monospace; font-size:10px; padding:6px 12px; border-radius:6px; cursor:pointer; }
  .bs-rebuy-btn:hover { border-color:rgba(134,239,172,0.3); color:#86EFAC; }

  .bs-sport-tabs { display:flex; gap:6px; flex-wrap:wrap; }
  .bs-sport-tab { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:600; letter-spacing:0.06em; padding:5px 10px; border-radius:4px; border:1px solid #142334; background:#0a1622; color:#3d6480; cursor:pointer; }
  .bs-sport-tab.active { background:rgba(134,239,172,0.1); border-color:rgba(134,239,172,0.3); color:#86EFAC; }

  .bs-lines-wrap { background:#0d1c2a; border:1px solid #142334; border-radius:10px; overflow:hidden; }
  .bs-lines-header { display:grid; grid-template-columns:1fr 110px 90px 90px 90px 70px; padding:10px 20px; background:rgba(0,0,0,0.25); border-bottom:1px solid #142334; font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#3d6480; gap:8px; }
  .bs-line-row { display:grid; grid-template-columns:1fr 110px 90px 90px 90px 70px; padding:13px 20px; border-bottom:1px solid #0e1e2c; gap:8px; align-items:center; cursor:pointer; transition:background 0.15s; }
  .bs-line-row:last-child { border-bottom:none; }
  .bs-line-row:hover { background:rgba(134,239,172,0.03); }
  .bs-matchup { font-size:13px; font-weight:600; color:#e8f0f7; display:flex; align-items:center; gap:8px; }
  .bs-matchup-sep { color:#3d6480; font-weight:300; }

  .bs-spread-badge { display:inline-flex; align-items:center; justify-content:center; padding:5px 10px; border-radius:5px; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; min-width:90px; }
  .bs-spread-badge.fav { background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.2); color:#f87171; }
  .bs-spread-badge.dog { background:rgba(134,239,172,0.08); border:1px solid rgba(134,239,172,0.2); color:#86EFAC; }

  .bs-ml { font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:600; }
  .bs-ml.pos { color:#86EFAC; }
  .bs-ml.neg { color:#f87171; }
  .bs-ml.dash { color:#3d6480; }
  .bs-book { font-family:'JetBrains Mono',monospace; font-size:10px; color:#3d6480; }

  .bs-time-badge { font-family:'JetBrains Mono',monospace; font-size:9px; display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:3px; }
  .bs-time-badge.live { background:rgba(134,239,172,0.1); border:1px solid rgba(134,239,172,0.2); color:#86EFAC; animation:bs-pulse-glow 2s ease infinite; }
  .bs-time-badge.upcoming { background:rgba(74,122,155,0.1); border:1px solid rgba(74,122,155,0.2); color:#4a7a9b; }
  .bs-time-dot { width:5px; height:5px; border-radius:50%; background:#86EFAC; animation:bs-pulse-dot 1.2s ease infinite; display:inline-block; }

  .bs-lines-footer { padding:10px 20px; background:rgba(0,0,0,0.15); border-top:1px solid #142334; font-family:'JetBrains Mono',monospace; font-size:9px; color:#3d6480; text-align:center; }
  .bs-lines-footer span { color:#86EFAC; }
  .bs-loading { min-height:100vh; background:#060e14; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:12px; color:#3d6480; letter-spacing:0.1em; }

  .bs-modal-backdrop { position:fixed; inset:0; background:rgba(6,14,20,0.92); backdrop-filter:blur(8px); z-index:9999; display:flex; align-items:flex-end; justify-content:center; }
  .bs-modal-sheet { background:#0f2237; border:1px solid #1A3048; border-bottom:none; border-radius:16px 16px 0 0; padding:24px 24px 40px; width:100%; max-width:540px; animation:bs-slide-up 0.3s ease; position:relative; overflow:hidden; max-height:90vh; overflow-y:auto; }
  .bs-modal-sheet::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#86EFAC,transparent); }
  .bs-modal-handle { width:36px; height:3px; background:#1A3048; border-radius:2px; margin:0 auto 18px; }
  .bs-modal-title { font-size:16px; font-weight:700; margin-bottom:3px; }
  .bs-modal-sub { font-family:'JetBrains Mono',monospace; font-size:10px; color:#3d6480; margin-bottom:20px; }
  .bs-field { margin-bottom:14px; }
  .bs-field-label { font-family:'JetBrains Mono',monospace; font-size:9px; color:#3d6480; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:6px; }
  .bs-chip-row { display:flex; gap:6px; flex-wrap:wrap; }
  .bs-chip { font-family:'JetBrains Mono',monospace; font-size:10px; padding:7px 11px; border-radius:6px; border:1px solid #1A3048; background:#0a1a2e; color:#3d6480; cursor:pointer; transition:all 0.15s; white-space:nowrap; }
  .bs-chip.active { border-color:#86EFAC; color:#86EFAC; background:rgba(134,239,172,0.08); }
  .bs-field-input { width:100%; background:#0a1a2e; border:1px solid #1A3048; border-radius:6px; padding:11px 14px; font-family:'JetBrains Mono',monospace; font-size:12px; color:#E2E8F0; outline:none; transition:border-color 0.2s; }
  .bs-field-input:focus { border-color:rgba(134,239,172,0.3); }
  .bs-field-input::placeholder { color:#2A4A60; }
  .bs-odds-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .bs-payout-bar { background:#0a1a2e; border:1px solid #1A3048; border-radius:8px; padding:12px 16px; display:flex; justify-content:space-between; margin-bottom:16px; }
  .bs-payout-label { font-family:'JetBrains Mono',monospace; font-size:9px; color:#3d6480; letter-spacing:0.08em; margin-bottom:3px; }
  .bs-payout-val { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:600; color:#86EFAC; }
  .bs-btn-submit { width:100%; background:#86EFAC; color:#060e14; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:12px; letter-spacing:0.06em; text-transform:uppercase; padding:14px; border-radius:6px; border:none; cursor:pointer; transition:opacity 0.2s; }
  .bs-btn-submit:disabled { opacity:0.4; cursor:not-allowed; }
  .bs-btn-cancel { width:100%; background:transparent; border:none; font-family:'JetBrains Mono',monospace; font-size:11px; color:#2A4A60; padding:10px; cursor:pointer; margin-top:6px; }
  .bs-error-msg { font-family:'JetBrains Mono',monospace; font-size:11px; color:#EF4444; margin-top:8px; text-align:center; }
  .bs-done-state { text-align:center; padding:24px 0; }
  .bs-done-check { font-size:2.5rem; margin-bottom:10px; }
  .bs-done-text { font-family:'JetBrains Mono',monospace; font-size:12px; color:#86EFAC; }
  .bs-context-hint { font-family:'JetBrains Mono',monospace; font-size:9px; color:#2A4A60; margin-top:4px; line-height:1.5; }

  @media(max-width:640px) {
    .bs-kpi-grid { grid-template-columns:1fr 1fr; }
    .bs-quick-stats { grid-template-columns:1fr; }
    .bs-table-header, .bs-bet-row { grid-template-columns:1fr 1fr 1fr; }
  }
`;

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
    <div className="bs-modal-backdrop" onClick={onClose}>
      <div className="bs-modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="bs-modal-handle" />
        {done ? (
          <div className="bs-done-state">
            <div className="bs-done-check">&#10003;</div>
            <div className="bs-done-text">Bet logged. signal &rarr; structure &rarr; edge</div>
          </div>
        ) : (
          <>
            <div className="bs-modal-title">Log a Bet</div>
            <div className="bs-modal-sub">Balance: {tokenBalance.toLocaleString()} tokens &middot; stake deducted immediately</div>
            <div className="bs-field">
              <div className="bs-field-label">Sport</div>
              <div className="bs-chip-row">{SPORTS.map(s => <div key={s} className={`bs-chip${form.sport === s ? " active" : ""}`} onClick={() => set("sport", s)}>{s}</div>)}</div>
            </div>
            <div className="bs-field">
              <div className="bs-field-label">Bet Type</div>
              <div className="bs-chip-row">{BET_TYPES.map(b => <div key={b} className={`bs-chip${form.betType === b ? " active" : ""}`} onClick={() => set("betType", b)}>{b}</div>)}</div>
            </div>
            <div className="bs-field">
              <div className="bs-field-label">Platform</div>
              <div className="bs-chip-row">{PLATFORMS.map(p => <div key={p} className={`bs-chip${form.platform === p ? " active" : ""}`} onClick={() => set("platform", p)}>{p}</div>)}</div>
            </div>
            <div className="bs-odds-row">
              <div className="bs-field">
                <div className="bs-field-label">Odds (American)</div>
                <input className="bs-field-input" type="number" placeholder="-110" value={form.oddsEntry} onChange={e => set("oddsEntry", e.target.value)} />
              </div>
              <div className="bs-field">
                <div className="bs-field-label">Stake (tokens)</div>
                <input className="bs-field-input" type="number" placeholder="100" value={form.stakeTokens} onChange={e => set("stakeTokens", e.target.value)} />
              </div>
            </div>
            {payout !== null && stake > 0 && (
              <div className="bs-payout-bar">
                <div><div className="bs-payout-label">Win payout</div><div className="bs-payout-val">+{payout} tokens</div></div>
                <div style={{ textAlign: "right" }}><div className="bs-payout-label">Risk</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#f87171" }}>-{stake} tokens</div></div>
              </div>
            )}
            <div className="bs-field">
              <div className="bs-field-label">Why this bet?</div>
              <input className="bs-field-input" type="text" placeholder="e.g. Strong line value, injured starter, weather..." value={form.contextNote} onChange={e => set("contextNote", e.target.value)} />
              <div className="bs-context-hint">Required &mdash; this becomes your decision record. Be honest with yourself.</div>
            </div>
            {error && <div className="bs-error-msg">{error}</div>}
            <button className="bs-btn-submit" disabled={!canProceed || loading} onClick={submit}>{loading ? "Logging..." : "Log Bet \u2192"}</button>
            <button className="bs-btn-cancel" onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

function TickerBar({ games }: { games: any[] }) {
  if (!games.length) return null;
  const items = [...games, ...games];
  return (
    <div className="bs-ticker-bar">
      <div className="bs-ticker-inner">
        {items.map((g: any, i: number) => {
          const spread = g.spread?.home?.point;
          const ml = g.moneyline?.home?.price;
          const isUp = spread !== undefined && spread > 0;
          const time = timeUntil(g.commenceTime);
          return (
            <div key={i} className="bs-ticker-item">
              <span className="bs-t-teams">{g.away} &middot; {g.home}</span>
              {spread !== undefined && (
                <span className={isUp ? "bs-t-up" : "bs-t-dn"}>{spread > 0 ? `+${spread}` : spread}</span>
              )}
              {ml !== undefined && <span className="bs-t-ml">{ml > 0 ? `+${ml}` : ml}</span>}
              <span className="bs-t-book">{g.bookmaker}</span>
              <span className="bs-t-live">
                <span className="bs-t-dot" />
                {time === "Live" ? "LIVE" : time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
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
    <div>
      <div className="bs-section-header">
        <div className="bs-section-title">
          Live Lines
          {games.length > 0 && <span className="bs-section-count live">&bull; {games.length} live</span>}
        </div>
        <div className="bs-sport-tabs">
          {SPORTS.map(s => (
            <button key={s} className={`bs-sport-tab${sport === s ? " active" : ""}`} onClick={() => setSport(s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="bs-lines-wrap">
        <div className="bs-lines-header">
          <span>Matchup</span><span>Spread</span><span>ML Home</span><span>ML Away</span><span>Book</span><span>Time</span>
        </div>
        {loading ? (
          <div style={{ padding: "32px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#3d6480" }}>Loading lines...</div>
        ) : error ? (
          <div style={{ padding: "32px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#f87171" }}>{error}</div>
        ) : games.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#3d6480" }}>No games scheduled</div>
        ) : (
          <>
            {games.map((game: any) => {
              const spread = game.spread?.home?.point;
              const isFav = spread !== undefined && spread < 0;
              const time = timeUntil(game.commenceTime);
              return (
                <div key={game.id} className="bs-line-row" onClick={() => game.spread?.home && onBetClick(String(game.spread.home.price), sport)}>
                  <div className="bs-matchup">{game.away} <span className="bs-matchup-sep">@</span> {game.home}</div>
                  <div>
                    {spread !== undefined ? (
                      <span className={`bs-spread-badge ${isFav ? "fav" : "dog"}`}>
                        {formatSpread(spread)} ({game.spread?.home?.price > 0 ? `+${game.spread.home.price}` : game.spread?.home?.price})
                      </span>
                    ) : <span className="bs-ml dash">-</span>}
                  </div>
                  <div>
                    {game.moneyline?.home ? (
                      <span className={`bs-ml ${game.moneyline.home.price > 0 ? "pos" : "neg"}`}>{formatOdds(game.moneyline.home.price)}</span>
                    ) : <span className="bs-ml dash">-</span>}
                  </div>
                  <div>
                    {game.moneyline?.away ? (
                      <span className={`bs-ml ${game.moneyline.away.price > 0 ? "pos" : "neg"}`}>{formatOdds(game.moneyline.away.price)}</span>
                    ) : <span className="bs-ml dash">-</span>}
                  </div>
                  <div className="bs-book">{game.bookmaker}</div>
                  <div>
                    <span className={`bs-time-badge ${time === "Live" ? "live" : "upcoming"}`}>
                      {time === "Live" && <span className="bs-time-dot" />}
                      {time}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div className="bs-lines-footer">
          Click any line to pre-fill odds in bet log &middot; Refreshes every 5 minutes &middot; <span>Powered by The Odds API</span>
        </div>
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
  const [prefill, setPrefill] = useState<{ odds: string; sport: string } | undefined>();
  const [tickerGames, setTickerGames] = useState<any[]>([]);

  const fetchData = useCallback(async (userId: string) => {
    const res = await fetch(`/api/user?userId=${userId}`);
    if (res.ok) { const d = await res.json(); setUserData(d); setBets(d.bets || []); }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoaded && !user) router.push("/sign-in");
    if (isLoaded && user) fetchData(user.id);
  }, [isLoaded, user, fetchData]);

  useEffect(() => {
    fetch(`/api/odds?sport=NCAA%20Basketball`)
      .then(r => r.json())
      .then(d => setTickerGames(d.games || []))
      .catch(() => {});
  }, []);

  const handleBetClick = (odds: string, sport: string) => {
    setPrefill({ odds, sport });
    setShowModal(true);
  };

  if (!isLoaded || loading) return <div className="bs-loading">Loading...</div>;

  const stats = userData?.stats;
  const balance = userData?.tokenBalance ?? 1000;

  return (
    <>
      <style>{CSS}</style>

      <TickerBar games={tickerGames} />

      <nav className="bs-nav">
        <div className="bs-nav-brand">
          <span style={{ color: "#86EFAC" }}>$</span>
          <span>&nbsp;blindspot</span>
          <span style={{ color: "#86EFAC" }}>.</span>
          <span>bet</span>
        </div>
        <div className="bs-nav-links">
          <a className="bs-nav-link active">Dashboard</a>
          <a href="/analytics" className="bs-nav-link">Analytics</a>
          <a href="/" className="bs-nav-link">Help</a>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#3d6480" }}>
            {user?.emailAddresses?.[0]?.emailAddress}
          </span>
          <button className="bs-log-btn-sm" onClick={() => { setPrefill(undefined); setShowModal(true); }}>+ Log Bet</button>
        </div>
      </nav>

      <main className="bs-main">

        <div className="bs-hero">
          <div className="bs-eyebrow">
            <span>Dashboard</span><span className="bs-eyebrow-dot">&middot;</span>
            <span>Signal</span><span className="bs-eyebrow-dot">&middot;</span>
            <span>Structure</span><span className="bs-eyebrow-dot">&middot;</span>
            <span>Edge</span>
          </div>
          <h1 className="bs-title">Your blind spots, <em>visible.</em></h1>
        </div>

        <div className="bs-kpi-grid">
          <div className="bs-kpi-card highlight">
            <div className="bs-kpi-accent" style={{ background: "#86EFAC" }} />
            <div className="bs-kpi-label">Token Balance</div>
            <div className="bs-kpi-value" style={{ color: balance < 200 ? "#f87171" : "#86EFAC" }}>{balance.toLocaleString()}</div>
            <div className="bs-kpi-sub">Starting bankroll</div>
          </div>
          <div className="bs-kpi-card">
            <div className="bs-kpi-accent" style={{ background: "#3d6480" }} />
            <div className="bs-kpi-label">Win Rate</div>
            <div className="bs-kpi-value" style={{ color: "#e8f0f7" }}>{stats?.winRate ?? "-"}%</div>
            <div className="bs-kpi-sub">No bets logged yet</div>
          </div>
          <div className="bs-kpi-card">
            <div className="bs-kpi-accent" style={{ background: "#3d6480" }} />
            <div className="bs-kpi-label">ROI</div>
            <div className="bs-kpi-value" style={{ color: stats?.roi !== undefined ? (parseFloat(stats.roi) >= 0 ? "#86EFAC" : "#f87171") : "#e8f0f7" }}>
              {stats?.roi !== undefined ? `${parseFloat(stats.roi) >= 0 ? "+" : ""}${stats.roi}%` : "-"}
            </div>
            <div className="bs-kpi-sub">Requires 5+ bets</div>
          </div>
          <div className="bs-kpi-card">
            <div className="bs-kpi-accent" style={{ background: "#3d6480" }} />
            <div className="bs-kpi-label">Bets Logged</div>
            <div className="bs-kpi-value" style={{ color: "#e8f0f7" }}>{stats?.totalBets ?? 0}</div>
            <div className="bs-kpi-sub">Start building your edge</div>
          </div>
        </div>

        <div className="bs-quick-stats">
          <div className="bs-qs-card">
            <div className="bs-qs-icon" style={{ background: "rgba(134,239,172,0.08)", border: "1px solid rgba(134,239,172,0.15)" }}>&#128202;</div>
            <div>
              <div className="bs-qs-label">Tilt Score</div>
              <div className="bs-qs-value">-</div>
              <div className="bs-qs-sub">Available after 10 bets</div>
            </div>
          </div>
          <div className="bs-qs-card">
            <div className="bs-qs-icon" style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.15)" }}>&#127919;</div>
            <div>
              <div className="bs-qs-label">Best Sport</div>
              <div className="bs-qs-value">-</div>
              <div className="bs-qs-sub">Log 3+ bets per sport</div>
            </div>
          </div>
          <div className="bs-qs-card">
            <div className="bs-qs-icon" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}>&#9889;</div>
            <div>
              <div className="bs-qs-label">Live Edge</div>
              <div className="bs-qs-value">-</div>
              <div className="bs-qs-sub">Tracks your +EV patterns</div>
            </div>
          </div>
        </div>

        <div className="bs-section-header">
          <div className="bs-section-title">
            Recent Bets
            <span className="bs-section-count">{bets.length} logged</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {balance < 200 && (
              <button className="bs-rebuy-btn" onClick={async () => {
                await fetch("/api/rebuys", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user?.id, triggerContext: "Low balance rebuy" }) });
                fetchData(user!.id);
              }}>&#8635; Rebuy</button>
            )}
            <button className="bs-log-btn" onClick={() => { setPrefill(undefined); setShowModal(true); }}>+ Log Bet</button>
          </div>
        </div>

        <div className="bs-bet-log-wrap">
          <div className="bs-table-header">
            <span>Sport</span><span>Type</span><span>Odds</span><span>Stake</span><span>Result</span><span>Net</span>
          </div>
          {bets.length === 0 ? (
            <div className="bs-empty-state">
              <div className="bs-empty-icon">&#128203;</div>
              <div className="bs-empty-title">No bets logged yet.</div>
              <div className="bs-empty-body">Hit <span>+ Log Bet</span> to start building your edge.</div>
              <button className="bs-log-btn" onClick={() => { setPrefill(undefined); setShowModal(true); }}>+ Log Bet</button>
            </div>
          ) : bets.map((bet: any) => (
            <div key={bet.id} className="bs-bet-row">
              <div className="bs-bet-col sport">{bet.sport}</div>
              <div className="bs-bet-col">{bet.betType}</div>
              <div className="bs-bet-col">{bet.oddsEntry > 0 ? `+${bet.oddsEntry}` : bet.oddsEntry}</div>
              <div className="bs-bet-col">{bet.stakeTokens}</div>
              <div className={`bs-bet-col ${bet.result === "W" ? "win" : bet.result === "L" ? "loss" : ""}`}>{bet.result ?? "Open"}</div>
              <div className={`bs-bet-col ${bet.netChange > 0 ? "win" : bet.netChange < 0 ? "loss" : ""}`}>
                {bet.netChange !== null ? `${bet.netChange > 0 ? "+" : ""}${bet.netChange}` : "-"}
              </div>
            </div>
          ))}
        </div>

        <LiveLines onBetClick={handleBetClick} />

      </main>

      {showModal && user && (
        <BetModal
          userId={user.id}
          tokenBalance={balance}
          onClose={() => { setShowModal(false); setPrefill(undefined); }}
          onSuccess={() => fetchData(user.id)}
          prefill={prefill}
        />
      )}
    </>
  );
}
