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


# Handling Ahom and other language codes for testing font and conversions.
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'phk'
    self.Language = 'Tai Phake'
    self.Language_native = 'Language in Tai Phake'

    self.encoding_font_list = [
      {
        'font_path': '/fonts/ahom_aiton/PHAKE.TTF',
        'font_name': 'Phake',
        'display_name': 'Phake',
      },
      {
        'font_path': '/fonts/ahom_aiton/PHAKERAM.TTF',
        'font_name': 'Phakeramayana',
        'display_name': 'Phake Ramayana',
      },
      {
         'font_path': '/fonts/ahom_aiton/AITON.TTF',
         'font_name': 'Aiton',
         'display_name': 'Aiton',
      },
    ]

    self.unicode_font_list = [
      {'source': '/fonts/Myanmar/NotoSerifMyanmar-Light.ttf',
       'family': 'NotoSerif Myanmar Light',
       'longName': 'Noto Serif Myanmar Light',
       },
      {'source': '/fonts/Phake/GhinKhao-Bold.otf',
       'family': 'GhinKhao-Bold',
       'longName': 'GhinKhao Bold',
       },
      { 'source': '/fonts/Padauk-Regular.ttf',
          'family': 'Padauk',
          'longName': 'Padauk',
        },
        { 'source': '/fonts/Myanmar/NotoSansMyanmar-Regular.ttf',
          'family': 'NotoSansMyanmarRegular',
          'longName': 'Noto Sans Myanmar Regular',
        },
      {'source': '/fonts/Myanmar/NotoSansMyanmar-Medium.ttf',
       'family': 'NotoSansMyanmarMedium',
       'longName': 'Noto Sans Myanmar Medium',
       },
      {'source': '/fonts/Myanmar/NotoSansMyanmar-Light.ttf',
       'family': 'NotoSansMyanmarLight',
       'longName': 'Noto Sans Myanmar Light',
       },
      {'source': '/fonts/Myanmar/NotoSansMyanmar-Thin.ttf',
       'family': 'NotoSansMyanmarThin',
       'longName': 'Noto Sans Myanmar Thin',
       },
      { 'source': '/fonts/Myanmar/NotoSerifMyanmar-Regular.ttf',
          'family': 'NotoSerif Myanmar Regular',
          'longName': 'Noto Serif Myanmar Regular',
        },
      {'source': '/fonts/Myanmar/NotoSerifMyanmar-Medium.ttf',
       'family': 'NotoSerif Myanmar Medium',
       'longName': 'Noto Serif Myanmar Medium',
       },

    {'source': '/fonts/Myanmar/NotoSerifMyanmar-Thin.ttf',
     'family': 'NotoSerif Myanmar Thin',
     'longName': 'Noto Serif Myanmar Thin',
     },
    ]

    self.lang_list = [
      {'shortName': 'phk',
       'longName': 'Phake'
       },
      {'shortName': 'kht',
       'longName': 'Khamti'
       },
      {'shortName':  'aio',
        'longName': 'Aiton'
       },

    ]

    self.kb_list = [
      {'shortName': 'phkVar',
       'longName': 'Phake Variant',
       'fontFamily': 'NotoSansMyanmarRegular,arial',
       },
      {'shortName': 'phk',
       'longName': 'Phake',
       'fontFamily': 'NotoSansMyanmarRegular,arial',
       },
      {'shortName': 'aio',
       'longName': 'Aiton',
       'fontFamily': 'NotoSansMyanmarRegular',
       },
    ]

    self.links = [
      {'linkText': 'Keyboard',
       'ref': '/phk/'
       },
      {'linkText': 'Converter',
       'ref': '/' + self.LanguageCode + '/convertUI/'
       },
      {'linkText': 'Font conversion summary',
       'ref': '/' + self.LanguageCode + '/encodingRules/'
       },
      {'linkText': 'KB transforms',
       'ref': '/' + self.LanguageCode + '/kbtransforms/'
       },
      {'linkText': 'Combiners',
       'ref': '/' + self.LanguageCode + '/diacritic/'
       },
      {'linkText': 'Phake-English dictionary builder',
       'ref': '/' + self.LanguageCode + '/dictionaryN/'
       },
      {'linkText': 'Variation sequences: About those dots',
       'ref': 'http://unicode.org/faq/vs.html'
       },
      {'linkText': 'Myanmar Unicode block',
       'ref': 'http://www.unicode.org/charts/PDF/U1000.pdf'
       },
      {'linkText': 'Myanmar Unicode extension A block',
       'ref': 'https://www.unicode.org/charts/PDF/UAA60.pdf'
       },
      {'linkText': 'Resources',
       'ref': '/' + self.LanguageCode + '/downloads/'
       },
    ]

    resource_list = [
      {
        'name': 'KeyMan Phake keyboard for mobile and computer',
        'source': '/resources/phk/phake_107.kmp',
        'description': 'Version 1.07 29-Spe-2020'
      },
      {
        'name': 'KeyMan Phake keyboard for mobile and computer',
        'source': '/resources/phk/phk_v1.06.kmp',
        'description': 'Version 1.06 19-Aug-2020'
      },
      {
        'name': 'KeyMan Phake keyboard for mobile and computer',
        'source': '/resources/phk/phk3.kmp',
        'description': 'phk3.kmp for Phake Unicode'
      },
    ]

    # Resource files
    self.text_file_list = resource_list

    self.baseHexUTF16 = u'\u1000\ufe00'
    self.base_consonant = u'\u1000\ufe00'

    self.unicodeChars = [unichr(x) for x in range(0x1000, 0x105f)]
    self.diacritic_list = [unichr(x) for x in range(0x102b, 0x103f)]

    # Python-based transliteration tool.
    self.transliterator = None

   # Test data for showing in converter.
    self.test_data = u'V: ဢ︀ꩬ︀ၵ︀ꩡ︀ထ︀ၸ︀တ︀ယ︀ီက︀လ︀\nN: ဢꩬၵꩡထၸတယီကလ'

    self.dictionaryLang1 = 'phk'
    self.dictionaryLang2 = 'en'
    self.kb1 = ''
    self.kb2 = ''

    # Set up the toggle to change variation sequence.
    self.variation_sequence = True

    self.dictionaryNData = [
      {'langName': self.Language, 'langNative': '',
       'languageCode': self.LanguageCode,
        'kbShortName': 'phkVar', 'kbLongName': self.Language,
        'font': { 'family': self.unicode_font_list[0]['family'],
          'longName': self.unicode_font_list[0]['longName'],
          'source':self.unicode_font_list[0]['source'],
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
        ('/phk/', base.LanguagesHomeHandler),
        ('/phk/keyboard/', base.LanguagesHomeHandler),
        ('/phk/convertUI/', base.ConvertUIHandler),
        ('/phk/downloads/', base.Downloads),
        ('/phk/converter/', base.ConvertUIHandler),
        ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
        ('/phk/encodingRules/', base.EncodingRules),
        ('/phk/diacritic/', base.DiacriticHandler),
        ('/phk/render/', base.EncodingRules),
        ('/phk/dictionaryN/', base.DictionaryN),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
