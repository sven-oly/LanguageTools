# -*- coding: utf-8 -*-
#!/usr/bin/env python
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

import transliterate

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

# A base class for handling the general things needed in a language.
class languageTemplate():

  def __init__(self):
    self.LanguageCode = 'base'
    self.Language = 'General'
    self.Language_native = 'Base Language'

    self.encoding_font_list = [
        { 'font_name': self.Language + 'Font',
          'display_name': self.Language,
          'font_path': '/fonts/',
        },
    ]

    self.unicode_font_list = [
        {
            'source': '/fonts/NotoSans-Regular.ttf',
            'family': 'NotoSans',
            'longName': 'Noto Sans',
        },
    ]

    self.lang_list = []
    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/aho/'
        },
        {'linkText': 'Converter',
         'ref': self.LanguageCode + '/converter/'},
        {'linkText': 'Font conversion summary',
         'ref': self.LanguageCode + 'encodingRules/'
        },
        {'linkText': 'Resources',
         'ref': self.LanguageCode + '/downloads/'
        },
    ]

    self.kb_list = [
        {'shortName':  self.LanguageCode,
         'longName': self.Language
        }
    ]

    self.text_file_list = [
    ]

    self.baseHexUTF16 = u''

    return

# Explicity NOT PART OF THE CLASS

# Shows keyboards for Language
class LanguagesHomeHandler(webapp2.RequestHandler):
  def get(self):
    req = webapp2.get_request()
    # Can use this for additional information
    langInfo = self.app.config.get('langInfo')
    lang_list = [
        {'shortName':  'tst',
         'longName': 'Testing'
        },
    ]

    try:
      text_direction = langInfo.direction
    except AttributeError:
      text_direction = 'ltr'

    try:
      test_data = langInfo.test_data
    except AttributeError:
      test_data = ''
    logging.info('test_data: %s' % test_data)

    template_values = {
        'direction': text_direction,
        'language': langInfo.Language,
        'font_list': langInfo.unicode_font_list,
        'lang_list': langInfo.lang_list,
        'kb_list': langInfo.kb_list,
        'links': langInfo.links,
        'test_data': test_data,
    }
    path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
    self.response.out.write(template.render(path, template_values))


# AJAX handler for  converter
class ConvertHandler(webapp2.RequestHandler):
  def get(self):
    # TODO: Get the text values
    # Call transliterator
    # Return JSON structure with values.

    langInfo = self.app.config.get('langInfo')

    if langInfo.transliterator:
      transliterator = transliterate.Transliterate(
          langInfo.transliterator.TRANS_LIT_RULES,
          langInfo.transliterator.DESCRIPTION
      )

    outText = '\u11103\u11101\u11103'
    message = 'TBD'
    error = ''

    result = {
        'outText' : outText,
        'message' : message,
        'error': error,
        'language': Language,
        'lang_list': langInfo.lang_list,
        'langTag': LanguageCode,
        'showTools': self.request.get('tools', None),
        'summary' : transliterator.getSummary(),
    }
    self.response.out.write(json.dumps(result))

def surrogate_to_utf32(high, low):
    return (high << 10) + low - 0x35fdc00

class DiacriticHandler(webapp2.RequestHandler):
  def get(self):
    langInfo = self.app.config.get('langInfo')

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
        text = langInfo.base_consonant + x + y
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
        'base_char': langInfo.base_consonant.encode('utf-8'),
        'base_hex': ['%4x' % ord(x) for x in langInfo.base_consonant],
        'diacritics': [x for x in langInfo.diacritic_list],
        'diacritics_hex': row_names,  #['%4x ' % ord(y) for y in langInfo.diacritic_list],
        'combinations': combos,
        'table': table,
        'unicode_font_list': langInfo.unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'diacritics.html')

    self.response.out.write(template.render(path, template_values))


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
  def get(self):

    langInfo = self.app.config.get('langInfo')

    # All old characters
    try:
      oldInput = langInfo.test_chars[0]
      test_char_list = langInfo.test_chars
    except AttributeError:
      oldInput = u''
      for i in xrange(0x23, 0xf1):
        oldInput += unichr(i)

    oldChars = (u'\u0001 !"\u0023\u0024%&\'()*+,-./' +
                '0123456789:;<=>?@' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ[ \\ ]^_`' +
                'abcdefghijklmnopqrstuvwxyz{|}~')
    text = self.request.get('text', oldChars)
    font = self.request.get('font')
    testStringList = [
        {'name': 'Test 1', # Note: must escape the single quote.
         'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
         '\u000a\u000b'},
    ]

    try:
      text_direction = langInfo.direction
    except AttributeError:
      text_direction = 'ltr'

    unicodeChars = '\ud804\udd00'
    unicodeChars += '\ud804\udd03'
    unicodeChars += '\ud804\udd04'
    unicodeChars += '\ud804\udd05'
    unicodeChars += '\ud804\udd06'

    unicodeCombiningChars = getCombiningCombos(
        langInfo.baseHexUTF16, langInfo.diacritic_list)

    template_values = {
        'font': font,
        'language': langInfo.Language,
        'langTag': langInfo.LanguageCode,
        'encodingList': langInfo.encoding_font_list,
        'lang_list': langInfo.lang_list,
        'kb_list': langInfo.kb_list,
        'direction': text_direction,
        'unicodeFonts': langInfo.unicode_font_list,
        'links': langInfo.links,
        'oldChars': oldChars,
        'oldInput': oldInput,
        'text': text,
        'textStrings': testStringList,
        'showTools': self.request.get('tools', None),
        'unicodeChars': unicodeChars,
        'combiningChars': unicodeCombiningChars,
    }
    path = os.path.join(os.path.dirname(__file__), 'translit_general.html')
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


class EncodingRules(webapp2.RequestHandler):
  def get(self):

    langInfo = self.app.config.get('langInfo')

    template_values = {
        'converterJS': '/js/' + langInfo.LanguageCode + 'Converter.js',
        'language': langInfo.Language,
        'lang_list': langInfo.lang_list,
        'encoding_list': langInfo.encoding_font_list,
        'unicode_list': langInfo.unicode_font_list,
        'kb_list': langInfo.kb_list,
        'links': langInfo.links,
    }
    path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
    self.response.out.write(template.render(path, template_values))


class Downloads(webapp2.RequestHandler):
  def get(self):

    langInfo = self.app.config.get('langInfo')
    template_values = {
        'language': langInfo.Language,
        'language_native': langInfo.Language_native,
        'unicode_font_list': langInfo.unicode_font_list,
        'file_list': langInfo.text_file_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'downloads.html')
    self.response.out.write(template.render(path, template_values))

class RenderPage(webapp2.RequestHandler):
  def get(self):

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
    }
    path = os.path.join(os.path.dirname(__file__), 'renderCombos.html')
    self.response.out.write(template.render(path, template_values))

class DictionaryInput(webapp2.RequestHandler):
    def get(self):
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
        'unicodeFontList': langInfo.unicode_font_list,

        'links': langInfo.links,
      }
      path = os.path.join(os.path.dirname(__file__), 'dictionaryInput.html')
      self.response.out.write(template.render(path, template_values))


# For N languages in the dictionary
class DictionaryN(webapp2.RequestHandler):
  def get(self):
    req = webapp2.get_request()
    top_path = req.path.split('/')
    lang_code = top_path[1]

    langInfo = self.app.config.get('langInfo')

    # user_info = getUserInfo(self.request.url)

    template_values = {
      'dictionaryNData': langInfo.dictionaryNData,

      'lang1': langInfo.dictionaryLang1,
      'lang2': langInfo.dictionaryLang2,
      'kb1': langInfo.kb1,
      'kb2': langInfo.kb2,
      'unicodeFontList': langInfo.unicode_font_list,

      'links': langInfo.links,
    }
    path = os.path.join(os.path.dirname(__file__), 'dictionaryN.html')
    self.response.out.write(template.render(path, template_values))

# Create an instance of the template and add to configuration.
# so values can be passed to the classes
instance = languageTemplate()
basePath = '/' + instance.LanguageCode

# Error catching
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
app.router.add((basePath + 'dictionaryInput', DictionaryInput))

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500