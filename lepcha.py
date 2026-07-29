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

Language = 'Lepcha'
Language_native = 'ᰛᰩᰵ་ᰛᰵᰛᰧᰶ'
LanguageCode = 'lep'
ScriptCode = 'Lepc'

diacritic_list = [chr(x) for x in range(0x1c24, 0x1c38)]

default_base_consonant = u'\u1c00'


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.encoding_font_list = [
            {
                'font_path': '/fonts/Lepcha/Shipmoo.ttf',
                'font_name': 'Shipmoo',
                'display_name': 'Shipmoo Lepcha',
            },
            {
                'font_path': '/fonts/Lepcha/JG_Lepcha.ttf',
                'font_name': 'JGLepcha',
                'display_name': 'JG Lepcha',
            },
            {
                'font_path': '/fonts/Lepcha/Munsalong.ttf',
                'font_name': 'Munsalong',
                'display_name': 'Munsalong',
            },
        ]

        self.unicode_font_list = [
            {
                'family': 'NotoSansLepcha',
                'longName': 'Noto Sans Lepcha',
                'source': '/fonts/Lepcha/NotoSansLepcha-Regular.ttf',
            },
            {
                'family': 'MingzatLepcha',
                'longName': 'Mingzat (SIL)',
                'source': '/fonts/Lepcha/Mingzat-Regular.ttf',
            },
            {
                'family': 'DawaLepcha',
                'longName': 'DawaLepcha (Róng Kít)',
                'source': '/fonts/Lepcha/DawaLepcha.otf',
            },
            {
            'family': 'MainwaringRong',
        'longName': 'MainwaringRong (Róng Kít)',
        'source': '/fonts/Lepcha/MainwaringRong.otf',
        },
        ]

        self.lang_list = [Language]
        self.kb_list = [
            {'shortName': 'lep_rong',
             'longName': 'Rong_Lepcha',
             'source': 'Rong-Lepcha_Cheatsheet.pdf'
             },
            {'shortName': 'lep',
             'longName': 'Lepcha',
             },
        ]
        self.links = [
            {'linkText': 'Keyboard',
             'ref': '/langbase/%s' % LanguageCode
             },
            {'linkText': 'Converter',
             'ref': '/convert/%s' % LanguageCode},
            {'linkText': 'Font conversion summary',
             'ref': '/encodingRules/%s' % LanguageCode,
             },
            {'linkText': 'Resources',
             'ref': '/downloads/%s' % LanguageCode,
             },
            {'linkText': 'Unicode page',
             'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
             },
            {'linkText': 'Lepcha script',
             'ref': 'https://en.wikipedia.org/wiki/Lepcha_alphabet'
             },
            {'linkText': 'Introduction to the Lepcha script',
             'ref': 'https://www.unicode.org/L2/L2003/03259-intro-lepcha.pdf'
             },
            {'linkText': 'Wikipedi page',
             'ref': 'https://en.wikipedia.org/wiki/Lepcha_language'
             },
            {'linkText': 'Ethnolog',
             'ref': 'https://www.ethnologue.com/language/lep'
             },
            {'linkText': 'SIBLAC',
             'ref': 'http://www.siblac.org/index.html'},
            {'linkText': 'Combiners',
             'ref': '/diacritic/%s' % LanguageCode
             },
        ]

        # All old characters
        self.oldCharList = [chr(x) + ' ' for x in range(0x20, 0x7b)] + \
                           [chr(x) + ' ' for x in range(0xc0, 0xc6)] + \
                           [chr(x) + ' ' for x in range(0xc8, 0xcf)] + \
                           [chr(x) + ' ' for x in range(0xd2, 0xd7)] + \
                           [chr(x) + ' ' for x in range(0xd9, 0xde)] + \
                           [chr(x) + ' ' for x in range(0xe0, 0xe6)] + \
                           [chr(x) + ' ' for x in range(0xe8, 0xf0)] + \
                           [chr(x) + ' ' for x in range(0xf2, 0xf4)]
        self.oldChars = ''.join(self.oldCharList)

        self.diacritic_list = [chr(x) for x in range(0x1c24, 0x1c38)]

        self.base_consonant = '\u1C00'
        self.unicodeChars = ''
        self.unicodeCombiningChars = self.diacritic_list


langInstance = langInfo()
