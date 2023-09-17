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

Language = 'Kuṛmāli / Kudmali'
Language_native = 'कु ड़मालि, কুড়ম ািল, କୁଡ଼ମାଲ, Kurmali'
LanguageCode = 'kyw'
ScriptCode = 'Latn'
ScriptName = 'Chisoi'

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Converter',
     'ref': '/' + LanguageCode + '/convertUI/'
    },
  # {'linkText': 'Font conversion summary',
  #   'ref': '/' + LanguageCode + '/encodingRules/'
  # },
    {'linkText': 'Resources',
     'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'Unicode proposal 22218r3',
     'ref': 'https://www.unicode.org/L2/L2022/22218r3-chisoi.pdf'
    },
  # {'linkText': 'THIS SCRIPT',
  #  'ref': 'https://en.wikipedia.org/wiki/XYZ_alphabet'
  # },
  # {'linkText': 'Wikipedi page',
  #  'ref': 'https://en.wikipedia.org/wiki/XYZ_language'
  # },
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
            {'family': 'BiswaUnicode_cwc',
           'longName': 'Biswa Kurmali Unicode cwc',
           'source': '/fonts/Kurmali/BiswaUnicode_cwc.ttf',
           },
            {'family': 'BiswaASCII_cwc',
           'longName': 'Biswa Kurmali ASCII cwc',
           'source': '/fonts/Kurmali/BiswasASCII_cwc.ttf',
           },
            {'family': 'NotoSans',
           'longName': 'Noto Sans',
           'source': '/fonts/NotoSans-Regular.ttf',
           },
        ]

        self.encoding_font_list = [
          # {
          #   'font_path': '/fonts/Kurmali/BiswaKurmaliChisoi_1.ttf',
          #   'font_name': 'Biswa Kurmali Chisoi',
          #   'display_name': 'Biswa Kurmali Chisoi',
          # },
            {'font_name': 'BiswaASCII_cwc',
           'display_name': 'Biswa Kurmali cwc',
           'font_path': '/fonts/Kurmali/BiswasASCII_cwc.ttf',
           },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': 'kyw2',
           'longName': 'Kurmali Chisoi Unicode',
           'fontFamily': 'BiswaUnicode_cwc',
           },
          {'shortName': 'kyw3',
           'longName': 'Kurmali Chisoi Unicode one layer',
           'fontFamily': 'BiswaUnicode_cwc',
           },
          {'shortName': 'kyw1',
           'longName': 'Kurmali Chisoi 1',
           'fontFamily': 'BiswaKurmaliChisoi_ASCII',
           },
        ]

        self.links = links

        # Unicode range
        self.unicodeRanges = [('\U016D80', '\U016D9d'), ('\U016Da0', '\U016Da9')]
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
                'name': 'KeyMan 1.0 for Kurmali Chisoi 8-Aug-2023',
                'source': '/resources/kyw/kurmali.kmp',
                'description': 'Keyboard for Mobile & Desktop 8-Aug-2023',
                'instructions': '',
            }
        ]

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
