# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Chakmak encoded text to Unicode.

debug = True  #False

# Mappings for both arjyban, sujoyan, alaam, etc. encodings.
FONTS_TO_CONVERT = {
    'Times New Roman Navajo': 0,
    'Verdana Navajo': 1,
    'Century Gothic Navajo': 2,
    }

class converter():
    private_use_map = {
        u'\u0020': [u'\u0020', u'\u0020', u'\u0020'],
        u'\u0021': [u'\u00c1', u'\u00c1', u'\u00c1'],
        u'\u0022': ['\"', '\"', '\"'],
        u'\u0023': [u'\u0104\u0328', u'\u0104\u0328', u'\u0104\u0328'],
        u'\u0024': [u'\u00c9', u'\u00c9', u'\u00c9'],
        u'\u0025': [u'\u0118', u'\u0118', u'\u0118'],
        u'\u0026': [u'\u00cd', u'\u00cd', u'\u00cd'],
        u'\u0027': ['\\', '\\', '\\'],
        u'\u0028': [u'\u00cd\u0328', u'\u00cd\u0328', u'\u00cd\u0328'],
        u'\u0029': [u'\u00d3', u'\u00d3', u'\u00d3'],
        u'\u002a': ['I\u0328', 'I\u0328', 'I\u0328'],
        u'\u002b': [u'\u00d3\u0328', u'\u00d3\u0328', u'\u00d3\u0328'],
        u'\u002c': [',', ',', ','],
        u'\u002d': ['o\u0328', 'o\u0328', 'o\u0328'],
        u'\u002e': ['.', '.', '.'],
        u'\u002f': ['/', '/', '/'],

        u'\u0030': [u'\u00f3', u'\u00f3', u'\u00f3'],
        u'\u0031': [u'\u00e1', u'\u00e1', u'\u00e1'],
        u'\u0032': [u'\u0105', u'\u0105', u'\u0105'],
        u'\u0033': [u'\u00e1\u0328', u'\u00e1\u0328', u'\u00e1\u0328'],
        u'\u0034': [u'\u00e9', u'\u00e9', u'\u00e9'],
        u'\u0035': ['e\u0328', 'e\u0328', 'e\u0328'],
        u'\u0036': [u'\u00e9\u0328', u'\u00e9\u0328', u'\u00e9\u0328'],
        u'\u0037': [u'\u00ed', u'\u00ed', u'\u00ed'],
        u'\u0038': ['i\u0328', 'i\u0328', 'i\u0328'],
        u'\u0039': [u'\u00ed\u0328', u'\u00ed\u0328', u'\u00ed\u0328'],
        u'\u003d': [u'\u00f3\u0328', u'\u00f3\u0328', u'\u00f3\u0328'],
        u'\u0040': [u'\u0104', u'\u0104', u'\u0104'],

        u'\u005b': [u'\u0142', u'\u0142', u'\u0142'],
        u'\u005c': ['\\', '\\', '\\'],
        u'\u005d': [u'\u0144', u'\u0144', u'\u0144'],
        u'\u005e': [u'\u00c9\u0328', u'\u00c9\u0328', u'\u00c9\u0328'],
        u'\u005f': ['O\u0328', 'O\u0328', 'O\u0328'],

        u'\u007b': [u'\u0141', u'\u0141', u'\u0141'],
        u'\u007c': ['|', '|', '|'],
        u'\u007d': [u'\u0143', u'\u0143', u'\u0143'],
        u'\u007e': ['~', '~', '~'],
    }
    description = 'Converts Navajo font encodings to Unicode'

    oldFonts = FONTS_TO_CONVERT.keys()
    # Converts Navajo upper case characters
    def toLower(self, inText):
      inText.lower().encode('utf-8')  # Standard Unicode conversion.
      return inText

    def __init__(self, oldFontList, newFont=None):
      self.debug = True
      # The fonts detected for conversion
      self.oldFonts = oldFontList
      # Name of the substitute Unicode font, if provided

      if newFont:
          self.unicodeFont = newFont
      else:
          self.unicodeFont = 'Times New Roman'

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
               print('++ text = %s' % item[0])

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
            convertList.append(self.convertString(item[0], tags, fontIndex, convertToLower))

        print('***** CONVERT LIST = %s' % u''.join(convertList).encode('utf-8'))

        return u''.join(convertList)

    def convertString(self, textIn, fontInfo, fontIndex, convertToLower=False):
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
            out = self.private_use_map[c][fontIndex]
          else:
            if self.debug:
              print('----- character %s (%s) not found' %
                    (c, ord(c)))

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
          print('!!!!!!!!!!!!! convertedResult = %s' % convertResult)

        return convertResult

def testConvert():
  return


def main():
  testConvert()


if __name__ == '__main__':
    main()
