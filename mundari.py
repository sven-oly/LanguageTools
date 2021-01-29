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


# Testing Mundar language
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'unr'
    self.Language = 'Mundari'
    self.Language_native = 'Language in Mundari'

    self.encoding_font_list = [
    ]

    self.unicode_font_list = [
      { 'source': '/fonts/MundariBani/Mundari Lipi-Regular.ttf',
        'family': 'MundariLipiRegular',
        'longName': 'Mundari Lipi Regular',
      },
      {'source': '/fonts/MundariBani/Mundari Lipi Standard.ttf',
       'family': 'MundariLipiStandard',
       'longName': 'Mundari Lipi Standard',
       },
    ]

    self.lang_list = [
        {'shortName':  'unr',
         'longName': 'Mundari',
        },
      ]

    self.about = {
      'description': "This script is not yet part of Unicode."
    }
    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/unr/'
        },
        # {'linkText': 'Converter',
        #  'ref': '/' + self.LanguageCode + '/convertUI/'
        # },
        # {'linkText': 'Keyboard reference',
        #   'ref': 'https://wikis.swarthmore.edu/ling073/Kaingang/Keyboard'
        # },
      {'linkText': 'Mundari Bani script',
       'ref': 'https://omniglot.com/writing/mundaribani.htm'
       },
      {'linkText': 'Unicode proposal',
       'ref': 'http://www.unicode.org/L2/L2021/21031-mundari-bani.pdf'
       },
      {'linkText': 'Font conversion summary',
       'ref': '/unr/encodingRules/'
       },
      {'linkText': 'Mundari in Wikipedia',
         'ref': 'https://en.wikipedia.org/wiki/Mundari_language'
        },
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
    ]

    self.kb_list = [
      {'shortName': 'unrEncoded',
       'longName': 'Mundari 1',
       #'reference': 'https://wikis.swarthmore.edu/ling073/Kaingang/Keyboard'
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
        ('/unr/', base.LanguagesHomeHandler),
        ('/unr/keyboard/', base.LanguagesHomeHandler),
        ('/unr/convertUI/', base.ConvertUIHandler),
        ('/unr/downloads/', base.Downloads),
        ('/unr/converter/', base.ConvertUIHandler),
        ('/unr/encodingRules/', base.EncodingRules),
        ('/unr/diacritic/', base.DiacriticHandler),
        ('/unr/render/', base.EncodingRules),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
