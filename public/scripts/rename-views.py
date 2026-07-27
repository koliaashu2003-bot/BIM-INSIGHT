# Dynamo Python node — Batch rename views by type
# Prefixes each view name with its view type, e.g. "FloorPlan - Level 1".
# Inputs:  IN[0] = toggle (Boolean) to run
# Output:  OUT = list of new view names
#
# Paste into a Python Script node in Dynamo for Revit. Review before running.

import clr
clr.AddReference('RevitServices')
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import FilteredElementCollector, View

doc = DocumentManager.Instance.CurrentDBDocument

run = IN[0] if len(IN) > 0 else False
results = []

if run:
    views = FilteredElementCollector(doc).OfClass(View).ToElements()
    TransactionManager.Instance.EnsureInTransaction(doc)
    for v in views:
        if v.IsTemplate:
            continue
        vtype = str(v.ViewType)
        if not v.Name.startswith(vtype):
            try:
                v.Name = "{} - {}".format(vtype, v.Name)
                results.append(v.Name)
            except Exception as e:
                results.append("Skipped {}: {}".format(v.Name, e))
    TransactionManager.Instance.TransactionTaskDone()

OUT = results
