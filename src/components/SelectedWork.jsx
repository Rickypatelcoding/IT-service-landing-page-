import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TELEMETRY_DATA = {
  "90m": {
    latency: "14.2 ms",
    delta: "-38% vs baseline",
    throughput: "142.8k req/s",
    error: "0.002%",
    bars: [48, 62, 55, 76, 68, 84, 72, 89, 93, 86, 95, 100],
    times: ["10:30 UTC", "11:15 UTC", "Live stream"],
  },
  "24h": {
    latency: "16.8 ms",
    delta: "-29% vs baseline",
    throughput: "128.4k req/s",
    error: "0.004%",
    bars: [60, 52, 68, 74, 63, 79, 85, 77, 88, 91, 84, 96],
    times: ["00:00 UTC", "12:00 UTC", "Live stream"],
  },
  "7d": {
    latency: "15.1 ms",
    delta: "-41% vs baseline",
    throughput: "136.2k req/s",
    error: "0.001%",
    bars: [42, 58, 66, 71, 78, 74, 83, 87, 90, 94, 91, 99],
    times: ["Mon 00:00", "Thu 12:00", "Live stream"],
  },
};

// Subtle 3.5% monochrome grain data URI (no external assets needed)
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`;

const EASE_OUT_EXPO = [0.2, 0.8, 0.2, 1];

export default function SelectedWork() {
  const [range, setRange] = useState("90m");
  const [hoveredBar, setHoveredBar] = useState(null);
  const activeTelemetry = TELEMETRY_DATA[range];

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#FAFAFA] px-5 py-[72px] md:py-24 lg:py-32 font-['Inter',sans-serif] text-[#121216] antialiased selection:bg-[#FDE3E4] selection:text-[#C9141B]"
    >
      {/* 1. Page-level Subtle Monochrome Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: GRAIN_BG }}
        aria-hidden="true"
      />

      {/* 2. Architectural Hairline Vertical Grid Lines (Faded top & bottom) */}
      <div
        className="pointer-events-none absolute inset-0 mx-auto max-w-[1200px] border-x border-[#EDEDEF] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        aria-hidden="true"
      >
        <div className="grid h-full grid-cols-4 lg:grid-cols-12">
          <div className="border-r border-[#EDEDEF]/60 lg:col-span-4" />
          <div className="hidden border-r border-[#EDEDEF]/60 lg:col-span-3 lg:block" />
          <div className="hidden lg:col-span-5 lg:block" />
        </div>
      </div>

      {/* 3.Fading Top Section Hairline Divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E1E1E4] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="flex flex-col justify-between gap-6 border-b border-[#E1E1E4]/80 pb-10 sm:flex-row sm:items-end"
        >
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ED1C24]" />
              <span className="text-[13px] font-semibold uppercase leading-4 tracking-[0.08em] text-[#C9141B]">
                Selected work
              </span>
            </div>
            <h2 className="mt-3 text-[30px] font-semibold leading-[36px] tracking-[-0.03em] text-[#121216] sm:text-[40px] sm:leading-[46px]">
              Proof lives in the details.
            </h2>
            <p className="mt-3 max-w-[540px] text-[16px] font-normal leading-[26px] text-[#4B4B53]">
              Production web applications, developer platforms, and clinical systems engineered for sub-second response and daily scale.
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex h-11 shrink-0 items-center gap-2.5 rounded-[10px] border border-[#C9C9CE] bg-white px-4 text-[14px] font-medium text-[#121216] shadow-[0_1px_2px_rgba(18,18,22,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#9A9AA2] hover:bg-[#FAFAFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
          >
            <span>Start a project like these</span>
            <span
              className="text-[#6B6B74] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#121216]"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </motion.div>

        {/* 12-Column Bento Case Study Grid (7 cols Featured / 5 cols Secondary Stack) */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12">
          {/* ============================================================
              FEATURED CASE STUDY (Spans 7 of 12 columns)
              Features: 1px diagonal border gradient (red-200 -> neutral-200)
          ============================================================ */}
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.06, ease: EASE_OUT_EXPO }}
            className="group/card relative flex flex-col justify-between rounded-[16px] bg-gradient-to-br from-[#FBC6C8] via-[#E1E1E4] to-[#E1E1E4] p-px shadow-[0_4px_12px_-2px_rgba(18,18,22,0.08),0_2px_4px_rgba(18,18,22,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-12px_rgba(18,18,22,0.14)] lg:col-span-7"
          >
            <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[15px] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              {/* Top Visual Well: Light-mode architectural chamber with dot-grid & soft red aura */}
              <div className="relative overflow-hidden border-b border-[#E1E1E4] bg-[#F5F5F6] px-5 pt-6 sm:px-8 sm:pt-8">
                {/* Texture 1: 24px 1px Dot Grid with radial edge mask */}
                <div
                  className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#C9C9CE_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_85%_85%_at_50%_45%,black_35%,transparent_100%)] opacity-65"
                  aria-hidden="true"
                />

                {/* Texture 2: Soft Off-Center Red Aura Glow */}
                <div
                  className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#FDE3E4] via-[#FBC6C8]/50 to-transparent blur-3xl opacity-70"
                  aria-hidden="true"
                />

                {/* Texture 3: Subtle Monochrome Grain */}
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{ backgroundImage: GRAIN_BG }}
                  aria-hidden="true"
                />

                {/* Top Meta Bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[12px]">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-medium text-[#4B4B53]">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#C9C9CE]" />
                    <span>klaro.network</span>
                    <span className="text-[#9A9AA2]">/</span>
                    <span className="text-[#121216]">telemetry-v2.4</span>
                  </div>

                  {/* Interactive Timeframe Switcher + Live Beacon */}
                  <div className="flex items-center gap-2">
                    <div
                      className="inline-flex rounded-[6px] border border-[#E1E1E4] bg-white/90 p-0.5 backdrop-blur-sm"
                      role="group"
                      aria-label="Telemetry timeframe"
                    >
                      {["90m", "24h", "7d"].map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setRange(key)}
                          className={`rounded-[4px] px-2 py-0.5 text-[11px] font-medium tabular-nums transition-colors ${
                            range === key
                              ? "bg-[#121216] text-white"
                              : "text-[#6B6B74] hover:text-[#121216]"
                          }`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FBC6C8] bg-[#FEF2F2] px-2.5 py-0.5 text-[11px] font-medium text-[#C9141B]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ED1C24] opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ED1C24]" />
                      </span>
                      99.98% SLA
                    </span>
                  </div>
                </div>

                {/* Cropped Product Mockup Window (Docked at bottom edge of container) */}
                <div className="relative z-10 mt-5 translate-y-px rounded-t-[12px] border border-b-0 border-[#E1E1E4] bg-white/95 p-5 shadow-[0_12px_32px_-8px_rgba(18,18,22,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md">
                  {/* Telemetry KPI Strip */}
                  <div className="grid grid-cols-3 gap-4 border-b border-[#EDEDEF] pb-4">
                    <div>
                      <div className="text-[11px] font-medium text-[#6B6B74]">
                        p99 Latency
                      </div>
                      <div className="mt-1 text-[20px] font-semibold leading-7 tracking-[-0.02em] text-[#121216] tabular-nums">
                        {activeTelemetry.latency}
                      </div>
                      <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                        <span>↓</span>
                        <span>{activeTelemetry.delta}</span>
                      </div>
                    </div>

                    <div className="border-l border-[#EDEDEF] pl-4">
                      <div className="text-[11px] font-medium text-[#6B6B74]">
                        Ingest Throughput
                      </div>
                      <div className="mt-1 text-[20px] font-semibold leading-7 tracking-[-0.02em] text-[#121216] tabular-nums">
                        {activeTelemetry.throughput}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[#6B6B74] tabular-nums">
                        18 global edge regions
                      </div>
                    </div>

                    <div className="border-l border-[#EDEDEF] pl-4">
                      <div className="text-[11px] font-medium text-[#6B6B74]">
                        Error Budget
                      </div>
                      <div className="mt-1 text-[20px] font-semibold leading-7 tracking-[-0.02em] text-[#121216] tabular-nums">
                        {activeTelemetry.error}
                      </div>
                      <div className="mt-0.5 text-[11px] font-medium text-[#4B4B53]">
                        Zero active incidents
                      </div>
                    </div>
                  </div>

                  {/* Interactive Telemetry Histogram with Scanning Beam */}
                  <div className="relative mt-5 pt-2">
                    {/* Horizontal Reference Grid Lines */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-2 bottom-6 flex flex-col justify-between"
                      aria-hidden="true"
                    >
                      <div className="h-px border-b border-dashed border-[#EDEDEF]" />
                      <div className="h-px border-b border-dashed border-[#EDEDEF]" />
                    </div>

                    {/* Scanning Telemetry Beam (3.5s horizontal loop) */}
                    <motion.div
                      animate={{ left: ["0%", "100%"] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="pointer-events-none absolute top-0 bottom-5 z-20 w-px bg-gradient-to-b from-transparent via-[#ED1C24]/50 to-transparent"
                      aria-hidden="true"
                    />

                    <div className="relative z-10 flex h-[84px] items-end gap-1.5 sm:gap-2">
                      {activeTelemetry.bars.map((height, i) => {
                        const isLatest = i === activeTelemetry.bars.length - 1;
                        const isHovered = hoveredBar === i;

                        return (
                          <div
                            key={i}
                            onMouseEnter={() => setHoveredBar(i)}
                            onMouseLeave={() => setHoveredBar(null)}
                            className="group/bar relative flex h-full flex-1 items-end cursor-pointer"
                          >
                            {/* Floating Tooltip on Hover */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 4 }}
                                  transition={{ duration: 0.15 }}
                                  className="pointer-events-none absolute -top-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded bg-[#121216] px-1.5 py-0.5 text-[10px] font-medium text-white tabular-nums shadow-sm"
                                >
                                  {height}k/s
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <motion.div
                              layout
                              initial={{ height: 0 }}
                              animate={{ height: `${height * 0.78}%` }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 24,
                              }}
                              className={`w-full rounded-t-[3px] transition-colors duration-150 ${
                                isLatest
                                  ? "bg-[#ED1C24] shadow-[0_4px_12px_rgba(237,28,36,0.35)]"
                                  : isHovered
                                  ? "bg-[#33333A]"
                                  : "bg-[#E1E1E4] group-hover/card:bg-[#C9C9CE]"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 flex justify-between font-mono text-[10px] text-[#6B6B74] tabular-nums">
                      <span>{activeTelemetry.times[0]}</span>
                      <span>{activeTelemetry.times[1]}</span>
                      <span className="font-medium text-[#C9141B]">
                        ● {activeTelemetry.times[2]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body & Outcome Metrics */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex h-7 items-center rounded-full border border-[#E1E1E4] bg-[#F5F5F6] px-3 text-[12px] font-medium text-[#4B4B53]">
                      Cloud Infrastructure · Next.js & Rust WebSockets
                    </span>
                    <span className="font-mono text-[12px] font-medium text-[#6B6B74] tabular-nums">
                      4.2s → 480ms load
                    </span>
                  </div>

                  <h3 className="mt-4 text-[24px] font-semibold leading-[32px] tracking-[-0.02em] text-[#121216] sm:text-[28px] sm:leading-[36px]">
                    Klaro Telemetry — Cloud Observability Engine
                  </h3>

                  <p className="mt-2.5 max-w-[62ch] text-[16px] font-normal leading-[26px] text-[#4B4B53]">
                    Unified 18 fragmented monitoring tools into a single real-time console. Cut initial dashboard hydration from 4.2s to 480ms under 140k req/s stream loads.
                  </p>
                </div>

                {/* Impact Metric Pill Row + Action Link */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#EDEDEF] pt-5">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-[18px] font-semibold tracking-[-0.02em] text-[#121216] tabular-nums">
                        8.7×
                      </div>
                      <div className="text-[12px] text-[#6B6B74]">
                        Faster query render
                      </div>
                    </div>
                    <div className="h-7 w-px bg-[#E1E1E4]" />
                    <div>
                      <div className="text-[18px] font-semibold tracking-[-0.02em] text-[#121216] tabular-nums">
                        18 → 1
                      </div>
                      <div className="text-[12px] text-[#6B6B74]">
                        Unified consoles
                      </div>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="group/link inline-flex items-center gap-1.5 text-[14px] font-medium text-[#121216] transition-colors hover:text-[#C9141B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
                  >
                    <span>Read Klaro case study</span>
                    <span
                      className="text-[#C9141B] transition-transform duration-200 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ============================================================
              SECONDARY CASE STUDIES COLUMN (Spans 5 of 12 columns)
          ============================================================ */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Secondary Card 1: VaultPay */}
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT_EXPO }}
              className="group/card flex flex-1 flex-col justify-between overflow-hidden rounded-[16px] border border-[#E1E1E4] bg-white p-6 shadow-[0_1px_2px_rgba(18,18,22,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9C9CE] hover:shadow-[0_4px_12px_-2px_rgba(18,18,22,0.08),0_2px_4px_rgba(18,18,22,0.04)] sm:p-8"
            >
              <div>
                {/* Textured Micro-UI Well */}
                <div className="work-motion relative overflow-hidden rounded-[12px] border border-[#E6D8C5] bg-[#FFF9F0] p-4">
                  {/* Subtle Dot Grid inside Box */}
                  <div
                    className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#C9C9CE_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_100%)] opacity-60"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 rounded-[8px] border border-[#E1E1E4] bg-white p-3.5 shadow-[0_1px_2px_rgba(18,18,22,0.04)]">
                    <div className="flex items-center justify-between gap-2 text-[12px]">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-5 items-center rounded bg-[#F5F5F6] px-1.5 font-mono text-[10px] font-medium text-[#4B4B53] border border-[#E1E1E4]">
                          POST /v1/settle
                        </span>
                        <span className="font-medium text-[#121216] tabular-nums">
                          #VP-4829
                        </span>
                      </div>
                      <span className="font-semibold text-[#121216] tabular-nums">
                        $240.00{" "}
                        <span className="text-[11px] font-normal text-[#6B6B74]">
                          / mo
                        </span>
                      </span>
                    </div>

                    {/* Multi-currency conversion bar */}
                    <div className="mt-3 flex items-center justify-between border-t border-[#EDEDEF] pt-2.5 text-[11px]">
                      <div className="flex items-center gap-1.5 text-[#6B6B74]">
                        <span>USD → EUR</span>
                        <span className="text-[#C9C9CE]">·</span>
                        <span className="font-mono text-[10px] text-[#4B4B53] tabular-nums">
                          0x8F…3B2A
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 tabular-nums">
                        <span className="h-1 w-1 rounded-full bg-emerald-600" />
                        Settled (280ms)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Copy Block */}
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-7 items-center rounded-full border border-[#E1E1E4] bg-[#F5F5F6] px-3 text-[12px] font-medium text-[#4B4B53]">
                      Fintech & Developer SDK
                    </span>
                    <span className="text-[13px] font-semibold text-[#C9141B] tabular-nums">
                      +42% conversion
                    </span>
                  </div>

                  <h3 className="mt-3 text-[20px] font-semibold leading-[28px] tracking-[-0.01em] text-[#121216]">
                    VaultPay Global Checkout & Billing
                  </h3>
                  <p className="mt-1.5 text-[14px] font-normal leading-[22px] text-[#4B4B53]">
                    Sub-second multi-currency checkout SDK and edge routing engine, lifting developer checkout completion by 42%.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#EDEDEF] pt-4">
                <a
                  href="#contact"
                  className="group/link inline-flex items-center gap-1.5 text-[14px] font-medium text-[#121216] transition-colors hover:text-[#C9141B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
                >
                  <span>View VaultPay architecture</span>
                  <span
                    className="text-[#6B6B74] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-[#C9141B]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </motion.article>

            {/* Secondary Card 2: Pulse EHR */}
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="group/card flex flex-1 flex-col justify-between overflow-hidden rounded-[16px] border border-[#E1E1E4] bg-white p-6 shadow-[0_1px_2px_rgba(18,18,22,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9C9CE] hover:shadow-[0_4px_12px_-2px_rgba(18,18,22,0.08),0_2px_4px_rgba(18,18,22,0.04)] sm:p-8"
            >
              <div>
                {/* Textured Micro-UI Well */}
                <div className="work-motion relative overflow-hidden rounded-[12px] border border-[#E6D8C5] bg-[#FFF9F0] p-4" style={{ animationDelay: '-1.8s' }}>
                  {/* Hairline Grid Texture inside Box */}
                  <div
                    className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#E1E1E4_1px,transparent_1px),linear-gradient(to_bottom,#E1E1E4_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_25%,transparent_100%)] opacity-55"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between px-1 text-[11px]">
                      <span className="font-semibold text-[#121216]">
                        Triage Queue · Ward 04
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#6B6B74]">
                        <kbd className="rounded border border-[#C9C9CE] bg-white px-1 py-0.2 text-[9px] text-[#33333A] shadow-[0_1px_0_#C9C9CE]">
                          ⌘K
                        </kbd>
                        <span>Quick chart</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-[8px] border border-[#E1E1E4] bg-white px-3 py-2 text-[11px] shadow-[0_1px_2px_rgba(18,18,22,0.04)]">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ED1C24]" />
                        <span className="font-medium text-[#121216]">
                          Dr. Vance · 3 consults
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#6B6B74] tabular-nums">
                        10:30 AM
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-[8px] border border-[#E1E1E4] bg-white/80 px-3 py-1.5 text-[11px]">
                      <span className="text-[#4B4B53]">
                        HL7 Lab Telemetry Sync
                      </span>
                      <span className="font-medium text-emerald-700 tabular-nums">
                        ✓ Verified (12ms)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Copy Block */}
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-7 items-center rounded-full border border-[#E1E1E4] bg-[#F5F5F6] px-3 text-[12px] font-medium text-[#4B4B53]">
                      Healthcare & Clinical UX
                    </span>
                    <span className="text-[13px] font-semibold text-[#121216] tabular-nums">
                      -3.5 hrs / wk
                    </span>
                  </div>

                  <h3 className="mt-3 text-[20px] font-semibold leading-[28px] tracking-[-0.01em] text-[#121216]">
                    Pulse EHR — Physician Workflow Portal
                  </h3>
                  <p className="mt-1.5 text-[14px] font-normal leading-[22px] text-[#4B4B53]">
                    Keyboard-first clinical charting system saving 3.5 hours per clinician weekly across 24 regional care facilities.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#EDEDEF] pt-4">
                <a
                  href="#contact"
                  className="group/link inline-flex items-center gap-1.5 text-[14px] font-medium text-[#121216] transition-colors hover:text-[#C9141B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
                >
                  <span>Explore Pulse platform</span>
                  <span
                    className="text-[#6B6B74] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-[#C9141B]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
