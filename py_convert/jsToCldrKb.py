# -*- coding: utf-8 -*-

import argparse

import os
import re
import sys

import xml.etree.ElementTree as ET

# Reads LDML for CLDR keyboards
# http://unicode.org/Public/cldr/37/

# Started 15-June-2020

def parseArgs():
  parser = argparse.ArgumentParser(description='Read CLDR Keyboard LDML files')
  parser.add_argument(
    '--infile', nargs='*',
    default='/Users/craig/Desktop/Projects/cldr-keyboards-37.0/keyboards/windows/ga-t-k0-windows.xml',  # Zero or more
                      help='names of cldr keyboard file to convert')
  parser.add_argument('outfile', nargs='*', default=None,  # Zero or more
                      help='names of JavaScript keyboard file to convert')

  args = parser.parse_args()

class layout():
  def __init__(self, outfilename):
    self.header_info = \
"""// Keyboard from CLDR data
//
"""
    self.source_file = ''
    self.locale = 'locale'
    self.id = 'id'
    self.dir = 'rtl'
    self.title = 'title'
    self.mappings = {}
    self.transforms = []
    self.historyPruneRegex = None

    if outfilename:
      self.id = os.path.split(os.path.splitext(outfilename)[0])[1]
      self.outfile = open(outfilename, 'w')
    else:
      self.outfile = sys.stdout

    self.maprows = ['E', 'D', 'C', 'B']  # , 'A']

    # Mappings:
    #   A03 -> space
    # B01 - B10
    # C01 - C11
    # D01 - D13
    # E01 - E13
    self.row_max = {'A': 3, 'B': 10, 'C': 11, 'D': 13, 'E': 12}
    self.row_base = {'A': 3, 'B': 1, 'C': 1, 'D': 1, 'E': 0}
    self.maplayers = {'': '', 'shift': 's',
                      'shift+caps?': 's,sl',
                      'caps+shift': 'sl',
                      'altL': 'c', 'altR': 'c', 'shift+alt': 's,sc',
                      'ctrl+caps?': 'c,cl',
                      'caps': 'l',
                      'ctrl+alt+caps?': 'sc,slc',
                      'ctrl+alt+shift+caps?': 'sc,slc',
                      'altR+caps? ctrl+alt+caps?': 'cl'
                      # Others?
                      }

  def outputJavaScript(self, outfile):
    # Open file requested.

    # Heading comments
    self.outfile.write(self.header_info)
    loadname = self.locale.replace('-', '_').upper()
    self.outfile.write('var %s = {\n' % loadname)
    self.outfile.write('  "id": "%s",\n' % self.id)
    self.outfile.write('  "locale" : "%s",\n' % self.locale)
    self.outfile.write('  "dir": "%s",\n' % self.dir)
    self.outfile.write('  "title": "%s",\n' % self.title)

    self.printMappings()

    if self.transforms:
      self.printTransforms()

    self.outfile.write('}\n')
    self.outfile.write('\n')
    self.outfile.write('google.elements.keyboard.loadme(%s);\n' % loadname)
    self.outfile.write('var extern = %s;\n' % loadname)

    self.outfile.close()
    return

  def keyPositionsToString(self, keymap):
    str_list = ['"']
    for row in self.maprows:
      for i in range(self.row_base[row], self.row_max[row]+1):
        key = row + '%02d' % i
        if key in keymap:
          str_list.append(keymap[key])
        else:
          str_list.append(' ')
      str_list.append('"')
      str_list.append(' +\n          "')
    return ''.join(str_list[0:-1])

  def printMappings(self):
    self.outfile.write('  "mappings": {\n')
    for key in self.mappings:
      self.outfile.write('    "%s": {\n' % key)
      # TODO: Get mappings in E01-A03 order, filling in gaps
      self.outfile.write('      "": %s\n    },\n' %
            self.keyPositionsToString(self.mappings[key]))
    self.outfile.write('  },\n')
    return


  def printTransforms(self):
    self.outfile.write('  "transform" : {\n')
    for trans in self.transforms:
      self.outfile.write('%s\n' % trans)
    self.outfile.write('  },\n')

  def addTransforms(self, transforms):
    if transforms.attrib['type'] == 'simple':
      for child in transforms:
        from_part = child.attrib['from']
        # Fix special cases for RegEx handling ^
        from_part = from_part.replace('^', '\\\\^')
        self.transforms.append(
          '      "%s": "%s",' % (from_part, child.attrib['to']))
    else:
      # Deal with more complex transformations.
      return
    return

  def printHistoryPruneRegex(self):
    self.outfile.write('  "historyPruneRegex" :')
    self.outfile.write('  },')
    return

  def addKeyMapping(self, new_map, key, output):
    # print('  addMapping %s  output = %s' % (key, output))
    # Special case for C12
    if key == "C12":
      key = "D13"
    new_map[key] = output
    return

  def parseKeyMap(self, keymap):
    #print(' KEYMAP %s has %s' % (keymap.tag, keymap.attrib))
    try:
      modifiers = keymap.attrib['modifiers']
    except:
      modifiers = ''

    # print('KeyMap modifiers = %s' % modifiers)
    try:
      level = self.maplayers[modifiers]
    except:
      level = 'unknown:' + modifiers
    new_map = {}

    for item in keymap:
      key = item.attrib['iso']
      output = item.attrib['to']
      self.addKeyMapping(new_map, key, output)

    self.mappings[level] = new_map
    return

  def parseLdml(self, filename):
    tree = ET.parse(filename)
    root = tree.getroot()
    #print('root = %s, attributes = %s' % (root, root.attrib))
    self.locale = root.attrib['locale']
    for child in root:
      # print('TAG = %s, attrib = %s' % (child.tag, child.attrib))
      if child.tag == "names":
        print('// name = %s' % child.attrib)
        self.title = ''
        for name in child:
          attribs = name.attrib
          print('// name in title = %s' % attribs['value'])
          self.title += attribs['value']

      elif child.tag == "settings":
        # print('settings = %s' % child.attrib)
        settings_attrib = child.attrib
      elif child.tag == "keyMap":
        try:
          modifiers = child.attrib['modifiers']
        except:
          modifiers = ''
        self.parseKeyMap(child)
      elif child.tag == "transforms":
        self.addTransforms(child)


def main(argv):
  args = parseArgs()
  #print('args = %s' % args)
  infile = sys.argv[1]
  #print('Input  = %s' % infile)
  if len(sys.argv) > 2:
    outname = sys.argv[2]
    #print('Output = %s' % outfile)
  else:
    outname = None

  parser = layout(outname)
  parser.parseLdml(infile)

  #print('------------------')
  parser.outputJavaScript(outname)

if __name__ == "__main__":
  main(sys.argv)
