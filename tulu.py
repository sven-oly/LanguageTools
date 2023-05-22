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

import os
import webapp2

import base

from google.appengine.ext.webapp import template

Language = 'Tulu'
Language_native = '???ᰶ'
LanguageCode = 'tcy'
ScriptCode = 'Tulu'

encoding_font_list = [
  # {
  #   'font_path': '/fonts/xyz.ttf',
  #   'font_name': 'xyz',
  #   'display_name': 'xyz',
  # },
]
# Not yet in Unicode
unicode_font_list = [
  {
      'family': 'TuluSri20',
      'longName': 'Tulu Sri 20.20',
      'source': '/fonts/tulu/TULUSRI20.20.ttf',
      'ref': 'https://thetulufont.in'
  },
  {
    'family': 'TuluSri20',
    'longName': 'Tulu Sri 10.00',
    'source': '/fonts/tulu/TULUSRI10.00.ttf',
    'ref': 'http://www.thetulufont.in/'
  },
  {
    'family': 'SriType2',
    'longName': 'Srihari Type 2',
    'source': '/fonts/tulu/Srihari TYPE 2.ttf',
    'ref': 'https://thetulufont.com/the-tulu-font'
  },
  {
    'family': 'SriType1',
    'longName': 'Srihari Type 1',
    'source': '/fonts/tulu/Srihari TYPE 1.ttf',
    'ref': 'https://thetulufont.com/the-tulu-font'
  },
]

kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   'instructions': ('This is a non-Unicode font encoding'),
   },
]

links = [
  {'linkText': 'Keyboard',
   'ref': '/' + LanguageCode + '/'
  },
  {'linkText': 'KB transforms',
   'ref': '/' + LanguageCode + '/kbtransforms/'
   },
  {'linkText': 'Unicode proposal 22031',
    'ref': 'https://www.unicode.org/L2/L2022/22031-tulu-tigalari-prop.pdf'
  },
  {'linkText': 'Unicode proposal 21019',
    'ref': 'https://www.unicode.org/L2/L2021/21019-tulu.pdf'
  },
  {'linkText': 'Unicode proposal 21086',
   'ref': 'http://www.unicode.org/L2/L2021/21086-tulu-tigalari.pdf'
  },
  {'linkText': 'The Tulu Font (ASCII encoded)',
    'ref': 'http://thetulufont.in'
  },
    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
    # {'linkText': 'Resources',
    #   'ref': '/' + LanguageCode + '/downloads/'
    # },
    # {'linkText': 'Unicode page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
    # },
    # {'linkText': 'Lepcha script',
    #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_alphabet'
    # },
    # {'linkText': 'Wikipedi page',
    #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_language'
    # },
    # {'linkText': 'Ethnolog',
    #  'ref': 'https://www.ethnologue.com/language/lep'
    # },
    # {'linkText': 'Combiners',
    #  'ref': '/lep/diacritic/'
    #  },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.lang_list = [LanguageCode]  # This may be extended

    self.kb_list = kb_list
    self.links = links

    # For additional resources for download
    self.text_file_list = []

    self.unicode_base = '\ud804\udf80'  # u+11380 to u+113e2


    # TODO: Fill in the rest of the common data.

# TODO: Fill in with diacritics
diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
#TODO: Fill in base consonant
default_base_consonant = u'\0x61'

kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   'fontFamily': 'SriType2,arial',
   },
]

encodedRanges = [
  (0x0030, 0x0030),
  (0x0d00, 0xd7f),
]


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
], debug=True,
                              config={'langInfo': langInstance}
)
