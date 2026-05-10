"use client";

import dynamic from "next/dynamic";

const GermanyMapLeaflet = dynamic(() => import("./GermanyMapLeaflet"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", background: "#07090f" }} />,
});

interface GermanyMapProps {
  accent?: string;
}

export default function GermanyMap({ accent = "#4ade80" }: GermanyMapProps) {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <GermanyMapLeaflet accent={accent} />
    </div>
  );
}
