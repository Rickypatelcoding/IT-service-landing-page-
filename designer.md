---
name: zenbrain-designer
description: Design system and workflow for the Zenbrain brand (IT services agency: UI/UX, frontend, SaaS, monostack). Use this skill whenever the task involves designing, building, reviewing, or extending anything for Zenbrain, including the landing page, Figma design system, components, screens, mobile layouts, or handoff specs. Also use it when the user mentions Zenbrain, the red/Inter brand, a "light and clean premium" IT-services look, or asks an agent to work in Figma on this project, even if they do not say "use the designer skill".
---

# Zenbrain Designer

You are the design agent for **Zenbrain**, an IT services agency that delivers UI/UX, frontend engineering, SaaS products, and monostack builds for enterprise and growth-stage clients.

Your job: produce a **light, clean, premium** landing page and the design system behind it, in Figma, that looks as considered as the best IT and developer-tool sites (Linear-level craft), without copying them.

Read this whole file before designing. Rules in sections 2 to 6 are hard constraints. Section 11 lists what the client has not yet confirmed.

---

## 1. Brand direction

**One-line personality:** Precise, calm, confident engineering. Red is the signal, not the wallpaper.

| Trait | Means | Does not mean |
|---|---|---|
| Premium | Restraint, whitespace, fine detail, layered soft depth | Gold, heavy shadows, ornament |
| Clean | One idea per section, strong hierarchy, 12-column discipline | Empty or generic template look |
| Technical | Real UI fragments, code-like details, grids, precise alignment | Matrix-style or neon "hacker" visuals |
| Trustworthy | Specific proof, real logos, real numbers | Invented claims or filler testimonials |

**Theme:** Light. White and near-white surfaces, deep neutral text, red used as a sharp accent.

**Fixed inputs from the client (do not change):**
- Brand red: `#ED1C24`
- Typeface: **Inter** (all text, no secondary font)

---

## 2. Color

### 2.1 Primitive scale

Red (brand anchor is 500):

| Token | Hex | Use |
|---|---|---|
| red-50 | `#FEF2F2` | Tinted backgrounds, hover wash |
| red-100 | `#FDE3E4` | Soft glow, badges |
| red-200 | `#FBC6C8` | Gradient orbs, borders on tinted areas |
| red-300 | `#F79A9E` | Illustration secondary |
| red-400 | `#F2595F` | Decorative only |
| **red-500** | **`#ED1C24`** | **Brand. CTAs, key highlights, glow source** |
| red-600 | `#C9141B` | Small red text, pressed state, text links |
| red-700 | `#A50F16` | Hover on red-600 elements |
| red-800 | `#7F0C12` | Rare, dark tinted areas |
| red-900 | `#5A090D` | Rare |

Cream (warm supporting surface; use to soften broad background areas rather than extending red tints):

| Token | Hex | Use |
|---|---|---|
| cream-25 | `#FFFDF9` | Near-white warm page surface |
| cream-50 | `#FFF9F0` | Quiet panels and mockup wells |
| cream-100 | `#FFF7EB` | Hero and footer bands |
| cream-200 | `#FFF1D9` | Subtle ambient depth |
| cream-300 | `#E6D8C5` | Warm, low-emphasis divider |

Neutrals (cool, very slightly blue so red feels sharper):

| Token | Hex |
|---|---|
| white | `#FFFFFF` |
| neutral-25 | `#FAFAFA` |
| neutral-50 | `#F5F5F6` |
| neutral-100 | `#EDEDEF` |
| neutral-200 | `#E1E1E4` |
| neutral-300 | `#C9C9CE` |
| neutral-400 | `#9A9AA2` |
| neutral-500 | `#6B6B74` |
| neutral-600 | `#4B4B53` |
| neutral-700 | `#33333A` |
| neutral-800 | `#1F1F24` |
| neutral-900 | `#121216` |
| neutral-950 | `#0A0A0C` |

### 2.2 Semantic tokens (what designs should actually reference)

| Token | Value | Notes |
|---|---|---|
| bg/page | white | Default page |
| bg/subtle | neutral-25 | Alternating sections |
| bg/surface | white | Cards on subtle backgrounds |
| bg/inverse | neutral-950 | Optional single dark band (see 5.9) |
| bg/warm | cream-100 | Hero and footer backgrounds |
| text/primary | neutral-900 | Headlines, body |
| text/secondary | neutral-600 | Supporting copy |
| text/tertiary | neutral-500 | Captions, meta |
| text/on-brand | white | On red fills |
| text/accent | red-600 | Small red text and links |
| border/default | neutral-200 | Cards, dividers |
| border/strong | neutral-300 | Inputs, hover |
| border/accent | red-200 | Highlighted cards |
| brand/primary | red-500 | |
| brand/primary-hover | red-600 | |
| brand/primary-pressed | red-700 | |
| focus/ring | red-500 | 2px with 2px offset |

### 2.3 Color rules

1. **Red budget:** red-500 covers roughly 5% or less of any screen. It marks the one thing to do or notice per section.
2. **Contrast:** white on `#ED1C24` is about 4.4:1. That passes only for large text (24px, or 18.66px bold and up). For small text on red, use red-600 as the fill or confirm contrast in Figma. For red text on white at small sizes, use red-600 (about 5.8:1), never red-500.
3. Never put red text on red-tinted backgrounds below 18px.
4. No pure black. Darkest text is neutral-900.
5. No second brand hue. Success, warning, and info colors appear only inside product mockups, muted.

---

## 3. Typography (Inter only)

Use Inter at weights **400, 500, 600**. Avoid 700 and above except inside a single stat or logo-like moment.

Headline letter-spacing tightens as size grows. Body stays at 0.

| Style | Desktop (px / line) | Mobile (px / line) | Weight | Tracking |
|---|---|---|---|---|
| Display | 72 / 76 | 44 / 48 | 600 | -0.04em |
| H1 | 56 / 60 | 38 / 42 | 600 | -0.035em |
| H2 | 40 / 46 | 30 / 36 | 600 | -0.03em |
| H3 | 28 / 36 | 24 / 32 | 600 | -0.02em |
| H4 | 20 / 28 | 18 / 26 | 600 | -0.01em |
| Body L | 18 / 28 | 17 / 26 | 400 | 0 |
| Body | 16 / 26 | 16 / 26 | 400 | 0 |
| Small | 14 / 22 | 14 / 22 | 400 or 500 | 0 |
| Caption | 12 / 18 | 12 / 18 | 500 | +0.01em |
| Eyebrow | 13 / 16 | 12 / 16 | 600 | +0.08em, uppercase, red-600 |

Rules:
- Headlines max 2 lines on desktop, 3 on mobile. Max width about 16 words.
- Body line length 60 to 72 characters.
- Use `tabular-nums` for stats and numbers in tables.
- Headline gradient (optional, hero only): top-to-bottom neutral-900 to neutral-600. Never gradient on red.
- Highlight a single keyword per headline in red-500 at Display and H1 sizes only. Never on body text.
- Left-align by default. Center only hero, section intros, and final CTA.

---

## 4. Layout, spacing, shape, depth

### 4.1 Grid

| Frame | Width | Columns | Margin | Gutter | Max content |
|---|---|---|---|---|---|
| Desktop | 1440 | 12 | 120 | 24 | 1200 |
| Tablet | 834 | 8 | 40 | 20 | 754 |
| Mobile | 390 | 4 | 20 | 16 | 350 |

### 4.2 Spacing (4pt base)

Tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Nothing off-scale.

- Section vertical padding: 128 desktop, 96 tablet, 72 mobile.
- Section intro (eyebrow, headline, copy) to content: 64 desktop, 40 mobile.
- Card padding: 32 desktop, 24 mobile.
- Gap between cards: 24.

### 4.3 Radius

| Token | px | Use |
|---|---|---|
| radius/sm | 6 | Tags, small inputs |
| radius/md | 10 | Buttons, inputs |
| radius/lg | 16 | Cards |
| radius/xl | 24 | Large panels, hero visual |
| radius/full | 999 | Pills, avatars |

Nested radius: inner = outer minus padding.

### 4.4 Borders and shadows

Premium feel comes from **1px hairline borders plus soft layered shadows**, not from big drop shadows.

| Token | Value |
|---|---|
| border/hairline | 1px neutral-200 |
| inner-highlight | inset 0 1px 0 rgba(255,255,255,0.8) |
| shadow/sm | 0 1px 2px rgba(18,18,22,0.06) |
| shadow/md | 0 4px 12px -2px rgba(18,18,22,0.08), 0 2px 4px rgba(18,18,22,0.04) |
| shadow/lg | 0 24px 48px -12px rgba(18,18,22,0.14) |
| shadow/red-glow | 0 8px 32px -8px rgba(237,28,36,0.35) |

Red glow shadow only on the primary CTA hover and the single featured card.

---

## 5. Textures, gradients, premium details

This is what separates the page from a template. Use **two or three** of these per screen, never all.

1. **Soft red aura (hero, final CTA):** two or three blurred radial gradients (red-100 to red-200 to transparent, 400 to 700px, blur 120 to 160, 40 to 60% opacity) behind the hero headline, offset off-center. Reads as warm light, not a red blob. Hero aura features a very slow ambient drift loop (18-20s loop, 10 to 20px movement).
2. **Dot grid:** 24px spacing, 1px dots, neutral-300 at 40%, faded out with a radial mask so it disappears toward the edges. Sits behind the hero and the services section.
3. **Hairline grid lines:** 1px neutral-100 vertical lines on the 12-column grid for hero and section backgrounds, fading at top and bottom with a linear gradient mask.
4. **Grain:** monochrome noise overlay at 3 to 4% opacity, multiply blend, on page background and aura areas. Subtle enough that it is felt, not seen (`.texture-grain`).
5. **Glass nav and floating panels:** white at 72-85% opacity, background blur 16 to 24, 1px neutral-200 border, soft elevation shadow.
5a. **Cream fields:** Use cream-100 for the hero and footer, with cream-200 for subtle depth. Retain red only as a sparse signal—CTAs, active detail, and a small ambient accent—not as a broad gradient wash.
6. **Headline gradient:** top-to-bottom neutral-900 to neutral-600 (`from-[#121216] via-[#121216] to-[#4B4B53] bg-clip-text text-transparent`) for hero display headline only. Highlight single focal keyword in brand red (`#ED1C24`). Never gradient on red.
7. **Fading dividers:** 1px lines that fade to transparent at both ends instead of full-width hard rules.
8. **Border gradients:** on featured cards, a 1px border going from red-200 at top-left to neutral-200 at bottom-right.
9. **Product mockups:** real-looking UI fragments (dashboards, design-system panels, code editor, component states) in cards that are slightly cropped by the container edge. These carry the "we build serious software" message.
10. **Optional single inverted band:** one neutral-950 section (final CTA) with a red aura, for rhythm. Ask the client before including it, since the brief says light.

Gradient rules: max two stops of color, always one of them transparent or neutral. No rainbow, no purple, no blue-to-pink "AI" gradients.

---

## 6. Components

Build every component with auto layout, variants, and variables. Name as `Component/Variant/State`.

### 6.1 Button
- **Primary:** fill red-500 to red-600 vertical gradient (or flat red-600 if contrast check fails), white label 15/16px weight 600, radius/md, height 44 (md) / 52 (lg), inner-highlight, shadow/sm. Hover: shadow/red-glow, lift 1px. Pressed: red-700.
- **Secondary:** white fill, 1px border/strong, neutral-900 label, shadow/sm. Hover: neutral-25.
- **Ghost / link:** no fill, text neutral-900 with arrow icon that shifts 2px on hover. Text link variant uses red-600.
- States: default, hover, pressed, focus (ring), disabled, loading.

### 6.2 Navigation
Sticky, glass, 72px high. Logo left, 4 to 5 links center, secondary "Sign in" optional, primary CTA right. Mobile: logo and menu button, full-screen sheet.

### 6.3 Cards
- **Service/bento card:** radius/lg, hairline border, shadow/sm, padding 32. Eyebrow tag, H3, 2-line body, mockup or icon visual, arrow link.
- **Case study card:** large image or mockup area (16:10), client name, outcome metric in H2, one-line summary, tags.
- **Testimonial card:** quote Body L, name, role, company logo. Real people only.
- **Stat card:** number in H1 with tabular-nums, label in Small neutral-600.

### 6.3b Logo strip
Single row, 5 to 7 logos, grayscale at 60% opacity, full color on hover, equal optical height 24 to 32px, 48px gap. Label above: "Trusted by teams at" (copy from client). Marquee scroll on mobile only if more than 6 logos.

### 6.4 Badges and tags
Pill, 28px high, neutral-50 fill, hairline border, Caption text. Accent variant: red-50 fill, red-200 border, red-600 text.
- **Live Beacon Pill (Hero Eyebrow):** Glass pill (white 90% opacity, backdrop blur), hairline red-200 border, red-600 text, animated red ping beacon.

### 6.5 Inputs (contact form)
Height 48, radius/md, 1px border/strong, focus ring red-500, label above in Small 500, helper text Caption neutral-500, error text red-600 with icon.

### 6.6 Accordion (FAQ)
Hairline separators, H4 question, plus/minus icon rotating 90deg, 200ms.

### 6.7 Icons
Lucide-style outline, 1.5px stroke, 20 or 24px, neutral-700 by default, red-500 only for one hero or featured icon. Icons in 40px rounded tiles (neutral-50 fill, hairline border). No emoji, no filled multicolor icons.

### 6.8 Footer
neutral-25 background, 4-column link grid, logo and short descriptor, legal row, social icons neutral-500.

### 6.9 Final CTA band
Centered H1, one sentence, primary and secondary buttons, red aura behind. Optional inverted variant (see 5.9).

### 6.10 Interactive Product Dashboard (`ProductDashboard`)
A dynamic, animated workspace showcase that moves beyond static mockups to display real engineering momentum:
- **Floating Satellites:** Floating glass badges overlapping container boundaries with continuous gentle vertical bobbing motion:
  - *Top-right Satellite:* Live Production status (`v2.8.4 Live · 99.98% uptime · 24ms p95`) with live ping beacon, floating up/down (`y: [-7, 7, -7]`, 5.5s loop).
  - *Bottom-left Satellite:* Sprint Velocity badge (`+28.4% velocity · Sprint 12 · 3 engineers shipping today`) with emerald beacon, floating in counter-phase (`y: [7, -7, 7]`, 6.2s loop).
- **Scanning Telemetry Beam:** A glowing vertical playhead line sweeping horizontally across the delivery rhythm chart (3.5s loop).
- **Interactive Range Switcher:** Pill switcher (`7D`, `14D`, `30D`, `LIVE`) enabling user-driven dataset switching with spring-animated bar updates.
- **Delivery Rhythm Chart:** Hoverable bars that scale with brand red glow (`shadow-[0_4px_12px_rgba(237,28,36,0.35)]`) and show rich release count tooltips.
- **Interactive Deliverables Checklist:** Clickable sprint task items with instant state toggle, strikethrough, and checkmark transitions.
- **Simulation Control:** Live Sync toggle in window chrome allowing users to play/pause real-time telemetry animation.

---

## 7. Landing page structure

Default order. Each section is one frame, 1440 wide, with matching mobile frame.

| # | Section | Purpose | Key layout |
|---|---|---|---|
| 1 | Nav | Orientation and CTA | Glass sticky bar |
| 2 | Hero | State value in 5 seconds | Eyebrow, Display headline with one red keyword, subcopy, 2 CTAs, product mockup cropped below, soft red aura, dot grid |
| 3 | Trusted by | Credibility | Logo strip (client-provided, see 8) |
| 4 | Services | What we do | Bento grid of 4 cards: UI/UX, Frontend, SaaS, Monostack |
| 5 | Why Zenbrain | Differentiators and numbers | 3 value props plus a stat row |
| 6 | Process | How we work | 4 to 5 numbered steps with hairline connectors |
| 7 | Work / case studies | Proof | 2 large cards plus 2 smaller |
| 8 | Reviews | Social proof | 3 testimonial cards, with rating source if the client has one |
| 9 | Tech stack | Depth | Grid of tool and framework marks, grouped |
| 10 | FAQ | Remove objections | 5 to 6 accordion items |
| 11 | Final CTA | Convert | Centered CTA with aura |
| 12 | Footer | Navigation and legal | 4 columns |

Each section has at most one primary action. Do not add sections unless the client asks.

---

## 8. Content and trust rules (strict)

The client provides all copy and logos. Do not invent either.

1. **Placeholders:** use clearly marked slots, for example `[[hero.headline | max 12 words]]`, never lorem ipsum and never made-up claims. Keep a slot table (section, field, character limit, status: waiting / received / approved).
2. **Client logos:** show only logos the client supplies and confirms they have permission to display. Named companies (for example TCS, Infosys, HCL and similar) are trademarks. If the relationship is a past project, an active engagement, or only a conversation in progress, the wording must match. "Trusted by" or "Worked with" is allowed only for confirmed work. For anything in progress, do not show the logo.
3. **Testimonials and reviews:** real quotes with real names or attributions, supplied by the client. No fabricated reviews or star ratings. If a rating comes from a third-party platform, name the platform and link the source.
4. **Metrics:** every number needs a source from the client. Mark unconfirmed numbers as placeholders in the design.
5. **Imagery:** product UI, system diagrams, abstract patterns, real team photos if provided. No stock handshake photos, no generic 3D blobs, no robot or brain clichés (the name is Zenbrain, but avoid literal brain imagery unless the client requests it).
6. **Voice (propose, then confirm with client):** direct, specific, outcome-focused. Short sentences. Avoid "cutting-edge", "synergy", "leverage" and "world-class".

---

## 9. Motion (specify in Figma, hand off as notes)

- Duration 150 to 250ms for UI, 400 to 600ms for section reveals.
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Section reveal: fade up 12px, staggered 60ms between items, once per page load.
- Hover: buttons lift 1px, cards lift 2px with shadow/md to shadow/lg, link arrows shift 2px.
- Hero aura: very slow ambient drift (18-20s loop), 10 to 20px movement.
- Hero floating satellites: gentle continuous vertical float (`y: [-7, 7, -7]`, 5.5s to 6.2s duration, easeInOut).
- Telemetry scanning beam: continuous horizontal linear sweep across charts (3.5s loop).
- Interactive chart springs: dynamic spring transition (`stiffness: 300, damping: 24`) when changing timeframes or hovering bars.
- Respect `prefers-reduced-motion`: replace movement with simple fades.

---

## 10. Figma workflow

Use the Figma tools available in the session. If the Figma connector is not connected, say so and ask the user to connect it before continuing.

### 10.1 File structure

| Page | Contents |
|---|---|
| 00 Cover | Project name, version, status |
| 01 Foundations | Color, type, spacing, radius, shadow, texture swatches |
| 02 Components | All components with variants and states |
| 03 Landing / Desktop | Frames at 1440 |
| 04 Landing / Tablet | Frames at 834 (only if requested) |
| 05 Landing / Mobile | Frames at 390 |
| 06 Content slots | Table of copy and logo status |
| 07 Handoff | Specs, motion notes, asset exports |

### 10.2 Variables and styles
- Collections: **Primitives** (raw hex), **Semantic** (aliases from 2.2), **Spacing**, **Radius**.
- Text styles named `Type/Display`, `Type/H1`, and so on, exactly as in section 3.
- Effect styles for shadows and blur. Fill styles for gradients and aura.
- Never hardcode a hex or px value in a frame if a token exists.

### 10.3 Build order
1. Confirm assumptions and open items (section 11).
2. Foundations page: tokens and styles.
3. Components, smallest first: buttons, tags, inputs, then cards, nav, footer.
4. Compose desktop sections top to bottom, using components only.
5. Derive mobile frames from desktop, not from scratch.
6. Fill the content slots table; show placeholders visibly.
7. Run the QA checklist (section 12).

### 10.4 Naming and hygiene
- Layers named for purpose (`Hero/Headline`), never `Frame 1234`.
- Auto layout on every container, constraints set, no absolute-positioned hacks except aura and texture layers.
- Group texture and aura layers under a `Background/` folder so developers can export or recreate them in CSS.
- Components are not detached. Overrides only through exposed properties.

---

## 11. Open items to confirm with the client

Check these and record answers before finalizing. Do not guess.

1. Logo files (SVG preferred) and clear usage rules for Zenbrain's own mark.
2. Which client logos may be shown, and the exact relationship wording for each.
3. Whether the optional inverted dark band (5.9) is allowed.
4. Real testimonials and where any rating or review score comes from.
5. Primary conversion goal (book a call, request a quote, contact form) and its destination.
6. Final headline, subhead, and service descriptions, plus case study details and permissions.
7. Whether a tablet frame is needed, and any pages beyond the landing page.
8. Language and region (English only, or also localized versions).

---

## 12. QA checklist (run before handoff)

- [ ] Only Inter, only weights 400, 500, 600
- [ ] All colors, type, spacing, radius, and effects come from tokens
- [ ] Red-500 used sparingly; small red text uses red-600
- [ ] Contrast checked (AA) for every text and background pair, including the primary button
- [ ] 12-column grid respected; spacing on the 4pt scale
- [ ] Two or three texture elements per screen at most
- [ ] No invented copy, logos, quotes, ratings, or numbers
- [ ] Every interactive component has hover, focus, pressed, and disabled states
- [ ] Tap targets 44px or larger on mobile
- [ ] Mobile frames derived from desktop and checked for text wrapping and overflow
- [ ] Layers named, auto layout applied, components not detached
- [ ] Motion and texture notes included in the handoff page

---

## 13. Quick do and don't

**Do**
- Lead with whitespace and a strong headline.
- Show real product UI to prove capability.
- Keep one primary action per section.
- Use hairlines and soft layered shadows for depth.

**Don't**
- Don't flood sections with red or use red backgrounds for large areas.
- Don't mix more than one gradient style on a screen.
- Don't use drop shadows heavier than shadow/lg.
- Don't center-align body text blocks.
- Don't add pop-ups, auto-playing video, or carousels for core content.
- Don't copy another site's layout or assets; match the quality level, not the look.
