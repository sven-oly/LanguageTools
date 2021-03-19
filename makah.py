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

import os
import webapp2

import base

from google.appengine.ext.webapp import template

Language = 'Makah'
Language_native = 'qʷi·qʷi·diččaq'
LanguageCode = 'myh'
ScriptCode = 'Latn'

encoding_font_list = [
  # {
  #   'font_path': '/fonts/xyz.ttf',
  #   'font_name': 'xyz',
  #   'display_name': 'xyz',
  # },
]

unicode_font_list = [
    {
        'family': 'Noto Sans',
        'longName': 'Noto Sans',
        'source': '/fonts/NotoSans-Regular.ttf',
    },
  {
    'family': 'Noto Serif',
    'longName': 'Noto Serif',
    'source': '/fonts/NotoSerif-Regular.ttf',
  },
]

kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   'reference': 'http://www.languagegeek.com/nwc/keymaps/WakashanCanada/MakahNum.pdf',
   },
]

links = [
    {'linkText': 'Keyboard',
      'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Language Geek keyboard',
      'ref': 'http://www.languagegeek.com/nwc/keymaps/WakashanCanada/MakahNum.pdf',
    },
    {'linkText': 'Keyboard conversions',
      'ref': '/' + LanguageCode + '/kbtransforms/'
    },
    {'linkText': 'Makah keyboard layout',
      'ref': 'https://makahmuseum.com/makah-keyboard/'
    },
    {'linkText': 'Try Makah on Google Input Tools',
      'ref': 'https://www.google.com/intl/sa/inputtools/try/'
    },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u'FILL IN'
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.lang_list = [LanguageCode]  # This may be extended
    self.kb_list = kb_list
    self.links = links

    # For additional resources for download
    self.text_file_list = []

    # TODO: Fill in the rest of the common data.

# TODO: Fill in with diacritics
diacritic_list = []
#TODO: Fill in base consonant
default_base_consonant = u'\u1c00'


kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   },
  {'shortName': 'myh2',
   'longName': 'Makah 2',
   },
]

diacritic_list = [unichr(x) for x in range(0xa926, 0xa92d)]

default_base_consonant = u'\u1c00'

encodedRanges = [
  (0x20, 0x7b),
]


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
], debug=True,
    config={'langInfo': langInstance}
)
