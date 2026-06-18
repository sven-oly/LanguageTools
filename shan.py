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
from __future__ import print_function
from __future__ import unicode_literals

#from builtins import chr

import base

# import
import transliterate
# Special transliteration for Burmese to Latin
import translit_burmese_rules
import transrule_my_wwburn

import json
import logging
import os
import sys
import urllib


# For Python 2.x. and Python
try:
    unichr
except NameError:
    unichr = chr

try:
    UNICODE_EXISTS = bool(type(unicode))
except NameError:
    unicode = lambda s: str(s)

try:
    xrange
except NameError:
    xrange = range

Language = 'Shan'
Language_native = 'မြန်မာဘာသာ'
LanguageCode = 'shn'

my_wwburn_converter_Unicode = None  # to Unicode
my_wwburn_converter_Z = None  # to Unicode or maybe to Z?

encoding_font_list = [
  {
    'font_path': '/fonts/Shan/SHAN.TTF',
    'font_name': 'SHAN TTF',
    'display_name': 'Shan ttf',
  },
  {
    # A converter to Unicode that may be useful.
    # https://github.com/SaingHmineTun/TMKFontConverter/blob/master/app/src/main/java/it/saimao/tmkfontconverter/fontconverter/ShanZawgyiConverter.java
    'font_path': '/fonts/Shan/Zawgyi-Tai.ttf',
    'font_name': 'Zawgyi-Tai',
    'display_name': 'Zawgyi-Tai',
  },
  {
    # A converter to Unicode that may be useful.
    # https://github.com/SaingHmineTun/TMKFontConverter/blob/master/app/src/main/java/it/saimao/tmkfontconverter/fontconverter/ShanZawgyiConverter.java
    'font_path': '/fonts/Shan/st_metta.ttf',
    'font_name': 'ST_Metta',
    'display_name': 'ST_Metta',
},
]

unicode_font_list = [
  {
    'family': 'NotoSansMyanmar',
    'longName': 'Noto Sans Myanmar',
    'source': '/fonts/Myanmar/NotoSansMyanmar-Regular.ttf',
  },
  {
    'family': 'GreatHorKhamYangon',
    'longName': 'Great Hor Kham Yangon',
    'source': '/fonts/Myanmar/GreatHorKhamYangon.otf',
  },
  {
    'family': 'KLO SHAN UNI ',
    'longName': 'Klo Shan Uni',
    'source': '/fonts/Myanmar/KLO SHAN UNI font.ttf',
  },
  {
    'family': 'NotoSerifsMyanmar',
    'longName': 'Noto Serif Myanmar',
    'source': '/fonts/Myanmar/NotoSerifMyanmar-Regular.ttf',
  },
  {
    'family': 'BeautiUNI-2',
    'longName': 'BeautiUNI-2',
    'source': '/fonts/burmese/BeautiUNI-2.ttf',
  },
  {
    'family': 'BeautiUNI-6',
    'longName': 'BeautiUNI-6',
    'source': '/fonts/burmese/BeautiUNI-6.ttf',
  },
  {
    'family': 'Padauk',
    'longName': 'Padauk',
    'source': '/fonts/burmese/Padauk.ttf',
  },
  {
    'family': 'Padauk-book',
    'longName': 'Padauk book',
    'source': '/fonts/Myanmar/Padauk-book.ttf',
  },
  {
    'family': 'Padauk-Bold',
    'longName': 'Padauk Bold',
    'source': '/fonts/Myanmar/Padauk-Bold.ttf',
  },
  {
    'family': 'Padauk Kyaungchikote',
    'longName': 'Padauk Kyaungchikote',
    'source': '/fonts/Myanmar/Padauk Kyaungchikote.ttf',
  },
  {
    'family': 'PadaukGrandPro v2',
    'longName': 'Padauk GrandPro v2',
    'source': '/fonts/Myanmar/PadaukGrandPro v2.ttf',
  },
  {
    'family': 'PadaukSagar',
    'longName': 'Padauk Sagar',
    'source': '/fonts/Myanmar/PadaukSagar.ttf',
  },
  {
    'family': 'PadaukSgaw',
    'longName': 'Padauk Sgaw',
    'source': '/fonts/Myanmar/PadaukSgaw.ttf',
  },
    {
        'source': '/fonts/Shan/mmrtext.ttf.ttf',
        'family': 'MyanmarText',
        'longName': 'Myanmar Text',
    },
]


links = [
    {'linkText': 'Converter',
     'ref': '/convert/shn'},
    {'linkText': 'Font conversion summary',
     'ref': '/encodingRules/shn'
    },
    {'linkText': 'Resources',
     'ref': '/downloads/%s' % LanguageCode
     },
    {'linkText': 'Unicode Myanmar',
     'ref': 'http://unicode.org/charts/PDF/U1000.pdf'
    },
    {'linkText': 'Combiners',
     'ref': '/diacritic/shn'},
    {'linkText': 'Wiki Shan language',
     'ref': 'https://en.wikipedia.org/wiki/Shan_language'},
]

# TODO
diacritic_list = [unichr(x) for x in range(0x102b, 0x103f)]

base_consonant = u'\u1000'

testStringList = [
]

kb_list = [
  {'shortName': 'shn_sil_keyman',
   'longName': 'Shan SIL'
   },
  {'shortName': 'shn_keyman',
   'longName': 'Shan'
   },
  {'shortName': 'shn',
   'longName': 'Shan Unicode'
   },
]


class testData():
  def __init__(self):
    self.basic_data = [
      ['ဘဲ ဓာတ် ဂျင် သား', '', '', '', ''],
      ['ဘဲ ', 'bhell', 'b-eh', 'yes', 'bɛ́'],
    ]


class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.LanguageTag = None
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.diacritic_list = diacritic_list
    self.base_consonant = u'\u107c'

    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.lang_list = ['shn']
    self.kb_list = kb_list
    self.links = links
    self.allFonts = True

    self.langCharacters = [0x1004, 0x1010, 0x1011, 0x1015, 0x1019, 0x101a]
    self.langCharacters.extend([0x101b, 0x101c, 0x101d, 0x1022, 0x102d, 0x102f])
    self.langCharacters.extend([0x103a, 0x103b, 0x103c, 0x103d, 0x103e, 0x103f])
    self.langCharacters.extend([c for c in range(0x1075, 0x109a)])
    self.langCharacters.extend([0x109e, 0x109f])
    self.all_chars = ' '.join([unichr(x) for x in self.langCharacters])

    self.unicodeRanges = [('\u1004'), ('\u1010', '\u1011'), ('\u1015'),
                          ('\u101b', '\u101d'),
                          ('\u1022'), ('\u102d'), ('\u102f'),
                          ('\u1019', '\u101a'), ('\u103a', '\u103f')]
    self.text_file_list = []

    self.translit_test_data = testData().basic_data

langInstance = langInfo()
