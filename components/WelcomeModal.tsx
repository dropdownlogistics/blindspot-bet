"use client";
import { useState, useEffect } from "react";

export function WelcomeModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("bs_welcomed");
      if (!seen) setVisible(true);
    } catch {
      // localStorage unavailable — skip modal
    }
  }, []);

  const dismiss = () => {
    try { localStorage.setItem("bs_welcomed", "1"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        .modal-backdrop{position:fixed;inset:0;background:rgba(10,18,28,0.88);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn 0.3s ease}
        .modal-card{background:#0f2237;border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:44px 40px;max-width:480px;width:100%;position:relative;overflow:hidden;animation:slideUp 0.35s ease}
        .modal-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#22C55E,transparent)}
        .modal-eyebrow{font-family:'JetBrains Mono',monospace;font-size:9px;color:#22C55E;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:20px;opacity:0.8}
        .modal-title{font-family:'Space Grotesk',sans-serif;font-size:1.4rem;font-weight:700;letter-spacing:-0.02em;color:#E2E8F0;margin-bottom:20px}
        .modal-body{font-family:'Source Serif 4',serif;font-size:0.95rem;font-style:italic;color:#6B8AA0;line-height:1.9;margin-bottom:16px}
        .modal-body strong{color:#E2E8F0;font-style:normal}
        .modal-helpline{background:#0a1a2e;border:1px solid rgba(34,197,94,0.15);border-radius:8px;padding:14px 18px;margin:20px 0 28px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .modal-helpline-text{font-family:'JetBrains Mono',monospace;font-size:10px;color:#6B8AA0;line-height:1.6}
        .modal-helpline-num{color:#22C55E;font-size:12px;font-weight:600;display:block;margin-top:2px}
        .modal-helpline-link{font-family:'JetBrains Mono',monospace;font-size:10px;color:#22C55E;opacity:0.7;white-space:nowrap}
        .modal-helpline-link:hover{opacity:1}
        .modal-actions{display:flex;gap:12px;align-items:center}
        .modal-btn-primary{background:#22C55E;color:#0D2137;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;padding:12px 28px;border-radius:6px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;flex:1}
        .modal-btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(34,197,94,0.25)}
        .modal-btn-secondary{font-family:'JetBrains Mono',monospace;font-size:11px;color:#2A4A60;background:none;border:none;cursor:pointer;padding:12px 8px;transition:color 0.2s;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center}
        .modal-btn-secondary:hover{color:#6B8AA0}
        .modal-sig{font-family:'JetBrains Mono',monospace;font-size:10px;color:#2A4A60;margin-top:20px;padding-top:16px;border-top:1px solid #1A3048}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:520px){.modal-card{padding:32px 24px}.modal-helpline{flex-direction:column}.modal-actions{flex-direction:column}}
      `}</style>
      <div className="modal-backdrop" onClick={dismiss}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
          <div className="modal-eyebrow">Before you start</div>
          <div className="modal-title">A word from the guy who built this.</div>
          <p className="modal-body">
            I built blindspot.bet because I wanted a tool that helps people <strong>see their patterns more clearly.</strong> That&apos;s the whole thing.
          </p>
          <p className="modal-body">
            I know what it looks like when something useful becomes something else. I didn&apos;t build this to be a gateway to that. If betting has already crossed a line — this tool isn&apos;t what you need right now.
          </p>
          <div className="modal-helpline">
            <div className="modal-helpline-text">
              National Problem Gambling Helpline
              <span className="modal-helpline-num">1-800-522-4700</span>
              24/7 · Free · Confidential
            </div>
            <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="modal-helpline-link">ncpgambling.org →</a>
          </div>
          <div className="modal-actions">
            <button className="modal-btn-primary" onClick={dismiss}>
              I&apos;m here to get sharper →
            </button>
            <a href="/governance" className="modal-btn-secondary">
              Read the full framework
            </a>
          </div>
          <div className="modal-sig">— Dave · blindspot.bet · signal → structure → edge</div>
        </div>
      </div>
    </>
  );
}
