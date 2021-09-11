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

Language = 'Laz'
Language_native = 'lazuri nena'
LanguageCode = 'lzz'
ScriptCode = 'latn'

encoding_font_list = [
  {
    'font_path': '/fonts/xyz.ttf',
    'font_name': 'xyz',
    'display_name': 'xyz',
  },
]

unicode_font_list = [
    {
        'family': 'NotoSans',
        'longName': 'Noto Sans',
        'source': '/fonts/NotoSans-Regular.ttf',
    },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'},
    {'linkText': 'Laz Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Laz_language'},
    {'linkText': 'KB transforms',
     'ref': '/' + LanguageCode + '/kbtransforms/'
     },
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


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = unicode_font_list
        self.encoding_font_list = encoding_font_list

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': 'lzz_Latn',
           'longName': 'Laz Latin',
           'instructions': 'Type ʒʒ, kk, pp, tt, zz, çç, ƷƷ, KK \u2026 to ' +
                           'add \u02d8 --> ʒ̆ k̆ p̆ t̆ z̆ ç̆ Ʒ̆ K̆ \u2026',
           'source': 'https://keyman.com/keyboards/lazuri',
           },
          # {'shortName': 'lzz_Geor',
          #  'longName': 'Laz Georgian',
          #  },
        ]
        self.links = links

        # For additional resources for download
        self.text_file_list = []

        # TODO: Fill in the rest of the common data.

        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x306, 0x306)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
          (0x20, 0xff),
        ]


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
], debug=True,
                              config={'langInfo': langInstance}
)
