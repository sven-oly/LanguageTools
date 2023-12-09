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

import sys
import webapp2

# Use routines from this base class
import base


# Handling Ahom and other language codes for testing font and conversions.
# Should this be inherited from base.languageTemplate?
class langInfo:
    def __init__(self):
        self.LanguageCode = 'aho'
        self.Language = 'Tai Ahom'
        self.Language_native = 'Language in Tai Ahom'

        self.encoding_font_list = [
            {'font_name': 'AhomFont',
             'display_name': 'Ahom',
             'font_path': '/fonts/ahom_aiton/AHOMFONT.TTF',
             },
            {'font_path': '/fonts/ahom_aiton/Ahom_Manuscript.ttf',
             'font_name': 'AhomManuscript',
             'display_name': 'Ahom Manuscript',
             },
        ]

        self.unicode_font_list = [
            {'source': '/fonts/ahom_aiton/NotoSerifAhom-Regular.ttf',
             'family': 'NotoSerifAhom',
             'longName': 'Noto Serif Ahom',
             },
            {'family': 'AhomFontUnicode',
             'longName': 'Ahom Unicode (prototype)',
             'source': '/fonts/ahom_aiton/AHOMFONT_Unicode.TTF',
             },
            {'family': 'AhomUnicode',
             'longName': 'Ahom Manuscript Unicode (prototype)',
             'source': '/fonts/ahom_aiton/AhomUnicode.ttf',
             },
            {'source': '/fonts/Padauk-Regular.ttf',
             'family': 'Padauk',
             'longName': 'Padauk',
             },
            {'source': '/fonts/Myanmar/NotoSansMyanmar-Regular.ttf',
             'family': 'NotoSansMyanmar',
             'longName': 'Noto Sans Myanmar',
             },
            {'source': '/fonts/khamti/NamKio-Regular.ttf',
             'family': 'NamKio-Regular',
             'longName': 'NamKio Regular',
             },
            {'source': '/fonts/khamti/NamKio-Bold.ttf',
             'family': 'NamKio-Bold',
             'longName': 'NamKio Bold',
             },
            {'source': '/fonts/khamti/NamKioBook-Regular.ttf',
             'family': 'NamKioBook-Regular',
             'longName': 'NamKioBook Regular',
             },
            {'source': '/fonts/khamti/NamKioBook-Bold.ttf',
             'family': 'NamKioBook-Bold',
             'longName': 'NamKioBook Bold',
             },
            {'source': '/fonts/Myanmar/NotoSerifMyanmar-Light.ttf',
             'family': 'NotoSerifMyanmarLight',
             'longName': 'Noto Serif Myanmar Light',
             },
        ]

        self.lang_list = [
            {'shortName':  'aho_star',
             'longName': 'Tai Ahom Star'
             },
            {'shortName':  'aho',
             'longName': 'Tai Ahom'
             },
          ]

        self.links = [
            {'linkText': 'Keyboard',
             'ref': '/aho/'
             },
            {'linkText': 'Converter',
             'ref': '/' + self.LanguageCode + '/convertUI/'
             },
            {'linkText': 'Font conversion summary',
             'ref': '/' + self.LanguageCode + '/encodingRules/'
             },
            {'linkText': 'Tai Ahom-English dictionary builder',
             'ref': '/' + self.LanguageCode + '/dictionaryN/'
             },
            {'linkText': 'Ahom Unicode block',
             'ref': 'https://www.unicode.org/charts/PDF/U11700.pdf'
             },
            {'linkText': 'Combiners',
             'ref': '/' + self.LanguageCode + '/diacritic/'
             },
            {'linkText': 'Keyman Ahom Star keyboard',
             'ref': 'https://keymanweb.com/#aho-ahom,Keyboard_ahom_star'
             },
            {'linkText': 'Resources',
             'ref': '/' + self.LanguageCode + '/downloads/'
             },
        ]

        self.kb_list = self.lang_list

        # Resource files
        self.text_file_list = [
            {
                'name': 'Ahom-star with reordering',
                'source': '/resources/aho/ahom_star.kmp',
                'description': 'Ahom-start keyboard with reordering 26-Nov-2023'
                },
        #    '/download/aho/3-5-1-1.txt',
        #    '/download/aho/nemi_mang_text.txt'
        ]

        self.baseHexUTF16 = u'\ud805\udf00'
        self.base_consonant = u'\ud805\udf00'

        if sys.maxunicode >= 0x10000:
            self.unicodeChars = [unichr(x) for x in range(0x11700, 0x1173f)]
            self.diacritic_list = [unichr(x) for x in range(0x1171d, 0x1172c)]
        else:
            self.unicodeChars = [unichr(0xd805) + unichr(0xdf00 + x) for x in range(0x00, 0x3f)]
            self.diacritic_list = [unichr(0xd805) + unichr(0xdf00 + x) for x in range(0x1d, 0x2c)]

        # Python-based transliteration tool.
        self.transliterator = None

        # Test data for showing in converter.
        self.test_data = u""

        self.dictionaryLang1 = 'aho'
        self.dictionaryLang2 = 'en'
        self.kb1 = ''
        self.kb2 = ''

        self.dictionaryNData = [
          {'langName': self.Language, 'langNative': '',
           'languageCode': self.LanguageCode,
           'kbShortName': 'aho', 'kbLongName': self.Language,
           'font': {'family': 'NotoSerifAhom',
                    'longName': 'Noto Serif Ahom-Regular',
                    'source': '/fonts/ahom_aiton/NotoSerifAhom-Regular.ttf'
                    },
           'direction': 'ltr',
           },
          {'langName': 'English', 'langNative': 'English',
           'languageCode': 'en',
           'kbShortName': 'en', 'kbLongName': 'English',
           'font': {'family': 'Latin',
                    'longName': 'Noto Sans',
                    'source': '/fonts/NotoSans-Regular.ttf'
                    },
           'direction': 'ltr',
           'helptext': 'Instructions'
           },
        ]
        return


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/aho/', base.LanguagesHomeHandler),
        ('/aho/keyboard/', base.LanguagesHomeHandler),
        ('/aho/convertUI/', base.ConvertUIHandler),
        ('/aho/downloads/', base.Downloads),
        ('/aho/converter/', base.ConvertUIHandler),
        ('/aho/encodingRules/', base.EncodingRules),
        ('/aho/diacritic/', base.DiacriticHandler),
        ('/aho/render/', base.EncodingRules),
        ('/aho/dictionaryN/', base.DictionaryN),
        ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
