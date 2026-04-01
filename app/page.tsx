"use client";

import { useMemo, useState } from "react";
import { ClassSelection } from "@/components/ClassSelection";
import { CareerHUD } from "@/components/CareerHUD";
import { RoleDrawer } from "@/components/RoleDrawer";
import { SkillTreeGraph } from "@/components/SkillTreeGraph";
import { normalizeRoles } from "@/lib/normalization";
import { useCareerState } from "@/hooks/useCareerState";
import { RoleNode } from "@/types/career";

export default function HomePage() {
  const roles = useMemo(() => normalizeRoles(), []);
  const { state, selectArchetype, unlockRole, profile } = useCareerState(roles);
  const [selectedRole, setSelectedRole] = useState<RoleNode | null>(null);
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  if (!state.selectedArchetype) return <ClassSelection onSelect={selectArchetype} />;

  const filtered = roles.filter(
    (r) => (levelFilter === "all" || r.level === levelFilter) && (categoryFilter === "all" || r.category === categoryFilter)
  );

  return (
    <main className="min-h-screen p-4 md:p-6">
      <header className="mb-4 flex items-center justify-between panel p-4">
        <div>
          <h1 className="text-2xl font-semibold text-rune">Battery Career RPG</h1>
          <p className="text-sm text-slate-300">Recommended path active: {state.selectedArchetype}</p>
        </div>
        <p className="text-xs text-slate-400">Entry → Mid-Level → Senior progression map</p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[280px_1fr_330px]">
        <CareerHUD state={state} xp={profile.xp} band={profile.band} roles={roles} setLevel={setLevelFilter} setCategory={setCategoryFilter} />
        <SkillTreeGraph roles={filtered} state={state} onSelect={setSelectedRole} />
        <RoleDrawer role={selectedRole} state={state} roles={roles} onUnlock={unlockRole} />
      </section>
    </main>
  );
}
