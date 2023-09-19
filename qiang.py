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

Language = 'Qiang'
Language_native = 'Rme'
LanguageCode = 'qiang'
ScriptCode = 'Rmea'

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
     {'linkText': 'Converter',
      'ref': '/' + LanguageCode + '/convertUI/'},
     {'linkText': 'Font conversion summary',
       'ref': '/' + LanguageCode + '/encodingRules/'
     },
    # {'linkText': 'Resources',
    #   'ref': '/' + LanguageCode + '/downloads/'
    # },
    # {'linkText': 'Unicode page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
    # },
    {'linkText': 'Omniglot on Rma script',
     'ref': 'https://www.omniglot.com/writing/rma.htm'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Qiang_language'
    },
    {'linkText': 'weijiuqiao github',
     'ref': 'https://weijiuqiao.github.io/qiang_script/'
    },
    {'linkText': 'Unicode proposal 2022',
     'ref': 'https://www.unicode.org/L2/L2022/22130-rma-script.pdf'
    },
    # {'linkText': 'Combiners',
    #  'ref': '/qiang/diacritic/'
    #  },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
          {
            'source': '/fonts/Qiang/v-Rma-serif-Unicode-Regular.ttf',
            'longName': 'Rma-serif Unicode',
            'family': 'Rma-serif Unicode',
           },
          {'family': 'NotoSans',
           'longName': 'Noto Sans',
           'source': '/fonts/NotoSans-Regular.ttf',
           },
        ]

        self.encoding_font_list = [
          {
            'font_path': '/fonts/Qiang/v-Rma-serif-Regular.ttf',
            'display_name': 'Rma-serif ASCII',
            'font_name': 'Rma-serif ASCII',
           },
          {
            'font_path': '/fonts/Qiang/v-Rma-serif-Regular_bar.otf',
            'display_name': 'Rma-serif ASCII bar',
            'font_name': 'Rma-serif ASCII bar',
           },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        # Unicode layouts
        self.kb_list = [
          {'shortName': 'qiang_unicode',
           'longName': 'Qiang unicode'
           }
        ]

        self.links = links

        # Unicode range
        self.unicodeRanges = [('\ud818\udd40', '\ud818\udd7f')]
        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\d181\udd401'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = []

        self.to_keyman = True
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
