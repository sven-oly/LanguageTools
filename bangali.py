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
    # {
    #    'font_path':'/fonts/bete/JGBete4PUA.ttf',
    #    'font_name':'JGBete4',
    #    'display_name': 'JGBete4',
    # #   'Source location': 'https://www.wfonts.com/font/jg-bete',  # ??
    # },
]

unicode_font_list = [
    {
      'family': 'NotoSansBengali',
      'longName': 'Noto Sans Bengali',
      'source': '/fonts/NotoSansBengali-Regular.ttf',
      'attribution': 'https://www.wfonts.com/font/jg-bete',
  },
  # {
  #     'family': 'KikakuiSansPro',
  #     'longName': 'Kikakui Sans Pro',
  #     'source': '/fonts/MendeKikakui/KikakuiSansPro.ot.ttf',
  # },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/bn/'
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
    {'linkText': 'Unicode Page',
      'ref': 'https://unicode.org/charts/PDF/U0980.pdf'
    },
    {'linkText': 'Bangali Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Bangali_(ethnic_dialect)'
    },
    # {'linkText': 'Athinkra Character Picker',
    #  'ref': 'http://nkoconvert.ho.ua/bete-ime/'
    #  },
    #{'linkText': 'Combiners',
    # 'ref': '/bete/diacritic/'
    #},
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'bn'
    self.Language = u'Bangali'
    self.Language_native = u'Bangali'
    self.direction = 'ltr'

    self.diacritic_list = [unichr(x) for x in range(0xe9bc, 0x9e3)]
    self.base_consonant = u'ঀ'
    self.baseHexUTF16 = u'\u0980'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': 'bn_b2',
        'longName': 'Bangali',
        'jsName': 'bn_b2',
        'instructions': None,
        'font': '/fonts/NotoSansBengali-Regular.ttf',
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
    config={'langInfo': langInstance}
)
