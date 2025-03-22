# -*- coding: utf-8 -*-

import argparse

import json

import logging
import os
import re
import sys

import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element
from xml.etree.ElementTree import ElementTree

# From .js keyboard files, create
# transformation rules from Google Input Tools transforms

# Started 27-May-2024

def parseArgs(argv):
  parser = argparse.ArgumentParser(description='Transforms to Keyman rules')
  parser.add_argument('--hex_out', action='store_true', help="If set, outputs unicode in U+ form")
  parser.add_argument(
    '--infile', nargs=1,
    default='/Users/craig/Desktop/Projects/cldr-keyboards-37.0/keyboards/windows/ga-t-k0-windows.xml',  # Zero or more
                      help='names of cldr keyboard file to convert')
  parser.add_argument('--outfile', nargs=1, default=None,  # Zero or more
                      help='names of JavaScript keyboard file to convert')
  args = parser.parse_args()
  return args

class kbTree(ET.TreeBuilder):
  def doctype(self, name, pubid, system):
    x = name

def sortLenFirst(val):
  return len(val[0])

class layout():
  def __init__(self, outfilename=None, hex_out=False):
    self.header_info = \
"""// CLDR from JavaScript keyboard data
//
"""
    self.source_file = ''
    self.locale = 'locale'
    self.id = 'id'
    self.dir = 'rtl'
    self.title = 'title'

    self.hex_out = hex_out  # If true, output lines should be in U+ character format

    # Mappings from Row/Columns to output values
    self.mappings = {}

    # Rules for CLDR transforms
    self.transforms = []

    # Rules in keyman for phonetic transformations
    self.km_rules = []
    
    if outfilename:
      self.outputname = outfilename
      self.id = os.path.split(os.path.splitext(outfilename)[0])[1]
      # self.outfile = open(outfilename, 'w')
    else:
      self.outputname = None
      # self.outfile = sys.stdout

    self.maprows = ['E', 'D', 'C', 'B', 'A']  # , 'A']

    # Mappings:
    #   A03 -> space
    # B01 - B10
    # C01 - C11
    # D01 - D13
    # E01 - E13
    self.row_base = {'A': 3, 'B': 1, 'C': 1, 'D': 1, 'E': 0}
    self.row_max = {'A': 4, 'B': 11, 'C': 12, 'D': 14, 'E': 13}
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
    self.layers_to_modifiers = {
      '': '',
      's': 'shift',
      's,sl': 'shift+caps?',
      'sl': 'caps+shift',
      'c':  'ctrl+alt',
      ',c':  'ctrl?',
      's,sc': 'shift+alt',
      'c,cl': 'ctrl+caps?',
      'l': 'caps',
      'al': 'shift+caps',
      'sc,slc': 'ctrl+alt+caps?',
      'sc,scl': 'ctrl+shift+caps?',
      'cl': 'altR+caps? ctrl+alt+caps?'
      # Others?
    }
    self.mapping_parse = re.compile(r'(\{\{[^\}]*\}\}|.)')

  def transformsToKeyman(self):
    # Work on the transforms, converting to Keyman forms
    if not self.transforms:
      return None

    rules = []

    max_length = 0
    transforms_by_length = {}
    trans_list = self.transforms.items()
    all_transforms = sorted(trans_list, key=sortLenFirst)
    for transform in all_transforms:
      # by length
      size = len(transform[0])
      max_length = max(max_length, size)
      if size in transforms_by_length:
        transforms_by_length[size].append(transform)
      else:
        transforms_by_length[size] = [transform]

      # Now start processing these by length, starting with single characters.
    for n in range(1, max_length+1):
      transforms = transforms_by_length[n]
      if n == 1:
        for t in transforms:
          rules.append('"%s" > "%s"' % (t[0], t[1]))
      else:
        # Now with context
        for t in transforms:
          last = t[0][-1]
          first_part = t[0][0:-1]
          context = 'None'
          if first_part in self.transforms:
            context = self.transforms[first_part]
          else:
            # Need to get each part
            chars = []
            for x in first_part:
              try:
                chars.append(self.transforms[x])
              except KeyError:
                pass
            context = ''.join(chars)

          out_string = t[1]
          if self.hex_out:
            context = self.string_to_hex(context)
            last = self.string_to_hex(last)
            out_string = self.string_to_hex(out_string)
          rule_string = '%s + %s > %s' % (context, last, out_string)

          rules.append(rule_string.replace('  ', ' '))

    self.rules = rules
    # etc...

  def outputLdml(self, parsed_json):
    # Create a tree
    tag = 'keyboard'
    if 'locale' in parsed_json:
      attrib = {'locale': parsed_json['locale']}
    else:
      attrib = {'locale': parsed_json['id']}

    elem = Element(tag, attrib)
    tree = ElementTree(elem)

    version = Element('version', {'platform': '10', 'number': '1.0'})
    elem.append(version)
    names = Element('names')
    name = Element('name', {'value': parsed_json['title']})
    names.append(name)
    elem.append(names)
    settings = Element('settings', {'fallback': 'omit',
                                    'transformPartial': 'hide'})
    elem.append(settings)

    displayMap = None

    # Get all the key mappings for each level

    # Output each layer
    for layer in parsed_json['mappings']:
      try:
        modifier_value = self.layers_to_modifiers[layer]
      except:
        modifier_value = 'UNKNOWN'
        print('Modifier value unknown: %s', layer)
      modifiers = {'modifiers': modifier_value}
      if modifier_value:
        keymap = Element('keyMap', modifiers)
      else:
        keymap = Element('keyMap')

      elements = parsed_json['mappings'][layer]
      for start_point in elements:
        # Get the key mappings.
        mapping_string = elements[start_point]
        codes = self.mapping_parse.split(mapping_string)
        maps = []

        if start_point == '':
          # The whole list E00 ... A3
          keys = []
          for row in self.maprows:
            self.row_base[row]
            self.row_max[row]
            for col in range(self.row_base[row], self.row_max[row]):
              keys.append('%s%02d' % (row, col))
        else:
          keys=[]
          print('STARTING SOMEWHERE ELSE')

        index = 0

        # If there's an A03 element, add this too!
        # TODO:
        #  For anything with keycaps, e.g., {{S||ᐊᐱᓯ||\u202f}},
        #  add display mapping.
        for code in codes:
          if code and index < len(keys):
            output = code
            # Remove {{ }} if needed
            if code[0] == '{' and len(code) > 1 and code[1]== '{':
              if code[2:5] == "S||":
                parts = code.split('||')
                display = parts[1]

                output = parts[2][:-2]
                if display:
                  if not displayMap:
                    displayMap = Element('displayMap')
                  displayElement = Element('display', {'mapOutput': output,
                                                       'display': display})
                  displayMap.append(displayElement)
              else:
                # Get the contents only
                output = code[2:-2]

            if output:
              map_content = {'iso': keys[index],
                             'to': output}
              map = Element('map', map_content)
              keymap.append(map)
            index += 1
      elem.append(keymap)
    if displayMap:
      elem.append(displayMap)

    # transform items
    if parsed_json['transform']:
      transforms = Element('transforms', {'type': 'simple'})
      keys = parsed_json['transform'].keys()
      for key in keys:
        key_parts = key.split('|')
        for part in key_parts:
          to_item = parsed_json['transform'][key]
          transform = Element('transform',
                        {'from': part, 'to': to_item})
          transforms.append(transform)
      elem.append(transforms)

    xml_output = ET.tostring(elem, encoding='utf-8')

    # Add header info
    doctype = '<!DOCTYPE keyboard SYSTEM "../dtd/ldmlKeyboard.dtd">\n'
    return doctype + xml_output

  def parseJS(self, infile_name):
    # Read and get the data from the layout file

    try:
      infile = open(infile_name[0], mode='r', encoding='UTF-8')
    except BaseException as error:
      logging.error('Cannot open file %s. Error = %s', infile_name, error)
      return None

    js_raw = infile.read()

    start_json = js_raw.find('{')
    end_json = js_raw.rindex('}')
    js_data = js_raw[start_json:end_json+1]
    try:
      self.parsed_json = json.loads(js_data)
      self.transforms =  self.parsed_json['transform']
    except Exception as err:
      self.transforms = None
      return None

    return self.transforms

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

  def addKeyMapping(self, new_map, key, output):
    # print('  addMapping %s  output = %s' % (key, output))
    # Special case for C12
    if key == "C12":
      key = "D13"
    new_map[key] = output
    return

  def addDisplayMappings(self):
    # For any that differ in what is on the keycap from the output
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

  def string_to_hex(self, in_text):
    res = ''.join(r'U+{:04X} '.format(ord(chr)) for chr in in_text)
    return res

def main(argv):
  # 

  args = parseArgs(argv)
  print('args = %s' % args)
  infiles = args.infile
  outname = args.outfile[0]

  print('Input  = %s' % infiles)
  print('Output = %s' % outname)

  parser = layout(outname, args.hex_out)
  parser.parseJS(infiles)

  parser.transformsToKeyman()

  rule_set = set()
  rules_unique = []
  for rule in parser.rules:
    if rule not in rule_set:
      print(rule)
      rule_set.add(rule)
      rules_unique.append(rule)

  # parser.outputLdml(parsed_json)

if __name__ == "__main__":
  main(sys.argv)
