"use client";

import { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { buildGraph } from "@/lib/graphBuilder";
import { unlockStateForRole } from "@/lib/unlockEngine";
import { CareerState, RoleNode } from "@/types/career";

export function SkillTreeGraph({ roles, state, onSelect }: { roles: RoleNode[]; state: CareerState; onSelect: (r: RoleNode)=>void }) {
  const { nodes, edges } = useMemo(() => buildGraph(roles, state.selectedArchetype ?? undefined), [roles, state.selectedArchetype]);

  const decoratedNodes: Node[] = nodes.map((n) => {
    const role = (n.data as { role: RoleNode }).role;
    const status = unlockStateForRole(role, state, roles);
    const statusColor = status === "unlocked" ? "#34d399" : status === "available" ? "#f59e0b" : "#64748b";
    return {
      ...n,
      data: {
        ...n.data,
        label: `${role.title}\n${status.toUpperCase()}`,
      },
      style: {
        ...(n.style || {}),
        boxShadow: `0 0 0 1px ${statusColor}55, 0 0 18px ${statusColor}30`,
      },
      className: "cursor-pointer"
    };
  });

  const onNodeClick = (_: React.MouseEvent, node: Node) => onSelect((node.data as { role: RoleNode }).role);

  return (
    <div className="panel hud-grid h-[70vh] overflow-hidden">
      <ReactFlow nodes={decoratedNodes} edges={edges as Edge[]} onNodeClick={onNodeClick} fitView>
        <Background color="#1f2a44" gap={20} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
