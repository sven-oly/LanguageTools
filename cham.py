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

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Cham'
Language_native = 'Cham language'
LanguageCode = 'cja'

encoding_font_list = [
  {
    'font_path': '/fonts/Cham/JG ChamCambodia.ttf',
    'font_name': 'JGChamCambodia',
    'display_name': 'JG Cham Cambodia',
    'source': 'http://glavyfonts.com/asian.html',
    'note': 'Font by Jason Glavy',
  },
  {
    'font_path': '/fonts/Cham/EFEOPanrang.ttf',
    'font_name': 'EFEOPanrang',
    'display_name': 'EFEO Panrang',
  },

  {
    'font_path': '/fonts/Cham/JG ChamVN.ttf',
    'font_name': 'JGChamVN',
    'display_name': 'JG ChamVN',
  },
  {
    'font_path': '/fonts/Cham/EFEOParik.ttf',
    'font_name': 'EFEOParik',
    'display_name': 'EFEO Parik',
  },
  {
    'font_path': '/fonts/Cham/EFEOUdong.ttf',
    'font_name': 'EFEOUdong',
    'display_name': 'EFEO Udong',
  },
]

unicode_font_list = [
    {
        'family': 'NotoSansCham',
        'longName': 'Noto Sans Cham',
        'source': '/fonts/Cham/NotoSansCham-Regular.ttf',
    },
    {
      'family': 'EFEOCamThrahTimes',
      'longName': 'EFEO Cam Thrah Times',
      'source': '/fonts/Cham/EFEO Cam Thrah Times.otf',
    },
    {
      'family': 'ChamOI_Kulbleng',
      'longName': 'Cham OI Kulbleng',
      'source': '/fonts/Cham/Cham OI_Kulbleng.ttf',
    },
  {
    'family': 'ChamOI_Tangin',
    'longName': 'Cham OI_Tangin',
    'source': '/fonts/Cham/Cham OI_Tangin.ttf',
  },
]

# Cham keyboard onlines: https://kauthara.org/article/110
# Scriptsource: https://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=ghh7f6svl9
# https://kauthara.org/keyboard  # Good for keyboard positions.
kb_list = [
  {'shortName': 'cja',
   'longName': 'Eastern Cham',
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
     'ref': 'https://www.unicode.org/charts/PDF/UAA00.pdf'
    },
    {'linkText': 'Cham script',
     'ref': 'https://en.wikipedia.org/wiki/Cham_alphabet'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Cham_language'
    },
    {'linkText': 'Ethnolog',
     'ref': 'https://www.ethnologue.com/language/cja'
    },
    {'linkText': 'Combiners',
     'ref': '/cja/diacritic/'
     },
    {'linkText': "kauthara.org",
     'ref': 'https://kauthara.org/'}
]


codepoint_list = [unichr(x) for x in range(0xaa00, 0xaa5f)]

diacritic_list = [unichr(x) for x in range(0xaa29, 0xaa37)] + \
  [unichr(x) for x in range(0xaa43, 0xaa44)] + \
  [unichr(x) for x in range(0xaa4c, 0xaa4e)]
default_base_consonant = u'\uaa06'

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.lang_list = [LanguageCode]
    self.kb_list = kb_list
    self.links = links

    self.text_file_list = []


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldCharList = [unichr(x) + ' ' for x in xrange(0x20, 0x7e)]
      oldChars = ''.join(oldCharList)
      text = self.request.get('text', oldChars)
      font = self.request.get('font')
      testStringList = [
          {'name': 'Test 1', # Note: must escape the single quote.
           'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
           '\u000a\u000b'},
      ]

      oldInput = text

      unicodeChars = [unichr(x) for x in xrange(0xaa2, 0xaa37)]
      combineList = [unichr(x) for x in xrange(0xaa2, 0xaa37)]
      combineList = [unichr(x) for x in xrange(0xa43, 0xaa44)]
      combineList = [unichr(x) for x in xrange(0xa4c, 0xaa4d)]
      unicodeCombiningChars = ' '.join(diacritic_list)
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
          'unicodeChars': ' '.join(codepoint_list),
          'combiningChars': unicodeCombiningChars,
          'showNormalize': True,
      }
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
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
    path = os.path.join(os.path.dirname(__file__), 'HTML/diacritics.html')
    self.response.out.write(template.render(path, template_values))

langInstance = langInfo()

app = webapp2.WSGIApplication([
    ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/', ConvertUIHandler),
    ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
    ('/' + LanguageCode + '/diacritic/', DiacriticHandler),
  ],
  debug=True,
  config = {'langInfo': langInstance}
)

