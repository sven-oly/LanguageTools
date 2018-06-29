# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Oneida encoded text to Unicode.

debug = False

private_use_map = {
  '#': u'\u00e9',
  '$': u'\u00ed',
  '%': u'\u00f3',
  '&': u'\u00fa',
  '<': u'\u028c',
  '=': u'\u00b7',
  '>': u'\u0294',
  '@': u'\u00e1',
  '^': u'\u028C\u0300'
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

  if debug:
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
  oldOneText = u'@hs< na>tekut<hnu=t#hle> (kuti=kw#ku)'
  expected = u'áhsʌ naʔtekutʌhnu·téhleʔ (kuti·kwéku)'

  result = oldEncodingToUnicode(oldOneText)

  if result != expected:
    print 'Old Oneida = %s' % oldOneText.encode('utf-8')
    print '** Not converting Old Oneida: expected(%d) >%s<. Result(%d) = >%s<' % (len(expected), expected, len(result), result)
  else:
    print '  * PASSES *'

def testConvert():
  return


def main():
  testConvert()
  testConvertOld()

if __name__ == '__main__':
  main()
