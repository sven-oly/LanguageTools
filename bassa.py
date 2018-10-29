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
    #   'font_path':'/fonts/*.ttf',
    #   'font_name':'*',
    #   'display_name': '*',
    #   'Source location': 'http://',
    # },
]

unicode_font_list = [
  {
      'family': 'NotoSansBassaVah',
      'longName': 'Noto Sans Bassa Vah',
      'source': '/fonts/NotoSansBassaVah-Regular.ttf',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/bsq/'
    },
    {'linkText': 'Converter',
     'ref': '/bsq/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/bsq/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/bsq/downloads/'
    },
    {'linkText': 'Unicode Page',
     'ref': 'https://www.unicode.org/charts/PDF/U16AD0'
  },
    {'linkText': 'Language Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Bassa_language'
    },

    {'linkText': 'Combiners',
     'ref': '/bsq/diacritic/'
    },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'bsq'
    self.Language = 'Bassa'
    self.Language_native = u'\u16AE2 ??'
    self.direction = 'ltr'

    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0x16af0, 0x16af5)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(0xd81a) + unichr(0xde00 + x) for x in range(0xf0, 0xf5)]

    self.base_consonant = u'𖫧'
    self.baseHexUTF16 = u'\ud81a\udee7'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': self.LanguageCode,
        'longName': 'Bassa',
        'jsName': self.LanguageCode,
        'instructions': None,
        'font': 'NotoSansBassaVah',
      },
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0x16ad0, 0x161e6)])]

# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
    [('/bsq/', base.LanguagesHomeHandler),
     ('/bsq/convertUI/', base.ConvertUIHandler),
     ('/bsq/downloads/', base.Downloads),
     ('/bsq/converter/', base.ConvertHandler),
     ('/bsq/encodingRules/', base.EncodingRules),
     ('/bsq/diacritic/', base.DiacriticHandler),
    ], debug=True,
    config={'langInfo': langInstance}
)
