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


# Testing Cree language and variantsn
# Should this be inherited from base.languageTemplate?
class langInfo():
  def __init__(self):
    self.LanguageCode = 'cr'
    self.Language = 'Cree'
    self.Language_native = 'Cree languages'

    self.encoding_font_list = [
    ]

    self.allFonts = True

    self.unicode_font_list = [

      { 'source': '/fonts/cree/NotoSansCanadianAboriginal-Regular.ttf',
        'family': 'NotoSansCanadianAboriginal',
        'longName': 'Noto Sans Canadian Aboriginal',
        },
      { 'source': '/fonts/cree/NotoSansCansPlainsCree.ttf',
        'family': 'NotoSansPlainsCree',
        'longName': 'Noto Sans Plains Cree',
        'information': 'Noto Sans Cans with modified ya, ye, yi, yo shapes'
        },      { 'family': 'bjcrus',
        'longName': 'BJ Cree',
        'source': '/fonts/cree/bjcrus.ttf'
      },
      {'family': 'oskiblackfoot5',
       'longName': 'Oski Blackfoot',
       'source': '/fonts/cree/oskiblackfoot5.ttf'
       },
      { 'family': 'kisiska',
        'longName': 'Kisiska',
        'source': '/fonts/cree/kisiska.otf'
      },
      { 'family': 'aboriginalSans',
        'longName': 'Aboriginal Sans',
        'source': '/fonts/cree/AboriginalSansREGULAR.ttf'
      },
      {'family': 'aboriginalSerif',
       'longName': 'Aboriginal Serif',
       'source': '/fonts/cree/Aboriginal Serif REGULAR 939.ttf'
       },
      {'family': 'Euphemia',
       'longName': 'Euphemia regular',
       'source': '/fonts/cree/Euphemia UCAS Regular 2.6.6.ttf',
       'origin': 'http://tiro.com/syllabics/resources/'
       },
      {'family': 'Uqammaq',
       'longName': 'Uqammaq regular',
       'source': '/fonts/cree/Uqammaq_Regular.ttf',
       'origin': 'http://tiro.com/syllabics/resources/'
       },
      {'family': 'Pigiarniq',
       'longName': 'Pigiarniq regular',
       'source': '/fonts/cree/Pigiarniq_Regular.ttf',
       'origin': 'http://tiro.com/syllabics/resources/'
       },
      {'family': 'Masinahikan_h',
       'longName': 'Masinahikan',
       'source': '/fonts/cree/Masinahikan_h.ttf',
       'origin': 'languagegeek.com'
       },
      {'family': 'Oskiw',
       'longName': 'Oskiw',
       'source': '/fonts/cree/Oskiw.ttf',
       'origin': 'languagegeek.com'
       },
      {'family': 'Pitabek',
       'longName': 'Pitabek',
       'source': '/fonts/cree/pitabek.ttf',
       'origin': 'languagegeek.com'
       },
    ]

    self.lang_list = [
      {'shortName':  'crk_phonetic',
       'longName': 'ᓀᐦᐃᔭᐍᐏᐣ (Plains Cree)',
       'nativeName': 'ᓀᐦᐃᔭᐍᐏᐣ'
       },
      # {'shortName':  'crk',
      #  'longName': 'Plains Cree'
      # },
      # {'shortName':  'cwd',
      #  'longName': 'Woods Cree'
      # },
      # {'shortName':  'csw',
      #  'longName': 'Swampy Cree'
      # },
      # {'shortName':  'crl',
      #  'longName': 'Northern East Cree'
      # },
      # {'shortName':  'crj',
      #  'longName': 'Southern East Cree'
      # },
      # {'shortName':  'nsk',
      #  'longName': 'Naskapi'
      # },
      # {'shortName':  'moe',
      #  'longName': 'Montagnais'
      # },
      # {'shortName': 'atj',
      #  'longName':  'Atikamekw'
      # },
    ]

    self.links = [
      {'linkText': 'Keyboard',
       'ref': '/aho/'
       },
      {'linkText': 'Converter',
       'ref': '/' + self.LanguageCode + '/convertUI/'
       },
      {'linkText': 'Keyboard transforms',
       'ref': '/' + self.LanguageCode + '/kbtransforms/'
       },
      {'linkText': 'Plains Cree Keyboard',
       'ref': 'https://www.altlab.dev/plains-cree-syllabics-key-sequences/'
       },
      {'linkText': 'Unicode block',
       'ref': 'https://www.unicode.org/charts/PDF/U1400.pdf'
       },
      {'linkText': 'Resources',
       'ref': '/' + self.LanguageCode + '/downloads/'
       },
      {'linkText': 'Language Geek fonts',
       'ref': 'http://www.languagegeek.com/font/fontdownload.html'
       },
      {'linkText': 'Try Plains Cree on Google Input Tools',
       'ref': 'https://www.google.com/intl/sa/inputtools/try/'
       },
    ]

    self.kb_list = [
      {'shortName':  'fort_severn_cree',
       'longName': 'Fort Severn Cree',
       'nativeName': 'FS ᓀᐦᐃᔭᐍᐏᐣ',
       'fontFamily': 'NotoSansCanadianAboriginal',
       },
      {'shortName':  'james_bay_cree',
       'longName': 'James Bay Cree',
       'nativeName': 'JB ᓀᐦᐃᔭᐍᐏᐣ',
       'fontFamily': 'NotoSansCanadianAboriginal',
       },
      {'shortName':  'oji_cree',
       'longName': 'Oji Cree',
       'nativeName': 'OJ ᓀᐦᐃᔭᐍᐏᐣ',
       'fontFamily': 'NotoSansCanadianAboriginal',
       },
      {'shortName':  'crk_phonetic',
       'longName': 'Plains Cree Phonetic',
       'nativeName': 'ᓀᐦᐃᔭᐍᐏᐣ',
       'fontFamily': 'NotoSansCanadianAboriginal',
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

    self.converters = None

    # Python-based transliteration tool.
    self.transliterator = None

   # Test data for showing in converter.
    self.test_data = ''  #ᐊ ᐃ ᐄ ᐅ ᐆ ᐊ ᐋ'
    return


langInstance = langInfo()
app = webapp2.WSGIApplication(
    [
        ('/cr/', base.LanguagesHomeHandler),
        ('/cr/keyboard/', base.LanguagesHomeHandler),
        ('/cr/AllFonts/', base.AllFontTest),
        ('/cr/convertUI/', base.ConvertUIHandler),
        ('/cr/downloads/', base.Downloads),
        ('/cr/converter/', base.ConvertUIHandler),
        ('/cr/encodingRules/', base.EncodingRules),
        ('/cr/diacritic/', base.DiacriticHandler),
        ('/cr/render/', base.EncodingRules),
        ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
    ],
    debug=True,
    config={'langInfo': langInstance}
)
