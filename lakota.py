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

LanguageCode = 'lkt'
Language = 'Lakota'
Language_native = 'Lakȟótiyapi'
ScriptCode = 'Unkn'

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
    {'ref':
     'http://thefirstscout.blogspot.com/p/lakota-alphabet-orthography.html',
     'linkText': 'First Scout Lakota Alphabet Orthography'
    },
    # {'linkText': 'Resources',
    #   'ref': '/' + LanguageCode + '/downloads/'
    # },
    # {'linkText': 'Unicode page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
    # },
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
        self.LanguageCode = 'lkt'
        self.Language = 'Lakota'
        self.Language_native = 'Lakȟótiyapi'
        self.test_data = u''
        self.unicode_font_list = [
            {
                'source': '/fonts/Lakota/LakhotaPlain2-Regular.ttf',
                'family': 'LakhotaPlain',
                'longName': 'Lakhota Plain',
            },
            {
                'source': '/fonts/Lakota/LakhotaPlain2-PUA.ttf',
                'family': 'LakhotaPlainPUA',
                'longName': 'PUA Lakhota Plain',
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
            'font_path': '/fonts/Lakota/LakhotaPlain2-Regular.ttf',
            'font_name': 'LakhotaPlain',
            'display_name': 'Lakhota Plain',
          },
          {
            'font_path': '/fonts/Lakota/LakhotaPlain2-RegularPUA.ttf',
            'font_name': 'LakhotaPlainPUA',
            'display_name': 'Lakhota Plain PUA',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': 'lkt_plain',
           'longName': 'Lakota Plain ASCII',
           },
            {'shortName': 'lkt_plain_pua',
           'longName': 'Lakota Plain PUA',
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
        self.text_file_list = []

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