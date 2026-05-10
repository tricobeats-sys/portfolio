"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = { onHome?: () => void };

export default function Navbar({ onHome }: Props) {
  const [homHov, setHomHov] = useState(false);
  const [cvHov,  setCvHov]  = useState(false);
  const glow = "rgba(14,128,69,0.6)";

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{ padding: "28px 40px" }}
    >
      {/* Home icon button */}
      <button
        onClick={onHome}
        aria-label="Startseite"
        onMouseEnter={() => setHomHov(true)}
        onMouseLeave={() => setHomHov(false)}
        style={{
          width: 44, height: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: 12, cursor: "pointer",
          background: "rgba(255,255,255,0.04)",
          color: homHov ? "#fff" : "rgba(255,255,255,0.55)",
          border: `1px solid ${glow}`,
          boxShadow: homHov
            ? `0 0 14px ${glow}, 0 0 40px rgba(14,128,69,0.4), inset 0 0 10px rgba(14,128,69,0.4)`
            : `0 0 8px rgba(14,128,69,0.4), 0 0 20px rgba(14,128,69,0.4)`,
          transition: "all 0.2s",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
      </button>

      {/* CV Download */}
      <a
        href="/cv.pdf"
        download="Mike_Hammer_Lebenslauf.pdf"
        onMouseEnter={() => setCvHov(true)}
        onMouseLeave={() => setCvHov(false)}
        style={{
          height: 44, padding: "0 18px",
          display: "inline-flex", alignItems: "center", gap: 8,
          borderRadius: 12, cursor: "pointer", textDecoration: "none",
          fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
          background: "rgba(255,255,255,0.04)",
          color: cvHov ? "#fff" : "rgba(255,255,255,0.55)",
          border: `1px solid ${glow}`,
          boxShadow: cvHov
            ? `0 0 14px ${glow}, 0 0 40px rgba(14,128,69,0.4), inset 0 0 10px rgba(14,128,69,0.4)`
            : `0 0 8px rgba(14,128,69,0.4), 0 0 20px rgba(14,128,69,0.4)`,
          transition: "all 0.2s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v13M7 11l5 5 5-5" />
          <path d="M5 19h14" />
        </svg>
        Lebenslauf
      </a>
    </motion.div>
  );
}
