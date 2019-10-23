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
      'font_path': '/fonts/NyiakengPuacheHmong/MONG_0.TTF',
      'font_name': 'Mong_0',
      'display_name': 'Mong 0',
    },
    {
      'font_path': '/fonts/NyiakengPuacheHmong/MONG_NE4.TTF',
      'font_name': 'MONG_NE4',
      'display_name': 'Mong NE4',
    },
]

unicode_font_list = [
  {
      'family': 'MATD',
      'longName': 'MATD_TP70',
      'source':'/fonts/NyiakengPuacheHmong/MATD-TamaraPilz-Regular-A-70.otf',
  },
  {
      'family': 'Mong0_Unicode',
      'longName': 'Mong0 Unicode prototype',
      'source':'/fonts/NyiakengPuacheHmong/Mong_unicode.ttf',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/nyiakeng/'
    },
    {'linkText': 'Converter',
     'ref': '/nyiakeng/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/nyiakeng/encodingRules/'
    },
    {'linkText': 'Resources / Downloads',
      'ref': '/nyiakeng/downloads/'
    },
    {'linkText': 'Unicode Page',
    'ref': 'https://www.unicode.org/charts/PDF/U1E100.pdf'
    },

    {'linkText': 'Combiners',
     'ref': '/nyiakeng/diacritic/'
     },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'hnj'  # or mww for White Hmong
    self.Language = 'Nyiakeng Puachue Hmong'
    self.Language_native = ''
    self.direction = 'ltr'

    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0x1e100, 0x1e14f)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(0xd803) + unichr(0xdd00 + x) for x in range(0x22, 0x27)]

    self.base_consonant = u'\ud838\udd00'
    self.baseHexUTF16 = u'\ud838\udd01'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': 'hnj',
        'longName': 'Green Hmong keyboard',
        'jsName': 'hnj',
        'font': 'MATD_TP70',
      },
      {
        'shortName': 'mww',
        'longName': 'White Hmong keyboard',
        'jsName': 'mww',
        'font': 'MATD_TP70',
      },
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0x20, 0x7f)])]


class NewKBHandler(webapp2.RequestHandler):
  def get(self):
    langInfo = self.app.config.get('langInfo')
    lang_list = [
        {'shortName':  'tst',
         'longName': 'Testing'
        },
    ]

    try:
      text_direction = langInfo.direction
    except AttributeError:
      text_direction = 'ltr'

    template_values = {
        'direction': text_direction,
        'language': langInfo.Language,
        'font_list': langInfo.unicode_font_list,
        'lang_list': langInfo.lang_list,
        'kb_list': langInfo.kb_list,
        'links': langInfo.links,
    }
    path = os.path.join(os.path.dirname(__file__), 'nyiakeng_keyboard.html')
    self.response.out.write(template.render(path, template_values))


# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
    [('/nyiakeng/', base.LanguagesHomeHandler),
     ('/nyiakeng/convertUI/', base.ConvertUIHandler),
     ('/nyiakeng/downloads/', base.Downloads),
     ('/nyiakeng/converter/', base.ConvertHandler),
     ('/nyiakeng/encodingRules/', base.EncodingRules),
     ('/nyiakeng/diacritic/', base.DiacriticHandler),

     ('/nyiakeng/newkb/', NewKBHandler),

     ], debug=True,
    config={'langInfo': langInstance}
)
