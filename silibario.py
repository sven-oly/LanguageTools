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

Language = 'Silibario'
Language_native = '???ᰶ'
LanguageCode = 'sxx'
ScriptCode = 'sxx'

encoding_font_list = [
  {
    'font_path': '/fonts/Silibario_Amazonico/NiSans27.ttf',
    'source': '/fonts/Silibario_Amazonico/NiSans27.ttf',
    'family': 'nisans27',
    'font_name': 'nisans27',
    'display_name': 'Ni Sans 27',
    'longName': 'Ni Sans 27',
  },
]

unicode_font_list = encoding_font_list

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
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

    self.lang_list =     self.lang_list = [
      {'shortName':  'kichwa',
       'longName': 'kichwa',
       #'reference': 'https://tau.olunga.to/keyboard.html'
       },
    ]
    self.kb_list = kb_list = [
      {'shortName': 'silibario',
       'longName': 'silibario',
       'fontFamily': 'nisans27',
       },
      {'shortName': 'kichwa',
       'longName': 'kichwa',
       'fontFamily': 'Arial',
       },
    ]
    self.links = links

    # For additional resources for download
    self.text_file_list = []

    # TODO: Fill in the rest of the common data.

    # TODO: Fill in with diacritics
    self.diacritic_list = [unichr(x) for x in range(0x20, 0xfe)]
    #TODO: Fill in base consonant
    self.default_base_consonant = u'\0x61'



encodedRanges = [
  (0x20, 0x7b),
]


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
], debug=True,
                              config={'langInfo': langInstance}
)
