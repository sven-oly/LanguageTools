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
  {
    'source': '/fonts/Sunuwar/Kirat1.Kõits.Blese.ttf',
    'longName': 'Kirat1',
    'family': 'Kirat1',
    'font_path': '/fonts/Sunuwar/Kirat1.Kõits.Blese.ttf',
    'font_name': 'Kirat1',
    'display_name': 'Kirat1',
    'Source location': 'https://omniglot.com/writing/jenticha.htm',
  },
]

unicode_font_list = [
  {
    'source': '/fonts/Sunuwar/Sunuwar_combined_PUA.ttf',
    'longName': 'Sunawar Combined PUA',
    'family': 'Sunawar_PUA',
    'font_path': '/fonts/Sunuwar/Sunuwar_combined_PUA.ttf',
    'font_name': 'Sunawar_PUA',
    'display_name': 'Sunawar_PUA',
    'Source location': 'https://omniglot.com/writing/jenticha.htm',
  },
  {
    'source': '/fonts/Sunuwar/Lonkuch_PUA.ttf',
    'longName': 'Lonkuch PUA',
    'family': 'LonkuchPUA',
    'font_path': '/fonts/Sunuwar/Lonkuch_PUA.ttf',
    'font_name': 'Lonkuch PUA',
    'display_name': 'Lonkuch PUA',
    'Source location': 'https://omniglot.com/writing/tikamuli.htm',
  },
  {
    'source': '/fonts/Sunuwar/kirat1_PUA_new.ttf',
    'longName': 'Kirat1 PUA',
    'family': 'kirat1_PUA',
    'font_path': '/fonts/Sunuwar/kirat1_PUA_new.ttf',
    'font_name': 'Kirat1 PUA',
    'display_name': 'Kirat1 PUA',
    'Source location': 'https://omniglot.com/writing/jenticha.htm',
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
    {'linkText': 'Converter',
     'ref': '/suz/convertUI/'
    },
    # {'linkText': 'Font conversion summary',
    #   'ref': '/bete/encodingRules/'
    # },
    # {'linkText': 'Resources',
    #   'ref': '/bete/downloads/'
    # },
    {'linkText': 'Tikamuli Unicode Proposal',
      'ref': 'http://www.unicode.org/L2/L2010/10465-tikamuli.pdf'
    },
    {'linkText': 'Jenticha Unicode Proposal',
      'ref': '  http://unicode.org/L2/L2011/11218-n4028-jenticha.pdf'
    },
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
        'shortName': 'suz_tikamuli_PUA',
        'longName': 'Sunuwar Tikamuli PUA',
        'jsName': 'suz_tikamuli_PUA',
        'instructions': None,
        'font': '/fonts/Sunuwar/Lonkuch_PUA.ttf',
      },
      {
        'shortName': 'suz_jenticha_PUA',
        'longName': 'Sunuwar Jenticha PUA',
        'jsName': 'suz_jenticha_PUA',
        'font': '/fonts/Sunuwar/kirat1_PUA_new.ttf',
        'instructions': None,
      },
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
