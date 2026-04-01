# Battery Career RPG

A polished MVP web app that turns battery-industry career progression into a gamified RPG skill-tree experience.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Flow
- Local TypeScript data source (no backend)

## Features
- Cinematic **Choose Your Path** intro with three starting archetypes:
  - Battery Chemist
  - Battery Manufacturing
  - Battery Systems Engineer
- RPG progression mechanics:
  - Locked / Available / Unlocked states
  - Readiness scoring
  - Unlock-by-skill/training/connected-role logic
- Interactive graph with pan/zoom, edges, and role transitions
- Player HUD with XP, level band, and filters
- Detail drawer with unlock path, cross-lane pivots, related roles, and role fit rationale
- LocalStorage persistence for class selection and progression state

## Data Model
Raw source schema is represented in `data/roles.ts` with fields:
- id, title, category, level, salary, description, education, skills, connections, trainings

Pipeline modules:
- `lib/normalization.ts` — robust parsing, lane mapping, inferred skill clustering
- `lib/unlockEngine.ts` — readiness and progression logic
- `lib/graphBuilder.ts` — graph layout and edge generation

## Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Notes
- Heuristic mapping and skill inference are explicitly commented in `lib/normalization.ts`.
- Logistics / Supply Chain is included as adjacent discoverable network roles and not a starting class.
