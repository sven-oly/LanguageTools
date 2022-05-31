# -*- coding: utf-8 -*-
# !/usr/bin/env python

# Convert Chatino using superscript formats to use Unicode superscript
# characters instead.
from __future__ import print_function


class converter():
    # Special for Chatino superscript conversion.
    # Added as diacritic when underline format has been applied
    combiningLowerLine = u'\u0332'
    private_use_map = {
      '#': u'\u00e9',
      '$': u'\u00ed',
      '%': u'\u00f3',
      '&': u'\u00fa',
      '<': u'\u028c',
      '=': u'\u00b7',
      '>': u'\u0294',
      '@': u'\u00e1',
      '^': u'\u028C\u0301'
    }
    description = 'Converts superscripts to Unicode'

    oldFonts = ['Times New Roman']  # Placeholder to check superscripts

    # Conversion for superscript into to Unicode superscripts
    def superScript(self, runInfo):
        # TODO: Check for superscripting
        inText = runInfo.text
        if len(inText) > 1:
          return False
        firstChar = inText[0]
        try:
          index = self.superChar.index(firstChar)
          newText = self.superConvertOut[index]
          runInfo.text = newText
          runInfo.font.superscript = False
          return True  #Converted
        except ValueError:
          return False  # Not converted

    # Converts upper case characters
    def toLower(self, inText):
        inText.lower().encode('utf-8')  # Standard Unicode conversion.
        return inText

    def __init__(self, oldFontList, newFont=None):
        self.debug = False
        # The fonts detected for conversion
        self.oldFonts = oldFontList
        # Name of the substitute Unicode font, if provided

        if newFont:
            self.unicodeFont = newFont
        else:
            self.unicodeFont = 'Times New Roman'
        # Conversion outputs A-Z characters
        self.superChar = 'ABCDEFGHIJKLMNOPQRSTUVWabcdefghijl'
        self.superConvertOut = 'ᴬᴮꟲᴰᴱꟳᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾ𐞥ᴿˢᵀᵁⱽᵂᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡ'

    # Consider the font information if relevant, e.g., underlining.
    # fontInfo: a list of font data for this code, including formatting for each piece.
    def convertText(self, textIn, convertToLower=False, fontTextInfo=None, fontIndex=0):
        if not isinstance(textIn, basestring):
           return textIn

        if not fontTextInfo:
            # Only raw text, without formatting or structure information.
            return self.convertString(textIn, None, convertToLower)

        # Take the data from the fontTextInfo field.
        convertList = []
        for item in fontTextInfo:
            if self.debug:
               print('++ text = %s' % item[0])

            tags = []
            for fmt in item[1]:
                loc = fmt.tag.find('}')
                tags.append(fmt.tag[loc + 1:])
                if self.debug:
                    print(' %s ' % fmt.tag[loc + 1:])

            # Convert this one, and return the result
            convertList.append(self.convertString(item[0], tags, convertToLower))

        print('***** CONVERT LIST = %s' % u''.join(convertList).encode('utf-8'))

        return u''.join(convertList)

    def convertString(self, textIn, fontInfo, convertToLower=False):
        # type: (object, object, object) -> object
        convertedList = []
        convertResult = u''

        if self.debug:
          print('$$$$$ text = %s, fontInfo = %s' % (textIn, fontInfo))

        for index in xrange(len(textIn)):
          c = textIn[index];
          # Special handling if needed

          out = c
          if c in self.private_use_map:
            out = self.private_use_map[c]
          else:
            if self.debug:
              print('----- character %s (%s) not found' %
                    (c, ord(c)))

          # Special case for handling underlined text
          convertedList.append(out)
          if fontInfo and 'u' in fontInfo:
            convertedList.append(self.combiningLowerLine)
          if fontInfo and 's' in fontInfo:
              

            convertResult = ''.join(convertedList)

        if convertToLower:
          lowerResult = self.toLower(convertResult)
          if lowerResult != convertResult:
            convertResult = lowerResult

        if self.debug:
          print('!!!!!!!!!!!!! convertedList = %s' % convertResult)

        return convertResult


# TODO: Test more superscript conversion!
def testConvertOld():
  # Debug!
  oldOneText = [[u'@hs< na>tekut<hnu=t#hle> (kuti=kw#ku)', []]]
  expected = u'áhsʌ naʔtekutʌhnu·téhleʔ (kuti·kwéku)'

  oneConverter = converter()
  result = oneConverter.oldEncodingToUnicode(oldOneText[0][0], fontTextInfo=oldOneText)

  if result != expected:
    print('Old Chatino = %s' % oldOneText.encode('utf-8'))
    print ('** Not converting Old Chatino: expected(%d) >%s<. Result(%d) = >%s<' % (
      len(expected), expected, len(result), result))
  else:
    print ('  * PASSES *')


def testConvert():
  return


def main():
  testConvert()
  testConvertOld()


if __name__ == '__main__':
  main()
