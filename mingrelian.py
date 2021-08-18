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

Language = 'Mingrelian'
Language_native = 'მარგალური ნინა'
LanguageCode = 'xmf'
ScriptCode = 'Geor'

encoding_font_list = [
  {
    'font_path': '/fonts/xyz.ttf',
    'font_name': 'Noto Georgian',
    'display_name': 'Noto Georgian',
  },
]

unicode_font_list = [
  {
    'family': 'NotoSansGeorgianRegular',
    'longName': 'Noto Sans Georgian Regular',
    'source': '/fonts/Georgian/NotoSansGeorgian-Regular.ttf',
  },
  {
    'family': 'NotoSerifGeorgianRegular',
    'longName': 'Noto Serif Georgian',
    'source': '/fonts/Georgian/NotoSerifGeorgian-Regular.ttf',
  },
  {
    'family': 'NotoSansGeorgianLight',
    'longName': 'Noto Sans Georgian Light',
    'source': '/fonts/Georgian/NotoSansGeorgian-Light.ttf',
  },
  {
    'family': 'NotoSerifGeorgianLight',
    'longName': 'Noto Serif Georgian Light',
    'source': '/fonts/Georgian/NotoSerifGeorgian-Light.ttf',
  },
]

kb_list = [
  {'shortName': LanguageCode,
   'longName': 'Mingrelian Georgian',
   },
  {'shortName': 'xmf_Latn',
   'longName': 'Mingrelian Latin',
   },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
    # {'linkText': 'Resources',
    #   'ref': '/' + LanguageCode + '/downloads/'
    # },
    {'linkText': 'Unicode block',
     'ref': 'https://en.wikipedia.org/wiki/Georgian_(Unicode_block)'
    },
    {'linkText': 'Omniglot',
     'ref': 'https://omniglot.com/writing/mingrelian.htm'
    },
    # {'linkText': 'Wikipedi page',
    #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_language'
    # },
    # {'linkText': 'Ethnolog',
    #  'ref': 'https://www.ethnologue.com/language/lep'
    # },
    # {'linkText': 'Combiners',
    #  'ref': '/lep/diacritic/'
    #  },
]

class langInfo():
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

    # TODO: Fill in the rest of the common data.

# TODO: Fill in with diacritics
diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
#TODO: Fill in base consonant
default_base_consonant = u'\0x61'

encodedRanges = [
  (0x20, 0xff),
]


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
], debug=True,
                              config={'langInfo': langInstance}
)
