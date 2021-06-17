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

import logging
import sys
import webapp2

import base

from google.appengine.ext.webapp import template

class langInfo():
  def __init__(self):
    self.LanguageCode = 'ta'
    self.Language = 'Tamil'
    self.Language_native = 'தமிழ்'

    self.encoding_font_list = [
    ]

    self.unicode_font_list = [
      { 'source': '/fonts/NotoSansTamil-Regular.ttf',
        'family': 'NotoSansTamil',
        'longName': 'Noto Sans Tamil',
      },
    ]

    self.lang_list = [
      {'shortName':  'ta_phonemic',
       'longName': 'தமிழ் (Thamizh)',
       'nativeName': 'தமிழ்'
       },
    ]

    self.links = [
      {'linkText': 'Keyboard',
       'ref': '/' + self.LanguageCode + '/',
       },
      {'linkText': 'Converter',
       'ref': '/' + self.LanguageCode + '/convertUI/'
       },
      {'linkText': 'Keyboard transforms',
       'ref': '/' + self.LanguageCode + '/kbtransforms/'
       },
      {'linkText': 'Phonemic Keyboards for Abugida Scripts',
       'ref': 'https://elangocheran.com/2021/02/11/d-pub-for-keyboards-for-agglutinative-languages-and-abugidas/'
       },
      {'linkText': 'Unicode block',
       'ref': 'https://unicode.org/charts/PDF/U0B80.pdf'
       },
      {'linkText': 'Resources',
       'ref': '/' + self.LanguageCode + '/downloads/'
       },
      # {'linkText': 'Language Geek fonts',
      #  'ref': 'http://www.languagegeek.com/font/fontdownload.html'
      #  },
      # {'linkText': 'Try Plains Cree on Google Input Tools',
      #  'ref': 'https://www.google.com/intl/sa/inputtools/try/'
      #  },
    ]

    self.kb_list = [
      {
        'shortName': 'ta_phonemic',
        'longName': 'தமிழ் phonemic',
        'jsName': 'ta_phonemic',
        'instructions': None,
        'font': '/fonts/NotoSansTamil-Regular.ttf',
      },
      {
        'shortName': 'ta_phonemic_b',
        'longName': 'தமிழ் phonemic B',
        'jsName': 'ta_phonemic_b',
        'instructions': None,
        'font': '/fonts/NotoSansTamil-Regular.ttf',
      },
    ]

    # Resource files
    self.text_file_list = [
    ]

    self.base_consonant = u'க'  # KA
    self.baseHexUTF16 = u'\u0B95'

    self.converters = None

    # Python-based transliteration tool.
    self.transliterator = None

    return


langInstance = langInfo()

app = webapp2.WSGIApplication(
    [
        ('/' + langInstance.LanguageCode + '/', base.LanguagesHomeHandler),
        ('/' + langInstance.LanguageCode + '/keyboard/', base.LanguagesHomeHandler),
        ('/' + langInstance.LanguageCode + '/convertUI/', base.ConvertUIHandler),
        ('/' + langInstance.LanguageCode + '/downloads/', base.Downloads),
        ('/' + langInstance.LanguageCode + '/converter/', base.ConvertUIHandler),
        ('/' + langInstance.LanguageCode + '/encodingRules/', base.EncodingRules),
        ('/' + langInstance.LanguageCode + '/diacritic/', base.DiacriticHandler),
        ('/' + langInstance.LanguageCode + '/render/', base.EncodingRules),
        ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
