# -*- coding: utf-8 -*-
# !/usr/bin/env python
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

import logging
import os
import webapp2

import base

from google.appengine.ext.webapp import template

Language = 'Elfdalian'
Language_native = 'övdalsk'
LanguageCode = 'ovd'
ScriptCode = 'Latn'

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
  {'linkText': 'Resources',
   'ref': '/' + LanguageCode + '/downloads/'
  },
    # {'linkText': 'Unicode page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
    # },
  {'linkText': 'Elfdalian Wikipedia',
   'ref': 'https://en.wikipedia.org/wiki/https://en.wikipedia.org/wiki/Elfdalian'
  },
  {'linkText': 'Word search',
   'ref': '/' + LanguageCode + '/wordsearch/'
  },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
          {'family': 'NotoSerif',
           'longName': 'Noto Serif',
           'source': '/fonts/NotoSerif-Regular.ttf',
           },
          {'family': 'NotoSans',
           'longName': 'Noto Sans',
           'source': '/fonts/NotoSans-Regular.ttf',
           },
          {'family': 'InterReg',
           'longName': 'Inter Regular',
           'source': '/fonts/Inter/Inter-Regular.otf',
           'reference': 'https://github.com/rsms/inter',
           },
        ]

        self.encoding_font_list = [
          {
            'font_path': '/fonts/xyz.ttf',
            'font_name': 'xyz',
            'display_name': 'xyz',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': LanguageCode,
           'longName': LanguageCode,
           'instructions': 'Ogonek at upper left, Ð at right'
           },
        ]

        self.links = links

        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        self.text_file_list = [
          {
            'name': 'KeyMan Elfdalian Mobile + desktop',
            'source': '/resources/ovd/elfdalian1.01.kmp',
            'description': 'Version 1.01 updated 29-Jan-2022'
          },
          {
            'name': 'KeyMan Elfdalian predictive text',
            'source': '/resources/ovd/eldalian_words.model.kmp',
            'description': 'Version 1.0 updated 29-Jan-2022'
          },
          {
            'name': 'Elfdalian predictive text image',
            'source': '/resources/ovd/Elfdalian_predictive.jpg',
            'description': 'Screenshot of Android with Keyman predictive text'
          },
        ]

        # TODO: Fill in the rest of the common data.
        self.fillChars = [unichr(x) for x in range(ord('a'), ord('z') + 1)
          ] + [u'å', u'ð', u'ä', u'ö', u'ą', u'ę', u'į', u'ǫ', u'ų', u'y̨']
        self.unicodeCombiningChars = ['\u0308', '\u0328', '\u030a'] 

langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + langInstance.LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + LanguageCode + '/keyman/', base.KeyManHandler),
  ('/' + langInstance.LanguageCode + '/wordsearch/', base.WordSearchHandler),
], debug=True,
  config={'langInfo': langInstance}
)
