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

Language = 'Iñupiaq'
Language_native = 'Iñupiaq'
LanguageCode = 'ik'
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
    {'linkText': 'Unicode page',
     'ref': 'https://www.unicode.org/charts/PDF/U1D2C0.pdf'
    },
    {'linkText': 'Unicode proposal 2021',
     'ref': 'https://www.unicode.org/L2/L2021/21058r-kaktovik-numerals.pdf'
    },
    {'ref': 'https://en.wikipedia.org/wiki/Kaktovik_numerals',
     'linkText': 'Kaktovik numerals'},
    {'linkText': 'Converter (non-unicode)',
     'ref':'https://www.dcode.fr/kaktovik-numerals'
    },
    {'ref': 'https://en.wikipedia.org/wiki/I%C3%B1upiaq_language',
     'linkText': 'Iñupiaq language'},
    { 'ref': 'https://www.adn.com/alaska-life/2022/11/06/numerals-invented-by-kaktovik-students-can-now-be-used-digitally/',
      'linkText': 'Anchorage Daily News article'
      },
    {'linkText': 'Kaktovik calculator',
     'ref': '/' + LanguageCode + '/numerals/'
    },
    {'linkText': 'Resources & Downloads',
     'ref': '/ik/downloads/'
    },
   

]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
            {'family': 'GentiumKaktovik',
             'longName': 'Gentium Kaktovik',
             'source': '/fonts/Inupiaq/GentiumKaktovik.ttf',
             'font_path': '/fonts/Inupiaq/GentiumKaktovik.ttf',
             'font_name': 'GentiumKaktovik',
             'display_name': 'Gentium Kaktovik',
            },
            {'family': 'NotoSansSymbols2',
             'longName': 'NotoSans Symbols2 Prerelease',
             'source': '/fonts/Inupiaq/NotoSansSymbols2-Regular.ttf',
             'font_path': '/fonts/Inupiaq/GentiumKaktoviGentiumKaktovik.ttf',
             'font_name': 'NotoSansSymbols',
             'display_name': 'NotoSans Symbols2 Prerelease',
            }
            
        ]
        self.encoding_font_list = [
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': LanguageCode + '_numerals',
           'longName': 'Kaktovik numerals',
           'instructions': 'Numerals on top row and shifted top row. Alternative: Use backslash + digit for numerals ten-nineteen. Derived from https://www.languagegeek.com/inu/keyboard/keymaps/Inupiaq.pd'
           },
        ]

        self.links = links

        # Unicode range
        self.unicodeRanges = [('U00001D2C0', '\U00001D2D3')]
        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = [
        ]
        # TODO: Fill in the rest of the common data.


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + LanguageCode + '/wordsearch/', base.WordSearchHandler),
  ('/' + LanguageCode + '/keyman/', base.KeyManHandler),
    ('/' + LanguageCode + '/numerals/', base.NumeralsHandler),
], debug=True,
  config={'langInfo': langInstance}
)
