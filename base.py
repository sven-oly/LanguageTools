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

from main import LanguageList
import transliterate

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

class languageTemplate():

  LanguageCode
  Language = 'General'
  Language_native = 'Name of language'

  baseHexUTF16 = u'\ud805\udf00'

  encoding_font_list = [
      { 'font_name': Language + 'Font',
        'display_name': Language,
        'font_path': '/fonts/',
      },
  ]

  unicode_font_list = [
      {
          'source': '/fonts/ahom_aiton/NotoSerifAhom-Regular.ttf',
          'family': 'NotoSerifAhom',
          'longName': 'Noto Serif Ahom',
      },
  ]

links = [
    {'linkText': 'Keyboard',
     'ref': '/aho/'
    },
    {'linkText': 'Converter',
     'ref': LanguageCode + '/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': LanguageCode + 'encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': LanguageCode + '/downloads/'
    },
    {'linkText': 'Unicode ' + Language,
    'ref': 'http://unicode.org/charts/PDF/U11700.pdf'
    },
]

test_data = """
  Insert test data here.
"""

text_file_list = [
]

# Shows keyboard for Language
class LanguagesHomeHandler(webapp2.RequestHandler):
    def get(self):
      lang_list = [
        {'shortName':  'shn',
         'longName': 'Shan'
        },
        {'shortName':  'ksw',
         'longName': 'S\'gaw Karen'
        },
      ]

      template_values = {
        'langlist': LanguageList,
        'language': Language
        'font_list': unicode_font_list,
        'lang_list': lang_list,
        'kb_list': lang_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
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

      oldInput = u''
      for i in xrange(0x23, 0xf1):
        oldInput += unichr(i)

      unicodeChars = '\ud804\udd00'
      unicodeChars += '\ud804\udd03'
      unicodeChars += '\ud804\udd04'
      unicodeChars += '\ud804\udd05'
      unicodeChars += '\ud804\udd06'

      unicodeCombiningChars = getCombiningCombos(baseHexUTF16)
      kb_list = [
        {'shortName':  'aho',
         'longName': ''
        }
      ]

      template_values = {
          'font': font,
          'language': Language,
          'langTag': LanguageCode
          'encodingList': encoding_font_list,

          'kb_list': kb_list,
          'unicodeFonts': unicode_font_list,
          'links': links,
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

# AJAX handler for  converter
class ConvertHandler(webapp2.RequestHandler):
    def get(self):
      # TODO: Get the text values
      # Call transliterator
      # Return JSON structure with values.

      transliterator = transliterate.Transliterate(
        transrule_aho.TRANS_LIT_RULES,
        transrule_aho.DESCRIPTION
      )

      outText = '\u11103\u11101\u11103'
      message = 'TBD'
      error = ''

      result = {
        'outText' : outText,
        'message' : message,
        'error': error,
        'language': Language,
        'langTag': LanguageCode
        'showTools': self.request.get('tools', None),
        'summary' : transliterator.getSummary(),
      }
      self.response.out.write(json.dumps(result))


class EncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language
        }
      ]
      template_values = {
        'converterJS': "/js/' + LanguageCode + 'Converter.js",
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
      self.response.out.write(template.render(path, template_values))

class RenderPage(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageCode
         'longName': Language + ' Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/' + LanguageCode + 'Converter.js",
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'renderCombos.html')
      self.response.out.write(template.render(path, template_values))


class Downloads(webapp2.RequestHandler):
    def get(self):

      template_values = {
          'language': Language,
          'language_native': Language_native,
          'unicode_font_list': unicode_font_list,
          'file_list': text_file_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'downloads.html')
      self.response.out.write(template.render(path, template_values))


# Create a string with combinations of the combining characters,
# following the given base character.
# TODO: Finish this.
def getCombiningCombos(baseHexChar):

  combineOffsets = range(0x1d, 0x1e, 0x1f).append(range(0x20, 0x2b))

  testString = u''
  for c0 in combiners:
    for c1 in combiners:
      testString += baseHexChar + c0 + c1 + ' '
    testString += '\u000a'
  return testString

app = webapp2.WSGIApplication([
    ('/tai/', LanguagesHomeHandler),
    ('/' + LanguageCode + '/', LanguagesHomeHandler),
    ('/demo_' + LanguageCode + '/', LanguagesHomeHandler),
    ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', Downloads),
    ('/' + LanguageCode + '/converter/', ConvertHandler),
    ('/' + LanguageCode + '/encodingRules/', EncodingRules),
], debug=True)
