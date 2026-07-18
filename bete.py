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

encoding_font_list = [
    {
       'font_path':'/fonts/bete/JGBete4PUA.ttf',
       'font_name':'JGBete4',
       'display_name': 'JGBete4',
    #   'Source location': 'https://www.wfonts.com/font/jg-bete',  # ??
    },
]

unicode_font_list = [
    {
      'family': 'JGBete4',
      'longName': 'JGBete4 PUA',
      'source': '/fonts/bete/JGBete4PUA.ttf',
      'attribution': 'https://www.wfonts.com/font/jg-bete',
  },
  # {
  #     'family': 'KikakuiSansPro',
  #     'longName': 'Kikakui Sans Pro',
  #     'source': '/fonts/MendeKikakui/KikakuiSansPro.ot.ttf',
  # },
]


class langInfo():
  def __init__(self):
    self.LanguageCode = 'bete'  # Kru languages
    self.Language = u'Bété'
    self.Language_native = u'Bété'
    self.direction = 'ltr'

    self.diacritic_list = [chr(x) for x in range(0xe753, 0xe75)]
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
        'shortName': self.LanguageCode + "Phone",
        'longName': 'Bété Phonetic',
        'jsName': "betePhone",
        'instructions': None,
        'fontFamily': 'JGBete4',
      },
    ]
    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/langbase/%s' % self.LanguageCode
         },
      {'linkText': 'Keyboard conversions',
       'ref': '/kbtransforms/' + 'bete'    # {'linkText': 'Converter',
      },
      {'linkText': 'Word search',
       'ref': '/wordsearch/' + self.LanguageCode
      },
      #  'ref': '/bete/convertUI/'
      # },
      # {'linkText': 'Font conversion summary',
      #   'ref': '/bete/encodingRules/'
      # },
      # {'linkText': 'Resources',
      #   'ref': '/downloads/bete/
      # },
      # {'linkText': 'Unicode Page',
      #  'ref': 'https://www.unicode.org/charts/PDF/U1E800.pdf'
      # },
      {'linkText': 'Kru languages, Ivory Coast',
       'ref': 'https://en.wikipedia.org/wiki/Kru_languages'
      },
      {'linkText': 'Language Wikipedia',
       'ref': 'https://en.wikipedia.org/wiki/B%C3%A9t%C3%A9_languages'
      },
      {'ref': 'http://www.unicode.org/L2/L2019/19044-bete-script.pdf',
       'linkText': 'Unicode proposal 2019'
      },
      {'linkText': 'Unicode proposal draft 2017',
       'ref': 'http://www.unicode.org/L2/L2017/17323-bete-progress.pdf'
      },
      {'linkText': 'Athinkra Character Picker',
       'ref': 'http://nkoconvert.ho.ua/bete-ime/'
      },
      {'linkText': 'Digital Orientalist',
       'ref': 'https://digitalorientalist.com/2021/01/22/building-tools-with-bete-mende-and-kpelle-users/'
      },
    ]
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    self.test_chars = ' '.join([chr(x) for x in range(0xe600, 0xe780)])

    # Temporary for PUA
    self.unicodeChars = [chr(x) for x in range(0xe600, 0xe780)]
    self.fillChars = self.unicodeChars
    self.diacritics = []
    self.unicodeCombiningChars = []
    
    # For dictionary
    self.dictionaryLang1 = "English"
    self.dictionaryLang2 = self.Language
    self.kb1 = 'en'
    self.kb2 = self.kb_list[0]['shortName']

  
# Global in this file.
langInstance = langInfo()
