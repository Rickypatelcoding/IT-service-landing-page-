import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PrimaryButton } from './Button'
const MenuIcon = ({ open }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="h-5 w-5"><path d={open ? 'm5 5 10 10M15 5 5 15' : 'M3 5h14M3 10h14M3 15h14'} /></svg>

const links = ['Services', 'Process', 'Work', 'FAQ']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/72 shadow-[0_1px_0_rgba(18,18,22,0.02)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 lg:px-0">
        <a href="#top" className="flex items-center gap-2.5 text-sm font-semibold tracking-[-0.02em] text-neutral-900" onClick={closeMenu}>
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#ED1C24] text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(237,28,36,0.45)]">z</span>
          zenbrain
        </a>
        <nav className="hidden items-center gap-8 text-sm text-neutral-600 md:flex" aria-label="Primary navigation">
          {links.map((label) => <a key={label} href={`#${label.toLowerCase()}`} className="relative py-2 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#ED1C24] after:transition-all hover:text-neutral-900 hover:after:w-full">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex"><a href="#contact" className="inline-flex min-h-11 items-center rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-700 transition hover:border-[#ED1C24] hover:text-[#C9141B]">Let’s talk</a><PrimaryButton className="min-h-11 rounded-full px-5 text-sm">Start a project</PrimaryButton></div>
        <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-[10px] border border-neutral-200 text-neutral-900 md:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
          <MenuIcon open={menuOpen} />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-neutral-200 bg-white px-5 py-5 md:hidden"><div className="flex flex-col gap-1 text-base text-neutral-700">{links.map((label) => <a key={label} href={`#${label.toLowerCase()}`} onClick={closeMenu} className="rounded-lg px-3 py-3 hover:bg-neutral-50">{label}</a>)}<a href="#contact" onClick={closeMenu} className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-[#ED1C24] px-4 py-3 font-semibold text-white">Start a project</a></div></motion.nav>}
      </AnimatePresence>
    </header>
  )
}
