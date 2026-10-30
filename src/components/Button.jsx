import { motion } from 'motion/react'
const Arrow = ({ diagonal = false, className = '' }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-[18px] w-[18px] ${className}`}><path d={diagonal ? 'M5 15 15 5M7 5h8v8' : 'M3 10h13M11 5l5 5-5 5'} /></svg>

export function ArrowLink({ children, href = '#contact', light = false }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold transition-colors ${light ? 'text-white/80 hover:text-white' : 'text-neutral-900 hover:text-[#C9141B]'}`}
    >
      {children}
      <Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  )
}

export function PrimaryButton({ children, href = '#contact', className = '' }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#ED1C24] px-5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(18,18,22,0.08)] transition-shadow hover:bg-[#C9141B] hover:shadow-[0_8px_32px_-8px_rgba(237,28,36,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24] ${className}`}
    >
      {children}
      <Arrow />
    </motion.a>
  )
}

export function SecondaryButton({ children, href = '#work' }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-neutral-300 bg-white px-5 text-[15px] font-semibold text-neutral-900 shadow-[0_1px_2px_rgba(18,18,22,0.06)] transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
    >
      {children}
      <Arrow diagonal />
    </motion.a>
  )
}
