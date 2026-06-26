// Section divider: two thin gold hairlines meeting a small diamond, an
// understated nod to premium stationery. `bg` matches the section above so the
// divider reads as a seamless transition.
export default function Divider({
  bg = 'bg-crema',
  tone = 'light',
}: {
  readonly bg?: string
  readonly tone?: 'light' | 'dark'
}) {
  const line = tone === 'dark' ? 'via-gold/40' : 'via-gold/55'
  return (
    <div className={bg} aria-hidden="true">
      <div className="container-x">
        <div className="flex items-center justify-center gap-4 py-2 md:py-4">
          <span className={`h-px w-full max-w-[180px] bg-gradient-to-r from-transparent ${line} to-transparent`} />
          <span className="h-2 w-2 shrink-0 rotate-45 bg-gold" />
          <span className={`h-px w-full max-w-[180px] bg-gradient-to-l from-transparent ${line} to-transparent`} />
        </div>
      </div>
    </div>
  )
}
