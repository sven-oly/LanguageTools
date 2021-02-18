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

import transliterate

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

import base

Language = 'Moro'
Language_native = 'Moro family'
LanguageCode = 'mor'

encoding_font_list = [
]

unicode_font_list = [
  {'family': 'NotoSans',
   'longName': 'Noto Sans',
   'source': '/fonts/NotoSans-Regular.ttf',
   },
  {'family': 'NotoSerif',
   'longName': 'Noto Serif',
   'source': '/fonts/NotoSerif-Regular.ttf',
   },
]

kb_list = [
  {'shortName': LanguageCode,
   'longName': Language
   },
]


links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
    # {'linkText': 'Resources',
    #   'ref': '/' + LanguageCode + '/downloads/'
    # },
    {'linkText': 'Wikipedia',
      'ref': 'https://en.wikipedia.org/wiki/Moro_language'
    },
]


class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.unicode_font_list = unicode_font_list
    self.lang_list = [LanguageCode]
    self.kb_list = kb_list
    self.links = links

    self.text_file_list = []


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldChars = (u'\u0001 !"\u0023\u0024%&\'()*+,-./' +
                  '0123456789:;<=>?@' +
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ[ \\ ]^_`' +
                  'abcdefghijklmnopqrstuvwxyz{|}~')
      text = self.request.get('text', oldChars)
      font = self.request.get('font')
      testStringList = [
          {'name': 'Test 1', # Note: must escape the single quote.
           'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
           '\u000a\u000b'},
      ]

      oldInput = u''
      for i in xrange(0x20, 0x7e):
        oldInput += unichr(i)
      for i in xrange(0x2018, 0x201e):
        oldInput += unichr(i)
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

# AJAX handler for converter
class ConvertHandler(webapp2.RequestHandler):
    def get(self):
      # TODO: Get the text values
      # Call transliterator
      # Return JSON structure with values.

      transCcp = transliterate.Transliterate(
        transrule_ccp.TRANS_LIT_RULES,
        transrule_ccp.DESCRIPTION
      )

      outText = '\u11103\u11101\u11103'
      message = 'TBD'
      error = ''

      result = {
        'outText' : outText,
        'message' : message,
        'error': error,
        'language': Language,
        'langTag': LanguageCode,
        'showTools': self.request.get('tools', None),
        'summary' : transCcp.getSummary(),
      }
      self.response.out.write(json.dumps(result))


langInstance = langInfo()

app = webapp2.WSGIApplication([
    ('/demo_' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/converter/', ConvertHandler),
    ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ],
  debug=True,
  config={'langInfo': langInstance}
)