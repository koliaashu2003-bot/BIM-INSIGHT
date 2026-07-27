# Dynamo Python node — Export room data
# Returns [Name, Number, Level, Area] for every placed room.
# Output: OUT = list of rows you can send to Excel or a schedule.

import clr
clr.AddReference('RevitServices')
from RevitServices.Persistence import DocumentManager

clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import FilteredElementCollector, BuiltInCategory

doc = DocumentManager.Instance.CurrentDBDocument

rooms = (FilteredElementCollector(doc)
         .OfCategory(BuiltInCategory.OST_Rooms)
         .WhereElementIsNotElementType()
         .ToElements())

rows = []
for r in rooms:
    # Unplaced rooms have zero area — skip them.
    if r.Area == 0:
        continue
    level = doc.GetElement(r.LevelId)
    rows.append([
        r.LookupParameter("Name").AsString(),
        r.LookupParameter("Number").AsString(),
        level.Name if level else "",
        round(r.Area, 2),
    ])

OUT = rows
