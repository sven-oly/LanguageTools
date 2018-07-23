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
import transliterate

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

# A base class for handling the general things needed in a language.
class languageTemplate():
  LanguageCode = 'base'
  Language = 'General'
  Language_native = 'Name of language'

  encoding_font_list = [
      { 'font_name': Language + 'Font',
        'display_name': Language,
        'font_path': '/fonts/',
      },
  ]

  unicode_font_list = [
      {
          'source': '/fonts/NotoSans-Regular.ttf',
          'family': 'NotoSans',
          'longName': 'Noto Sans',
      },
  ]

  lang_list = []
  links = [
      {'linkText': 'Keyboard',
       'ref': '/aho/'
      },
      {'linkText': 'Converter',
       'ref': LanguageCode + '/converter/'},
      {'linkText': 'Font conversion summary',
       'ref': LanguageCode + 'encodingRules/'
      },
      {'linkText': 'Resources',
       'ref': LanguageCode + '/downloads/'
      },
  ]

  text_file_list = [
  ]

  baseHexUTF16 = u''

  def __init__(self):
    return


  # Shows keyboards for Language
  class LanguagesHomeHandler(webapp2.RequestHandler):
    def get(self):
      lang_list = [
          {'shortName':  'tst',
           'longName': 'Testing'
          },
      ]

      template_values = {
        'langlist': LanguageList,
        'language': languageTemplate.Language,
        'font_list': languageTemplate.unicode_font_list,
        'lang_list': languageTemplate.lang_list,
        'kb_list': languageTemplate.lang_list,
        'links': languageTemplate.links,
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

      unicodeCombiningChars = getCombiningCombos(baseHexUTF16)
      kb_list = [
        {'shortName':  'aho',
         'longName': ''
        }
      ]

      template_values = {
          'font': font,
          'language': Language,
          'langTag': LanguageCode,
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

      transliterator = transliterate.Transliterate(
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
        'langTag': LanguageCode,
        'showTools': self.request.get('tools', None),
        'summary' : transliterator.getSummary(),
      }
      self.response.out.write(json.dumps(result))


  class EncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language
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
      path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
      self.response.out.write(template.render(path, template_values))

  class RenderPage(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  languageTemplate.LanguageCode,
         'longName': languageTemplate.Language + ' Unicode',
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
          'language': languageTemplate.Language,
          'language_native': languageTemplate.Language_native,
          'unicode_font_list': unicode_font_list,
          'file_list': text_file_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'downloads.html')
      self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
    ('/' + languageTemplate.LanguageCode + '/',
     languageTemplate.LanguagesHomeHandler),
    ('/' + languageTemplate.LanguageCode + '/downloads/',
     languageTemplate.Downloads),
    ('/' + languageTemplate.LanguageCode + '/converter/',
     languageTemplate.ConvertHandler),
    ('/' + languageTemplate.LanguageCode + '/downloads/',
     languageTemplate.Downloads),
    ('/' + languageTemplate.LanguageCode + '/encodingRules/',
     languageTemplate.EncodingRules),
], debug=True)
