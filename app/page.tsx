"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import LandingScreen from "@/components/LandingScreen";
import TunnelExperience from "@/components/TunnelExperience";
import { Track } from "@/data/slides";

export default function Home() {
  const [track, setTrack] = useState<Track | null>(null);

  return (
    <main className="relative h-screen w-screen overflow-hidden" style={{ background: "#07090f" }}>

      {track !== null && <Navbar onHome={() => setTrack(null)} />}

      <AnimatePresence>
        {track === null && (
          <motion.div
            key="landing"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <LandingScreen onChoose={setTrack} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {track !== null && (
          <motion.div
            key={`experience-${track}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <TunnelExperience
              track={track}
              onSwitch={() => setTrack(track === "achievements" ? "goals" : "achievements")}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
