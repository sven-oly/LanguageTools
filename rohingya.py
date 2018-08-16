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

import base

# import transliterate
# import transrule_ccp

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template


LanguageCode = 'rhg'
Language = 'Rohingya'
Language_native = ''

encoding_font_list = [
    {
      'font_path':'/fonts/Rohingya Kuna Leyka Noories.ttf',
      'font_name':'RohingyaKunaLeyka',
      'display_name': 'Kuna Leyka Noories',
      'Source location':' http://fontlibrary.org/en/font/rohingya-kuna-leyka-noories',
    },
    {
      'font_path':'/fonts/Rohingya Gonya Leyka Noories.ttf',
      'font_name':'RohingyaGonyaLeyka',
      'display_name': 'Gonya Leyka Noories',
      'Source location': 'http://fontlibrary.org/en/font/rohingya-gonya-leyka-noories',
    },
]

kb_list = [
    {'shortName':  LanguageCode,
     'longName': 'Hanific Rohigya Unicode',
     'jsName': 'rhg',
    }
]

unicode_font_list = [
  {
      'family': 'KunaLeykaNooriesUnicode',
      'long_name': 'Unicode hack',
      'source': '/fonts/Rohingya Kuna Leyka Noories_Unicode.ttf',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/rhg/'
    },
    {'linkText': 'Converter',
     'ref': '/rhg/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/rhg/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/rhg/downloads/'
    },
    {'linkText': 'Unicode Page',
    'ref': 'https://www.unicode.org/charts/PDF/U10D00.pdf'
    },
    {'linkText': 'Language Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Rohingya_language'
    },

    {'linkText': 'Combiners',
     'ref': '/rhg/diacritic/'
     },
]


if sys.maxunicode > 0x1000:
  logging.info('WIDE SYSTEM BUILD!!!')
  diacritic_list = [unichr(x) for x in range(0x10D22, 0x10D27)]
else:
  logging.info('NARRO SYSTEM BUILD!!!')
  diacritic_list = [unichr(0xd803) + unichr(0xdd + x) for x in range(0x22, 0x27)]


base_consonant = u'\u10D01'


class langInfo():
  def __init__(self):
    self.LanguageCode = 'rhg'
    self.Language = 'Rohingya'
    self.Language_native = '𐴀𐴁𐴂𐴃'

    if sys.maxunicode > 0x1000:
      self.diacritic_list = [unichr(x) for x in range(0x10D22, 0x10D27)]
    else:
      self.diacritic_list = [unichr(0xd803) + unichr(0xdd + x) for x in range(0x22, 0x27)]

    self.base_consonant = u'\u10D01'
    self.baseHexUTF16 = u'\ud803\udd01'

    self.encoding_font_list = encoding_font_list
    self.kb_list = kb_list
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = [
        { 'family': 'None',
          'longName': 'None',
          'source': '/fonts/None',
        },
    ]

# Global in this file.
langInstance = langInfo()

# Shows keyboard
class IndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageCode,
         'longName': 'Hanific Rohigya Unicode'
        }
      ]
      template_values = {
        'language': Language,
        'font_list': unicode_font_list,
        'lang_list': None,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))


# AJAX handler for the converter
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


class EncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'rhc',
         'longName': 'Rohingya Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/rhgConverter.js",
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
      self.response.out.write(template.render(path, template_values))


# Create a string with combinations of the combining characters,
# following the given base character.
def CombiningCombos(baseHexChar, combiners):

  testString = u''
  for c0 in combiners:
    for c1 in combiners:
      testString += baseHexChar + c0 + c1 + ' '
    testString += '\u000a'
  return testString


app = webapp2.WSGIApplication(
    [('/rhg/', IndigenousHomeHandler),
     ('/rhg/convertUI/', base.ConvertUIHandler),
     ('/rhg/downloads/', base.Downloads),
     ('/rhg/converter/', base.ConvertHandler),
     ('/rhg/encodingRules/', base.EncodingRules),
     ('/rhg/diacritic/', base.DiacriticHandler),
    ], debug=True,
    config={'langInfo': langInstance}
)
