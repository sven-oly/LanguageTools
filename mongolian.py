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

import os
import webapp2

import base

from google.appengine.ext.webapp import template

Language = 'Mongolian'
Language_native = ''
LanguageCode = 'mn'
ScriptCode = 'Mong'

links = [
  {'linkText': 'Keyboard',
   'ref': '/' + LanguageCode + '/'
   },
  {'linkText': 'Mongolian Unicode',
   'ref': 'https://www.unicode.org/charts/PDF/U1800.pdf'},
  {'linkText': 'Mongolian Unicode Supplement',
   'ref': 'https://www.unicode.org/charts/PDF/U11660.pdf'},
  {'linkText': 'Mongolian script',
   'ref': 'https://en.wikipedia.org/wiki/Mongolian_script'},
  # {'linkText': 'Font conversion summary',
  #   'ref': '/' + LanguageCode + '/encodingRules/'
  # },
  # {'linkText': 'Resources',
  #   'ref': '/' + LanguageCode + '/downloads/'
  # },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.direction = 'writing-mode: vertical-lr';
        self.unicode_font_list = [
          {
            'family': 'NotoSansMongolian-Regular',
            'longName': 'Noto Sans Mongolian-Regular',
            'source': '/fonts/NotoSansMongolian-Regular.ttf',
          },
        ]

        self.encoding_font_list = [
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': LanguageCode,
           'longName': LanguageCode,
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
