export interface Discussion {
  id: string
  title: string
  author: string
  category: string
  replies: number
  views: number
  lastActivity: string
  excerpt: string
}

export interface CommunityEvent {
  id: string
  title: string
  date: string
  time: string
  format: 'Online' | 'In-person' | 'Hybrid'
  host: string
  description: string
}

export interface Member {
  name: string
  role: string
  focus: string
  initials: string
}

export const COMMUNITY_STATS = {
  members: 12480,
  scriptsShared: 1340,
  discussions: 3210,
  countries: 74,
}

export const DISCUSSIONS: Discussion[] = [
  {
    id: 'd1',
    title: 'Best practice for versioning shared Dynamo packages?',
    author: 'Priya Nair',
    category: 'Computational Design',
    replies: 34,
    views: 1820,
    lastActivity: '2h ago',
    excerpt:
      'We are up to 40+ graphs in a shared library and updates are getting messy. How are you tagging versions and communicating breaking changes?',
  },
  {
    id: 'd2',
    title: 'ACC vs. traditional file server for a 12-person studio',
    author: 'Devon Clarke',
    category: 'BIM Management',
    replies: 51,
    views: 2640,
    lastActivity: '5h ago',
    excerpt:
      'Weighing the jump to Autodesk Construction Cloud. Worth it for a small practice, or overkill? Looking for real cost/benefit stories.',
  },
  {
    id: 'd3',
    title: 'Show your work: parametric façades built with the Panelizer',
    author: 'Lena Ortiz',
    category: 'Showcase',
    replies: 78,
    views: 4100,
    lastActivity: '1d ago',
    excerpt:
      'Drop screenshots of what you have made with the Façade Panelizer graph. Some genuinely wild geometry in here already.',
  },
  {
    id: 'd4',
    title: 'How do you onboard non-technical staff to Dynamo?',
    author: 'Marcus Feld',
    category: 'Learning',
    replies: 42,
    views: 2210,
    lastActivity: '1d ago',
    excerpt:
      'Running an internal lunch-and-learn series. What clicked for your teams — and what fell flat?',
  },
  {
    id: 'd5',
    title: 'Federated IFC coordination without ACC — what is your stack?',
    author: 'Tomás Vega',
    category: 'Coordination',
    replies: 29,
    views: 1490,
    lastActivity: '2d ago',
    excerpt:
      'Open-source and low-cost options for openBIM coordination. BIMcollab, Solibri, Speckle… what actually holds up on real jobs?',
  },
]

export const EVENTS: CommunityEvent[] = [
  {
    id: 'e1',
    title: 'Dynamo Clinic: Live Graph Reviews',
    date: '2026-08-06',
    time: '17:00 UTC',
    format: 'Online',
    host: 'Lena Ortiz',
    description:
      'Bring a graph that is misbehaving. We debug three live submissions and share the fixes with everyone.',
  },
  {
    id: 'e2',
    title: 'AEC Automation Meetup — London',
    date: '2026-08-19',
    time: '18:30 BST',
    format: 'In-person',
    host: 'BIM Insight London',
    description:
      'Talks, demos, and drinks with practitioners automating design and coordination across the built environment.',
  },
  {
    id: 'e3',
    title: 'Workshop: From Excel to Revit in 60 Minutes',
    date: '2026-09-03',
    time: '16:00 UTC',
    format: 'Hybrid',
    host: 'Devon Clarke',
    description:
      'A hands-on data round-trip workshop. Leave with a working parameter-sync graph you can use on Monday.',
  },
]

export const FEATURED_MEMBERS: Member[] = [
  { name: 'Priya Nair', role: 'Automation Lead', focus: 'Sheets & documentation', initials: 'PN' },
  { name: 'Lena Ortiz', role: 'Computational Design Lead', focus: 'Parametric geometry', initials: 'LO' },
  { name: 'Devon Clarke', role: 'BIM Manager', focus: 'Data & standards', initials: 'DC' },
  { name: 'Grace Liu', role: 'Coordination Engineer', focus: 'Clash & MEP', initials: 'GL' },
  { name: 'Tomás Vega', role: 'openBIM Specialist', focus: 'IFC interoperability', initials: 'TV' },
  { name: 'Aisha Rahman', role: 'Sustainability Analyst', focus: 'Daylight & energy', initials: 'AR' },
]
