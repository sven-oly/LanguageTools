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

Language = 'Lushootseed'
Language_native = 'xʷəlšucid'
LanguageCode = 'lut'
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
  # {'linkText': 'Resources',
  #   'ref': '/' + LanguageCode + '/downloads/'
  # },
  # {'linkText': 'Unicode page',
  #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
  # },
  {'linkText': 'Lushootseed Wikipedia',
   'ref': 'https://en.wikipedia.org/wiki/Lushootseed'
  },
  {'linkText': 'Keyman Web',
   'ref': 'https://keymanweb.com/?_ga=2.156110651.1846595742.1636523819-45143037.1630947216#lut,Keyboard_lushootseed'
  },
  {'linkText': 'LanguageGeek keyboard',
   'ref': 'https://www.languagegeek.com/keyboardmaps/blackfoot_syllabicskbd.html'
  },
  # {'linkText': 'Combiners',
  #  'ref': '/lep/diacritic/'
  #  },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u'"x̌əqusəb čəxʷə c’agʷačib"'
        self.unicode_font_list = [
          {'family': 'Lushootseed-School',
            'longName': 'Lushootseed School',
            'source': '/fonts/Lushootseed/Lushootseed-School.ttf',
          },
          {'family': 'Lushootseed-Sulad',
          'longName': 'Lushootseed Sulad',
          ' source': '/fonts/Lushootseed/Lushootseed-Sulad.ttf',
          },
          {'family': 'NotoSerif',
            'longName': 'Noto Serif',
            'source': '/fonts/NotoSerif-Regular.ttf',
          },
          {'family': 'NotoSans',
            'longName': 'Noto Sans',
            'source': '/fonts/NotoSans-Regular.ttf',
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