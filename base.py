# -*- coding: utf-8 -*-
# !/usr/bin/env python
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from django.template import Template

import games
import languageTemplate

import transliterate
import wordsearch

import json
import logging
import os
import unicodedata
import webapp2

from google.appengine.ext.webapp import template

try:
    unichr
except NameError:
    unichr = chr

try:
    UNICODE_EXISTS = bool(type(unicode))
except NameError:
    unicode = lambda s: str(s)

try:
    xrange
except NameError:
    xrange = range


# Explicitly NOT PART OF THE CLASS


# Shows keyboards for Language
class LanguagesHomeHandler(webapp2.RequestHandler):
  def get(self, match=None):
    # Match is the actual url route matched.
    req = webapp2.get_request()
    # Can use this for additional information
    langInfo = self.app.config.get('langInfo')

    try:
        text_direction = langInfo.direction
    except AttributeError:
        text_direction = 'ltr'

    try:
        test_data = langInfo.test_data
    except AttributeError:
        test_data = ''
    try:
        variation_sequence = langInfo.variation_sequence
    except:
        variation_sequence = None

    try:
        encoded_ranges = langInfo.encoded_ranges
    except:
        encoded_ranges = None

    try:
        allFonts = langInfo.allFonts
    except:
        allFonts = False

    try:
        home_html = langInfo.custom_home_template
    except:
        home_html = 'HTML/demo_general.html'

    # Information on the characters in the Unicode range
    unicodeCharData = {}

    try:
      for interval in langInfo.unicodeRanges:
        start = interval[0]
        end = interval[1] + 1

        for x in range(start, end):
          chr = unichr(x)
          unicodeCharData[chr] = [
            unicodedata.name(chr), unicodedata.category(chr),
          ]

    except:
      print('!!! Unicode range not set')

    template_values = {
        'allFonts': allFonts,
        'direction': text_direction,
        'encoded_ranges': encoded_ranges,
        'language': langInfo.Language,
        'langTag': langInfo.LanguageCode,
        'font_list': langInfo.unicode_font_list,
        'lang_list': langInfo.lang_list,
        'kb_list': langInfo.kb_list,
        'langInfo': langInfo,
        'links': langInfo.links,
        'showTools': self.request.get('tools', None),
        'test_data': test_data,
        'variation_sequence': variation_sequence,
    }
    path = os.path.join(os.path.dirname(__file__), home_html)
    self.response.out.write(template.render(path, template_values))


# AJAX handler for  converter
class ConvertHandler(webapp2.RequestHandler):
  def get(self, match=None):
    # TODO: Get the text values
    # Call transliterator
    # Return JSON structure with values.

    langInfo = self.app.config.get('langInfo')

    try:
        if langInfo.transliterator:
            transliterator = transliterate.Transliterate(
                langInfo.transliterator.TRANS_LIT_RULES,
                langInfo.transliterator.DESCRIPTION)
    except AttributeError:
        transliterator = None

    out_text = '\u11103\u11101\u11103'
    message = 'TBD'
    error = ''

    result = {
        'outText': out_text,
        'message': message,
        'error': error,
        'language': langInfo.Language,
        'lang_list': langInfo.lang_list,
        'langTag': langInfo.LanguageCode,
        'showTools': self.request.get('tools', None),
        # 'summary' : transliterator.getSummary(),
    }
    self.response.out.write(json.dumps(result))


def surrogate_to_utf32(high, low):
    return (high << 10) + low - 0x35fdc00


class DiacriticHandler(webapp2.RequestHandler):
  def get(self, match=None):
    langInfo = self.app.config.get('langInfo')

    base_num = self.request.get('base', None)
    if base_num:
        base_char = unichr(int(base_num, base=16))
    else:
        base_char = langInfo.base_consonant

    # Generate combinations of base + diacritic pairs
    combos = []
    table = []
    row_names = []
    for x in langInfo.diacritic_list:
        if len(x) > 1:
            utf32 = surrogate_to_utf32(ord(x[0]), ord(x[1]))
            row = ['%s (0x%x)' % (x, utf32)]
        else:
            row = [x + ' (%4x)' % ord(x)]
        row_names.append(row[0])
        for y in langInfo.diacritic_list:
            text = base_char + x + y
            combos.append({'text': text,
                           'codes': ['%4x ' % ord(c) for c in text]})
            row.append(text)
        table.append(row)

    try:
        text_direction = langInfo.direction
    except AttributeError:
        text_direction = 'ltr'

    template_values = {
        'direction': text_direction,
        'language': langInfo.Language,
        'base_char': base_char.encode('utf-8'),
        'base_hex': ['%4x' % ord(x) for x in langInfo.base_consonant],
        'diacritics': [x for x in langInfo.diacritic_list],
        'diacritics_hex': row_names,  # ['%4x ' % ord(y) for y in langInfo.diacritic_list],
        'combinations': combos,
        'showTools': self.request.get('tools', None),
        'table': table,
        'unicode_font_list': langInfo.unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/diacritics.html')

    self.response.out.write(template.render(path, template_values))


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
  def get(self, match=None):

    langInfo = self.app.config.get('langInfo')

    # All old characters
    try:
      oldInput = langInfo.test_chars
      test_char_list = langInfo.test_chars
    except AttributeError:
      oldInput = u''

    oldChars = (u'\u0001 !"\u0023\u0024%&\'()*+,-./' +
                '0123456789:;<=>?@' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ[ \\ ]^_`' +
                'abcdefghijklmnopqrstuvwxyz{|}~')
    text = self.request.get('text', oldChars)
    font = self.request.get('font')
    try:
      testStringList = langInfo.testStringList
    except:
      testStringList = [
        {'name': 'Test 1', # Note: must escape the single quote.
         'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
         '\u000a\u000b'},
      ]
    text = ''
    #print('********* %s' % langInfo.encodedRanges)
    #try:
    encode_chars = []
    # Get conversion data from explicit list of encoded hex values.
    try:
      for interval in langInfo.encodedRanges:
        start = interval[0]
        end = interval[1] + 1

        for x in range(start, end):
          encode_chars.append(unichr(x))

      text = ''.join(encode_chars)
    except:
      print('----- failed')
      try:
        text = langInfo.convertText
      except:
        text = self.request.get('text', oldChars)

    try:
      text_direction = langInfo.direction
    except AttributeError:
      text_direction = 'ltr'

    # Handle non-Unicode output.
    try:
      output_font = langInfo.outputFont
    except:
      output_font = 'Unicode'

    try:
      unicodeChars = langInfo.unicodeChars
    except:
      unicodeChars = '\ud804\udd00'
      unicodeChars += '\ud804\udd03'
      unicodeChars += '\ud804\udd04'
      unicodeChars += '\ud804\udd05'
      unicodeChars += '\ud804\udd06'

    try:
      unicodeCombiningChars = getCombiningCombos(
        langInfo.baseHexUTF16, langInfo.diacritic_list)
    except:
      unicodeCombiningChars = None

    try:
      encodingList = langInfo.encoding_font_list
    except:
      encodingList = None

    try:
      variation_sequence = langInfo.variation_sequence
    except:
      variation_sequence = None

    try:
      converters = langInfo.converters
    except:
      converters = None

    template_values = {
        'converters': converters,
        'isTransLit': False,
        'font': font,
        'language': langInfo.Language,
        'langTag': langInfo.LanguageCode,
        'encodingList': encodingList,
        'lang_list': langInfo.lang_list,
        'kb_list': langInfo.kb_list,
        'direction': text_direction,
        'unicodeFonts': langInfo.unicode_font_list,
        'links': langInfo.links,
        'oldChars': oldChars,
        'oldInput': oldInput,
        'outputFont': output_font,
        'text': text,
        'textStrings': testStringList,
        'showTools': self.request.get('tools', None),
        'unicodeChars': unicodeChars,
        'combiningChars': unicodeCombiningChars,
        'variation_sequence': variation_sequence,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
    self.response.out.write(template.render(path, template_values))

# Create a string with combinations of the combining characters,
# following the given base character.
# TODO: Finish this.
def getCombiningCombos(baseHexChar, diacritic_list):

  combineOffsets = range(0x1d, 0x1e, 0x1f).append(range(0x20, 0x2b))

  testString = u''
  for c0 in diacritic_list:
    for c1 in diacritic_list:
      testString += baseHexChar + c0 + c1 + ' '
    testString += '\u000a'
  return testString

def encodingFontListToUnicodeList(encodinglist):
  unicodeList = []
  for item in encodinglist:
    unicodeList.append({
      'family': item['font_name'],
      'longName': item['display_name'],
      'source': item['font_path']
      }
    )
  return unicodeList

def unicodeFontListToEncodingList(unicodeList):
  encodinglist = []
  for item in unicodeList:
    encodinglist.append({
      'font_name': item['family'],
      'display_name': item['longName'],
      'font_path': item['source']
    }
    )
  return encodinglist

class EncodingRules(webapp2.RequestHandler):
  def get(self, match=None):

    langInfo = self.app.config.get('langInfo')
    try:
      encoding_tables = langInfo.encoding_tables
    except:
      encoding_tables = None

    try:
        converter_list = langInfo.converters
    except:
        converter_list = None
    try:
        conversion_data = langInfo.conversion_data
    except:
        conversion_data = None

    template_values = {
        'converterJS': '/js/' + langInfo.LanguageCode + 'Converter.js',
        'converter_list': converter_list,
        'conversion_data': conversion_data,
        'language': langInfo.Language,
        'lang_list': langInfo.lang_list,
        'encoding_list': langInfo.encoding_font_list,
        'encoding_tables': encoding_tables,
        'unicode_list': langInfo.unicode_font_list,
        'kb_list': langInfo.kb_list,
        'links': langInfo.links,
        'showTools': self.request.get('tools', None),
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/encodingConvert.html')
    self.response.out.write(template.render(path, template_values))


class KeyboardTransforms(webapp2.RequestHandler):
  def get(self, match=None):

    langInfo = self.app.config.get('langInfo')

    try:
        converter_list = langInfo.converters
    except:
        converter_list = None

    template_values = {
      'converterJS': '/js/' + langInfo.LanguageCode + 'Converter.js',
      'converter_list': converter_list,
      'language': langInfo.Language,
      'lang_list': langInfo.lang_list,
      'encoding_list': langInfo.encoding_font_list,
      'unicode_list': langInfo.unicode_font_list,
      'kb_list': langInfo.kb_list,
      'links': langInfo.links,
      'showTools': self.request.get('tools', None),
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/keyboardTransforms.html')
    self.response.out.write(template.render(path, template_values))


class Downloads(webapp2.RequestHandler):
  def get(self, match=None):

    langInfo = self.app.config.get('langInfo')
    # To possibly limit fonts from download
    try:
      public_unicode_fonts = langInfo.public_font_resources
    except:
      public_unicode_fonts = langInfo.unicode_font_list

    try:
      text_file_list = langInfo.text_file_list
    except:
      text_file_list = None

    template_values = {
        'language': langInfo.Language,
        'language_native': langInfo.Language_native,
        'unicode_font_list': public_unicode_fonts,
        'file_list': text_file_list,
        'showTools': self.request.get('tools', None),
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/downloads.html')
    self.response.out.write(template.render(path, template_values))

class RenderPage(webapp2.RequestHandler):
  def get(self, match=None):

    langInfo = self.app.config.get('langInfo')

    kb_list = [
      {'shortName':  langInfo.LanguageCode,
       'longName': langInfo.Language + ' Unicode',
      }
    ]
    try:
      text_direction = langInfo.direction
    except AttributeError:
      text_direction = 'ltr'

    template_values = {
      'converterJS': "/js/' + langInfo.LanguageCode + 'Converter.js",
      'direction': text_direction,
      'language': langInfo.Language,
      'lang_list': langInfo.lang_list,
      'encoding_list': langInfo.encoding_font_list,
      'unicode_list': langInfo.unicode_font_list,
      'kb_list': langInfo.kb_list,
      'links': langInfo.links,
      'showTools': self.request.get('tools', None),
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/renderCombos.html')
    self.response.out.write(template.render(path, template_values))

class DictionaryInput(webapp2.RequestHandler):
    def get(self, match=None):
      req = webapp2.get_request()
      top_path = req.path.split('/')
      lang_code = top_path[1]

      langInfo = self.app.config.get('langInfo')

      # user_info = getUserInfo(self.request.url)

      template_values = {
        'lang': langInfo.Language,
        'lang1': langInfo.dictionaryLang1,
        'lang2': langInfo.dictionaryLang2,
        'kb1': langInfo.kb1,
        'kb2': langInfo.kb2,
        'showTools': self.request.get('tools', None),
        'unicodeFontList': langInfo.unicode_font_list,

        'links': langInfo.links,
      }
      path = os.path.join(os.path.dirname(__file__), 'HTML/dictionaryInput.html')
      self.response.out.write(template.render(path, template_values))


# For N languages in the dictionary
class CollationHandler(webapp2.RequestHandler):
  def get(self, match=None):
    req = webapp2.get_request()
    top_path = req.path.split('/')
    lang_code = top_path[1]

    langInfo = self.app.config.get('langInfo')
    try:
      collation_string = langInfo.collation_string
    except:
      collation_string = None

    # user_info = getUserInfo(self.request.url)

    # t = Template("My name is {{ person.first_name }}.")

    template_values = {
      'language': langInfo.Language,
      'langInfo': langInfo,
      'collation_data' : langInfo.collation_data,
      'collation_string': langInfo.collation_string,
      'converters': langInfo.converters,
      'unicodeFontList': langInfo.unicode_font_list,
      'showTools': self.request.get('tools', None),
      'links': langInfo.links,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/collationView.html')
    self.response.out.write(template.render(path, template_values))


# For N languages in the dictionary
class DictionaryN(webapp2.RequestHandler):
  def get(self, match=None):
    req = webapp2.get_request()
    top_path = req.path.split('/')
    lang_code = top_path[1]

    langInfo = self.app.config.get('langInfo')

    # user_info = getUserInfo(self.request.url)

    # t = Template("My name is {{ person.first_name }}.")

    template_values = {
      'dictionaryNData': langInfo.dictionaryNData,

      'lang1': langInfo.dictionaryLang1,
      'lang2': langInfo.dictionaryLang2,
      'kb1': langInfo.kb1,
      'kb2': langInfo.kb2,
      'unicodeFontList': langInfo.unicode_font_list,
      'showTools': self.request.get('tools', None),
      'links': langInfo.links,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/dictionaryN.html')
    self.response.out.write(template.render(path, template_values))

# Create an instance of the template and add to configuration.
# so values can be passed to the classes
instance = languageTemplate.languageTemplate()
basePath = '/' + instance.LanguageCode


class AllFontTest(webapp2.RequestHandler):
  def get(self):
    utext = self.request.get("utext", "")
    encodedText = self.request.get("encodedText", "")

    langInfo = self.app.config.get('langInfo')
    try:
      langTag = langInfo.LanguageTag
    except:
      langTag = langInfo.LanguageCode

    try:
      all_chars = langInfo.all_chars
    except:
      all_chars = None

    template_values = {
      'scriptName': langInfo.Language,
      'fontFamilies': langInfo.unicode_font_list,
      'encodedText': encodedText,
      'utext': utext,
      'all_chars': all_chars,
      'language': langInfo.Language,
      'LanguageTag': langTag,
      'kb_list': langInfo.kb_list,
    }

    path = os.path.join(os.path.dirname(__file__), 'HTML/allFonts.html')
    self.response.out.write(template.render(path, template_values))

# Presents UI for conversions from one Unicode script to another.
# TODO: use common elements with ConvertUIHandler
class TranslitHandler(webapp2.RequestHandler):
  def get(self, match=None):

    langInfo = self.app.config.get('langInfo')

    # All old characters
    try:
        oldInput = langInfo.test_chars[0]
        test_char_list = langInfo.test_chars
    except AttributeError:
        oldInput = u''

    oldChars = (u'\u0001 !"\u0023\u0024%&\'()*+,-./' +
                '0123456789:;<=>?@' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ[ \\ ]^_`' +
                'abcdefghijklmnopqrstuvwxyz{|}~')
    text = self.request.get('text', oldChars)
    font = self.request.get('font')
    testStringList = [
      {'name': 'Test 1',  # Note: must escape the single quote.
       'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
                 '\u000a\u000b'},
    ]

    try:
        text_direction = langInfo.direction
    except AttributeError:
        text_direction = 'ltr'

    # Handle non-Unicode output.
    try:
        output_font = langInfo.outputScript
    except:
        output_font = 'Unicode'

    try:
        unicodeChars = langInfo.unicodeChars
    except:
        unicodeChars = ''

    try:
        unicodeCombiningChars = getCombiningCombos(
          langInfo.baseHexUTF16, langInfo.diacritic_list)
    except:
        unicodeCombiningChars = None

    try:
        encodingList = langInfo.encoding_font_list
    except:
        encodingList = None

    try:
        variation_sequence = langInfo.variation_sequence
    except:
        variation_sequence = None

    try:
        converters = langInfo.converters
    except:
        converters = None

    try:
      translit_encoding_list = langInfo.translit_encoding_list
    except:
      translit_encoding_list = None
    try:
        translit_kb_list = langInfo.translit_kb_list
    except:
        translit_kb_list = None

    template_values = {
      'converters': converters,
      'isTransLit': True,
      'font': font,
      'language': langInfo.Language,
      'langTag': langInfo.LanguageCode,
      'encodingList': encodingList,
      'lang_list': langInfo.lang_list,
      'kb_list': langInfo.kb_list,
      'direction': text_direction,
      'unicodeFonts': langInfo.unicode_font_list,
      'links': langInfo.links,
      'oldChars': oldChars,
      'oldInput': oldInput,
      'outputFont': output_font,
      'text': text,
      'textStrings': testStringList,
      'translit_encoding_list': translit_encoding_list,
      'translit_kb_list': translit_kb_list,
      'showTools': self.request.get('tools', None),
      'unicodeChars': unicodeChars,
      'combiningChars': unicodeCombiningChars,
      'variation_sequence': variation_sequence,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
    self.response.out.write(template.render(path, template_values))


# Exports keyboards to Keyman format
class KeyManHandler(webapp2.RequestHandler):
  def get(self, match=None):

    langInfo = self.app.config.get('langInfo')
    # To possibly limit fonts from download
    try:
        public_unicode_fonts = langInfo.public_font_resources
    except:
        public_unicode_fonts = langInfo.unicode_font_list

    template_values = {
      'language': langInfo.Language,
      'language_native': langInfo.Language_native,
      'unicode_font_list': public_unicode_fonts,
      'kb_list': langInfo.kb_list,
      'langTag': langInfo.LanguageCode,
      'font_list': langInfo.unicode_font_list,
      'lang_list': langInfo.lang_list,
    }
    home_html = 'HTML/km_kb.html'
    path = os.path.join(os.path.dirname(__file__), home_html)
    self.response.out.write(template.render(path, template_values))


class AllFontTest(webapp2.RequestHandler):
  def get(self):
    langInfo = self.app.config.get('langInfo')
    try:
        public_unicode_fonts = langInfo.public_font_resources
    except:
        public_unicode_fonts = langInfo.unicode_font_list
    utext = self.request.get("utext", "")
    encoded_text = self.request.get("encodedText", "")
    logging.info('AllFontTest utext =>%s<' % utext)
    template_values = {
      'scriptName': langInfo.Language,
      'fontFamilies': public_unicode_fonts,
      'encodedText': encoded_text,
      'utext': utext,
      'language': langInfo.Language,
      'LanguageTag': langInfo.LanguageCode
    }

    path = os.path.join(os.path.dirname(__file__), 'HTML/allFonts.html')
    self.response.out.write(template.render(path, template_values))

class CharacterTableHandler(webapp2.RequestHandler):
  def get(self):
    langInfo = self.app.config.get('langInfo')

    # String containing character name data
    try:
      charNames = langInfo.charNames.split('\n')
      charNames = '!!!'.join(charNames)
    except:
      charNames = None

    template_values = {
      'language': langInfo.Language,
      'LanguageTag': langInfo.LanguageCode,
      'charTable': charNames,
      'charNameData': charNames,
      'kb_list': langInfo.kb_list,
      'unicode_font_list': langInfo.unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/characterNames.html')
    self.response.out.write(template.render(path, template_values))

class WordSearchHandler(webapp2.RequestHandler):
  def get(self):
    langInfo = self.app.config.get('langInfo')

    testGridSize = self.request.get('gfactor', 1.4)

    testData = self.request.get('testing', '')

    try:
      charNames = langInfo.charNames.split('\n')
      charNames = '!!!'.join(charNames)
    except:
      charNames = None

    try:
        direction = langInfo.direction
    except:
        direction = 'ltr'

    try:
      combiningChars = langInfo.unicodeCombiningChars
    except:
      combiningChars = None

    try:
      letterFillList = langInfo.fillChars
    except:
      letterFillList = []

    # Make it easy to split the characters
    combiners = '||'.join(langInfo.unicodeCombiningChars)
    fillers = '||'.join(letterFillList)
    #logging.info('Diacritics: %s' % (combiners))
    #logging.info('letter fill: %s' % fillers)
    template_values = {
        'language': langInfo.Language,
        'LanguageTag': langInfo.LanguageCode,
        'kb_list': langInfo.kb_list,
        'charTable': charNames,
        'charNameData': charNames,
        'unicodeCombiningChars': combiners,
        'letterFillList': fillers,
        'unicode_font_list': langInfo.unicode_font_list,
        'testData': testData,
        'testGridSize': testGridSize,
        'direction': direction,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/wordsearch.html')
    self.response.out.write(template.render(path, template_values))

class NumeralsHandler(webapp2.RequestHandler):
  def get(self):
    langInfo = self.app.config.get('langInfo')

    # String containing character name data
    try:
      charNames = langInfo.charNames.split('\n')
      charNames = '!!!'.join(charNames)
    except:
      charNames = None

    try:
      combiningChars = langInfo.unicodeCombiningChars
    except:
      combiningChars = None

    try:
      letterFillList = langInfo.fillChars
    except:
      letterFillList = []

    try:
        combingChars = langInfo.unicodeCombiningChars
    except:
        combingChars = None

    try:
        numbersImage = langInfo.numbersImage
    except:
        numbersImage = None
        
    langNumerals = langInfo.LanguageCode + "Numerals"
    template_values = {
        'language': langInfo.Language,
        'LanguageTag': langInfo.LanguageCode,
        'langNumerals': langNumerals,
        'charTable': charNames,
        'charNameData': charNames,
        'unicodeCombiningChars': combiningChars,
        'letterFillList': letterFillList,
        'unicodeFontList': langInfo.unicode_font_list,
        'font_list': langInfo.unicode_font_list,
        'numbersImage': numbersImage,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/numerals.html')
    self.response.out.write(template.render(path, template_values))


class CalendarHandler(webapp2.RequestHandler):

 def get(self):
    langInfo = self.app.config.get('langInfo')

    try:
        weekDays = langInfo.weekDays
    except:
        weekDays = None

    try:
        months = langInfo.months
    except:
        months = None

    template_values = {
        'language': langInfo.Language,
        'languageTag': langInfo.LanguageCode,
        'langNumerals': langInfo.LanguageCode + "Numerals",
        'kb_list': langInfo.kb_list,
        'months': months,
        'weekdays': weekDays,
        'unicodeFontList': langInfo.unicode_font_list,
    }
    
    path = os.path.join(os.path.dirname(__file__), 'HTML/calendar.html')
    self.response.out.write(template.render(path, template_values))

    

# Error catching
def handle_301(request, response, exception):
    logging.exception(exception)
    response.write('301 error.\n\n')
    response.write('Request = %s\n' % request.url)
    response.set_status(301)


def handle_404(request, response, exception):
    logging.exception(exception)
    response.write('Sorry, but we do not have that page in BASE. Please check your link and try again.\n\n')
    response.write('Request = %s\n' % request.url)
    response.set_status(404)


def handle_500(request, response, exception):
    logging.exception(exception)
    response.write('A server error occurred!\n\n')
    response.write('Request = %s\n' % request.url)
    response.set_status(500)


app = webapp2.WSGIApplication(
    [
    ],
    debug=True,
    config={'langInfo': instance}
)

app.router.add((basePath + '/downloads/', Downloads))
app.router.add((basePath + '/encodingRules/', EncodingRules))
app.router.add((basePath + '/', LanguagesHomeHandler))
app.router.add((basePath + '/dictionaryInput/', DictionaryInput))
app.router.add((basePath + '/kbtransforms/', KeyboardTransforms))
app.router.add((basePath + '/collation/', CollationHandler))
app.router.add((basePath + '/combos/', RenderPage))
app.router.add((basePath + '/keyman/', KeyManHandler))
app.router.add((basePath + '/AllFonts/', AllFontTest))
app.router.add((basePath + '/charTable/', CharacterTableHandler)),
app.router.add((basePath + '/wordsearch/', WordSearchHandler)),

app.router.add((basePath + '/numerals/', NumeralsHandler)),


app.router.add((basePath + '/games/generatewordsearch/',
                games.GenerateWordSearchHandler)),

# Future
#app.router.add((basePath + '/games/generatewordsearchDFS/',
#                games.GenerateWordSearchDFSHandler)),

app.error_handlers[301] = handle_301
app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
