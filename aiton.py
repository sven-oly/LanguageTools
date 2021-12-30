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

Language = 'Aiton'
Language_native = '(တႝ)ဢႝတွꩫ်'
LanguageCode = 'aio'
ScriptCode = 'Mymr'

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
  {'linkText': 'Wikipedi Aiton language',
   'ref': 'https://en.wikipedia.org/wiki/Aiton_language'
   },
  # {'linkText': 'Ethnolog',
  #  'ref': 'https://www.ethnologue.com/language/lep'
  # },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
          {'source': '/fonts/ahom_aiton/Aitongr.ttf',
           'family': 'Aitongr',
           'longName': 'Aiton Gr',
           },
          {'source': '/fonts/ahom_aiton/AitonUni.gr_2.ttf',
           'family': 'Aitongr2',
           'longName': 'Aiton Uni Gr2',
           },
          {'source': '/fonts/Myanmar/NotoSansMyanmar-Regular.ttf',
           'family': 'NotoSansMyanmar',
           'longName': 'Noto Sans Myanmar',
           },
          {'source': '/fonts/Myanmar/NotoSerifMyanmar-Light.ttf',
           'family': 'NotoSerifMyanmarLight',
           'longName': 'Noto Serif Myanmar Light',
           },
        ]

        self.encoding_font_list = [
          {
            'font_path': '/fonts/ahom_aiton/AITON.TTF',
            'font_name': 'Aiton',
            'display_name': 'Aiton',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': LanguageCode,
           'longName': 'Tai Aiton',
           },
        ]

        self.links = links

        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

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
], debug=True,
  config={'langInfo': langInstance}
)
