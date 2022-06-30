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

import logging
import webapp2

import base

# For Python 2.x. and Python
try:
    unichr
except NameError:
    unichr = chr

Language = 'Rhade'
Language_native = 'klei Êđê'
LanguageCode = 'rad'
ScriptCode = 'Latn'

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Word search',
     'ref': '/' + LanguageCode + '/wordsearch/'
    },
    {'linkText': 'Calendar',
     'ref': '/' + LanguageCode + '/calendar/'
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
   'ref': 'https://en.wikipedia.org/wiki/Rade_language'
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

        self.fillChars = [unichr(x) for x in range(0x61, 0x7b)]
        # remove f, q, v, x, z
        self.fillChars.remove('f')
        self.fillChars.remove('q')
        self.fillChars.remove('v')
        self.fillChars.remove('x')
        self.fillChars.remove('z')

        self.fillChars.extend([u'ƀ', u'č', u'đ', u'ñ'])

        self.unicodeCombiningChars = []
        
        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': 'rad1',
           'longName': 'Rhade 1',
           'instructions': "Vowel marks: q -> \u02d8, Q -> ^, z -> \u00a0\u031b, Z -> \u00a0\u0306\u031b, " +
             "grave -> \u00a0\u0302\u0306, ~ -> \u00a0\u0311"
           },
        ]

        self.links = links

        # Unicode range
        self.unicodeRanges = [('\u0020', '\u007f')]
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
                'name': 'Keyman Desktop + Mobile 1.02',
                'source': '/resources/rad/rhade1.02.kmp',
                'description': 'Version 1.02 17-May-2022',
            }
        ]


        # TODO: Fill in the rest of the common data.
        self.weekDays = ['Knam Kjuh',
            'Knam Sa', 'Knam Dua', 'Knam Tlâo', 'Knam Pă', 'Knam Êma',
            'Knam Năm']
        self.months = [
            'Mlan Sa', 'Mlan Dua', 'Mlan Tlâo', 'Mlan Pă', 'Mlan Êma', 'Mlan Năm', 'Mlan Kjuh', 'Mlan Sapăn', 
            'Mlan Dua Păn', 'Mlan Pluh', 'Mlan Pluh Sa', 'Mlan Pluh Dua']


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
     ('/' + langInstance.LanguageCode + '/calendar/', base.CalendarHandler),
  ('/' + langInstance.LanguageCode + '/wordsearch/', base.WordSearchHandler),
  ('/' + langInstance.LanguageCode + '/keyman/', base.KeyManHandler),
], debug=True,
  config={'langInfo': langInstance}
)