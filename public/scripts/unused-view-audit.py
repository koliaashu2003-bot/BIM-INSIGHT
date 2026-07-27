# Dynamo Python node — Find views not placed on any sheet
# Useful before purging a model.
# Output: OUT = list of view names that are not on a sheet.

import clr
clr.AddReference('RevitServices')
from RevitServices.Persistence import DocumentManager

clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import FilteredElementCollector, View, Viewport

doc = DocumentManager.Instance.CurrentDBDocument

# View ids that ARE placed on a sheet (via viewports)
placed_ids = set()
for vp in FilteredElementCollector(doc).OfClass(Viewport).ToElements():
    placed_ids.add(vp.ViewId.IntegerValue)

orphans = []
for v in FilteredElementCollector(doc).OfClass(View).ToElements():
    if v.IsTemplate:
        continue
    # Schedules/legends can also be placed; this focuses on graphical views.
    if v.Id.IntegerValue not in placed_ids and not v.ViewType.ToString() in ("DrawingSheet",):
        orphans.append(v.Name)

orphans.sort()
OUT = orphans
