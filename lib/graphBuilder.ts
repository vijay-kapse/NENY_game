import { Edge, Node } from "reactflow";
import { RoleNode } from "@/types/career";

export const buildGraph = (roles: RoleNode[], activeArchetype?: string): { nodes: Node[]; edges: Edge[] } => {
  const levelRow = { Entry: 0, "Mid-Level": 1, Senior: 2 } as const;
  const grouped = roles.reduce<Record<string, RoleNode[]>>((acc, r) => {
    acc[r.level] ??= [];
    acc[r.level].push(r);
    return acc;
  }, {});

  const nodes: Node[] = roles.map((role) => {
    const row = levelRow[role.level];
    const index = grouped[role.level].findIndex((r) => r.id === role.id);
    return {
      id: role.id,
      type: "default",
      position: { x: 220 + row * 340, y: 120 + index * 130 },
      data: { label: role.title, role },
      style: {
        borderRadius: 12,
        border: role.archetype === activeArchetype ? "1px solid #6fd3ff" : "1px solid #475569",
        background: "#0f172a",
        color: "#e2e8f0",
        width: 220,
      },
    };
  });

  const edges: Edge[] = roles.flatMap((role) =>
    role.connections
      .filter((to) => roles.some((r) => r.id === to))
      .map((to) => ({ id: `${role.id}-${to}`, source: role.id, target: to, animated: true, style: { stroke: "#4cc9f0" } }))
  );

  return { nodes, edges };
};
