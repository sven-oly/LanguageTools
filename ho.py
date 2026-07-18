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

Language = 'Ho'
Language_native = '𑢹𑣉𑣉 𑣎𑣋𑣜'
LanguageCode = 'hoc'
ScriptCode = 'Wara'

unicode_font_list = [
    {
        'family': 'NotoSansWarangCiti',
        'longName': 'Noto Sans Warang Citi',
        'source': '/fonts/hoc/NotoSansWarangCiti-Regular.ttf',
    },
    {
        'family': 'BoyoGagrai',
        'longName': 'Boyo Gagrai',
        'source': '/fonts/hoc/BoyoGagraittf',
    },
]

kb_list = [
    {'shortName': 'ho',
     'longName': 'ho',
     },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/langbase/%s' % LanguageCode
     },
    {'linkText': 'Converter',
     'ref': '/convert/%s' % LanguageCode},
    {'linkText': 'Font conversion summary',
     'ref': '/encodingRules/%s' % LanguageCode,
     },
    {'linkText': 'Resources',
     'ref': '/downloads/' + LanguageCode
     },
    {
        'linkText': 'Ho tribal language',
        'ref': 'http://ho.triballanguage.in/'
    },
    {'linkText': 'Unicode page',
     'ref': 'https://www.unicode.org/charts/PDF/U118A0.pdf'
     },
    {'linkText': 'Warang Citi script',
     'ref': 'https://en.wikipedia.org/wiki/Warang_Citi'
     },
    {'linkText': 'Ho Language',
     'ref': 'https://en.wikipedia.org/wiki/Ho_language'
     },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u'̄'
        self.unicode_font_list = unicode_font_list
        self.lang_list = [Language]
        self.kb_list = kb_list
        self.links = links

        self.encoding_font_list = [
            {
                'font_path': '/fonts/hoc/BoYo Warong Chiti - 04.ttf',
                'font_name': 'BoYoWarongCiti',
                'display_name': 'BoYo',
            },
            {
                'font_path': '/fonts/hoc/GhansyhamBodra_2.ttf',
                'font_name': 'GhansyhamBodra',
                'display_name': 'Ghansyham Bodra',
            },
            {
                'font_path': '/fonts/hoc/Gurbaba.ttf.TTF',
                'font_name': 'Gurbaba',
                'display_name': 'Gurbaba',
            }
        ]

        self.kb_list = [
            {'shortName': LanguageCode,
             'longName': LanguageCode,
             },
        ]

        self.default_base_consonant = u'\u118a0'

        self.encodedRanges = [
            (0x20, 0x7b),
        ]
        # TODO: Fill in with diacritics
        self.diacritic_list = [chr(x) for x in range(0x118a0, 0x118ff)]


langInstance = langInfo()
