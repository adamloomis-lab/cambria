import { company, menuGroups, type MenuGroup } from '../data/site'
import Button from '../components/Button'
import Backdrop from '../components/Backdrop'

function Group({ group }: { readonly group: MenuGroup }) {
  return (
    <section id={group.id} className="reveal scroll-mt-28 break-inside-avoid">
      <h2 className="font-display text-headline-md text-ink">{group.title}</h2>
      <span className="gold-rule mt-4 block w-[52px]" />
      {group.note && <p className="mt-4 text-body-md italic text-ink-soft">{group.note}</p>}

      <ul className="mt-6 space-y-5">
        {group.items.map((it) => (
          <li key={it.name} className={it.featured ? 'border-l-2 border-gold pl-4' : ''}>
            <div className="flex items-baseline">
              <h3 className={`font-display text-headline-sm ${it.featured ? 'text-oxblood' : 'text-ink'}`}>
                {it.name}
              </h3>
              {it.price && (
                <>
                  <span className="menu-leader" />
                  <span className="shrink-0 whitespace-nowrap font-sans text-[15px] font-semibold tracking-wide text-gold-deep">
                    {it.price}
                  </span>
                </>
              )}
            </div>
            {it.desc && <p className="mt-1.5 max-w-prose text-body-md text-ink-soft">{it.desc}</p>}
          </li>
        ))}
      </ul>

      {group.addOns && (
        <p className="mt-6 border-t border-line pt-4 text-[14px] leading-relaxed text-ink-faint">
          {group.addOns}
        </p>
      )}
    </section>
  )
}

export default function Menu() {
  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="relative flex min-h-[48vh] items-end overflow-hidden bg-charcoal">
        <Backdrop src="/images/fettuccine-pomodoro.webp" position="center 45%" />
        <div className="container-x relative z-10 pt-36 pb-16 text-center">
          <p className="eyebrow on-dark mx-auto">Made From Scratch</p>
          <h1 className="mt-4 font-display text-display-lg-mobile text-cream md:text-display-lg">Our Menu</h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-soft">
            Italian classics and modern favorites, hand-made in our kitchen. Many dishes can be made
            spicy or gluten-free, just ask your server.
          </p>
        </div>
      </section>

      {/* ---------- CATEGORY JUMP NAV ---------- */}
      <nav className="sticky top-20 z-30 border-b border-line bg-crema/95 backdrop-blur-md" aria-label="Menu sections">
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {menuGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="shrink-0 whitespace-nowrap border border-line px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-gold hover:text-oxblood"
            >
              {g.title}
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- MENU BODY ---------- */}
      <section className="bg-crema py-16 md:py-20">
        <div className="container-x">
          <div className="gap-x-16 md:columns-2 [&>section]:mb-14">
            {menuGroups.map((g) => (
              <Group key={g.id} group={g} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-3xl border-t border-line pt-8 text-center text-[13px] text-ink-faint">
            Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk
            of foodborne illness. Menu items may come in contact with or contain gluten, eggs, dairy, nuts
            and other common allergens. Prices subject to change.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button href="/reservations" variant="oxblood">
              Reserve a Table
            </Button>
            <Button href={company.doordashUrl} variant="gold-outline" external>
              Order on DoorDash
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
