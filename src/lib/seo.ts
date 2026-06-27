import { company, openingHours, menuGroups, reviews, type MenuGroup } from '../data/site'

// Production domain. The live Netlify site uses the apex as primary and 301s
// www -> apex, so canonicals/sitemap/OG/schema all use the apex to match the
// final served URL (no canonical->redirect mismatch).
export const SITE_URL = 'https://cambriasbistro.com'

const OG_IMAGE = '/images/spaghetti-pomodoro.webp'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Netlify serves pages with a trailing slash; keep canonical/sitemap URLs aligned.
export const pageUrl = (path: string) =>
  abs(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`)

function reviewNodes() {
  return reviews.map((r) => ({
    '@type': 'Review',
    reviewBody: r.quote,
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
  }))
}

function openingHoursSpec() {
  return openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }))
}

export function restaurantSchema() {
  const a = company.address
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: company.name,
    url: SITE_URL,
    image: abs(OG_IMAGE),
    logo: abs('/images/logo-dark.webp'),
    telephone: company.phone,
    priceRange: '$$',
    servesCuisine: ['Italian', 'Pizza', 'American', 'Bar'],
    description: company.shortBlurb,
    slogan: company.tagline,
    hasMenu: pageUrl('/menu'),
    acceptsReservations: 'True',
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Wadsworth, OH' },
      { '@type': 'AdministrativeArea', name: 'Medina County, OH' },
    ],
    openingHoursSpecification: openingHoursSpec(),
    review: reviewNodes(),
    sameAs: [company.social.facebook, company.social.instagram],
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: company.doordashUrl,
        inLanguage: 'en-US',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeMail',
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    publisher: { '@id': `${SITE_URL}/#restaurant` },
  }
}

// Extract a numeric price (first number) for schema Offers; undefined if none.
function parsePrice(price?: string): string | undefined {
  if (!price) return undefined
  const m = price.match(/(\d+(?:\.\d+)?)/)
  return m ? m[1] : undefined
}

function menuSectionSchema(group: MenuGroup) {
  return {
    '@type': 'MenuSection',
    name: group.title,
    ...(group.note ? { description: group.note } : {}),
    hasMenuItem: group.items.map((it) => {
      const price = parsePrice(it.price)
      return {
        '@type': 'MenuItem',
        name: it.name,
        ...(it.desc ? { description: it.desc } : {}),
        ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'USD' } } : {}),
      }
    }),
  }
}

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}/menu/#menu`,
    name: "Cambria's Bistro Menu",
    url: pageUrl('/menu'),
    inLanguage: 'en-US',
    provider: { '@id': `${SITE_URL}/#restaurant` },
    hasMenuSection: menuGroups.map(menuSectionSchema),
  }
}

const FAQS = [
  {
    q: "What are Cambria's Bistro's hours?",
    a: 'We’re open Tuesday through Thursday 4pm to 9pm, Friday and Saturday 12pm to 9pm, and Sunday 12pm to 4pm. We’re closed Mondays.',
  },
  {
    q: "Where is Cambria's Bistro located?",
    a: 'We’re in the heart of downtown Wadsworth at 132 Main St, Wadsworth, OH 44281, with on-street and nearby lot parking.',
  },
  {
    q: 'Do you take reservations?',
    a: 'Yes. For reservations and large parties, call (330) 331-5282 or send a reservation request through our website and we’ll confirm your table.',
  },
  {
    q: 'Do you host private events?',
    a: 'We do. We host rehearsal dinners, showers, birthdays, business gatherings and celebrations of life right here at Cambria’s. If you’re interested in hosting a private event, please contact us at (330) 331-5282.',
  },
  {
    q: 'Do you have vegetarian and gluten-free options?',
    a: 'Yes. Many dishes are vegetarian, and you can substitute gluten-free penne on most pastas. Please tell your server about any allergies, as items may come in contact with common allergens.',
  },
]

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  }
}

export const faqs = FAQS

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  jsonLd: object[]
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/'
  const ogImage = abs(OG_IMAGE)

  switch (path) {
    case '/':
      return {
        title: "Cambria's Bistro | Italian Restaurant in Wadsworth, OH",
        description:
          'A family-owned Italian bistro in downtown Wadsworth, Ohio, where time-honored recipes meet a modern grill and pub. Reservations: (330) 331-5282.',
        canonical: pageUrl('/'),
        ogImage,
        jsonLd: [restaurantSchema(), websiteSchema(), faqSchema()],
      }
    case '/menu':
      return {
        title: "Menu | Cambria's Bistro, Italian Dining in Wadsworth, OH",
        description:
          'Hand-made Italian in downtown Wadsworth: Nonna’s lasagna, stuffed shells, gnocchi pomodoro, shrimp a la vodka, flatbreads, stromboli, salads and dolci.',
        canonical: pageUrl('/menu'),
        ogImage: abs('/images/tortellini-vodka.webp'),
        jsonLd: [
          restaurantSchema(),
          menuSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
          ]),
        ],
      }
    case '/about':
      return {
        title: "Cambria's Bistro | Our Story, Family-Owned in Wadsworth",
        description:
          'A family-owned Italian bistro in downtown Wadsworth where time-honored recipes meet a modern grill and pub. Meet the family behind the menu at Cambria’s.',
        canonical: pageUrl('/about'),
        ogImage: abs('/images/storefront.webp'),
        jsonLd: [
          restaurantSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: pageUrl('/about'),
            about: { '@id': `${SITE_URL}/#restaurant` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Our Story', path: '/about' },
          ]),
        ],
      }
    case '/reservations':
      return {
        title: "Reservations | Cambria's Bistro, Wadsworth OH",
        description:
          'Reserve your table at Cambria’s Bistro in downtown Wadsworth. Send a reservation request online or call (330) 331-5282. We’ll confirm your table.',
        canonical: pageUrl('/reservations'),
        ogImage: abs('/images/stuffed-shells.webp'),
        jsonLd: [
          restaurantSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Reservations', path: '/reservations' },
          ]),
        ],
      }
    case '/contact':
      return {
        title: "Contact & Hours | Cambria's Bistro, Wadsworth OH",
        description: `Visit Cambria’s Bistro at ${company.addressOneLine}. Hours, directions, parking and contact details. Call ${company.phone}.`,
        canonical: pageUrl('/contact'),
        ogImage: abs('/images/storefront.webp'),
        jsonLd: [
          restaurantSchema(),
          faqSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: pageUrl('/contact'),
            about: { '@id': `${SITE_URL}/#restaurant` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ],
      }
    case '/employment':
      return {
        title: "Employment | Join the Team at Cambria's Bistro, Wadsworth OH",
        description:
          'Now hiring at Cambria’s Bistro in downtown Wadsworth. Front of house, kitchen and bar. Join a family-owned team that cooks from scratch. Apply online.',
        canonical: pageUrl('/employment'),
        ogImage: abs('/images/storefront.webp'),
        jsonLd: [
          restaurantSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Employment', path: '/employment' },
          ]),
        ],
      }
    case '/privacy':
      return {
        title: "Privacy Policy | Cambria's Bistro",
        description:
          'How Cambria’s Bistro collects, uses, and protects information submitted through this website.',
        canonical: pageUrl('/privacy'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])],
      }
    case '/terms':
      return {
        title: "Terms of Service | Cambria's Bistro",
        description: 'The terms that govern your use of the Cambria’s Bistro website.',
        canonical: pageUrl('/terms'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }])],
      }
    case '/accessibility':
      return {
        title: "Accessibility Statement | Cambria's Bistro",
        description:
          'Our commitment to making the Cambria’s Bistro website accessible to everyone, and how to reach us about accessibility.',
        canonical: pageUrl('/accessibility'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Accessibility', path: '/accessibility' }])],
      }
    default:
      return {
        title: "Page Not Found | Cambria's Bistro",
        description:
          "Sorry, we couldn't find that page. Cambria’s Bistro is a family-owned Italian restaurant in downtown Wadsworth, Ohio.",
        canonical: pageUrl(path),
        ogImage,
        jsonLd: [restaurantSchema()],
      }
  }
}

export const ALL_ROUTES: string[] = [
  '/',
  '/menu',
  '/about',
  '/reservations',
  '/contact',
  '/employment',
  '/privacy',
  '/terms',
  '/accessibility',
]
