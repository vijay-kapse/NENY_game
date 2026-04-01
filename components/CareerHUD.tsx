"use client";

import { CareerState, RoleNode } from "@/types/career";

export function CareerHUD({ state, xp, band, roles, setLevel, setCategory }: { state: CareerState; xp: number; band: string; roles: RoleNode[]; setLevel: (v: string) => void; setCategory: (v: string)=>void }) {
  return (
    <section className="panel space-y-3 p-4">
      <p className="text-xs uppercase tracking-widest text-slate-400">Player Profile</p>
      <h3 className="text-xl text-rune">{state.selectedArchetype}</h3>
      <p>XP: <b>{xp}</b></p>
      <p>Current band: <b>{band}</b></p>
      <p>Unlocked roles: <b>{state.unlockedRoleIds.length}</b></p>
      <div className="space-y-2">
        <p className="text-xs text-slate-400">Filters</p>
        <select onChange={(e) => setLevel(e.target.value)} className="w-full rounded bg-slate-800 p-2">
          <option value="all">All levels</option>
          <option>Entry</option>
          <option>Mid-Level</option>
          <option>Senior</option>
        </select>
        <select onChange={(e) => setCategory(e.target.value)} className="w-full rounded bg-slate-800 p-2">
          <option value="all">All categories</option>
          {[...new Set(roles.map((r)=>r.category))].map((c)=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="rounded border border-slate-700 p-2 text-xs text-slate-400">Legend: cyan border = recommended lane, animated lines = progression edges, unlock states shown on node badges.</div>
    </section>
  );
}
