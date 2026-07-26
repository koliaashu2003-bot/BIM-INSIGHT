/* ============================================================
   Content model. In production, source this from a CMS/CRM.
   Images use Unsplash (allow-listed in next.config).
   ============================================================ */

export type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  blurb: string;
  featured?: boolean;
  perks: string[];
};

export const plans: Plan[] = [
  {
    id: 'signature',
    name: 'Signature',
    priceMonthly: 899,
    priceAnnual: 8990,
    blurb: 'Full access to the members floor, studios, and recovery suite.',
    perks: [
      'Unlimited members-floor access',
      'All signature group classes',
      'Recovery suite (sauna · ice · contrast)',
      'InBody composition scans monthly',
      'Complimentary valet parking',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    priceMonthly: 1899,
    priceAnnual: 18990,
    featured: true,
    blurb: 'Signature, plus dedicated coaching and priority everything.',
    perks: [
      'Everything in Signature',
      '4 personal-training sessions / month',
      'Personalised nutrition & macro plan',
      'Priority class booking (7-day window)',
      'Private locker & laundered kit',
      'Guest passes (2 / month)',
    ],
  },
  {
    id: 'private',
    name: 'Private Reserve',
    priceMonthly: 4900,
    priceAnnual: 49000,
    blurb: 'A concierge performance program built entirely around you.',
    perks: [
      'Everything in Elite',
      'Dedicated head coach & 12 PT sessions / month',
      'Bloodwork & performance diagnostics',
      'Physio & massage on demand',
      'By-appointment private floor hours',
      'Unlimited guest passes',
    ],
  },
];

export type Trainer = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  image: string;
  instagram: string;
  stats: { label: string; value: string }[];
};

export const trainers: Trainer[] = [
  {
    id: 'layla-haddad',
    name: 'Layla Haddad',
    role: 'Head of Strength',
    specialties: ['Powerlifting', 'Olympic Lifting', 'Return-to-sport'],
    bio: 'Former national weightlifting champion. Layla builds fearless, structurally sound athletes with a precision-first methodology.',
    image:
      'https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=900&q=80',
    instagram: 'https://instagram.com',
    stats: [
      { label: 'Years', value: '12' },
      { label: 'Athletes', value: '400+' },
    ],
  },
  {
    id: 'marcus-vieira',
    name: 'Marcus Vieira',
    role: 'Performance & Conditioning',
    specialties: ['Hybrid Athlete', 'VO₂ Max', 'Metcon'],
    bio: 'Sports scientist turned coach. Marcus engineers engines — the kind that let founders out-work their calendars.',
    image:
      'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80',
    instagram: 'https://instagram.com',
    stats: [
      { label: 'Years', value: '9' },
      { label: 'Marathons coached', value: '160' },
    ],
  },
  {
    id: 'aisha-noor',
    name: 'Aisha Noor',
    role: 'Physique & Nutrition',
    specialties: ['Body Composition', 'Macro Coaching', 'Contest Prep'],
    bio: 'Aisha pairs evidence-based nutrition with hypertrophy programming to redefine what your physique is capable of.',
    image:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80',
    instagram: 'https://instagram.com',
    stats: [
      { label: 'Years', value: '8' },
      { label: 'Transformations', value: '520' },
    ],
  },
  {
    id: 'diego-santos',
    name: 'Diego Santos',
    role: 'Mobility & Recovery',
    specialties: ['Mobility', 'Prehab', 'Breathwork'],
    bio: 'Movement specialist focused on longevity. Diego keeps executives training hard and pain-free for decades, not months.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    instagram: 'https://instagram.com',
    stats: [
      { label: 'Years', value: '11' },
      { label: 'Clients', value: '300+' },
    ],
  },
];

export type GymClass = {
  id: string;
  name: string;
  category: 'Strength' | 'Conditioning' | 'Mind & Recovery' | 'Studio';
  duration: number;
  intensity: 1 | 2 | 3;
  blurb: string;
  image: string;
};

export const classes: GymClass[] = [
  {
    id: 'iron-reserve',
    name: 'Iron Reserve',
    category: 'Strength',
    duration: 60,
    intensity: 3,
    blurb: 'Barbell strength in small groups. Coached, progressive, relentless.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'apex-hiit',
    name: 'Apex HIIT',
    category: 'Conditioning',
    duration: 45,
    intensity: 3,
    blurb: 'A cinematic conditioning arena. Heart-rate driven, glass-walled, loud.',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gold-cycle',
    name: 'Gold Cycle',
    category: 'Studio',
    duration: 45,
    intensity: 2,
    blurb: 'Immersive spin under programmable light. Ride the drop.',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'still-point',
    name: 'Still Point',
    category: 'Mind & Recovery',
    duration: 50,
    intensity: 1,
    blurb: 'Breathwork, mobility, and heated flow to reset the nervous system.',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'combat-lab',
    name: 'Combat Lab',
    category: 'Conditioning',
    duration: 60,
    intensity: 3,
    blurb: 'Technical boxing and striking conditioning with pro coaches.',
    image:
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hyrox-prep',
    name: 'Hyrox Prep',
    category: 'Conditioning',
    duration: 60,
    intensity: 3,
    blurb: 'Race-specific hybrid training for the world of functional fitness racing.',
    image:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80',
  },
];

export const scheduleDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export type Session = {
  time: string;
  classId: string;
  coach: string;
  spots: number;
};

// A representative weekly grid (keyed by day index 0-6).
export const schedule: Record<number, Session[]> = {
  0: [
    { time: '06:00', classId: 'iron-reserve', coach: 'Layla', spots: 3 },
    { time: '07:30', classId: 'apex-hiit', coach: 'Marcus', spots: 6 },
    { time: '12:30', classId: 'gold-cycle', coach: 'Aisha', spots: 8 },
    { time: '18:00', classId: 'combat-lab', coach: 'Diego', spots: 2 },
    { time: '19:30', classId: 'still-point', coach: 'Diego', spots: 10 },
  ],
  1: [
    { time: '06:30', classId: 'apex-hiit', coach: 'Marcus', spots: 4 },
    { time: '12:00', classId: 'iron-reserve', coach: 'Layla', spots: 5 },
    { time: '18:30', classId: 'hyrox-prep', coach: 'Marcus', spots: 6 },
    { time: '20:00', classId: 'still-point', coach: 'Diego', spots: 9 },
  ],
  2: [
    { time: '06:00', classId: 'gold-cycle', coach: 'Aisha', spots: 7 },
    { time: '07:30', classId: 'iron-reserve', coach: 'Layla', spots: 2 },
    { time: '17:30', classId: 'apex-hiit', coach: 'Marcus', spots: 5 },
    { time: '19:00', classId: 'combat-lab', coach: 'Diego', spots: 4 },
  ],
  3: [
    { time: '06:30', classId: 'hyrox-prep', coach: 'Marcus', spots: 3 },
    { time: '12:30', classId: 'gold-cycle', coach: 'Aisha', spots: 9 },
    { time: '18:00', classId: 'iron-reserve', coach: 'Layla', spots: 1 },
    { time: '19:30', classId: 'still-point', coach: 'Diego', spots: 12 },
  ],
  4: [
    { time: '06:00', classId: 'apex-hiit', coach: 'Marcus', spots: 6 },
    { time: '12:00', classId: 'combat-lab', coach: 'Diego', spots: 5 },
    { time: '17:30', classId: 'iron-reserve', coach: 'Layla', spots: 4 },
  ],
  5: [
    { time: '08:00', classId: 'hyrox-prep', coach: 'Marcus', spots: 8 },
    { time: '09:30', classId: 'gold-cycle', coach: 'Aisha', spots: 10 },
    { time: '11:00', classId: 'still-point', coach: 'Diego', spots: 12 },
  ],
  6: [
    { time: '09:00', classId: 'still-point', coach: 'Diego', spots: 14 },
    { time: '10:30', classId: 'apex-hiit', coach: 'Marcus', spots: 7 },
  ],
};

export type Transformation = {
  id: string;
  name: string;
  weeks: number;
  headline: string;
  before: string;
  after: string;
  stat: string;
};

export const transformations: Transformation[] = [
  {
    id: 't1',
    name: 'Omar, 38 — Founder',
    weeks: 16,
    headline: 'Rebuilt around a 70-hour week',
    before:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    stat: '−11kg fat · +6kg lean',
  },
  {
    id: 't2',
    name: 'Sara, 31 — Surgeon',
    weeks: 20,
    headline: 'From burnt-out to first powerlifting meet',
    before:
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1517344368193-41552b6ad3f5?auto=format&fit=crop&w=800&q=80',
    stat: '120kg deadlift @ 62kg BW',
  },
  {
    id: 't3',
    name: 'Khalid, 44 — Executive',
    weeks: 24,
    headline: 'Reversed the markers his doctor flagged',
    before:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
    stat: 'Body fat 28% → 15%',
  },
];

export type Review = {
  author: string;
  role: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
  {
    author: 'Nadia F.',
    role: 'Managing Director',
    rating: 5,
    text: 'It doesn’t feel like a gym — it feels like a private club that happens to have the best coaches in Dubai. The recovery suite alone is worth it.',
  },
  {
    author: 'James T.',
    role: 'Founder, Fintech',
    rating: 5,
    text: 'I train at 5am before the markets open. The coaching is elite and the space is spotless. Genuinely the best money I spend each month.',
  },
  {
    author: 'Reem A.',
    role: 'Consultant',
    rating: 5,
    text: 'The Elite plan changed how I look and how I feel at work. My coach programs around my travel and it just works.',
  },
  {
    author: 'Daniel K.',
    role: 'Pro Athlete',
    rating: 5,
    text: 'Facilities on par with pro-team performance centres. The diagnostics and physio access are unmatched in the region.',
  },
];

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readMins: number;
  date: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: 'training-around-a-founders-calendar',
    title: 'Training Around a Founder’s Calendar',
    category: 'Performance',
    excerpt:
      'How to build a body that compounds when your week refuses to cooperate — the 3-lever system our coaches use.',
    readMins: 6,
    date: '2026-07-10',
    image:
      'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    slug: 'the-science-of-the-recovery-suite',
    title: 'The Science of the Recovery Suite',
    category: 'Recovery',
    excerpt:
      'Contrast therapy, sauna protocols, and why recovery — not volume — is the real luxury.',
    readMins: 8,
    date: '2026-06-28',
    image:
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    slug: 'macros-without-the-misery',
    title: 'Macros Without the Misery',
    category: 'Nutrition',
    excerpt:
      'A pragmatic nutrition framework for people who travel, dine out, and still want to see abs.',
    readMins: 5,
    date: '2026-06-15',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
  },
];

export const gallery: { src: string; span: string; alt: string }[] = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80', span: 'md:col-span-2 md:row-span-2', alt: 'Members strength floor' },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80', span: '', alt: 'Functional rig' },
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', span: '', alt: 'Conditioning arena' },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80', span: 'md:row-span-2', alt: 'Recovery suite' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', span: '', alt: 'Cycle studio' },
  { src: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80', span: 'md:col-span-2', alt: 'Combat lab' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', span: '', alt: 'Mind studio' },
  { src: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80', span: '', alt: 'Members lounge' },
];
