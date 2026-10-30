import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/* -------------------------------------------------------------------------- */
/*  Tokens & helpers                                                          */
/*  Arbitrary values keep this standalone. Swap for tokens once configured.   */
/*  The old .service-card-* CSS classes are no longer used: delete them.      */
/* -------------------------------------------------------------------------- */

const EASE = [0.2, 0.8, 0.2, 1]

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1C24] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

// Texture 1: dot grid, masked so it fades away from the header (design.md 5.2)
const DOTS = 'radial-gradient(rgba(154,154,162,0.45) 1px, transparent 1px)'
const DOT_MASK = 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 0%, transparent 70%)'

// Texture 3: grain, used only on the product "screens" inside cards (design.md 5.4)
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
)}")`

function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
      style={{ backgroundImage: GRAIN }}
    />
  )
}

/* ------------------------------ Icons (1.5px) ------------------------------ */

const iconProps = {
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

const CheckIcon = ({ className = '' }) => (
  <svg {...iconProps} className={className}>
    <path d="M4.5 10.5l3.5 3.5 7.5-8" />
  </svg>
)

const ArrowIcon = ({ className = '' }) => (
  <svg {...iconProps} className={className}>
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
)

const SearchIcon = ({ className = '' }) => (
  <svg {...iconProps} className={className}>
    <circle cx="9" cy="9" r="5" />
    <path d="M13 13l3.5 3.5" />
  </svg>
)

/* ------------------------------ UI primitives ------------------------------ */

function Tag({ children, accent = false }) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full border px-3 text-[12px] font-medium ${
        accent
          ? 'border-[#FBC6C8] bg-[#FEF2F2] text-[#C9141B]'
          : 'border-neutral-200 bg-neutral-50 text-neutral-600'
      }`}
    >
      {children}
    </span>
  )
}

function CardLink({ children }) {
  return (
    <a
      href="#contact"
      className={`group/link inline-flex items-center gap-1.5 rounded-md text-[14px] font-semibold text-neutral-900 transition-colors hover:text-[#C9141B] ${FOCUS_RING}`}
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
    </a>
  )
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2.5 text-[14px] leading-[22px] text-neutral-700">
      <CheckIcon className="mt-[3px] h-4 w-4 shrink-0 text-neutral-400" />
      <span>{children}</span>
    </li>
  )
}

/*
  Card shell.
  - 1px border layer sits behind a white surface (nested radius: 16 - 1 = 15).
  - Texture 2: a cursor-following spotlight lights up the border and a faint wash
    on the surface. Neutral on regular cards, red only on the featured one.
  - Red glow on hover is reserved for the single featured card (design.md 4.4).
*/
function Card({ featured = false, children }) {
  const ref = useRef(null)

  const onPointerMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  const borderSpot = featured ? 'rgba(237,28,36,0.45)' : 'rgba(18,18,22,0.28)'
  const surfaceSpot = featured ? 'rgba(237,28,36,0.05)' : 'rgba(18,18,22,0.035)'

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group relative h-full rounded-2xl p-px transition-[transform,box-shadow] duration-300 motion-reduce:transform-none lg:hover:-translate-y-0.5 ${
        featured
          ? 'bg-gradient-to-br from-[#FBC6C8] via-[#E1E1E4] to-[#E1E1E4] shadow-[0_1px_2px_rgba(18,18,22,0.06)] hover:shadow-[0_8px_32px_-8px_rgba(237,28,36,0.35)]'
          : 'bg-[#E1E1E4] shadow-[0_1px_2px_rgba(18,18,22,0.06)] hover:shadow-[0_4px_12px_-2px_rgba(18,18,22,0.08),0_2px_4px_rgba(18,18,22,0.04)]'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), ${borderSpot}, transparent 70%)`,
        }}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${surfaceSpot}, transparent 60%)`,
          }}
        />
        {children}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Product fragments: what each service looks like, not a placeholder box    */
/* -------------------------------------------------------------------------- */

// 1. Websites: a page being designed, with a selected hero headline
function WebsiteVisual() {
  return (
    <div
      aria-hidden="true"
      className="service-website-motion relative h-52 overflow-hidden border-b border-neutral-200 bg-[#FFF9F0] lg:absolute lg:right-0 lg:top-0 lg:h-[340px] lg:w-[46%] lg:rounded-bl-2xl lg:border-l"
    >
      <Grain />
      <div className="relative flex h-9 items-center gap-1.5 border-b border-neutral-200 bg-white/70 px-3">
        <span className="h-2 w-2 rounded-full bg-neutral-200" />
        <span className="h-2 w-2 rounded-full bg-neutral-200" />
        <span className="h-2 w-2 rounded-full bg-neutral-200" />
        <span className="ml-3 h-5 w-40 rounded-md bg-neutral-100" />
      </div>

      <div className="motion-target relative px-6 pt-5">
        <div className="flex items-center justify-between">
          <span className="h-3 w-10 rounded-sm bg-neutral-900" />
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-8 rounded-full bg-neutral-200" />
            <span className="h-1.5 w-8 rounded-full bg-neutral-200" />
            <span className="h-1.5 w-8 rounded-full bg-neutral-200" />
            <span className="h-5 w-14 rounded-md bg-neutral-900" />
          </div>
        </div>

        {/* Selected headline: the one red moment in this fragment */}
        <div className="relative mt-10 w-[78%] border border-[#ED1C24] p-2">
          <span className="absolute -left-px -top-6 rounded-sm bg-[#C9141B] px-1.5 py-0.5 text-[11px] font-medium leading-4 text-white">
            Hero headline
          </span>
          {[
            '-left-[4px] -top-[4px]',
            '-right-[4px] -top-[4px]',
            '-bottom-[4px] -left-[4px]',
            '-bottom-[4px] -right-[4px]',
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute h-[7px] w-[7px] border border-[#ED1C24] bg-white ${pos}`}
            />
          ))}
          <div className="h-3.5 w-full rounded-sm bg-neutral-900" />
          <div className="mt-1.5 h-3.5 w-3/5 rounded-sm bg-neutral-900" />
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="h-1.5 w-[85%] rounded-full bg-neutral-200" />
          <div className="h-1.5 w-[60%] rounded-full bg-neutral-200" />
        </div>
        <div className="mt-4 flex gap-2">
          <span className="h-6 w-20 rounded-md bg-neutral-900" />
          <span className="h-6 w-16 rounded-md border border-neutral-300 bg-white" />
        </div>

        {/* Cropped by the card edge */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 rounded-lg border border-neutral-200 bg-white p-2.5">
              <div className="h-4 w-4 rounded bg-neutral-100" />
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-neutral-200" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-neutral-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 2. SaaS: team members and roles (auth + RBAC)
function SaasVisual() {
  const rows = [
    { role: 'Owner', style: 'bg-neutral-900 text-white border-neutral-900' },
    { role: 'Admin', style: 'bg-white text-neutral-700 border-neutral-300' },
    { role: 'Viewer', style: 'bg-white text-neutral-500 border-neutral-200' },
  ]
  return (
    <div
      aria-hidden="true"
      className="service-members-motion relative h-[188px] overflow-hidden border-b border-neutral-200 bg-[#FFF9F0]"
    >
      <Grain />
      <div className="motion-target relative mx-auto mt-6 w-[80%] rounded-xl border border-neutral-200 bg-white shadow-[0_4px_12px_-2px_rgba(18,18,22,0.08),0_2px_4px_rgba(18,18,22,0.04)]">
        <div className="flex h-10 items-center justify-between border-b border-neutral-100 px-3.5">
          <span className="text-[12px] font-semibold text-neutral-900">Members</span>
          <span className="rounded-md bg-neutral-900 px-2 py-1 text-[11px] font-medium leading-none text-white">
            Invite
          </span>
        </div>
        {rows.map(({ role, style }) => (
          <div
            key={role}
            className="flex h-11 items-center gap-3 border-b border-neutral-100 px-3.5 last:border-b-0"
          >
            <span className="h-6 w-6 shrink-0 rounded-full bg-neutral-200" />
            <div className="min-w-0 flex-1">
              <div className="h-1.5 w-20 rounded-full bg-neutral-200" />
              <div className="mt-1.5 h-1.5 w-28 rounded-full bg-neutral-100" />
            </div>
            <span className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${style}`}>
              {role}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 3. Web apps: a keyboard-first command palette
function AppVisual() {
  const results = [
    { label: 'Open dashboard', active: false },
    { label: 'Filter by status', active: true },
    { label: 'Export as CSV', active: false },
  ]
  return (
    <div
      aria-hidden="true"
      className="service-command-motion relative h-[188px] overflow-hidden border-b border-neutral-200 bg-[#FFF9F0]"
    >
      <Grain />
      <div className="motion-target relative mx-auto mt-6 w-[84%] rounded-xl border border-neutral-200 bg-white shadow-[0_4px_12px_-2px_rgba(18,18,22,0.08),0_2px_4px_rgba(18,18,22,0.04)]">
        <div className="flex h-10 items-center gap-2 border-b border-neutral-100 px-3">
          <SearchIcon className="h-4 w-4 text-neutral-400" />
          <span className="flex-1 text-[12px] text-neutral-400">Search or jump to…</span>
          <span className="rounded border border-neutral-200 bg-neutral-50 px-1.5 text-[11px] font-medium leading-5 text-neutral-500">
            ⌘K
          </span>
        </div>
        <div className="space-y-0.5 p-1.5">
          {results.map(({ label, active }) => (
            <div
              key={label}
              className={`flex h-8 items-center gap-2.5 rounded-lg px-2 text-[12px] ${
                active
                  ? 'bg-[#FEF2F2] font-medium text-neutral-900 ring-1 ring-inset ring-[#FBC6C8]'
                  : 'text-neutral-600'
              }`}
            >
              <span
                className={`h-4 w-4 rounded ${active ? 'bg-white ring-1 ring-[#FBC6C8]' : 'bg-neutral-100'}`}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 4. Design systems: tokens and component states
function SystemVisual() {
  const swatches = ['bg-neutral-900', 'bg-neutral-600', 'bg-neutral-300', 'bg-neutral-100', 'bg-[#ED1C24]']
  const states = [
    { name: 'Default', style: 'bg-neutral-900 text-white' },
    { name: 'Hover', style: 'bg-neutral-700 text-white -translate-y-px shadow-[0_4px_12px_-2px_rgba(18,18,22,0.2)]' },
    { name: 'Focus', style: 'bg-neutral-900 text-white ring-2 ring-[#ED1C24] ring-offset-2 ring-offset-[#FAFAFA]' },
    { name: 'Disabled', style: 'bg-neutral-200 text-neutral-400' },
  ]
  return (
    <div
      aria-hidden="true"
      className="service-system-motion relative border-t border-neutral-200 bg-[#FFF9F0] lg:absolute lg:bottom-0 lg:right-0 lg:top-10 lg:w-[46%] lg:rounded-tl-2xl lg:border-l"
    >
      <Grain />
      <div className="motion-target relative flex h-full flex-col justify-center gap-6 p-6">
        <div>
          <div className="text-[12px] font-medium text-neutral-500">Tokens</div>
          <div className="mt-2.5 flex items-center gap-1.5">
            {swatches.map((s) => (
              <span key={s} className={`h-5 w-5 rounded-full ring-1 ring-inset ring-black/10 ${s}`} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['color.brand', 'radius.lg', 'space.6'].map((t) => (
              <span
                key={t}
                className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[11px] font-medium text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[12px] font-medium text-neutral-500">Button</div>
          <div className="mt-2.5 grid grid-cols-4 gap-2.5">
            {states.map(({ name, style }) => (
              <div key={name}>
                <div
                  className={`grid h-7 place-items-center rounded-md text-[11px] font-medium ${style}`}
                >
                  Button
                </div>
                <div className="mt-1.5 text-center text-[11px] text-neutral-500">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function Services() {
  const reduce = useReducedMotion()

  // One orchestrated reveal: header, then cards, staggered 60ms.
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-[#FAFAFA] px-5 py-[72px] md:px-10 md:py-24 lg:py-32"
    >
      {/* Texture 1: dot grid + fading hairline at the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: DOTS,
          backgroundSize: '24px 24px',
          maskImage: DOT_MASK,
          WebkitMaskImage: DOT_MASK,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-[1200px]"
      >
        {/* Header: headline left, supporting copy right, aligned to the baseline */}
        <motion.div variants={item} className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-7">
            <span className="text-[12px] font-semibold uppercase leading-4 tracking-[0.08em] text-[#C9141B] md:text-[13px]">
              What we do
            </span>
            <h2
              id="services-heading"
              className="mt-3 max-w-[16em] text-[30px] font-semibold leading-9 tracking-[-0.03em] text-neutral-900 md:text-[40px] md:leading-[46px]"
            >
              A focused team for ambitious digital work.
            </h2>
          </div>
          <p className="max-w-[460px] text-[16px] leading-[26px] text-neutral-600 lg:col-span-5 lg:justify-self-end lg:pb-1 lg:text-[18px] lg:leading-7">
            From initial strategy and user interface design to production-grade engineering, we build software that lasts.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-3">
          {/* 1. Featured: the single card with the red border and glow */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card featured>
              <WebsiteVisual />
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <div className="lg:min-h-[308px] lg:max-w-[50%]">
                  <Tag accent>Primary capability</Tag>
                  <h3 className="mt-5 text-[24px] font-semibold leading-8 tracking-[-0.02em] text-neutral-900 lg:text-[28px] lg:leading-9">
                    Websites &amp; Digital Flagships
                  </h3>
                  <p className="mt-3 text-[16px] leading-[26px] text-neutral-600">
                    High-performance marketing websites, product launches, and digital flagships built for speed, conversion, and brand distinction.
                  </p>
                </div>

                <div className="mt-8 h-px bg-gradient-to-r from-neutral-200 via-neutral-200 to-transparent" />
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  <CheckItem>Responsive UI/UX design &amp; Figma design systems</CheckItem>
                  <CheckItem>Next.js / React frontend engineering</CheckItem>
                  <CheckItem>Technical SEO and Core Web Vitals optimization</CheckItem>
                  <CheckItem>Headless CMS integration &amp; content modeling</CheckItem>
                </ul>

                <div className="mt-auto pt-8">
                  <CardLink>See website projects</CardLink>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 2. SaaS */}
          <motion.div variants={item}>
            <Card>
              <SaasVisual />
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <div>
                  <Tag>Full-stack</Tag>
                  <h3 className="mt-5 text-[20px] font-semibold leading-7 tracking-[-0.01em] text-neutral-900">
                    SaaS Product Development
                  </h3>
                  <p className="mt-3 text-[14px] leading-[22px] text-neutral-600">
                    Turn product concepts into resilient SaaS applications with verified user flows, subscription billing, and multi-tenant architectures.
                  </p>
                </div>
                <ul className="mt-6 space-y-3 border-t border-neutral-100 pt-5">
                  <CheckItem>MVP scoping &amp; rapid prototyping</CheckItem>
                  <CheckItem>Authentication, RBAC &amp; payment flows</CheckItem>
                </ul>
                <div className="mt-auto pt-8">
                  <CardLink>Explore SaaS builds</CardLink>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 3. Web apps */}
          <motion.div variants={item}>
            <Card>
              <AppVisual />
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <div>
                  <Tag>Web Apps</Tag>
                  <h3 className="mt-5 text-[20px] font-semibold leading-7 tracking-[-0.01em] text-neutral-900">
                    Custom Web Applications
                  </h3>
                  <p className="mt-3 text-[14px] leading-[22px] text-neutral-600">
                    Complex dashboards, internal operational tools, and customer portals engineered for dense data workflows and daily use.
                  </p>
                </div>
                <ul className="mt-6 space-y-3 border-t border-neutral-100 pt-5">
                  <CheckItem>Real-time data visualization</CheckItem>
                  <CheckItem>Accessible, keyboard-navigable interfaces</CheckItem>
                </ul>
                <div className="mt-auto pt-8">
                  <CardLink>See web application work</CardLink>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 4. Frontend architecture: visual anchored bottom-right for rhythm */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <div className="lg:max-w-[48%]">
                  <Tag>Engineering</Tag>
                  <h3 className="mt-5 text-[20px] font-semibold leading-7 tracking-[-0.01em] text-neutral-900">
                    Frontend Architecture &amp; Design Systems
                  </h3>
                  <p className="mt-3 text-[14px] leading-[22px] text-neutral-600">
                    Unified UI component libraries, TypeScript codebases, and monorepos that enable engineering teams to ship faster with consistency.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-neutral-100 pt-5">
                    {['TypeScript', 'Tailwind CSS', 'Radix UI', 'Component Tokens', 'Storybook', 'Automated QA'].map(
                      (tag) => (
                        <li
                          key={tag}
                          className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[12px] font-medium text-neutral-600"
                        >
                          {tag}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-auto pt-8">
                  <CardLink>Review our architecture approach</CardLink>
                </div>
              </div>
              <SystemVisual />
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
