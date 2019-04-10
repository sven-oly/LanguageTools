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
      'font_path':'/fonts/zawghawa/ZaghawaBeria.otf',
      'font_name':'ZaghawaBeriaASCII',
      'display_name': 'Zaghawa Beria ASCIi',
      'Source location': 'https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=ZaghawaBeria_Hom/',
    },
    {
      'font_path':'/fonts/zawghawa/ZaghawaBeria_PUA.otf',
      'font_name':'ZaghawaBeria PUA',
      'display_name': 'Zaghawa Beria PUA',
      'Source location': 'https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=ZaghawaBeria_Hom/',
    },
]

# These are not actually Unicode, but still the font encoding.
unicode_font_list = [
    {
        'family': 'ZaghawaBeriaASCII',
        'longName': 'Zaghawa Beria ASCII',
        'source': '/fonts/zawghawa/ZaghawaBeria.otf',
    },
    {
      'family': 'ZaghawaBeriaPUA',
      'longName': 'Zaghawa Beria PUA',
      'source': '/fonts/zawghawa/ZaghawaBeria_PUA.otf',
      'attribution': 'Modified Zaghawa Beria',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/zag/'
    },
    {'linkText': 'Converter',
     'ref': '/zag/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/zag/encodingRules/'
    },
#    {'linkText': 'Resources / Downloads',
#      'ref': '/zae/downloads/'
#    },
#    {'linkText': 'Unicode Page',
#    'ref': 'https://www.unicode.org/charts/PDF/???.pdf'
#    },
    {'linkText': 'Zaghawa Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Zaghawa_language'
    },

#    {'linkText': 'Combiners',
#     'ref': '/rhg/diacritic/'
#     },
#    {'linkText': 'Keyboard layout suggestion',
#     'ref': '',
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'zag'
    self.Language = 'Zaghawa'
    self.Language_native = ''
    self.direction = 'ltr'

    # NOT DEFINED YET
    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0x10D22, 0x10D27)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(0xd803) + unichr(0xdd00 + x) for x in range(0x22, 0x27)]

    self.base_consonant = u'\ud803\udd01'
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
        'longName': 'Zaghawa Beria',
        'jsName': self.LanguageCode,
        'instructions': None,
        'font': 'ZaghawaBeriaASCII',
      },
      {
        'shortName': self.LanguageCode + '_pua',
        'longName': 'Zaghawa Beria PUA',
        'jsName': self.LanguageCode + '_pua',
        'instructions': None,
        'font': 'ZaghawaBeria PUA',
      },
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    test_range = [unichr(x) for x in xrange(0x0020, 0x007f)]
    test_range.extend(unichr(x) for x in xrange(0x00c0, 0x00c3))
    test_range.extend(unichr(x) for x in xrange(0x00c8, 0x00cf))
    test_range.extend(unichr(x) for x in xrange(0x00d2, 0x00e0))
    test_range.extend(unichr(x) for x in xrange(0x00e8, 0x00e3))
    test_range.extend(unichr(x) for x in xrange(0x00e0, 0x00ef))
    test_range.extend(unichr(x) for x in xrange(0x00f2, 0x00fc))
    test_range.extend(unichr(x) for x in xrange(0x0116, 0x0118))
    test_range.extend(unichr(x) for x in xrange(0x0130, 0x0131))

    self.test_chars = [' '.join(test_range)]

# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
    [('/zag/', base.LanguagesHomeHandler),
     ('/zag/convertUI/', base.ConvertUIHandler),
     ('/zag/downloads/', base.Downloads),
     ('/zag/converter/', base.ConvertHandler),
     ('/zag/encodingRules/', base.EncodingRules),
     ('/zag/diacritic/', base.DiacriticHandler),
    ], debug=True,
    config={'langInfo': langInstance}
)
