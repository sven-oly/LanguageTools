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

Language = 'Santali'
Language_native = 'ᱥᱟᱱᱛᱟᱲᱤ'
LanguageCode = 'sat'
ScriptCode = 'Olck'

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
  # {'linkText': 'Unicode page',
  #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
  # },
  # {'linkText': 'Lepcha script',
  #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_alphabet'
  # },
  {'linkText': 'Wikipedi page',
   'ref': 'https://en.wikipedia.org/wiki/Santali_language'
  },
  {'linkText': 'Olchiki Ddevelopment & Resource',
   'ref': 'https://olchikidr.blogspot.com/'
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
        self.unicode_font_list = [
          {'family': 'NotoOlChiki',
           'longName': 'Noto Ol Chiki',
           'source': '/fonts/santali/NotoSansOlChiki-VariableFont_wght.ttf'
          },
          {'family': 'GuruGomke-Italic',
           'longName': 'GuruGomke Italic',
           'source': '/fonts/santali/GuruGomke-Italic.ttf',
           },
          {'family': 'GuruGomke-Regular',
           'longName': 'GuruGomke Regular',
           'source': '/fonts/santali/GuruGomke-Regular.ttf',
           'download': 'https://www.mediawiki.org/wiki/Project_Ol_chiki'
           },
          {'family': 'GuruGomke-Bold',
           'longName': 'GuruGomke Bold',
           'source': '/fonts/santali/GuruGomke-Bold.ttf',
           },
          {'family': 'UNI-RaghunathMurmu',
           'longName': 'UNI RaghunathMurmu',
           'source': '/fonts/santali/OLCK-UNI-RaghunathMurmu-Regular.ttf',
           },
          {'family': 'SOHAGEE2',
           'longName': 'SOHAGEE2',
           'source': '/fonts/santali/SOHAGEE2.ttf',
           },
        ]

        self.encoding_font_list = [
          {
            'font_path': '/fonts/santali/encoded/Ol_Chiki_Classic.ttf',
            'font_name': 'Ol_Chiki_Classic',
            'display_name': 'Ol Chiki Classic',
            'location': 'https://wesanthals.tripod.com/id19.html'
          },
          {
            'font_path': '/fonts/santali/encoded/Ol_Chiki_Old.ttf',
            'font_name': 'Ol_Chiki_Old',
            'display_name': 'Ol Chiki Old',
            'location': 'https://wesanthals.tripod.com/id19.html'
          },
          {
            'font_path': '/fonts/santali/encoded/Ol_Chiki_Optimum.ttf',
            'font_name': 'Ol_Chiki_Optimum',
            'display_name': 'Ol Chiki Optimum',
            'location': 'https://wesanthals.tripod.com/id19.html'
          },
          {
            'font_path': '/fonts/santali/encoded/Ol_Chiki_Regular.ttf',
            'font_name': 'Ol_Chiki_Regular',
            'display_name': 'Ol Chiki Regular',
            'location': 'https://wesanthals.tripod.com/id19.html'
          },
          {
            'font_path': '/fonts/santali/encoded/Ol_Chiki_Royal.ttf',
            'font_name': 'Ol_Chiki_Royal',
            'display_name': 'Ol Chiki Royal',
            'location': 'https://wesanthals.tripod.com/id19.html'
          },
          {
            'font_path': '/fonts/santali/encoded/olchiki_usara.ttf',
            'font_name': 'olchiki_usara',
            'display_name': 'Ol Chiki Usara',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': LanguageCode,
           'longName': 'Santali Windows CLDR',
           'source': 'https://unicode-org.github.io/cldr-staging/charts/37/keyboards/layouts/sat.html',
           },
          {'shortName': LanguageCode + '2',
           'longName': "Santali from GBoard",
           'source': 'from GBoard layout',
           },
          {'shortName': LanguageCode + '3',
           'longName': "Santali Olchiki DR",
           'source': 'from olchikidr.blogspot.in',
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

        # For additional resources for download
        self.text_file_list = []

        # TODO: Fill in the rest of the common data.
        self.allFonts = True


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + LanguageCode + '/AllFonts/', base.AllFontTest ),
], debug=True,
  config={'langInfo': langInstance}
)
