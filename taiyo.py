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

import base


Language = 'Tai Yo'
Language_native = 'ไทญ้อ'
LanguageCode = 'tyj'
ScriptCode = 'Latn'


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
          {'family': 'NotoTaiYoSerif',
           'longName': 'Noto Tai Yo',
           'source': '/fonts/TaiYo/NotoSerifTaiYo-Regular.ttf',
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
          {'shortName': 'tyj2',
           'longName': 'Tai Yo with tone marks',
           'fontFamily': 'NotoTaiYoSerif',
           },
          {'shortName': 'tyj1',
           'longName': 'Tai Yo 1',
           'fontFamily': 'NotoTaiYoSerif',
           },
        ]

        self.links = [
            {'linkText': 'Keyboard',
             'ref': '/langbase/' + self.LanguageCode + '/'
            },
            {'linkText': 'Word search',
             'ref': '/wordsearch/' + self.LanguageCode
            },
            
            # {'linkText': 'Converter',
            #  'ref': '/' + LanguageCode + '/convertUI/'},
            # {'linkText': 'Font conversion summary',
            #   'ref': '/' + LanguageCode + '/encodingRules/'
            # },
            {'linkText': 'Resources', 'ref': '/downloads/' + self.LanguageCode
            },
            {'linkText': 'Unicode proposal 22-289R',
             'ref': 'https://www.unicode.org/L2/L2022/22289r-tai-yo-script.pdf'
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

        # Unicode range
        self.unicodeRanges = [(chr(0x1E6C0), chr(0x1E6FF))]
        # TODO: Fill in with diacritics
        self.fillChars = [chr(x) for x in range(0x1e6c0, 0x1e6ff)]
        self.diacritic_list = [
            chr(x) for x in [0x16e3, 0x1e6e6, 0x1e6ee, 0x1e6ef, 0x1e6f5]]
        self.unicodeCombiningChars = self.diacritic_list
                              
        # TODO: Fill in base consonant
        self.default_base_consonant = chr(0x1e6c0)

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = [
            {
                'name': 'KeyMan 1.21 for Tai Yo Unicode - 22-Sept-2025',
                'source': '/resources/tyj/tai_yo_1.21.kmp',
                'description': 'Keyboard for Desktop',
                'instructions': '',
            },
            # {
            #     'name': 'KeyMan 1.1 for Tai Yo Unicode - 13-Nov-2023',
            #     'source': '/resources/tyj/tai_yo_1.1.kmp',
            #     'description': 'Keyboard for Desktop',
            #     'instructions': '',
            # }
            
        ]

        self.to_keyman = True

        # TODO: Fill in the rest of the common data.



langInstance = langInfo()
