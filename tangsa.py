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

LanguageCode = 'nst'


# Handling Tangsa keyboard.
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'nst'
    self.Language = 'Tangsa'
    self.Language_native = 'Tangsa'

    self.encoding_font_list = [
      {
        'font_path': '/fonts/NotoSans-Regular.ttf',
        'font_name': 'Gam Win',
        'display_name': 'Gam Win',
      },
    ]

    self.unicode_font_list = [
      {'family': 'Lakhum',
       'longName': 'Lakhum',
       'source': '/fonts/Tangsa/LakhumTSDC.ttf',
       },
    ]

    self.kb_list = [
        {'shortName': 'nstPUA',
         'longName': 'Tangsa PUA',
         #'reference': 'https://www.nomoa.com/tonga/life/mapu-he-ngalu/keyboard/',
        },
      ]
    self.lang_list = [
        {'shortName':  'nst',
         'longName': 'Tangsa',
         #'reference': 'https://tau.olunga.to/keyboard.html'
        },

      ]

    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/' + self.LanguageCode + '/',
        },
        {'linkText': 'Converter',
          'ref': '/' + self.LanguageCode + '/convertUI/'
        },
        # {'linkText': 'Font conversion summary',
        #  'ref': '/' + self.LanguageCode + '/encodingRules/'
        # },
        {'linkText': 'Tangsa languages',
         'ref': 'https://en.wikipedia.org/wiki/Tangsa_language'
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
    self.test_data = ''
    self.test_chars = ['Corona htaungc tvhtumx muex, Yauk hoalz shuinz, ' +
                      'Sauz kuex yaukshexkungc maq httuiuq shuinz, ' +
                      'Htvlx pemc raxmuq, Rvghawcghawc nuex httax kuinz' +
                      'Yuimx nuex dvyx httax kuinz'
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
