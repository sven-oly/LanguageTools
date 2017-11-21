# -*- coding: utf-8 -*-

# Read data with Osage characters in the old range U+f020 to U+f07f.
# Convert to the new Unicode range. Note that the old code only has
# upper case.

# Should the code automagically convert to lower case?

import sys

osage_private_use_map = {
    u'\uf021': '!',
    u'\uf022': u'\U000104c7',
    u'\uf023': '#',
    u'\uf024': '$',
    u'\uf025': '%',
    u'\uf026': '&',
    u'\uf027': "\'",
    u'\uf028': '(',
    u'\uf029': ')',
    u'\uf02a': '*',
    u'\uf02b': '+',
    u'\uf02c': u'\U000104ba',
    u'\uf02d': '-',
    u'\uf02e': '-',
    u'\uf02f': u'\U000104be',
    u'\uf030': '0',
    u'\uf031': '1',
    u'\uf032': '2',
    u'\uf033': '3',
    u'\uf034': '4',
    u'\uf035': '5',
    u'\uf036': '6',
    u'\uf037': '7',
    u'\uf038': '8',
    u'\uf039': '9',
    u'\uf03a': ':',
    u'\uf03b': u'\U000104c8',
    u'\uf03c': '<',
    u'\uf03d': '=',
    u'\uf03e': '>',
    u'\uf03f': u'\U000104bd',
    u'\uf040': '@',
    u'\uf041': u'\U000104b0',
    u'\uf042': u'\U000104b4',
    u'\uf043': u'\U000104b5',
    u'\uf044': u'\U000104c8',
    u'\uf045': u'\U000104b7',
    u'\uf046': '',
    u'\uf047': '',
    u'\uf048': u'\U000104b9',
    u'\uf049': u'\U000104b0',
    u'\uf04a': u'\U000104b3',
    u'\uf04b': u'\U000104bc',
    u'\uf04c': u'\U000104bf',
    u'\uf04d': u'\U000104c0',
    u'\uf04e': u'\U000104c1',
    u'\uf04f': u'\U000104c2',
    u'\uf050': u'\U000104c4',
    u'\uf053': u'\U000104c8',
    u'\uf054': u'\U000104cd',
    u'\uf055': u'\U000104ce',
    u'\uf056': u'\U000104c7',
    u'\uf057': u'\U000104cf',
    u'\uf058': u'\U000104d0',
    u'\uf059': u'\U000104b8',
    u'\uf05a': u'\U000104d2',
    u'\uf05b': u'\U000104d3',
    u'\uf05c': u'\U000104ca', # ??
    u'\uf05d': u'\U000104ca',
    u'\uf05e': '^',
    u'\uf05f': '_',
    u'\uf060': '`',
    u'\uf061': u'\U000104b0\u0331',
    u'\uf065': u'\U000104b7\u0331',
    u'\uf06f': u'\U000104c2\u0331',
    u'\uf07b': '{',
    u'\uf07c': '|',
    u'\uf07d': '}',
    u'\uf07e': '~',
    u'\uf0b6': u'\u00b6',
}

OFFSET_TO_LOWER_CASE = 0x28  # Amount to add to get the lower case character

class convertOldOsage():

  def __init__(self, autoCase=False):
    # Determines if automatic case lowering is applied
    self.autoCase = autoCase
    return

  def convertToUnicode(self, text):
    newArray = []
    for char in text:
      if char in osage_private_use_map:
        newChar = osage_private_use_map[char]
        if self.autoCase:
           newChar += OFFSET_TO_LOWER_CASE
      else:
        newChar = char
      newArray.append(newChar)

    return ''.join(newArray)

  def convertFile(self, fileIn, fileOut):
    # TODOL Complete this.
    return

class testOsageConverter():

  def __init__(self):
    self.converter = convertOldOsage()
    return

  def test1(self):
    print '---------- Test 1 ---------------'
    textList = []
    # Check basic conversion to new text without case conversion
    for c in xrange(ord(u'\uf021'), ord(u'\uf045')):
      textList.append(unichr(c))
    for c in xrange(ord(u'\uf048'), ord(u'\uf050')):
      textList.append(unichr(c))
    for c in xrange(ord(u'\uf053'), ord(u'\uf061')):
      textList.append(unichr(c))
    textList.append(u'\uf07b')
    textList.append(u'\uf07c')
    textList.append(u'\uf07d')
    textList.append(u'\uf07e')
    textList.append(u'\uf0b6')
    text = ''.join(textList)

    uText = self.converter.convertToUnicode(text)
    # TODO: finish this.
    expectedText = u'!\U000104c7#$%&\'()*+' + u'\U000104ba' + u'--\U000104bd0123456789:'
    expectedText += u'\U000104c8<=>\U000104bd@\U000104b0\U000104b4\U000104b5\U000104c8\U000104b7'

    if uText != expectedText:
      print 'Input = %s' % (text)
      index = 0
      for c in expectedText:
        ut = uText[index]
        if ord(c) != ord(ut):
          print '  %5x vs %5x' % (ord(c), ord(ut))
        index += 1
      print 'Error in test1: Expected %s but got %s' % (expectedText, uText)
      print 'len input = %s, len output = %d' % (len(expectedText), len(uText))

  def test2(self):
    # Check basic conversion to new text with case conversion
    print '\n---------- Test 2 ---------------'
    textList = []

    textList.append(u'\uf022')
    textList.append(u'\uf02c')
    textList.append(u'\uf02f')
    intext = ''.join(textList)

    uText = self.converter.convertToUnicode(intext)
    expectedText = u'\U000104c7\U000104ba\U000104be'
    numErrors = 0
    for index in range(len(textList)):
      if uText[index] != expectedText[index]:
        print '  %5x: %5x vs. %5x' % (ord(textList[index]), ord(uText[index]),
                                      ord(expectedText[index]))
        numErrors += 1
    print '  Num characters tested = %d' % len(uText)
    print '  NumErrors = %d' % numErrors
    return

  def test3(self):
    # Check conversion with non-Osage characters
    print '\n---------- Test 3 ---------------'
    text = u'abc'
    return


def main(args):
  # if input and output files are specified, do the conversion.
  # TODO: Complete
  for c in osage_private_use_map:
    t = osage_private_use_map[c]
    print '%5x %s   %s' % (ord(c), c, t)

  tester = testOsageConverter()
  tester.test1()
  tester.test2()
  tester.test3()


if __name__ == "__main__":
   main(sys.argv)
