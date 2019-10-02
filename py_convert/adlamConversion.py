# -*- coding: utf-8 -*-
# !/usr/bin/env python

# Convert Adlam encoded text to Unicode.
from __future__ import print_function


class converter():
    private_use_map = {
        'arab': {
            u'\u0628': u'\uD83A\uDD00',
            u'\u062a': u'\uD83A\uDD01',
            u'\u062b': u'\uD83A\uDD02',
            u'\u062c': u'\uD83A\uDD03',
            u'\u062d': u'\uD83A\uDD04',
            u'\u062e': u'\uD83A\uDD05',
            u'\u0633': u'\uD83A\uDD06',
            u'\u0634': u'\uD83A\uDD07',
            u'\u0635': u'\uD83A\uDD08',
            u'\u0636': u'\uD83A\uDD09',
            u'\u0637': u'\uD83A\uDD0a',
            u'\u0638': u'\uD83A\uDD0b',
            u'\u0639': u'\uD83A\uDD0c',
            u'\u063a': u'\uD83A\uDD0d',
            u'\u0640': u'\uD83A\uDD0e',
            u'\u0641': u'\uD83A\uDD0e',
            u'\u0642': u'\uD83A\uDD0f',
            u'\u0643': u'\uD83A\uDD10',
            u'\u0644': u'\uD83A\uDD11',
            u'\u0645': u'\uD83A\uDD12',
            u'\u0646': u'\uD83A\uDD13',
            u'\u064a': u'\uD83A\uDD14',
            u'\u067b': u'\uD83A\uDD15',
            u'\u067e': u'\uD83A\uDD16',
            u'\u0683': u'\uD83A\uDD17',
            u'\u0684': u'\uD83A\uDD18', # ??
            u'\u0686': u'\uD83A\uDD19',
            u'\u0687': u'\uD83A\uDD1a',
            u'\u06a8': u'\uD83A\uDD1b',
            u'\u06af': u'\uD83A\uDD04',

            # Diacritics
            u'\u0640': u'\uD83A\uDD46', # ?? Maybe underscore?
            u'\u064b': u'\uD83A\uDD4a',
            u'\u064c': u'\uD83A\uDD46',
            u'\u064d': u'\uD83A\uDD45',
            u'\u064e': u'\uD83A\uDD44',
            u'\u064f': u'\u0027', # TBD: maybe Farsi apostrophe joiner
            u'\u0650': u'\uD83A\uDD48',
            u'\u0651': u'\uD83A\uDD47',
            u'\u0655': u'\uD83A\uDD00', # TBD
            u'\u0658': u'\uD83A\uDD00', # TBD
            u'\u0659': u'\uD83A\uDD44', # TBD
            u'\u065d': u'\uD83A\uDD44',
            u'\u065e': u'\uD83A\uDD44',
            u'\u06b3': u'\uD83A\uDD45',

            # Digits
            u'\u0660': u'\uD83A\uDD50',
            u'\u0661': u'\uD83A\uDD51',
            u'\u0662': u'\uD83A\uDD52',
            u'\u0663': u'\uD83A\uDD53',
            u'\u0664': u'\uD83A\uDD54',
            u'\u0665': u'\uD83A\uDD55',
            u'\u0666': u'\uD83A\uDD56',
            u'\u0667': u'\uD83A\uDD57',
            u'\u0668': u'\uD83A\uDD58',
            u'\u0669': u'\uD83A\uDD59',

            # Punctuation & space
            u'\u0601': u'\uD83A\uDD5e', # Question mark
            u'\u060c': u'\u060c',
            u'\u060b': u'⁏',
            u',': u'⹁',
            u';': u'⁏',
            u' ': u' ',
            u'،': u'،',

            u'\u00c0': u'\u0027', # Simple apostrophe
            u'\u00c3': u'\u2022',
            u'\u00eb': u'\u2022',
            u'\u00ed': u'\u0027',
            u'\u00f8': u'\uD83A\uDD905',
            u'\u00f9': u'\u2022',
            u'\u0153': u'\uD83A\uDD909',
            u'\u0178': u'\uD83A\uDD914',
            u'\u0192': u'\uD83A\uDD900',
            u'\u0301': u'\u0027',
            u'\u03c0': u'\uD83A\uDD14',
            u'\u0394': u'\uD83A\uDD01',
            u'\u201d': u'\uD83A\uDD903',
            u'\u2126': u'\uD83A\uDD90b',
            u'\u2211': u'\uD83A\uDD909',
            u'\u2248': u'\uD83A\uDD90a',
            u'\ufefe': u'\uD83A\uDD944',
          },
        'latn': {
            'A': '𞤀',
            'a': '𞤢',
            'AA': '𞤀𞥄',
            'Aa': '𞤀𞥄',
            'aa': '𞤢𞥄',
            'B': '𞤄',
            'b': '𞤦',
            'BB': '𞤄𞥆',
            'Bb': '𞤄𞥆',
            'bb': '𞤦𞥆',
            'Ɓ': '𞤇',
            'ɓ': '𞤩',
            'ƁƁ': '𞤇𞥆',
            'Ɓɓ': '𞤇𞥆',
            'ɓƁ': '𞤩𞥆',
            'ɓɓ': '𞤩𞥆',
            'BH': '𞤇',
            'Bh': '𞤇',
            'BBH': '𞤇𞥆',
            'Bbh': '𞤇𞥆',
            'bh': '𞤩',
            'bbh': '𞤩𞥆',
            'C': '𞤕',
            'c': '𞤷',
            'CC': '𞤕𞥆',
            'Cc': '𞤕𞥆',
            'cc': '𞤷𞥆',
            'D': '𞤁',
            'd': '𞤣',
            'DD': '𞤁𞥆',
            'Dd': '𞤁𞥆',
            'dd': '𞤣𞥆',
            'Ɗ': '𞤍',
            'ɗ': '𞤯',
            'ƊƊ': '𞤍𞥆',
            'Ɗɗ': '𞤍𞥆',
            'ɗɗ': '𞤯𞥆',
            'DH': '𞤍',
            'Dh': '𞤍',
            'dH': '𞤯',
            'dh': '𞤯',
            'DDH': '𞤍𞥆',
            'Ddh': '𞤍𞥆',
            'ddh': '𞤯𞥆',
            'E': '𞤉',
            'e': '𞤫',
            'EE': '𞤉𞥅',
            'Ee': '𞤉𞥅',
            'ee': '𞤫𞥅',
            'F': '𞤊',
            'f': '𞤬',
            'FF': '𞤊𞥆',
            'Ff': '𞤊𞥆',
            'ff': '𞤬𞥆',
            'G': '𞤘',
            'g': '𞤺',
            'GG': '𞤘𞥆',
            'Gg': '𞤘𞥆',
            'gg': '𞤺𞥆',
            'GB': '𞤞',
            'gb': '𞥀',
            'GGB': '𞤞𞥆',
            'Ggb': '𞤞𞥆',
            'ggb': '𞥀𞥆',
            'H': '𞤖',
            'h': '𞤸',
            'HH': '𞤖𞥆',
            'Hh': '𞤖𞥆',
            'hh': '𞤸𞥆',
            'I': '𞤋',
            'i': '𞤭',
            'II': '𞤋𞥅',
            'Ii': '𞤋𞥅',
            'ii': '𞤭𞥅',
            'J': '𞤔',
            'j': '𞤶',
            'JJ': '𞤔𞥆',
            'Jj': '𞤔𞥆',
            'jj': '𞤶𞥆',
            'K': '𞤑',
            'k': '𞤳',
            'KK': '𞤑𞥆',
            'Kk': '𞤑𞥆',
            'kk': '𞤳𞥆',
            'KH': '𞤝',
            'kh': '𞤿',
            'KKH': '𞤝𞥆',
            'Kkh': '𞤝𞥆',
            'kkh': '𞤿𞥆',
            'X': '𞤝',
            'x': '𞤿',
            'XX': '𞤝𞥆',
            'Xx': '𞤝𞥆',
            'xx': '𞤿𞥆',
            'L': '𞤂',
            'l': '𞤤',
            'LL': '𞤂𞥆',
            'Ll': '𞤂𞥆',
            'll': '𞤤𞥆',
            'M': '𞤃',
            'm': '𞤥',
            'MM': '𞤃𞥆',
            'Mm': '𞤃𞥆',
            'mm': '𞤥𞥆',
            'N': '𞤐',
            'n': '𞤲',
            'NN': '𞤐𞥆',
            'Nn': '𞤐𞥆',
            'nn': '𞤲𞥆',
            'Ŋ': '𞤛',
            'ŋ': '𞤽',
            'ŊŊ': '𞤛𞥆',
            'Ŋŋ': '𞤛𞥆',
            'ŋŋ': '𞤽𞥆',
            'NH': '𞤛',
            'Nh': '𞤛',
            'nH': '𞤽',
            'nh': '𞤽',
            'NNH': '𞤛𞥆',
            'Nnh': '𞤛𞥆',
            'nnh': '𞤽𞥆',
            'Ñ': '𞤙',
            'ñ': '𞤻',
            'ÑÑ': '𞤙𞥆',
            'Ññ': '𞤙𞥆',
            'ññ': '𞤻𞥆',
            'NY': '𞤙',
            'ny': '𞤻',
            'NNY': '𞤙𞥆',
            'Nny': '𞤙𞥆',
            'nny': '𞤻𞥆',
            'O': '𞤌',
            'o': '𞤮',
            'OO': '𞤌𞥅',
            'Oo': '𞤌𞥅',
            'oo': '𞤮𞥅',
            'P': '𞤆',
            'p': '𞤨',
            'PP': '𞤆𞥆',
            'Pp': '𞤆𞥆',
            'pp': '𞤨𞥆',
            'KP': '𞤠',
            'kp': '𞥂',
            'KKP': '𞤠𞥆',
            'Kkp': '𞤠𞥆',
            'kkp': '𞥂𞥆',
            'Q': '𞤗',
            'q': '𞤹',
            'QQ': '𞤗𞥆',
            'Qq': '𞤗𞥆',
            'qq': '𞤹𞥆',
            'GH': '𞤗',
            'gh': '𞤹',
            'GGH': '𞤗𞥆',
            'Ggh': '𞤗𞥆',
            'ggh': '𞤹𞥆',
            'R': '𞤈',
            'r': '𞤪',
            'RR': '𞤈𞥆',
            'Rr': '𞤈𞥆',
            'rr': '𞤪𞥆',
            'S': '𞤅',
            's': '𞤧',
            'SS': '𞤅𞥆',
            'Ss': '𞤅𞥆',
            'ss': '𞤧𞥆',
            'SH': '𞤡',
            'Sh': '𞤡',
            'sh': '𞥃',
            'sH': '𞥃',
            'SSH': '𞤡𞥆',
            'Ssh': '𞤡𞥆',
            'ssh': '𞥃𞥆',
            'T': '𞤚',
            't': '𞤼',
            'TT': '𞤚𞥆',
            'Tt': '𞤚𞥆',
            'tt': '𞤼𞥆',
            'U': '𞤓',
            'u': '𞤵',
            'UU': '𞤓𞥅',
            'Uu': '𞤓𞥅',
            'uu': '𞤵𞥅',
            'V': '𞤜',
            'v': '𞤾',
            'VV': '𞤜𞥆',
            'Vv': '𞤜𞥆',
            'vv': '𞤾𞥆',
            'W': '𞤏',
            'w': '𞤱',
            'WW': '𞤏𞥆',
            'Ww': '𞤏𞥆',
            'ww': '𞤱𞥆',
            'Y': '𞤒',
            'y': '𞤴',
            'YY': '𞤒𞥆',
            'Yy': '𞤒𞥆',
            'yy': '𞤴𞥆',
            'Ƴ': '𞤎',
            'ƴ': '𞤰',
            'ƳƳ': '𞤎𞥆',
            'Ƴƴ': '𞤎𞥆',
            'ƴƴ': '𞤰𞥆',
            'YH': '𞤎',
            'yh': '𞤰',
            'YYH': '𞤎𞥆',
            'Yyh': '𞤎𞥆',
            'yyh': '𞤰𞥆',
            'Z': '𞤟',
            'z': '𞥁',
            'ZZ': '𞤟𞥆',
            'Zz': '𞤟𞥆',
            'zz': '𞥁𞥆',
            'ND': "𞤐'𞤁",
            'Nd': "𞤐'𞤁",
            'nd': "𞤲'𞤣",
            'MB': "𞤐'𞤄",
            'Mb': "𞤐'𞤄",
            'mb': "𞤲'𞤦",
            'NJ': "𞤐'𞤔",
            'Nj': "𞤐'𞤔",
            'nj': "𞤲'𞤶",
            'NG': "𞤐'𞤘",
            'Ng': "𞤐'𞤘",
            'ng': "𞤲'𞤺",
            'nnd': '𞤲𞤣',
            'mmb': '𞤥𞤦',
            'nnj': '𞤲𞤶',
            'nng': '𞤲𞤺',
            '0': '𞥐',
            '1': '𞥑',
            '2': '𞥒',
            '3': '𞥓',
            '4': '𞥔',
            '5': '𞥕',
            '6': '𞥖',
            '7': '𞥗',
            '8': '𞥘',
            '9': '𞥙',
            '.': '.',
            ',': '⹁',
            ';': '⁏'
            ,'?': '\u061f',
        },

    }
    description = 'Converts Adlam font encoding to Unicode'

    # Converts upper case characters to lower
    def toLower(self, inText):
        # TODO: make this work.
        return inText  # Standard Unicode conversion.

    def toSentenceCase(self, inText):
        # TODO: Capitalize first.
        # TODO: Handle initial question and exclamation marks.
        inText.encode('utf-8') .lower() # Standard Unicode conversion.
        return inText

    def __init__(self, oldFontList, newFont=None, defaultOutputFont=None):
        self.debug = True  #False
        self.lower_mode = True
        self.sentence_mode = True

        self.oldFonts = []
        self.encodingScripts = []  # If given, tells the Script of incoming characters
        # The fonts detected for conversion
        for item in oldFontList:
          if isinstance(item, list):
            self.oldFonts.append(item[0])
            self.encodingScripts.append(item[1])
          else:
            self.oldFonts.append(item)
        # Name of the substitute Unicode font, if provided

        if newFont:
            self.unicodeFont = newFont
        else:
            self.unicodeFont = defaultOutputFont

    # Consider the font information if relevant, e.g., underlining.
    # fontInfo: a list of font data for this code, including formatting for each piece.
    def convertText(self, textIn, convertToLower=False, fontTextInfo=None, fontIndex=0):
        if not isinstance(textIn, basestring):
           return textIn

        convertToLower = self.lower_mode

        # This is the choice in the list of conversion data.
        encoding = self.encodingScripts[fontIndex]
        encoding_map = self.private_use_map[encoding]
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
            convertList.append(self.convertString(item[0], tags, convertToLower, encoding_map))

        print('***** CONVERT LIST = %s' % u''.join(convertList).encode('utf-8'))

        return u''.join(convertList)

    def convertString(self, textIn, fontInfo, convertToLower=False, encoding_map=private_use_map):
        # type: (object, object, object) -> object
        convertedList = []
        convertResult = u''

        if self.debug:
          print('$$$$$ text = %s, fontInfo = %s' % (textIn, fontInfo))

        for index in xrange(len(textIn)):
          c = textIn[index];
          # Special handling if needed

          out = c
          if c in encoding_map:
            out = encoding_map[c]
          else:
            if self.debug:
              print('----- character %s (0x%x) not found' % (c, ord(c)))

          # Special case for handling underlined text
          convertedList.append(out)
          if fontInfo and 'u' in fontInfo:
            convertedList.append(self.combiningLowerLine)

        convertResult = u''.join(convertedList)

        if convertToLower:
          lowerResult = self.toLower(convertResult)
          if lowerResult != convertResult:
            convertResult = lowerResult

        if self.debug:
          print('!!!!!!!!!!!!! convertedList = %s' % convertResult)

        return convertResult


# TODO: Test more Adlam text!
def testConvert():
  # Debug!
  testcases = {
    'latn': [
      ['KAALDEN GOONGA : “Maa laaɓ, ñamlel ko joɓel!',
        "𞥞 𞤑𞤀𞥄𞤂𞤁𞤉𞤐 𞤘𞤌𞥅𞤐'𞤘𞤀 : “𞤃𞤢𞥄 𞤤𞤢𞥄𞤩⹁ 𞤻𞤢𞤥𞤤𞤫𞤤 𞤳𞤮 𞤶𞤮𞤩𞤫𞤤!"],
      ],
    'arab': [
    ["قظكتضكتضك يبكڄضك ض پ‍بث‍‌ب سنث‍بص",
     "‮𞤏𞤭𞤲𞤣𞤫𞤲𞤣𞤫𞤲 𞤶𞤢𞤲𞤺𞤫𞤲 𞤫 𞤸‍𞤢𞤤‍‌𞤢 𞤨𞤵𞤤‍𞤢𞤪"],
    ]
  }


  adlamConverter = converter()
  result = adlamConverter.oldEncodingToUnicode(oldOneText[0][0], fontTextInfo=oldOneText)

  if result != expected:
    print('Old text = %s' % oldOneText.encode('utf-8'))
    print ('** Not converting Old text: expected(%d) >%s<. Result(%d) = >%s<' % (
      len(expected), expected, len(result), result))
  else:
    print ('  * PASSES *')


def main():
  testConvert()


if __name__ == '__main__':
  main()
