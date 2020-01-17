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
      'family': 'NotoSansCanadianAboriginal',
      'longName': 'Noto Sans Aboriginal',
      'source': '/fonts/NotoSans/NotoSansCanadianAboriginal-Regular.ttf',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/oj/'
    },
    {'linkText': 'Converter',
     'ref': '/oj/convertUI/'
    },
    # {'linkText': 'Font conversion summary',
    #   'ref': '/men/encodingRules/'
    # },
    # {'linkText': 'Resources',
    #   'ref': '/men/downloads/'
    # },
    # {'linkText': 'Unicode Page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1E800.pdf'
    # },
    # {'linkText': 'Language Wikipedia',
    #  'ref': 'https://en.wikipedia.org/wiki/Mende_language'
    # },
    #{'linkText': 'Combiners',
    # 'ref': '/men/diacritic/'
    #},
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'oj'
    self.Language = 'Ojibwe'
    self.Language_native = u'Objiwe'
    self.direction = 'ltr'

    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0x16af0, 0x16af5)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(0xd81a) + unichr(0xde00 + x) for x in range(0xf0, 0xf5)]

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
        'shortName': 'ojs',
        'longName': 'Fort Severn',
        'jsName': 'ojs',
        'instructions': 'Fort Severn keyboard',
      },
      {
        'shortName': 'jamesbaycree',
        'longName': 'James Bay Cree',
        'jsName': 'jamesbaycree',
        'instructions': 'James Bay Cree keyboard',
      },
      {
        'shortName': 'ojicree',
        'longName': 'Oji-Cree',
        'jsName': 'ojicree',
        'instructions': 'Oji-Cree keyboard',
      },
      {
        'shortName': 'iu_nunavut',
        'longName': 'Nunavut Inuktitut',
        'jsName': 'iu_nunavut',
        'instructions': 'Oji-Cree keyboard',
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
    [('/oj/', base.LanguagesHomeHandler),
     ('/oj/convertUI/', base.ConvertUIHandler),
     ('/oj/downloads/', base.Downloads),
     ('/oj/converter/', base.ConvertHandler),
     ('/oj/encodingRules/', base.EncodingRules),
     ('/oj/diacritic/', base.DiacriticHandler),
    ], debug=True,
    config={'langInfo': langInstance}
)
