import xml.etree.ElementTree as ET
#import lxml as etree

tree = ET.parse('test.xml')
root = tree.getroot()

parent_map = dict((c, p) for p in tree.getiterator() for c in p)
print parent_map

for child in root:
  print child.tag, child.attrib
  thisone = child.findall('.//')
  print '  parent = ', parent_map[child]
