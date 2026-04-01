"use client";

import { motion } from "framer-motion";
import { Archetype } from "@/types/career";

const classes: { archetype: Archetype; flavor: string; strengths: string; targets: string }[] = [
  {
    archetype: "Battery Chemist",
    flavor: "Master the hidden reactions of materials and turn lab insight into breakthrough cell performance.",
    strengths: "R&D, characterization, electrochemistry",
    targets: "Cell Test Engineer, Senior Electrochemist, Principal Materials Scientist",
  },
  {
    archetype: "Battery Manufacturing",
    flavor: "Forge the production line. Optimize yield, quality, and reliability at industrial scale.",
    strengths: "Process control, operations, quality flow",
    targets: "Manufacturing Engineer, Plant Operations Lead, Program Manager",
  },
  {
    archetype: "Battery Systems Engineer",
    flavor: "Architect entire battery systems from requirements through integration, controls, and deployment.",
    strengths: "Pack design, BMS, integration",
    targets: "Battery Systems Engineer, BMS Controls Engineer, BESS Integration Architect",
  },
];

export function ClassSelection({ onSelect }: { onSelect: (a: Archetype) => void }) {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold tracking-tight text-rune">Battery Career RPG</h1>
        <p className="mt-3 text-lg text-slate-300">A fantasy-industrial progression map for battery careers</p>
        <h2 className="mt-10 text-2xl font-semibold">Choose Your Path</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {classes.map((c, i) => (
            <motion.article
              key={c.archetype}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="panel flex flex-col gap-4 p-5 shadow-glow"
            >
              <h3 className="text-xl font-semibold text-rune">{c.archetype}</h3>
              <p className="text-sm text-slate-300">{c.flavor}</p>
              <p className="text-xs text-slate-400"><b>Core strengths:</b> {c.strengths}</p>
              <p className="text-xs text-slate-400"><b>Target roles:</b> {c.targets}</p>
              <button onClick={() => onSelect(c.archetype)} className="mt-auto rounded-lg bg-rune/20 px-4 py-2 text-rune hover:bg-rune/30">
                Begin Path
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
