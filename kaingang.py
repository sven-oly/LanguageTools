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


# Testing Cree language and variantsn
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'kgp'
    self.Language = 'Kaingang'
    self.Language_native = 'Language in Kaingang'

    self.encoding_font_list = [
    ]

    self.unicode_font_list = [
      { 'source': '/fonts/NotoSans-Regular.ttf',
        'family': 'NotoSansRregular',
        'longName': 'Noto Sans Latin',
      },
      {'source': '/fonts/NotoSerif-Regular.ttf',
       'family': 'NotoSerifRregular',
       'longName': 'Noto Serif Latin',
       },
    ]

    self.lang_list = [
        {'shortName':  'kgp',
         'longName': 'Kaingang',
        },
      ]

    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/kgp/'
        },
        # {'linkText': 'Converter',
        #  'ref': '/' + self.LanguageCode + '/convertUI/'
        # },
        {'linkText': 'Keyboard reference',
          'ref': 'https://wikis.swarthmore.edu/ling073/Kaingang/Keyboard'
        },
        {'linkText': 'Kaingan in Wikipedia',
         'ref': 'https://en.wikipedia.org/wiki/Kaingang_language'
        },
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
    ]

    self.kb_list = [
      {'shortName': 'kgp1',
       'longName': 'Kaingang 1',
       'reference': 'https://wikis.swarthmore.edu/ling073/Kaingang/Keyboard'
       },
    ]

    # Resource files
    self.text_file_list = [
    ]

    self.baseHexUTF16 = u'\u1400'
    self.base_consonant = u'\u1400'

    if sys.maxunicode >= 0x10000:
      self.unicodeChars = [unichr(x) for x in range(0x1400, 0x167F)]
      self.diacritic_list = []
    else:
      self.unicodeChars = [unichr(x) for x in range(0x1400, 0x167F)]
      self.diacritic_list = []


    # Python-based transliteration tool.
    self.transliterator = None

   # Test data for showing in converter.
    self.test_data = ''
    return


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/kgp/', base.LanguagesHomeHandler),
        ('/kgp/keyboard/', base.LanguagesHomeHandler),
        ('/kgp/convertUI/', base.ConvertUIHandler),
        ('/kgp/downloads/', base.Downloads),
        ('/kgp/converter/', base.ConvertUIHandler),
        ('/kgp/encodingRules/', base.EncodingRules),
        ('/kgp/diacritic/', base.DiacriticHandler),
        ('/kgp/render/', base.EncodingRules),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
