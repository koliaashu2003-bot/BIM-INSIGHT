# Dynamo Python node — Build a sheet index
# Outputs "number - name" for every sheet, sorted by sheet number.
# Output: OUT = sorted list of strings for a drawing register.

import clr
clr.AddReference('RevitServices')
from RevitServices.Persistence import DocumentManager

clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import FilteredElementCollector, ViewSheet

doc = DocumentManager.Instance.CurrentDBDocument

sheets = FilteredElementCollector(doc).OfClass(ViewSheet).ToElements()
index = ["{} - {}".format(s.SheetNumber, s.Name) for s in sheets]
index.sort()

OUT = index
