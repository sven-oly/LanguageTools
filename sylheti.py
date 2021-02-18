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

#import translit
import transliterate
# import transrule_nv

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

import base


Language = 'Sylheti Nagari'
Language_native = 'Sylheti language'
LanguageCode = 'syl'

encoding_font_list = [
  {
    'font_path': '/fonts/SurmaL-Regular.ttf',
    'font_name': 'SurmaL',
    'display_name': 'SurmaL',
  },
]

unicode_font_list = [
    {
        'family': 'NotoSansSylotiNagri',
        'longName': 'Noto Sans Syloti Nagri',
        'source': '/fonts/NotoSansSylotiNagri-Regular.ttf',
    },
  {
    'family': 'SurmaUnicode',
    'longName': 'Surma Unicode',
    'source': '/fonts/Surma-Regular.ttf',
  },

]

kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Converter',
    'ref': '/' + LanguageCode + '/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/' + LanguageCode + '/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'Unicode page',
     'ref': 'https://www.unicode.org/charts/PDF/UA800.pdf'
    },
    {'linkText': 'Sylheti Nagari script',
     'ref': 'https://en.wikipedia.org/wiki/Sylheti_Nagari'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Sylheti_language'
    },
    {'linkText': 'Ethnolog',
     'ref': 'https://www.ethnologue.com/language/syl'
    },
    {'linkText': 'Combiners',
     'ref': '/syl/diacritic/'
     },
    {'linkText': 'SumraL description',
      'ref': 'http://www.sylheti.org.uk/legacy-font'
    },
]


diacritic_list = [unichr(0xa806), unichr(0xa80b)] + \
  [unichr(x) for x in range(0xa823, 0xa828)]
default_base_consonant = u'\ua800'

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.diacritic_list = diacritic_list
    self.base_consonant = default_base_consonant
    self.lang_list = [Language]
    self.kb_list = kb_list
    self.links = links


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldCharList = [unichr(x) + ' ' for x in xrange(0x20, 0x7f)] + \
                    [unichr(x) + ' ' for x in xrange(0xc0, 0xf5)]
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
      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language
        }
      ]

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
  ],
  debug=True,
  config={'langInfo': langInstance}
)
