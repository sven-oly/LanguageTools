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

Language = 'Kalaḇari'
Language_native = 'Kalaḇari'
LanguageCode = 'ijn'
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
   'ref': 'https://en.wikipedia.org/wiki/Kalabari_language'
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
           'longName': 'Kaliḇari 1',
           'instructions': 'To add diacritic marks:\u000a' +
                           '· Use upper left key (back quote `) to add a lower dot   \u0323 after a letter such as Ḅ.\u000a' +
                           '· Shift-back quote to add an accent such as á.\u000a' +
                           '· Type two underscores to add a line below, e.g., u̱.\u000a' +
                           'You can also use combinations of these such as á̱.\u000a' +
                           'And try the Kalaḇari 2 keyboard from the menu above.'
           },
          {'shortName': LanguageCode + '2',
           'longName': 'Kalaḇari 2',
           'instructions': 'To add diacritic marks:\u000a' +
                           '· Or type two semicolons ; to add a lower dot  \u0323 after a letter such as b.\u000a' +
                           '· Type two apostrophes \' to add an accent such as á.\u000a' +
                           '· Type two back slash \\\\ to add a line below, e.g., u̱.\u000a' +
                           'You can also use combinations of these such as á̱.\u000a' +
                           'And try the Kalaḇari 1 keyboard from the menu above.'
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
        self.text_file_list = [
          {
            'name': 'KeyMan Kalabari 1.1',
            'source': '/resources/ijn/kalabari1.1.kmp',
            'description': 'Preliminary version 1.1, 3-APR-2022'
          },
          {
            'name': 'KeyMan Kalabari prototype',
            'source': '/resources/ijn/kalabari.kmp',
            'description': 'Preliminary version 1.0, 29-Jan-2022'
          },

        ]

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
