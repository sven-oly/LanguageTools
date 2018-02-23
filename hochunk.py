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

# from allCherokeeFonts import all_cherokee_unicode_fonts

#import translit
import transliterate
import transrule_chr

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Hoocąk'
Language_native = 'Hoocąk'
LanguageTag = 'win'

encoding_font_list = [
    {
      'font_path':'/fonts/Cherokee/CherokeeOLD.ttf',
      'font_name':'Cherokee_Old',
      'display_name': 'Cherokee Old',
    },
]

unicode_font_list = [
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/win/'
    },
    {'linkText': 'Converter',
     'ref': '/win/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/win/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/win/downloads/'
    },
    {'linkText': 'Hoocąk language',
      'ref': 'https://en.wikipedia.org/wiki/Winnebago_language#Orthography',
    },
    {'linkText': 'hoocak.org',
      'ref': 'https://www.hoocak.org/',
    },
    {'linkText': 'Martindale Center',
      'ref': 'http://www.martindalecenter.com/Language_1_Indigenous.html#ENGTO-HO-CHUNK',
    },
]


# Shows keyboard for Hoocak
class IndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName': 'win_latn',
         'longName': Language + " Latin",
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
      for i in xrange(0x20, 0x3e):
        oldInput += unichr(i)
      for i in xrange(0x40, 0x7f):
        oldInput += unichr(i)
      oldInput += unichr(0x000a)
      for i in xrange(0xf020, 0xf03e):
        oldInput += unichr(i)
      for i in xrange(0xf040, 0xf07f):
        oldInput += unichr(i)

      unicodeChars = ''
      unicodeCombiningChars = ''
      kb_list = [
        {'shortName':  LanguageTag,
         'longName': Language,
        }
      ]

      template_values = {
          'allFonts': True,
          'font': font,
          'language': Language,
          'langTag': LanguageTag,
          'encodingList': encoding_font_list,
          'encoding': {
              'font_path':'/fonts/Cherokee/CherokeeOLD.ttf',
              'font_name':'Cherokee_Old',
              'display_name': 'Cherokee Old',
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
        'langTag': LanguageTag,
        'showTools': self.request.get('tools', None),
        'summary' : transCcp.getSummary(),
      }
      self.response.out.write(json.dumps(result))


class EncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageTag,
         'longName': Language,
        }
      ]
      template_values = {
        'converterJS': "/js/winConverter.js",
        'language': Language,
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
        {'shortName':  LanguageTag,
         'longName': Language,
        }
      ]
      template_values = {
        'converterJS': "/js/winConverter.js",
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


class AllFontTest(webapp2.RequestHandler):
  def get(self):
    utext = self.request.get("utext", "")
    encodedText = self.request.get("encodedText", "")
    logging.info('AllFontTest utext =>%s<' % utext)
    template_values = {
      'scriptName': Language,
      'fontFamilies': all_cherokee_unicode_fonts,
      'encodedText': encodedText,
      'utext': utext,
      'language': Language,
      'LanguageTag': LanguageTag
    }

    path = os.path.join(os.path.dirname(__file__), 'allFonts.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
  ('/demo_win/', IndigenousHomeHandler),
  ('/win/', IndigenousHomeHandler),
  ('/win/convertUI/', ConvertUIHandler),
  ('/win/downloads/', Downloads),
  ('/win/converter/', ConvertHandler),
  ('/win/encodingRules/', EncodingRules),
  ('/chr/AllFonts/', AllFontTest )
], debug=True)
