---
name: ui-polish-lite
description: Short, step-by-step cleanup of generic AI-generated UI (service cards, case-study grids, landing sections). Use when the user says the UI looks generic, AI-made, or template-like, or asks to clean up or improve a section. Works with small models.
---

# UI Polish Lite

Do ONE step at a time. Do not redesign everything at once.

## Step 1: Find problems
Run: `node ui-polish-lite/lint-ui.mjs <file or folder>`
Fix issues in the order printed. Run it again after each batch.

## Step 2: Apply these fixes (only where the linter or you see the problem)

| Problem | Fix |
|---|---|
| "01 / LABEL" tags | Delete them |
| ALL-CAPS tracked eyebrow above a heading | Delete it |
| Four identical cards | Make the main item larger. Others smaller or a plain list |
| Icon in a tile above every heading | Remove the icons. Keep one only if it helps |
| Grey skeleton bars or empty boxes | Replace with real text, a screenshot, or delete |
| One dark card for "variety" | Make all cards the same color |
| `[[placeholder]]` text | Write plain, believable copy |
| Slogan headings ("built to move") | Write what it is: "Websites for service businesses" |
| Repeated "Explore service →" | Name the destination: "See website projects" |
| Different link colors | Use one link style everywhere |
| Cards with uneven height | Use CSS grid, `align-items: stretch`, link at bottom with `margin-top: auto` |
| Hover lift and entrance animation on everything | Remove. Keep one effect at most |
| Raw hex colors in components | Put them in CSS variables and use those |
| Flat solid white hero / no texture | Add tactile texture stack (monochrome grain overlay 3.5%, radial-masked dot grid, 12-col hairline lines, drifting warm red aura) |
| Flat black text on display headline | Add top-to-bottom headline gradient (neutral-900 to neutral-600) with single brand red accent word |
| Static, motionless dashboard mockup | Add floating satellite badges bobbing up and down, live telemetry scanning beam, interactive range tabs, and clickable checklist items |

## Step 3: Hard limits
- Use 1 accent color, 1 or 2 fonts, 3 or fewer font sizes per card.
- Body text: line length under 70 characters.
- Keep the project's existing stack. Add no new packages.
- Change only the files you were given.
- Never invent features, clients, or numbers. If copy is missing, ask.

## Step 4: Report
Reply with: what you removed, what you changed, what you need from the user. Max 8 lines.
