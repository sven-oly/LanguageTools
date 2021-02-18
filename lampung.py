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

#import translit
import transliterate
# import transrule_nv

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

import base

Language = 'Lampung'
Language_native = 'Lampung language'
LanguageCode = 'lampung'

encoding_font_list = [
  {
    'font_path': '/fonts/lampung/kaganga_lampung_21.ttf',
    'font_name': 'KagangaLampung21',
    'display_name': 'Kaganga Lampung 21',
    'note': 'Provided by partner',
  },
]

unicode_font_list = [
  {
    'family': 'LampungPUA',
    'longName': 'Lampung PUA',
    'source': '/fonts/lampung/kaganga_lampung_21_pua.ttf',
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
    # {'linkText': 'Converter',
    # 'ref': '/' + LanguageCode + '/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/' + LanguageCode + '/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'Unicode page',
     'ref': 'https://www.unicode.org/charts/PDF/UAA00.pdf'
    },
    {'linkText': 'Cham script',
     'ref': 'https://en.wikipedia.org/wiki/Cham_alphabet'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Cham_language'
    },
    {'linkText': 'Ethnolog',
     'ref': 'https://www.ethnologue.com/language/cja'
    },
    {'linkText': 'Combiners',
     'ref': '/cja/diacritic/'
     },
]


codepoint_list = [unichr(x) for x in range(0xaa00, 0xaa5f)]

diacritic_list = [unichr(x) for x in range(0xaa29, 0xaa37)] + \
  [unichr(x) for x in range(0xaa43, 0xaa44)] + \
  [unichr(x) for x in range(0xaa4c, 0xaa4e)]
default_base_consonant = u'\uaa06'


class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u'ẹ ẹ́ ẹ̀ Ẹ Ẹ́ Ẹ̀ ọ ọ́ ọ̀ Ọ́ Ọ̀ ṣ Ṣ ń ǹ n̄ Ń Ǹ N̄ ḿ m̀ m̄ Ḿ M̀ M̄'
    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.lang_list = [Language]
    self.kb_list = kb_list
    self.links = links


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

      unicodeChars = [unichr(x) for x in xrange(0xaa2, 0xaa37)]
      combineList = [unichr(x) for x in xrange(0xaa2, 0xaa37)]
      combineList = [unichr(x) for x in xrange(0xa43, 0xaa44)]
      combineList = [unichr(x) for x in xrange(0xa4c, 0xaa4d)]
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
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
      self.response.out.write(template.render(path, template_values))


langInstance = langInfo()

app = webapp2.WSGIApplication([
    ('/' + LanguageCode + '/', ConvertUIHandler),
    ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
    ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ],
  debug=True,
  config={'langInfo': langInstance}
)
