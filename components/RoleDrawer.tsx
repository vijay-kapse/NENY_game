"use client";

import { readinessScore } from "@/lib/unlockEngine";
import { CareerState, RoleNode } from "@/types/career";

export function RoleDrawer({ role, state, roles, onUnlock }: { role: RoleNode | null; state: CareerState; roles: RoleNode[]; onUnlock: (r: RoleNode) => void }) {
  if (!role) return <aside className="panel p-4 text-sm text-slate-400">Select a role node to inspect unlock path and pivots.</aside>;
  const score = readinessScore(role, state, roles);
  const related = roles.filter((r) => role.connections.includes(r.id));
  const pivots = related.filter((r) => r.archetype !== role.archetype);
  return (
    <aside className="panel h-full space-y-3 p-4 text-sm">
      <h3 className="text-lg font-semibold text-rune">{role.title}</h3>
      <p>{role.category} · {role.level} · {role.salary}</p>
      <p className="text-slate-300">{role.description}</p>
      <p className="text-xs text-slate-400">Education: {role.education}</p>
      <p><b>Readiness:</b> {score}%</p>
      <div><b>Required / Related Skills</b><ul className="ml-4 list-disc">{role.skills.slice(0,8).map((s)=><li key={s}>{s}</li>)}</ul></div>
      <div><b>Recommended Trainings</b><ul className="ml-4 list-disc">{role.trainings.map((t)=><li key={t}>{t}</li>)}</ul></div>
      <div><b>Next transitions</b><ul className="ml-4 list-disc">{related.map((r)=><li key={r.id}>{r.title}</li>)}</ul></div>
      <div><b>Cross-lane pivots</b><ul className="ml-4 list-disc">{pivots.map((r)=><li key={r.id}>{r.title} ({r.archetype})</li>)}</ul></div>
      <p className="text-xs text-slate-400"><b>Why this role fits:</b> It aligns to {role.archetype} by category and skill signature heuristics.</p>
      <button onClick={() => onUnlock(role)} className="w-full rounded-lg bg-rune/20 px-3 py-2 text-rune hover:bg-rune/30">Unlock path</button>
    </aside>
  );
}
