# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function

import os
import re
import sys

# Adlam conversion from Arabic characters.

# Offset to lowercase.
lowercaseOffset = 0x22

# Provide text conversion to Unicode based on the encoding indicated.
def convertToUnicode(textIn, encoding):
  if not encoding:
    return textIn

  # TODO: add encoding conversion
  if encoding.strip() == 'Aissata':
    (textOut, missingCodes) = codePointConversion(textIn)
    return (reorderUnicode(textOut), missingCodes)
  if encoding.strip() == 'Pulaar':
    (textOut, missingCodes) = codePointConversion(textIn)
    return (reorderUnicode(textOut), missingCodes)

  print ('Unknown encoding = >%s<' % encoding)
  return (textIn, [])


# Takes Unicode values and fixes ordering with a series of replacements.
def reorderUnicode(outtext):
  if not outtext:
    return outtext
  #print ('reorder >%s<' % outtext.encode('utf-8'))

  # Reorder Unicode points.
  # Fill in as needed
  return outtext


# First, the replacements

encodingToUnicode = {
    u'\u0628': unichr(0xd83a)+unichr(0xdd00),
    u'\u062a': unichr(0xd83a)+unichr(0xdd01),
    u'\u062b': unichr(0xd83a)+unichr(0xdd02),
    u'\u062c': unichr(0xd83a)+unichr(0xdd03),
    u'\u062d': unichr(0xd83a)+unichr(0xdd04),
    u'\u062e': unichr(0xd83a)+unichr(0xdd05),
    u'\u0633': unichr(0xd83a)+unichr(0xdd06),
    u'\u0634': unichr(0xd83a)+unichr(0xdd07),
    u'\u0635': unichr(0xd83a)+unichr(0xdd08),
    u'\u0636': unichr(0xd83a)+unichr(0xdd09),
    u'\u0637': unichr(0xd83a)+unichr(0xdd0a),
    u'\u0638': unichr(0xd83a)+unichr(0xdd0b),
    u'\u0639': unichr(0xd83a)+unichr(0xdd0c),
    u'\u063a': unichr(0xd83a)+unichr(0xdd0d),
    u'\u0641': unichr(0xd83a)+unichr(0xdd0e),
    u'\u0642': unichr(0xd83a)+unichr(0xdd0f),
    u'\u0643': unichr(0xd83a)+unichr(0xdd10),
    u'\u0644': unichr(0xd83a)+unichr(0xdd11),
    u'\u0645': unichr(0xd83a)+unichr(0xdd12),
    u'\u0646': unichr(0xd83a)+unichr(0xdd13),
    u'\u064a': unichr(0xd83a)+unichr(0xdd14),
    u'\u067b': unichr(0xd83a)+unichr(0xdd15),
    u'\u067e': unichr(0xd83a)+unichr(0xdd16),
    u'\u0683': unichr(0xd83a)+unichr(0xdd17),
    u'\u0684': unichr(0xd83a)+unichr(0xdd18),  # ??
    u'\u0686': unichr(0xd83a)+unichr(0xdd19),
    u'\u0687': unichr(0xd83a)+unichr(0xdd1a),
    u'\u06a8': unichr(0xd83a)+unichr(0xdd1b),
    u'\u06af': unichr(0xd83a)+unichr(0xdd04),

  # Diacritics
    u'\u0640': unichr(0xd83a)+unichr(0xdd46),  # ?? Maybe underscore?
    u'\u064b': unichr(0xd83a)+unichr(0xdd4a),
    u'\u064c': unichr(0xd83a)+unichr(0xdd46),
    u'\u064d': unichr(0xd83a)+unichr(0xdd45),
    u'\u064e': unichr(0xd83a)+unichr(0xdd44),
    u'\u064f': unichr(0x0027),  # TBD: maybe Farsi apostrophe joiner
    u'\u0650': unichr(0xd83a)+unichr(0xdd48),
    u'\u0651': unichr(0xd83a)+unichr(0xdd47),
    u'\u0655': unichr(0xd83a)+unichr(0xdd00),  # TBD
    u'\u0658': unichr(0xd83a)+unichr(0xdd00),  # TBD
    u'\u0659': unichr(0xd83a)+unichr(0xdd00),  # TBD
    u'\u065d': unichr(0xd83a)+unichr(0xdd44),
    u'\u065e': unichr(0xd83a)+unichr(0xdd44),
    u'\u06b3': unichr(0xd83a)+unichr(0xdd45),

  # Digits
    u'\u0660': unichr(0xd83a)+unichr(0xdd50),
    u'\u0661': unichr(0xd83a)+unichr(0xdd51),
    u'\u0662': unichr(0xd83a)+unichr(0xdd52),
    u'\u0663': unichr(0xd83a)+unichr(0xdd53),
    u'\u0664': unichr(0xd83a)+unichr(0xdd54),
    u'\u0665': unichr(0xd83a)+unichr(0xdd55),
    u'\u0666': unichr(0xd83a)+unichr(0xdd56),
    u'\u0667': unichr(0xd83a)+unichr(0xdd57),
    u'\u0668': unichr(0xd83a)+unichr(0xdd58),
    u'\u0669': unichr(0xd83a)+unichr(0xdd59),

  # Punctuation
    u'\u0601': unichr(0xd83a)+unichr(0xdd5e),  # Question mark
    u'\u060c': ',',  # u'\u060c',  # ????
    u'\u060b': ';',

  # Other characters from books
    u'\u00c0': u'\u0027',  # Simple apostrophe
    u'\u00c3': u'\u2022',
    u'\u00ed': u'\u0027',
    u'\u00f8': unichr(0xd83a)+unichr(0xdd05),
    u'\u00f9': u'\u2022',
    u'\u0153': unichr(0xd83a)+unichr(0xdd09),
    u'\u0178': unichr(0xd83a)+unichr(0xdd14),
    u'\u0192': unichr(0xd83a)+unichr(0xdd00),
    u'\u0301': u'\u0027',
    u'\u03c0': unichr(0xd83a)+unichr(0xdd14),
    u'\u0394': unichr(0xd83a)+unichr(0xdd01),
    #u'\u201d': unichr(0xd83a)+unichr(0xdd03),
    u'\u2126': unichr(0xd83a)+unichr(0xdd0b),
    u'\u2211': unichr(0xd83a)+unichr(0xdd09),
    u'\u2248': unichr(0xd83a)+unichr(0xdd0a),
    u'\ufefe': unichr(0xd83a)+unichr(0xdd44),
}

encodingToUnicodeLower = {
    u'\u0628': unichr(0xd83a)+unichr(0xdd00+lowercaseOffset),
    u'\u062a': unichr(0xd83a)+unichr(0xdd01+lowercaseOffset),
    u'\u062b': unichr(0xd83a)+unichr(0xdd02+lowercaseOffset),
    u'\u062c': unichr(0xd83a)+unichr(0xdd03+lowercaseOffset),
    u'\u062d': unichr(0xd83a)+unichr(0xdd04+lowercaseOffset),
    u'\u062e': unichr(0xd83a)+unichr(0xdd05+lowercaseOffset),
    u'\u0633': unichr(0xd83a)+unichr(0xdd06+lowercaseOffset),
    u'\u0634': unichr(0xd83a)+unichr(0xdd07+lowercaseOffset),
    u'\u0635': unichr(0xd83a)+unichr(0xdd08+lowercaseOffset),
    u'\u0636': unichr(0xd83a)+unichr(0xdd09+lowercaseOffset),
    u'\u0637': unichr(0xd83a)+unichr(0xdd0a+lowercaseOffset),
    u'\u0638': unichr(0xd83a)+unichr(0xdd0b+lowercaseOffset),
    u'\u0639': unichr(0xd83a)+unichr(0xdd0c+lowercaseOffset),
    u'\u063a': unichr(0xd83a)+unichr(0xdd0d+lowercaseOffset),
    u'\u0641': unichr(0xd83a)+unichr(0xdd0e+lowercaseOffset),
    u'\u0642': unichr(0xd83a)+unichr(0xdd0f+lowercaseOffset),
    u'\u0643': unichr(0xd83a)+unichr(0xdd10+lowercaseOffset),
    u'\u0644': unichr(0xd83a)+unichr(0xdd11+lowercaseOffset),
    u'\u0645': unichr(0xd83a)+unichr(0xdd12+lowercaseOffset),
    u'\u0646': unichr(0xd83a)+unichr(0xdd13+lowercaseOffset),
    u'\u064a': unichr(0xd83a)+unichr(0xdd14+lowercaseOffset),
    u'\u067b': unichr(0xd83a)+unichr(0xdd15+lowercaseOffset),
    u'\u067e': unichr(0xd83a)+unichr(0xdd16+lowercaseOffset),
    u'\u0683': unichr(0xd83a)+unichr(0xdd17+lowercaseOffset),
    u'\u0684': unichr(0xd83a)+unichr(0xdd18+lowercaseOffset),  # ??
    u'\u0686': unichr(0xd83a)+unichr(0xdd19+lowercaseOffset),
    u'\u0687': unichr(0xd83a)+unichr(0xdd1a+lowercaseOffset),
    u'\u06a8': unichr(0xd83a)+unichr(0xdd1b+lowercaseOffset),
    u'\u06af': unichr(0xd83a)+unichr(0xdd04+lowercaseOffset),

  # Diacritics
    u'\u0640': unichr(0xd83a)+unichr(0xdd46),  # ?? Maybe underscore?
    u'\u064b': unichr(0xd83a)+unichr(0xdd4a),
    u'\u064c': unichr(0xd83a)+unichr(0xdd46),
    u'\u064d': unichr(0xd83a)+unichr(0xdd45),
    u'\u064e': unichr(0xd83a)+unichr(0xdd44),
    u'\u064f': unichr(0x0027),  # TBD: maybe Farsi apostrophe joiner
    u'\u0650': unichr(0xd83a)+unichr(0xdd48),
    u'\u0651': unichr(0xd83a)+unichr(0xdd47),
    u'\u0655': unichr(0xd83a)+unichr(0xdd00),  # TBD
    u'\u0658': unichr(0xd83a)+unichr(0xdd00),  # TBD
    u'\u0659': unichr(0xd83a)+unichr(0xdd00),  # TBD
    u'\u065d': unichr(0xd83a)+unichr(0xdd44),
    u'\u065e': unichr(0xd83a)+unichr(0xdd44),
    u'\u06b3': unichr(0xd83a)+unichr(0xdd45),

  # Digits
    u'\u0660': unichr(0xd83a)+unichr(0xdd50),
    u'\u0661': unichr(0xd83a)+unichr(0xdd51),
    u'\u0662': unichr(0xd83a)+unichr(0xdd52),
    u'\u0663': unichr(0xd83a)+unichr(0xdd53),
    u'\u0664': unichr(0xd83a)+unichr(0xdd54),
    u'\u0665': unichr(0xd83a)+unichr(0xdd55),
    u'\u0666': unichr(0xd83a)+unichr(0xdd56),
    u'\u0667': unichr(0xd83a)+unichr(0xdd57),
    u'\u0668': unichr(0xd83a)+unichr(0xdd58),
    u'\u0669': unichr(0xd83a)+unichr(0xdd59),

  # Punctuation
    u'\u0601': unichr(0xd83a)+unichr(0xdd5e),  # Question mark
    u'\u060c': u'\u060c',
    u'\u060b': ';',

  # Other characters from books
    u'\u00c0': u'\u0027',  # Simple apostrophe
    u'\u00c3': u'\u2022',
    u'\u00ed': u'\u0027',
    u'\u00f8': unichr(0xd83a)+unichr(0xdd05+lowercaseOffset),
    u'\u00f9': u'\u2022',
    u'\u0153': unichr(0xd83a)+unichr(0xdd09+lowercaseOffset),
    u'\u0178': unichr(0xd83a)+unichr(0xdd14+lowercaseOffset),
    u'\u0192': unichr(0xd83a)+unichr(0xdd00+lowercaseOffset),
    u'\u0301': u'\u0027',
    u'\u03c0': unichr(0xd83a)+unichr(0xdd14+lowercaseOffset),
    u'\u0394': unichr(0xd83a)+unichr(0xdd01+lowercaseOffset),
    #u'\u201d': unichr(0xd83a)+unichr(0xdd03+lowercaseOffset),
    u'\u2126': unichr(0xd83a)+unichr(0xdd0b+lowercaseOffset),
    u'\u2211': unichr(0xd83a)+unichr(0xdd09+lowercaseOffset),
    u'\u2248': unichr(0xd83a)+unichr(0xdd0a+lowercaseOffset),
    u'\ufefe': unichr(0xd83a)+unichr(0xdd44),
}

def convertToLower(outText):
  print ('TOLOWER: %s' % outText.encode('utf-8'))


# Perform single code point conversions.
def codePointConversion(textIn, lower=False):

  lower=True
  missingLookups = []
  outText = u''
  debug = True
  charMap = encodingToUnicode
  if lower:
    charMap = encodingToUnicodeLower

  for t in textIn:
    if t in charMap:
      c = charMap[t]
      outText += c
    else:
      if t not in missingLookups:
        missingLookups.append(t)
      # print  ('character %s not found' % t.encode('utf-8'))
      outText += t

  if lower:
    convertToLower(outText)

  if debug:
    print ('OUTPUT = %s' % outText.encode('utf-8'))

  return (outText, missingLookups)


def testConvertArabic():
  intext = u"غضكڄبث"
  expected = u'"‮𞤍𞤉𞤐𞤘𞤀𞤂 𐓏𐒷𐓈𐓂̄𐓄𐒰"'

  result = codePointConversion(intext)
  print('TEST      in = %s' % intext.encode("utf-8"))
  print('TEST      out = %s' % result[0].encode("utf-8"))
  print('TEST      missing lookups = %s' % result[1])


def main():

  for t in encodingToUnicode:
    print (t, encodingToUnicode[t])

  testConvertArabic()



if __name__ == '__main__':
    main()
