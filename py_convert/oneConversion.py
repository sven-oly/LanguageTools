# -*- coding: utf-8 -*-
#!/usr/bin/env python

import decimal
import numbers
import re

# Convert Oneida encoded text to Unicode.

debug = True  # False

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

# Special for Oneida underline conversion, added as diacritic when underline format has been applied
combiningLowerLine = u'\u0332'

# Converts Oneida upper case characters

def toLower(inText):
  inText.lower().encode('utf-8')


# Consider the font information if relevant, e.g., underlining.
# fontInfo: a list of font data for this code, including formatting for each piece.
def oldEncodingToUnicode(textIn, convertToLower=False, fontTextInfo=None):
  global debug

  convertResult = u''
  outputIsUTF16 = True

  if debug:
    print('      &&&& Text in = >%s<' % textIn)
    print('         is it a string? %s' % isinstance(textIn, basestring))
    print('         is it a integer? %s' % isinstance(textIn, int))
    print('         is it a number? %s' % isinstance(textIn, numbers.Number))

  if not isinstance(textIn, basestring):
    return textIn

  if not fontTextInfo:
    print('    &&&& fontTextInfo = %s ' % fontTextInfo)
    return convertString(textIn, None, convertToLower)

  # Take the data from the fontTextInfo field.
  convertList = []
  for item in fontTextInfo:
    if debug:
      print('++ text = %s' % item[0])

    tags = []
    for fmt in item[1]:
      loc = fmt.tag.find('}')
      tags.append(fmt.tag[loc + 1:])
      if debug:
        print(' %s ' % fmt.tag[loc+1:])

    # Convert this one, and return the result
    convertList.append(convertString(item[0], tags, convertToLower))

  print('***** CONVERT LIST = %s' % u''.join(convertList).encode('utf-8'))

  return u''.join(convertList)


def convertString(textIn, fontInfo, convertToLower=False):
  convertedList = []
  convertResult = u''
  outputIsUTF16 = True

  if debug:
    print('$$$$$ text = %s, fontInfo = %s' % (textIn, fontInfo))

  for index in xrange(len(textIn)):
    c = textIn[index];
    # Special handling if needed

    out = c
    if c in private_use_map:
      out = private_use_map[c]
    else:
      if debug:
        print('----- character %s (%s) not found' %
              (c, ord(c)))

    # Special case for handling underlined text
    if fontInfo and 'u' in fontInfo:
      convertedList.append(out + combiningLowerLine)
      if debug:
        print('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% convertedList = %s' % convertedList)
    else:
      convertedList.append(out)

  convertResult = ''.join(convertedList)

  if convertToLower:
    lowerResult = toLower(convertResult)
    if lowerResult != convertResult:
      convertResult = lowerResult

  if debug:
    print('!!!!!!!!!!!!! convertedList = %s' % convertResult)

  return convertResult


# TODO: fix these tests to do Oneida!
def testConvertOld():
  # Debug!
  print '\nOLD Oneida'
  oldOneText = [[u'@hs< na>tekut<hnu=t#hle> (kuti=kw#ku)', []]]
  expected = u'áhsʌ naʔtekutʌhnu·téhleʔ (kuti·kwéku)'

  result = oldEncodingToUnicode(oldOneText[0][0], fontTextInfo=oldOneText)

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
