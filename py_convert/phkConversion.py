# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Chakmak encoded text to Unicode.

debug = False

# Mappings for both arjyban, sujoyan, alaam, etc. encodings.
FONTS_TO_CONVERT = {
    'Phake Script': 0,
    'Phake Ramayana': 1,
  }

class converter():
    description = 'Converts Phake font encodings to Unicode'
    private_use_map = {
        "A": [u"ဢ", ""],
        "B": [u"ꩰ", ""],
        "C": [u"\u109c", ""],
        "D": [u"ꩰ", ""],
        "E": [u"\u105e\u103a", ""],
        "F": [u"\u103a\u1036", ""],
        "G": [u"\u1087", ""],
        "H": [u"\u1088", ""],
        "I": [u"ီ", ""],
        "J": [u"ို", ""],
        "K": [u"\u1039\u1000", ""],
        "L": [u" ", ""],
        "M": [u"ံ", ""],
        "N": [u"\u107a", ""],
        "O": [u"\u103d", ""],
        "P": [u"\u1039\u1015", ""],
        "Q": [u"\uaa77", ""],
        "R": [u"ြ", ""],
        "S": [u"꩷", ""],
        "T": [u"\u1039\u1010", ""],
        "U": [u"\u1030", ""],
        # "V": [u"\u1030", ""],
        "W": [u"ွ်", ""],
        "X": [u"ႜ", ""],
        "Y": [u"ျ", ""],
        "Z": [u"ၞ", ""],
        "a": [u"ႃ", ""],
        "b": [u"ပ", ""],
        "c": [u"ꩡ", ""],
        "d": [u"ဒ", ""],
        "e": [u"ေ", ""],
        "f": [u"ၸ", ""],
        "g": [u"င", ""],
        "h": [u"\uaa6d", ""],
        "i": [u"ိ", ""],
        "j": [u"\u109d", ""],
        "k": [u"က", ""],
        "l": [u"လ", ""],
        "m": [u"မ", ""],
        "n": [u"ꩫ", ""],
        "o": [u"ွ", ""],
        "p": [u"ပ", ""],
        "q": [u"်", ""],
        "r": [u"\uAA7A", ""],
        "s": [u"\uaa6c", ""],
        "t": [u"တ", ""],
        "u": [u"ု", ""],
        "v": [u"ထ", ""],
        "w": [u"ဝ", ""],
        "x": [u"ၵ", ""],
        "y": [u"ယ", ""],
        "z": [u"ႃ", ""],
        "@": [u"", ""],
        "/": [u"\u104b", ""],
        "\\": [u"\u104a", ""],
        "[u": [u"\u103c", ""],
        "]": [u"\u103c", ""],
        "{": [u"\u103c", ""],
        "}": [u"", ""],
        "1": [u"၁", ""],
        "2": [u"၂", ""],
        "3": [u"၃", ""],
        "4": [u"၄", ""],
        "5": [u"၅", ""],
        "6": [u"၆", ""],
        "7": [u"၇", ""],
        "8": [u"၈", ""],
        "9": [u"၉", ""],
        "0": [u"၀", ""],
        "\u0020": [u"\u0020", "\u0020"],
        "#": [u"\u1036", ""],
        "$": [u"\u102e", ""],
        "^": [u"\u102c", ""],
        "_": [u"\u103a\u105e", ""],
        "}": [u"\u103a\u103d", ""],
        # "%": [u"\u103a\u1036", ""],
        # "&": [u"\u103a\u1036", ""],
    }

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

        if self.debug:
          print('!!!!!!!!!!!!! convertedList = %s' % convertedList)
        convertResult = ''.join(convertedList)

        if convertToLower:
          lowerResult = self.toLower(convertResult)
          if lowerResult != convertResult:
            convertResult = lowerResult

        if self.debug:
          print('!!!!!!!!!!!!! convertedResult = %s' % convertResult.encode('utf-8'))

        # Handle more complex replacements.
        ePattern = r'([\u1031\u103c\u103d])([\u1000-\u1029\u1075-\u1081\uaa60-\uaa76])'
        eReplace = r'$2$1'
        convertResult = re.sub(ePattern, eReplace, convertResult)

        spaceCombPattern = r' ([\u102f\u103d]`)'
        spaceCombReplace = r'$1 '
        convertResult = re.sub(spaceCombPattern, spaceCombReplace, convertResult)

        spaceCombPattern = r'\u103d \u102f'
        spaceCombReplace = r'\u103d\u102f'
        convertResult = re.sub(spaceCombPattern, spaceCombReplace, convertResult)

        return convertResult

def testConvert():
  return


def main():
  testConvert()


if __name__ == '__main__':
    main()
