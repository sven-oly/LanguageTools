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

# TODO: Fill in with diacritics
diacritic_list = [unichr(x) for x in range(0x1c24, 0x1c37)]
#TODO: Fill in base consonant
default_base_consonant = u'\u1c00'


diacritic_list = [unichr(x) for x in range(0xa926, 0xa92d)]

default_base_consonant = u'\u1c00'


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldCharList = []
      for run in encodedRanges:
        oldCharList.extend([unichr(x) + ' ' for x in xrange(run[0], run[1])])

      oldChars = ''.join(oldCharList)
      text = self.request.get('text', oldChars)
      font = self.request.get('font')
      testStringList = [
          {'name': 'Test 1', # Note: must escape the single quote.
           'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
           '\u000a\u000b'},
      ]

      oldInput = text

      unicodeChars = ''
      unicodeCombiningChars = ''

      template_values = {
          'font': font,
          'language': Language,
          'langTag': LanguageCode,
          'encodingList': encoding_font_list,
          'encoding': encoding_font_list[0],
          'kb_list': kb_list,
          'unicodeFonts': unicode_font_list,
          'links': links,
          'oldChars': oldChars,
          'oldInput': oldInput,
          'text': text,
          'textStrings': testStringList,
          'showTools': self.request.get('tools', None),
          'unicodeChars': unicodeChars,
          'combiningChars': unicodeCombiningChars,
      }
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
      self.response.out.write(template.render(path, template_values))


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + LanguageCode + '/phonetickb/', base.PhoneticKbHandler),
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
], debug=True,
                              config={'langInfo': langInstance}
)
