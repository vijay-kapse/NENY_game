import { Archetype, CareerState, RoleNode, UnlockState } from "@/types/career";
import { STARTING_SKILLS } from "@/data/skillCatalog";

export const getStartingState = (archetype: Archetype): CareerState => {
  const base = archetype === "Logistics/Supply Chain" ? [] : [...STARTING_SKILLS[archetype]];
  return {
    selectedArchetype: archetype,
    acquiredSkills: base,
    completedTrainings: [],
    unlockedRoleIds: [],
  };
};

export const readinessScore = (role: RoleNode, state: CareerState, allRoles: RoleNode[]) => {
  const matchedSkills = role.skills.filter((skill) => state.acquiredSkills.includes(skill)).length;
  const matchedTrainings = role.trainings.filter((training) => state.completedTrainings.includes(training)).length;
  const priorUnlocked = allRoles
    .filter((r) => r.connections.includes(role.id) || role.connections.includes(r.id))
    .filter((r) => state.unlockedRoleIds.includes(r.id)).length;

  const skillScore = Math.min(matchedSkills / Math.max(role.unlockRequirements.minSkills, 1), 1) * 50;
  const trainingScore = Math.min(matchedTrainings / Math.max(role.unlockRequirements.minTrainings, 1), 1) * 25;
  const roleScore = Math.min(priorUnlocked / Math.max(role.unlockRequirements.priorRoles, 1), 1) * 25;

  const laneBoost = state.selectedArchetype && role.archetype === state.selectedArchetype ? 8 : 0;
  return Math.min(100, Math.round(skillScore + trainingScore + roleScore + laneBoost));
};

export const unlockStateForRole = (role: RoleNode, state: CareerState, allRoles: RoleNode[]): UnlockState => {
  if (state.unlockedRoleIds.includes(role.id)) return "unlocked";
  const score = readinessScore(role, state, allRoles);
  if (score >= 70) return "available";
  return "locked";
};

export const xpFromState = (state: CareerState) =>
  state.unlockedRoleIds.length * 140 + state.acquiredSkills.length * 20 + state.completedTrainings.length * 45;
