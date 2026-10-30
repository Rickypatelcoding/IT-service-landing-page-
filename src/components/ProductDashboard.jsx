import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/* -------------------------------------------------------------------------- */
/*  Tokens & helpers                                                          */
/*  Arbitrary values are used so this works without extending tailwind.config */
/*  Swap to your tokens (red-500, neutral-25, ...) once they exist.           */
/* -------------------------------------------------------------------------- */

const EASE = [0.2, 0.8, 0.2, 1]
const SPRING = { type: 'spring', stiffness: 300, damping: 24 }

// Brand
const RED = '#ED1C24'
const RED_600 = '#C9141B'

// Shadows (design.md 4.4)
const SHADOW_SM = 'shadow-[0_1px_2px_rgba(18,18,22,0.06)]'
const SHADOW_GLASS =
  'shadow-[0_1px_2px_rgba(18,18,22,0.06),0_12px_28px_-8px_rgba(18,18,22,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]'
const SHADOW_FRAME =
  'shadow-[0_1px_2px_rgba(18,18,22,0.06),0_24px_48px_-12px_rgba(18,18,22,0.14)]'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1C24] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

// Texture 1: monochrome grain (design.md 5.4). Inline so there is no asset to ship.
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
)}")`

// Texture 2: the "release ledger" slice. Bars are cut into 4px segments with a 2px gap.
const SEGMENT_MASK = 'repeating-linear-gradient(to top, #000 0 4px, transparent 4px 6px)'

const RANGES = ['7D', '14D', '30D', 'LIVE']

const NAV = [
  { label: 'Overview', mark: '01' },
  { label: 'Projects', mark: '02' },
  { label: 'Components', mark: '03' },
  { label: 'Activity', mark: '04', badge: '3' },
]

const datasetByRange = {
  '7D': {
    activeProjects: '08',
    activeDelta: '+12%',
    shipments: '18',
    shipmentsNote: 'this week',
    focusTime: '88%',
    focusDelta: 'on track',
    trend: '+18.4%',
    bars: [42, 58, 52, 76, 68, 85, 96],
  },
  '14D': {
    activeProjects: '11',
    activeDelta: '+24%',
    shipments: '34',
    shipmentsNote: 'past 2 weeks',
    focusTime: '85%',
    focusDelta: '+4.2h saved',
    trend: '+22.6%',
    bars: [35, 48, 55, 62, 70, 65, 80, 75, 88, 82, 92, 86, 95, 100],
  },
  '30D': {
    activeProjects: '14',
    activeDelta: '+38%',
    shipments: '68',
    shipmentsNote: 'this month',
    focusTime: '86%',
    focusDelta: 'peak flow',
    trend: '+31.2%',
    bars: [30, 42, 38, 55, 48, 65, 72, 60, 78, 84, 76, 90, 88, 96, 92, 100],
  },
  LIVE: {
    activeProjects: '09',
    activeDelta: '+16%',
    shipments: '26',
    shipmentsNote: 'syncing live',
    focusTime: '91%',
    focusDelta: 'live telemetry',
    trend: '+28.4%',
    bars: [45, 60, 52, 78, 65, 88, 82, 94, 90, 98, 86, 100],
  },
}

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function Grain({ className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply ${className}`}
      style={{ backgroundImage: GRAIN }}
    />
  )
}

function Beacon({ tone = 'red' }) {
  const dot = tone === 'red' ? 'bg-[#ED1C24]' : 'bg-emerald-500'
  return (
    <span className="relative flex h-2 w-2" aria-hidden>
      <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping ${dot}`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
    </span>
  )
}

// Values re-enter when the dataset changes. Motion that answers an action.
function Swap({ k, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      key={k}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={`inline-block ${className}`}
    >
      {k}
    </motion.span>
  )
}

function Stat({ label, value, caption, up = false }) {
  return (
    <div className="min-w-0 px-3 first:pl-0 last:pr-0 sm:px-4">
      <div className="truncate text-[12px] font-medium text-neutral-500">{label}</div>
      <div className="mt-1">
        <Swap
          k={value}
          className="text-[28px] font-semibold leading-9 tracking-[-0.02em] text-neutral-900 tabular-nums"
        />
      </div>
      <div className="mt-0.5 flex items-center gap-1 text-[12px] text-neutral-500">
        {up && <span className="font-semibold text-emerald-600">↗</span>}
        <Swap k={caption} className="tabular-nums" />
      </div>
    </div>
  )
}

// Hairline that fades at both ends (design.md 5.7)
function FadeDivider() {
  return (
    <span
      aria-hidden
      className="w-px self-stretch bg-gradient-to-b from-transparent via-neutral-200 to-transparent"
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function ProductDashboard() {
  const reduce = useReducedMotion()
  const [activeTab, setActiveTab] = useState('Overview')
  const [range, setRange] = useState('14D')
  const [hoveredBar, setHoveredBar] = useState(null)
  const [isLivePlaying, setIsLivePlaying] = useState(true)
  const [liveTick, setLiveTick] = useState(0)
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design System 2.0 Token Audit', tag: 'Core UI', done: true, dev: 'Elena' },
    { id: 2, title: 'Zero-latency SSR Pipeline', tag: 'Frontend', done: true, dev: 'Mark' },
    { id: 3, title: 'Client production handoff & signoff', tag: 'Launch', done: false, dev: 'Sarah' },
  ])

  // Live telemetry tick
  useEffect(() => {
    if (!isLivePlaying) return
    const interval = setInterval(() => setLiveTick((t) => (t + 1) % 100), 2400)
    return () => clearInterval(interval)
  }, [isLivePlaying])

  const currentData = datasetByRange[range] || datasetByRange['14D']

  // In LIVE mode the newest cycle breathes, so the chart is genuinely "live".
  const bars = useMemo(() => {
    const base = currentData.bars
    if (range !== 'LIVE' || !isLivePlaying) return base
    const next = [...base]
    const last = next.length - 1
    next[last] = Math.max(40, base[last] + [0, -6, -2, -9][liveTick % 4])
    return next
  }, [currentData, range, isLivePlaying, liveTick])

  const selectRange = (item) => {
    setHoveredBar(null)
    setRange(item)
  }

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const doneCount = tasks.filter((t) => t.done).length
  const allDone = doneCount === tasks.length
  const percent = Math.round((doneCount / tasks.length) * 100)

  return (
    <div className="relative isolate mx-auto mt-14 w-full max-w-[1020px] px-2 sm:mt-16 sm:px-4">
      {/* Soft red aura, offset off-center (design.md 5.1) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-[20%] right-[6%] top-6 h-72 rounded-full bg-[#FBC6C8]/40 blur-[140px]"
      />

      {/* The one orchestrated entrance. Everything else waits for the user. */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`relative rounded-[24px] border border-neutral-200/80 bg-neutral-100/70 p-1.5 ${SHADOW_FRAME}`}
      >
        {/* Texture 1: grain on the frame */}
        <Grain className="rounded-[24px]" />

        {/* Window. Radius 18 = frame 24 minus 6 padding (nested radius rule). */}
        <div className="relative overflow-hidden rounded-[18px] border border-neutral-200 bg-white text-left shadow-[0_1px_2px_rgba(18,18,22,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
          {/* Title bar */}
          <div className="flex h-11 items-center justify-between border-b border-neutral-200 bg-[#FAFAFA] px-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-neutral-300 bg-neutral-100" />
              <span className="h-2.5 w-2.5 rounded-full border border-neutral-300 bg-neutral-100" />
              <span className="h-2.5 w-2.5 rounded-full border border-neutral-300 bg-neutral-100" />
              <div className="ml-3 hidden h-7 w-[280px] items-center gap-2 rounded-md border border-neutral-200 bg-white px-2.5 text-[12px] text-neutral-500 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ED1C24]" />
                <span className="truncate">workspace.zenbrain.dev / live-metrics</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-pressed={isLivePlaying}
                onClick={() => setIsLivePlaying((v) => !v)}
                title="Toggle live telemetry"
                className={`flex h-7 items-center gap-2 rounded-md border border-neutral-200 bg-white px-2.5 text-[12px] font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900 ${SHADOW_SM} ${FOCUS_RING}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isLivePlaying ? 'bg-emerald-500' : 'bg-neutral-300'}`}
                />
                <span className="hidden sm:inline">{isLivePlaying ? 'Live sync' : 'Paused'}</span>
                <span className="text-[11px] text-neutral-400">{isLivePlaying ? 'Ⅱ' : '▶'}</span>
              </button>
              <div className="grid h-6 w-6 place-items-center rounded-full bg-neutral-900 text-[11px] font-semibold text-white">
                Z
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[176px_1fr]">
            {/* Sidebar */}
            <aside className="relative hidden flex-col justify-between border-r border-neutral-200 bg-[#FAFAFA] p-3 md:flex">
              <Grain />
              <div className="relative">
                <div className="flex items-center gap-2 px-1.5 pt-1 text-[13px] font-semibold text-neutral-900">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-neutral-900 text-[12px] font-semibold text-white">
                    z
                  </span>
                  zenbrain studio
                </div>

                <nav className="mt-6 flex flex-col gap-0.5" aria-label="Workspace">
                  {NAV.map(({ label, mark, badge }) => {
                    const isActive = activeTab === label
                    return (
                      <button
                        key={label}
                        type="button"
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setActiveTab(label)}
                        className={`flex h-9 w-full items-center justify-between rounded-lg px-2.5 text-left text-[13px] font-medium transition-colors ${FOCUS_RING} ${
                          isActive
                            ? 'bg-white text-neutral-900 ring-1 ring-neutral-200 shadow-[0_1px_2px_rgba(18,18,22,0.06)]'
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-semibold tabular-nums ${isActive ? 'text-[#C9141B]' : 'text-neutral-400'}`}>{mark}</span>
                          {label}
                        </span>
                        {badge && (
                          <span className="rounded-full bg-neutral-200 px-1.5 text-[11px] font-medium leading-5 text-neutral-700 tabular-nums">
                            {badge}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="relative rounded-xl border border-neutral-200 bg-white p-3">
                <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Cluster healthy
                </div>
                <div className="mt-1 text-[12px] text-neutral-500">Next deploy ready in 4m</div>
              </div>
            </aside>

            {/* Main */}
            <div className="min-w-0 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.02em] text-neutral-900 sm:text-[24px] sm:leading-8">
                  Keep the work moving.
                </h2>

                {/* Range switcher with a sliding thumb */}
                <div
                  role="radiogroup"
                  aria-label="Time range"
                  className="relative flex rounded-[10px] border border-neutral-200 bg-neutral-50 p-1"
                >
                  {RANGES.map((item) => {
                    const selected = range === item
                    return (
                      <button
                        key={item}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => selectRange(item)}
                        className={`relative isolate flex h-7 items-center gap-1.5 rounded-md px-3 text-[12px] font-medium transition-colors ${FOCUS_RING} ${
                          selected ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="range-thumb"
                            transition={reduce ? { duration: 0 } : SPRING}
                            className="absolute inset-0 -z-10 rounded-md bg-white ring-1 ring-neutral-200 shadow-[0_1px_2px_rgba(18,18,22,0.06)]"
                          />
                        )}
                        {item === 'LIVE' && (
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${
                              selected && isLivePlaying ? 'bg-[#ED1C24]' : 'bg-neutral-300'
                            }`}
                          />
                        )}
                        {item}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                {/* ---------------- Featured card: stats + chart ---------------- */}
                {/* Texture 3: 1px border gradient, red-200 to neutral-200 (design.md 5.8) */}
                <div className="rounded-[17px] bg-gradient-to-br from-[#FBC6C8] via-[#E1E1E4] to-[#E1E1E4] p-px transition-shadow duration-300 hover:shadow-[0_8px_32px_-8px_rgba(237,28,36,0.35)]">
                  <div className="h-full rounded-2xl bg-white p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-[14px] font-semibold text-neutral-900">Delivery rhythm</h3>
                        <span className="rounded-full border border-[#FBC6C8] bg-[#FEF2F2] px-2 py-0.5 text-[12px] font-medium leading-4 text-[#C9141B] tabular-nums">
                          <Swap k={currentData.trend} />
                        </span>
                      </div>
                      <span className="hidden text-[12px] text-neutral-500 sm:inline">
                        Releases per cycle
                      </span>
                    </div>

                    {/* Stat row with fading dividers */}
                    <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr]">
                      <Stat
                        label="Active projects"
                        value={currentData.activeProjects}
                        caption={currentData.activeDelta}
                        up
                      />
                      <FadeDivider />
                      <Stat
                        label="Shipments"
                        value={currentData.shipments}
                        caption={currentData.shipmentsNote}
                      />
                      <FadeDivider />
                      <Stat
                        label="Focus rhythm"
                        value={currentData.focusTime}
                        caption={currentData.focusDelta}
                      />
                    </div>

                    {/* Chart. pt-9 leaves room for the tooltip above the tallest bar. */}
                    <div className="relative mt-6 pt-9">
                      <div className="relative h-[132px]">
                        {/* Hairline gridlines */}
                        <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
                          {[0, 1, 2, 3].map((i) => (
                            <span
                              key={i}
                              className={`h-px w-full ${i === 3 ? 'bg-neutral-200' : 'bg-neutral-100'}`}
                            />
                          ))}
                        </div>

                        {/* Scanning playhead. Moves by `left`, so it actually crosses the chart. */}
                        {isLivePlaying && !reduce && (
                          <motion.div
                            aria-hidden
                            initial={{ left: '0%', opacity: 0 }}
                            animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                            transition={{
                              left: { duration: 3.5, repeat: Infinity, ease: 'linear' },
                              opacity: {
                                duration: 3.5,
                                repeat: Infinity,
                                ease: 'linear',
                                times: [0, 0.1, 0.9, 1],
                              },
                            }}
                            className="pointer-events-none absolute inset-y-0 z-10 w-0"
                          >
                            <span className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#ED1C24]/10 to-transparent" />
                            <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#ED1C24] to-transparent" />
                          </motion.div>
                        )}

                        {/* Bars */}
                        <div className="relative flex h-full items-end gap-1 sm:gap-1.5">
                          {bars.map((value, index) => {
                            const isLast = index === bars.length - 1
                            const isActive = hoveredBar === index
                            const highlight = isActive || isLast
                            const pos =
                              index < 2
                                ? 'left-0'
                                : index > bars.length - 3
                                ? 'right-0'
                                : 'left-1/2 -translate-x-1/2'

                            return (
                              <div
                                key={index}
                                tabIndex={0}
                                aria-label={`Cycle ${index + 1}: ${value} releases`}
                                onMouseEnter={() => setHoveredBar(index)}
                                onMouseLeave={() => setHoveredBar(null)}
                                onFocus={() => setHoveredBar(index)}
                                onBlur={() => setHoveredBar(null)}
                                className="relative flex h-full flex-1 cursor-pointer items-end justify-center outline-none"
                              >
                                <div className="relative h-full w-full max-w-[20px]">
                                  {/* Glow lives on its own layer because the mask would clip a box-shadow */}
                                  <motion.div
                                    aria-hidden
                                    initial={false}
                                    animate={{ height: `${value}%` }}
                                    transition={SPRING}
                                    className={`absolute inset-x-0 bottom-0 rounded-[3px] bg-[#ED1C24] blur-[10px] transition-opacity duration-200 ${
                                      highlight ? 'opacity-40' : 'opacity-0'
                                    }`}
                                  />
                                  <motion.div
                                    aria-hidden
                                    initial={false}
                                    animate={{ height: `${value}%` }}
                                    transition={SPRING}
                                    style={{ maskImage: SEGMENT_MASK, WebkitMaskImage: SEGMENT_MASK }}
                                    className={`absolute inset-x-0 bottom-0 rounded-[3px] transition-colors duration-200 ${
                                      highlight ? 'bg-[#ED1C24]' : 'bg-neutral-300'
                                    }`}
                                  />
                                </div>

                                {isActive && (
                                  <div
                                    className={`absolute z-20 ${pos}`}
                                    style={{ bottom: `calc(${value}% + 10px)` }}
                                  >
                                    <motion.div
                                      initial={reduce ? false : { opacity: 0, y: 4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.15, ease: EASE }}
                                      className="pointer-events-none flex items-center gap-2 whitespace-nowrap rounded-md border border-neutral-200 bg-white/90 px-2 py-1 text-[12px] backdrop-blur-md shadow-[0_4px_12px_-2px_rgba(18,18,22,0.08),0_2px_4px_rgba(18,18,22,0.04)]"
                                    >
                                      <span className="text-neutral-500 tabular-nums">Cycle {index + 1}</span>
                                      <span className="font-medium text-neutral-900 tabular-nums">
                                        {value} releases
                                      </span>
                                    </motion.div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between text-[12px] text-neutral-500">
                        <span>Sprint kickoff</span>
                        <span className="hidden sm:inline">Continuous delivery</span>
                        <span>Release target</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- Quiet card: checklist ---------------- */}
                <div className="relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-5 sm:p-6">
                  <Grain />
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[14px] font-semibold text-neutral-900">Sprint deliverables</h3>
                      <span className="text-[12px] text-neutral-500 tabular-nums">
                        {doneCount} of {tasks.length}
                      </span>
                    </div>

                    <ul className="mt-3 divide-y divide-neutral-200/70">
                      {tasks.map((task) => (
                        <li key={task.id}>
                          <button
                            type="button"
                            aria-pressed={task.done}
                            onClick={() => toggleTask(task.id)}
                            className={`group flex w-full items-start gap-3 rounded-lg py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1C24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]`}
                          >
                            <span
                              className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border transition-colors duration-200 ${
                                task.done
                                  ? 'border-neutral-900 bg-neutral-900'
                                  : 'border-neutral-300 bg-white group-hover:border-[#ED1C24]'
                              }`}
                            >
                              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                                <motion.path
                                  d="M2.5 6.2l2.4 2.4 4.6-5"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  initial={false}
                                  animate={{ pathLength: task.done ? 1 : 0, opacity: task.done ? 1 : 0 }}
                                  transition={{ duration: 0.2, ease: EASE }}
                                />
                              </svg>
                            </span>

                            <span className="min-w-0 flex-1">
                              <span
                                className={`block text-[13px] font-medium leading-5 transition-colors ${
                                  task.done
                                    ? 'text-neutral-400 line-through decoration-neutral-300'
                                    : 'text-neutral-900'
                                }`}
                              >
                                {task.title}
                              </span>
                              <span className="block text-[12px] leading-[18px] text-neutral-500">
                                {task.tag}
                              </span>
                            </span>

                            <span
                              title={task.dev}
                              className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-neutral-200 bg-white text-[11px] font-medium text-neutral-600"
                            >
                              {task.dev[0]}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Segmented progress echoes the chart's sliced bars */}
                    <div className="mt-auto pt-4">
                      <div className="flex gap-1">
                        {tasks.map((t) => (
                          <span
                            key={t.id}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              t.done ? 'bg-neutral-900' : 'bg-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="mt-2.5 flex items-center justify-between text-[12px] text-neutral-500 tabular-nums">
                        <span>
                          {doneCount}/{tasks.length} milestones
                        </span>
                        <span className={allDone ? 'font-medium text-[#C9141B]' : ''}>
                          {allDone ? 'On target' : `${percent}% complete`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
