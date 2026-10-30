import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ArrowLink, PrimaryButton, SecondaryButton } from './components/Button'
import Navbar from './components/Navbar'
import ProductDashboard from './components/ProductDashboard'
import Reveal from './components/Reveal'
import SelectedWork from './components/SelectedWork'
import Services from './components/Services'
import TechStack from './components/TechStack'

const Arrow = ({ className = '' }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-5 w-5 ${className}`}><path d="M3 10h13M11 5l5 5-5 5" /></svg>
const Chevron = ({ open }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-5 w-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}><path d="m5 7.5 5 5 5-5" /></svg>
const SecurityOutlined = () => <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#ED1C24]" />
const CodeRounded = () => <span aria-hidden="true" className="h-2 w-2 rounded-full border border-neutral-400" />

const processSteps = [
  ['01', 'Align', 'We get clear on the opportunity, the user, and what success needs to look like.'],
  ['02', 'Shape', 'We turn the direction into a focused system of screens, states, and decisions.'],
  ['03', 'Build', 'We ship in tight loops, keeping the work visible and the feedback useful.'],
  ['04', 'Refine', 'We polish the edges, test the experience, and leave the product stronger.'],
]

const faqs = [
  ['What kind of projects do you take on?', 'Websites, SaaS products, internal tools, and customer-facing applications where design and engineering need to work as one.'],
  ['Can you work with an existing product or codebase?', 'Yes. We can join at the strategy, design, frontend, or product engineering stage and build around what already works.'],
  ['How do projects usually begin?', 'A short conversation is enough to start. We will map the opportunity, the current state, and a sensible first milestone.'],
  ['Do you provide ongoing support?', 'Support can continue after launch through focused iterations, product improvements, and engineering partnership.'],
  ['What does a typical engagement include?', 'The exact shape depends on the work. Common pieces include discovery, product direction, UI systems, frontend development, and launch support.'],
]

const logos = ['[[Client logo]]', '[[Client logo]]', '[[Client logo]]', '[[Client logo]]', '[[Client logo]]']

function App() {
  const [openFaq, setOpenFaq] = useState(0)
  const { scrollYProgress } = useScroll()
  const auraY = useTransform(scrollYProgress, [0, 0.25], [0, -60])

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-neutral-900">
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[#ED1C24]" style={{ scaleX: scrollYProgress }} />
      <Navbar />

      <main id="top">
        <section className="relative isolate border-b border-[#E6D8C5] bg-[#FFF7EB] px-5 pb-0 pt-20 sm:pt-28 lg:pt-32">
          {/* Layered soft red auras with slow ambient drift per designer.md */}
          <motion.div
            style={{ y: auraY }}
            animate={{
              x: [-12, 12, -12],
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden"
          >
            <div className="absolute left-[14%] top-8 h-[460px] w-[460px] rounded-full bg-[#FFF1D9] opacity-80 blur-[130px]" />
            <div className="absolute right-[10%] top-16 h-[540px] w-[540px] rounded-full bg-[#FFF4E3] opacity-85 blur-[150px]" />
            <div className="absolute left-1/2 top-4 -translate-x-1/2 h-[340px] w-[680px] rounded-full bg-[#ED1C24]/[0.06] blur-[120px]" />
          </motion.div>

          {/* 12-column hairline vertical grid lines with fade mask */}
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto grid h-[680px] max-w-[1200px] grid-cols-6 px-5 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_75%,transparent)] sm:grid-cols-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-neutral-200/70 first:border-l" />
            ))}
          </div>

          {/* Dot grid texture: 24px spacing, 1px dots, faded out with radial mask */}
          <div className="texture-dots pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

          {/* Grain texture: monochrome noise overlay with multiply blend per designer.md */}
          <div className="texture-grain pointer-events-none absolute inset-0 -z-10 opacity-35 mix-blend-multiply" />

          <Reveal className="mx-auto max-w-[900px] text-center">
            {/* Glass pill eyebrow with live beacon */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200/90 bg-white/90 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C9141B] shadow-[0_2px_12px_-2px_rgba(237,28,36,0.12)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ED1C24] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ED1C24]" />
              </span>
              <span>Digital product studio</span>
            </div>

            {/* Headline gradient: neutral-900 to neutral-600, with single keyword in brand red */}
            <h1 className="mx-auto max-w-[880px] text-balance text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              <span className="bg-gradient-to-b from-[#121216] via-[#121216] to-[#4B4B53] bg-clip-text text-transparent">
                We make complex ideas feel
              </span>{' '}
              <span className="text-[#ED1C24]">simple.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-[610px] text-[17px] leading-7 text-neutral-600">
              Websites, SaaS products, and applications built with clarity, craft, and a close eye on what matters.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton>Start a project</PrimaryButton>
              <SecondaryButton>Explore our work</SecondaryButton>
            </div>
          </Reveal>

          {/* Dynamic interactive dashboard */}
          <ProductDashboard />
        </section>


        <Reveal className="mx-auto max-w-[1200px] px-5 py-16 lg:px-0 lg:py-20"><div className="flex flex-col gap-5 border-b border-neutral-200 pb-10 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-medium text-neutral-500">Built for teams who care about the details.</p><div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{logos.map((logo, index) => <span key={index} className="rounded-md border border-dashed border-neutral-300 px-3 py-2">{logo}</span>)}</div></div></Reveal>

        <Services />

        <section id="process" className="px-5 py-20 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div className="max-w-[530px]"><div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C9141B]">How we work</div><h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.045em]">A calm process with momentum built in.</h2></div><p className="max-w-[380px] text-base leading-7 text-neutral-600">Small, focused loops keep the work moving and the decisions clear.</p></Reveal><div className="mt-14 grid border-y border-neutral-200 md:grid-cols-4">{processSteps.map(([number, title, copy], index) => <Reveal key={number} delay={index * 0.06} className="group border-b border-neutral-200 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"><div className="mb-12 flex items-center justify-between"><span className="text-sm font-semibold tabular-nums text-[#ED1C24]">{number}</span>{index < processSteps.length - 1 && <Arrow className="hidden text-neutral-300 transition-transform duration-300 group-hover:translate-x-1 md:block" />}</div><h3 className="text-xl font-semibold tracking-[-0.02em]">{title}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p></Reveal>)}</div></div></section>

        <SelectedWork />

        <section className="px-5 py-20 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C9141B]">Why Zenbrain</div><h2 className="max-w-[680px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.045em]">The right amount of rigor. The right amount of ease.</h2></Reveal><div className="mt-12 grid gap-5 lg:grid-cols-3">{[['01', 'Clarity before velocity', 'The strongest work starts with the right question.'], ['02', 'Design that ships', 'Every screen is shaped with implementation in mind.'], ['03', 'A partner, not a handoff', 'You get a senior team that stays close to the outcome.']].map(([number, title, copy], index) => <Reveal key={number} delay={index * 0.06}><div className="border-t border-neutral-200 pt-5"><div className="text-sm font-semibold text-[#ED1C24]">{number}</div><h3 className="mt-12 text-xl font-semibold tracking-[-0.025em]">{title}</h3><p className="mt-3 max-w-[290px] text-sm leading-6 text-neutral-600">{copy}</p></div></Reveal>)}</div><Reveal className="mt-16 grid gap-5 border-t border-neutral-200 pt-8 sm:grid-cols-3"><div><div className="text-4xl font-semibold tracking-[-0.05em] text-neutral-900">[[00]]</div><div className="mt-2 text-sm text-neutral-500">Years building digital products</div></div><div><div className="text-4xl font-semibold tracking-[-0.05em] text-neutral-900">[[00]]</div><div className="mt-2 text-sm text-neutral-500">Projects shipped</div></div><div><div className="text-4xl font-semibold tracking-[-0.05em] text-neutral-900">[[00]]</div><div className="mt-2 text-sm text-neutral-500">People in the studio</div></div></Reveal></div></section>

        <section className="bg-neutral-25 px-5 py-20 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C9141B]">Client perspective</div><h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.045em]">A clear picture of work in motion.</h2></div><div className="max-w-[280px] text-sm leading-6 text-neutral-500">Illustrative product moments—replace with approved project evidence when available.</div></Reveal><div className="mt-12 grid gap-5 lg:grid-cols-3">{[['Release board','12 items ready','Design and development moving in one shared view.'], ['Component audit','96% coverage','A practical system inventory that keeps handoffs clean.'], ['Launch checklist','3 decisions left','The final details surfaced early, before they become blockers.']].map(([label, metric, copy], item) => <Reveal key={label} delay={item * 0.06}><motion.div whileHover={{ y: -3 }} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(18,18,22,0.05)]"><div className="relative h-28 overflow-hidden border-b border-neutral-200 bg-neutral-50 p-5"><div className="texture-dots absolute inset-0 opacity-35" /><div className="relative flex items-end gap-2 pt-8">{[40, 70, 55, 88, 64].map((height, i) => <motion.span key={i} animate={{ height: [`${height - 12}%`, `${height}%`, `${height - 12}%`] }} transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }} className="w-5 rounded-t bg-neutral-900/80 last:bg-[#ED1C24]" />)}</div></div><div className="p-7"><div className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C9141B]">{label}</div><div className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-neutral-900">{metric}</div><p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p></div></motion.div></Reveal>)}</div></div></section>

        <section id="technology" className="px-5 py-20 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C9141B]">Technology</div><h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.045em]">The tools stay quiet. The product speaks.</h2></div><p className="max-w-[330px] text-sm leading-6 text-neutral-600">A flexible stack selected around the product, the team, and the next stage of growth.</p></Reveal><TechStack /></div></section>

        <section id="faq" className="relative overflow-hidden bg-neutral-25 px-5 py-20 lg:py-32"><div className="mx-auto grid max-w-[1200px] gap-10 rounded-[24px] border border-neutral-200 bg-white p-6 shadow-[0_12px_32px_-26px_rgba(18,18,22,0.22)] lg:grid-cols-[0.8fr_1.2fr] lg:p-12"><Reveal className="lg:sticky lg:top-28 lg:self-start"><div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C9141B]">FAQ</div><h2 className="max-w-[400px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.045em]">Good questions. Better work.</h2><p className="mt-5 max-w-[330px] text-base leading-7 text-neutral-600">A few practical answers before we start.</p></Reveal><div className="rounded-2xl border border-neutral-200 px-5 sm:px-7">{faqs.map(([question, answer], index) => <Reveal key={question} delay={index * 0.04}><div className="border-t border-neutral-200 first:border-t-0"><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-semibold text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]" aria-expanded={openFaq === index}><span>{question}</span><Chevron open={openFaq === index} /></button><AnimatePresence initial={false}>{openFaq === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden"><p className="max-w-[650px] pb-6 pr-10 text-sm leading-6 text-neutral-600">{answer}</p></motion.div>}</AnimatePresence></div></Reveal>)}</div></div></section>

        <section id="contact" className="relative isolate overflow-hidden border-y border-neutral-100 bg-[#FAFAFA] px-5 py-24 text-center lg:py-32"><div className="texture-grain pointer-events-none absolute inset-0 -z-10 opacity-40" /><div className="texture-dots pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" /><motion.div animate={{ x: [-14, 14, -14], y: [-8, 8, -8] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-[700px] rounded-full bg-red-100/70 blur-[120px]" /><div className="mx-auto max-w-[700px]"><Reveal><div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C9141B]">Have an idea?</div><h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">Let’s make it clear, useful, and real.</h2><p className="mx-auto mt-6 max-w-[520px] text-base leading-7 text-neutral-600">Tell us what you’re building, where it is today, and where you want it to go.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><PrimaryButton>Start a conversation</PrimaryButton><SecondaryButton href="mailto:hello@example.com">hello@example.com</SecondaryButton></div></Reveal></div></section>
      </main>

      <footer className="border-t border-neutral-200 bg-neutral-25 px-5 py-12"><div className="mx-auto grid max-w-[1200px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"><div><a href="#top" className="flex items-center gap-2.5 text-sm font-semibold tracking-[-0.02em] text-neutral-900"><span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#ED1C24] text-sm font-semibold text-white">z</span>zenbrain</a><p className="mt-5 max-w-[240px] text-sm leading-6 text-neutral-500">A digital product studio for teams building what’s next.</p></div><div><div className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-400">Explore</div><div className="flex flex-col gap-3 text-sm text-neutral-600"><a href="#services" className="hover:text-neutral-900">Services</a><a href="#process" className="hover:text-neutral-900">Process</a><a href="#work" className="hover:text-neutral-900">Work</a></div></div><div><div className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-400">Connect</div><div className="flex flex-col gap-3 text-sm text-neutral-600"><a href="mailto:hello@example.com" className="hover:text-neutral-900">Email</a><a href="#contact" className="hover:text-neutral-900">Start a project</a><a href="#top" className="hover:text-neutral-900">Back to top</a></div></div><div><div className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-400">Built with care</div><div className="flex items-center gap-2 text-sm text-neutral-500"><SecurityOutlined sx={{ fontSize: 18 }} /> Thoughtful by default</div><div className="mt-3 flex items-center gap-2 text-sm text-neutral-500"><CodeRounded sx={{ fontSize: 18 }} /> Made for the web</div></div></div><div className="mx-auto mt-12 flex max-w-[1200px] flex-col justify-between gap-3 border-t border-neutral-200 pt-5 text-xs text-neutral-400 sm:flex-row"><span>© 2026 Zenbrain. [[Legal copy]]</span><span>[[Privacy]] · [[Terms]]</span></div></footer>
    </div>
  )
}

export default App
