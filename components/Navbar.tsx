"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = { onHome?: () => void };

const GLOW = "rgba(14,128,69,0.6)";
const GLOW_SOFT = "rgba(14,128,69,0.4)";

function NavButton({
  href, download, label, icon,
}: {
  href: string; download: string; label: string; icon: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      download={download}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: 44, padding: "0 18px",
        display: "inline-flex", alignItems: "center", gap: 8,
        borderRadius: 12, cursor: "pointer", textDecoration: "none",
        fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
        background: "rgba(255,255,255,0.04)",
        color: hov ? "#fff" : "rgba(255,255,255,0.55)",
        border: "1px solid " + GLOW,
        boxShadow: hov
          ? "0 0 14px " + GLOW + ", 0 0 40px " + GLOW_SOFT + ", inset 0 0 10px " + GLOW_SOFT
          : "0 0 8px " + GLOW_SOFT + ", 0 0 20px " + GLOW_SOFT,
        transition: "all 0.2s",
      }}
    >
      {icon}
      {label}
    </a>
  );
}

const DownloadIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v13M7 11l5 5 5-5" />
    <path d="M5 19h14" />
  </svg>
);

export default function Navbar({ onHome }: Props) {
  const [homHov, setHomHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{ padding: "20px 20px" }}
    >
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
          border: "1px solid " + GLOW,
          boxShadow: homHov
            ? "0 0 14px " + GLOW + ", 0 0 40px " + GLOW_SOFT + ", inset 0 0 10px " + GLOW_SOFT
            : "0 0 8px " + GLOW_SOFT + ", 0 0 20px " + GLOW_SOFT,
          transition: "all 0.2s",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <NavButton
          href="/Zwischenzeugnis.pdf"
          download="Mike_Hammer_Zwischenzeugnis.pdf"
          label="Zwischenzeugnis"
          icon={DownloadIcon}
        />
        <NavButton
          href="/cv.pdf"
          download="Mike_Hammer_Lebenslauf.pdf"
          label="Lebenslauf"
          icon={DownloadIcon}
        />
      </div>
    </motion.div>
  );
}
