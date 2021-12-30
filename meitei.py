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

import os
import webapp2

import base

from google.appengine.ext.webapp import template

Language = 'Meitei (Manipuri)'
Language_native = 'ꯃꯤꯇꯩ ꯃꯌꯦꯛ'
LanguageCode = 'mni'
ScriptCode = 'Mtei'

links = [
  {'linkText': 'Keyboard',
   'ref': '/' + LanguageCode + '/'
   },
  {'linkText': 'Converter',
   'ref': '/' + LanguageCode + '/convertUI/'},
  {'linkText': 'Font conversion summary',
    'ref': '/' + LanguageCode + '/encodingRules/'
  },
  # {'linkText': 'Resources',
  #   'ref': '/' + LanguageCode + '/downloads/'
  # },
  {'linkText': 'Unicode page',
   'ref': 'https://www.unicode.org/charts/PDF/UABC0.pdf'
  },
  {'linkText': 'Unicode extensions',
   'ref': 'https://www.unicode.org/charts/PDF/UAAE0.pdf'
   },
  {'linkText': 'Meitei Wiki',
   'ref': 'https://en.wikipedia.org/wiki/Meitei_script'
  },
  {'linkText': "Keyman layout",
   'ref': 'https://keymanweb.com/?_ga=2.97814175.1460627000.1640752683-7452509.1639359229#mni-mtei,Keyboard_meitei_legacy'
  },
  # {'linkText': 'Combiners',
  #  'ref': '/lep/diacritic/'
  #  },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.allFonts = True

        self.unicode_font_list = [
          {'family': 'NotoSansMeitei',
           'longName': 'Noto Sans Meitei (variable)',
           'source': '/fonts/Meitei/NotoSansMeeteiMayek-VariableFont_wght.ttf',
           },
          {'family': 'EeyekRegular',
           'longName': 'Eeyek-Regular',
           'source': '/fonts/Meitei/Eeyek-Regular.ttf',
           'url': 'http://tabish.freeshell.org/eeyek/download.html'
           },
        ]

        self.encoding_font_list = [
          {
            'font_path': '/fonts/Meitei/RATHA99.TTF',
            'font_name': 'RATHA99',
            'display_name': 'RATHA99',
          },
          {
            'font_path': '/fonts/Meitei/RATHA.TTF',
            'font_name': 'RATHA',
            'display_name': 'RATHA',
          },
          {
            'font_path': '/fonts/Meitei/rathayek.TTF',
            'font_name': 'rathayek',
            'display_name': 'Rathayek',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': 'mniMtei',
           'longName': 'Meitei KM',
           },
        ]

        self.links = links

        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'
        self.unicodeChars = [unichr(x) for x in range(0xABC0, 0xAc00)]
        self.unicodeChars.extend([unichr(x) for x in range(0xAAE, 0xAf00)])

        self.encodedRanges = [
            (0x30, 0x39), (0x3d, 0x3d), (0x41, 0x47), (0x49, 0x49),
            (0x4b, 0x4b), (0x4d, 0x4f), (0x52, 0x54), (0x57, 0x58),
            (0x5a, 0x5c), (0x5f, 0x67), (0x69, 0x6d), (0x6f, 0x73), (0x76, 0x7a)
        ]

        self.convertText = ''
        # For additional resources for download
        self.text_file_list = []
        # TODO: Fill in the rest of the common data.


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/AllFonts/', base.AllFontTest ),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
], debug=True,
  config={'langInfo': langInstance}
)
