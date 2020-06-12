# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Cherokee encoded text to Unicode.

debug = True  #False

private_use_map = {
  u'\u0020': u'\u0020',
  u'\uf020': u'\u0020',
  u'\u0021': u'\u13b1',
  u'\uf021': u'\u13b1',
  u'\u0022': u'\u0022',
  u'\uf022': u'\u0022',
  u'\u0023': u'\u13ab',
  u'\uf023': u'\u13ab',
  u'\u0024': u'\u13b0',
  u'\uf024': u'\u13b0',
  u'\u0025': u'\u13b9',
  u'\uf025': u'\u13b9',
  u'\u0026': u'\u13e1',
  u'\uf026': u'\u13e1',
  u'\u0027': u'\u0027',
  u'\uf027': u'\u0027',
  u'\u0028': u'\u0028',
  u'\uf028': u'\u0028',
  u'\u0029': u'\u0029',
  u'\uf029': u'\u0029',
  u'\u002a': u'\u13ba',
  u'\uf02a': u'\u13ba',
  u'\u002b': u'\u13bd',
  u'\uf02b': u'\u13bd',
  u'\u002c': u'\u002c',
  u'\uf02c': u'\u002c',
  u'\u002d': u'\u13c0',
  u'\uf02d': u'\u13c0',
  u'\u002e': u'\u002e',
  u'\uf02e': u'\u002e',
  u'\u002f': u'\u13c2',
  u'\uf02f': u'\u13c2',

  u'\u0030': u'\u13c4',
  u'\uf030': u'\u13c4',
  u'\u0031': u'ᏣᎳᎩ',
  u'\uf031': u'ᏣᎳᎩ',
  u'\u0032': u'ᎣᏏᏲ',
  u'\uf032': u'ᎣᏏᏲ',
  u'\u0033': u'ᏩᏙ',
  u'\uf033': u'ᏩᏙ',
  u'\u0034': u'\u13d9',
  u'\uf034': u'\u13d9',
  u'\u0035': u'\u13e6',
  u'\uf035': u'\u13e6',
  u'\u0036': u'\u13dc',
  u'\uf036': u'\u13dc',
  u'\u0037': u'\u13cb',
  u'\uf037': u'\u13cb',
  u'\u0038': u'\u13d6',
  u'\uf038': u'\u13d6',
  u'\u0039': u'\u13d2',
  u'\uf039': u'\u13d2',
  u'\u003a': u'\u13e0',
  u'\uf03a': u'\u13e0',
  u'\u003b': u'\u13e8',
  u'\uf03b': u'\u13e8',
  u'\u003c': u'\u13e2',
  u'\uf03c': u'\u13e2',
  u'\u003d': u'\u13f3',
  u'\uf03d': u'\u13f3',
  u'\u003e': u'\u13b4',
  u'\uf03e': u'\u13b4',
  u'\u003f': u'\u13c9',
  u'\uf03f': u'\u13c9',

  u'\u0040': u'\u13c7',
  u'\uf040': u'\u13c7',
  u'\u0041': u'\u13cc',
  u'\uf041': u'\u13cc',
  u'\u0042': u'\u13f0',
  u'\uf042': u'\u13f0',
  u'\u0043': u'\u13df',
  u'\uf043': u'\u13df',
  u'\u0044': u'\u13d0',
  u'\uf044': u'\u13d0',
  u'\u0045': u'\u13e3',
  u'\uf045': u'\u13e3',
  u'\u0046': u'\u13c8',
  u'\uf046': u'\u13c8',
  u'\u0047': u'\u13e5',
  u'\uf047': u'\u13e5',
  u'\u0048': u'\u13b2',
  u'\uf048': u'\u13b2',
  u'\u0049': u'\u13f1',
  u'\uf049': u'\u13f1',
  u'\u004a': u'\u13ab',
  u'\uf04a': u'\u13ab',
  u'\u004b': u'\u13a7',
  u'\uf04b': u'\u13a7',
  u'\u004c': u'\u13ae',
  u'\uf04c': u'\u13ae',
  u'\u004d': u'\u13b7',
  u'\uf04d': u'\u13b7',
  u'\u004e': u'\u13bb',
  u'\uf04e': u'\u13bb',
  u'\u004f': u'\u13ec',
  u'\uf04f': u'\u13ec',

  u'\u0050': u'\u13ea',
  u'\uf050': u'\u13ea',
  u'\u0051': u'\u13c6',
  u'\uf051': u'\u13c6',
  u'\u0052': u'\u13cf',
  u'\uf052': u'\u13cf',
  u'\u0053': u'\u13ce',
  u'\uf053': u'\u13ce',
  u'\u0054': u'\u13d8',
  u'\uf054': u'\u13d8',
  u'\u0055': u'\u13ad',
  u'\uf055': u'\u13ad',
  u'\u0056': u'\u13d3',
  u'\uf056': u'\u13d3',
  u'\u0057': u'\u13eb',
  u'\uf057': u'\u13eb',
  u'\u0058': u'\u13ed',
  u'\uf058': u'\u13ed',
  u'\u0059': u'\u13f2',
  u'\uf059': u'\u13f2',
  u'\u005a': u'\u13c3',
  u'\uf05a': u'\u13c3',
  u'\u005b': u'\u13d5',
  u'\uf05b': u'\u13d5',
  u'\u005c': u'\u13b6',
  u'\uf05c': u'\u13b6',
  u'\u005d': u'\u13bb',
  u'\uf05d': u'\u13bb',
  u'\u005e': u'\u13dd',
  u'\uf05e': u'\u13dd',
  u'\u005f': u'\u13bc',
  u'\uf05f': u'\u13bc',

  u'\u0060': '',
  u'\uf060': '',
  u'\u0061': u'\u13a0',
  u'\uf061': u'\u13a0',
  u'\u0062': u'\u13a8',
  u'\uf062': u'\u13a8',
  u'\u0063': u'\u13d3',
  u'\uf063': u'\u13d3',
  u'\u0064': u'\u13d7',
  u'\uf064': u'\u13d7',
  u'\u0065': u'\u13a1',
  u'\uf065': u'\u13a1',
  u'\u0066': u'\u13a9',
  u'\uf066': u'\u13a9',
  u'\u0067': u'\u13a6',
  u'\uf067': u'\u13a6',
  u'\u0068': u'\u13af',
  u'\uf068': u'\u13af',
  u'\u0069': u'\u13a2',  u'\uf069': u'\u13a2',  # L
  u'\u006a': u'\u13da',
  u'\uf06a': u'\u13da',
  u'\u006b': u'\u13b8',  u'\uf06b': u'\u13b8',  # N
  u'\u006c': u'\u13b5',
  u'\uf06c': u'\u13b5',
  u'\u006d': u'\u13c5',
  u'\uf06d': u'\u13c5',
  u'\u006e': u'\u13be',
  u'\uf06e': u'\u13be',
  u'\u006f': u'\u13a3',
  u'\uf06f': u'\u13a3',

  u'\u0070': u'\u13c1',
  u'\uf070': u'\u13c1',
  u'\u0071': u'\u13aa',
  u'\uf071': u'\u13aa',
  u'\u0072': u'\u13db',
  u'\uf072': u'\u13db',
  u'\u0073': u'\u13cd',
  u'\uf073': u'\u13cd',
  u'\u0074': u'\u13d4',
  u'\uf074': u'\u13d4',
  u'\u0075': u'\u13a4',
  u'\uf075': u'\u13a4',
  u'\u0076': u'\u13a5',
  u'\uf076': u'\u13a5',
  u'\u0077': u'\u13b3',
  u'\uf077': u'\u13b3',
  u'\u0078': u'\u13f4',
  u'\uf078': u'\u13f4',
  u'\u0079': u'\u13ef',
  u'\uf079': u'\u13ef',
  u'\u007a': u'\u13ac',
  u'\uf07a': u'\u13ac',
  u'\u007b': u'\u13d1',
  u'\uf07b': u'\u13d1',
  u'\u007c': u'\u13ee',
  u'\uf07c': u'\u13ee',
  u'\u007d': u'\u13e4',
  u'\uf07d': u'\u13e4',
  u'\u007e': u'\u13ca',
  u'\uf07e': u'\u13ca',
  u'\u007f': ' ',
  u'\uf07f': ' ',
}


# Converts Cherokee upper case characters
def toLower(inText):
  out = ''
  for c in inText:
    out_char = c
    if c >= u'\u13a0' and c <= u'\u13f5':
      if c >= u'\u13a0' and c <= u'\u13ef':
        out_char = unichr(ord(c) + (0xab70 - 0x13a0))
      else:
        out_char = unichr(ord(c) + 8)
    out += out_char
  return out

def preParseOld(instring):
    # Nothing special for these conversion in Cherokee
    outList = instring
    return outList;

def oldEncodingToUnicode(textIn, convertToLower=False):
  global debug

  convertResult = u''
  outputIsUTF16 = True

  parsedInput = preParseOld(textIn)
  if debug:
    print('      &&&& Text in = >%s<' % textIn)

  if not parsedInput:
    return ''

  print(' +++ %d found in input' % len(parsedInput))
  for index in xrange(len(parsedInput)):
    c = parsedInput[index];
    # Special handling if needed

    out = c
    if c in private_use_map:
      out = private_use_map[c]
    else:
      if debug:
        print('----- character %s (%s) not found' %
              (c, ord(c)))
    convertResult += out
    if debug:
      print('  character: %s to %s' % (c, out))

  if convertToLower:
    lowerResult = toLower(convertResult)
    if lowerResult != convertResult:
      convertResult = lowerResult

  if debug:
    print(' ---> %s' % convertResult)

  return convertResult


# TODO: fix these tests to do Cherokee!
def testConvertOld():
  # Debug!
  print ('\nOLD CHR')
  oldChrText = u'\uf044\uf041\uf04e\uf059\uf020\uf057\uf041\uf04c\uf059\uf05e'  # u'\'
  expected = u'𐓈𐒰𐓁𐒻 𐓏𐒰𐒿𐒻͘'

  result = oldChrToUnicode(oldChrText)

  if result != expected:
    print ('Old Chr = %s' % oldChrText.encode('utf-8'))
    print ('** Not converting Old Chr: expected(%d) >%s<. Result(%d) = >%s<' % (len(expected), expected, len(result), result))

  print ('\nOLD CHR Punctuation')
  oldChrPunctuation = [(u'\uf02d' '-'), (u'\uf020', ' '),
                         (u'\uf05e', '^'), (u'\uf02e', '.')]

  for punct in oldChrPunctuation:
    result = oldChrToUnicode(punct[0])
    expected = punct[1]
    if result == expected:
      print ('  Punctuation is as expected = %s' % result)
    else:
      print ('  Punctuation is *NOT* as expected(%d) = >%s< vs. result(%d) = >%s<' % (
          len(expected), expected, len(result), result))


def testConvert():
  return


def main():
  testConvert()

if __name__ == '__main__':
  main()
