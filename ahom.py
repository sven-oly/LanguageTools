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

from main import LanguageList
#import translit
import transliterate
# import transrule_chr

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Tai Ahom'
Language_native = 'Name of language'

encoding_font_list = [
  { 'font_name': 'AhomFont',
    'display_name': 'Ahom',
    'font_path': '/fonts/ahom_aiton/AHOMFONT.ttf',
  },
  {
    'font_path':'/fonts/ahom_aiton/Ahom_Manuscript.ttf',
    'font_name':'AhomManuscript',
    'display_name': 'Ahom Manuscript',
  },
  {
    'font_path': '/fonts/ahom_aiton/AITON.TTF',
    'font_name': 'Aiton',
    'display_name': 'Aiton',
  },
  {
    'font_path': '/fonts/ahom_aiton/PHAKE.TTF',
    'font_name': 'Phake',
    'display_name': 'Phake',
  },
  {
    'font_path': '/fonts/ahom_aiton/PHAKERAM.TTF',
    'font_name': 'Phakeram',
    'display_name': 'Phake Ram',
  },
]

unicode_font_list = [
  { 'family': 'Ahom Unicode',
    'longName': 'Ahom Unicode',
    'source': '/fonts/ahom_aiton/AHOMFONT_Unicode.TTF',
  },
  {
    'source': '/fonts/ahom_aiton/AitonUni.gr_2.ttf',
    'family': 'AitonUni',
    'longName': 'Aiton Uni',
  },
  {
    'source': '/fonts/ahom_aiton/Aitongr.ttf',
    'family': 'Aitongr',
    'longName': 'Aiton Gr',
  },
  {
    'source': '/fonts/ahom_aiton/PHAKERAM.TTF',
    'family': 'Phakeram',
    'longName': 'Phake Ram',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/aho/'
    },
    {'linkText': 'Converter',
     'ref': '/aho/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/aho/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/aho/downloads/'
    },
    {'linkText': 'Unicode Ahom',
    'ref': 'http://unicode.org/charts/PDF/U11700.pdf'
    },
    {'linkText': 'Unicode Aiton',
     'ref': 'http://unicode.org/charts/PDF/UAA60.pdf'
     },
    {'linkText': 'Unicode Tai Laing',
     'ref': 'http://unicode.org/charts/PDF/UA9E0.pdf'
     },
]


# Shows keyboard for
class LanguagesHomeHandler(webapp2.RequestHandler):
    def get(self):
      font_list = [
        { 'family': 'AHOMFONT_Unicode',
          'longName': 'AHOMFONT Unicode',
          'source': '/fonts/ahom_aiton/AHOMFONT_Unicode.ttf',
        },
        { 'family': 'AHOMFONT',
          'longName': 'AHOM FONT',
          'source': '/fonts/ahom_aiton/AHOMFONT.ttf',
        },
        { 'family': 'AhomUnicode',
          'longName': 'Ahom Unicode',
          'source': '/fonts/ahom_aiton/AhomUnicode.ttf',
        },
        { 'family': 'Ahom_Manuscript',
          'longName': 'Ahom Manuscript',
          'source': '/fonts/ahom_aiton/Ahom_Manuscript.ttf',
        },
        { 'family': 'NotoSansMyanmar',
          'longName': 'NotoSansMyanmar',
          'source': '/fonts/NotoSansMyanmar-Regular.otf',
        },
      ]
      lang_list = [
        {'shortName':  'aho',
         'longName': 'Tai Ahom'
        },
        {'shortName':  'aio',
         'longName': 'Aiton'
        },
        {'shortName':  'kht',
         'longName': 'Khamti'
        },
        {'shortName':  'phk',
         'longName': 'Phake'
        },
        {'shortName':  'shn',
         'longName': 'Shan'
        },
        {'shortName':  'ksw',
         'longName': 'S\'gaw Karen'
        },
      ]
      links = [
          {'linkText': 'Keyboard',
           'ref': '/aho/'
          },
          {'linkText': 'Converter',
           'ref': '/aho/convertUI/'},
          {'linkText': 'Font conversion summary',
           'ref': '/aho/encodingRules/'
          },
          {'linkText': 'Resources',
           'ref': '/aho/downloads/'
          },
        {'linkText': 'Ahom Unicode',
         'ref': 'http://www.unicode.org/charts/PDF/U11700.pdf'
        },
        {'linkText': 'Aiton and Khamti Shan Unicode. Extended-A',
         'ref': 'http://www.unicode.org/charts/PDF/UAA60.pdf'
        },
        {'linkText': 'Myanmar Extended-B',
         'ref': 'http://www.unicode.org/charts/PDF/UA9E0.pdf'
        },
        {'linkText': 'Myanmar Unicode block',
         'ref': 'https://en.wikipedia.org/wiki/Myanmar_(Unicode_block)'
        },
      ]
      template_values = {
        'langlist': LanguageList,
        'language': 'Ahom',
        'font_list': font_list,
        'lang_list': lang_list,
        'kb_list': lang_list,
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
      for i in xrange(0x23, 0xf1):
        oldInput += unichr(i)

      unicodeChars = '\ud804\udd00'
      unicodeChars += '\ud804\udd03'
      unicodeChars += '\ud804\udd04'
      unicodeChars += '\ud804\udd05'
      unicodeChars += '\ud804\udd06'

      unicodeCombiningChars = chakmaCombiningCombos(u'\ud804\udd07')
      kb_list = [
        {'shortName':  'aho',
         'longName': ''
        }
      ]

      template_values = {
          'font': font,
          'language': Language,
          'langTag': 'aho',
          'encodingList': encoding_font_list,

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

# AJAX handler for  converter
class ConvertHandler(webapp2.RequestHandler):
    def get(self):
      # TODO: Get the text values
      # Call transliterator
      # Return JSON structure with values.

      transCcp = transliterate.Transliterate(
        transrule_aho.TRANS_LIT_RULES,
        transrule_aho.DESCRIPTION
      )

      outText = '\u11103\u11101\u11103'
      message = 'TBD'
      error = ''

      result = {
        'outText' : outText,
        'message' : message,
        'error': error,
        'language': Language,
        'langTag': 'aho',
        'showTools': self.request.get('tools', None),
        'summary' : transCcp.getSummary(),
      }
      self.response.out.write(json.dumps(result))


class EncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'aho',
         'longName': ' Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/ahoConverter.js",
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
        {'shortName':  'aho',
         'longName': ' Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/ahoConverter.js",
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
    ('/tai/', LanguagesHomeHandler),
    ('/demo_tai/', LanguagesHomeHandler),
    ('/aho/', LanguagesHomeHandler),
    ('/demo_aho/', LanguagesHomeHandler),
    ('/aho/convertUI/', ConvertUIHandler),
    ('/aho/downloads/', Downloads),
    ('/aho/converter/', ConvertHandler),
    ('/aho/encodingRules/', EncodingRules),
], debug=True)
