# Zenbrain — Digital Product Studio

A premium, light-theme marketing landing page and interactive product showcase for **Zenbrain**, an IT services agency delivering UI/UX, frontend engineering, SaaS platforms, and monostack architectures.

Built with craft, restraint, and precision following the Linear-grade design principles specified in [`designer.md`](./designer.md).

---

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation & Motion:** Motion (`motion/react`)
- **Typography:** Inter (400, 500, 600) via Google Fonts
- **Iconography:** Material Symbols Outlined
- **Linter:** Oxlint

---

## Design System & Tokens

### Color Palette
- **Brand Red (Anchor):** `#ED1C24` (Used for CTAs, focal highlights, active states; strictly ~5% screen budget)
- **Small Red Text & Links:** `#C9141B` (Complies with WCAG AA contrast against white)
- **Red Tints & Glows:**
  - `red-50`: `#FEF2F2` (Hover wash, soft tag fills)
  - `red-100`: `#FDE3E4` (Ambient glow stops, chart bars)
  - `red-200`: `#FBC6C8` (Borders on tinted areas, border gradients)
- **Cool Neutrals:**
  - `neutral-25`: `#FAFAFA` (Subtle section background)
  - `neutral-50`: `#F5F5F6` (Inputs, tiles)
  - `neutral-100`: `#EDEDEF` (Grid lines, subtle dividers)
  - `neutral-200`: `#E1E1E4` (Hairline card borders)
  - `neutral-300`: `#C9C9CE` (Dot grid, disabled indicators)
  - `neutral-600`: `#4B4B53` (Supporting body text, headline gradient stop)
  - `neutral-900`: `#121216` (Headlines, primary dark text — no pure black)

### Typography
- **Typeface:** Inter exclusively. No secondary font.
- **Headline Gradient:** Top-to-bottom `from-[#121216] via-[#121216] to-[#4B4B53]`, with a single keyword highlighted in brand red `#ED1C24`.

---

## Tactile Textures & Visual Depth

To prevent a flat, generic "AI-generated" look, the hero section employs a layered physical texture stack:
1. **Monochrome Grain Noise Overlay (`.texture-grain`):** SVG monochrome noise filter at ~3.5% opacity with `mix-blend-mode: multiply` for a tactile, editorial paper feel.
2. **24px Radial-Masked Dot Grid (`.texture-dots`):** 1px dots on a 24px rhythm with a smooth radial mask fading softly toward the edges.
3. **12-Column Hairline Vertical Grid Lines:** 1px subtle divider lines across the 12-column grid with a vertical linear gradient fade mask at top and bottom.
4. **Layered Soft Red Auras:** Diffused radial gradients (`#FDE3E4` to `#FBC6C8`) with a continuous 18-second slow ambient drift loop (`motion.div`).

---

## Interactive Product Dashboard (`ProductDashboard.jsx`)

The hero mockup is an active, visual workspace element with real-time feedback:
- **Floating Satellite Badges:**
  - *Top-Right:* Live Production sync pill (`v2.8.4 Live · 99.98% uptime`) with an animated pulsing beacon, floating with gentle up-and-down motion (`y: [-7, 7, -7]`).
  - *Bottom-Left:* Sprint Velocity card (`+28.4% velocity · Sprint 12 · 3 engineers shipping today`), floating in counter-phase rhythm (`y: [7, -7, 7]`).
- **Realtime Telemetry Scanning Beam:** An animated glowing playhead line sweeping across the delivery rhythm chart.
- **Interactive Range Switcher (`7D` · `14D` · `30D` · `LIVE`):** Dynamic switching of dataset metrics and spring-animated chart bars.
- **Interactive Telemetry Tooltip:** Hovering over any bar reveals exact releases, cycle metrics, and elevated glow.
- **Interactive Sprint Deliverables Checklist:** Clickable milestone tasks with live toggle states.
- **Live Syncing Simulation Toggle:** Play/pause real-time telemetry simulation in the browser chrome.

---

## Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
