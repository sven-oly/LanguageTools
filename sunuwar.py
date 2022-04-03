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
    'source': '/fonts/Sunuwar/Mukdum_final.ttf',
    'longName': 'Mukdum Final',
    'family': 'MukdumFinal',
    'font_path': '/fonts/Sunuwar/Mukdum_final.ttf',
    'font_name': 'MukdumFinal',
    'display_name': 'Mukdum Final',
  },
  {
    'source': '/fonts/Sunuwar/Mukdum.ttf',
    'longName': 'Mukdum',
    'family': 'Mukdum',
    'font_path': '/fonts/Sunuwar/Mukdum.ttf',
    'font_name': 'Mukdum',
    'display_name': 'Mukdum',
  },
  {
    'source': '/fonts/Sunuwar/kirat2.ttf',
    'longName': 'Kirat2',
    'family': 'Kirat2',
    'font_path': '/fonts/Sunuwar/kirat2.ttf',
    'font_name': 'Kirat2',
    'display_name': 'Kirat2',
    'Source location': 'https://omniglot.com/writing/jenticha.htm',
    'info': 'updated by CWC with new W and Y and diacritics'
  },

  {
    'source': '/fonts/Sunuwar/Kaatich1.ttf',
    'longName': 'Kaatich1',
    'family': 'Kaatich1',
    'font_path': '/fonts/Sunuwar/Kaatich1.ttf',
    'font_name': 'Kaatich1',
    'display_name': 'Kaatich1',
    'Source location': 'https://omniglot.com/writing/jenticha.htm',
  },
  {
    'source': '/fonts/Sunuwar/Kirat1.Kõits.Blese.ttf',
    'longName': 'Kirat1',
    'family': 'Kirat1',
    'font_path': '/fonts/Sunuwar/Kirat1.Kõits.Blese.ttf',
    'font_name': 'Kirat1',
    'display_name': 'Kirat1',
    'Source location': 'https://omniglot.com/writing/jenticha.htm',
  },
  # {
  #   'source': '/fonts/Sunuwar/LONKUCH.ttf',
  #   'longName': 'Lonkuch',
  #   'family': 'Lonkuch',
  #   'font_path': '/fonts/Sunuwar/LONKUCH.ttf',
  #   'font_name': 'Lonkuch',
  #   'display_name': 'Lonkuch',
  #   'Source location': 'https://omniglot.com/writing/tikamuli.htm',
  # },
  # {
  #   'source': '/fonts/Sunuwar/PREM.ttf',
  #   'longName': 'Prem',
  #   'family': 'Prem',
  #   'font_path': '/fonts/Sunuwar/PREM.ttf',
  #   'font_name': 'Prem',
  #   'display_name': 'Prem',
  #   'Source location': 'https://omniglot.com/writing/tikamuli.htm',
  # },

]

unicode_font_list = [
  {
    'source': '/fonts/Sunuwar/Mukdum-Regular-Unicode.ttf',
    'longName': 'Mukdum Unicode TTF',
    'family': 'MukdumUnicodeTOTF',
    'font_path': '/fonts/Sunuwar/Mukdum-Regular-Unicode.ttf',
    'font_name': 'MukdumUnicodeTTF',
    'display_name': 'Mukdum Unicode TTF',
    'info': 'Derived from Mukdum ASCII, cwc 6-Feb-2022'
  },
  {
    'source': '/fonts/Sunuwar/Mukdum-Final-Unicode.ttf',
    'longName': 'Mukdum Final Unicode TTF',
    'family': 'MukdumFinalUnicodeTTF',
    'font_path': '/fonts/Sunuwar/Mukdum-Final-Unicode.ttf',
    'font_name': 'MukdumFinalUnicodeTTF',
    'display_name': 'Mukdum Final Unicode TTF',
    'info': 'Derived from Mukdum ASCIIFinal, cwc 1-Apr-2022'
  },
  {
    'source': '/fonts/Sunuwar/Mukdum-Regular-Unicode.otf',
    'longName': 'Mukdum Unicode OTF',
    'family': 'MukdumUnicodeOTF',
    'font_path': '/fonts/Sunuwar/Mukdum-Regular-Unicode.otf',
    'font_name': 'MukdumUnicodeOTF',
    'display_name': 'Mukdum Unicode OTF',
    'info': 'Derived from Mukdum ASCII, cwc 6-Feb-2022'
  },
  {
    'source': '/fonts/Sunuwar/kirat2_PUA.ttf',
    'longName': 'Kirat2 PUA',
    'family': 'kirat2_PUA',
    'font_path': '/fonts/Sunuwar/kirat2_PUA.ttf',
    'font_name': 'Kirat2 PUA',
    'display_name': 'Kirat2 PUA',
    'Source location': 'https://omniglot.com/writing/jenticha.htm',
  },
  {
    'source': '/fonts/Sunuwar/Sunuwar_combined_PUA.ttf',
    'longName': 'Sunawar Combined PUA',
    'family': 'Sunawar_PUA',
    'font_path': '/fonts/Sunuwar/Sunuwar_combined_PUA.ttf',
    'font_name': 'Sunawar_PUA',
    'display_name': 'Sunawar_PUA',
    'Source location': 'Combined by author CWC',
  },
  {
    'source': '/fonts/Sunuwar/Mukdum.ttf',
    'longName': 'Mukdum',
    'family': 'Mukdum',
    'font_path': '/fonts/Sunuwar/Mukdum.ttf',
    'font_name': 'Mukdum',
    'display_name': 'Mukdum',
  },
  {
    'source': '/fonts/Sunuwar/kirat1_PUA_new.ttf',
    'longName': 'Kirat1 PUA',
    'family': 'kirat1_PUA',
    'font_path': '/fonts/Sunuwar/kirat1_PUA_new.ttf',
    'font_name': 'Kirat1 PUA',
    'display_name': 'Kirat1 PUA',
    'Source location': 'https://omniglot.com/writing/jenticha.htm',
  },
  # {
  #   'source': '/fonts/Sunuwar/Lonkuch_PUA.ttf',
  #   'longName': 'Lonkuch PUA',
  #   'family': 'LonkuchPUA',
  #   'font_path': '/fonts/Sunuwar/Lonkuch_PUA.ttf',
  #   'font_name': 'Lonkuch PUA',
  #   'display_name': 'Lonkuch PUA',
  #   'Source location': 'https://omniglot.com/writing/tikamuli.htm',
  # },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/suz/'
    },
    {'linkText': 'Converter',
     'ref': '/suz/convertUI/'
    },
    {'linkText': 'Translit',
     'ref': '/suz/translit/'
    },
    # {'linkText': 'Font conversion summary',
    #   'ref': '/suz/encodingRules/'
    # },
    {'linkText': 'Tikamuli Unicode Proposal',
      'ref': 'http://www.unicode.org/L2/L2010/10465-tikamuli.pdf'
    },
    {'linkText': 'Kõits-Bleshe-Sunuwar Unicode Proposal 2021',
      'ref': '  https://www.unicode.org/L2/L2021/21157-sunuwar.pdf'
    },
    {'linkText': 'Sunuwar Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Sunwar_language'
    },
    {'linkText': 'Resources & Downloads',
     'ref': '/suz/downloads/'
    },
  # {
    #   'linkText': 'Combiners',
    #   'ref': '/bn/diacritic/'
    # },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'suz'
    self.Language = u'Kõits'
    self.Language_native = u'Sunuwar'
    self.direction = 'ltr'

    # This is undefined
    self.diacritic_list = [unichr(x) for x in range(0x9bc, 0x9e3)]
    self.base_consonant = u'ক'  # KA
    self.baseHexUTF16 = u'\u0995'

    
    self.letterCodes = [x for x in range(0x11bc0, 0x11be1)]
    if sys.maxunicode >= 0x10000:
      self.letters = [unichr(x) for x in self.letterCodes]
    else:
      self.letters = [unichr(0xd806) + unichr(0xdf00 + x - 0x11b00)
                      for x in self.letterCodes]
      
    self.digitCodes = [x for x in range(0x11bf0, 0x11bfa)]
    self.utf16 = [0xd806, 0xdf00]  # Add the lowest 2 hex digits

    self.fillChars = self.letters
    self.unicodeCombiningChars = []

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list

    self.unicode_font_list = unicode_font_list
    self.kb_list = [
      {
        'shortName': 'suz_unicode',
        'longName': 'Kõits-Bleshe-Sunuwar Unicode',
        'jsName': 'suz_unicode',
        'font': '/fonts/Sunuwar/Mukdum-Regular-Unicode.ttf',
        'instructions': None,
      },
      {
        'shortName': 'suz_jenticha_PUA',
        'longName': 'Kõits-Bleshe-Sunuwar PUA',
        'jsName': 'suz_jenticha_PUA',
        'font': '/fonts/Sunuwar/kirat1_PUA_new.ttf',
        'instructions': None,
      },
      {
        'shortName': 'suz_mukdum',
        'longName': 'Mukdum-Sunuwar',
        'jsName': 'suz_mukdum',
        'font': '/fonts/Sunuwar/Mukdum.ttf',
        'instructions': 'ASCII-based font',
      },
      # {
      #   'shortName': 'suz_tikamuli_PUA',
      #   'longName': 'Sunuwar Tikamuli PUA',
      #   'jsName': 'suz_tikamuli_PUA',
      #   'instructions': None,
      #   'font': '/fonts/Sunuwar/Lonkuch_PUA.ttf',
      # },

    ]

    resource_list = [
      {
        'name': 'KeyMan for Kõits-Bleshe Sunuwar',
        'source': '/resources/suz/sunuwar_kirat2.kmp',
        'description': 'Keyboard for Desktop - Private Use area and ASCII-based',
        'instructions': '',
      },
    ]
    self.text_file_list = resource_list

    self.links = links
    self.text_file_list = []
    self.public_unicode_fonts = unicode_font_list

    self.outputFont = "Private Use Area (PUA)"

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0xe9bc, 0x9e3)])]

    # For transliteration
    self.translit_encoding_list = [
      encoding_font_list[0], encoding_font_list[1], encoding_font_list[2],
      encoding_font_list[3], encoding_font_list[4],
    ]    

    # For dictionary
    self.dictionaryLang1 = "English"
    self.dictionaryLang2 = self.Language
    self.kb1 = 'en'
    self.kb2 = self.kb_list[0]['shortName']

    self.dictionaryNData = [
      {'langName': self.Language, 'langNative': 'Sunuwar',
       'languageCode': 'suz',
       'kbShortName': 'suz_mukdum', 'kbLongName': 'Sunuwar PUA',
       'font': { 'family': 'Mukdum',
                 'longName': 'Mukdum',
                 'source': '/fonts/Sunuwar/Mukdum.ttf',
                 },
       'direction': 'ltr',
       'helptext': ''
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
# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
    [('/' + langInstance.LanguageCode + '/', base.LanguagesHomeHandler),
     ('/' + langInstance.LanguageCode + '/translit/', base.TranslitHandler),  # Transliterates to Latin
     ('/' + langInstance.LanguageCode + '/convertUI/', base.ConvertUIHandler),
     ('/' + langInstance.LanguageCode + '/downloads/', base.Downloads),
     ('/' + langInstance.LanguageCode + '/converter/', base.ConvertHandler),
     ('/' + langInstance.LanguageCode + '/converter/', base.ConvertHandler),
     ('/' + langInstance.LanguageCode + '/encodingRules/', base.EncodingRules),
     ('/' + langInstance.LanguageCode + '/diacritic/', base.DiacriticHandler),
     ('/' + langInstance.LanguageCode + '/dictionaryInput/', base.DictionaryInput),
     ('/' + langInstance.LanguageCode + '/dictionaryN/', base.DictionaryN),
     ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
     ('/' + langInstance.LanguageCode + '/render/', base.EncodingRules),
     ('/' + langInstance.LanguageCode + '/wordsearch/', base.WordSearchHandler),
     ('/' + langInstance.LanguageCode + '/numerals/', base.NumeralsHandler),
     ('/' + langInstance.LanguageCode + '/keyman/', base.KeyManHandler),

     ], debug=True,
    config= {'langInfo': langInstance,
    }
)
