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

Language = 'Wolof'
Language_native = '???ᰶ'
LanguageCode = 'wo'
ScriptCode = 'Gara'

encoding_font_list = [
  {
    'font_path': '/fonts/African_font_encodings/WOLOF.TTF',
    'font_name': 'Garay ASCII',
    'display_name': 'Garay ASCII',
  },
  {
    'font_path': '/fonts/African_font_encodings/CatyuBasic.ttf',
    'font_name': 'Catyu Basic',
    'display_name': 'Catyu Basic',
  },
]

unicode_font_list = [
    {
        'family': 'GarayAscii',
        'longName': 'Garay ASCII',
        'source': '/fonts/African_font_encodings/WOLOF.TTF',
    },
  {
    'source': '/fonts/African_font_encodings/CatyuBasic.ttf',
    'family': 'Catyu Basic',
    'longName': 'Catyu Basic',
  },
  {
    'source': '/fonts/African_font_encodings/CatyuBasic.otf',
    'family': 'Catyu Basic OTF',
    'longName': 'Catyu Basic OTF',
  },
]

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

    diacritic_list = [unichr(x) for x in range(0xa926, 0xa92d)]

    default_base_consonant = u'\u1c00'

    encodedRanges = [
      (0x20, 0x7b),
    ]

    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u'FILL IN'
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.lang_list = [LanguageCode]  # This may be extended

    kb_list = [
      {'shortName': LanguageCode + '_' + ScriptCode,
       'longName': Language + ' ' + ScriptCode,
       'font': ['GarayAscii'],
       },
      {'shortName': 'wo_Caty',
       'longName': "Wolof Catyu",
       'font': ['Catyu Basic', 'Catyu Basic OTF'],
       }
    ]
    self.kb_list = kb_list
    self.links = links

    # For additional resources for download
    self.text_file_list = []

    # TODO: Fill in the rest of the common data.

langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/keyboard/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
], debug=True,
                              config={'langInfo': langInstance}
)
