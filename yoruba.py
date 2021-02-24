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

import transliterate

import json
import logging
import os
import urllib
import webapp2

Language = 'Yorùbá'
Language_native = 'Èdè Yorùbá'
LanguageCode = 'yo'

encoding_font_list = [
  {
    'font_path': '/fonts/yoruba/ariya.ttf',
    'font_name': 'Ariya',
    'display_name': 'Ariya      #',
  },
  {
    'font_path': '/fonts/yoruba/YorubaOK_FF.ttf',
    'font_name': 'YorubaOK',
    'display_name': 'Cloned YorubaOK',
  },
]

unicode_font_list = [
  {
      'source': '/fonts/NotoSans-Regular.ttf',
      'family':  'NotoSans-Regular',
      'longName':  'Noto Sans',
  },
  {
      'source': '/fonts/NotoSerif-Regular.ttf',
      'family':  'NotoSerif-Regular',
      'longName':  'Noto Serif',
  },
  {
      'source': '/fonts/yoruba/NotoSans-Regular.ttf',
      'family':  'Noto fonts NotoSans-Regular',
      'longName':  'Noto fonts NotoSans-Regular',
  },
  {
      'source': '/fonts/yoruba/Roboto-Light.ttf',
      'family': 'Roboto-Light',
      'longName': 'Roboto Light'
  },
  {
      'source': '/fonts/yoruba/Roboto-BlackItalic.ttf',
      'family': 'Roboto-BlackItalic',
      'longName': 'Roboto BlackItalic'
  },
  {
      'source': '/fonts/yoruba/Roboto-MediumItalic.ttf',
      'family': 'Roboto-MediumItalic',
      'longName': 'Roboto MediumItalic'
  },
  {
      'source': '/fonts/yoruba/Roboto-Black.ttf',
      'family': 'Roboto-Black',
      'longName': 'Roboto Black'
  },
  {
      'source': '/fonts/yoruba/Roboto-Medium.ttf',
      'family': 'Roboto-Medium',
      'longName': 'Roboto Medium'
  },
  {
      'source': '/fonts/times new roman.ttf',
      'family': 'TimesNewRoman',
      'longName': 'Times New Roman'
  },
]
kb_list = [
  {'shortName': LanguageCode,
   'longName': Language,
   },
  {'shortName': 'yo1983',
   'longName': 'Pan-Niegerian 1983',
   },
]


links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    {'linkText': 'Resources',
      'ref': '/' + LanguageCode + '/downloads/'
    },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u'ẹ ẹ́ ẹ̀ Ẹ Ẹ́ Ẹ̀ ọ ọ́ ọ̀ Ọ́ Ọ̀ ṣ Ṣ ń ǹ n̄ Ń Ǹ N̄ ḿ m̀ m̄ Ḿ M̀ M̄'
    self.unicode_font_list = unicode_font_list
    self.lang_list = [Language]
    self.kb_list = kb_list
    self.links = links


# AJAX handler for converter
class ConvertHandler(webapp2.RequestHandler):
    def get(self):
      # TODO: Get the text values
      # Call transliterator
      # Return JSON structure with values.

      transCcp = transliterate.Transliterate(
        transrule_ccp.TRANS_LIT_RULES,
        transrule_ccp.DESCRIPTION
      )

      outText = '\u11103\u11101\u11103'
      message = 'TBD'
      error = ''

      result = {
        'outText' : outText,
        'message' : message,
        'error': error,
        'language': Language,
        'langTag': LanguageCode,
        'showTools': self.request.get('tools', None),
        'summary' : transCcp.getSummary(),
      }
      self.response.out.write(json.dumps(result))


langInstance = langInfo()

app = webapp2.WSGIApplication([
    ('/demo_' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/converter/', ConvertHandler),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
    ],
  debug=True,
  config={'langInfo': langInstance}
)
