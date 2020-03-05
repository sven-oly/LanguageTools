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

from google.appengine.ext.webapp import template

Language = 'gondi'
Language_native = '???ᰶ'
LanguageCode = 'gon'

encoding_font_list = [
  {
    'font_path': '/fonts/Gondi/YTJT.otf',
    'font_name': 'YTJT',
    'display_name': 'YTJT Masaram',
  },
]

unicode_font_list = [
    {
        'family': 'NotoSansGondiGunjala',
        'longName': 'Noto Sans Gunjala',
        'source': '/fonts/Gondi/NotoSansGunjalaGondi-Regular.ttf',
    },
  {
    'family': 'NotoSansGondiMasaram',
    'longName': 'Noto Sans Masaram',
    'source': '/fonts/Gondi/NotoSansMasaramGondi-Regular.ttf',
  },
]

kb_list = [
  {'shortName': LanguageCode + '_gunjala',
   'longName': 'Gondi Gunjala',
   },
  {'shortName': 'gon_masaram',
   'longName': 'Gondi Masaram',
   },
  {'shortName': 'gon_dev',
   'longName': 'Gondi Devanagari',
   },
  {'shortName': 'gon_telu',
   'longName': 'Gondi Telugu',
   },
]

kb_dev = """
१234567890-
तञॆरटयुइऒपद[\
असडऽगहजकल;'
श्चवबनम,।/

~!@#$%ॠ&*()ॡ+
थङेऋठैऊईओफध]ऌ
आँढ़घःझखळ:"
ष्‍छौभणं<>?
"""

kb_tel = """
౧234567890-
తఞెరటయుఇఒపద]\
అసడఽగహజకల;'
శ్చవబనమ,./

~!@#$%༹༹*()ౡ+
థྺྺཱེཪཊྻྻཱུཨཱིཨཱོఫధ}ఌ
ཨཱཱཥཌFఘఃఝఖళ:"
ష్‍ఛౌభཎཾ<>?྅
"""

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
    {'linkText': 'Gunjala Unicode',
     'ref': 'https://www.unicode.org/charts/PDF/U11D60.pdf'
    },
    {'linkText': 'Masaram Unicode',
     'ref': 'https://www.unicode.org/charts/PDF/U11D00.pdf'
   },
   {'linkText': 'Gondi Gunjala wiki',
     'ref': 'https://en.wikipedia.org/wiki/Gunjala_Gondi_Lipi'
    },
    {
      'linkText': 'Gondi Masaram wiki',
      'ref': 'https://en.wikipedia.org/wiki/Gondi_writing'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Gondi_language'
    },
    {'linkText': 'Combiners',
     'ref': '/gon/diacritic/'
     },
]

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

diacritic_list = [] # [unichr(x) for x in range(0x11D8A, 0x11D97)]

default_base_consonant = u'\0x11D60'

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
    (0x20, 0x7f), (0x90, 0x91), (0xa2, 0xa4),
    (0xa8, 0xac), (0xae, 0xaf), (0xb2, 0xb5), 0xb6, 0xb8,
    (0xba, 0xc2), (0xc3, 0xd0), (0xd1, 0xd5), 0xd6,
    (0xd8, 0xf2), 0xf3, (0xf6, 0xfa),
    0x152, 0x160, 0x192, 0x2c6, 0x2dc, 0x95c,
    0x2010, (0x2013, 0x2015), 0x2018, 0x2019,
    (0x2020, 0x2022), 0x2026, 0x2030, 0x2039,
]
# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldCharList = []
      for run in encodedRanges:
        print(run)
        if type(run) is int:
          oldCharList.extend(unichr(run) + ' ')
        else:
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
      path = os.path.join(os.path.dirname(__file__), 'translit_general.html')
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


class Downloads(webapp2.RequestHandler):
    def get(self):

      template_values = {
          'language': Language,
          'language_native': Language_native,
          'unicode_font_list': unicode_font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'downloads.html')
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


app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', IndigenousHomeHandler),
  ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', Downloads),
  ('/' + LanguageCode + '/encodingRules/', EncodingRules),
  ('/' + LanguageCode + '/diacritic/', DiacriticHandler),
], debug=True)
