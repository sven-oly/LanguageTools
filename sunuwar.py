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

import base

# import transliterate
# import transrule_ccp

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

encoding_font_list = [
  {
    'source': '/fonts/Sunuwar/LONKUCH.ttf',
    'longName': 'Lonkuch',
    'family': 'Lonkuch',
    'font_path': '/fonts/Sunuwar/LONKUCH.ttf',
    'font_name': 'Lonkuch',
    'display_name': 'Lonkuch',
    'Source location': 'https://omniglot.com/writing/tikamuli.htm',
  },
  {
    'source': '/fonts/Sunuwar/PREM.ttf',
    'longName': 'Prem',
    'family': 'Prem',
    'font_path': '/fonts/Sunuwar/PREM.ttf',
    'font_name': 'Prem',
    'display_name': 'Prem',
    'Source location': 'https://omniglot.com/writing/tikamuli.htm',
  },
]

unicode_font_list = [
  {
    'source': '/fonts/Sunuwar/Lonkuch_PUA.woff',
    'longName': 'Lonkuch PUA',
    'family': 'LonkuchPUA',
    'font_path': '/fonts/Sunuwar/Lonkuch_PUA.woff',
    'font_name': 'Lonkuch PUA',
    'display_name': 'Lonkuch PUA',
    'Source location': 'https://omniglot.com/writing/tikamuli.htm',
  },
  #   {
  #     'family': 'NotoSansBengali',
  #     'longName': 'Noto Sans Bengali',
  #     'source': '/fonts/NotoSansBengali-Regular.ttf',
  #     'attribution': 'https://www.wfonts.com/font/jg-bete',
  # },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/suz/'
    },
    # {'linkText': 'Converter',
    #  'ref': '/bete/convertUI/'
    # },
    # {'linkText': 'Font conversion summary',
    #   'ref': '/bete/encodingRules/'
    # },
    # {'linkText': 'Resources',
    #   'ref': '/bete/downloads/'
    # },
    # {'linkText': 'Unicode Page',
    #   'ref': 'https://unicode.org/charts/PDF/U0980.pdf'
    # },
    {'linkText': 'Sunuwar Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Sunwar_language'
    },
    # {
    #   'linkText': 'Combiners',
    #   'ref': '/bn/diacritic/'
    # },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'suz'
    self.Language = u'Kõinch'
    self.Language_native = u'कोँइच'
    self.direction = 'ltr'

    # This is undefined
    self.diacritic_list = [unichr(x) for x in range(0x9bc, 0x9e3)]
    self.base_consonant = u'ক'  # KA
    self.baseHexUTF16 = u'\u0995'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': 'suz_tikamuli',
        'longName': 'Sunuwar Tikamuli',
        'jsName': 'suz_tikamuli',
        'instructions': None,
        'font': '/fonts/Sunuwar/PREM.ttf',
      },
      {
        'shortName': 'suz_tikamuli_pua',
        'longName': 'Sunuwar Tikamuli PUA',
        'jsName': 'suz_tikamuli_pua',
        'instructions': None,
        'font': '/fonts/Sunuwar/Lonkuch_PUA.woff.woff',
      },
      {
        'shortName': 'suz_jenticha',
        'longName': 'Sunuwar Jenticha',
        'jsName': 'suz_jenticha',
        'instructions': None,
      },
      # {
      #   'shortName': 'bn_b3',
      #   'longName': 'Bangali 3',
      #   'jsName': 'bn_b3',
      #   'instructions': None,
      #   'font': '/fonts/NotoSansBengali-Regular.ttf',
      # },
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0xe9bc, 0x9e3)])]

    # For dictionary
    self.dictionaryLang1 = "English"
    self.dictionaryLang2 = self.Language
    self.kb1 = 'en'
    self.kb2 = self.kb_list[0]['shortName']

# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
    [('/' + langInstance.LanguageCode+ '/', base.LanguagesHomeHandler),
     ('/' + langInstance.LanguageCode + '/convertUI/', base.ConvertUIHandler),
     ('/' + langInstance.LanguageCode+ '/downloads/', base.Downloads),
     ('/' + langInstance.LanguageCode+ '/converter/', base.ConvertHandler),
     ('/' + langInstance.LanguageCode+ '/encodingRules/', base.EncodingRules),
     ('/' + langInstance.LanguageCode+ '/diacritic/', base.DiacriticHandler),
     ('/' + langInstance.LanguageCode + '/dictionaryInput/', base.DictionaryInput),
     ], debug=True,
    config= {'langInfo': langInstance,
    }
)
