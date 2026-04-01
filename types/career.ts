export type RoleLevel = "Entry" | "Mid-Level" | "Senior";
export type Archetype = "Battery Chemist" | "Battery Manufacturing" | "Battery Systems Engineer" | "Logistics/Supply Chain";

export interface RawRole {
  id: string;
  title: string;
  category: string;
  level: string;
  salary: string;
  description: string;
  education: string;
  skills: string;
  connections: string;
  trainings: string;
}

export interface RoleNode {
  id: string;
  title: string;
  category: string;
  level: RoleLevel;
  salary: string;
  description: string;
  education: string;
  skills: string[];
  connections: string[];
  trainings: string[];
  archetype: Archetype;
  tags: string[];
  unlockRequirements: {
    minSkills: number;
    minTrainings: number;
    priorRoles: number;
  };
}

export interface CareerState {
  selectedArchetype: Archetype | null;
  acquiredSkills: string[];
  completedTrainings: string[];
  unlockedRoleIds: string[];
}

export type UnlockState = "locked" | "available" | "unlocked";
