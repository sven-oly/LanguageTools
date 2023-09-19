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

import sys
import webapp2

# Use routines from this base class
import base


# Testing Mundar language
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'unr'
    self.Language = 'Mundari'
    self.Language_native = '𞓗𞓕𞓨𞓚'

    self.allFonts = True  # Show text with all available fonts

    self.encoding_font_list = [
      { 'font_path': '/fonts/MundariBani/Mundari Lipi Arial.ttf',
        'font_name': 'MundariLipiArial',
        'display_name': 'Mundari Lipi Arial',
      },
      { 'font_path': '/fonts/MundariBani/Mundari Lipi-Regular.ttf',
        'font_name': 'MundariLipiRegular',
        'display_name': 'Mundari Lipi Regular',
      },
      {'font_path': '/fonts/MundariBani/Mundari Lipi Standard.ttf',
       'font_name': 'MundariLipiStandard',
       'display_name': 'Mundari Lipi Standard',
       },
      {'font_path': '/fonts/MundariBani/Mundari Lipi-JagaMohan.ttf',
       'font_name': 'MundariLipiJagaMohan',
       'display_name': 'Mundari Lipi Jaga Mohan',
       },
      {'font_path': '/fonts/MundariBani/Mundari Lipi-Stoneage.ttf',
       'font_name': 'MundariLipiStoneage',
       'display_name': 'Mundari Lipi Stoneage',
       },
    ]

    self.unicode_font_list = [
      { 'source': '/fonts/Mundari/NotoSansNagMundari-VariableFont_wght.ttf',
        'family': 'Noto Sans Nag Mudari',
        'longName': 'Noto Sans Nag Mudari'
      },
      { 'source': '/fonts/MundariBani/MundariLipiArialSutuUni.ttf',
        'family': 'MundariLipiRegulaSutuUni',
        'longName': 'Mundari Lipi Sutu Uni',
      },
    ]

    self.lang_list = [
        {'shortName':  'unr',
         'longName': 'Mundari',
        },
      ]

    self.about = {
      'description': "This script is not yet part of Unicode."
    }
    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/unr/'
        },
        {'linkText': 'Converter',
         'ref': '/' + self.LanguageCode + '/convertUI/'
        },
      {'linkText': 'Font conversion summary',
       'ref': '/unr/encodingRules/'
       },
        # {'linkText': 'Keyboard reference',
        #   'ref': 'https://wikis.swarthmore.edu/ling073/Kaingang/Keyboard'
        # },
      {'linkText': 'Mundari Bani script',
       'ref': 'https://omniglot.com/writing/mundaribani.htm'
       },
      {'linkText': 'Unicode proposal 21031r',
       'ref': 'https://www.unicode.org/L2/L2021/21031r-mundari.pdf'
       },
      {'linkText': 'Mundari Bani Wikipedia',
         'ref': 'https://en.wikipedia.org/wiki/Mundari_Bani'
        },
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
      {'linkText': 'Source of ASCII-encoded fonts',
       'ref': 'https://mundarisamaj.blogspot.com/p/download-mundari-software.html'
        },
    ]

    self.kb_list = [
      {'shortName': 'unrUnicode',
       'longName': 'Mundari Bani Unicode 1',
       },
    ]

    # Resource files
    self.text_file_list = [
    ]

    self.baseHexUTF16 = u'\u1400'
    self.base_consonant = u'\u1400'

    if sys.maxunicode >= 0x10000:
      self.unicodeChars = [unichr(x) for x in range(0x1400, 0x167F)]
      self.diacritic_list = []
    else:
      self.unicodeChars = [unichr(x) for x in range(0x1400, 0x167F)]
      self.diacritic_list = []


    # Python-based transliteration tool.
    self.transliterator = None

   # Test data for showing in converter.
    self.test_data = ''
    return


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/unr/', base.LanguagesHomeHandler),
        ('/unr/keyboard/', base.LanguagesHomeHandler),
        ('/unr/AllFonts/', base.AllFontTest),
        ('/unr/convertUI/', base.ConvertUIHandler),
        ('/unr/downloads/', base.Downloads),
        ('/unr/converter/', base.ConvertUIHandler),
        ('/unr/encodingRules/', base.EncodingRules),
        ('/unr/diacritic/', base.DiacriticHandler),
        ('/unr/render/', base.EncodingRules),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
