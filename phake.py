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

import sys
import webapp2

# Use routines from this base class
import base


# Handling Ahom and other language codes for testing font and conversions.
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'phk'
    self.Language = 'Tai Phake'
    self.Language_native = 'Language in Tai Phake'

    self.encoding_font_list = [
      {
        'font_path': '/fonts/ahom_aiton/PHAKE.TTF',
        'font_name': 'Phake',
        'display_name': 'Phake',
      },
      {
        'font_path': '/fonts/ahom_aiton/PHAKERAM.TTF',
        'font_name': 'Phakeramayana',
        'display_name': 'Phake Ramayana',
      },
      {
         'font_path': '/fonts/ahom_aiton/AITON.TTF',
         'font_name': 'Aiton',
         'display_name': 'Aiton',
      },
    ]

    self.unicode_font_list = [
        { 'source': '/fonts/Padauk-Regular.ttf',
          'family': 'Padauk',
          'longName': 'Padauk',
        },
        { 'source': '/fonts/NotoSansMyanmar-Regular.ttf',
          'family': 'NotoSansMyanmar ',
          'longName': 'Noto Sans Myanmar',
        },
        { 'source': '/fonts/NotoSerif-Regular.ttf',
          'family': 'NotoSerif',
          'longName': 'Noto Serif',
        },
    ]

    self.lang_list = [
      {'shortName': 'phk',
       'longName': 'Phake'
       },
      {'shortName': 'kht',
       'longName': 'Khamti'
       },
      {'shortName':  'aio',
        'longName': 'Aiton'
       },

    ]

    self.kb_list = self.lang_list

    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/phk/'
        },
        {'linkText': 'Converter',
         'ref': '/' + self.LanguageCode + '/convertUI/'
        },
        {'linkText': 'Font conversion summary',
         'ref': '/' + self.LanguageCode + '/encodingRules/'
        },
        {'linkText': 'Myanmar Unicode block',
         'ref': 'http://www.unicode.org/charts/PDF/U1000.pdf'
        },
        {'linkText': 'Myanmar Unicode extension A block',
         'ref': 'https://www.unicode.org/charts/PDF/UAA60.pdf'
         },
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
    ]

    # Resource files
    self.text_file_list = [
    ]

    self.baseHexUTF16 = u'\ud805\udf00'
    self.base_consonant = u'\ud805\udf00'

    if sys.maxunicode >= 0x10000:
      self.unicodeChars = [unichr(x) for x in range(0x11700, 0x1173f)]
      self.diacritic_list = [unichr(x) for x in range(0x1171d, 0x1172c)]
    else:
      self.unicodeChars = [unichr(0xd805) + unichr(0xdd00 + x) for x in range(0x00, 0x3f)]
      self.diacritic_list = [unichr(0xd805) + unichr(0xdd00 + x) for x in range(0x1d, 0x2c)]


    # Python-based transliteration tool.
    self.transliterator = None

   # Test data for showing in converter.
    self.test_data = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz"
    ]

    return


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/phk/', base.LanguagesHomeHandler),
        ('/phk/keyboard/', base.LanguagesHomeHandler),
        ('/phk/convertUI/', base.ConvertUIHandler),
        ('/phk/downloads/', base.Downloads),
        ('/phk/converter/', base.ConvertUIHandler),
        ('/phk/encodingRules/', base.EncodingRules),
        ('/phk/diacritic/', base.DiacriticHandler),
        ('/phk/render/', base.EncodingRules),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
