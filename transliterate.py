#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function
import codecs

import logging

import re
import sys
import xml.etree.ElementTree as ET

# Default transliteration framework.
# Uses ICU-like syntax of transliteration rules.

# TODO: 13-Dec-2016
# 1. Remove testing from this file.
# 2. Complete conversion into classes.
# 3. Determine how to use any transliteration rules from upload.

# Take a transliteration rule with phases.
# Extract shortcuts such as "$nondigits = [^\u1040-\u1049];
# clauses "\u107B > \u1039 \u1018 ;
# Separate the phases with "::Null;
# For each phase,
#   for each clause in phrase,
#     replace with result in all cases

# Globals
allPhases = None
debug_output = False

class Rule():
  # Stores one rule of a phase, including substitution information
  def __init__(self, pattern, substitution,
               context = None,
               after_context=None,
               before_context=None,
               in_context=None,
               before_reposition=None,
               after_reposition=None,
               id=0):
    self.id = id
    self.pattern = pattern
    self.re_pattern = re.compile(pattern, re.UNICODE)
    self.subst = substitution
    self.context = context
    self.in_context = in_context
    self.after_context = after_context
    self.before_reposition = before_reposition
    self.after_reposition = after_reposition
    # Store info on repositioning cursor
    self.cursor_offset = 0

  def parseString(self, rule_string):
    return


class Phase():
  # one phase of the transliteration spec
  def __init__(self, id=0):
    self.rules = []     # Old tuples
    self.RuleList = []  # Rule objects
    self.phase_id = id

  def fillRules(self, rulelist):
    global debug_output

    # set up pattern and subst value for each rule
    parts_splitter = re.compile('>|→')
    rule_pattern = re.compile(
      '(?P<before_context>[^\{]*)(?P<left_context_mark>\{?)(?P<in_context>[^\}>→]*)\
(?P<right_context_mark>\}?)(?P<after_context>[^>→]*)\
[>→](?P<before_reposition>[^|]*)(?P<reposition_mark>\|?)(?P<after_reposition>[^;]*)'\
'(?P<final_semicolon>;?)(?P<comment>#?.*)')

    index = 0
    for rule1 in rulelist:
      # TODO: handle reposition with unescaped '|'
      resposition = rule1.find('|')
      # TODO: handle context with unescaped '{'
      context = rule1.find('}')

      # Extract parts for context, matching, and output with respositioning
      test_match = rule_pattern.match(rule1)
      context = None
      left_context_mark = None
      before_context = None
      in_context = None
      after_context = None
      before_reposition = None
      after_reposition = None
      if test_match:
        groups = test_match.groupdict()
        if groups['reposition_mark']:
          after_reposition = re.sub(' ', '', uStringsFixPlaceholder(groups['after_reposition']))
        before_reposition = re.sub(' ', '', uStringsFixPlaceholder(groups['before_reposition']))
        if groups['left_context_mark']:
          left_context_mark = groups['left_context_mark']
          after_context = re.sub(' ', '', uStringsFixPlaceholder(groups['after_context']))
          before_context = re.sub(' ', '', uStringsFixPlaceholder(groups['before_context']))
          in_context = re.sub(' ', '', uStringsFixPlaceholder(groups['in_context']))

      rule1 = rule1.strip()
      rule = re.sub('\n', '', rule1)
      # Remove comment lines.
      # TODO: remove final semicolon
      if rule and rule[0] != '#':
        # TODO: Use matched results instead of simple split
        parts = parts_splitter.split(rule)
        pattern = re.sub(' ', '', parts[0]) # but don't remove quoted space

        # Handle those without before_context
        # Use context information to create context rules
        subst = re.sub(' ', '', uStringsFixPlaceholder(parts[1]))
        if left_context_mark:
          pattern_string = '(%s)%s(%s)' % (before_context, in_context, after_context)
          pattern = pattern_string
          new_subst = '\\1%s\\2' % subst
          subst = new_subst
        # TODO: Separate rule parsing
        # newRule = Rule.fromString(rule_string)
        # self.RuleList.append(newRule)
        try:
          newPair = (pattern, subst)
          self.rules.append(newPair)
          self.RuleList.append(Rule(pattern, subst,
                                    context=context,
                                    before_context=before_context,
                                    in_context=in_context,
                                    after_context=after_context,
                                    before_reposition=before_reposition,
                                    after_reposition=after_reposition,
                                    id=index))  # Rule objects
        except IndexError as e:
          print('IndexError e = %s. Phase %s, %d rule = %s' % (e, self.phase_id, index, rule1))
          print('  Rule = >>%s<< %d' % (rule, len(rule)))
          break
        except ValueError as e:
          print('ValueError e = %s. Phase %s, %d rule = %s' % (e, self.phase_id, index, rule1))
          print('  Rule = >>%s<< %d' % (rule, len(rule)))
          break
        except:
          e = sys.exc_info()[0]
          print('!! Error e = %s. Phase %s, %d rule = %s' % (e, self.phase_id, index, rule1))
          print('  Rule = >>%s<< %d characters' % (rule, len(rule)))
          break
      index += 1

  def getRules(self):
    # Old style rules
    return self.rules

  def getRuleList(self):
    # List of rule objects
    return self.RuleList

  def apply(self, intext):
    # takes each rule (pattern, substitute), applying to intext
    for rule in self.rules:
      result = re.sub(rule[0], rule[1], intext)
      intext = result
    return result


def extractShortcuts(ruleString):
  # Shortcuts are clauses of the form "$id = re;  What about a literal ";?
  # also remove comment lines and blank lines
  shorcutPattern = '(\$\w+)\s*=\s*([^;]*)'
  matches = re.findall(shorcutPattern, ruleString)

  shortcuts = {}
  for m in matches:
    shortcuts[m[0]] = m[1]

  # Remove shortcuts and comments from input.
  shorcutPattern = '\$(\w+)\s*=\s*([^;]*);\n'
  commentPattern = '#[^\n]*\n+'
  stripped = re.sub(shorcutPattern, '', ruleString)
  smaller = re.sub(commentPattern, "", stripped)
  return (shortcuts, smaller)


def expandShortcuts(shortcuts, inlist):
  newlist = inlist
  if shortcuts:
    for key, value in shortcuts.items():
      key = re.sub('\$', '\$', key)
      sublist = re.sub(key, value, newlist)
      newlist = sublist
  return newlist


def splitPhases(ruleString):
  phases = ruleString.split('::Null;')
  return phases


def testZawgyiConvert():
  z1 = 'ဘယ္'
  u1 = ConvertZawgyiToUnicode(z1)


def ConvertZawgyiToUnicode(ztext):
  # Run the phases over the data.
  out1 = ztext

  for phase in phases:
    # Apply each regular expression with global replacement;
    rules = phases.rules
    for rule in rules:
      # apply
      continue

def uStringsFixPlaceholder(string):
  return re.sub(u'\$(\d)', subBackSlash, string) # Fix the replacement patterns

def uStringsToText(string):
  pattern = r'\\u[0-9A-Fa-f]{4}'
  result = re.sub(pattern, decodeHexU, string)
  return re.sub(u'\$(\d)', subBackSlash, result) # Fix the replacement patterns

def uStringToHex(string):
  result = ''
  for c in string:
    result += '%4s ' % hex(ord(c))
  return result


def subBackSlash(pattern):
  return '\\' + pattern.group(0)[1:]

def decodeHexU(uhexcode):
  # Convert \uhhhh in input hex code match to Unicode character
  text = uhexcode.group(0)[2:]
  return unichr(int(text, 16)).encode('utf-8')


class Transliterate():
  # Accepting a set of rules, create a transliterator with phases,
  # ready to apply them.

  def __init__(self, raw_rules, description='Default conversion'):
    # Get the short cuts.
    print('--------------- __init__ TRANSLITERATE raw_rules = %s. description = %s' %
                  (raw_rules, description))
    # logging.info('--------------- __init__ TRANSLITERATE raw_rules = %s. description = %s' %
    #              (raw_rules, description))

    self.description = description
    # Convert Unicode escapes to characters
    self.raw_rules = raw_rules  #.decode('unicode-escape')

    (self.shortcuts, self.reduced) = extractShortcuts(self.raw_rules)
    # Expand short cuts.
    self.expanded = expandShortcuts(self.shortcuts, self.reduced)

    self.phaseStrings = splitPhases(self.expanded)

    # Create the phase objects
    self.phaseList = []
    index = 0
    for phase in self.phaseStrings:
      self.phaseList.append(Phase(index))
      rule_lines = phase.split('\n')
      phase_rules = []
      for r in rule_lines:
        # TODO: Handle lines with semicolon as left side of rule
        rule_parts = r.rsplit(';', 1)
        if rule_parts[0]:
          phase_rules.append(rule_parts[0])
        # Omit empty lines
      self.phaseList[index].fillRules(phase_rules)
      index += 1

    # Range of current string, for passing information to substFunction.
    self.start = 0
    self.limit = 0

  def printSummary(self):
    # Print the statistics
    print('%4d raw rules' % len(self.raw_rules))
    print('%4d shortcuts ' % len(self.shortcuts))
    print('%4d reduced ' % len(self.reduced))
    print('%4d phaseStrings ' % len(self.phaseStrings))
    print('%4d phaseList ' % len(self.phaseList))
    index = 0
    for phase in self.phaseList:
      print('  %3d rules in phase %2d' % (len(self.phaseList[index].rules), index))
      index += 1

  def getSummary(self):
    # Print the statistics
    result = {
      'raw rules': len(self.raw_rules),
      'shortcuts': self.shortcuts,
      'reduced': len(self.reduced),
      'phaseStrings': self.phaseStrings,
      'phaseList': self.phaseList,
    }
    return result

  def substFunction(matchObj):
    return 'UNFINISHED'

  def applyPhase(self, index, instring,  debug):
    # It should do:
    #  a. Find rule that matches from the start
    #  b. if a match, substitute text and move start as required
    # until start >= limit

    # For each rule, apply to instring.
    self.start = 0
    self.limit = len(instring) - 1
    ruleList = self.phaseList[index].RuleList
    try:
      print('---------------applyPhase line 316  phase %s, instring = >%s<' % (index, instring))
      print('---------------applyPhase line 317  phase has %s rules' % (len(ruleList)))
    except AttributeError as e:
      print('--------------- applyPhase Error e = %s.' % (e))

    currentString = instring
    print('UUUUUUUUUUUUU current = %s', currentString)
    matchObj = True
    while self.start <= self.limit:
      # Look for a rule that matches
      ruleIndex = 0
      matchObj = None
      self.limit = len(currentString) - 1

      foundRule = None
      for rule in ruleList:
        # Try to match each rule at the current start point.
        re_pattern = rule.re_pattern
        #print('Trying RRRRRRRRule = %s. current = %s' % (rule.re_pattern, currentString[self.start:]))

        try:
          # look at the current position.
          matchObj = re_pattern.match(currentString[self.start:])
          # matchObj = re.match(rule.pattern, currentString[self.start:])
        except TypeError as e:
          print('***** TypeError EXCEPTION %s in phase %s, rule %s: %s -> %s' % (e,
            index, ruleIndex, uStringToHex(rule.pattern), uStringToHex(rule.subst)))
        except:
          e = sys.exc_info()[0]
          print('***** EXCEPTION %s in phase %s, rule %s: %s -> %s' % (e,
            index, ruleIndex, uStringToHex(rule.pattern), uStringToHex(rule.subst)))

        if matchObj:
          # Do just one substitution!
          foundRule = True
          print('MATCHING RRRRRRRRule = %s. current = %s' % (rule, currentString))

          # Size of last part of old string after the replacement
          cSize = len(currentString) - matchObj.end(0) - self.start  # Last part of old string not matched
          if not rule.before_reposition:
            substitution = rule.after_reposition
          else:
            # TODO: Handle case of before and after substitutions.
            substitution = rule.subst
          print('AFTER GETTING SUBSTITUTION Rule = %s. current = %s' % (str(rule.pattern), currentString))
          if not substitution:
            substitution = ''
          try:
            outstring = re.sub(rule.pattern, substitution, currentString[self.start:], 1)
          except TypeError as e:
            outstring = u'&*&*& %s &*&*&' % substitution
          # Try to advance start.
          print('&&&&&&&&&&  after substitution after substitution after substitution after substitution: >>>%s<<<' %
                ((len(currentString[0:self.start]))))
          print('&&&&&&&&&&  outstring: type=%s, %s' % (type(outstring), len(outstring)))
          try:
            newString = currentString[0:self.start] + str(outstring)
          except:
            print('!!!!!!!!!!! ERROR with substitution start = %s, currentString length = %s !!!!!!!!' %
                  (self.start, len(currentString)))
            print('!!!!!!!!!!!  last part = %s, outstring = %s' % (currentString[self.start:], outstring))
            print('!!!!!!!!!!!  first part = %s, outstring = %s' % (currentString[0:self.start], outstring))
          self.limit = len(newString) - 1

          # Figure out the new start and limit.
          # New: don't advance if all the text is after the reposition mark.
          print('!!!!!!!!!!!   before_reposition before_reposition before_reposition before_reposition rule = %s' %
                rule.after_reposition)
          if not rule.before_reposition:
            self.start = self.start  # Unchanged
          elif rule.after_reposition:
            # Find the location of the '|' in the result,
            # Remove that, and set the new position
            # Backwards from this place, to self.start
            print('!!!!!!!!!!!  after_reposition = %s' % currentString)
            for pos in range(self.limit - cSize, self.start, -1):
              if newString[pos] == u'|':
                self.start = pos
                newString = newString[0:pos] + newString[pos+1:]
                break
          else:
            print('!!!!!!!!!!!  NO reposition = %s' % currentString)
            self.start = self.limit - cSize + 1
          currentString = newString
          print('after reposition after reposition after reposition after reposition')
          break
        ruleIndex += 1

      # Rule loop complete
      if not foundRule:
        # Increment position since no rule matched
        self.start += 1

    print('OUTPUTPUTPUTPUTPUTPUT = %s' % currentString)
    return currentString


  def transliterate(self, instring, debug=None):
    # Apply each phase to the incoming string or string list.
    print('--------------- TRANSLITERATE type = %s. data = %s' % (type(instring), instring))
    # logging.info('--------------- TRANSLITERATE type = %s. data = %s' % (type(instring), instring))

    if type(instring) == list:
      # Repeat on each list item.
      print('****  calling with list item >%s<' % instring)
      return [self.transliterate(item, debug) for item in instring]
    print('---------------transliterate line 422 instring = %s' % instring)

    for phase_index in range(len(self.phaseList)):
      print('---------------transliterate line 425  phase %d = >%s<' % (phase_index, self.phaseList))
      print('---------------transliterate line 426  instring = >%s<' % (instring))
      outstring = 'NOT SET'
      try:
        outstring = self.applyPhase(phase_index, instring, debug)
      except:
        e = sys.exc_info()[0]
        logging.error('!! Calling applyPhase Error e = %s. outstring=%s' % (e, outstring))
      instring = outstring

    # ?? .decode('unicode-escape')
    print('****** outstring = %s' % outstring)
    return outstring

# Derived class that takes an XML file from CLDR and create a transliterator from it
class TranslitXML(Transliterate):
  def __init__(self, file_path):
    self.path = file_path
    self.tree = None
    self.root = None
    self.rules_text = None
    self.transforms = None
    self.openFile()
    self.parseXmlTree()

    super(TranslitXML, self).__init__(self.rules_text)

    return

  def openFile(self):
    self.tree = ET.parse(self.path)
    self.root = self.tree.getroot()
    return

  def parseXmlTree(self):
    if self.root:
      # Look for the rules and get into proper shape
      self.transforms = self.root.find('transforms')
      self.transform = self.transforms.find('transform')
      text = self.transform.find('tRule').text
      #text = text.encode('unicode-escape')
      in_str = text.encode('unicode-escape')  # bytes with all chars escaped (the original escapes have the backslash escaped)
      in_str = in_str.replace(b'\\\\u', b'\\u')  # unescape the \
      text = in_str.decode('unicode-escape')
    self.rules_text = text
      # self.rules_text = self.transform.find('tRule').text.decode( 'unicode-escape' )
    return

