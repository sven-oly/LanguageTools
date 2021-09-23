# -*- coding: utf-8 -*-
# !/usr/bin/env python
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

import webapp2

import base

Language = 'Mingrelian'
Language_native = 'მარგალური ნინა'
LanguageCode = 'xmf'
ScriptCode = 'Geor'

encoding_font_list = [
  {
    'font_path': '/fonts/Georgian/akolkhn.otf',
    'font_name': 'akolkhn',
    'display_name': 'Akolkhn ASCII',
  },
  {
    'font_path': '/fonts/Georgian/AcadMtavr_new.ttf',
    'font_name': 'AcadMtavr',
    'display_name': 'AcadMtavr ASCII',
  },
  {
    'font_path': '/fonts/Georgian/LitNusx.otf',
    'font_name': 'LitNusx',
    'display_name': 'LitNusx ASCII',
  },
]

unicode_font_list = [
  {
    'family': 'NotoSansGeorgianRegular',
    'longName': 'Noto Sans Georgian Regular',
    'source': '/fonts/Georgian/NotoSansGeorgian-Regular.ttf',
  },
  {
    'family': 'NotoSerifGeorgianRegular',
    'longName': 'Noto Serif Georgian',
    'source': '/fonts/Georgian/NotoSerifGeorgian-Regular.ttf',
  },
  {
    'family': 'NotoSansGeorgianLight',
    'longName': 'Noto Sans Georgian Light',
    'source': '/fonts/Georgian/NotoSansGeorgian-Light.ttf',
  },
  {
    'family': 'NotoSerifGeorgianLight',
    'longName': 'Noto Serif Georgian Light',
    'source': '/fonts/Georgian/NotoSerifGeorgian-Light.ttf',
  },
  {
    'family': 'bpg_glaho',
    'longName': 'BPG Glaho',
    'source': '/fonts/Georgian/bpg_glaho.ttf',
  },
]

links = [
    {
      'linkText': 'Keyboard',
      'ref': '/' + LanguageCode + '/'
    },
    {
      'linkText': 'Convert',
      'ref': '/' + LanguageCode + '/convert/'},
    {
      'linkText': 'Transliterate',
      'ref': '/' + LanguageCode + '/translit/'},
    {
      'linkText': 'KB transforms',
      'ref': '/' + LanguageCode + '/kbtransforms/'
     },
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
    # {'linkText': 'Resources',
    #   'ref': '/' + LanguageCode + '/downloads/'
    # },
    {
      'linkText': 'Unicode block',
      'ref': 'https://en.wikipedia.org/wiki/Georgian_(Unicode_block)'
    },
    {
      'linkText': 'Omniglot',
      'ref': 'https://omniglot.com/writing/mingrelian.htm'
    },
    # {'linkText': 'Wikipedi page',
    #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_language'
    # },
    # {'linkText': 'Ethnolog',
    #  'ref': 'https://www.ethnologue.com/language/lep'
    # },
    # {'linkText': 'Combiners',
    #  'ref': '/lep/diacritic/'
    #  },
]


class langInfo:
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.lang_list = [LanguageCode]  # This may be extended

    self.kb_list = [
      {'shortName': 'xmf_Latn',
       'longName': 'Mingrelian Latin',
       'instructions': 'Type ʒʒ, kk, pp, tt, zz, çç, ƷƷ, KK \u2026 to add \u02d8 --> ʒ̆ k̆ p̆ t̆ z̆ ç̆ Ʒ̆ K̆ \u2026',
       },
      {'shortName': 'xmf_translit',
       'longName': 'Mingrelian translit',
       'source': 'https://translit.cc/ge/',
       'instructions': "See 'https://translit.cc/ge/'",
       },
      {'shortName': LanguageCode,
       'longName': 'Mingrelian Georgian',
       'source': 'GBoard Mingrelian',
       'instructions': "Based on GBoard Mingrelian",
       },
    ]
    self.links = links

    # For Georgian to Latin
    self.translit_kb_list = [
      {'shortName': LanguageCode,
       'longName': 'Mingrelian Georgian',
       'source': 'GBoard Mingrelian',
       'instructions': "Based on GBoard Mingrelian",
       },
      {'shortName': 'en',
       'longName': 'Latin font encoding',
       },
    ]
    self.translit_encoding_list = [
      encoding_font_list[0], encoding_font_list[1], encoding_font_list[2],
      {
        'font_name': 'NotoSansGeorgianRegular',
        'display_name': 'Noto Sans Georgian Regular',
        'font_path': '/fonts/Georgian/NotoSansGeorgian-Regular.ttf',
      },
      {
        'font_name': 'NotoSerifGeorgianRegular',
        'display_name': 'Noto Serif Georgian',
        'font_path': '/fonts/Georgian/NotoSerifGeorgian-Regular.ttf',
      },
    ]
    # For additional resources for download
    self.text_file_list = []

    # TODO: Fill in the rest of the common data.

    # TODO: Fill in with diacritics
    self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
    # TODO: Fill in base consonant
    self.default_base_consonant = u'\0x61'

    self.encodedRanges = [
      (0x20, 0xff),
    ]

    # To handle transliteration
    self.outputScript = 'Mingrelian Unicode'


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convert/', base.ConvertUIHandler),  #
  ('/' + LanguageCode + '/translit/', base.TranslitHandler),  # Transliterates to Latin
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
], debug=True,
                              config={'langInfo': langInstance}
)
