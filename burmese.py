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
#import transrule_chr

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Burmese'
Language_native = 'မြန်မာဘာသာ'
LanguageCode = 'my'

encoding_font_list = [
    {
      'font_path':'/fonts/burmese/ww_burn_.ttf',
      'font_name':'WWBurn',
      'display_name': 'WW Burn',
    },
  {
    'font_path': '/fonts/burmese/WwinBurmese.ttf',
    'font_name': 'WwinBurmese',
    'display_name': 'Wwin Burmese',
  },
]

unicode_font_list = [
  {
    'family': 'NotoSansMyanmar',
    'longName': 'Noto Sans Myanmar',
    'source': '/fonts/NotoSansMyanmar-Regular.ttf',
  }
]


links = [
    {'linkText': 'Converter',
      'ref': '/my/convertUI/'},
    {'linkText': 'Convert to Zawgyi',
      'ref': '/my/convertToZawgyi/'},
    {'linkText': 'Font conversion summary',
      'ref': '/my/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/my/downloads/'
    },
    {'linkText': 'Unicode Myanmar',
      'ref': 'http://unicode.org/charts/PDF/U1000.pdf'
    },
]


# Shows keyboard
class IndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'my',
         'longName': 'Myanmar Unicode'
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
      for i in xrange(0x20, 0x80):
        oldInput += unichr(i)
        oldInput += unichr(0x20) + unichr(0x20)
      for i in xrange(0xa0, 0xaf):
        oldInput += unichr(i)
        oldInput += unichr(0x20) + unichr(0x20)
      for i in xrange(0xb0, 0xf9):
        oldInput += unichr(i)
        oldInput += unichr(0x20) + unichr(0x20)
      for i in xrange(0xb0, 0xf8):
        oldInput += unichr(i)
        oldInput += unichr(0x20) + unichr(0x20)
      oldInput += unichr(0xfb)
      oldInput += unichr(0xff)
      oldInput += unichr(0x152)
      oldInput += unichr(0x153)
      oldInput += unichr(0x160)
      oldInput += unichr(0x161)
      oldInput += unichr(0x192)
      oldInput += unichr(0x2c6)
      oldInput += unichr(0x2013)
      oldInput += unichr(0x2014)
      oldInput += unichr(0x2018)
      oldInput += unichr(0x2019)
      oldInput += unichr(0x201a)
      oldInput += unichr(0x201c)
      oldInput += unichr(0x201d)
      oldInput += unichr(0x201e)
      oldInput += unichr(0x2020)
      oldInput += unichr(0x2021)
      oldInput += unichr(0x2022)
      oldInput += unichr(0x2026)
      oldInput += unichr(0x2030)
      oldInput += unichr(0x2039)
      oldInput += unichr(0x2122)


      unicodeChars = ''
      unicodeCombiningChars = ''
      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language,
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


class ConvertToZawgyiHandler(webapp2.RequestHandler):
  def get(self):

    # All old characters
    oldChars = (u'\u0001 !"\u0023\u0024%&\'()*+,-./' +
                '0123456789:;<=>?@' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ[ \\ ]^_`' +
                'abcdefghijklmnopqrstuvwxyz{|}~')
    text = self.request.get('text', oldChars)
    font = self.request.get('font')
    testStringList = [
      {'name': 'Test 1',  # Note: must escape the single quote.
       'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
                 '\u000a\u000b'},
    ]

    oldInput = u''
    for i in xrange(0x20, 0x80):
      oldInput += unichr(i)
      oldInput += unichr(0x20) + unichr(0x20)
    for i in xrange(0xa0, 0xaf):
      oldInput += unichr(i)
      oldInput += unichr(0x20) + unichr(0x20)
    for i in xrange(0xb0, 0xf9):
      oldInput += unichr(i)
      oldInput += unichr(0x20) + unichr(0x20)

    oldInput += unichr(0xfb)
    oldInput += unichr(0xff)
    oldInput += unichr(0x152)
    oldInput += unichr(0x153)
    oldInput += unichr(0x160)
    oldInput += unichr(0x161)
    oldInput += unichr(0x192)
    oldInput += unichr(0x2c6)
    oldInput += unichr(0x2013)
    oldInput += unichr(0x2014)
    oldInput += unichr(0x2018)
    oldInput += unichr(0x2019)
    oldInput += unichr(0x201a)
    oldInput += unichr(0x201c)
    oldInput += unichr(0x201d)
    oldInput += unichr(0x201e)
    oldInput += unichr(0x2020)
    oldInput += unichr(0x2021)
    oldInput += unichr(0x2022)
    oldInput += unichr(0x2026)
    oldInput += unichr(0x2030)
    oldInput += unichr(0x2039)
    oldInput += unichr(0x2122)

    unicodeChars = ''
    unicodeCombiningChars = ''
    kb_list = [
      {'shortName': LanguageCode,
       'longName': Language,
       }
    ]

    template_values = {
      'font': font,
      'language': Language,
      'langTag': 'myZawgyi',
      'encodingList': encoding_font_list,
      'kb_list': kb_list,
      'unicodeFonts': [{
        'family': 'ZawgyiOne',
        'longName': 'Zawgyi One',
        'source': '/fonts/burmese/ZawgyiOne.ttf',
      }],
      'links': links,
      'oldChars': oldChars,
      'oldInput': oldInput,
      'outputFont': 'Zawgyi',
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

      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language + ' Unicode'
        }
      ]
      template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
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
  ('/demo_my/', IndigenousHomeHandler),
  ('/my/', IndigenousHomeHandler),
  ('/my/convertUI/', ConvertUIHandler),
  ('/my/downloads/', Downloads),
  ('/my/converter/', ConvertHandler),
  ('/my/convertToZawgyi/', ConvertToZawgyiHandler),
  ('/my/encodingRules/', EncodingRules),
], debug=True)
