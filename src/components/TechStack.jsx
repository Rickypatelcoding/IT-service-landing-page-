const technologies = [
  ['React', 'react', '61DAFB'], ['Next.js', 'nextdotjs', '121216'], ['TypeScript', 'typescript', '3178C6'],
  ['Node.js', 'nodedotjs', '5FA04E'], ['PostgreSQL', 'postgresql', '4169E1'], ['Figma', 'figma', 'F24E1E'],
  ['Tailwind CSS', 'tailwindcss', '06B6D4'], ['Motion', 'framer', '0055FF'], ['Vercel', 'vercel', '121216'],
  ['Docker', 'docker', '2496ED'], ['Sanity', 'sanity', 'F03E2F'], ['GitHub', 'github', '181717'],
]

export default function TechStack() {
  const rail = [...technologies, ...technologies]
  return (
    <div className="relative mt-12 overflow-hidden rounded-[24px] bg-white py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
      <div className="tech-rail flex w-max gap-4 px-2 hover:[animation-play-state:paused]">
        {rail.map(([name, slug, color], index) => (
          <div key={`${name}-${index}`} className="flex h-24 w-48 shrink-0 items-center gap-4 rounded-2xl bg-white px-5 shadow-[0_12px_28px_-22px_rgba(18,18,22,0.28)]">
            <img src={`https://cdn.simpleicons.org/${slug}/${color}`} alt="" width="36" height="36" className="h-9 w-9 object-contain" loading="lazy" />
            <div><div className="text-sm font-semibold text-black">{name}</div><div className="mt-1 text-xs text-black/55">Product toolkit</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
