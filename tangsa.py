# -*- coding: utf-8 -*-
#!/usr/bin/env python
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

# Use routines from this base class
import base

import logging
import sys

LanguageCode = 'nst'


# Handling Tangsa keyboard.
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'nst'
    self.Language = 'Tangsa'
    self.Language_native = 'Tangsa'

    self.encoding_font_list = [
      # {
      #   'font_path': '/fonts/NotoSans-Regular.ttf',
      #   'font_name': 'Gam Win',
      #   'display_name': 'Gam Win',
      # },
      {
        'font_path': '/fonts/Tangsa/LakhumTSDC.ttf',
        'font_name': 'Lakhum PUA',
        'display_name': 'Gam Win & Lakhum PUA',
      }
    ]

    # Explicit list of conversions
    self.converters = [
      {'source': 'Gam Win', 'target': 'Lakhum PUA',
       'test_data_file': '/conversion/GamWin_LakhumPUA'},
      {'source': 'Gam Win', 'target': 'Tangsa Lakhum Unicode',
       'test_data_file': '/conversion/GanWin_TangsaLakhumUnicode'},
      {'source': 'Lakhum PUA', 'target': 'Tangsa Lakhum Unicode',
       'test_data_file': '/conversion/LakhumPUA_TangsaLakhumUnicode'
       },
    ]

    self.unicode_font_list = [
      {'family': 'LakhumUnicode',
       'longName': 'Tangsa Lakhum Unicode',
       'source': '/fonts/Tangsa/TangsaUnicodeLakhum.ttf',
       },
      {'family': 'Lakhum',
       'longName': 'Lakhum PUA',
       'source': '/fonts/Tangsa/LakhumTSDC.ttf',
       },
    ]

    self.kb_list = [
      {'shortName': 'nstUnicode',
       'longName': 'Tangsa Unicode',
       },
      {'shortName': 'nstPUA',
       'longName': 'Tangsa PUA',
       },
    ]
    self.lang_list = [
        {'shortName':  'nst',
         'longName': 'Tangsa',
         #'reference': 'https://tau.olunga.to/keyboard.html'
        },
      ]

    self.collation_data = [
      {'test_file': '/collation/nst/CALMSEA_List.tsv',
       'format':'tsv',
       'sort_options' : [
         {'column': 3, 'method': 'PUA'},
         {'column': 0, 'method': 'default'},
         {'column': 2, 'method': 'Gam Win'}
       ],
       'convert': {
         'source_column': 3,
         'convert_js': 'nstConvert_PUA_Unicode',
         'function': 'convertLakhumPUAToUnicode'
        }
      },
      # {'test_file': '/collation/nst/nst_collation_data.txt', 'format':'txt'},
    ]
    self.info_text = {
      'title': 'Tangsa Lakhum information',
      'text': 'News: This script will be in Unicode 14.0',
      'source': 'https://www.unicode.org/Public/14.0.0/ucd/UnicodeData-14.0.0d4.txt',
    }

    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/' + self.LanguageCode + '/',
        },
        # {'linkText': 'Keyboard transforms',
        #  'ref': '/' + LanguageCode + '/kbtransforms/'
        # },
        {'linkText': 'Converter',
          'ref': '/' + self.LanguageCode + '/convertUI/'
        },
        {'linkText': 'Collation test',
         'ref': '/' + self.LanguageCode + '/collation/'
        },
        {'linkText': 'Font conversion summary',
         'ref': '/' + self.LanguageCode + '/encodingRules/'
        },
        {'linkText': 'Tangsa languages',
         'ref': 'https://en.wikipedia.org/wiki/Tangsa_language'
        },
        { 'linkText': 'Tangsa Lakhum Unicode proposal',
          'ref': 'http://www.unicode.org/L2/L2021/21027-tangsa.pdf'
        },
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
    ]

    # Resource files
    self.text_file_list = [
    ]

    self.baseHexUTF16 = u'a'
    self.base_consonant = u'a'

    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.unicodeChars = [unichr(x) for x in range(0x16a70, 0x16ac9)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.unicodeChars = [unichr(0xd81a) + unichr(x+0xde00) for x in range(0x70, 0xca)]
    self.diacritic_list = []

    # Python-based transliteration tool.
    self.transliterator = None

   # Test data for showing in converter.
    self.test_data = ''
    self.test_chars = ['']

    return


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
        ('/' + LanguageCode + '/keyboard/', base.LanguagesHomeHandler),
        ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
        ('/' + LanguageCode + '/converter/', base.ConvertUIHandler),
        ('/' + LanguageCode + '/downloads/', base.Downloads),
        ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
        ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
        ('/' + LanguageCode + '/render/', base.EncodingRules),
        ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
        ('/' + langInstance.LanguageCode + '/collation/', base.CollationHandler),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
