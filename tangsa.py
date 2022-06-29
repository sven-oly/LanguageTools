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

import tangsa_data
import tangsa_GamWin_convert_test_new

import webapp2

# Use routines from this base class
import base

import logging
import os
import sys

from google.appengine.ext.webapp import template

LanguageCode = 'nst'


# Handling Tangsa keyboard.
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'nst'
    self.Language = 'Tangsa'
    self.Language_native = 'Tangsa'

    self.encoding_font_list = [
      {
        'font_path': '/fonts/Tangsa/Lakhum.ttf',
        'font_name': 'LakhumP',
        'family': 'LakhumP',
        'longName': 'Lakhum PUA',
        'display_name': 'Lakhum PUA',
        'source': '/fonts/Tangsa/Lakhum.ttf',
       },
    ]

    self.unicode_font_list = [
      {'family': 'LakhumUnicode',
       'longName': 'Lakhum Unicode',
       'source': '/fonts/Tangsa/TangsaLakhumUnicode.ttf',
       },
      {'family': 'NotoTangsaVF',
       'longName': 'Noto Sans Tangsa VF',
       'source': '/fonts/Tangsa/NotoSansTangsa-VF.ttf',
       },
      # {'family': 'NotoTangsaRegular',
      #  'longName': 'Noto Sans Tangsa Regular',
      #  'source': '/fonts/Tangsa/NotoSansTangsa-Regular.otf',
      #  },
      #
      # {'family': 'NotoTangsaMedium',
      #  'longName': 'Noto Sans Tangsa Medium',
      #  'source': '/fonts/Tangsa/NotoSansTangsa-Medium.otf',
      #  },
      # {'family': 'NotoTangsBold',
      #  'longName': 'Noto Sans Tangsa Bold',
      #  'source': '/fonts/Tangsa/NotoSansTangsa-Bold.otf',
      #  },
      # {'family': 'NotoTangsSemiBold',
      #  'longName': 'Noto Sans Tangsa Semi-Bold',
      #  'source': '/fonts/Tangsa/NotoSansTangsa-SemiBold.otf',
      #  },      
      {'family': 'LakhumTsdc',
       'longName': 'Lakhum PUA TSDC Nov-2021',
       'source': '/fonts/Tangsa/lakhum-tsdc-lined.ttf',
       'note': 'Includes PUA E459 &E460',
       },
      {'family': 'LakhumPUA',  # Really a PUA font, not Unicode
       'longName': 'Lakhum Private Use Area (PUA)',
       'source': '/fonts/Tangsa/Lakhum.ttf',
       'note': 'Not Unicode',
       },
    ]

    self.kb_list = [
      {'shortName': 'nstUnicode',
       'longName': 'Lakhum Unicode',
       'fontFamily': 'LakhumTsdc',
       },
      {'shortName': 'nstPUA',
       'longName': 'Tangsa PUA',
       'fontFamily': 'LakhumPUA',
       },
    ]
    self.lang_list = [
        {'shortName':  'nst',
         'longName': 'Tangsa',
         #'reference': 'https://tau.olunga.to/keyboard.html'
        },
      ]

    self.characters_encode = {
      'encoding': 'gamwin',
      'consonant': ['b', 'ch', 'd', 'f', 'g', 'gh', 'h',] ,
      'vowel': ['a', 'aw', 'e', 'i', 'o', 'u', 'ue', 'ui', 'uiu', 'v'],
      'tonemarks': ['x', 'z', 'c'],  # Single 'c'
    }

    # Explicit dictionary of conversions
    self.converters = {'filename': 'nstConverter',
                       'convert_obj': 'nstConverter_obj',
                       'conversions': ['GW_to_Unicode', 'PUA_to_Unicode', 'GW_to_PUA'],
                       'longname': 'Tangsa Converter',
    }

    # Description of encoding tables to compute and display.
    self.encoding_tables = {
      'GamWin to Lakhum':   # name of the table
       [{'title': 'GamWin', 'source': ['nstconverter', 'key', 'sort'],
         'font': 'Arial', 'isUnicode': False},
        {'title': 'Lakhum PUA', "source": ['nstconverter', 1],  # 2nd output column
         'font': 'Lakhum PUA', 'isUnicode': False},
        {'title': 'Lakhum Unicode', "source": ['nstconverter', 0],  # 1st output column
         'font': 'LakhumUnicode', 'isUnicode': True},
        ],
     'PUA to Unicode':
       [{'title': 'Lakhum PUA', "source":
         [0xe400, 0xe458],  # ['nstconverter_PUA_Unicode', 'key']
         'font': 'Lakhum PUA', 'isUnicode': False},
        {'title': 'Lakhum Unicode', "source": ['nstconverter_PUA_Unicode', 0],
         'font': 'LakhumUnicode', 'isUnicode': True},
        ]
     }

    self.collation_string = tangsa_data.collation_data

    self.collation_data = [
      {'test_file': '/collation/nst/CALMSEA_List.tsv',
       'format':'tsv',
       'sort_options' : [
         {'column': 3, 'method': 'PUA'},
         {'column': 0, 'method': 'default'},
         {'column': 2, 'method': 'Gam Win'}
       ],
       'convert': [
         {
           'source_column': 3, 'target_column': 4,
           'convert_js': 'nstConverter_obj',
           'type': 'GW_to_PUA'
         },
         {
           'source_column': 3, 'target_column': 6,
           'convert_js': 'nstConverter_obj',
           'type': 'GW_to_PUA'
         }
       ],
       'sort': [
         {'column': 4, 'function': 'PUA_to_Unicode'},
         {'column': 6, 'function': ''},

        ],
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
        {'linkText': 'KB transforms',
          'ref': '/' + self.LanguageCode + '/kbtransforms/'
        },
        {'linkText': 'Tangsa languages',
         'ref': 'https://en.wikipedia.org/wiki/Tangsa_language'
        },
        {'linkText': 'Tangsa Lakhum Unicode proposal',
          'ref': 'http://www.unicode.org/L2/L2021/21027-tangsa.pdf'
        },
        {'linkText': 'KeyMan Tangsa Lakhum help',
         'ref': 'https://help.keyman.com/keyboard/tangsa_lakhum/1.1/tangsa_lakhum'},
        {'linkText': 'Download KeyMan keyboard',
         'ref': 'https://keyman.com/keyboards/tangsa_lakhum'},
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
      {
        'linkText': "Download Noto Tangsa fonts",
        'ref': 'https://github.com/notofonts/noto-fonts/tree/main/hinted/ttf/NotoSansTangsa'
      },
        {'linkText': 'Calculator',
         'ref': '/nst/numerals/'
        },
        {'linkText': 'Calendar',
         'ref': '/' + self.LanguageCode + '/calendar/'
        },
    ]

    # Resource files
    resource_list = [
      {
        'name': 'KeyMan for Lakhum Tangsa Unicode v1.2',
        'source': '/resources/nst/tangsa_lakhum_unicode_1.2.kmp',
        'description': 'Layout for Tangsa Lakum Unicode',
        'instructions': 'Install KeyMan first. Next, Desk/laptop: download file and open.\nMobile: open link.',
      },
      {
        'name': 'Lakhum Tangsa deadkeys #1',
        'source': '/resources/nst/Tangsa_deadkey_1.png',
        'description': 'Deadkey reference #1',
      },
      {
        'name': 'Lakhum Tangsa deadkeys #2',
        'source': '/resources/nst/Tangsa_deadkey_2.png',
        'description': 'Deadkey reference #2',
      },
    ]
    self.text_file_list = resource_list

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
    self.test_chars = ''

    self.conversion_data = [
      {'name': 'wordlist data',
       'column_contents': tangsa_GamWin_convert_test_new.columns,
       'data': tangsa_GamWin_convert_test_new.gamWin_convert_test_data,
      },
      {'name': 'conversion rules data',
       'column_contents': tangsa_data.collation_columns,
       'data': tangsa_data.collation_data,
      }
    ]
    return

class ReadFileHandler(webapp2.RequestHandler):
  def get(self, match=None):
    # Match is the actual url route matched.
    req = webapp2.get_request()
    # Can use this for additional information
    langInfo = self.app.config.get('langInfo')

    filename = 'testdata/GamWin_convert_test.tsv'
    path = os.path.join(os.path.split(__file__)[0], filename)
    with open(path, 'rb') as f:
      page_content = f.read().decode('utf-8').split('\n')
    self.response.write(page_content)


# Special version for Tangsa
class EncodingRules(webapp2.RequestHandler):
  def get(self, match=None):

    langInfo = self.app.config.get('langInfo')
    try:
      encoding_tables = langInfo.encoding_tables
    except:
      encoding_tables = None

    try:
      converter_list = langInfo.converters
    except:
      converter_list = None
    try:
      conversion_data = langInfo.conversion_data
    except:
      conversion_data = None
    pua_range = [0xe400, 0xe458]

    # Extract expected values in PUA.
    gamwin_lines = tangsa_data.gamwin_test_data.split('\n')
    gamwin_test_pua = {}
    for line in gamwin_lines:
      items = line.split('\t')
      if (len(items) > 3):
        gamwin_test_pua[items[1]] = items[5]

    template_values = {
      'converterJS': '/js/' + langInfo.LanguageCode + 'Converter.js',
      'converter_list': converter_list,
      'conversion_data': conversion_data,
      'gamwin_test_data': gamwin_test_pua,
      'language': langInfo.Language,
      'lang_list': langInfo.lang_list,
      'encoding_list': langInfo.encoding_font_list,
      'encoding_tables': encoding_tables,
      'pua_range': pua_range,
      'unicode_list': langInfo.unicode_font_list,
      'kb_list': langInfo.kb_list,
      'links': langInfo.links,
      'showTools': self.request.get('tools', None),
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/tangsa_encodingConvert.html')
    self.response.out.write(template.render(path, template_values))


# For N languages in the dictionary
class CollationHandler(webapp2.RequestHandler):
  def get(self, match=None):
    req = webapp2.get_request()
    top_path = req.path.split('/')
    lang_code = top_path[1]

    langInfo = self.app.config.get('langInfo')
    try:
      collation_string = langInfo.collation_string
    except:
      collation_string = None

    # user_info = getUserInfo(self.request.url)

    # t = Template("My name is {{ person.first_name }}.")

    template_values = {
      'language': langInfo.Language,
      'langInfo': langInfo,
      'collation_data' : langInfo.collation_data,
      'collation_string': langInfo.collation_string,
      'converters': langInfo.converters,
      'unicodeFontList': langInfo.unicode_font_list,
      'showTools': self.request.get('tools', None),
      'links': langInfo.links,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/tangsa_collationView.html')
    self.response.out.write(template.render(path, template_values))


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
        ('/' + LanguageCode + '/keyboard/', base.LanguagesHomeHandler),
        ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
        ('/' + LanguageCode + '/converter/', base.ConvertUIHandler),
        ('/' + LanguageCode + '/downloads/', base.Downloads),
        ('/' + LanguageCode + '/encodingRules/', EncodingRules),  # Local special version
        ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
        ('/' + LanguageCode + '/render/', base.EncodingRules),
        ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
        ('/' + langInstance.LanguageCode + '/collation/', CollationHandler),
        ('/' + langInstance.LanguageCode + '/readfile/', ReadFileHandler),
        ('/' + langInstance.LanguageCode + '/numerals/', base.NumeralsHandler),
        ('/' + langInstance.LanguageCode + '/calendar/', base.CalendarHandler),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
