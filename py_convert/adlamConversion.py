 # -*- coding: utf-8 -*-
# !/usr/bin/env python3

# Convert Adlam encoded text to Unicode.
from __future__ import absolute_import, division, print_function

import re
import sys

from converterBase import ConverterBase

FONTS_TO_CONVERT = [
  ['Fulfulde - Aissata', 'arab'],
  ['Fulfulde - Fuuta', 'arab'],
  ['Fulfulde - Pulaar', 'arab'],
  ['Times New Roman', 'latn'],
]

thisDefaultOutputFont = 'Noto Sans Adlam'


class converter(ConverterBase):
#class converter():
    private_use_map = {
        'arab': {
            u'\u0628': u'\U0001e900',
            u'\u062a': u'\U0001e901',
            u'\u062b': u'\U0001e902',
            u'\u062c': u'\U0001e903',
            u'\u062d': u'\U0001e904',
            u'\u062e': u'\U0001e905',
            u'\u0633': u'\U0001e906',
            u'\u0634': u'\U0001e907',
            u'\u0635': u'\U0001e908',
            u'\u0636': u'\U0001e909',
            u'\u0637': u'\U0001e90a',
            u'\u0638': u'\U0001e90b',
            u'\u0639': u'\U0001e90c',
            u'\u063a': u'\U0001e90d',
            u'\u0640': u'\U0001e90e',
            u'\u0641': u'\U0001e90e',
            u'\u0642': u'\U0001e90f',
            u'\u0643': u'\U0001e910',
            u'\u0644': u'\U0001e911',
            u'\u0645': u'\U0001e912',
            u'\u0646': u'\U0001e913',
            u'\u064a': u'\U0001e914',
            u'\u067b': u'\U0001e915',
            u'\u067e': u'\U0001e916',
            u'\u0683': u'\U0001e917',
            u'\u0684': u'\U0001e918', # ??
            u'\u0686': u'\U0001e919',
            u'\u0687': u'\U0001e91a',
            u'\u06a8': u'\U0001e91b',
            u'\u06af': u'\U0001e904',

            # Diacritics
            u'\u0640': u'\U0001e946', # ?? Maybe underscore?
            u'\u064b': u'\U0001e94a',
            u'\u064c': u'\U0001e946',
            u'\u064d': u'\U0001e945',
            u'\u064e': u'\U0001e944',
            u'\u064f': u'\u0027', # TBD: maybe Farsi apostrophe joiner
            u'\u0650': u'\U0001e948',
            u'\u0651': u'\U0001e947',
            u'\u0655': u'\U0001e900', # TBD
            u'\u0658': u'\U0001e900', # TBD
            u'\u0659': u'\U0001e944', # TBD
            u'\u065d': u'\U0001e944',
            u'\u065e': u'\U0001e944',
            u'\u06b3': u'\U0001e945',

            # Digits
            u'\u0660': u'\U0001e950',
            u'\u0661': u'\U0001e951',
            u'\u0662': u'\U0001e952',
            u'\u0663': u'\U0001e953',
            u'\u0664': u'\U0001e954',
            u'\u0665': u'\U0001e955',
            u'\u0666': u'\U0001e956',
            u'\u0667': u'\U0001e957',
            u'\u0668': u'\U0001e958',
            u'\u0669': u'\U0001e959',

            # Punctuation & space
            u'\u0601': u'!',  # \U0001e95e' Initial Question mark
            u'\u060c': u'\u060c',
            u'\u060b': u'⁏',
            u',': u'⹁',
            u';': u'⁏',
            u' ': u' ',
            u'،': u'،',
            ':': ':',
            '!': '!',
            '?': '?',
            ')': ')',
            '(': '(',
            '-': '-',
            '.': '.',
            '؟': '?',
            '⹁': '⹁',
            '/': '/',
            '\u204f': ',',  # Should this be different?

            u'\u00c0': u'\u0027', # Simple apostrophe
            u'\u00c3': u'\u2022',
            u'\u00eb': u'\u2022',
            u'\u00ed': u'\u0027',
            u'\u00f8': u'\U0001e9905',
            u'\u00f9': u'\u2022',
            u'\u0153': u'\U0001e9909',
            u'\u0178': u'\U0001e9914',
            u'\u0192': u'\U0001e9900',
            u'\u0301': u'\u0027',
            u'\u03c0': u'\U0001e914',
            u'\u0394': u'\U0001e901',
            u'\u200c': u'',  # Not needed in Adlam
            u'\u200d': u'',  # Not needed in Adlam
            u'\u201c': u'\u201c',
            u'\u201d': u'\u201d',
            u'\u2126': u'\U0001e990b',
            u'\u2211': u'\U0001e9909',
            u'\u2248': u'\U0001e990a',
            u'\ufefe': u'\U0001e9944',
            u'\U0001E94B': u'\U0001E94B',
        },
        'latn': {
            ' ': u' ',
            'A': u'𞤀',
            'a': u'𞤢',
            'AA': u'𞤀𞥄',
            'Aa': u'𞤀𞥄',
            'aa': u'𞤢𞥄',
            'B': u'𞤄',
            'b': u'𞤦',
            'BB': u'𞤄𞥆',
            'Bb': u'𞤄𞥆',
            'bb': u'𞤦𞥆',
            'Ɓ': u'𞤇',
            'ɓ': u'𞤩',
            'ƁƁ': u'𞤇𞥆',
            'Ɓɓ': u'𞤇𞥆',
            'ɓƁ': u'𞤩𞥆',
            'ɓɓ': u'𞤩𞥆',
            'BH': u'𞤇',
            'Bh': u'𞤇',
            'BBH': u'𞤇𞥆',
            'Bbh': u'𞤇𞥆',
            'bh': u'𞤩',
            'bbh': u'𞤩𞥆',
            'C': u'𞤕',
            'c': u'𞤷',
            'CC': u'𞤕𞥆',
            'Cc': u'𞤕𞥆',
            'cc': u'𞤷𞥆',
            'D': u'𞤁',
            'd': u'𞤣',
            'DD': u'𞤁𞥆',
            'Dd': u'𞤁𞥆',
            'dd': u'𞤣𞥆',
            'Ɗ': u'𞤍',
            'ɗ': u'𞤯',
            'ƊƊ': u'𞤍𞥆',
            'Ɗɗ': u'𞤍𞥆',
            'ɗɗ': u'𞤯𞥆',
            'DH': u'𞤍',
            'Dh': u'𞤍',
            'dH': u'𞤯',
            'dh': u'𞤯',
            'DDH': u'𞤍𞥆',
            'Ddh': u'𞤍𞥆',
            'ddh': u'𞤯𞥆',
            'E': u'𞤉',
            'e': u'𞤫',
            'EE': u'𞤉𞥅',
            'Ee': u'𞤉𞥅',
            'ee': u'𞤫𞥅',
            'F': u'𞤊',
            'f': u'𞤬',
            'FF': u'𞤊𞥆',
            'Ff': u'𞤊𞥆',
            'ff': u'𞤬𞥆',
            'G': u'𞤘',
            'g': u'𞤺',
            'GG': u'𞤘𞥆',
            'Gg': u'𞤘𞥆',
            'gg': u'𞤺𞥆',
            'GB': u'𞤞',
            'gb': u'𞥀',
            'GGB': u'𞤞𞥆',
            'Ggb': u'𞤞𞥆',
            'ggb': u'𞥀𞥆',
            'H': u'𞤖',
            'h': u'𞤸',
            'HH': u'𞤖𞥆',
            'Hh': u'𞤖𞥆',
            'hh': u'𞤸𞥆',
            'I': u'𞤋',
            'i': u'𞤭',
            'II': u'𞤋𞥅',
            'Ii': u'𞤋𞥅',
            'ii': u'𞤭𞥅',
            'J': u'𞤔',
            'j': u'𞤶',
            'JJ': u'𞤔𞥆',
            'Jj': u'𞤔𞥆',
            'jj': u'𞤶𞥆',
            'K': u'𞤑',
            'k': u'𞤳',
            'KK': u'𞤑𞥆',
            'Kk': u'𞤑𞥆',
            'kk': u'𞤳𞥆',
            'KH': u'𞤝',
            'kh': u'𞤿',
            'KKH': u'𞤝𞥆',
            'Kkh': u'𞤝𞥆',
            'kkh': u'𞤿𞥆',
            'X': u'𞤝',
            'x': u'𞤿',
            'XX': u'𞤝𞥆',
            'Xx': u'𞤝𞥆',
            'xx': u'𞤿𞥆',
            'L': u'𞤂',
            'l': u'𞤤',
            'LL': u'𞤂𞥆',
            'Ll': u'𞤂𞥆',
            'll': u'𞤤𞥆',
            'M': u'𞤃',
            'm': u'𞤥',
            'MM': u'𞤃𞥆',
            'Mm': u'𞤃𞥆',
            'mm': u'𞤥𞥆',
            'N': u'𞤐',
            'n': u'𞤲',
            'NN': u'𞤐𞥆',
            'Nn': u'𞤐𞥆',
            'nn': u'𞤲𞥆',
            'Ŋ': u'𞤛',
            'ŋ': u'𞤽',
            'ŊŊ': u'𞤛𞥆',
            'Ŋŋ': u'𞤛𞥆',
            'ŋŋ': u'𞤽𞥆',
            'NH': u'𞤛',
            'Nh': u'𞤛',
            'nH': u'𞤽',
            'nh': u'𞤽',
            'NNH': u'𞤛𞥆',
            'Nnh': u'𞤛𞥆',
            'nnh': u'𞤽𞥆',
            'Ñ': u'𞤙',
            'ñ': u'𞤻',
            'ÑÑ': u'𞤙𞥆',
            'Ññ': u'𞤙𞥆',
            'ññ': u'𞤻𞥆',
            'NY': u'𞤙',
            'ny': u'𞤻',
            'NNY': u'𞤙𞥆',
            'Nny': u'𞤙𞥆',
            'nny': u'𞤻𞥆',
            'O': u'𞤌',
            'o': u'𞤮',
            'OO': u'𞤌𞥅',
            'Oo': u'𞤌𞥅',
            'oo': u'𞤮𞥅',
            'P': u'𞤆',
            'p': u'𞤨',
            'PP': u'𞤆𞥆',
            'Pp': u'𞤆𞥆',
            'pp': u'𞤨𞥆',
            'KP': u'𞤠',
            'kp': u'𞥂',
            'KKP': u'𞤠𞥆',
            'Kkp': u'𞤠𞥆',
            'kkp': u'𞥂𞥆',
            'Q': u'𞤗',
            'q': u'𞤹',
            'QQ': u'𞤗𞥆',
            'Qq': u'𞤗𞥆',
            'qq': u'𞤹𞥆',
            'GH': u'𞤗',
            'gh': u'𞤹',
            'GGH': u'𞤗𞥆',
            'Ggh': u'𞤗𞥆',
            'ggh': u'𞤹𞥆',
            'R': u'𞤈',
            'r': u'𞤪',
            'RR': u'𞤈𞥆',
            'Rr': u'𞤈𞥆',
            'rr': u'𞤪𞥆',
            'S': u'𞤅',
            's': u'𞤧',
            'SS': u'𞤅𞥆',
            'Ss': u'𞤅𞥆',
            'ss': u'𞤧𞥆',
            'SH': u'𞤡',
            'Sh': u'𞤡',
            'sh': u'𞥃',
            'sH': u'𞥃',
            'SSH': u'𞤡𞥆',
            'Ssh': u'𞤡𞥆',
            'ssh': u'𞥃𞥆',
            'T': u'𞤚',
            't': u'𞤼',
            'TT': u'𞤚𞥆',
            'Tt': u'𞤚𞥆',
            'tt': u'𞤼𞥆',
            'U': u'𞤓',
            'u': u'𞤵',
            'UU': u'𞤓𞥅',
            'Uu': u'𞤓𞥅',
            'uu': u'𞤵𞥅',
            'V': u'𞤜',
            'v': u'𞤾',
            'VV': u'𞤜𞥆',
            'Vv': u'𞤜𞥆',
            'vv': u'𞤾𞥆',
            'W': u'𞤏',
            'w': u'𞤱',
            'WW': u'𞤏𞥆',
            'Ww': u'𞤏𞥆',
            'ww': u'𞤱𞥆',
            'Y': u'𞤒',
            'y': u'𞤴',
            'YY': u'𞤒𞥆',
            'Yy': u'𞤒𞥆',
            'yy': u'𞤴𞥆',
            'Ƴ': u'𞤎',
            'ƴ': u'𞤰',
            'ƳƳ': u'𞤎𞥆',
            'Ƴƴ': u'𞤎𞥆',
            'ƴƴ': u'𞤰𞥆',
            'YH': u'𞤎',
            'yh': u'𞤰',
            'YYH': u'𞤎𞥆',
            'Yyh': u'𞤎𞥆',
            'yyh': u'𞤰𞥆',
            'Z': u'𞤟',
            'z': u'𞥁',
            'ZZ': u'𞤟𞥆',
            'Zz': u'𞤟𞥆',
            'zz': u'𞥁𞥆',
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
            'nnd': u'𞤲𞤣',
            'mmb': u'𞤥𞤦',
            'nnj': u'𞤲𞤶',
            'nng': u'𞤲𞤺',
            '0': u'𞥐',
            '1': u'𞥑',
            '2': u'𞥒',
            '3': u'𞥓',
            '4': u'𞥔',
            '5': u'𞥕',
            '6': u'𞥖',
            '7': u'𞥗',
            '8': u'𞥘',
            '9': u'𞥙',
            '.': u'.',
            ',': u'⹁',
            ';': u'⁏'
            ,'?': u'\u061f',
            '?':  u'?',
            u'\u201c': u'\u201c',
            u'\u201d': u'\u201d',
            ':': ':',
            '!': '!',
            u'\U0001E94B': u'\U0001E94B',
        },
    }


    def __init__(self, oldFontList=FONTS_TO_CONVERT, newFont=None, defaultOutputFont=thisDefaultOutputFont):
        super().__init__(oldFontList, newFont=newFont, defaultOutputFont=defaultOutputFont)
        self.setScriptRange(0x1e900, 0x1e95f)
        self.setUpperCaseRange(0x1e900, 0x1e921)
        self.setLowerCaseRange(0x1e922, 0x1e943)
        self.description = 'Converts Adlam font encoding to Unicode'

        self.defaultOutputFont = "Noto Sans Adlam New"


        self.forceFont = True  # May be used to set all font fields to the Unicode font

        self.isRtl = True

        self.description = 'Converts Adlam font encoding to Unicode'
        self.ignore_start_of_sentence = re.compile(
            r'([\U0001E950-\U0001E959\u0020()\- ]+)')

        self.encoding = None
        self.debug = False  #False

        self.setLowerMode(True)
        self.setSentenceMode(True)

        self.end_of_sentence_pattern = re.compile(r'([\.\?\!\؟$])')

        # For inserting question and exclamation before sentences.
        self.pre_punctuation = {
            '?': '𞥟',
            '!': '𞥞',
            '؟': '𞥟',
        }

        if self.debug:
          print('OldFonts = %s' % self.oldFonts)
          print('encodingScripts = %s' % self.encodingScripts)
          print('unicodeFont = %s' % self.unicodeFont)
    # TODO: check input and conversion tables for Unicode NFC normalization.

    # Consider the font information if relevant, e.g., underlining.
    # fontInfo: a list of font data for this code, including formatting for each piece.
    def convertText(self, textIn, fontTextInfo=None, fontIndex=0):
        if self.debug:
            print('convertText index= %s, text = %s' % (fontIndex, textIn))
        self.encoding = self.encodingScripts[fontIndex]
        encoding_map = self.private_use_map[self.encoding]

        if not fontTextInfo:
            # Only raw text, without formatting or structure information.
            result = self.convertString(textIn, None, encoding_map)
            if self.debug:
                print('   convertText result= %s' % (result))
            return result

        # Take the data from the fontTextInfo field.
        convertList = []
        for item in fontTextInfo:
            tags = []
            for fmt in item[1]:
                loc = fmt.tag.find('}')
                tags.append(fmt.tag[loc + 1:])

            convertList.append(
                self.convertString(item[0], tags, encoding_map))
        if self.debug:
            print('  --> out  = %s' % ''.join(convertList))

        return ''.join(convertList)

    # Handles details of converting the text, including case conversion.
    def convertString(self, textIn, fontInfo,
                      conversion_map):
        # type: (object, object, object) -> object
        convertedList = []
        convertResult = ''

        if self.debug:
          print('$$$$$ text = %s, fontInfo = %s' %
                (textIn, fontInfo))  #fontInfo))
        for c in textIn:
          # Special handling if needed
          out = c
          if c in conversion_map:
            out = conversion_map[c]
          else:
            if self.debug:
              print('----- character %s (0x%x) not found' %
                    (c, ord(c)))

          # Special case for handling underlined text
          convertedList.append(out)

        convertResult = ''.join(convertedList)

        if self.lower_mode:
          convertResult = self.toLower(convertResult)

        return convertResult

    # Locate the sentence boundaries given a paragraph.
    # Sentences end with period followed by a space, a question mark, exclamation,
    # or end of text, but not 3 dots (ellipsis).
    def findSentencesInParagraph(self, paratext):
        sentences = paragraph().split('. ')
        return None  # To be finished!

    def checkContentsForMerge(self, text):
        if not text:
          return True
        # See if this text could be merged with the output.
        # If all the contents are in Adlam or punctuation of space, then it can be
        # merged within a font group
        ok_chars = ['\u0020', '.', ',', ';', ':', '[', ']', '{', '}', '⹁',
                    '⁏', '?', '\u061F', '(', ')', '/', '-', '_']
        for c in text:
            if not (c >= self.first and c <= self.last) and (
                c not in ok_chars):
                return False
        return True


    def computeSentenceStartsEnds(self, text):
         # Get all the positions of sentence endings
         all_sentence_ends = self.end_of_sentence_pattern.finditer(text)
         text_len = len(text)
         if not all_sentence_ends:
             # No sentence endings. Should first be capitalized?
             return None
         sentence_starts = [0]
         ignore_match = self.ignore_start_of_sentence.match(text)
         if ignore_match:
             sentence_starts[0] = ignore_match.end()
         sentence_ends = []
         for sentence_end in all_sentence_ends:
             # print(sentence_end)
             # Position and character of this sentence ending
             sentence_ends.append((sentence_end.start(), sentence_end.group(0)[0]))
             end_pos = sentence_end.end()
             while end_pos < text_len and (
                 text[end_pos] == ' ' or text[end_pos] == '\r'
                 or text[end_pos] == '\t' or text[end_pos] == '\n'):
                 end_pos += 1
             # Move the letter content
             #         self.ignore_start_of_sentence = re.compile(
             # r'([\U0001E950\U0001E959\u0020()]+)')
             start_pos = end_pos
             if start_pos < text_len:
                 ignore_match = self.ignore_start_of_sentence.match(text[start_pos:])
                 if ignore_match:
                     start_pos += ignore_match.end() - 1
             sentence_starts.append(start_pos)
         # The paragraph text ends a sentence
         sentence_ends.append((len(text)-1, '$'))
         return sentence_ends, sentence_starts

    def processXmlParagraphRuns(self, xml_runs):
        # Get paragraph text
        text_list = []
        for run in xml_runs:
            if run.text:
                text_list.append(run.text)
        para_text = ''.join(text_list)
        # Get the sentence ends and starts of this text
        sentence_ends, sentence_starts = \
            self.computeSentenceStartsEnds(para_text)

        # Get mappings of text in runs to paragraph text
        run_map = self.mapRunsToParagraphTextPosisions(xml_runs)

        # Process each sentence for capitalization and punctuation,
        # updating the runs.
        self.updateSentencesInRuns(xml_runs, run_map, sentence_starts, sentence_ends)
        return

    def mapRunsToParagraphTextPosisions(self, runs):
        # Mapping of run starts & ends to text positions
        run_map = []
        pos = 0
        run_index = 0
        for run in runs:
            if run.text:
                run_length = len(run.text)
                run_map.append((pos, pos + len(run.text) - 1, run, run_index))
                pos += len(run.text)
            run_index += 1
        return run_map

    def updateSentencesInRuns(self, runs, run_map, sentence_starts, sentence_ends):
        for start in sentence_starts:
            # Get the run and relative position
            (run, run_pos) = self.textPositionInRun(run_map, start)

            if run != None and run.text and run.text != '':
                # Find next non-white space and capitalize it
                run_length = len(run.text)
                runIndex = run_pos
                text = run.text
                # TODO: ignore spaces, digits, and some punctuation at start of sentence
                # self.ignore_start_of_sentence = r'[𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙𞥐() ]'
                ignore_match = self.ignore_start_of_sentence.match(text)
                if ignore_match:
                    increment = ignore_match.end()
                    runIndex += increment
                while runIndex < run_length and text[runIndex] == ' ':
                    runIndex += 1
                if runIndex < run_length:
                    fixThisOne = text[runIndex]
                    toUpper = fixThisOne.upper()
                    run.text = text[0:runIndex] + toUpper + text[runIndex + 1:]
                else:
                    print('!! Capitalization question %d %s (%d)' % (runIndex, text, len(text)))


        # Insert preceding ! or ?, from the back
        index = len(sentence_ends) - 1
        while index >= 0:
            insert_pos = sentence_ends[index][0]
            punctuation = sentence_ends[index][1]
            if punctuation != "."  and punctuation != '$':
                # Get the start of this sentence
                (run, run_pos) = self.textPositionInRun(
                    run_map, sentence_starts[index])
                text = run.text
                run_length = len(text)
                # TODO: ignore spaces, digits, and some punctuation at start of sentence
                while run_pos < run_length and text[run_pos] == ' ':
                    run_pos += 1
                if run.text and run_pos < run_length and run.text[run_pos] != self.pre_punctuation[punctuation]:
                    run.text = text[0:run_pos] + self.pre_punctuation[punctuation] + text[run_pos:]
            index -= 1


    def processParagraphRuns(self, p):
        # Get all the positions of sentence endings
        sentence_ends, sentence_starts = \
            self.computeSentenceStartsEnds(p.text)
        # all_sentence_ends = self.end_of_sentence_pattern.finditer(p.text)
        # text_len = len(p.text)
        # if not all_sentence_ends:
        #     # No sentence endings. Should first be capitalized?
        #     return None
        # sentence_starts = [0]
        # sentence_ends = []
        # for sentence_end in all_sentence_ends:
        #     # print(sentence_end)
        #     # Position and character of this sentence ending
        #     sentence_ends.append((sentence_end.start(), sentence_end.group(0)[0]))
        #     end_pos = sentence_end.end()
        #     while end_pos < text_len and (
        #         p.text[end_pos] == ' ' or p.text[end_pos] == '\r'
        #         or p.text[end_pos] == '\t' or p.text[end_pos] == '\n'):
        #       end_pos += 1
        #     sentence_starts.append(end_pos)
        #
        runs = p.runs
        run_map = self.mapRunsToParagraphTextPosisions(p.runs)
        # Mapping of run starts & ends to text positions
        # run_map = []
        # pos = 0
        # run_index = 0
        # for run in runs:
        #   run_length = len(run.text)
        #   run_map.append((pos, pos + len(run.text) - 1, run, run_index))
        #   pos += len(run.text)
        #   run_index += 1

        # now iterate over the ends of sentences
        # Capitalize each start of sentence
        converter.updateSentencesInRuns(self, run_map, runs, sentence_starts, sentence_ends)
        # for start in sentence_starts:
        #     # Get the run and relative position
        #     (run, run_pos) = self.textPositionInRun(run_map, start)
        #
        #     if run:
        #         # Find next non-white space and capitalize it
        #         run_length = len(run.text)
        #         runIndex = run_pos
        #         text = run.text
        #         while runIndex < run_length and text[runIndex] == ' ':
        #             runIndex += 1
        #         if runIndex < run_length:
        #             fixThisOne = text[runIndex]
        #             toUpper = fixThisOne.upper()
        #             run.text = text[0:runIndex] + toUpper + text[runIndex+1:]
        #         else:
        #             print('!! Capitalization question %d %s (%d)' % (runIndex, text, len(text)))
        #
        # # Insert preceding ! or ?, from the back
        # index = len(sentence_ends) - 1
        # while index >= 0:
        #     insert_pos = sentence_ends[index][0]
        #     punctuation = sentence_ends[index][1]
        #     if punctuation != ".":
        #         # Get the start of this sentence
        #         (run, run_pos) = self.textPositionInRun(run_map, sentence_starts[index])
        #         text = run.text
        #         run_length = len(text)
        #         while run_pos < run_length and text[run_pos] == ' ':
        #             run_pos += 1
        #         run.text = text[0:run_pos] + self.pre_punctuation[punctuation] + text[run_pos:]
        #
        #     index -= 1

        return

  # Given a start position in the paragraph text, return run and place there.
    def textPositionInRun(self, run_map, start):
        # TODO: Ignore some characters at start, e.g., digits, space, punctuation
        for map in run_map:
             if start >= map[0] and start <= map[1]:
                # print('Capitalize run %s at %s' % (map, start - map[0]))
                return (map[2], start - map[0])
        return (None, None)


# TODO: Test more Adlam text!
def testConvert():
  # Debug!
  testcases = {
    'latn': {
        'fontIndex': 3,  # For latin
        'toLower': False,
        'sentenceCase': True,
        'tests': [
          ['KAALDEN GOONGA : “Maa laaɓ, ñamlel ko joɓel!',
           "𞥞 𞤑𞤀𞥄𞤂𞤁𞤉𞤐 𞤘𞤌𞥅𞤐'𞤘𞤀 : “𞤃𞤢𞥄 𞤤𞤢𞥄𞤩⹁ 𞤻𞤢𞤥𞤤𞤫𞤤 𞤳𞤮 𞤶𞤮𞤩𞤫𞤤!"
           ],
        ],
    },
    'arab': {
        'fontIndex': 0,
        'toLower': True,
        'sentenceCase': True,
        'tests': [
            ['بثب!', '𞥞𞤀𞤤𞤢!'],
            ['بثب?', '𞥟𞤀𞤤𞤢?'],
            ["قظكتضكتضك يبكڄضك ض پ‍بث‍‌ب سنث‍بص",
             '𞤏𞤭𞤲𞤣𞤫𞤲𞤣𞤫𞤲 𞤶𞤢𞤲𞤺𞤫𞤲 𞤫 𞤸𞤢𞤤𞤢 𞤨𞤵𞤤𞤢𞤪'
            ],
            [ 'لنجسظڇبث لنجسظڇبث بثب پضخثبث قبغبÃكëڄبث گبصلظ!',
             '𞥞𞤑𞤵𞤥𞤨𞤭𞤼𞤢𞤤 𞤳𞤵𞤥𞤨𞤭𞤼𞤢𞤤 𞤢𞤤𞤢 𞤸𞤫𞤧𞤤𞤢𞤤 𞤱𞤢𞤯𞤢•𞤲•𞤺𞤢𞤤 𞤦𞤢𞤪𞤳𞤭!'
            ],
            ['لنجسظڇبث لنجسظڇبث بثب پضخثبث قبغبÃكëڄبث گبصل?',
             '𞥟𞤑𞤵𞤥𞤨𞤭𞤼𞤢𞤤 𞤳𞤵𞤥𞤨𞤭𞤼𞤢𞤤 𞤢𞤤𞤢 𞤸𞤫𞤧𞤤𞤢𞤤 𞤱𞤢𞤯𞤢•𞤲•𞤺𞤢𞤤 𞤦𞤢𞤪𞤳?'
             ]
        ]
    },
  }

  adlamConverter = converter(FONTS_TO_CONVERT, thisDefaultOutputFont)
  #result = adlamConverter.converter(oldOneText[0][0], fontTextInfo=oldOneText)
  for script in testcases:
    fontIndex = testcases[script]['fontIndex']
    toLower = testcases[script]['toLower']
    sentenceCase = testcases[script]['sentenceCase']
    for test in testcases[script]['tests']:
      input = test[0]
      expected = test[1]
      result = adlamConverter.convertText(input,
                                          convertToLower=toLower,
                                          fontIndex=fontIndex,
                                          sentenceCase=sentenceCase)
      if result != expected:
        print ('** Unexpected results: \n  expected(%d) = %s\n  Result(%d)   = %s' % (
          len(expected), expected, len(result), result))
        print('Old text = %s' % input)
      else:
        print ('* PASSES * %s case %s  ' % (script, expected))

def testParagraph():
    # Checks how paragraph operations work, e.g., split, inserting punctuation
    # at front.
    test_paragraphs = [
        '٣)- فضٍقن غظٍ غعع لعكڄظ: ثبصبث⹁ ثبصض⹁ پضثٌع⹁ لضثٌض⹁ ٻبَكڄعث⹁ ٻبَثظ⹁ ثضڄٌبث⹁ ثضڄغض⹁ ثضلٌظپظ⹁ ثضلغض⹁ ثضلٌظ⹁ ثضلٌضٍثض⹁ تضقڄبث⹁ تضقثض⹁ ض لع طـبڇظغَ ض غظٍ لعكڄظ تعق غعع؟',
        '٣)- فضٍقن غظٍ غعع لعكڄظ: ثبصبث⹁ ثبصض⹁ پضثٌع⹁ لضثٌض⹁ ٻبَكڄعث⹁ ٻبَثظ⹁ ثضڄٌبث⹁ ثضڄغض⹁ ثضلٌظپظ⹁ ثضلغض⹁ ثضلٌظ⹁ ثضلٌضٍثض⹁ تضقڄبث⹁ تضقثض⹁ ض لع طـبڇظغَ ض غظٍ لعكڄظ تعق غعع!',
        '  ?ض جظخبث: لبص ض جظخبث: لبص .ض جظخبث: لبص!'

    ]
    adlamConverter = converter(FONTS_TO_CONVERT, thisDefaultOutputFont)
    for test in test_paragraphs:
        result = adlamConverter.findSentencesInParagraph(test)


def main():
  testConvert()
  testParagraph()


if __name__ == '__main__':
  main()
