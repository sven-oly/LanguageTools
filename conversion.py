# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function

import os
import re
import sys

# Provide text conversion to Unicode based on the encoding indicated.
def convertToUnicode(textIn, encoding):
  if not encoding:
    return textIn

  # TODO: add encoding conversion
  if encoding.strip() == 'Arjyaban':
    (textOut, missingCodes) = codePointConversion(textIn, 0)
    return (reorderUnicode(textOut), missingCodes)
  elif encoding.strip() == 'Sujoyan':
    (textOut, missingCodes) = codePointConversion(textIn, 1)
  elif encoding.strip() == 'Alaam':
    (textOut, missingCodes) = codePointConversion(textIn, 2)
    return (reorderUnicode(textOut), missingCodes)

  print ('Unknown encoding = >%s<' % encoding)
  return (textIn, [])


# Takes Unicode values and fixes ordering with a series of replacements.
def reorderUnicode(outtext):
  if not outtext:
    return outtext
  #print ('reorder >%s<' % outtext.encode('utf-8'))

  # Reorder Unicode points.
  # Vowel sign to right of consonants:
  ePattern = u"\uD804\uDD2c\uD804([\uDD03-\uDD26])"
  eReplace = u"\uD804\g<1>\uD804\uDD2c"
  newText = re.sub(ePattern, eReplace, outtext)
  if newText != outtext:
    print ('Moved vowel: %s --> %s' % (outtext, newText))

  # Move the eVowel over a virama.
  viramaEPattern = u"\ud804([\udd01\udd27-\udd34])\ud804\udd33\ud804([\uDD03-\uDD26])"
  viramaEReplace = u"\ud804\udd33\ud804\g<2>\ud804\g<1>"
  result = re.search(viramaEPattern, newText)
  oldText = newText
  while result:
    newText = re.sub(viramaEPattern, viramaEReplace, newText)
    print ('  Running eVowel over virama on %s -> %s ' % (oldText, newText))
    oldText = newText
    result = re.search(viramaEPattern, newText)

  dotPattern = u"\ud804([\udd41\udd42])\ud804\udd01"
  dotReplace = u"\ud804\udd01\ud804\g<1>"
  oldText = newText
  newText = re.sub(dotPattern, dotReplace, newText)
  if oldText != newText:
    print ('  Moved 41/42 %s to %s' % (oldText, newText))

  # Replace CHAKMA VOWEL SIGN O + CHAKMA VOWEL SIGN AI with
  #    CHAKMA VOWEL SIGN OI + CHAKMA O MARK
  oIPattern = u"\ud804\udd2e\ud804\udd2d"
  oIReplace = u"\ud804\udd30\ud804\udd31"
  oldText = newText
  newText = re.sub(oIPattern, oIReplace, newText)

  # Swap 2a and 2d
  uIPattern = u"\ud804\udd2a\ud804\udd2d"
  uIReplace = u"\ud804\udd2d\ud804\udd2a";
  oldText = newText
  newText = re.sub(uIPattern, uIReplace, newText);

  # Replace
  #
  iZPattern = u"\ud804\udd27\ud804\udd33\ud804\udd20"
  iZReplace = u"\ud804\udd33\ud804\udd20\ud804\udd27"
  oldText = newText
  newText = re.sub(iZPattern, iZReplace, newText)

  iGraveZPattern = u"\ud804\udd27\ud804\udd01\ud804\udd33\ud804\udd20"
  iGraveZReplace = u"\ud804\udd33\ud804\udd20\ud804\udd27\ud804\udd01"
  oldText = newText
  newText = re.sub(iGraveZPattern, iGraveZReplace, newText)

  deRPattern = u"\ud804\udd28\ud804\udd33\ud804\udd22"
  deRReplace = u"\ud804\udd33\ud804\udd22\ud804\udd28";
  oldText = newText
  newText = re.sub(deRPattern, deRReplace, newText)

  # Reorder with 11101.
  onePattern = u"\ud804\udd01\ud804([\udd28])"
  oneReplace = u"\ud804\g<1>\ud804\udd01";
  oldText = newText
  newText = re.sub(onePattern, oneReplace, newText)

  # Fix some modifiers after a space, newline or left parent.
  spaceModPattern = u"([\u000a\u0020]|\u0020\u0040)\ud804([\udd00\udd27-\udd34])"
  spaceModReplace = u"\ud804\g<2>\g<1>";
  oldText = newText
  newText = re.sub(spaceModPattern, spaceModReplace, newText)

  # Fix some virama followed by space or new line.
  viramaSpacePattern = u"\ud804\udd33([\u000a\u0020])\ud804([\udd05])"
  viramaSpaceReplace = u"\ud804\udd33\ud804\g<2>\g<1>";
  oldText = newText
  newText = re.sub(viramaSpacePattern, viramaSpaceReplace, newText)

  # Space modifier space
  spaceModSpacePattern = u"\u0020\ud804([\udd00])\u0020"
  spaceModSpaceReplace = u"\ud804\g<1>\u0020";
  oldText = newText
  newText = re.sub(spaceModSpacePattern, spaceModSpaceReplace, newText)

  # Virama pattern after space.
  spaceModSpacePattern = u"\u0020\ud804\udd33\ud804([\uDD03-\uDD26])"
  spaceModSpaceReplace = u"\ud804\udd33\ud804\g<1>\u0020";
  oldText = newText
  newText = re.sub(spaceModSpacePattern, spaceModSpaceReplace, newText)

  # Diacritics 131 before 130 space.
  diacriticModPattern = u"\ud804\udd31\ud804\udd30";
  diacriticModReplace = u"\ud804\udd30\ud804\udd31"
  oldText = newText
  newText = re.sub(diacriticModPattern, diacriticModReplace, newText)

  # TODO: Make sure these rules all work.
  # TODO: figure out the Unicode order rules for Chakma characters

  return newText


# First, the replacements
encodingToUnicode = {
    u'\u0000': [u'\u0020', u'\u0000'],  # null
    u'\u0009': [u'\u0009', u'\u0009'],  # horizontal tab
    u'\u000D': [u'\u000D', u'\u0000'],  # Carriage return
    u'\u0020': [' ', ' '],  # Space
    u'\u0023': [u'\uD804\uDD42', u'\u003b'],  # #
    u'\u0024': [u'\uD804\uDD41', ' '],  # $
    u'\u0025': [u'\u0025', u'\u0025'],  # %
    u'\u0026': [u'\uD804\uDD00', u'\u0026'],  # &
    u'\u0027': [u'\u0027', u'\u0027'],  # &
    u'\u002a': [u'\uD804\uDD33\uD804\uDD23', u'\u0000'],  # *
    u'\u002b': ['+', '+'],  # +
    u'\u002c': [',', ','],  # ,
    u'\u002e': ['.', '.'],  # .
    u'\u0030': [u'\uD804\uDD36', u'\uD804\uDD36'],  # 0
    u'\u0031': [u'\uD804\uDD37', u'\uD804\uDD37'],  # 1
    u'\u0032': [u'\uD804\uDD38', u'\uD804\uDD38'],  # 2
    u'\u0033': [u'\uD804\uDD39', u'\uD804\uDD39'],  # 3
    u'\u0034': [u'\uD804\uDD3a', u'\uD804\uDD3a'],  # 4
    u'\u0035': [u'\uD804\uDD3b', u'\uD804\uDD3b'],  # 5
    u'\u0036': [u'\uD804\uDD3c', u'\uD804\uDD3c'],  # 6
    u'\u0037': [u'\uD804\uDD3d', u'\uD804\uDD3d'],  # 7
    u'\u0038': [u'\uD804\uDD3e', u'\uD804\uDD3e'],  # 8
    u'\u0039': [u'\uD804\uDD3f', u'\uD804\uDD3f'],  # 9
    u'\u003a': [u'\u003a', u'\u003a'],  # colon
    u'\u003b': [u'\u003b', u'\ud804\udd1f'],  # semicolon
    u'\u003c': [u'\u003c', u'\ud804\udd13'],  # <
    u'\u003d': [u'\u003d', u'\u003d'],  # =
    u'\u003e': [u'\u003e', u'\ud804\udd12'],  # >
    u'\u003f': [u'\u003f', u'\u003f'],  # ?
    u'\u0040': [u'\uD804\uDD04', '-'],  # @
    u'\u0041': [u'\ud804\udd06', u'\ud804\udd33\ud804\udd05'],  # A
    u'\u0042': [u'\uD804\uDD33\uD804\uDD23', u'\uD804\uDD41'],  # B
    u'\u0043': [u'\uD804\uDD0d', u'\uD804\uDD33\uD804\uDD05'],  # C
    u'\u0044': [u'\uD804\uDD19', u'\uD804\uDD2c'],  # D
    u'\u0045': [u'\uD804\uDD29', u'\uD804\uDD2a'],  # E
    u'\u0046': [u'\ud804\udd03', u'\ud804\udd00'],  # F
    u'\u0047': [u'\ud804\udd0a', u'\ud804\udd01\ud804\udd28'],  # G
    u'\u0048': [u'\uD804\uDD33\ud804\udd26', u'\uD804\uDD33\ud804\udd26'],  # H
    u'\u0049': [u'\uD804\uDD2d', u'\uD804\uDD27'],  # I
    u'\u004a': [u'\ud804\udd0f', u'\ud804\udd33\uD804\uDD20'],  # J
    u'\u004b': [u'\ud804\udd08', u'\ud804\udd33\ud804\udd1a'],  # K
    u'\u004c': [u'\ud804\udd26\ud804\udd33\ud804\udd23', u'\ud804\udd33\ud804\udd22\ud804\udd2a'],  # L
    u'\u004d': [u'\uD804\uDD34', u'\uD804\uDD24'],  # M
    u'\u004e': [u'\uD804\uDD15', u'\uD804\uDD33\ud804\udd26\ud804\udd2a'],  #N
    u'\u004f': [u'\uD804\uDD27\uD804\uDD32', u'\uD804\uDD28'],  # O
    u'\u0050': [u'\uD804\uDD04', u'\uD804\uDD2d'],  #P
    u'\u0051': [u'\uD804\uDD12', u'\uD804\uDD33\uD804\uDD03'],  #Q
    u'\u0052': [u'\ud804\udd33\ud804\udd22', u'\ud804\udd33\ud804\udd04'],  # R
    u'\u0053': [u'\uD804\uDD05', u'\uD804\uDD01'],  # S
    u'\u0054': [u'\uD804\uDD17', u'\uD804\uDD26'],  #T
    u'\u0055': [u'\uD804\uDD2b', u'\uD804\uDD34'],  # U
    u'\u0056': [u'\uD804\uDD0b', u'\ud804\udd33\uD804\uDD20'],  # V
    u'\u0057': [u'\uD804\uDD31', u'\uD804\uDD31'],  #W
    u'\u0058': [u'\uD804\uDD14', u'\uD804\uDd2c'],  # X
    u'\u0059': [u'\uD804\uDD10', u'\uD804\uDD33\uD804\uDD06'],  #Y
    u'\u005a': [u'\ud804\udd33\ud804\udd20', u'\ud804\udd05'],  # Z
    u'\u005b': ['[', '['],  # [
    u'\u005c': [u'\ud804\udd1d\ud804\udd33\ud804\udd1d\ud804\udd33\ud804\udd1d', u'\u005c'],  # backslash
    u'\u005d': [u'\u005d', u'\u005d'],  # ]
    u'\u005e': [u'\uD804\uDD33\uD804\uDD1a', u'\uD804\uDD26'],  # ^
    u'\u005f': [u'\uD804\uDD34', u'\uD804\uDD34'],  # _
    u'\u0060': [u'\uD804\uDD01', '\`'],  # `
    u'\u0061': [u'\uD804\uDD2c', u'\uD804\uDD07'],  # a
    u'\u0062': [u'\uD804\uDD1d', u'\uD804\uDD25'],  # b
    u'\u0063': [u'\uD804\uDD0c', u'\uD804\uDD0d'],  # c
    u'\u0064': [u'\uD804\uDD18', u'\uD804\uDD1e'],  # d
    u'\u0065': [u'\uD804\uDD28', u'\uD804\uDD1b'],  # e
    u'\u0066': [u'\uD804\uDD1c', u'\uD804\uDD0b'],  # f
    u'\u0067': [u'\uD804\uDD09', u'\uD804\uDD1a'],  # g
    u'\u0068': [u'\uD804\uDD26', u'\uD804\uDD22'],  # h
    u'\u0069': [u'\uD804\uDD27', u'\uD804\uDD1c'],  # i
    u'\u006a': [u'\uD804\uDD0e', u'\uD804\uDD1d'],  # j
    u'\u006b': [u'\uD804\uDD07', u'\uD804\uDD0c'],  # k
    u'\u006c': [u'\uD804\uDD23', u'\uD804\uDD26\uD804\uDD33\uD804\uDD23'],  # l
    u'\u006d': [u'\uD804\uDD1f', u'\uD804\uDD0a'],  # m
    u'\u006e': [u'\uD804\uDD1a', u'\uD804\uDD20'],  # n
    u'\u006f': [u'\uD804\uDD2e', u'\uD804\uDD16'],  # o
    u'\u0070': [u'\uD804\uDD1b', u'\uD804\uDD08'],  # p
    u'\u0071': [u'\uD804\uDD11', u'\uD804\uDD03'],  # q
    u'\u0072': [u'\uD804\uDD22', u'\uD804\uDD09'],  # r
    u'\u0073': [u'\uD804\uDD25', u'\uD804\uDD0e'],  # s
    u'\u0074': [u'\uD804\uDD16', u'\uD804\uDD23'],  # t
    u'\u0075': [u'\uD804\uDD2a', u'\uD804\uDD18'],  # u
    u'\u0076': [u'\uD804\uDD1e', u'\uD804\uDD17'],  # v
    u'\u0077': [u'\uD804\uDD24', u'\uD804\uDD19'],  # w
    u'\u0078': [u'\uD804\uDD13', u'\uD804\uDD11'],  # x
    u'\u0079': [u'\uD804\uDD20', u'\uD804\uDD0f'],  # y
    u'\u007a': [u'\uD804\uDD21', u'\uD804\uDD14'],  # z
    u'\u007c': [u'\uD804\uDD33\ud804\udd03', '|'],  # |
    u'\u007e': [u'\uD804\uDD02', '~'],  # ~
    u'\u00a3': ['\0000', u'\ud804\udd32'],  # registered TM symbol
    u'\u00ae': ['\0000', u'\ud804\udd29'],  # registered Circle
    u'\u00b4': ['', u'\uD804\uDD34'],  # accute accent ? Should this be under?
    u'\u00b5': ['', u'\uD804\udd33\uD804\udd16'],  # micro sign
    u'\u00c5': ['', u'\uD804\udd10'],  # A with ring
    u'\u00c7': ['', u'\uD804\udd15'],  # C cedilla
    u'\u00df': ['', u'\uD804\udd2b'],  #

    u'\u00e1': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd07'],
    u'\u00e2': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd1c'],
    u'\u00e3': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd1f'],
    u'\u00e4': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd16'],
    u'\u00e5': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd17'],
    u'\u00e8': ['', u'\uD804\udd02\uD804\udd28'],  # A with ring
    u'\u00e9': ['', ' '],
    u'\u00ea': ['', u'\uD804\udd06'],
    u'\u00eb': ['', u'\uD804\udd06\uD804\udd33\uD804\udd06'],
    u'\u00ec': ['', u'\uD804\udd07\ud804\udd33\uD804\udd08'],
    u'\u00ed': ['', u'\uD804\udd07\ud804\udd33\uD804\udd07'],
    u'\u00ee': ['', u'\uD804\udd07\ud804\udd33\uD804\udd0c'],
    u'\u00ef': ['', u'\uD804\udd07\ud804\udd33\uD804\udd0d'],

    u'\u00f0': ['', ' '],
    u'\u00f1': ['', u'\uD804\udd07\ud804\udd33\uD804\udd0e'],
    u'\u00f2': ['', u'\uD804\udd07\ud804\udd33\uD804\udd12'],
    u'\u00f3': ['', u'\uD804\udd07\ud804\udd33\uD804\udd0f'],
    u'\u00f4': ['', u'\uD804\udd07\ud804\udd33\uD804\udd16'],
    u'\u00f5': ['', u'\uD804\udd07\ud804\udd33\uD804\udd23'],
    u'\u00f6': ['', u'\uD804\udd07\ud804\udd33\uD804\udd17'],
    u'\u00f7': ['', ' '],
    u'\u00f8': ['', ' '],
    u'\u00f9': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd0c'],
    u'\u00fa': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd25'],
    u'\u00fb': ['', u'\uD804\udd16\ud804\udd33\uD804\udd16'],
    u'\u00fc': ['', u'\uD804\udd1b\ud804\udd33\uD804\udd1b'],
    u'\u00fd': ['', ' '],
    u'\u00fe': ['', ' '],
    u'\u00ff': ['', u'\uD804\udd20'],

    u'\u2022': [u'\u0000', u'\uD804\uDD32'], # |
    u'\u2122': [u'\u0000', u'\uD804\uDD33\ud804\udd26\ud804\udd31'], # |
    u'\u2202': [u'\u0000', u'\ud804\udd33\ud804\udd0c'],
    u'\u2260': [u'\u0000', u'\u25cc'], # ≠ --> "dotted circle"
}

# Perform single code point conversions.
def codePointConversion(textIn, encodeIndex):
  missingLookups = []
  outText = u''
  for t in textIn:
    if t in encodingToUnicode:
      c = encodingToUnicode[t][encodeIndex]
      outText += c
    else:
      if t not in missingLookups:
        missingLookups.append(t)
      # print  ('character %s not found' % t.encode('utf-8'))
      outText += t

  # print ('OUTPUT = %s' % outText.encode('utf-8'))
  return (outText, missingLookups)
