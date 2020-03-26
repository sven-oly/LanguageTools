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

import base

# import transliterate
# import transrule_ccp

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

encoding_font_list = [
    {
       'font_path':'/fonts/NotoSans-Regular.ttf',
       'font_name':'NotoSans-Regular',
       'display_name': 'NotoSans Regular',
    },
]

unicode_font_list = [
    {
      'family': 'NotoSans',
      'longName': 'NotoSans Regular',
      'source': '/fonts/NotoSans-Regular.ttf',
  },
]

links = [
  {'linkText': 'Keyboard + Converter',
   'ref': '/en_anangu/'
  },
  {'linkText': 'Simple dictionary input',
    'ref': '/en_anangu/dictionaryInput/'
  },
  {'linkText': 'Keyman Yolngu keyboard',
  'ref': 'https://keyman.com/keyboards/el_yolngu'
  },
  {'linkText': 'Yolŋu Studies, Charles Darwin University',
    'ref': 'http://learnline.cdu.edu.au/yolngustudies/'
  },
  {'linkText': 'Aṉangu Wikipedia',
    'ref': 'https://en.wikipedia.org/wiki/A%E1%B9%89angu'
   },
  {'linkText': 'Yolŋu Wikipedia',
    'ref': 'https://en.wikipedia.org/wiki/Yolngu'
  },

]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'en_anangu'
    self.Language = u'Yolŋu'
    self.Language_native = u'Yolŋu'
    self.direction = 'ltr'

    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0xe753, 0xe75)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0xe753, 0xe75)]

    self.base_consonant = u'𞠀'
    self.baseHexUTF16 = u'\ud81a\udee7'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': 'en_anangu',
        'longName': 'Unicode Aṉangu-Yolŋu',
        'jsName': self.LanguageCode,
        'instructions': None,
        'font': 'NotoSansMendeKikakui',
      },
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0xe600, 0xe780)])]

    # For dictionary
    self.dictionaryLang1 = "English"
    self.dictionaryLang2 = self.Language
    self.kb1 = 'en'
    self.kb2 = self.kb_list[0]['shortName']

# Global in this file.
langInstance = langInfo()

# Specialized page for Unicode and converting and instructions
class AnanuguYolnguHomeHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {
      'links': langInstance.links,
      'kb_list': langInstance.kb_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'demo_anangu.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication(
    [
      ('/en_anangu/', AnanuguYolnguHomeHandler),
      ('/' + langInstance.LanguageCode + '/convertUI/', AnanuguYolnguHomeHandler),
      ('/' + langInstance.LanguageCode + '/downloads/', base.Downloads),
      ('/' + langInstance.LanguageCode + '/converter/', base.ConvertHandler),
      ('/' + langInstance.LanguageCode + '/encodingRules/', base.EncodingRules),
      ('/' + langInstance.LanguageCode + '/diacritic/', base.DiacriticHandler),
      ('/' + langInstance.LanguageCode + '/dictionaryInput/', base.DictionaryInput),
    ], debug=True,
    config={'langInfo': langInstance}
)
