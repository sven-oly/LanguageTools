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

from allCherokeeFonts import all_cherokee_unicode_fonts

#import translit
import transliterate
# import transrule_nv

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Navajo'
Language_native = 'Diné Bizaad'
LanguageCode = 'nv'

encoding_font_list = [
  {
    'font_path': '/fonts/Navajo/Timenrn_.ttf',
    'font_name': 'TimesNewRomanNavajo',
    'display_name': 'Times New Roman Navajo',
  },
  {
    'font_path': '/fonts/Navajo/VERDN___.TTF',
    'font_name': 'VerdanaNavajo',
    'display_name': 'Verdana Navajo',
  },
  {
    'font_path':'/fonts/Navajo/CENTGN__.TTF',
    'font_name':'CenturyGothicNavajo',
    'display_name': 'Century Gothic Navajo',
  },
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
  #{'family': 'Roboto',
  # 'longName': 'Roboto',
  # 'source': 'https://fonts.googleapis.com/css?family=Roboto',
  # },
]

kb_list = [
  {'shortName': LanguageCode,
   'longName': Language + ' Modern'
   },
  {'shortName': LanguageCode + '_std',
   'longName': Language + ' Traditional'
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
    {'linkText': 'Diné Bizaad Navajo',
      'ref': 'http://www.lapahie.com/Dine_Bizaad.cfm'
    },
    {'linkText': 'Diné College IT',
     'ref': 'http://www.dinecollege.edu/current/it.php'
    },
]


# Shows keyboards
class NajavjoIndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
        'language': Language,
        'langTag': LanguageCode,
        'font_list': unicode_font_list,
        'lang_list': None,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))

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
      path = os.path.join(os.path.dirname(__file__), 'translit_general.html')
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


class EncodingRules(webapp2.RequestHandler):
    def get(self):

      template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
        'language': Language,
        'langTag': LanguageCode,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
      self.response.out.write(template.render(path, template_values))

class RenderPage(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language + ' Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/' + LanguageCode + 'Converter.js",
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'renderCombos.html')
      self.response.out.write(template.render(path, template_values))


class Downloads(webapp2.RequestHandler):
    def get(self):

      template_values = {
          'language': Language,
          'language_native': Language_native,
          'unicode_font_list': unicode_font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'downloads.html')
      self.response.out.write(template.render(path, template_values))




app = webapp2.WSGIApplication([
  ('/demo_' + LanguageCode + '/', NajavjoIndigenousHomeHandler),
  ('/' + LanguageCode + '/', NajavjoIndigenousHomeHandler),
  ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', Downloads),
  ('/' + LanguageCode + '/converter/', ConvertHandler),
  ('/' + LanguageCode + '/encodingRules/', EncodingRules),
], debug=True)
