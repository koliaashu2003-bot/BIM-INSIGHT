import type { Question } from '../types'

export const questions: Question[] = [
  // ---------- Revit ----------
  {
    id: 1,
    category: 'Revit',
    prompt:
      'Which Revit family type is modeled directly inside a single project and cannot be reused by loading an external .rfa file?',
    options: ['In-place families', 'Loadable families', 'System families', 'Shared families'],
    correctIndex: 0,
    explanation:
      'In-place families are one-off geometry created for a specific project. Loadable families live in external .rfa files; system families (walls, floors) are defined in the project/template itself.',
  },
  {
    id: 2,
    category: 'Revit',
    prompt: 'Which Revit feature lets multiple people edit one central model at the same time by dividing it into ownable portions?',
    options: ['Worksets (worksharing)', 'Design Options', 'Phases', 'Groups'],
    correctIndex: 0,
    explanation:
      'Worksharing splits a model into worksets that users can borrow/own, enabling parallel editing against a central file without overwriting each other.',
  },
  {
    id: 3,
    category: 'Revit',
    prompt: 'Why are shared parameters used in Revit rather than project parameters?',
    options: [
      'They have a stable GUID so the same parameter can be tagged and scheduled across many families and projects',
      'They automatically model geometry for a family',
      'They remove the need for system families',
      'They only store rendering materials',
    ],
    correctIndex: 0,
    explanation:
      'Shared parameters are defined in an external file with a persistent GUID, so they can be tagged and scheduled consistently across families and projects — project parameters cannot be tagged.',
  },
  {
    id: 4,
    category: 'Revit',
    prompt: 'In Revit, what do Levels define, as opposed to Grids?',
    options: [
      'Horizontal datum planes that set story elevations (floor-to-floor heights)',
      'Vertical reference lines used to locate columns',
      'The project’s shared coordinate system',
      'Material takeoff quantities',
    ],
    correctIndex: 0,
    explanation:
      'Levels are horizontal datums for story heights; Grids are vertical reference lines used mainly to place structure such as columns in plan.',
  },
  {
    id: 5,
    category: 'Revit',
    prompt: 'What is Revit “phasing” primarily used for?',
    options: [
      'Modeling existing, demolition, and new-construction stages within one project',
      'Sharing a model between disciplines',
      'Controlling render quality',
      'Splitting a model into permanent linked files',
    ],
    correctIndex: 0,
    explanation:
      'Phases assign elements to construction stages (Existing / Demolition / New Construction); phase filters then control how each stage displays — key for renovation work.',
  },

  // ---------- AutoCAD & Civil 3D ----------
  {
    id: 6,
    category: 'AutoCAD & Civil 3D',
    prompt: 'What does attaching an external reference (Xref) do in AutoCAD?',
    options: [
      'Links another drawing as a live reference that updates when the source changes',
      'Permanently copies the other drawing’s geometry in',
      'Converts the drawing into a block library',
      'Exports the drawing to IFC',
    ],
    correctIndex: 0,
    explanation:
      'An Xref links an external .dwg as a live reference — reload it and you get the source’s latest changes, unlike inserting a static copy.',
  },
  {
    id: 7,
    category: 'AutoCAD & Civil 3D',
    prompt: 'What is a “block” in AutoCAD?',
    options: [
      'A named, reusable group of objects inserted and edited as a single entity',
      'A layer that hides objects',
      'A locked viewport',
      'A type of hatch pattern',
    ],
    correctIndex: 0,
    explanation:
      'A block is a reusable collection of objects treated as one entity; editing the block definition updates every insertion of it.',
  },
  {
    id: 8,
    category: 'AutoCAD & Civil 3D',
    prompt: 'What does a Civil 3D “corridor” model?',
    options: [
      'A 3D model of a linear feature (road, rail) built from an alignment, profile, and assembly',
      'A triangulated terrain surface',
      'A pipe network only',
      'A sheet set for plotting',
    ],
    correctIndex: 0,
    explanation:
      'A corridor combines a horizontal alignment, a vertical profile, and a cross-sectional assembly to generate the 3D model of a road or other linear infrastructure.',
  },
  {
    id: 9,
    category: 'AutoCAD & Civil 3D',
    prompt: 'A Civil 3D TIN surface represents:',
    options: [
      'Terrain as a triangulated network of connected 3D points',
      'A parametric wall type',
      'A construction schedule',
      'A rendered material library',
    ],
    correctIndex: 0,
    explanation:
      'A TIN (Triangulated Irregular Network) surface models ground/terrain by connecting survey points into triangles, the basis for contours, grading, and volumes.',
  },

  // ---------- Navisworks ----------
  {
    id: 10,
    category: 'Navisworks',
    prompt: 'Which Navisworks format stores links to source files, viewpoints, and clash results but NOT the model geometry itself?',
    options: ['.nwf', '.nwd', '.nwc', '.rvt'],
    correctIndex: 0,
    explanation:
      'An .nwf keeps references to the original sources (small file, but sources must stay reachable). .nwc caches geometry; .nwd embeds everything in a published file.',
  },
  {
    id: 11,
    category: 'Navisworks',
    prompt: 'In Clash Detective, what is a “hard” clash?',
    options: [
      'Two objects physically intersect in 3D space',
      'Two objects are within a clearance distance but not touching',
      'A duplicate object exists',
      'An object is missing metadata',
    ],
    correctIndex: 0,
    explanation:
      'A hard clash is a true geometric intersection; a clearance (soft) clash flags objects that come within a set tolerance without overlapping.',
  },
  {
    id: 12,
    category: 'Navisworks',
    prompt: 'What does the TimeLiner tool do in Navisworks?',
    options: [
      'Links model objects to a construction schedule to simulate 4D sequencing',
      'Extracts cost quantities',
      'Detects clashes between disciplines',
      'Manages Revit worksets',
    ],
    correctIndex: 0,
    explanation:
      'TimeLiner ties model elements (or selection/search sets) to schedule tasks — from Project/Primavera or entered manually — producing a 4D construction sequence.',
  },
  {
    id: 13,
    category: 'Navisworks',
    prompt: 'What does “Switchback” let a coordinator do?',
    options: [
      'Select an object in Navisworks and jump to that same element in its native authoring app',
      'Undo the last saved viewpoint',
      'Convert an NWD back to an NWC',
      'Reverse a clash test result',
    ],
    correctIndex: 0,
    explanation:
      'Switchback opens the selected element highlighted in its authoring tool (Revit, AutoCAD, etc.) via the matching plugin — speeding up issue resolution.',
  },

  // ---------- Rhino & Grasshopper ----------
  {
    id: 14,
    category: 'Rhino & Grasshopper',
    prompt: 'Rhino models geometry primarily using which mathematical representation?',
    options: [
      'NURBS curves and surfaces',
      'Voxel grids',
      'Only polygon meshes',
      'Parametric Revit families',
    ],
    correctIndex: 0,
    explanation:
      'Rhino is a NURBS modeler — Non-Uniform Rational B-Splines describe smooth, precise curves and surfaces, which is why it excels at complex free-form geometry.',
  },
  {
    id: 15,
    category: 'Rhino & Grasshopper',
    prompt: 'Grasshopper is best described as:',
    options: [
      'A visual (node-based) programming plugin for Rhino for parametric/algorithmic modeling',
      'A standalone rendering engine',
      'A clash-detection tool',
      'A PDF markup app',
    ],
    correctIndex: 0,
    explanation:
      'Grasshopper is Rhino’s visual programming environment: you wire components together to build parametric, algorithm-driven geometry without writing code.',
  },
  {
    id: 16,
    category: 'Rhino & Grasshopper',
    prompt: 'In Grasshopper, a “data tree” is:',
    options: [
      'A hierarchical structure that organizes data into branches/paths',
      'A rendering preset',
      'A type of NURBS surface',
      'A Rhino layer group',
    ],
    correctIndex: 0,
    explanation:
      'Data trees organize Grasshopper data into nested branches (paths); understanding grafting, flattening, and matching trees is central to controlling how components process lists.',
  },
  {
    id: 17,
    category: 'Rhino & Grasshopper',
    prompt: 'Rhino.Inside.Revit lets you:',
    options: [
      'Run Rhino and Grasshopper inside Revit and drive Revit elements from Grasshopper',
      'Export Revit to IFC only',
      'Replace Navisworks for clashing',
      'Convert DWG to NWC',
    ],
    correctIndex: 0,
    explanation:
      'Rhino.Inside.Revit loads Rhino/Grasshopper within a running Revit session, so parametric Grasshopper definitions can create and edit native Revit elements.',
  },

  // ---------- Dynamo ----------
  {
    id: 18,
    category: 'Dynamo',
    prompt: 'Dynamo is primarily used to:',
    options: [
      'Visually script and automate tasks in Revit without traditional coding',
      'Render photorealistic images',
      'Run cloud clash detection',
      'Manage a construction schedule',
    ],
    correctIndex: 0,
    explanation:
      'Dynamo is a visual programming tool (commonly for Revit) used to automate repetitive tasks, generate geometry, and read/write model data via node graphs.',
  },
  {
    id: 19,
    category: 'Dynamo',
    prompt: 'In a Dynamo graph, nodes are connected by:',
    options: [
      'Wires that pass data from one node’s output to the next node’s input',
      'Worksets',
      'Xrefs',
      'Layers',
    ],
    correctIndex: 0,
    explanation:
      'Data flows left to right along wires connecting node outputs to inputs; the graph evaluates as data passes through each node.',
  },
  {
    id: 20,
    category: 'Dynamo',
    prompt: 'What does Dynamo Player let a user do?',
    options: [
      'Run finished Dynamo scripts from within Revit without opening the graph editor',
      'Edit NURBS surfaces',
      'Publish an NWD',
      'Create AutoCAD blocks',
    ],
    correctIndex: 0,
    explanation:
      'Dynamo Player lets non-authors run and re-run existing scripts (with simple inputs) straight from Revit, no graph editing required.',
  },
  {
    id: 21,
    category: 'Dynamo',
    prompt: 'Beyond the built-in nodes, custom functionality is commonly added to Dynamo via:',
    options: [
      'Python Script nodes and downloadable packages',
      'Revit phases',
      'Navisworks selection sets',
      'AutoCAD xrefs',
    ],
    correctIndex: 0,
    explanation:
      'Python nodes let you write custom logic, and community packages (e.g., from the Package Manager) add pre-built nodes that extend Dynamo’s capabilities.',
  },

  // ---------- ACC & BIM 360 ----------
  {
    id: 22,
    category: 'ACC & BIM 360',
    prompt: 'Autodesk Construction Cloud (ACC) is best described as:',
    options: [
      'A cloud platform for storing, sharing, and coordinating project information (a CDE)',
      'A desktop NURBS modeler',
      'A local rendering plugin',
      'A spreadsheet add-in',
    ],
    correctIndex: 0,
    explanation:
      'ACC (the successor to BIM 360) is a cloud-based common data environment hosting documents, models, and workflows for design and construction teams.',
  },
  {
    id: 23,
    category: 'ACC & BIM 360',
    prompt: 'In ACC / BIM 360 Docs, controlled sharing of documents is managed mainly through:',
    options: [
      'Folders with permission levels and review/approval workflows',
      'Revit worksets',
      'Grasshopper data trees',
      'AutoCAD layer states',
    ],
    correctIndex: 0,
    explanation:
      'Docs uses a folder structure with granular permissions plus review and approval workflows to control who can view, edit, or publish each document.',
  },
  {
    id: 24,
    category: 'ACC & BIM 360',
    prompt: 'The Model Coordination tool in ACC / BIM 360 automatically:',
    options: [
      'Runs clash detection between published models in the cloud',
      'Renders VR walkthroughs',
      'Generates a corridor model',
      'Creates Revit sheets',
    ],
    correctIndex: 0,
    explanation:
      'Model Coordination continuously clash-tests the models published to a coordination space, so teams see cross-discipline issues without a manual Navisworks run.',
  },
  {
    id: 25,
    category: 'ACC & BIM 360',
    prompt: 'Revit Cloud Worksharing (Collaboration for Revit) lets teams:',
    options: [
      'Co-author a Revit central model hosted in the cloud from different locations',
      'Export IFC in batch',
      'Check IFC rule compliance',
      'Build Grasshopper definitions',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Worksharing hosts the central model in ACC/BIM 360 so distributed teams can worksharing-collaborate on the same Revit model in real time.',
  },

  // ---------- Add-ins & Plugins ----------
  {
    id: 26,
    category: 'Add-ins & Plugins',
    prompt: 'Enscape is a plugin for Revit/Rhino/SketchUp used mainly for:',
    options: [
      'Real-time rendering, walkthroughs, and VR',
      'Rule-based model checking',
      'Bulk data editing in Excel',
      'Cloud document storage',
    ],
    correctIndex: 0,
    explanation:
      'Enscape plugs into the authoring tool to give live, real-time rendered views, walkthroughs, and VR without exporting to a separate renderer.',
  },
  {
    id: 27,
    category: 'Add-ins & Plugins',
    prompt: 'pyRevit is:',
    options: [
      'A free, open-source add-in that adds custom tools and lets you script Revit with Python',
      'A cloud CDE platform',
      'A NURBS surfacing engine',
      'A construction scheduling suite',
    ],
    correctIndex: 0,
    explanation:
      'pyRevit is a popular open-source add-in providing a toolbar of productivity tools and a fast way to write and run Python scripts against the Revit API.',
  },
  {
    id: 28,
    category: 'Add-ins & Plugins',
    prompt: 'Solibri is primarily used for:',
    options: [
      'Rule-based model checking and quality assurance, often on IFC models',
      'Real-time photorealistic rendering',
      'Road corridor design',
      'Cloud worksharing of Revit models',
    ],
    correctIndex: 0,
    explanation:
      'Solibri runs configurable rulesets to check models for clashes, code/QA issues, and information completeness — a standard tool for model quality assurance.',
  },
  {
    id: 29,
    category: 'Add-ins & Plugins',
    prompt: 'An add-in like Ideate BIMLink is used to:',
    options: [
      'Bulk edit and exchange Revit data between Revit and Excel',
      'Detect clashes in the cloud',
      'Model NURBS surfaces',
      'Generate 4D construction sequences',
    ],
    correctIndex: 0,
    explanation:
      'Ideate BIMLink pulls large amounts of Revit parameter data out to Excel for fast bulk editing, then pushes the changes back into the model.',
  },
]

export const TOTAL_QUESTIONS = questions.length
export const QUESTION_TIME_SECONDS = 25
