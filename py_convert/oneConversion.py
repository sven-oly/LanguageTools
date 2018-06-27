# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Oneida encoded text to Unicode.

debug = True  #False

private_use_map = {
  '@': u'\u00e1',
  '#': u'\u00e9',
  '$': u'\u00ed',
  '%': u'\u00f3',
  '^': u'\u0283\u0300',
  '&': u'\u00fa',
  '<': u'\u0294',
  '>': u'\u028c',
  '=': u'\u00b7',
}


# Converts Oneida upper case characters
# TODO: FINISH
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
    # Nothing special for these conversion in Oneida
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


# TODO: fix these tests to do Oneida!
def testConvertOld():
  # Debug!
  print '\nOLD Oneida'
  oldOneText = u'\uf044\uf041\uf04e\uf059\uf020\uf057\uf041\uf04c\uf059\uf05e'  # u'\'
  expected = u'𐓈𐒰𐓁𐒻 𐓏𐒰𐒿𐒻͘'

  result = oldOneToUnicode(oldOneText)

  if result != expected:
    print 'Old Chr = %s' % oldOneText.encode('utf-8')
    print '** Not converting Old Chr: expected(%d) >%s<. Result(%d) = >%s<' % (len(expected), expected, len(result), result)


def testConvert():
  return


def main():
  testConvert()

if __name__ == '__main__':
  main()
