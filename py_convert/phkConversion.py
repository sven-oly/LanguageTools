# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Chakmak encoded text to Unicode.

debug = False

# Mappings for both arjyban, sujoyan, alaam, etc. encodings.
FONTS_TO_CONVERT = {
    'Times (Phake Script)': 0,
    'Verdana Navajo': 1,
  }

class converter():
  private_use_map = {
      "A": [u"ဢ", ''],
      "J": [u"ို", ''],
      "R": [u"ြ", ''],
      "S": [u"꩷", ''],
      "Y": [u"ျ", ''],
      "b": [u"ပ", ''],
      "c": [u"ꩡ", ''],
      "d": [u"ဒ", ''],
      "g": [u"င", ''],
      "h": [u"ꩭ", ''],
      "k": [u"က", ''],
      "l": [u"လ", ''],
      "m": [u"မ", ''],
      "n": [u"ꩫ", ''],
      "p": [u"ပ", ''],
      "s": [u"ꩢ", ''],
      "t": [u"တ", ''],
      "v": [u"ထ", ''],
      "w": [u"ဝ", ''],
      "y": [u"ယ", ''],
      "I": [u"ီ", ''],
      "W": [u"ွ်", ''],
      "B": [u"ꩰ", ''],
      "F": [u"ံ်", ''],
      "E": [u"ၞ်", ''],
      "L": [u" ", ''],
      "M": [u"ံ", ''],
      "O": [u" ", ''],
      "U": [u"ူ", ''],
      "X": [u"ႜ", ''],
      "Z": [u" ၞ", ''],
      "a": [u"ႃ", ''],
      "e": [u"ေ", ''],
      "i": [u"ိ", ''],
      "j": [u"-ႝ", ''],
      "o": [u"ွ", ''],
      "q": [u"်", ''],
      "u": [u"ု", ''],
      "z": [u"ႃ", ''],
      "@": [u"꩹", ''],
      "\\": [u", ", ''],
      "1": [u"၁", ''],
      "2": [u"၂", ''],
      "3": [u"၃", ''],
      "4": [u"၄", ''],
      "5": [u"၅", ''],
      "6": [u"၆", ''],
      "7": [u"၇", ''],
      "8": [u"၈", ''],
      "9": [u"၉", ''],
      "0": [u"၀", ''],
      u'\u0020': [u'\u0020', u'\u0020'],
    }
    description = 'Converts Phake font encodings to Unicode'

    oldFonts = FONTS_TO_CONVERT.keys()
    # Converts Phake upper case characters
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
          self.unicodeFont = 'Noto Sans Myanmar'

    # Consider the font information if relevant, e.g., underlining.
    # fontInfo: a list of font data for this code, including formatting for each piece.
    def convertText(self, textIn, convertToLower=False, fontTextInfo=None, fontIndex=0):
        if not isinstance(textIn, basestring):
           return textIn

        if self.debug:
            print('convertText: fontTextInfo = %s' % fontTextInfo)

        if not fontTextInfo:
            # Only raw text, without formatting or structure information.
            return self.convertString(textIn, None, fontIndex, convertToLower)

        # Take the data from the fontTextInfo field.
        convertList = []
        for item in fontTextInfo:
            if self.debug:
               print('++ text = %s' % item[0].encode('utf-8'))

            tags = []
            for fmt in item[1]:
                loc = fmt.tag.find('}')
                if self.debug:
                  print('  loc = %s' % loc)
                tags.append(fmt.tag[loc + 1:])
                if self.debug:
                    print(' %s ' % fmt.tag[loc + 1:])

            # Convert this one, and return the result
            if self.debug:
              print('++++ item = %s' % item)
              print('++++ font index = %s' % fontIndex)
            convertList.append(self.convertString(item[0], tags, fontIndex, convertToLower))

        return u''.join(convertList)

    def convertString(self, textIn, fontInfo, fontIndex, convertToLower=False):
        # type: (object, object, object) -> object
        convertedList = []
        convertResult = u''

        if self.debug:
          print('$$$$$ text = %s, fontInfo = %s' % (textIn.encode('utf-8'), fontInfo))

        for index in xrange(len(textIn)):
          c = textIn[index];
          # Special handling if needed

          out = c
          if c in self.private_use_map:
            out = self.private_use_map[c][fontIndex]
          else:
            if self.debug:
              print('----- character %s (%s) not found' %
                    (c.encode('utf-8'), ord(c)))

          # Special case for handling underlined text
          convertedList.append(out)
          if fontInfo and 'u' in fontInfo:
            convertedList.append(self.combiningLowerLine)

        if self.debug:
          print('!!!!!!!!!!!!! convertedList = %s' % convertedList)
        convertResult = ''.join(convertedList)

        if convertToLower:
          lowerResult = self.toLower(convertResult)
          if lowerResult != convertResult:
            convertResult = lowerResult

        if self.debug:
          print('!!!!!!!!!!!!! convertedResult = %s' % convertResult.encode('utf-8'))

        return convertResult

def testConvert():
  return


def main():
  testConvert()


if __name__ == '__main__':
    main()
