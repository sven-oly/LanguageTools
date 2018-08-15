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

import base

# import transliterate
# import transrule_ccp

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

class langInfo():
  def __init__(self):
    self.LanguageCode = 'rhg'
    self.Language = 'Rohingya'
    self.Language_native = '𐴀𐴁𐴂𐴃'

    self.diacritic_list = [unichr(x) for x in range(0x10D22, 0x10D27)]

    self.base_consonant = u'\u10D01'

    self.text_file_list = []
    self.unicode_font_list = [
        { 'family': 'None',
          'longName': 'None',
          'source': '/fonts/None',
        },
    ]


# Global in this file.
langInstance = langInfo()

LanguageCode = 'rhg'
Language = 'Rohingya'
Language_native = ''

# https://fontlibrary.org/en/font/rohingya-gonya-leyka-noories
encoding_font_list = [
    {
      'font_path':'/fonts/Rohingya Gonya Leyka Noories.ttf',
      'font_name':'RohingyaGonyaLeyka',
      'display_name': 'Gonya Leyka Noories',
    },
    {
      'font_path':'/fonts/Rohingya Kuna Leyka Noories.tt',
      'font_name':'RohingyaKunaLeyka',
      'display_name': 'Kuna Leyka Noories',
    },
]

unicode_font_list = [

  { 'family': 'RibengUni2018018',
    'longName': 'RibengUni 2018-06-18',
    'source': '/fonts/RibengUni-Regular_20180618.ttf',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/rhg/'
    },
    {'linkText': 'Converter',
     'ref': '/rhg/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/rhg/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/rhg/downloads/'
    },
    {'linkText': 'Unicode',
    'ref': 'https://www.unicode.org/charts/PDF/U10D00.pdf'
    },
    {'linkText': 'Language',
     'ref': 'https://en.wikipedia.org/wiki/Rohingya_language'
    },

    {'linkText': 'Combiners',
     'ref': '/rhg/diacritic/'
     },
]


diacritic_list = [unichr(x) for x in range(0x10D22, 0x10D27)]


base_consonant = u'\u10D01'

# Shows keyboard
class IndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageCode,
         'longName': 'Hanific Rohigya Unicode'
        }
      ]
      template_values = {
        'language': Language,
        'font_list': unicode_font_list,
        'lang_list': None,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))

# Presents UI for conversions from font encoding to Unicode.
class ChakmaConvertUIHandler(webapp2.RequestHandler):
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
           'string': u'CVMmH picMCinM\\u0027 blobo vlikM velonM Fag 1409 b`l slitM'},
      ]

      oldInput = 'CVMmH picMCinM\' blobo vlikM velonM Fag 1409 b`l slitM'
      unicodeChars = '\ud804\udd00'
      unicodeChars += '\ud804\udd03'
      unicodeChars += '\ud804\udd04'
      unicodeChars += '\ud804\udd05'
      unicodeChars += '\ud804\udd06'

      unicodeCombiningChars = CombiningCombos(u'\ud803\udd01', diacritic_list)
      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language
        }
      ]

      template_values = {
          'font': font,
          'language': Language,
          'langTag': LanguageCode,
          'encodingList': encoding_font_list,
          'encoding': {
              'font_path':'/fonts/ArjCN__.TTF',
              'font_name':'ChakmaASCII',
          },
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

# AJAX handler for Chakma converter
class ConvertHandler(webapp2.RequestHandler):
    def get(self):
      # TODO: Get the text values
      # Call transliterator
      # Return JSON structure with values.

      transCcp = transliterate.Transliterate(
        transrule_ccp.TRANS_LIT_RULES,
        transrule_ccp.DESCRIPTION
      )

      outText = '\u11103\u11101\u11103'
      message = 'TBD'
      error = ''

      result = {
        'outText' : outText,
        'message' : message,
        'error': error,
        'language': Language,
        'langTag': LanguageCode,
        'showTools': self.request.get('tools', None),
        'summary' : transCcp.getSummary(),
      }
      self.response.out.write(json.dumps(result))


class EncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'rhc',
         'longName': 'Rohingya Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/rhgConverter.js",
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
      self.response.out.write(template.render(path, template_values))

class ChakmaRenderPage(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language + ' Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/rhgConverter.js",
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
          'language': langInstance.Language,
          'language_native': langInstance.Language_native,
          'unicode_font_list': langInstance.unicode_font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'downloads.html')
      self.response.out.write(template.render(path, template_values))


# Create a string with combinations of the combining characters,
# following the given base character.
def CombiningCombos(baseHexChar, combiners):

  testString = u''
  for c0 in combiners:
    for c1 in combiners:
      testString += baseHexChar + c0 + c1 + ' '
    testString += '\u000a'
  return testString


class DiacriticHandler(webapp2.RequestHandler):
  def get(self):
    # Generate combinations of base + diacritic pairs
    combos = []
    table = []
    for x in self.langInfo.diacritic_list:
      row = [x + ' (%4x)' %ord(x)]
      for y in diacritic_list:
        text = base_consonant + x + y
        combos.append({'text': text,
                       'codes': ['%4x ' % ord(c) for c in text]})
        row.append(text)
      table.append(row)

    template_values = {
        'language': Language,
        'base_char': base_consonant.encode('utf-8'),
        'base_hex': ['%4x' % ord(x) for x in base_consonant],
        'diacritics': [x for x in diacritic_list],
        'diacritics_hex': ['%4x ' % ord(y) for y in diacritic_list],
        'combinations': combos,
        'table': table,
        'unicode_font_list': unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'diacritics.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication(
    [('/rhg/', IndigenousHomeHandler),
     ('/rhg/convertUI/', ConvertUIHandler),
     ('/rhg/downloads/', base.Downloads),
     ('/rhg/converter/', ConvertHandler),
     ('/rhg/encodingRules/', EncodingRules),
     ('/rhg/diacritic/', DiacriticHandler),
    ], debug=True,
    config={'langInfo': langInstance}
)
