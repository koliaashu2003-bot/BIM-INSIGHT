# Dynamo Python node — Place a family at grid intersections
# Inputs: IN[0] = FamilySymbol (family type) to place
# Output: OUT = list of created FamilyInstances
#
# Places one instance at each intersection point of the model's grids.

import clr
clr.AddReference('RevitServices')
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import (FilteredElementCollector, Grid, XYZ,
                               Line, Structure)

doc = DocumentManager.Instance.CurrentDBDocument
symbol = UnwrapElement(IN[0])

grids = FilteredElementCollector(doc).OfClass(Grid).ToElements()
lines = [g.Curve for g in grids if isinstance(g.Curve, Line)]

def intersect(a, b):
    res = clr.Reference[object]()
    if a.Intersect(b, res) == 1:  # 1 == an intersection was found
        return list(res.Value)[0].XYZPoint
    return None

points = []
for i in range(len(lines)):
    for j in range(i + 1, len(lines)):
        p = intersect(lines[i], lines[j])
        if p:
            points.append(XYZ(p.X, p.Y, 0))

created = []
TransactionManager.Instance.EnsureInTransaction(doc)
if not symbol.IsActive:
    symbol.Activate()
for p in points:
    inst = doc.Create.NewFamilyInstance(p, symbol, Structure.StructuralType.NonStructural)
    created.append(inst)
TransactionManager.Instance.TransactionTaskDone()

OUT = created
