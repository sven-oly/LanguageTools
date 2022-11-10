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

from google.appengine.ext.webapp import template

import base

Language = 'Oneida'
Language_native = 'onʌjotaʔaːka'
LanguageCode = 'one'

encoding_font_list = [
  {
    'font_path': '/fonts/ONEIDA__PC.TTF',
    'font_name': 'Oneida',
    'display_name': 'Oneida',
  },
]

unicode_font_list = [
  {'family': 'NotoSans',
   'longName': 'Noto Sans',
   'source': '/fonts/NotoSans-Regular.ttf',
   },
  {'family': 'Noto Serif',
   'longName': 'Noto Serif',
   'source': 'fonts/NotoSerif-Regular.ttf',
   },
]

resource_list = [
  {
    'name': 'KeyMan Oneida Mobile + desktop',
    'source': '/resources/one/oneida.kmp',
    'description': 'Version 1.1 .kmp includes Mobile 11-Nov-2021  '
  },
]

kb_list = [
  {'shortName': LanguageCode + '3',
   'longName': Language + ' Unicode V3',
   'instructions':
   'This keyboard version uses modifier keys to add accents to the vowels ' +
   'a, e, i, o, u, and ʌ.Use the key at the top left to accent a vowel. \u00a0' +
   'To add a bar under a single letter, type it and then add the bar with the key at the right in the second row. Some characters such as <, >, and [ are on ' +
   'the ctrl+Alt layer.'
   },
  {'shortName': LanguageCode + '2',
   'longName': Language + ' Unicode V2',
   'instructions':
   'This layout has accented vowels in the top row. Bar below after any character is added with ' +
   'the underbar in the 2nd row at the right. QWERTY is accessed by CapsLock.'
   },
  {'shortName': LanguageCode,
   'longName': Language + ' Unicode V1',
   'instructions':
   'This layout has accented lower case vowels in the top row of the shifted layer. ' +
   'Bar below is not supported, and also no upper case accented vowels. ' +
   'QWERTY is accessed by CapsLock.'
   },
  {'shortName': LanguageCode + '4',
   'longName': Language + ' Unicode V4',
   'instructions':
   'V4 has accented vowels in the top row in both lower and upper case. Digits are split '+
   'into two layers. Underbar is on the right of the 2nd row, and with CapsLock.'
  },
  {'shortName': LanguageCode + 'mobile',
   'longName': Language + ' Unicode Mobile',
   'instructions':
   'This is a prototype layout for exploring possible arrangement of keys for a mobile device.'
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
    {'linkText': 'Oneida-English dictionary builder',
      'ref': '/' + LanguageCode + '/dictionaryN/'
     },
    {'linkText': 'Resources',
        'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'Oneida NSN',
     'ref': 'https://oneida-nsn.gov/'
    },
    {'linkText': 'Resources / Downloads',
     'ref': '/one/downloads/'
    },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.lang_list = ['one']

    self.allFonts = True

    self.encoding_font_list = encoding_font_list

    self.unicode_font_list = unicode_font_list
    self.text_file_list = resource_list

    self.kb_list = kb_list
    self.links = links

    self.dictionaryLang1 = self.Language
    self.dictionaryLang2 = 'English'
    self.kb1 = self.kb_list[0]['shortName']
    self.kb2 = 'en'

    self.dictionaryNData = [
      {'langName': self.Language, 'langNative': self.Language_native,
       'languageCode': 'one',
       'kbShortName': self.kb_list[0]['shortName'],
       'kbLongName': self.kb_list[0]['longName'],
       'font': {'family': 'Latin',
                'longName': 'Noto Sans',
                'source': '/fonts/NotoSans-Regular.ttf'
                },
       'direction': 'ltr',
       },
      {'langName': 'English', 'langNative': 'English',
       'languageCode': 'en',
       'kbShortName': 'en', 'kbLongName': 'English',
       'font': {'family': 'Latin',
                'longName': 'Noto Sans',
                'source': '/fonts/NotoSans-Regular.ttf'
                },
       'direction': 'ltr',
       'helptext': 'Instructions'
       },
    ]

langInstance = langInfo()

app = webapp2.WSGIApplication(
  [
    ('/demo_' + langInstance.LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + langInstance.LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + langInstance.LanguageCode + '/convertUI/', base.ConvertUIHandler),
    ('/' + langInstance.LanguageCode + '/downloads/', base.Downloads),
    ('/' + langInstance.LanguageCode + '/converter/', base.ConvertHandler),
    ('/' + langInstance.LanguageCode + '/encodingRules/', base.EncodingRules),
    ('/' + langInstance.LanguageCode + '/dictionaryN/', base.DictionaryN),
  ],
  debug=True,
  config={'langInfo': langInstance}
)
