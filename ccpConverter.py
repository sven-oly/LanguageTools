#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Convert from old font-encoding Anangu/Yolngu text to Unicode forms:

import codecs
import re
import sys

debug = True

private_use_map = {
    u'\u0000': u'\u0020', # null

    u'\u0023': u'\ud804\udd42', # #
    u'\u0024': u'\ud804\udd41', # $

    u'\u0026': u'\ud804\udd00', # &

    u'\u002a': u'\ud804\udd33\ud804\udd23', # *

    u'\u0030': u'\ud804\udd36', # 0
    u'\u0031': u'\ud804\udd37', # 1
    u'\u0032': u'\ud804\udd38', # 2
    u'\u0033': u'\ud804\udd39', # 3
    u'\u0034': u'\ud804\udd3a', # 4
    u'\u0035': u'\ud804\udd3b', # 5
    u'\u0036': u'\ud804\udd3c', # 6
    u'\u0037': u'\ud804\udd3d', # 7
    u'\u0038': u'\ud804\udd3e', # 8
    u'\u0039': u'\ud804\udd3f', # 9
    u'\u0040': u'\ud804\udd04', # @
    u'\u0041': u'\ud804\udd06', # A
    u'\u0042': u'\ud804\udd33\ud804\udd23', # B
    u'\u0043': u'\ud804\udd0d', # C
    u'\u0044': u'\ud804\udd19', # D
    u'\u0045': u'\ud804\udd29', # E
    u'\u0046': u'\ud804\udd03', # F
    u'\u0047': u'\ud804\udd0a', # G
    u'\u0048': u'\ud804\udd33\ud804\udd26', # H
    u'\u0049': u'\ud804\udd2d', # I
    u'\u004a': u'\ud804\udd0f', # J
    u'\u004b': u'\ud804\udd08', # K
    u'\u004c': u'\ud804\udd26\ud804\udd33\ud804\udd23', # L
    u'\u004d': u'\ud804\udd34', # M
    u'\u004e': u'\ud804\udd15', #N
    u'\u004f': u'\ud804\udd27\ud804\udd32', # O
    u'\u0050': u'\ud804\udd04', #P
    u'\u0051': u'\ud804\udd12', #Q
    u'\u0052': u'\ud804\udd33\ud804\udd22', # R
    u'\u0053': u'\ud804\udd05', # S
    u'\u0054': u'\ud804\udd17', #T
    u'\u0055': u'\ud804\udd2b', # U
    u'\u0056': u'\ud804\udd0b', # V
    u'\u0057': u'\ud804\udd31', #W
    u'\u0058': u'\ud804\udd14', # X
    u'\u0059': u'\ud804\udd10', #Y
    u'\u005a': u'\ud804\udd33\ud804\udd20', # Z
    u'\u005c': u'\ud804\udd1d\ud804\udd33\ud804\udd1d', # backslash

    u'\u005e': u'\ud804\udd33\ud804\udd1a', # ^
    u'\u005f': u'\ud804\udd34', # _
    u'\u0060': u'\ud804\udd01', # `
    u'\u0061': u'\ud804\udd2c', # a
    u'\u0062': u'\ud804\udd1d', # b
    u'\u0063': u'\ud804\udd0c', # c
    u'\u0064': u'\ud804\udd18', # d
    u'\u0065': u'\ud804\udd28', # e
    u'\u0066': u'\ud804\udd1c', # f
    u'\u0067': u'\ud804\udd09', # g
    u'\u0068': u'\ud804\udd26', # h
    u'\u0069': u'\ud804\udd27', # i
    u'\u006a': u'\ud804\udd0e', # j
    u'\u006b': u'\ud804\udd07', # k
    u'\u006c': u'\ud804\udd23', # l
    u'\u006d': u'\ud804\udd1f', # m
    u'\u006e': u'\ud804\udd1a', # n
    u'\u006f': u'\ud804\udd2e', # o
    u'\u0070': u'\ud804\udd1b', # p
    u'\u0071': u'\ud804\udd11', # q
    u'\u0072': u'\ud804\udd22', # r
    u'\u0073': u'\ud804\udd25', # s
    u'\u0074': u'\ud804\udd16', # t
    u'\u0075': u'\ud804\udd2a', # u
    u'\u0076': u'\ud804\udd1e', # v
    u'\u0077': u'\ud804\udd24', # w
    u'\u0078': u'\ud804\udd13', # x
    u'\u0079': u'\ud804\udd20', # y
    u'\u007a': u'\ud804\udd21', # z
    u'\u007c': u'\ud804\udd33\ud804\udd03', # |
}


def eReplaceFunc(matchobj):
  # ePattern = u'\ud804\udd2c([\ud804\udd07-\ud804\udd26])'
  eReplace = u'\ud804\udd2c'
  print 'Match in eReplaceFunc: %s' % matchobj.group(0)
  print '  %s, %s' % (matchobj.start(0), matchobj.end(0))
  return matchobj.group(0)[matchobj.start(0)+1:matchobj.end(0)-1] + eReplace


def viramaEReplaceFunc(matchobj):
  print 'Match in viramaFunc: %s' % matchobj
  viramaEPattern = u'\ud804\udd2c\ud804\udd33([\ud804\udd07-\ud804\udd26])'
  viramaEReplace = u'\ud804\udd33$1\ud804\udd12c'
  return matchobj


def dotReplaceFunc(matchobj):
  print 'Match in dotReplaceFunc: %s' % matchobj
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
    print '      %s' % (outtext)

  # Move some code points in context.
  # Vowel sign to right of consonants:
  ePattern = u'\ud804\udd2c\ud804([\udd07-\udd26])'

  newText = re.sub(ePattern, eReplaceFunc, outtext, count = 10)
  print ' After eVowel: %s' % newText

  # Move the eVowel over a virama.
  viramaEPattern = u'\ud804\udd2c\ud804\udd33\ud804([udd07-\udd26])'
  viramaEReplace = u'\ud804\udd33$1\ud804\udd12c'
  newText = re.sub(viramaEPattern, viramaEReplaceFunc, newText)

  dotPattern = u'\ud804([\udd41-\udd42])\ud804\udd01'
  newText = re.sub(dotPattern, dotReplaceFunc, newText)

  if debug:
    print '      %s' % (newText)

  return newText


def convertFileLines(inname, outname):
  f_in = open(inname, 'r')
  f_out = codecs.open(outname, 'w', 'utf-8')

  convertedCount = 0
  totalLines = 0
  for inline in f_in:
    if debug:
      print '%4d: %s' % (totalLines, inline)
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
    print 'Please provide file name to convert.'

  infilename = argv[1]
  outfilename = infilename + '.unicode'

  result = convertFileLines(infilename, outfilename)

  print '%d lines converted out of %s' % (result[0], result[1])

if __name__ == "__main__":
    print 'ARGS = %s' % sys.argv 
    sys.exit(main(sys.argv))
