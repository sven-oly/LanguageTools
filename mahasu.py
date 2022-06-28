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

Language = 'Mahasu Pahari'
Language_native = '𑚢𑚩𑚭𑚨𑚱 𑚞𑚩𑚭𑚪𑚯'
LanguageCode = 'bfz'
ScriptCode = 'Takr'

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
  {
    'linkText': 'Takri Unicode page',
    'ref': 'https://www.unicode.org/charts/PDF/U11680.pdf',
  },
  {'linkText': 'Takri script',
   'ref': 'https://en.wikipedia.org/wiki/Takri_script'
   },
  {'linkText': 'Download Noto Takri Unicode font',
   'ref': 'https://fonts.google.com/noto/specimen/Noto+Sans+Takri'
  },
  {'linkText': 'Mahasu language',
   'ref': 'https://en.wikipedia.org/wiki/Mahasu_Pahari'
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
          {'family': 'NotoTakri',
           'longName': 'Noto Takri',
           'source': '/fonts/Takri/NotoSansTakri-Regular.ttf',
           },
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
          {'shortName': 'bfz1',
           'longName': 'Mahasu 1',
           },
        ]

        self.links = links

        # Unicode range
        # \ud805\ude80 - \ud805\ude8c9 is the UTF-16 range
        self.unicodeRanges = [('\U011680', '\U0116C9')]
        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x0300, 0x032f)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\ud805\ude8a'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = []

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
