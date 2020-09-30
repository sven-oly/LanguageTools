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

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Tibetan'
Language_native = 'བོད་སྐྲད་'
LanguageCode = 'bod'

encoding_font_list = [
  {
  },
]

unicode_font_list = [
  {
    'source': '/fonts/tibetan/NotoSansTibetan-Regular.ttf',
    'family': 'NotoSansTibetan',
    'longName': 'Noto Sans Tibetan',
  },
  {
    'source': '/fonts/tibetan/BabelStoneTibetan.ttf',
    'family': 'BabelStoneTibetan',
    'longName': 'Babel Stone Tibetan',
  },
  {
    'source': '/fonts/tibetan/Jomolhari-alpha3c-0605331.ttf',
    'family': 'Jomolhari',
    'longName': 'Jomolhari-alpha3c',
  },
  {
    'source': '/fonts/tibetan/TibMachUni-1.901b.ttf',
    'family': 'TibMachUni',
    'longName': 'TibMachUni - 1.901b',
  },
  {
    'family': 'MonlamBodyig',
    'source': '/fonts/tibetan/monlam bodyig.ttf',
    'longName': 'Monlam',
  }
]

kb_list = [
  # First two are tests for CLDR keyboard source
  {'shortName': 'fr',
   'longName': 'French CLDR',
   },
  {'shortName': 'ga_Ogam',
   'longName': 'ga Ogam CLDR',
   },
  {'shortName': 'bo' + '_wylie',
   'longName': 'Tibetan' + ' Wylie',
   },
  {'shortName': 'bo',
   'longName': Language,
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
    {'linkText': 'Unicode page',
     'ref': 'https://www.unicode.org/charts/PDF/U0F00.pdf'
    },
    {'linkText': 'Tibetan script',
     'ref': 'https://en.wikipedia.org/wiki/Tibetan_alphabet'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Tibetan_language'
    },
    {'linkText': 'Ethnolog',
     'ref': 'https://www.ethnologue.com/language/bod'
    },
    {'linkText': 'Combiners',
     'ref': '/bod/diacritic/'
     },
]

diacritic_list = [unichr(x) for x in range(0x0f34, 0x0f3a)] + \
  [unichr(x) for x in range(0x0f33, 0x0f40)] + \
  [unichr(x) for x in range(0x0f71, 0x0f87)] + \
  [unichr(x) for x in range(0x0f8d, 0x0fbd)]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'bo'
    self.Language = 'Tibetan'
    self.Language_native = u'བོད་སྐད།'
    self.direction = 'ltr'

    self.diacritic_list = diacritic_list

    self.base_consonant = u'𖫧'
    self.baseHexUTF16 = self.base_consonant

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.kb_list = [
      {
        'shortName': self.LanguageCode,
        'longName': 'Tibetan',
        'jsName': self.LanguageCode,
        'instructions': None,
        'font': 'NotoSansTibetan',
      },
      {
        'shortName': self.LanguageCode + '_wylie',
        'longName': 'Tibetan Wylie',
        'jsName': self.LanguageCode + '_wylie',
        'instructions': None,
        'font': 'NotoSansTibetan',
      },
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0x0f00, 0x0fdb)])]

codepoint_list = [unichr(x) for x in range(0x0f00, 0x0fdb)]

default_base_consonant = u'\u0f41'


# Shows keyboards
class IndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
        'language': Language,
        'langTag': LanguageCode,
        'font_list': unicode_font_list,
        'lang_list': None,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldCharList = [unichr(x) + ' ' for x in xrange(0x20, 0x7e)]
      oldChars = ''.join(oldCharList)
      text = self.request.get('text', oldChars)
      font = self.request.get('font')
      testStringList = [
          {'name': 'Test 1', # Note: must escape the single quote.
           'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
           '\u000a\u000b'},
      ]

      oldInput = text

      unicodeChars = [unichr(x) for x in xrange(0x0f00, 0x0fdb)]
      combineList = diacritic_list
      unicodeCombiningChars = ' '.join(diacritic_list)
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
          'unicodeChars': ' '.join(codepoint_list),
          'combiningChars': unicodeCombiningChars,
          'showNormalize': True,
      }
      path = os.path.join(os.path.dirname(__file__), 'translit_general.html')
      self.response.out.write(template.render(path, template_values))

class EncodingRules(webapp2.RequestHandler):
    def get(self):

      template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
        'language': Language,
        'langTag': LanguageCode,
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
        {'shortName':  LanguageCode,
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
      self.response.out.write(template.render(path, template_values))


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
    path = os.path.join(os.path.dirname(__file__), 'diacritics.html')
    self.response.out.write(template.render(path, template_values))

class TibetanHomeHandler(webapp2.RequestHandler):
    def get(self):
      font_list = [
        {
          'source': '/fonts/tibetan/NotoSansTibetan-Regular.ttf',
          'family': 'NotoSansTibetan',
          'longName': 'Noto Sans Tibetan',
        },
        {
          'source': '/fonts/tibetan/BabelStoneTibetan.ttf',
          'family': 'BabelStoneTibetan',
          'longName': 'Babel Stone Tibetan',
        },
        {
          'source': '/fonts/tibetan/Jomolhari-alpha3c-0605331.ttf',
          'family': 'Jomolhari',
          'longName': 'Jomolhari-alpha3c',
        },
        {
          'source': '/fonts/tibetan/TibMachUni-1.901b.ttf',
          'family': 'TibMachUni',
          'longName': 'TibMachUni - 1.901b',
        },
      ]
      template_values = {
        'font_list': font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_tibetan.html')
      self.response.out.write(template.render(path, template_values))

langInstance = langInfo()

app = webapp2.WSGIApplication([
    ('/' + LanguageCode + '/', IndigenousHomeHandler),
    ('/' + LanguageCode + '/compare/', TibetanHomeHandler),
    ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/encodingRules/', EncodingRules),
    ('/' + LanguageCode + '/diacritic/', DiacriticHandler),
    ],
  debug=True,
  config = {'langInfo': langInstance}
)
