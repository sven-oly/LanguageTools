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
    self.LanguageCode = 'cr'
    self.Language = 'Cree'
    self.Language_native = 'Language in Creen'

    self.encoding_font_list = [
    ]

    self.unicode_font_list = [
        { 'source': '/fonts/cree/NotoSansCanadianAboriginal-Regular.ttf',
          'family': 'NotoSansCanadianAboriginal',
          'longName': 'Noto Sans Canadian Aboriginal',
        },
        { 'family': 'Euphemia',
          'longName': 'Euphemia regular',
          'source': '/fonts/cree/Euphemia UCAS Regular 2.6.6.ttf',
        },
        { 'family': 'bjcrus',
          'longName': 'BJ Cree',
          'source': '/fonts/cree/bjcrus.ttf'
        },
        { 'family': 'aboriginalSans',
          'longName': 'Aboriginal Sans',
          'source': '/fonts/cree/AboriginalSansREGULAR.ttf'
        },
        { 'family': 'aboriginalSerif',
          'longName': 'Aboriginal Serif',
          'source': '/fonts/cree/Aboriginal Serif REGULAR 939.ttf'
        },
    ]

    self.lang_list = [
        {'shortName':  'cr',
         'longName': 'Cree'
        },
        {'shortName':  'crk',
         'longName': 'Plains Cree'
        },
        {'shortName':  'cwd',
         'longName': 'Woods Cree'
        },
        {'shortName':  'csw',
         'longName': 'Swampy Cree'
        },
        {'shortName':  'crl',
         'longName': 'Northern East Cree'
        },
        {'shortName':  'crj',
         'longName': 'Southern East Cree'
        },
        {'shortName':  'nsk',
         'longName': 'Naskapi'
        },
        {'shortName':  'moe',
         'longName': 'Montagnais'
        },
        {'shortName': 'atj',
         'longName':  'Atikamekw'
        },
      ]

    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/aho/'
        },
        {'linkText': 'Converter',
         'ref': '/' + self.LanguageCode + '/convertUI/'
        },
        {'linkText': 'Font conversion summary',
         'ref': '/' + self.LanguageCode + '/encodingRules/'
        },
        {'linkText': 'Ahom Unicode block',
         'ref': 'https://www.unicode.org/charts/PDF/U11700.pdf'
        },
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
    ]

    self.kb_list = self.lang_list

    # Resource files
    self.text_file_list = [
        '/download/aho/3-5-1-1.txt',
        '/download/aho/nemi_mang_text.txt'
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
    self.test_data = 'ᔑ ᔕ ᔓ ᔐ'
    return


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/cr/', base.LanguagesHomeHandler),
        ('/cr/keyboard/', base.LanguagesHomeHandler),
        ('/cr/convertUI/', base.ConvertUIHandler),
        ('/cr/downloads/', base.Downloads),
        ('/cr/converter/', base.ConvertUIHandler),
        ('/cr/encodingRules/', base.EncodingRules),
        ('/cr/diacritic/', base.DiacriticHandler),
        ('/cr/render/', base.EncodingRules),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
