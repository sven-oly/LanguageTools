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

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

import base

Language = 'Lepcha'
Language_native = 'ᰛᰩᰵ་ᰛᰵᰛᰧᰶ'
LanguageCode = 'lep'

encoding_font_list = [
  {
    'font_path': '/fonts/Shipmoo.ttf',
    'font_name': 'Shipmoo',
    'display_name': 'Shipmoo Lepcha',
  },
  {
    'font_path': '/fonts/JG_Lepcha.ttf',
    'font_name': 'JGLepcha',
    'display_name': 'JG Lepcha',
  },
]

unicode_font_list = [
    {
        'family': 'NotoSansLepcha',
        'longName': 'Noto Sans Lepcha',
        'source': '/fonts/NotoSansLepcha-Regular.ttf',
    },
    {
        'family': 'MingzatLepcha',
        'longName': 'Mingzat (SIL)',
        'source': '/fonts/Mingzat-R.woff',
    },
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
    {'linkText': 'Unicode page',
     'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
    },
    {'linkText': 'Lepcha script',
     'ref': 'https://en.wikipedia.org/wiki/Lepcha_alphabet'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Lepcha_language'
    },
    {'linkText': 'Ethnolog',
     'ref': 'https://www.ethnologue.com/language/lep'
    },
    {'linkText': 'Combiners',
     'ref': '/lep/diacritic/'
     },
]

diacritic_list = [unichr(x) for x in range(0x1c24, 0x1c38)]

default_base_consonant = u'\u1c00'

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.lang_list = [Language]
    self.kb_list = kb_list
    self.links = links


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldCharList = [unichr(x) + ' ' for x in xrange(0x20, 0x7b)] + \
                    [unichr(x) + ' ' for x in xrange(0xc0, 0xc6)] + \
                    [unichr(x) + ' ' for x in xrange(0xc8, 0xcf)] + \
                    [unichr(x) + ' ' for x in xrange(0xd2, 0xd7)] + \
                    [unichr(x) + ' ' for x in xrange(0xd9, 0xde)] + \
                    [unichr(x) + ' ' for x in xrange(0xe0, 0xe6)] + \
                    [unichr(x) + ' ' for x in xrange(0xe8, 0xf0)] + \
                    [unichr(x) + ' ' for x in xrange(0xf2, 0xf4)]
      oldChars = ''.join(oldCharList)
      text = self.request.get('text', oldChars)
      font = self.request.get('font')
      testStringList = [
          {'name': 'Test 1', # Note: must escape the single quote.
           'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
           '\u000a\u000b'},
      ]

      oldInput = text

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
          'regressionTest': True,
      }
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
      self.response.out.write(template.render(path, template_values))


langInstance = langInfo()

app = webapp2.WSGIApplication([
    ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
    ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ],
  debug=True,
  config={'langInfo': langInstance}
)
