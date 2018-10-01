# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Chakmak encoded text to Unicode.

debug = True  #False

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
        "(": ["(", ""],
        ")": [")", ""],
        "/": [u"\u104b", ""],
        "\\": [u"\u104a", ""],
        "[": [u"\u103c", ""],
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
        " ": [u"\u0020", "\u0020"],
        "#": [u"\u1036", ""],
        "$": [u"\u102e", ""],
        "^": [u"\u102c", ""],
        "_": [u"\u103a\u105e", ""],
        "}": [u"\u103a\u103d", ""],
        "%": [u"\u00a0\u103a", ""],
        "&": [u"\u00a0\u109d", ""],
    }

    oldFonts = FONTS_TO_CONVERT.keys()
    # Converts Phake upper case characters
    def toLower(self, inText):
      inText.lower().encode('utf-8')  # Standard Unicode conversion.
      return inText

    def __init__(self, oldFontList, newFont=None):
      self.debug = True  # False
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
                tags.append(fmt.tag[loc + 1:])

            # Convert this one, and return the result
            #if self.debug:
            #  print('++++ item = %s' % item)
              # print('++++ font index = %s' % fontIndex)
            convertList.append(self.convertString(item[0], tags, fontIndex, convertToLower))

        return u''.join(convertList)

    def convertString(self, textIn, fontInfo, fontIndex, convertToLower=False):
      # type: (object, object, object) -> object
      convertedList = []
      convertResult = u''

      #if self.debug:
      #  print('$$$$$ text = %s, fontInfo = %s' % (textIn.encode('utf-8'), fontInfo))

      for index in xrange(len(textIn)):
        c = textIn[index];

        out = c
        if c in self.private_use_map:
          out = self.private_use_map[c][fontIndex]
        else:
          if self.debug:
            print('----- character %s (%x) not found' %
                  (c.encode('utf-8'), ord(c)))

        convertedList.append(out)

        convertResult = ''.join(convertedList)

      re.UNICODE
      # Handle more complex replacements.
      ePattern = ur'([\u1031\u103c\u103d])([\u1000-\u1029\u1048\u1075-\u1081\uaa60-\uaa7a\uaa7e\uaa7f])'
      eReplace = ur'\2\1'
      convertResult = re.sub(ePattern, eReplace, convertResult)

      spaceCombPattern = ur' ([\u102f\u103d]`)'
      spaceCombReplace = ur'\1 '
      convertResult = re.sub(spaceCombPattern, spaceCombReplace, convertResult)

      spaceCombPattern = ur'([\u103b\u103d]) \u102f'
      spaceCombReplace = ur'\1\u102f '
      convertResult = re.sub(spaceCombPattern, spaceCombReplace, convertResult)

      # Doubled combiners
      pattern = ur'\u103a\u103a'
      replacement = ur'\u103a\u00a0\u103a'
      convertResult = re.sub(pattern, replacement, convertResult)

      pattern = ur'\u102e\u102e'
      replacement = ur'\u102e\u00a0\u102e'
      convertResult = re.sub(pattern, replacement, convertResult)

      pattern = ur'\u1036\u1036'
      replacement = ur'\u1036\u00a0\u1036'
      convertResult = re.sub(pattern, replacement, convertResult)

      pattern = ur'\u109d\u109d'
      replacement = ur'\u109d\u00a0\u109d'
      convertResult = re.sub(pattern, replacement, convertResult)

      # Ellipsis
      pattern = ur'\.\.\.'
      replacement = ur'\u2026'
      convertResult = re.sub(pattern, replacement, convertResult)

      return convertResult

def testConvert():
  return


def main():
  testConvert()


if __name__ == '__main__':
    main()
