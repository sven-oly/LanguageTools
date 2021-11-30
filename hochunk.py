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

# from allCherokeeFonts import all_cherokee_unicode_fonts

#import translit
import transliterate
import transrule_chr

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

import base

Language = 'Hoocąk'
Language_native = 'Hoocąk'
LanguageTag = 'win'
LanguageCode = 'win'

encoding_font_list = [
    {
      'font_path':'/fonts/hochunk/HOCATR__.TTF',
      'font_name':'Hocak',
      'display_name': 'Hocak Old',
    },
]

unicode_font_list = [
  {
    'family': 'NotoSerif',
    'longName': 'Noto Serif',
    'source': '/fonts/NotoSerif-Regular.ttf',
  },
  {
    'family': 'NotoSans',
    'longName': 'Noto Sans',
    'source': '/fonts/NotoSans-Regular.ttf',
  },
  {
    'family': 'Roboto',
    'longName': 'Roboto Regular',
    'source': '/fonts/Yoruba/Roboto-Regular.ttf',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/win/'
    },
    {'linkText': 'Converter',
     'ref': '/win/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/win/encodingRules/'
    },
    # {'linkText': 'Resources',
    #   'ref': '/win/downloads/'
    # },
    {'linkText': 'Hoocąk language',
      'ref': 'https://en.wikipedia.org/wiki/Winnebago_language#Orthography',
    },
    {'linkText': 'hoocak.org',
      'ref': 'https://www.hoocak.org/',
    },
    {'linkText': 'Martindale Center',
      'ref': 'http://www.martindalecenter.com/Language_1_Indigenous.html#ENGTO-HO-CHUNK',
    },
    {'linkText': 'Language Geek keyboard',
     'ref': 'http://www.languagegeek.com/siouan/keyboards/keymaps/Pan-Siouan.pdf',
     },
]

kb_list = [
  {'shortName': 'win2',
   'longName': Language + " 2",
   'instructions': 'Ogonek at upper left, caron right of zero, shift-upper left to macron. ' +
     'Double these to get original grave, dash, and tilde. ' +
     'Use for ą, ę, į, ų, ǧ, š, ž, ā, ų̄, etc.'
   },
  {'shortName': 'win_latn',
   'longName': Language + " Latin",
   }
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.lang_list = [Language]
    self.kb_list = kb_list
    self.links = links
    self.allFonts = True
    self.convertText = u'\u00e0\u00c0\u00ec\u00cc\u00f2\u00d2\u00f9\u00d9\u011e\u011f'
    self.testStringList = [
      {'name': 'Test 1', # Note: must escape the single quote.
       'string': u'\u00e0\u00c0\u00ec\u00cc\u00f2\u00d2\u00f9\u00d9\u011e\u011f'},
    ]


langInstance = langInfo()

app = webapp2.WSGIApplication([
    ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
    ('/' + LanguageCode + '/AllFonts/', base.AllFontTest ),
  ],
  debug=True,
  config={'langInfo': langInstance}
)
