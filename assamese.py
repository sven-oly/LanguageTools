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

# For Python 2.x. and Python
try:
    unichr
except NameError:
    unichr = chr

Language = 'Assamese'
Language_native = 'Assamese'
LanguageCode = 'as'
ScriptCode = 'Beng'



class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.base_consonant = u'\u0995'
        list1 = [u'\u0981', u'\u0982', u'\u0983', u'\u09BC', u'\u09be', u'\u09bf', u'\u09c0', u'\u09c1',
                 u'\u09c2', u'\u09c3', u'\u09c4', u'\u09c7', u'\u09c8', u'\u09cb', u'\u09cc',
                 u'\u09cd', u'\u09ce']
        self.diacritic_list = list1



        links = [
            {'linkText': 'Keyboard',
             'ref': '/' + LanguageCode + '/'
            },
            {'linkText': 'Assamese alphabet',
             'ref': 'https://en.wikipedia.org/wiki/Assamese_alphabet',
            },
            {'linkText': 'Converter',
             'ref': '/convert/' + self.LanguageCode
            },
            {'linkText': 'Font conversion summary',
             'ref': '/encodingRules/' + self.LanguageCode
            },
            {'linkText': 'Diacritics',
             'ref': '/my/diacritic/'
            },
            {'linkText': 'Unicode page',
             'ref': 'https://www.unicode.org/charts/PDF/U0980.pdf'
            },
            # {'linkText': "Download Unicode Gautau University keyboard layouts and fonts",
            #  'ref': 'https://gauhati.ac.in/member/shikhar-kumar-sarma?aid=NA==&did=MzA='}
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
        self.unicode_font_list = [
          {'family': 'UxaFinal',
           'longName': 'Uxa Final',
           'source': '/fonts/Assamese/Uxa_Final.ttf',
           },
          {'family': 'Jonaki_Thin',
           'longName': 'Jonaki Thin',
           'source': '/fonts/Assamese/Jonaki_Thin.ttf',
           },
          {'family': 'NotoSerifBengali',
           'longName': 'Noto Serif Bengali',
           'source': '/fonts/Assames/NotoSerifBengali-Regular.ttf'
           },
          {'family': 'NotoSansBengali',
           'longName': 'Noto Sans Bengali',
            'source': '/fonts/Assamese/NotoSansBengali-VariableFont_wdth,wght.ttf'
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
            'font_path': '/fonts/Assamese/ASSAMNEW.TTF',
            'font_name': 'AssamNew',
            'display_name': 'Assam New',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': 'as1',
           'longName': "Assamese fonatic",
           'instructions': 'Keyboard layouts and fonts courtesy of Gauhati University. Download from links.',
           },
          {'shortName': 'as2',
           'longName': "AS Script",
           'instructions': 'Keyboard layouts and fonts courtesy of Gauhati University. Download from links.',
           },
          {'shortName': 'as_indic3',
           'longName': "Indic3",
           'instructions': 'Based on MS Indic3 for Assamese',
           },
        ]

        self.links = links

        # Unicode range
        self.unicodeRanges = [('\u0980', '\u09FF')]
        # TODO: Fill in with diacritics
        #self.diacritic_list = [unichr(x) for x in range(0x981, 0x984)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = []

        # TODO: Fill in the rest of the common data.


langInstance = langInfo()

