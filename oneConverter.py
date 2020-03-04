#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Convert from old font-encoding Oneida font to Unicode forms:

from __future__ import print_function
import codecs
import re
import sys

debug = True

private_use_map = {
  '@': u'\u00e1',
  '#': u'\u00e9',
  '$': u'\u00ed',
  '%': u'\u00f3',
  '^': u'\u0283\u0300',
  '&': u'\u00fa',
  '<': u'\u0242',
  '>': u'\u028c',
}


def eReplaceFunc(matchobj):
  # ePattern = u'\ud804\udd2c([\ud804\udd07-\ud804\udd26])'
  eReplace = u'\ud804\udd2c'
  print('Match in eReplaceFunc: %s' % matchobj.group(0))
  print('  %s, %s' % (matchobj.start(0), matchobj.end(0)))
  return matchobj.group(0)[matchobj.start(0)+1:matchobj.end(0)-1] + eReplace


def viramaEReplaceFunc(matchobj):
  print('Match in viramaFunc: %s' % matchobj)
  viramaEPattern = u'\ud804\udd2c\ud804\udd33([\ud804\udd07-\ud804\udd26])'
  viramaEReplace = u'\ud804\udd33$1\ud804\udd12c'
  return matchobj


def dotReplaceFunc(matchobj):
  print('Match in dotReplaceFunc: %s' % matchobj)
  dotPattern = u'([\ud804\udd41\ud804\udd42])\ud804\udd01'
  return matchobj


def convertEncodingToUnicode(intext):
  outtext = u''
  for c in intext:
    if c in private_use_map:
      out = private_use_map[c]
    else:
      out = c

    outtext += out

  if debug:
    print('      %s' % (outtext))

  # Move some code points in context.
  # Vowel sign to right of consonants:
  ePattern = u'\ud804\udd2c\ud804([\udd07-\udd26])'

  newText = re.sub(ePattern, eReplaceFunc, outtext, count = 10)
  print(' After eVowel: %s' % newText)

  # Move the eVowel over a virama.
  viramaEPattern = u'\ud804\udd2c\ud804\udd33\ud804([udd07-\udd26])'
  viramaEReplace = u'\ud804\udd33$1\ud804\udd12c'
  newText = re.sub(viramaEPattern, viramaEReplaceFunc, newText)

  dotPattern = u'\ud804([\udd41-\udd42])\ud804\udd01'
  newText = re.sub(dotPattern, dotReplaceFunc, newText)

  if debug:
    print('      %s' % (newText))

  return newText


def convertFileLines(inname, outname):
  f_in = open(inname, 'r')
  f_out = codecs.open(outname, 'w', 'utf-8')

  convertedCount = 0
  totalLines = 0
  for inline in f_in:
    if debug:
      print('%4d: %s' % (totalLines, inline))
    totalLines += 1
    outline = convertEncodingToUnicode(inline)
    if inline != outline:
      convertedCount += 1
    f_out.write(outline)

  f_in.close()
  f_out.close()
  return (convertedCount, totalLines)

def main(argv=None):
  # TODO: Read file and apply conversion.

  if len(argv) <= 1:
    print('Please provide file name to convert.')

  infilename = argv[1]
  outfilename = infilename + '.unicode'

  result = convertFileLines(infilename, outfilename)

  print('%d lines converted out of %s' % (result[0], result[1]))

if __name__ == "__main__":
    print('ARGS = %s' % sys.argv) 
    sys.exit(main(sys.argv))
