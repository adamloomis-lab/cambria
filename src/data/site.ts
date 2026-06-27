// All site content for Cambria's Bistro. Single source of truth consumed by
// pages, components, and the SEO/JSON-LD layer.

export const company = {
  name: "Cambria's Bistro",
  shortName: 'Cambria’s',
  tagline: "Time-Honored Favorites, Today's Brightest Flavors",
  // One-liner used in hero / meta.
  shortBlurb:
    'A family-owned Italian bistro in the heart of downtown Wadsworth, Ohio, where time-honored recipes meet the warmth of a neighborhood grill and pub.',
  // Primary line (general / dining).
  phone: '(330) 331-5357',
  phoneHref: 'tel:+13303315357',
  // Catering & reservations line.
  eventsPhone: '(330) 331-5282',
  eventsPhoneHref: 'tel:+13303315282',
  address: {
    street: '132 Main St',
    city: 'Wadsworth',
    state: 'OH',
    zip: '44281',
  },
  addressOneLine: '132 Main St, Wadsworth, OH 44281',
  // Approximate downtown Wadsworth coordinates (refine before public cutover).
  geo: { lat: 41.0259, lng: -81.7297 },
  mapsDir:
    "https://www.google.com/maps/dir/?api=1&destination=Cambria's+Bistro+132+Main+St+Wadsworth+OH+44281",
  mapsEmbed:
    'https://www.google.com/maps?q=132+Main+St+Wadsworth+OH+44281&output=embed',
  social: {
    facebook: 'https://www.facebook.com/CambriasBistro',
    instagram: 'https://www.instagram.com/cambriasbistro/',
  },
  doordashUrl:
    'https://www.doordash.com/store/cambria%E2%80%99s-bistro-(132-main-st)-132-main-st-wadsworth-32761217/52639746/',
} as const

// ---------------------------------------------------------------------------
// Hours. dow matches Date.getDay() (0 = Sunday).
// Mon closed; Tue–Thu 4–9; Fri–Sat 12–9; Sun 12–4.
// ---------------------------------------------------------------------------
export const hours = [
  { day: 'Sunday', short: 'Sun', dow: 0, time: '12:00 pm - 4:00 pm' },
  { day: 'Monday', short: 'Mon', dow: 1, time: 'Closed' },
  { day: 'Tuesday', short: 'Tue', dow: 2, time: '4:00 pm - 9:00 pm' },
  { day: 'Wednesday', short: 'Wed', dow: 3, time: '4:00 pm - 9:00 pm' },
  { day: 'Thursday', short: 'Thu', dow: 4, time: '4:00 pm - 9:00 pm' },
  { day: 'Friday', short: 'Fri', dow: 5, time: '12:00 pm - 9:00 pm' },
  { day: 'Saturday', short: 'Sat', dow: 6, time: '12:00 pm - 9:00 pm' },
]

export const hoursCompact = [
  { day: 'Tue - Thu', time: '4:00 - 9:00 pm' },
  { day: 'Fri - Sat', time: '12:00 - 9:00 pm' },
  { day: 'Sunday', time: '12:00 - 4:00 pm' },
  { day: 'Monday', time: 'Closed' },
]

// Schema.org openingHoursSpecification
export const openingHours = [
  { days: ['Tuesday', 'Wednesday', 'Thursday'], opens: '16:00', closes: '21:00' },
  { days: ['Friday', 'Saturday'], opens: '12:00', closes: '21:00' },
  { days: ['Sunday'], opens: '12:00', closes: '16:00' },
]

// ---------------------------------------------------------------------------
// About / story copy. Grounded in the real site + the family names that run
// through the menu (Nonna, Pop, Mimi, Christian, Kristin, Tamara, Erin, Braden,
// Cam, the Balasco). No invented dates or biographies.
// ---------------------------------------------------------------------------
export const aboutParagraphs = [
  'Located in the heart of downtown Wadsworth, Cambria’s Bistro is a family-owned establishment that brings together the best of two worlds: the rich traditions of Italian cuisine and the contemporary favorites of a modern grill and pub.',
  'Step inside and you’ll find the warmth of an Italian villa set against exposed brick, soft light and a lively bar. It’s a place built for lingering, whether that’s a quiet dinner for two, a long table of friends, or a celebration that fills the room.',
  'Look closely at our menu and you’ll meet the family. Nonna’s lasagna, Pop’s stuffed shells, Mimi’s spaghetti, Christian’s caponata, Erin’s carbonara, Braden’s panino. Nearly every plate carries a name, because everything we serve is made the way it would be at home, from scratch, with care, and meant to be shared.',
]

export const featurePillars = [
  {
    title: 'Made From Scratch',
    blurb:
      'House marinara, hand-rolled stromboli, whipped ricotta and rosemary focaccia. We cook the slow way because it tastes like home.',
  },
  {
    title: 'A Family Table',
    blurb:
      'Recipes named for the people who inspired them. When you sit down at Cambria’s, you’re eating with our family.',
  },
  {
    title: 'Downtown Wadsworth',
    blurb:
      'Right on Main Street, with a full bar, a curated wine list and a private room for the moments worth gathering for.',
  },
]

// ---------------------------------------------------------------------------
// MENU, transcribed verbatim from the in-house menu. Prices as printed.
// ---------------------------------------------------------------------------
export type MenuItem = {
  name: string
  price?: string
  desc?: string
  featured?: boolean
}
export type MenuGroup = {
  id: string
  title: string
  note?: string
  items: MenuItem[]
  addOns?: string
}

export const menuGroups: MenuGroup[] = [
  {
    id: 'sharables',
    title: 'Sharables',
    items: [
      {
        name: 'Polpette',
        price: '$15.49',
        desc: 'House meatballs & marinara, mozzarella, fresh basil, grilled bread.',
      },
      {
        name: "Cam's Chicken Wings",
        price: '$12.49',
        desc: 'Six breaded wings tossed in your choice of sauce: Garlic Parmesan or Hot Garlic Parm.',
      },
      {
        name: "Christian's Caponata",
        price: '$14.29',
        desc: 'Eggplant, capers, tomato sauce, onions, roasted red peppers, garlic, grilled bread.',
      },
      {
        name: 'House Rosemary Focaccia',
        price: 'Half 5 | Full 8',
        desc: 'Served with olive oil and house Tuscan seasoning.',
        featured: true,
      },
      {
        name: "Kristin's Hot Hungarian Peppers",
        price: '$13.49',
        desc: 'Italian sausage, mozzarella, ricotta, garlic, parmesan, marinara.',
      },
      {
        name: "Lil' Chef's Fried Pickles",
        price: '$10.99',
        desc: 'Pickle chips, seasoned breadcrumbs, deep fried, ranch.',
      },
      {
        name: "Tamara's Provolone Fritto",
        price: '$12.49',
        desc: 'Provolone, seasoned breadcrumbs, deep fried, house marinara.',
      },
      {
        name: 'Whipped Ricotta',
        price: '$14.49',
        desc: 'Ricotta, lemon, olive oil, sea salt, honey, thyme, blistered tomatoes, grilled bread.',
      },
    ],
  },
  {
    id: 'salads-soups',
    title: 'Salads & Soups',
    items: [
      {
        name: 'Italian Wedding Soup',
        price: 'Cup 4.50 | Bowl 5.75',
      },
      {
        name: 'Antipasto',
        price: '$14.99',
        desc: 'Fresh greens, pepperoni, salami, mozzarella, banana peppers, black olive, red onion, tomato.',
      },
      {
        name: 'Heart of Romaine Caesar',
        price: '$10.29',
        desc: 'Fresh romaine heart, shredded parmesan, croutons, house Caesar.',
      },
      {
        name: 'House Salad',
        price: '$8.29',
        desc: 'Greens, cherry tomato, red onion, pepperoncini, mozzarella.',
      },
    ],
    addOns:
      'Add to any salad: Grilled Chicken +6 · Salmon +8 · Crispy Chicken +5 · Shrimp (5) +7. Dressings: House Creamy Garlic, Lemon Vinaigrette, Italian, Ranch, Blue Cheese, Balsamic, White French.',
  },
  {
    id: 'flatbread',
    title: 'Flatbread',
    note: 'Artisan thin crust with house pizza sauce.',
    items: [
      {
        name: 'Classic',
        price: '$13',
        desc: 'Mozzarella, pepperoni, house seasoning.',
      },
      {
        name: 'Napoli',
        price: '$15',
        desc: 'Burrata, cherry tomato, arugula, grated parmesan, balsamic glaze, house seasoning.',
      },
      {
        name: 'Rome',
        price: '$15',
        desc: 'Mozzarella, mushroom, red onion, black olives, cherry tomato, house seasoning.',
      },
      {
        name: 'Sicily',
        price: '$16',
        desc: 'Mozzarella, Italian sausage, pepperoni, crumbled bacon, house seasoning.',
      },
    ],
  },
  {
    id: 'stromboli',
    title: "Papaw's Stromboli Roll",
    note: 'Hand-rolled dough, wrapped up and baked. Served with house marinara for dipping.',
    items: [
      {
        name: 'The Italian Job',
        price: '$16.99',
        desc: 'Pepperoni, salami, ham, Italian sausage, mozzarella.',
        featured: true,
      },
    ],
  },
  {
    id: 'handhelds',
    title: 'Handhelds & Burgers',
    note: 'Served with chips & a pickle spear. Upgrade to a classic side +3.',
    items: [
      {
        name: 'Caprese Chicken',
        price: '$15.49',
        desc: 'Breaded chicken cutlet, burrata, tomato, pesto, basil, arugula, balsamic, focaccia.',
      },
      {
        name: 'Chicken Parmigiana',
        price: '$15.29',
        desc: 'Breaded chicken cutlet, house marinara, mozzarella, fresh basil, focaccia.',
      },
      {
        name: 'Classic Burger',
        price: '$14.99',
        desc: 'Angus beef patty, lettuce, tomato, onion, brioche bun, choice of American or provolone.',
      },
      {
        name: 'Tuscan Grinder',
        price: '$14.99',
        desc: 'Pepperoni, salami, ham, provolone, spinach, banana peppers, red onion, black olive, Tuscan seasoning, hoagie.',
      },
      {
        name: 'The Balasco, aka "The Godfather"',
        price: '$16.99',
        desc: 'Double angus patties, pepperoni, mozzarella, provolone, banana peppers, arugula, house creamy garlic, herbed focaccia, grilled pepperoncini garnish.',
        featured: true,
      },
      {
        name: "Braden's Panino a la Polpette",
        price: '$15.29',
        desc: 'House meatballs, marinara, provolone, banana peppers, hoagie.',
      },
    ],
  },
  {
    id: 'entrees',
    title: 'Entrees',
    note: 'Add a side house or Caesar salad +3. Sub gluten-free penne +3. Make it spicy, just ask your server.',
    items: [
      {
        name: "Nonna's Lasagna",
        price: '$17.99',
        desc: 'House marinara, Italian sausage, ricotta, house seasoning, mozzarella, parmesan.',
      },
      {
        name: 'Asiago Stuffed Gnocchi Pomodoro',
        price: '$17.99',
        desc: 'Pan seared, house-made pomodoro, fresh basil.',
        featured: true,
      },
      {
        name: 'Cacio e Pepe',
        price: '$13.99',
        desc: 'Spaghetti, parmesan, pepper, garlic.',
      },
      {
        name: 'Caprese Chicken Alfredo',
        price: '$18.29',
        desc: 'Breaded cutlet stuffed with mozzarella & tomatoes, balsamic drizzle, fettuccine.',
      },
      {
        name: 'Cheese Tortellini',
        price: '$15.49',
        desc: 'Choice of marinara or spinach alfredo.',
      },
      {
        name: 'Chicken Piccata',
        price: '$17.29',
        desc: 'Lemon, capers, white wine, butter, pepper, cherry tomatoes, spinach.',
      },
      {
        name: "Erin's Carbonara",
        price: '$16.49',
        desc: 'Pancetta, English peas, garlic, parmesan, cream, black pepper, linguini.',
      },
      {
        name: 'Fettuccine Alfredo Broccoli',
        price: '$16.99',
        desc: 'Parmesan, house seasoning, garlic, cream, pepper, broccoli.',
      },
      {
        name: 'Lemon Parmesan Orzo',
        price: '$14.99',
        desc: 'Lemon, parmesan, cream, broccoli.',
      },
      {
        name: "Mimi's Spaghetti Marinara",
        price: '$12.49',
        desc: 'Spaghetti tossed with house marinara.',
      },
      {
        name: "Pop's Stuffed Shells",
        price: '$16.99',
        desc: 'House ricotta, marinara, mozzarella.',
      },
      {
        name: 'Ravioli of the Week',
        price: '$17.29',
        desc: "Ask your server about this week's featured ravioli.",
        featured: true,
      },
      {
        name: 'Rosemary Lemon Butter Salmon',
        price: '$21.49',
        desc: '6 oz. pan-seared salmon, parmesan risotto.',
      },
      {
        name: 'Shrimp a la Vodka',
        price: '$21.49',
        desc: 'Shrimp, fire-roasted peppers, cherry tomatoes, spinach, creamy vodka sauce, linguini.',
      },
    ],
  },
  {
    id: 'additions',
    title: 'Additions',
    items: [
      { name: 'Grilled Chicken Breast', price: '+6' },
      { name: 'Breaded Chicken Cutlet', price: '+5' },
      { name: 'House Meatballs in Marinara', price: '+5' },
      { name: 'Grilled Shrimp (5)', price: '+7' },
      { name: 'Salmon', price: '+8' },
      { name: 'Eggplant', price: '+5' },
    ],
  },
  {
    id: 'sides',
    title: 'Classic Sides',
    items: [
      { name: 'Broccoli', price: '$3.99' },
      { name: 'Gluten-Free Penne, Marinara or Alfredo', price: '$6.49' },
      { name: 'Fries', price: '$5.29' },
      { name: 'Onion Rings', price: '$5.29' },
      { name: 'Lemon Parmesan Orzo', price: '$5.29' },
      { name: 'Parmesan Risotto', price: '$6.29' },
      { name: 'Meatballs (2)', price: '$5.29' },
      { name: 'Side of Spaghetti Marinara', price: '$4.99' },
      { name: 'Side of Fettuccine Alfredo', price: '$4.99' },
    ],
  },
  {
    id: 'kids',
    title: 'Our Guests 10 & Under',
    note: "Kid's meal includes a kid's beverage.",
    items: [
      {
        name: "Kennedy's Spaghetti & Meatball",
        price: '$7',
        desc: 'Choice of marinara or butter & garlic.',
      },
      {
        name: "Paxton's Chicken Tenders (3)",
        price: '$7',
        desc: 'Choice of fries or broccoli.',
      },
      {
        name: "Kalli's Fettuccine Alfredo",
        price: '$6',
        desc: 'Add grilled chicken +3 | Add meatball +2.',
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      {
        name: 'Dolce Tiramisu',
        price: '$8',
        desc: 'Espresso-soaked sponge cake, fluffy mascarpone cream, cocoa powder.',
      },
      {
        name: 'Dolce Vanilla Cheesecake',
        price: '$8',
        desc: 'Choice of plain, chocolate or raspberry drizzle.',
      },
      {
        name: "Chet's Chocolate Chip Cannoli",
        price: '$7',
        desc: 'Three petite cannoli with whipped cream, chocolate drizzle, powdered sugar.',
      },
      {
        name: 'Featured Dessert',
        desc: 'Ask your server for our featured dessert selection.',
      },
    ],
  },
  {
    id: 'beverages',
    title: 'Beverages',
    note: 'Fountain drinks $3.99: Coke, Diet Coke, Cherry Coke, Sprite, Root Beer, Ginger Ale, Lemonade, Southern Sweet Tea, Unsweet Iced Tea, Cranberry Juice, Fruit Punch, Coffee / Decaf.',
    items: [
      { name: 'San Pellegrino Sparkling Water', price: '$5.99', desc: '1 liter.' },
      {
        name: 'San Pellegrino Lemonata',
        price: '$4.29',
        desc: '11.5 oz sparkling.',
      },
    ],
  },
]

// Showcase food shots for the home "From the Kitchen" band. No specific dish
// names — we don't claim what each plate is, we just let the food look good.
export const featuredShowcase = [
  { src: '/images/tortellini-vodka.webp', alt: 'A plated pasta from the Cambria’s kitchen' },
  { src: '/images/stuffed-shells.webp', alt: 'A plated pasta from the Cambria’s kitchen' },
  { src: '/images/ravioli.webp', alt: 'A plated pasta from the Cambria’s kitchen' },
]

// Bar / beverage highlights for the home "Bar & Cellar" band.
export const barHighlights = [
  {
    title: 'Craft Cocktails',
    desc: 'Hand-built classics and seasonal pours, from a proper Moscow Mule to an Aperol spritz.',
    img: '/images/cocktail-mule.webp',
    pos: 'center 35%',
  },
  {
    title: 'Italian Wine List',
    desc: 'A curated cellar of reds, whites and bubbles chosen to sit beside the kitchen.',
    img: '/images/wine-selection.webp',
    pos: 'center 55%',
  },
  {
    title: 'Cold Draughts',
    desc: 'Import and local beer on tap, poured the way it should be.',
    img: '/images/beer-nonna.webp',
    pos: 'center 40%',
  },
]

// Private events list (hosted in the main dining room — no dedicated private
// room). Surfaced as a simple "we host events too" band on Home; the actual
// inquiry happens through the Contact page.
export const privateEventTypes = [
  'Rehearsal dinners',
  'Showers',
  'Birthdays',
  'Business gatherings',
  'Celebrations of life',
  'Holiday parties',
]

// ---------------------------------------------------------------------------
// Reviews, real guest reviews supplied by the owner. Verbatim quotes & names.
// Never fabricate ratings; aggregateRating is intentionally omitted until a
// verified Google star value + count is supplied. See local-seo-standards.
// ---------------------------------------------------------------------------
export const reviews = [
  {
    name: 'Denise Harkness',
    quote:
      'Top notch! The atmosphere was great the moment we walked in. The table was beautifully set. Top notch cook, attentive waiter, and the lasagna was delicious.',
  },
  {
    name: 'Wendy Forbes',
    quote:
      "We were told by some locals that this was 'The Place' in town to eat. They were right. Beautiful space, warm staff, and food worth the drive.",
  },
  {
    name: 'Janie Grosjean',
    quote:
      "I can't say how much I LOVE THIS PLACE! We were looking for lunch in the Wadsworth area and stumbled on a gem. The food was incredible, the service was warm, and we'll absolutely be back.",
  },
  {
    name: 'Denise Hritsko',
    quote:
      'Great new place in Wadsworth. Pasta was excellent, good wine selection, and fabulous service. Make a reservation!',
  },
  {
    name: 'Kevin Schrader',
    quote:
      'What an awesome experience. The food is beyond expectations and the service and atmosphere were wonderful. Compared to other Italian offerings, this one takes the cannoli.',
  },
  {
    name: 'Joe Werner',
    quote:
      "Food was amazing! Service was great! It's quality food and not chain style. If you want some finer Italian style food, this is the place.",
  },
  {
    name: 'Chandra Marcoux',
    quote:
      'Hands down one of the best dining experiences we’ve had in the area. Everything from the welcome at the door to the final bite was outstanding.',
  },
  {
    name: 'Jake Richardson',
    quote:
      'Great atmosphere and the food was delicious. Service was amazing. Well worth the stop!',
  },
  {
    name: 'Dave Langley',
    quote:
      'My daughter and I loved everything about this place, especially the food. A wonderful father-daughter spot we’ll be coming back to.',
  },
]

// ---------------------------------------------------------------------------
// Food photo gallery (owner-supplied). alt text doubles as on-site captions.
// ---------------------------------------------------------------------------
export const gallery = [
  { src: '/images/spaghetti-pomodoro.webp', alt: 'Spaghetti in a creamy tomato sauce with grilled bread' },
  { src: '/images/tortellini-vodka.webp', alt: 'Cheese tortellini in a creamy vodka sauce with peppers' },
  { src: '/images/fettuccine-pomodoro.webp', alt: 'Fettuccine in a rustic tomato sauce with chicken' },
  { src: '/images/stuffed-shells.webp', alt: 'Stuffed shells with house marinara and grilled bread' },
  { src: '/images/ravioli.webp', alt: 'Ravioli of the week plated on slate' },
  { src: '/images/caprese.webp', alt: 'Caprese with cherry tomatoes, fresh mozzarella and basil' },
  { src: '/images/mussels.webp', alt: 'Steamed mussels with grilled crostini' },
  { src: '/images/eggplant-marinara.webp', alt: 'Breaded cutlet over house marinara' },
  { src: '/images/fettuccine-chicken-alfredo.webp', alt: 'Fettuccine alfredo with grilled chicken' },
  { src: '/images/filet-asparagus.webp', alt: 'Seared entree with grilled asparagus' },
  { src: '/images/dessert-chocolate.webp', alt: 'Warm chocolate dessert with cream' },
  { src: '/images/burger.webp', alt: 'Angus burger with hand-cut fries' },
]
