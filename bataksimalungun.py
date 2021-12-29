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
import urllib
import webapp2

from google.appengine.ext.webapp import template

import base

Language = 'Batak Simalungun'
Language_native = 'Need native name'
LanguageCode = 'bts'

encoding_font_list = [
    # Source: https://ulikozok.com/aksara-batak/batak-font/
    {
        'font_path': '/fonts/batak/MANDAILI.TTF',
        'font_name': 'Mandailing',
        'display_name': 'Mandailing',
    },
    {
        'font_path': '/fonts/batak/VARIANTS.TTF',
        'font_name': 'Variants',
        'display_name': 'Variants',
    },
    {
        'font_path': '/fonts/batak/TOBA____.TTF',
        'font_name': 'Toba',
        'display_name': 'Toba',
    },
]

unicode_font_list = [
    {
        'family': 'NotoSansBatak',
        'longName': 'Noto Batak Sans',
        'source': '/fonts/NotoSansBatak-Regular.ttf',
    },
    {
        # Source: https://ulikozok.com/aksara-batak/batak-font/
        'family': 'Batak Unicode',
        'longName': 'Batak Unicode',
        'source': '/fonts/batak/Batak-Unicode-Regular.otf',
    }
]

kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Converter',
     'ref': '/' + LanguageCode + '/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/' + LanguageCode + '/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'Unicode Batak page',
     'ref': 'https://www.unicode.org/charts/PDF/U1BC0.pdf'
    },
    {'linkText': 'Batak script',
     'ref': 'https://en.wikipedia.org/wiki/Batak_script'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Batak_Simalungun_language'
    },
    {'linkText': 'Ethnolog',
     'ref': 'https://www.ethnologue.com/language/bts'
    },
    {'linkText': 'Combiners',
     'ref': '/bts/diacritic/'
     },
]


diacritic_list = [unichr(x) for x in range(0x1be6, 0x1bf3)]

default_base_consonant = u'\u1bc3'

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u'̄'
    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.lang_list = [Language]
    self.kb_list = kb_list
    self.links = links


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldChars = (u'' +
                  '0123456789:;<=>?@' +
                  '!@#$%^&*()_+' +
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
      for i in xrange(0x20, 0x7e):
        oldInput += unichr(i)
      for i in xrange(0x2018, 0x201e):
        oldInput += unichr(i)
      unicodeChars = ''
      unicodeCombiningChars = ''
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
          'encoding': encoding_font_list[0],
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
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
      self.response.out.write(template.render(path, template_values))

# AJAX handler for converter
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


class DiacriticHandler(webapp2.RequestHandler):
  def get(self):
    global default_base_consonant

    # Generate combinations of base + diacritic pairs
    inchars = self.request.get('base', None)
    if not inchars:
      base_consonant = default_base_consonant
    elif inchars[0] == 'u':
      base_consonant = unichr(int(''.join(inchars[1:]), 16))
    else:
      # A unicode character
      base_consonant = inchars

    combos = []
    table = []
    singles = [' ', 'none']
    for y in diacritic_list:
      row = [y + ' (%4x)' %ord(y[0])]
      singles.append(base_consonant + y);
      for x in diacritic_list:
        text = base_consonant + y + x
        combos.append({'text': text,
                       'codes': ['%4x ' % ord(c) for c in text]})
        row.append(text)
      table.append(row)

    template_values = {
        'language': Language,
        'base_char': base_consonant.encode('utf-8'),
        'base_hex': ['%4x' % ord(x) for x in base_consonant],
        'diacritics': [x for x in diacritic_list],
        'diacritics_hex': ['%4x ' % ord(y[0]) for y in diacritic_list],
        'singles': singles,
        'combinations': combos,
        'table': table,
        'unicode_font_list': unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/diacritics.html')
    self.response.out.write(template.render(path, template_values))

langInstance = langInfo()

app = webapp2.WSGIApplication([
      ('/demo_' + LanguageCode + '/', base.LanguagesHomeHandler),
      ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
      ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
      ('/' + LanguageCode + '/downloads/', base.Downloads),
      ('/' + LanguageCode + '/converter/', ConvertHandler),
      ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
      ('/' + LanguageCode + '/diacritic/', DiacriticHandler),
    ],
  debug=True,
  config={'langInfo': langInstance}
)
