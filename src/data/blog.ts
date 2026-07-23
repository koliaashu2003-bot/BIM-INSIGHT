export interface BlogPost {
  id: string
  slug: string
  title: string
  author: string
  role: string
  date: string
  category: string
  readingMinutes: number
  emoji: string
  excerpt: string
  /** Simple paragraph/heading blocks — rendered by BlogPostPage. */
  body: BlogBlock[]
}

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

export const SEED_POSTS: BlogPost[] = [
  {
    id: 'dynamo-vs-pyrevit',
    slug: 'dynamo-vs-pyrevit-when-to-use-each',
    title: 'Dynamo vs. pyRevit: When to Reach for Each',
    author: 'Lena Ortiz',
    role: 'Computational Design Lead',
    date: '2026-06-30',
    category: 'Computational Design',
    readingMinutes: 6,
    emoji: '⚙️',
    excerpt:
      'Both automate Revit, but they solve different problems. A practical decision guide for teams standardising their automation stack.',
    body: [
      {
        type: 'p',
        text: 'If you automate Revit, you have almost certainly bumped into the Dynamo-or-pyRevit question. They overlap, but choosing well saves your team weeks of maintenance.',
      },
      { type: 'h2', text: 'Reach for Dynamo when…' },
      {
        type: 'list',
        items: [
          'The logic is geometric — panelising a façade, rationalising a surface, driving adaptive components.',
          'A designer, not a developer, needs to read and tweak the graph.',
          'You want a visual audit trail of how data flows from input to result.',
        ],
      },
      { type: 'h2', text: 'Reach for pyRevit when…' },
      {
        type: 'list',
        items: [
          'You are shipping a button the whole office clicks a hundred times a day.',
          'The task is data- or UI-heavy and barely touches geometry.',
          'You need version control, code review, and unit tests around the logic.',
        ],
      },
      {
        type: 'quote',
        text: 'Rule of thumb: prototype in Dynamo, productionise in pyRevit. If a graph becomes load-bearing, it deserves real code.',
      },
      {
        type: 'p',
        text: 'The two are not rivals. Many mature teams keep a Dynamo library for exploration and a pyRevit toolbar for the workflows that have earned permanence.',
      },
    ],
  },
  {
    id: 'iso-19650-primer',
    slug: 'iso-19650-primer-for-modelers',
    title: 'ISO 19650 for People Who Actually Model',
    author: 'Devon Clarke',
    role: 'BIM Manager',
    date: '2026-06-12',
    category: 'BIM Management',
    readingMinutes: 8,
    emoji: '📐',
    excerpt:
      'The standard everyone cites and few read. Here is what ISO 19650 actually asks of you between opening Revit and issuing a model.',
    body: [
      {
        type: 'p',
        text: 'ISO 19650 sounds like paperwork, but at its heart it is a simple promise: everyone knows what information is due, in what state, and who checks it.',
      },
      { type: 'h2', text: 'The three states of any file' },
      {
        type: 'list',
        items: [
          'Work in Progress — your team only. Nobody else should be building on it.',
          'Shared — checked, approved, and visible to other disciplines to coordinate against.',
          'Published — formally issued and contractually meaningful.',
        ],
      },
      {
        type: 'p',
        text: 'Most coordination pain comes from someone building on a Work-in-Progress model as if it were Shared. Get the gate between those two states right and half your clashes disappear.',
      },
      {
        type: 'quote',
        text: 'A naming convention is not bureaucracy — it is the difference between finding the right model in two seconds or two hours.',
      },
    ],
  },
  {
    id: 'clash-detection-mindset',
    slug: 'clash-detection-is-a-mindset',
    title: 'Clash Detection Is a Mindset, Not a Button',
    author: 'Grace Liu',
    role: 'Coordination Engineer',
    date: '2026-05-22',
    category: 'Coordination',
    readingMinutes: 5,
    emoji: '🚧',
    excerpt:
      'Navisworks will happily report 40,000 clashes. Here is how to turn that noise into a punch list people actually resolve.',
    body: [
      {
        type: 'p',
        text: 'The first time you run a hard-clash test on a real project, the number is terrifying. It is also mostly meaningless. The skill is in the filtering.',
      },
      { type: 'h2', text: 'Group before you report' },
      {
        type: 'p',
        text: 'A pipe running through twenty floor slabs is one design decision, not twenty clashes. Group by element pair and discipline first, and your 40,000 collapses to a few hundred real issues.',
      },
      { type: 'h2', text: 'Assign, do not just annotate' },
      {
        type: 'list',
        items: [
          'Every issue needs an owner and a due date, or it will still be open at handover.',
          'Route issues through ACC / BIM 360 so the model and the task never drift apart.',
          'Re-run weekly — a clash report is a heartbeat, not a one-off.',
        ],
      },
    ],
  },
  {
    id: 'getting-started-dynamo',
    slug: 'your-first-week-with-dynamo',
    title: 'Your First Week With Dynamo',
    author: 'Marcus Feld',
    role: 'Architect & Educator',
    date: '2026-04-18',
    category: 'Learning',
    readingMinutes: 7,
    emoji: '🌱',
    excerpt:
      'A gentle, project-based on-ramp for architects who have never written a line of code — and do not need to.',
    body: [
      {
        type: 'p',
        text: 'You do not need to be a programmer to be dangerous with Dynamo. You need one useful graph that saves you an afternoon, and the confidence follows.',
      },
      { type: 'h2', text: 'Day one: rename something' },
      {
        type: 'p',
        text: 'Start with the least glamorous, most valuable task — renaming views or sheets in bulk. It touches inputs, a transformation, and a write-back, which is the shape of almost every graph you will ever build.',
      },
      {
        type: 'quote',
        text: 'The best first Dynamo graph is boring, tiny, and saves you a real hour. Chase usefulness, not cleverness.',
      },
      {
        type: 'p',
        text: 'By the end of the week, browse the Exchange here, download a graph close to your problem, and read it node by node. Reading others’ graphs is the fastest way to learn.',
      },
    ],
  },
]
