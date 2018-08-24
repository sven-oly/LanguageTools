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
      'font_path':'/fonts/Rohingya Guanya Leyka.ttf',
      'font_name':'RohingyaGuynaLeykaNoories',
      'display_name': 'Guanya Leyka Noories',
      'Source location': 'https://sellfy.com/p/OXDH/',
    },
    {
      'font_path':'/fonts/Rohingya Kuna Leyka Noories.ttf',
      'font_name':'RohingyaKunaLeykaNoories',
      'display_name': 'Kuna Leyka Noories',
      'Source location':' http://fontlibrary.org/en/font/rohingya-kuna-leyka-noories',
    },
    {
      'font_path':'/fonts/Rohingya Gonya Leyka Noories.ttf',
      'font_name':'RohingyaGonyaLeykaNoories',
      'display_name': 'Gonya Leyka Noories',
      'Source location': 'http://fontlibrary.org/en/font/rohingya-gonya-leyka-noories',
    },
]

unicode_font_list = [
  {
      'family': 'RohingyaKunaLeykaNooriesUnicode',
      'longName': 'Unifont (unifoundry.com)',
      'source': '/fonts/unifont_upper-11.0.02.ttf',
  },
#  {      'family': 'RohingyaKunaLeykaNooriesUnicode',
#      'longName': 'Unicode hack',
#      'source': '/fonts/RohingyaKunaLeykaNoories_Unicode.ttf',
#  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/rhg/'
    },
    {'linkText': 'Converter',
     'ref': '/rhg/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/rhg/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/rhg/downloads/'
    },
    {'linkText': 'Unicode Page',
    'ref': 'https://www.unicode.org/charts/PDF/U10D00.pdf'
    },
    {'linkText': 'Language Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Rohingya_language'
    },

    {'linkText': 'Combiners',
     'ref': '/rhg/diacritic/'
     },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'rhg'
    self.Language = 'Rohingya'
    self.Language_native = '𐴀𐴁𐴂𐴃'
    self.direction = 'rtl'

    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0x10D22, 0x10D27)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(0xd803) + unichr(0xdd00 + x) for x in range(0x22, 0x27)]

    self.base_consonant = u'\u10D01'
    self.baseHexUTF16 = u'\ud803\udd01'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': self.LanguageCode,
        'longName': 'Hanific Rohigya Unicode',
        'jsName': self.LanguageCode,
        'instructions': None,
      }
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0x620, 0x6f9)])]

# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
    [('/rhg/', base.LanguagesHomeHandler),
     ('/rhg/convertUI/', base.ConvertUIHandler),
     ('/rhg/downloads/', base.Downloads),
     ('/rhg/converter/', base.ConvertHandler),
     ('/rhg/encodingRules/', base.EncodingRules),
     ('/rhg/diacritic/', base.DiacriticHandler),
    ], debug=True,
    config={'langInfo': langInstance}
)
