export type ScriptCategory =
  | 'Automation'
  | 'Documentation'
  | 'Geometry'
  | 'Data Management'
  | 'Analysis'
  | 'Interoperability'

export interface DynamoScript {
  id: string
  title: string
  author: string
  description: string
  category: ScriptCategory
  tags: string[]
  dynamoVersion: string
  revitVersion: string
  downloads: number
  likes: number
  date: string
  /** A short, illustrative snippet of the graph's Python/DesignScript logic. */
  snippet: string
  /** Author-supplied notes shown on the detail view. */
  notes: string
}

export const SCRIPT_CATEGORIES: ScriptCategory[] = [
  'Automation',
  'Documentation',
  'Geometry',
  'Data Management',
  'Analysis',
  'Interoperability',
]

/**
 * Seed catalogue of community Dynamo graphs. User uploads are merged on top of
 * this list from localStorage (see utils/exchangeStorage.ts) so the platform
 * works fully client-side with no backend.
 */
export const SEED_SCRIPTS: DynamoScript[] = [
  {
    id: 'auto-sheet-creator',
    title: 'Batch Sheet & Viewport Creator',
    author: 'Priya Nair',
    description:
      'Generate hundreds of sheets from an Excel schedule, place views on a grid, and auto-name them from a title-block parameter map.',
    category: 'Automation',
    tags: ['sheets', 'excel', 'viewports', 'titleblock'],
    dynamoVersion: '2.19',
    revitVersion: '2024–2025',
    downloads: 4821,
    likes: 612,
    date: '2026-05-14',
    snippet: `# Create sheets from schedule rows
for row in sheet_data:
    sheet = Sheet.ByNameNumberTitleBlock(
        row["number"], row["name"], titleblock)
    Viewport.CreateOnSheet(sheet, row["view"], origin)`,
    notes:
      'Map your Excel columns to the input nodes, set the title block family, then Run. Handles duplicate-number checks and skips existing sheets.',
  },
  {
    id: 'room-tag-placer',
    title: 'Smart Room Tag Placer',
    author: 'Marcus Feld',
    description:
      'Places room tags at the visual centre of every room across all plan views, avoiding overlaps and respecting view crop regions.',
    category: 'Documentation',
    tags: ['rooms', 'tags', 'annotation', 'views'],
    dynamoVersion: '2.18',
    revitVersion: '2023–2025',
    downloads: 3960,
    likes: 540,
    date: '2026-04-02',
    snippet: `# Tag every room at its centroid
for room in rooms_in_view:
    pt = room.CenterPoint
    RoomTag.ByRoomAndPoint(room, pt, view)`,
    notes:
      'Works per active view or across a selected view set. Includes a leader-line toggle and a minimum-area filter to skip tiny shaft rooms.',
  },
  {
    id: 'facade-panelizer',
    title: 'Parametric Façade Panelizer',
    author: 'Lena Ortiz',
    description:
      'Divides any surface into adaptive panels with tunable density and generates an adaptive-component instance per panel with attractor-driven openings.',
    category: 'Geometry',
    tags: ['facade', 'adaptive', 'panels', 'attractor'],
    dynamoVersion: '2.19',
    revitVersion: '2024–2025',
    downloads: 5210,
    likes: 780,
    date: '2026-06-01',
    snippet: `# Panelize surface with attractor
uv = surface.PanelGrid(u, v)
dist = uv.DistanceTo(attractor_pt)
opening = Remap(dist, 0, maxD, 0.1, 0.9)`,
    notes:
      'Feed in a mass face or imported surface. The attractor point drives panel-opening size; swap the adaptive family to change the aesthetic.',
  },
  {
    id: 'param-sync-excel',
    title: 'Parameter Round-Trip to Excel',
    author: 'Devon Clarke',
    description:
      'Two-way sync of shared parameters between Revit and Excel — read, edit offline, and push validated values back with a change report.',
    category: 'Data Management',
    tags: ['parameters', 'excel', 'sync', 'qa'],
    dynamoVersion: '2.17',
    revitVersion: '2022–2025',
    downloads: 6740,
    likes: 910,
    date: '2026-03-19',
    snippet: `# Push edited values back to elements
for el, val in zip(elements, new_values):
    if el.GetParam(pname) != val:
        el.SetParam(pname, val)
        log.append((el.Id, val))`,
    notes:
      'Includes type-safe casting and a dry-run mode that reports every change before writing. Great for QA on large data sets.',
  },
  {
    id: 'daylight-checker',
    title: 'Daylight Factor Quick-Check',
    author: 'Aisha Rahman',
    description:
      'Samples a grid of analysis points per room and estimates average daylight factor from window-to-floor ratios and orientation.',
    category: 'Analysis',
    tags: ['daylight', 'sustainability', 'rooms', 'analysis'],
    dynamoVersion: '2.19',
    revitVersion: '2024–2025',
    downloads: 2870,
    likes: 430,
    date: '2026-05-28',
    snippet: `# Estimate daylight factor per room
wfr = window_area / floor_area
df = wfr * transmittance * orient_factor * 100
colour = Gradient(df, 0, 5)`,
    notes:
      'A fast early-design screen, not a substitute for a full simulation. Colour-codes rooms red→green and exports a CSV summary.',
  },
  {
    id: 'ifc-cleaner',
    title: 'IFC Import Cleaner & Mapper',
    author: 'Tomás Vega',
    description:
      'Cleans messy linked IFC data — remaps categories, fixes broken type names, and consolidates duplicate materials for a tidy federated model.',
    category: 'Interoperability',
    tags: ['ifc', 'openbim', 'mapping', 'cleanup'],
    dynamoVersion: '2.18',
    revitVersion: '2023–2025',
    downloads: 3310,
    likes: 505,
    date: '2026-02-11',
    snippet: `# Remap IFC categories to Revit
for el in ifc_elements:
    target = mapping.get(el.IfcType, "Generic Model")
    el.SetCategory(target)`,
    notes:
      'Ships with a starter mapping table you can edit in-node. Logs anything it can not map so nothing is silently dropped.',
  },
  {
    id: 'wall-opening-audit',
    title: 'Wall Opening & MEP Clash Audit',
    author: 'Grace Liu',
    description:
      'Finds MEP elements that pass through walls without a hosted opening and reports them with location, host, and discipline.',
    category: 'Analysis',
    tags: ['mep', 'clash', 'openings', 'coordination'],
    dynamoVersion: '2.19',
    revitVersion: '2024–2025',
    downloads: 4090,
    likes: 588,
    date: '2026-06-20',
    snippet: `# Detect un-sleeved penetrations
for duct in ducts:
    if Intersects(duct, wall) and not HasOpening(wall, duct):
        issues.append((duct.Id, wall.Id))`,
    notes:
      'Pair it with a BIM 360 / ACC issue export to raise coordination items straight from the audit results.',
  },
  {
    id: 'view-template-enforcer',
    title: 'View Template Enforcer',
    author: 'Priya Nair',
    description:
      'Audits every view against a required template map and re-applies the correct template, logging any manual overrides it corrects.',
    category: 'Documentation',
    tags: ['views', 'templates', 'standards', 'qa'],
    dynamoVersion: '2.17',
    revitVersion: '2022–2025',
    downloads: 3540,
    likes: 470,
    date: '2026-01-30',
    snippet: `# Enforce templates by view type
for view in views:
    want = template_map[view.ViewType]
    if view.Template != want:
        view.Template = want`,
    notes:
      'Standards-team favourite. Runs read-only first so you can review the diff before enforcing across the project.',
  },
]
