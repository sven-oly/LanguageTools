#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import re
import sys
import types

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
  def __init__(self, pattern, substitution, id=0):
    if debug_output:
      print(' Rule: %s --> %s' % (pattern.encode('utf-8'),
                                  substitution.encode('utf-8')))
    self.id = id
    self.pattern = pattern
    self.re_pattern = re.compile(pattern, re.UNICODE)
    self.subst = substitution
    #? Store info on repositioning cursor


class Phase():
  # one phase of the transliteration spec
  def __init__(self, id=0):
    self.rules = []     # Old tuples
    self.RuleList = []  # Rule objects
    self.phase_id = id

  def fillRules(self, rulelist):
    global debug_output

    # set up pattern and subst value for each rule
    index = 0
    if debug_output:
      print('%d rules in rulelist, phase %d' % (len(rulelist), self.phase_id))
    for rule1 in rulelist:
      rule1 = rule1.strip()
      rule = re.sub('\n', '', rule1)
      if rule:
        parts = rule.split('>')
        pattern = re.sub(' ', '', parts[0]) # but don't remove quoted space
        # print '  rule %d is %s parts' % (index, parts)
        try:
          subst = re.sub(' ', '', uStringsFixPlaceholder(parts[1]))
          #subst = re.sub(' ', '', uStringsToText(parts[1]))
          newPair = (pattern, subst)
          self.rules.append(newPair)
          if debug_output and False:
            print(' ** Rule1 = %s' % rule.encode('utf-8'))
            print(' appending to RuleList: #%d %s --> %s' %
                  (index, pattern.encode('utf-8'), subst.encode('utf-8')))
          self.RuleList.append(Rule(pattern, subst, index))  # Rule objects
        except IndexError as e:
          print ('Error e = %s. Phase %s, %d rule = %s' % (e, self.phase_id, index, rule1))
          print ('  Rule = >>%s<< %d' % (rule, len(rule)))
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
    for key, value in shortcuts.iteritems():
        key = re.sub('\$', '\$', key)
        sublist = re.sub(key, value, newlist)
        newlist = sublist
    return newlist


def splitPhases(ruleString):
    phases = ruleString.split('::Null;')
    return phases

def uStringsFixPlaceholder(string):
    return re.sub(u'\$(\d)', subBackSlash, string) # Fix the replacement patterns

def uStringsToText(string):
    pattern = '\\\u[0-9A-Fa-f]{4}'
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

    self.description = description
    # Convert Unicode escapes to characters
    self.raw_rules = raw_rules  #.decode('unicode-escape')

    (self.shortcuts, self.reduced) = extractShortcuts(self.raw_rules)
    # Expand short cuts.
    self.expanded = expandShortcuts(self.shortcuts, self.reduced)

    self.phaseStrings = splitPhases(self.expanded)

    if debug_output:
      print('phase strings = %s' % self.phaseStrings)
      print('-------------------------------------\n')

    # Create the phase objects
    self.phaseList = []
    index = 0
    for phase in self.phaseStrings:
      self.phaseList.append(Phase(index))
      self.phaseList[index].fillRules(phase.split(';'))
      index += 1

    # Range of current string, for passing information to substFunction.
    self.start = 0
    self.limit = 0

    if debug_output:
      for phase in self.phaseList:
        print('Phase %s' % phase)
        for rule in phase.RuleList:
          print('  rule %s: %s (%s) --> %s' % (
              rule.id, rule.pattern.encode('utf-8'), len(rule.pattern),
              rule.subst.encode('utf-8')))


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
      'shortcuts': len(self.shortcuts),
      'reduced': len(self.reduced),
      'phaseStrings': self.phaseStrings,
      'phaseList': len(self.phaseList)
    }
    return result

  def substFunction(matchObj):
    return 'UNFINISHED'

  def applyPhase(self, index, instring,  debug):
    if debug:
      print('Applying phase %d to %s' % (index, instring.encode('utf-8')))
      print('  instring = %s' % uStringToHex(instring))
      print(' DEBUG LEVEL = %s' % debug)

    # It should do:
    #  a. Find rule that matches from the start
    #  b. if a match, substitute text and move start as required
    # until start >= limit

    # For each rule, apply to instring.
    self.start = 0
    self.limit = len(instring) - 1
    ruleList = self.phaseList[index].RuleList

    currentString = instring
    if debug:
      print(' Phase %d has %d rules' % (index, len(ruleList)))
      print ('  start, limit = %3d %3d' % (self.start, self.limit))
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

        try:
          # look at the current position.
          matchObj = re_pattern.match(currentString[self.start:])
          # matchObj = re.match(rule.pattern, currentString[self.start:])
        except TypeError as e:
          print('***** TypeError EXCEPTION %s in phase %s, rule %s: %s -> %s' % (e,
            index, ruleIndex, uStringToHex(rule.pattern), uStringToHex(rule.subst))
                )
        except:
          e = sys.exc_info()[0]
          print ('***** EXCEPTION %s in phase %s, rule %s: %s -> %s'
                 (e,
                  index, ruleIndex, uStringToHex(rule.pattern),
                  uStringToHex(rule.subst))
                 )

        if matchObj:
          # Do just one substitution!
          foundRule = ruleIndex
          if debug:
            print (' Matched rule %s. abs start = %d, rel start = %d, end = %d' % (rule.id,
                                                                                   self.start, matchObj.start(0),
                                                                                   matchObj.end(0)))
          # Size of last part of old string after the replacement
          cSize = len(currentString) - matchObj.end(0) - self.start  # Last part of old string not matched
          if debug and debug > 1:
            print (' Rule %d: >%s<  Matched sequence = >%s<' % (rule.id, rule.pattern.encode('utf-8'),
                                                                matchObj.string[
                                                                matchObj.start(0):matchObj.end(0)].encode('utf-8')))
          substitution = rule.subst

          if debug and debug > 1:
            old_stuff = matchObj.string[matchObj.start(0):matchObj.end(0)]
            print ('  replacing >%s< (%d) with %s' % (
              uStringToHex(old_stuff), len(old_stuff),
              uStringToHex(substitution)))
          if debug >= 2:
            print ('  before: %s' % uStringToHex(currentString))

          outstring = re.sub(rule.pattern, substitution, currentString[self.start:], 1)
          # Try to advance start.
          newString = currentString[0:self.start] + outstring
          if debug >= 2:
            print ('  after:  %s' % uStringToHex(newString))
          self.limit = len(newString) - 1
          # Figure out the new start and limit.

          self.start = self.limit - cSize + 1
          currentString = newString

        ruleIndex += 1

      # Rule loop complete
      if not foundRule:
        # Increment position since no rule matched
        self.start += 1

    return currentString


  def transliterate(self, instring, debug=None):
    # Apply each phase to the incoming string or string list.

    if type(instring) == types.ListType:
      # Recursive on each list item.
      return [self.transliterate(item, debug) for item in instring]

    if type(instring) != types.StringType and type(instring) != types.UnicodeType:
      return 'Error: type = %s. String or Unicode required' % type(instring)

    for phaseIndex in range(len(self.phaseList)):
      outstring = self.applyPhase(phaseIndex, instring, debug)
      instring = outstring

    # ?? .decode('unicode-escape')
    return outstring
