import { RAW_ROLES } from "@/data/roles";
import { SKILL_CLUSTERS } from "@/data/skillCatalog";
import { Archetype, RawRole, RoleLevel, RoleNode } from "@/types/career";

const splitField = (value: string) =>
  value
    .split(/[;,]/)
    .map((v) => v.trim())
    .filter(Boolean);

const levelNormalize = (lvl: string): RoleLevel => {
  if (lvl.toLowerCase().includes("senior")) return "Senior";
  if (lvl.toLowerCase().includes("mid")) return "Mid-Level";
  return "Entry";
};

const includesAny = (haystack: string, needles: string[]) => needles.some((n) => haystack.includes(n));

export const mapArchetype = (role: RawRole): Archetype => {
  const blob = `${role.title} ${role.category} ${role.description} ${role.skills}`.toLowerCase();

  // Heuristic mapping for MVP onboarding lanes.
  if (includesAny(blob, ["supply", "logistics", "transport", "inventory", "shipping"])) return "Logistics/Supply Chain";
  if (includesAny(blob, ["chemist", "electrochem", "materials", "lab", "characterization", "r&d", "validation"])) return "Battery Chemist";
  if (includesAny(blob, ["manufacturing", "process", "assembly", "plant", "operations", "maintenance", "quality technician"])) return "Battery Manufacturing";
  return "Battery Systems Engineer";
};

const keywordToCluster: Record<string, string> = {
  safety: "Safety, Handling & Storage (Batteries)",
  electrochemistry: "LIB & Cell Fundamentals",
  fundamentals: "Energy Storage Systems Fundamentals",
  welding: "Welding / Machine Tooling",
  hydrogen: "Hydrogen Fuel Cell Overview",
  transport: "Transport Regulations for Batteries",
  technician: "Technician & Basic Lab Skills",
  assembly: "Cell & Pack Assembly",
  production: "Manufacturing Cell/Pack Production",
  manufacturing: "Manufacturing Operations",
  diagnostics: "Testing & Diagnostics",
  characterization: "Cell Testing & Characterization",
  prototype: "Prototype Support & Engineering Validation",
  test: "Lab & Test Engineering",
  standards: "Codes, Standards & Certification",
  quality: "Quality & Compliance",
  reliability: "Maintenance & Reliability Engineering",
  pfmea: "PFMEA & Process Risk Analysis",
  leadership: "Project Management & Leadership for Energy Storage Projects",
  materials: "Materials & Components R&D for Batteries",
  emerging: "Emerging Storage Technologies",
  systems: "Systems Engineering",
  requirements: "Battery Systems Engineering & Requirements / Integration",
  pack: "Pack Design",
  bms: "BMS & Power Electronics",
  thermal: "Thermal Management, Modeling & Analysis",
  vehicle: "Vehicle Integration Considerations",
  grid: "BESS Design & Grid/System Integration",
};

export const normalizeRoles = (): RoleNode[] => {
  return RAW_ROLES.map((r) => {
    const rawSkills = splitField(r.skills);
    const trainings = splitField(r.trainings);
    const tokenBlob = `${r.title} ${r.category} ${r.description} ${r.skills} ${r.trainings}`.toLowerCase();

    const inferredClusters = new Set<string>();
    Object.entries(keywordToCluster).forEach(([keyword, cluster]) => {
      if (tokenBlob.includes(keyword)) inferredClusters.add(cluster);
    });

    trainings.forEach((t) => {
      const canonical = SKILL_CLUSTERS.find((cluster) => cluster.toLowerCase() === t.toLowerCase());
      if (canonical) inferredClusters.add(canonical);
    });

    const level = levelNormalize(r.level);
    return {
      id: r.id,
      title: r.title,
      category: r.category,
      level,
      salary: r.salary,
      description: r.description,
      education: r.education,
      skills: [...new Set([...rawSkills, ...inferredClusters])],
      connections: splitField(r.connections),
      trainings,
      archetype: mapArchetype(r),
      tags: splitField(`${r.category},${level},${mapArchetype(r)}`).map((s) => s.toLowerCase()),
      unlockRequirements: {
        minSkills: level === "Entry" ? 2 : level === "Mid-Level" ? 3 : 4,
        minTrainings: level === "Entry" ? 1 : 2,
        priorRoles: level === "Entry" ? 0 : level === "Mid-Level" ? 1 : 2,
      },
    } satisfies RoleNode;
  });
};
