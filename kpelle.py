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

import os
import webapp2

import base

from google.appengine.ext.webapp import template

Language = 'Kpelle'
Language_native = 'Kpelle'
LanguageCode = 'kpe'
ScriptCode = 'Kpel'

encoding_font_list = [
  {
    'font_path': '/fonts/African_font_encodings/JGKpelleCombined.ttf',
    'font_name': 'JG Kpelle combined',
    'display_name': 'JG Kpelle combined',
  },
]

unicode_font_list = [
    {
        'family': 'JG Kpelle Combined',
        'longName': 'JG Kpelle combined',
        'source':  '/fonts/African_font_encodings/JGKpelleCombined.ttf',
        'note': 'not Unicode',
    },
]

kb_list = [
  {'shortName': LanguageCode + '_' + ScriptCode,
   'longName': Language + ' ' + ScriptCode,
   'fontFamily': 'JG Kpelle Combined',
   }
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Keyboard conversions',
     'ref': '/' + LanguageCode + '/kbtransforms/'
    },
    {'linkText': 'Phonetic table',
     'ref': '/' + LanguageCode + '/phonetickb/'
     },
    {'linkText': 'Wikipedia Kpelle syllabary',
     'ref': 'https://en.wikipedia.org/wiki/Kpelle_syllabary'
    },
    {'linkText': 'Wikipedia Kpelle language',
     'ref': 'https://en.wikipedia.org/wiki/Kpelle_language'},
    {'linkText': 'ScriptSource',
     'ref': 'https://scriptsource.org/cms/scripts/page.php?item_id=script_detail&key=Kpel'
    },
    {'linkText': 'Unicode Proposal 2010',
     'ref': 'http://std.dkuug.dk/jtc1/sc2/wg2/docs/n3762.pdf'
    },
    {'linkText': 'Digital Orientalist',
     'ref': 'https://digitalorientalist.com/2021/01/22/building-tools-with-bete-mende-and-kpelle-users/'
    }
    # {'linkText': 'Combiners',
    #  'ref': '/kpe/diacritic/'
    #  },
]

encodedRanges = [
  [0xc0, 0x179],
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u'FILL IN'
    # !!!! NOTE that this is not yet Unicode
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.lang_list = [LanguageCode]  # This may be extended
    self.kb_list = kb_list
    self.links = links

    self.text_functions = 'js/kpe.js'

    self.encoded_ranges = encodedRanges

    # For additional resources for download
    self.text_file_list = []

    # TODO: Fill in the rest of the common data.

    # Pointer to Unicode data for this script, e.g.,
    # 16c00;16C00 𖰀 KPELLE SYLLABLE PI-BHI
    self.unicode_database = 'unicode_data/kpelle_char_data.txt'
    
# TODO: Fill in with diacritics
diacritic_list = []

default_base_consonant = u'\u16c00'

langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + LanguageCode + '/phonetickb/', base.PhoneticKbHandler),
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
  ],
  debug=True,
  config={'langInfo': langInstance}
  )
