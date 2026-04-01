"use client";

import { useEffect, useMemo, useState } from "react";
import { Archetype, CareerState, RoleNode } from "@/types/career";
import { getStartingState, unlockStateForRole, xpFromState } from "@/lib/unlockEngine";

const STORAGE_KEY = "battery-career-rpg-state";

export function useCareerState(roles: RoleNode[]) {
  const [state, setState] = useState<CareerState>({
    selectedArchetype: null,
    acquiredSkills: [],
    completedTrainings: [],
    unlockedRoleIds: [],
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) setState(JSON.parse(raw));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectArchetype = (archetype: Archetype) => setState(getStartingState(archetype));
  const unlockRole = (role: RoleNode) => {
    const current = unlockStateForRole(role, state, roles);
    if (current !== "available") return;
    setState((prev) => ({
      ...prev,
      unlockedRoleIds: [...new Set([...prev.unlockedRoleIds, role.id])],
      acquiredSkills: [...new Set([...prev.acquiredSkills, ...role.skills.slice(0, 3)])],
      completedTrainings: [...new Set([...prev.completedTrainings, ...role.trainings.slice(0, 1)])],
    }));
  };

  const profile = useMemo(() => {
    const xp = xpFromState(state);
    const band = xp < 500 ? "Entry" : xp < 1200 ? "Mid-Level" : "Senior";
    return { xp, band };
  }, [state]);

  return { state, selectArchetype, unlockRole, profile, setState };
}
