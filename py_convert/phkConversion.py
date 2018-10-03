# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Chakmak encoded text to Unicode.

debug = False

# Mappings for both arjyban, sujoyan, alaam, etc. encodings.
FONTS_TO_CONVERT = {
    'Phake Script': 0,
    'Phake Ramayana': 0,
    'Aiton Script': 2,
    'Shan': 3,
}


class converter():

    # 2-Oct-2018: Assume that Aiton is the same as Phake - need to fix this.
    description = 'Converts Phake font encodings to Unicode'
    private_use_map = {
        "A": [u"ဢ", u"ဢ", u"ဢ"],
        "B": [u"ဢ", u"ဢ", u"ꩰ"],
        "C": [u"ဢ", u"ဢ", u"\u109c"],
        "D": [u"ꩰ", u"ꩰ", u"ꩰ"],
        "E": [u"\u105e\u103a", u"\u105e\u103a", u"\u105e\u103a"],
        "F": [u"\u105e\u103a", u"\u105e\u103a", u"\u103a\u1036"],
        "G": [u"\u1087", u"\u1087", u"\u1087"],
        "H": [u"\u1088", u"\u1088", u"\u1088"],
        "I": [u"ီ", u"ီ", u"ီ"],
        "J": [u"ို", u"ို", u"ို"],
        "K": [u"\u1039\u1000", u"\u1039\u1000", u"\u1039\u1000"],
        "L": [u" ", " ", u" "],
        "M": [u"ံ", u"ံ", u"ံ"],
        "N": [u"\u107a", u"\u107a", u"\u107a"],
        "O": [u"\u103d", u"\u103d", u"\u103d"],
        "P": [u"\u1039\u1015", u"\u1039\u1015", u"\u1039\u1015"],
        "Q": [u"\uaa77", u"\uaa77", u"\uaa77"],
        "R": [u"ြ", u"ြ", u"ြ"],
        "S": [u"꩷", u"꩷", u"꩷"],
        "T": [u"\u1039\u1010", u"\u1039\u1010", u"\u1039\u1010"],
        # TODO: Resolve V for Aiton
        "U": [u"\u1030", u"\u1030", u"\u1030"],
        "V": ["", "", "\u1030"],
        "W": [u"ွ်", u"ွ်", u"ွ်"],
        "X": [u"ႜ", u"ႜ", u"ႜ"],
        "Y": [u"ျ", u"ျ", u"ျ"],
        "Z": [u"ၞ", u"ၞ", u"ၞ"],
        "a": [u"ႃ", u"ႃ", u"ႃ"],
        "b": [u"ပ", u"ပ", u"ပ"],
        "c": [u"ꩡ", u"ꩡ", u"ꩡ"],
        "d": [u"ဒ", u"ဒ", u"ဒ"],
        "e": [u"ေ", u"ေ", u"ေ"],
        "f": [u"ၸ", u"ၸ", u"ၸ"],
        "g": [u"င", u"င", u"င"],
        "h": [u"\uaa6d", u"\uaa6d", u"\uaa6d"],
        "i": [u"ိ", u"ိ", u"ိ"],
        "j": [u"\u109d", u"\u109d", u"\u109d"],
        "k": [u"က", u"က", u"က"],
        "l": [u"လ", u"လ", u"လ"],
        "m": [u"မ", u"မ", u"မ"],
        "n": [u"ꩫ", u"ꩫ", u"ꩫ"],
        "o": [u"ွ", u"ွ", u"ွ"],
        "p": [u"ပ", u"ပ", u"ပ"],
        "q": [u"်", u"်", u"်"],
        "r": [u"\uAA7A", u"\uAA7A", u"\uAA7A"],
        "s": [u"\uaa6c", u"\uaa6c", u"\uaa6c"],
        "t": [u"တ", u"တ", u"တ"],
        "u": [u"ု", u"ု", u"ု"],
        "v": [u"ထ", u"ထ", u"ထ"],
        "w": [u"ဝ", u"ဝ", u"ဝ"],
        "x": [u"ၵ", u"ၵ", u"ၵ"],
        "y": [u"ယ", u"ယ", u"ယ"],
        "z": [u"ႃ", u"ႃ", u"ႃ"],
        "@": [u"", u"", u"\u1092"],
        "(": ["(", "(", u", "],
        ")": [")", ")", u", "],
        "/": [u"\u104b", u"\u104b", u"\u104b"],
        "\\": [u"\u104a", u"\u104a", u"\u104a"],
        "[": [u"\u103c", u"\u103c", u"\u103c"],
        "|": [u"\u103c", u"\u103c", u"\u1039\u101c"],
        "]": [u"\u103c", u"\u103c", "\u103c"],
        "{": [u"\u103c", u"\u103c", "\u103c"],
        "}": [u"\u103a\u103d", u"\u103a\u103d", u"\u106c"],
        "~": [u"", u"", u"\u1039\u101a"],
        "1": [u"၁", u"၁", u"၁"],
        "2": [u"၂", u"၂", u"၂"],
        "3": [u"၃", u"၃", u"၃"],
        "4": [u"၄", u"၄", u"၄"],
        "5": [u"၅", u"၅", u"၅"],
        "6": [u"၆", u"၆", u"၆"],
        "7": [u"၇", u"၇", u"၇"],
        "8": [u"၈", u"၈", u"၈"],
        "9": [u"၉", u"၉", u"၉"],
        "0": [u"၀", u"၀", u"၀"],
        " ": [u"\u0020", u"\u0020", u"\u0020"],
        "#": [u"\u1036", u"\u1036", u"\u1036"],
        "$": [u"\u102e", u"\u102e", u"\u102e"],
        "^": [u"\u102c", u"\u102c", u"\u102c"],
        "_": [u"\u103a\u105e", u"\u103a\u105e", u"\u103a\u105e"],
        "%": [u"\u00a0\u103a", u"\u00a0\u103a", u"\u00a0\u103a"],
        "&": [u"\u00a0\u109d", u"\u00a0\u109d", u"\u00a0\u109d"],
        "`": ["", "",  u"\u1039ꩡ"],
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
        # TODO: Remove the test
        if textIn.find('yW ka / kW tX') >= 0:
          x = 1

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
            convertList.append(self.convertString(item[0], tags, fontIndex, convertToLower))

        return u''.join(convertList)

    def convertString(self, textIn, fontInfo, fontIndex, convertToLower=False):
      # type: (object, object, object) -> object
      convertedList = []
      convertResult = u''

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
