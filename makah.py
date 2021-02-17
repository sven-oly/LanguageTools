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

Language = 'Makah'
Language_native = 'qʷi·qʷi·diččaq'
LanguageCode = 'myh'
ScriptCode = 'Latn'

encoding_font_list = [
  # {
  #   'font_path': '/fonts/xyz.ttf',
  #   'font_name': 'xyz',
  #   'display_name': 'xyz',
  # },
]

unicode_font_list = [
    {
        'family': 'Noto Sans',
        'longName': 'Noto Sans',
        'source': '/fonts/NotoSans-Regular.ttf',
    },
  {
    'family': 'Noto Serif',
    'longName': 'Noto Serif',
    'source': '/fonts/NotoSerif-Regular.ttf',
  },
]

kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   'reference': 'http://www.languagegeek.com/nwc/keymaps/WakashanCanada/MakahNum.pdf',
   },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Language Geek keyboard',
      'ref': 'http://www.languagegeek.com/nwc/keymaps/WakashanCanada/MakahNum.pdf',
    },
    {'linkText': 'Keyboard conversions',
     'ref': '/' + LanguageCode + '/kbtransforms/'
     },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u'FILL IN'
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.lang_list = [LanguageCode]  # This may be extended
    self.kb_list = kb_list
    self.links = links

    # For additional resources for download
    self.text_file_list = []

    # TODO: Fill in the rest of the common data.

# TODO: Fill in with diacritics
diacritic_list = []
#TODO: Fill in base consonant
default_base_consonant = u'\u1c00'

# Shows keyboards
class IndigenousHomeHandler(webapp2.RequestHandler):
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


kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   },
  {'shortName': 'myh2',
   'longName': 'Makah 2',
   },
]

diacritic_list = [unichr(x) for x in range(0xa926, 0xa92d)]

default_base_consonant = u'\u1c00'

# Shows keyboards
class IndigenousHomeHandler(webapp2.RequestHandler):
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

encodedRanges = [
  (0x20, 0x7b),
]
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


class DiacriticHandler(webapp2.RequestHandler):
  def get(self):
    global default_base_consonant

    # Generate combinations of base + diacritic pairs
    inchars = self.request.get('base', None)
    if not inchars:
      base_consonant = default_base_consonant
    elif inchars[0] == 'u':
      base_consonant = unichr(int(''.join(inchars[1:]), 16))
    else:
      # A unicode character
      base_consonant = inchars

    combos = []
    table = []
    singles = [' ', 'none']
    for y in diacritic_list:
      row = [y + ' (%4x)' %ord(y[0])]
      singles.append(base_consonant + y);
      for x in diacritic_list:
        text = base_consonant + y + x
        combos.append({'text': text,
                       'codes': ['%4x ' % ord(c) for c in text]})
        row.append(text)
      table.append(row)

    template_values = {
        'language': Language,
        'base_char': base_consonant.encode('utf-8'),
        'base_hex': ['%4x' % ord(x) for x in base_consonant],
        'diacritics': [x for x in diacritic_list],
        'diacritics_hex': ['%4x ' % ord(y[0]) for y in diacritic_list],
        'singles': singles,
        'combinations': combos,
        'table': table,
        'unicode_font_list': unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'diacritics.html')
    self.response.out.write(template.render(path, template_values))


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', IndigenousHomeHandler),
  ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', EncodingRules),
  ('/' + LanguageCode + '/diacritic/', DiacriticHandler),
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
], debug=True,
    config={'langInfo': langInstance}
)
