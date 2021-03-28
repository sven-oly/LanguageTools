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

import json
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

import base

encoding_font_list = [
    {
        'display_name': 'Mong0 ASCII',
        'font_name': 'Mong0_fixed',
        'font_path':'/fonts/NyiakengPuacheHmong/Mong0_ASCII_fixed.ttf',
    },
    {
        'display_name': 'Mong NE4 ASCII',
        'font_name': 'Mong4_fixed',
        'font_path':'/fonts/NyiakengPuacheHmong/Mong_NE4_ASCII_fixed.ttf',
    },
    # The original fonts did not load correctly. After regenerating
    # from fontforge, they work much better.
    # {
    #   'font_path': '/fonts/NyiakengPuacheHmong/MONG_0.ttf',
    #   'font_name': 'Mong_0',
    #   'display_name': 'Mong 0',
    # },
    # {
    #   'font_path': '/fonts/NyiakengPuacheHmong/MONG_NE4.TTF',
    #   'font_name': 'MONG_NE4',
    #   'display_name': 'Mong NE4',
    # },
]

unicode_font_list = [
  {
    'family': 'Noto_Serif_Regular',
    'longName': 'Noto Serif Regular',
    'source': '/fonts/NyiakengPuacheHmong/Noto/NotoSerifNyiakengPuachueHmong-Regular.ttf',
  },
  {
    'family': 'Noto_Serif_Bold',
    'longName': 'Noto Serif Bold',
    'source': '/fonts/NyiakengPuacheHmong/Noto/NotoSerifNyiakengPuachueHmong-Bold.otf',
  },
  {
    'family': 'Noto_Serif_SemiBold',
    'longName': 'Noto Serif SemiBold',
    'source': '/fonts/NyiakengPuacheHmong/Noto/NotoSerifNyiakengPuachueHmong-SemiBold.otf',
  },
  {
    'family': 'Noto_Serif_Medium',
    'longName': 'Noto Serif Medium',
    'source': '/fonts/NyiakengPuacheHmong/Noto/NotoSerifNyiakengPuachueHmong-Medium.otf',
  },
  {
    'family': 'Noto_Serif_Variable',
    'longName': 'Noto Serif Variable',
    'source': '/fonts/NyiakengPuacheHmong/Noto/NotoSerifNyiakengPuachueHmong-VF.ttf',
  },
  {
    'family': 'TT_Hmong2',
    'longName': 'TT Hmong2',
    'source': '/fonts/NyiakengPuacheHmong/TT_Hmong-2-Regular.woff',
  },
  # {
  #     'family': 'TT_Hmong',
  #     'longName': 'TT Hmong',
  #     'source':'/fonts/NyiakengPuacheHmong/TT_Hmong-Regular.otf',
  # },
  # {
  #     'family': 'MATD',
  #     'longName': 'MATD_TP70',
  #     'source':'/fonts/NyiakengPuacheHmong/MATD-TamaraPilz-Regular-A-70.otf',
  # },
  # {
  #     'family': 'Mong0_Unicode',
  #     'longName': 'Mong0 Unicode prototype',
  #     'source':'/fonts/NyiakengPuacheHmong/Mong0_unicode.ttf',
  # },
]

# Resource file list
resource_list = [
  {
    'name': 'KeyMan for Green Hmong',
    'source': '/resources/nyiakeng/greenhmong.kmp',
    'description': 'Keyman keyboard for Nyiakeng Puachue Hmong'
  },
  {
    'name': 'KeyMan for Green Hmong',
    'source': '/resources/nyiakeng/keymandesktop-greenhmong.exe',
    'description': 'Install Windows Keyman + keyboard for Nyiakeng Puachue Hmong'
  },
  {
    'name': 'KeyMan for Green Hmong',
    'source': '/resources/nyiakeng/greenhmong-source.zip',
    'description': 'Source to build Keyman for Nyiakeng Puachue Hmong'
  },
  {
    'name': 'KeyMan',
    'link': 'https://keyman.com/developer/download',
    'description': 'Link to developer documentation'
  },
  {
    'name': 'KeyMan',
    'link': 'https://help.keyman.com/developer/12.0/',
    'description': 'Link to developer support'
},
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/nyiakeng/'
    },
    {'linkText': 'Converter',
     'ref': '/nyiakeng/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/nyiakeng/encodingRules/'
    },
    {'linkText': 'Resources / Downloads',
      'ref': '/nyiakeng/downloads/'
    },
    {'linkText': 'Unicode Page',
    'ref': 'https://www.unicode.org/charts/PDF/U1E100.pdf'
    },
    {'linkText': 'Combiners',
     'ref': '/nyiakeng/diacritic/'
     },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'hnj'  # or mww for White Hmong
    self.Language = 'Nyiakeng Puachue Hmong'
    self.Language_native = ''
    self.direction = 'ltr'

    if sys.maxunicode >= 0x10000:
      self.diacritic_list = [unichr(x) for x in range(0x1e100, 0x1e14f)]
    else:
      self.diacritic_list = [unichr(0xd838) + unichr(0xdd00 + x) for x in range(0x00, 0x4f)]

    self.base_consonant = u'\ud838\udd00'
    self.baseHexUTF16 = u'\ud838\udd01'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': 'hnj',
        'longName': 'Green Hmong keyboard',
        'jsName': 'hnj',
        'font': 'MATD_TP70',
      },
      {
        'shortName': 'mww',
        'longName': 'White Hmong keyboard',
        'jsName': 'mww',
        'font': 'MATD_TP70',
      },
    ]
    self.links = links
    self.text_file_list = []

    # Restricted
    self.public_font_resources = unicode_font_list[0:5]

    self.unicode_font_list = unicode_font_list
    self.text_file_list = resource_list

    # Lists of test characters for the various encodings
    self.test_chars = [' '.join([unichr(x) for x in range(0x20, 0x7f)])]

    self.dictionaryLang1 = 'hnj'
    self.dictionaryLang2 = 'en'
    self.kb1 = ''
    self.kb2 = ''

    self.dictionaryNData = [
      {'langName': self.Language, 'langNative': '',
       'languageCode': self.LanguageCode,
        'kbShortName': 'hnj', 'kbLongName': self.Language,
        'font': { 'family': 'TT_Hmong-Regular',
          'longName': 'TT_Hmong-Regular',
          'source':'/fonts/NyiakengPuacheHmong/TT_Hmong-Regular.otf'
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

class NewKBHandler(webapp2.RequestHandler):
  def get(self, match=None):
    langInfo = self.app.config.get('langInfo')
    lang_list = [
        {'shortName':  'tst',
         'longName': 'Testing'
        },
    ]

    try:
      text_direction = langInfo.direction
    except AttributeError:
      text_direction = 'ltr'

    template_values = {
        'direction': text_direction,
        'language': langInfo.Language,
        'font_list': langInfo.unicode_font_list,
        'lang_list': langInfo.lang_list,
        'kb_list': langInfo.kb_list,
        'links': langInfo.links,
    }
    path = os.path.join(os.path.dirname(__file__), 'nyiakeng_keyboard.html')
    self.response.out.write(template.render(path, template_values))


# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
    [
      ('/(hnj|nyiakeng)/', base.LanguagesHomeHandler),
      ('/(hnj|nyiakeng)/convertUI/', base.ConvertUIHandler),
      ('/(hnj|nyiakeng)/downloads/', base.Downloads),
      ('/(hnj|nyiakeng)/converter/', base.ConvertHandler),
      ('/(hnj|nyiakeng)/encodingRules/', base.EncodingRules),
      ('/(hnj|nyiakeng)/diacritic/', base.DiacriticHandler),
      ('/(hnj|nyiakeng)/newkb/', NewKBHandler),
      ('/(hnj|nyiakeng)/dictionaryN/', base.DictionaryN),
    ],
  debug=True,
  config={'langInfo': langInstance}
)
