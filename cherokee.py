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
import transrule_chr

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Cherokee'
Language_native = 'ᏣᎳᎩ'

encoding_font_list = [
    {
      'font_path':'/fonts/Cherokee/CherokeeOLD.ttf',
      'font_name':'Cherokee_Old',
      'display_name': 'Cherokee Old',
    },
]

unicode_font_list = [
  { 'family': 'WebsterCherokee',
    'longName': 'Webster Cherokee',
    'source': '/fonts/Cherokee/WebsterCherokee.ttf',
  },
  { 'family': 'Digawogvi',
    'longName': 'Digawogvi',
    'source': '/fonts/Cherokee/Digawogvi.ttf',
  },
  {'family': 'PhoreusCherokee',
   'longName': 'PhoreusCherokee',
   'source': '/fonts/Cherokee/PhoreusCherokee-Regular.otf',
   },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/demo_chr/'
    },
    {'linkText': 'Converter',
     'ref': '/chr/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/chr/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/chr/downloads/'
    },
    {'linkText': 'Unicode',
      'ref': 'http://unicode.org/charts/PDF/U13A0.pdf'
    },
    {'linkText': 'Unicode Supplement',
     'ref': 'http://unicode.org/charts/PDF/UAB70.pdf'
    },
]


# Shows keyboard for Cherokee
class CherokeeIndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'chr',
         'longName': 'Cherokee Unicode'
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

# Presents UI for conversions from font encoding to Unicode.
class CherokeeConvertUIHandler(webapp2.RequestHandler):
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
      for i in xrange(0x20, 0x7f):
        oldInput += unichr(i)

      unicodeChars = '\ud804\udd00'
      unicodeChars += '\ud804\udd03'
      unicodeChars += '\ud804\udd04'
      unicodeChars += '\ud804\udd05'
      unicodeChars += '\ud804\udd06'

      unicodeCombiningChars = chakmaCombiningCombos(u'\ud804\udd07')
      kb_list = [
        {'shortName':  'ccp',
         'longName': 'Cherokee'
        }
      ]

      template_values = {
          'font': font,
          'language': Language,
          'langTag': 'chr',
          'encodingList': encoding_font_list,
          'encoding': {
              'font_path':'/fonts/ArjCN__.TTF',
              'font_name':'CherokeeASCII',
          },
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
      path = os.path.join(os.path.dirname(__file__), 'translit_general.html')
      self.response.out.write(template.render(path, template_values))

# AJAX handler for Cherokee converter
class CherokeeConvertHandler(webapp2.RequestHandler):
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
        'langTag': 'chr',
        'showTools': self.request.get('tools', None),
        'summary' : transCcp.getSummary(),
      }
      self.response.out.write(json.dumps(result))


class CherokeeEncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'ccp',
         'longName': 'Cherokee Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/chrConverter.js",
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
      self.response.out.write(template.render(path, template_values))

class CherokeeRenderPage(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'ccp',
         'longName': 'Cherokee Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/ccpConverter.js",
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'renderCombos.html')
      self.response.out.write(template.render(path, template_values))


class CherokeeDownloads(webapp2.RequestHandler):
    def get(self):

      template_values = {
          'language': Language,
          'language_native': Language_native,
          'unicode_font_list': unicode_font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'downloads.html')
      self.response.out.write(template.render(path, template_values))


# Create a string with combinations of the combining characters,
# following the given base character.
def chakmaCombiningCombos(baseHexChar):

  combiners = [u'\ud804\udd00', u'\ud804\udd01', u'\ud804\udd02',
               u'\ud804\udd27', u'\ud804\udd28', u'\ud804\udd29',
               u'\ud804\udd2a',
               u'\ud804\udd2b', u'\ud804\udd2c', u'\ud804\udd2d',
               u'\ud804\udd2e', u'\ud804\udd2f',
               u'\ud804\udd30', u'\ud804\udd31', u'\ud804\udd32',
               u'\ud804\udd33', u'\ud804\udd34']
  testString = u''
  for c0 in combiners:
    for c1 in combiners:
      testString += baseHexChar + c0 + c1 + ' '
    testString += '\u000a'
  return testString

app = webapp2.WSGIApplication([
  ('/demo_chr/', CherokeeIndigenousHomeHandler),
  ('/chr/', CherokeeIndigenousHomeHandler),
  ('/chr/convertUI/', CherokeeConvertUIHandler),
  ('/chr/downloads/', CherokeeDownloads),
  ('/chr/converter/', CherokeeConvertHandler),
  ('/chr/encodingRules/', CherokeeEncodingRules),
], debug=True)
