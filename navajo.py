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

import base

Language = 'Navajo'
Language_native = 'Diné Bizaad'
LanguageCode = 'nv'

encoding_font_list = [
  {
    'font_path': '/fonts/Navajo/Timenrn_.ttf',
    'font_name': 'TimesNewRomanNavajo',
    'display_name': 'Times New Roman Navajo',
  },
  {
    'font_path': '/fonts/Navajo/VERDN___.TTF',
    'font_name': 'VerdanaNavajo',
    'display_name': 'Verdana Navajo',
  },
  {
    'font_path': '/fonts/Navajo/CENTGN__.TTF',
    'font_name': 'CenturyGothicNavajo',
    'display_name': 'Century Gothic Navajo',
  },
]

unicode_font_list = [
  {'family': 'NotoSans',
   'longName': 'Noto Sans',
   'source': '/fonts/NotoSans-Regular.ttf',
   },
  {'family': 'NotoSerif',
   'longName': 'Noto Serif',
   'source': '/fonts/NotoSerif-Regular.ttf',
   },
  #{'family': 'Roboto',
  # 'longName': 'Roboto',
  # 'source': 'https://fonts.googleapis.com/css?family=Roboto',
  # },
]

kb_list = [
  {'shortName': LanguageCode,
   'longName': Language + ' Modern'
   },
  {'shortName': LanguageCode + '_std',
   'longName': Language + ' Traditional'
   },
]


links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Converter',
     'ref': '/' + LanguageCode + '/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/' + LanguageCode + '/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'Diné Bizaad Navajo',
      'ref': 'http://www.lapahie.com/Dine_Bizaad.cfm'
    },
    {'linkText': 'Diné College IT',
     'ref': 'http://www.dinecollege.edu/current/it.php'
    },
]


class langInfo:
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.lang_list = [LanguageCode]  # This may be extended
    self.kb_list = kb_list
    self.links = links

    # For additional resources for download
    self.text_file_list = []


langInstance = langInfo()

app = webapp2.WSGIApplication([
      ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
      ('/' + LanguageCode + '/converter/', base.ConvertHandler),
      ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
      ('/' + LanguageCode + '/downloads/', base.Downloads),
      ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ],
  debug=True,
  config={'langInfo': langInstance}
)
