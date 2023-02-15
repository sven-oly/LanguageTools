# -*- coding: utf-8 -*-
# !/usr/bin/env python
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

import webapp2

import base

# For Python 2.x. and Python
try:
    unichr
except NameError:
    unichr = chr

Language = 'Kihunde'
Language_native = 'TBD'
LanguageCode = 'hke'
ScriptCode = 'Latn'

links = [
  {'linkText': 'Keyboard',
   'ref': '/' + LanguageCode + '/'
   },
  # {'linkText': 'Converter',
  #  'ref': '/' + LanguageCode + '/convertUI/'},
  # {'linkText': 'Font conversion summary',
  #   'ref': '/' + LanguageCode + '/encodingRules/'
  # },
  {'linkText': 'Resources',
    'ref': '/' + LanguageCode + '/downloads/'
  },
  # {'linkText': 'Unicode page',
  #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
  # },
  # {'linkText': 'THIS SCRIPT',
  #  'ref': 'https://en.wikipedia.org/wiki/XYZ_alphabet'
  # },
  {'linkText': 'Wikipedi page',
   'ref': 'https://en.wikipedia.org/wiki/Hunde_language'
  },
  {'linkText': 'DEPedia',
   'ref': 'https://dbpedia.org/page/Hunde_language'
   },
  # {'linkText': 'Ethnolog',
  #  'ref': 'https://www.ethnologue.com/language/XYZ'
  # },
  # {'linkText': 'Combiners',
  #  'ref': '/lep/diacritic/'
  #  },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
          {'family': 'NotoSerif',
           'longName': 'Noto Serif',
           'source': '/fonts/NotoSerif-Regular.ttf',
           },
          {'family': 'NotoSans',
           'longName': 'Noto Sans',
           'source': '/fonts/NotoSans-Regular.ttf',
           },
          {'family': 'CroisantOne',
           'longName': "Croissnant One",
           'source': '/fonts/CroissantOne-Regular.ttf',
           'attribution': 'http://fontpro.com/croissant-one-font-16469',
          }
        ]

        self.encoding_font_list = [
          {
            'font_path': '/fonts/xyz.ttf',
            'font_name': 'xyz',
            'display_name': 'xyz',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': 'hke1',
           'longName': 'Kihunde 1',
           },
        ]

        self.links = links

        # Unicode range
        self.unicodeRanges = [('\u0020', '\u007f')]
        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = [
          {
            'name': 'KeyMan Kihunde Mobile + desktop 1.21',
            'source': '/resources/hke/kihunde_1.2.kmp',
            'description': 'Version 1.21 Mobile update 14-Feb-2023'
          },
          # {
          #   'name': 'KeyMan Kihunde Mobile + desktop 1.2',
          #   'source': '/resources/hke/kihunde_1.2.kmp',
          #   'description': 'Version 1.2 Mobile update 16-Jan-2023'
          # },
          # {
          #       'name': 'KeyMan Kihunde Mobile + desktop 1.1',
          #       'source': '/resources/hke/kihunde_20230101.kmp',
          #       'description': 'Version 1.1 updated 1-Jan-2023'
          #   },
            {
                'name': 'KeyMan Kihunde Wordlist 1.0',
                'source': '/resources/hke/kihunde1_0.model.kmp',
                'description': 'Wordlist V1.0 updated 20-Nov-2022'
            },            ]
        # TODO: Fill in the rest of the common data.


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + langInstance.LanguageCode + '/wordsearch/', base.WordSearchHandler),
  ('/' + langInstance.LanguageCode + '/keyman/', base.KeyManHandler),
], debug=True,
  config={'langInfo': langInstance}
)
