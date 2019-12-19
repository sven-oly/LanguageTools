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

import webapp2

# Use routines from this base class
import base

LanguageCode = 'to'


# Handling Tongan keyboard.
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'to'
    self.Language = 'Tongan'
    self.Language_native = 'lea fakatonga'

    self.encoding_font_list = [

    ]

    self.unicode_font_list = [
      {'family': 'NotoSerif',
       'longName': 'Noto Serif',
       'source': '/fonts/NotoSerif-Regular.ttf',
       },
      {'family': 'NotoSans',
       'longName': 'Noto Sans',
       'source': '/fonts/NotoSans-Regular.ttf',
       },
    ]

    self.kb_list = [
        {'shortName': 'to_nom',
         'longName': 'Tongan Nomoa',
         'reference': 'https://www.nomoa.com/tonga/life/mapu-he-ngalu/keyboard/',
        },
        {'shortName': 'to',
         'longName': 'Tongan Standard',
         'reference': 'https://tau.olunga.to/keyboard.html',
        },
      ]
    self.lang_list = [
        {'shortName':  'to',
         'longName': 'Tongan',
         'reference': 'https://tau.olunga.to/keyboard.html'
        },

      ]

    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/' + self.LanguageCode + '/',
        },
        # {'linkText': 'Converter',
        #  'ref': '/' + self.LanguageCode + '/convertUI/'
        # },
        # {'linkText': 'Font conversion summary',
        #  'ref': '/' + self.LanguageCode + '/encodingRules/'
        # },
        {'linkText': 'Tongan language',
         'ref': 'https://en.wikipedia.org/wiki/Tongan_language'
        },
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
    ]

    # Resource files
    self.text_file_list = [
    ]

    self.baseHexUTF16 = u'a'
    self.base_consonant = u'a'

    self.unicodeChars = [unichr(x) for x in range(0x041, 0x076)]
    self.diacritic_list = [unichr(x) for x in range(0x0304, 0x02BB)]

    # Python-based transliteration tool.
    self.transliterator = None

   # Test data for showing in converter.
    self.test_data = ["""
"""
    ]

    return


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
        ('/' + LanguageCode + '/keyboard/', base.LanguagesHomeHandler),
        ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
        ('/' + LanguageCode + '/downloads/', base.Downloads),
        ('/' + LanguageCode + '/converter/', base.ConvertUIHandler),
        ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
        ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
        ('/' + LanguageCode + '/render/', base.EncodingRules),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
