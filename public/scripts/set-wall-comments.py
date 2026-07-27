# Dynamo Python node — Tag walls on the active level
# Sets the "Comments" parameter on every wall whose base level is the active level.
# Inputs: IN[0] = text to write (string)
# Output: OUT = number of walls updated

import clr
clr.AddReference('RevitServices')
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import (FilteredElementCollector, BuiltInCategory,
                               BuiltInParameter)

doc = DocumentManager.Instance.CurrentDBDocument
uidoc = DocumentManager.Instance.CurrentUIApplication.ActiveUIDocument
value = IN[0] if len(IN) > 0 else "Reviewed"

active_level_id = uidoc.ActiveView.GenLevel.Id if uidoc.ActiveView.GenLevel else None

walls = (FilteredElementCollector(doc)
         .OfCategory(BuiltInCategory.OST_Walls)
         .WhereElementIsNotElementType()
         .ToElements())

count = 0
TransactionManager.Instance.EnsureInTransaction(doc)
for w in walls:
    if active_level_id and w.LevelId != active_level_id:
        continue
    p = w.get_Parameter(BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS)
    if p and not p.IsReadOnly:
        p.Set(value)
        count += 1
TransactionManager.Instance.TransactionTaskDone()

OUT = count
