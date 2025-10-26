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

import base

Language = 'Khamti'
Language_native = '(တဲး)ၵမ်းတီ'
LanguageCode = 'kht'
ScriptCode = 'Mymr'


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
          { 'source': '/fonts/khamti/NamKio-Regular.ttf',
            'family': 'NamKio-Regular',
            'longName': 'NamKio Regular',
            },
          { 'source': '/fonts/khamti/NamKio-Bold.ttf',
            'family': 'NamKio-Bold',
            'longName': 'NamKio Bold',
            },
          { 'source': '/fonts/khamti/NamKioBook-Regular.ttf',
            'family': 'NamKioBook-Regular',
            'longName': 'NamKioBook Regular',
            },
          { 'source': '/fonts/khamti/NamKioBook-Bold.ttf',
            'family': 'NamKioBook-Bold',
            'longName': 'NamKioBook Bold',
            },
          { 'source': '/fonts/Padauk-Regular.ttf',
            'family': 'Padauk',
            'longName': 'Padauk',
            },
          { 'source': '/fonts/Myanmar/NotoSansMyanmar-Regular.ttf',
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
            'font_path': '/fonts/khamti/Tokmaaitai.ttf',
            'font_name': 'Tokmaaitai',
            'display_name': 'Tokmaai Tai',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
            {'shortName': 'kht',
             'longName': 'Khamti',
             'fontFamily': 'NotoSansMyanmarRegular',
            },            
        ]

        self.links = [
            {'linkText': 'Keyboard',
             'ref': '/' + LanguageCode + '/'
            },
            {'linkText': 'Converter',
             'ref': '/convert/' + LanguageCode
            },
            {'linkText': 'Font conversion summary',
             'ref': '/encodingRules/' + LanguageCode
            },
            {'linkText': 'Word search',
             'ref': '/wordsearch/' + self.LanguageCode
            },
            #   'ref': '/' + LanguageCode + '/encodingRules/'
            # },
            # {'linkText': 'Resources',
            #   'ref': '/downloads/' + LanguageCode
            # },
            # {'linkText': 'Unicode page',
            #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
            # },
            # {'linkText': 'Lepcha script',
            #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_alphabet'
            # },
            {'linkText': 'Wikipedi page',
             'ref': 'https://en.wikipedia.org/wiki/Khamti_language'
            },
            # {'linkText': 'Ethnolog',
            #  'ref': 'https://www.ethnologue.com/language/lep'
            # },
        ]
        
        # TODO!
        consonants = [
            0x1000,
            0x1002,
            0x1004,
            0x1010,
            0x1011,
            0x1015,
            0x1019,
            0x101A,
            0x101B,
            0x101C,
            0x101D,
            0x1022,
            0x1075,
            0x1078,
            0x1079,
            0x107B,
            0x107C,
            0x107F,
            0x1080,
            0xAA61,
            0xAA62,
            0xAA63,
            0xAA64,
            0xAA65,
            0xAA66,
            0xAA67,
            0xAA68,
            0xAA69,
            0xAA6A,
            0xAA6B,
            0xAA6C,
            0xAA6D,
            0xAA6E,
            0xAA6F,
            0xAA71,
        ]
        
        diacritics = [
            0x102D,
            0x102E,
            0x102F,
            0x1030,
            0x1031,
            0x1036,
            0x1038,
            0x103A,
            0x103B,
            0x103C,
            0x103D,
            0x1062,
            0x1082,
            0x1083,
            0x1084,
            0x1085,
            0x1086,
            0x1087,
            0x1088,
            0x1089,
            0x108A,
            0x109A,
            0x109B,
            ]
        logograms = [
            0xAA74,
            0xAA75,
            0xAA76,
        ]
        self.unicodeChars = [chr(x) for x in consonants]
        self.diacritic_list = [chr(x) for x in diacritics]
        for x in diacritics:
            self.unicodeChars.append(chr(x))
        for x in logograms:
            self.unicodeChars.append(chr(x))
        self.fillChars = self.unicodeChars

        self.unicodeCombiningChars = self.diacritic_list

        self.default_base_consonant = 'u\1000'

        self.encodedRanges = [
        ]

        # For additional resources for download
        self.text_file_list = []

        # TODO: Fill in the rest of the common data.


langInstance = langInfo()

# app = webapp2.WSGIApplication([
#   ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
#   ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
#   ('/' + LanguageCode + '/downloads/', base.Downloads),
#   ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
#   ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
# ], debug=True,
#   config={'langInfo': langInstance}
# )

