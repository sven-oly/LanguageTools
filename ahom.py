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

import webapp2

# Use routines from this base class
import base


# Handling Ahom and other language codes for testing font and conversions.
class langInfo(base.languageTemplate):
  def __init__(self):
    self.LanguageCode = 'aho'
    self.Language = 'Tai Ahom'
    self.Language_native = 'Language in Tai Ahom'

    self.encoding_font_list = [
        { 'font_name': 'AhomFont',
          'display_name': 'Ahom',
          'font_path': '/fonts/ahom_aiton/AHOMFONT.TTF',
        },
        {
            'font_path':'/fonts/ahom_aiton/Ahom_Manuscript.ttf',
            'font_name':'AhomManuscript',
            'display_name': 'Ahom Manuscript',
        },
        {
            'font_path': '/fonts/ahom_aiton/AITON.TTF',
            'font_name': 'Aiton',
            'display_name': 'Aiton',
        },
        {
            'font_path': '/fonts/ahom_aiton/PHAKE.TTF',
            'font_name': 'Phake',
            'display_name': 'Phake',
        },
        {
            'font_path': '/fonts/ahom_aiton/PHAKERAM.TTF',
            'font_name': 'Phakeram',
            'display_name': 'Phake Ram',
        },
    ]

    self.unicode_font_list = [
        { 'source': '/fonts/ahom_aiton/NotoSerifAhom-Regular.ttf',
          'family': 'NotoSerifAhom',
          'longName': 'Noto Serif Ahom',
        },
        { 'family': 'AhomFontUnicode',
          'longName': 'Ahom Unicode',
          'source': '/fonts/ahom_aiton/AHOMFONT_Unicode.TTF',
        },
        { 'family': 'AhomUnicode',
          'longName': 'Ahom Manuscript Unicode',
          'source': '/fonts/ahom_aiton/AhomUnicode.ttf',
        },
        { 'source': '/fonts/ahom_aiton/Aitongr.ttf',
          'family': 'Aitongr',
          'longName': 'Aiton Gr',
        },
        { 'source': '/fonts/ahom_aiton/AitonUni.gr_2.ttf',
          'family': 'Aitongr2',
          'longName': 'Aiton Uni Gr2',
        },
        { 'source': '/fonts/Padauk-Regular.ttf',
          'family': 'Padauk',
          'longName': 'Padauk',
        },
        { 'source': '/fonts/NotoSansMyanmar-Regular.ttf',
          'family': 'NotoSansMyanmar ',
          'longName': 'Noto Sans Myanmar',
        },
    ]

    self.lang_list = [
        {'shortName':  'aho',
         'longName': 'Tai Ahom'
        },
        {'shortName':  'aio',
         'longName': 'Aiton'
        },
        {'shortName':  'kht',
         'longName': 'Khamti'
        },
        {'shortName':  'phk',
         'longName': 'Phake'
        },
        {'shortName':  'shn',
         'longName': 'Shan'
        },
        {'shortName':  'ksw',
         'longName': 'S\'gaw Karen'
        },
      ]

    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/aho/'
        },
        {'linkText': 'Converter',
         'ref': '/' + self.LanguageCode + '/convertUI/'
        },
        {'linkText': 'Font conversion summary',
         'ref': '/' + self.LanguageCode + '/encodingRules/'
        },
        {'linkText': 'Ahom Unicode block',
         'ref': 'https://www.unicode.org/charts/PDF/U11700.pdf'
        },
        {'linkText': 'Resources',
         'ref': '/' + self.LanguageCode + '/downloads/'
        },
    ]

    self.kb_list = self.lang_list

    # Resource files
    self.text_file_list = [
        '/download/aho/3-5-1-1.txt',
        '/download/aho/nemi_mang_text.txt'
    ]

    self.baseHexUTF16 = u'\ud805\udf00'
    self.base_consonant = u'\ud805\udf00'

    self.unicodeChars = [unichr(x) for x in range(0x11700, 0x1173f)]
    self.diacritic_list = [unichr(x) for x in range(0x1171d, 0x1172c)]

    # Python-based transliteration tool.
    self.transliterator = None

   # Test data for showing in converter.
    self.test_data = ["""'𑜱𑜴𑜳𑜴𑜵𑜶𑜷𑜸𑜹𑜰
𑜫 ‌𑜦 𑜍 𑜄 𑜊 𑜥 𑜩 𑜢 𑜨 𑜆 𑜂 𑜧
𑜡 𑜏 𑜓 𑜇 𑜖 𑜑 𑜩 𑜀 𑜎 𑜠 '
 𑜁 𑜋 𑜌 𑜈 𑜃 𑜉 𑜼 𑜽
𑜾
𑜝 ​𑜣  𑜥
𑜒​𑜞​𑜔​𑜕​𑜗​𑜿​𑜙​𑜕
𑜘𑜐
"""
    ]

    return


ahomInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/aho/', base.LanguagesHomeHandler),
        ('/aho/keyboard/', base.LanguagesHomeHandler),
        ('/aho/convertUI/', base.ConvertUIHandler),
        ('/aho/downloads/', base.Downloads),
        ('/aho/converter/', base.ConvertUIHandler),
        ('/aho/encodingRules/', base.EncodingRules),
        ('/aho/diacritic/', base.DiacriticHandler),
        ('/aho/render/', base.EncodingRules),
    ],
    debug=True,
    config={'langInfo': ahomInstance}
)
