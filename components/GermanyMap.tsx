"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./GermanyMapLeaflet"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", background: "#0d1117" }} />,
});

export default function GermanyMap({ accent = "#4ade80" }: { accent?: string }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 50% 50%, black 35%, transparent 75%)",
      maskImage:        "radial-gradient(ellipse 65% 70% at 50% 50%, black 35%, transparent 75%)",
    }}>
      <LeafletMap accent={accent} />
    </div>
  );
}
