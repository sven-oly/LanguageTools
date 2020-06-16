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
  def __init__(self):
    self.header_info = """
// Keyboard from CLDR data
//
"""
    self.locale = 'locale'
    self.id = 'id'
    self.dir = 'rtl'
    self.title = 'title'
    self.mappings = {}
    self.transforms = {}
    self.historyPruneRegex = None

    self.maprows = ['E', 'D', 'C', 'B']  # , 'A']

    # Mappings:
    #   A03 -> space
    # B01 - B10
    # C01 - C11
    # D01 - D13
    # E01 - E13
    self.row_sizes = {'A': 3, 'B': 10, 'C': 11, 'D': 13, 'E': 13}
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
    print(self.header_info)
    loadname = self.locale.upper()
    print('var %s = {' % loadname)
    print('  "id": "%s",' % self.locale)
    print('  "dir": "%s",' % self.dir)
    print('  "title": "%s",' % self.title)

    self.printMappings()

    if self.transforms:
      self.printTransforms()

    print('}')
    print()
    print('google.elements.keyboard.loadme(%s);' % loadname)
    print('var extern = %s' % loadname)
    return

  def keyPositionsToString(self, keymap):
    str_list = ['"']
    for row in self.maprows:
      for i in range(1, self.row_sizes[row]):
        key = row + '%02d' % i
        if key in keymap:
          str_list.append(keymap[key])
        else:
          str_list.append(' ')
      str_list.append('"')
      str_list.append(',\n            "')
    return ''.join(str_list[0:-1])

  def printMappings(self):
    print('  "mappings": {')
    for key in self.mappings:
      print('    "%s": {' % key)
      # TODO: Get mappings in E01-A03 order, filling in gaps
      print('      "": %s\n    },' %
            self.keyPositionsToString(self.mappings[key]))
    print('  },')
    return

  def printTransforms(self):
    print('  "transform" : {')
    print('  },')
    return

  def printHistoryPruneRegex(self):
    print('  "historyPruneRegex" :')
    print('  },')
    return

  def addKeyMapping(self, new_map, key, output):
    # print('  addMapping %s  output = %s' % (key, output))
    new_map[key] = output
    return

  def parseKeyMap(self, keymap):
    print(' KEYMAP %s has %s' % (keymap.tag, keymap.attrib))
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
      if child.tag == "name":
        for name in child.tag:
          self.title += name.value

      elif child.tag == "settings":
        # print('settings = %s' % child.attrib)
        settings_attrib = child.attrib
      elif child.tag == "keyMap":
        try:
          modifiers = child.attrib['modifiers']
        except:
          modifiers = ''
        self.parseKeyMap(child)


def main(argv):
  args = parseArgs()
  print('args = %s' % args)
  infile = sys.argv[1]
  print('Input  = %s' % infile)
  if len(sys.argv) > 2:
    outfile = sys.argv[2]
    print('Output = %s' % outfile)
  else:
    outfile = None

  parser = layout()
  parser.parseLdml(infile)

  print('------------------')
  parser.outputJavaScript(outfile)

if __name__ == "__main__":
  main(sys.argv)
