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
       'font_path':'/fonts/bete/JGBete4PUA.ttf',
       'font_name':'JGBete4',
       'display_name': 'JGBete4',
    #   'Source location': 'https://www.wfonts.com/font/jg-bete',  # ??
    },
]

unicode_font_list = [
    {
      'family': 'JGBete4',
      'longName': 'JGBete4 PUA',
      'source': '/fonts/bete/JGBete4PUA.ttf',
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
     'ref': '/bete/'
    },
    {'linkText': 'Keyboard conversions',
     'ref': '/' + 'bete' + '/kbtransforms/'    # {'linkText': 'Converter',
     },
    #  'ref': '/bete/convertUI/'
    # },
    # {'linkText': 'Font conversion summary',
    #   'ref': '/bete/encodingRules/'
    # },
    # {'linkText': 'Resources',
    #   'ref': '/bete/downloads/'
    # },
    # {'linkText': 'Unicode Page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1E800.pdf'
    # },
    {'linkText': 'Language Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/B%C3%A9t%C3%A9_languages'
    },
    {'linkText': 'Unicode proposal draft',
     'ref': 'http://www.unicode.org/L2/L2017/17323-bete-progress.pdf'
    },
    {'linkText': 'Athinkra Character Picker',
     'ref': 'http://nkoconvert.ho.ua/bete-ime/'
    },
    {'linkText': 'Digital Orientalist',
     'ref': 'https://digitalorientalist.com/2021/01/22/building-tools-with-bete-mende-and-kpelle-users/'
    },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'bete'
    self.Language = u'Bété'
    self.Language_native = u'Bété'
    self.direction = 'ltr'

    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0xe753, 0xe75)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0xe753, 0xe75)]

    self.base_consonant = u'𞠀'
    self.baseHexUTF16 = u'\ud81a\udee7'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': self.LanguageCode + "Phone",
        'longName': 'Bété Phonetic',
        'jsName': self.LanguageCode + "Phone",
        'instructions': None,
        'fontFamily': 'JGBete4',
      },
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0xe600, 0xe780)])]

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
     ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
     ], debug=True,
    config={'langInfo': langInstance}
)
