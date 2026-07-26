/** Central brand + contact configuration. Swap these for the real club. */
export const site = {
  name: 'AURUM',
  tagline: "Dubai's Elite Performance Club",
  legalName: 'AURUM Performance Club LLC',
  description:
    'A private, invitation-grade performance club in the heart of Dubai. Elite coaching, recovery science, and a members-only training floor engineered for high performers.',
  url: 'https://aurum.ae',
  // E.164 for WhatsApp / tel links. Placeholder Dubai number.
  phoneDisplay: '+971 4 000 0000',
  phone: '+97140000000',
  whatsapp: '971500000000',
  email: 'concierge@aurum.ae',
  address: {
    street: 'DIFC Gate Avenue, Podium Level',
    city: 'Dubai',
    country: 'United Arab Emirates',
    postalCode: '00000',
    lat: 25.2110,
    lng: 55.2796,
  },
  hours: 'Daily · 05:00 – 24:00',
  social: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
  },
  // Google rating shown in the reviews section (replace with live Places API data).
  rating: { value: 4.9, count: 812 },
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Membership', href: '/membership' },
  { label: 'Classes', href: '/classes' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Transformations', href: '/transformations' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;
