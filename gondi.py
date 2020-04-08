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

import logging

import os
import sys
import webapp2

from google.appengine.ext.webapp import template

Language = 'gondi'
Language_native = 'Gondi'
LanguageCode = 'gon'

encoding_font_list = [
  {
    'font_path': '/fonts/Gondi/YTJT.otf',
    'font_name': 'YTJT',
    'display_name': 'YTJT Masaram',
  },
]

encoding_font_dict = {
  'gon': encoding_font_list,
  'esg': encoding_font_list,
  'gno': [
    {
    'font_path': '/fonts/Gondi/YTJT.otf',
    'font_name': None,
    'display_name': 'None',
  },],
  'wsg': encoding_font_list,
}
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

unicode_font_dict = {
  'gon': unicode_font_list,
  'esg': [
    {
      'family': 'NotoSansGondiMasaram',
      'longName': 'Noto Sans Masaram',
      'source': '/fonts/Gondi/NotoSansMasaramGondi-Regular.ttf',
    },
  ],
  'gno': [
    {
        'family': 'NotoSansGondiGunjala',
        'longName': 'Noto Sans Gunjala',
        'source': '/fonts/Gondi/NotoSansGunjalaGondi-Regular.ttf',
    },
  ],
  'wsg': unicode_font_list,
}

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

kb_list_dict = {
  'gon': kb_list,
  'esg': [  {'shortName': 'gon_masaram','longName': 'Gondi Masaram' },],
  'gno': [{'shortName': 'gon_gunjala', 'longName': 'Gondi Gonjala'}, ],
  'wsg': [  {'shortName': 'gon_masaram','longName': 'Gondi Masaram' },],
}

lang_name_dict = {
  'gon': "Gondi languages",
  'esg': "Aheri Gondi",
  'gno': "Northern Gondi",
  'wsg': "Adilabad Gondi",
}

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

LanguageCodeStandin = 'xxxx'

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCodeStandin + '/'
    },
    {'linkText': 'Converter',
     'ref': '/' + LanguageCodeStandin + '/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/' + LanguageCodeStandin + '/encodingRules/'
    },
    {'linkText': 'Dictionary entry',
   'ref': '/' + LanguageCodeStandin + '/dictionaryInput/'
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
     'ref': '/' + LanguageCodeStandin + '/diacritic/'
     },
]

def fixLinks(link_template, langCode):
  new_links = []
  for link in links:
    new_link = {
      'linkText': link['linkText'],
      'ref': link['ref'].replace(LanguageCodeStandin, langCode)
    }
    new_links.append(new_link)
  return new_links

class langInfo():
  def __init__(self):
    self.LanguageCode = 'gon'
    self.Language = u'Gondi'
    self.Language_native = u'Gondi'
    self.direction = 'ltr'

    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0xe600, 0xe8)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(0xd81a) + unichr(0xde00 + x) for x in range(0xf0, 0xf5)]

    self.base_consonant = u'𞠀'
    self.baseHexUTF16 = u'\ud81a\udee7'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = kb_list

    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    self.dictionaryLang1 = 'gon'
    self.dictionaryLang2 = 'en'
    self.kb1 = ''
    self.kb2 = ''

    self.dictionaryNData = [
      {'langName': 'Aheri Gondi', 'langNative': 'Aheri Gondi',
       'languageCode': 'esg',
        'kbShortName': 'gon_masaram', 'kbLongName': 'Gondi Masaram',
        'font': { 'family': 'GondiMasaram',
          'longName': 'Gondi Masaram',
          'source': '/fonts/Gondi/NotoSansMasaramGondi-Regular.ttf'},
        'direction': 'ltr',
      },
      {'langName': 'Northern Gondi', 'langNative': 'Northern Gondi',
       'languageCode': 'gnw',
       'kbShortName': 'gon_gunjala', 'kbLongName': 'Gondi Gunjala',
       'font': {'family': 'GondiGunjala',
                'longName': 'Gondi Gunjala',
                'source': '/fonts/Gondi/NotoSansGunjalaGondi-Regular.ttf'},
       'direction': 'ltr',
       },
      {'langName': 'Gondi Devanagari', 'langNative': 'Gondi Devanagari',
       'languageCode': 'gon_Deva',
       'kbShortName': 'gon_deva', 'kbLongName': 'Gondi Devanagari',
       'font': {'family': 'GondiDeva',
                'longName': 'Gondi Devanagari',
                'source': '/fonts/Gondi/NotoSansGunjalaGondi-Regular.ttf'},
       'direction': 'ltr',
       },
      {'langName': 'Gondi Telugu', 'langNative': 'Gondi Telugu',
       'languageCode': 'gon_Telu',
       'kbShortName': 'gon_telu', 'kbLongName': 'Gondi Telugu',
       'font': {'family': 'GondiTelugu',
                'longName': 'Gondi Telugu',
                'source': '/fonts/Gondi/NotoSansGunjalaGondi-Regular.ttf'},
       'direction': 'ltr',
       },
      {'langName': 'English', 'langNative': 'English',
       'languageCode': 'en',
       'kbShortName': 'en', 'kbLongName': 'English',
        'font': {'family': 'Latin',
                'longName': 'Noto Sans',
                'source': '/fonts/NotoSans-Regular.ttf'
                },
        'direction': 'ltr',
        'helptext': 'Instructions'
      },
    ]


# Shows keyboards
class IndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):
      req = webapp2.get_request()
      top_path = req.path.split('/')
      lang_code = top_path[1]
      template_values = {
        'language': lang_name_dict[lang_code],
        'langTag': lang_code,
        'font_list': unicode_font_dict[lang_code],
        'lang_list': None,
        'kb_list': kb_list_dict[lang_code],
        'links': fixLinks(links, lang_code),
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))

diacritic_lists = {
  'gno': [u'\U00011D8A', u'\U00011D8B', u'\U00011D8C', u'\U00011D8D', u'\U00011D8E',
          u'\U00011D90', u'\U00011D91', u'\U00011D93', u'\U00011D94', u'\U00011D95',
          u'\U00011D96', u'\U00011D97', u'\U00011D90'
          ],
  'esg': [u'\U00011D3A', u'\U00011D3c', u'\U00101D3d', u'\U00011D3f', u'\U00011D40',
          u'\U00011D41', u'\U00011D42', u'\U00011D43', u'\U00011D44', u'\U00011D45',
          u'\U00011D46', u'\U00011D47', u'\U00011D48'],
  'gon': [],
  'wsg': []
}

default_base_consonant = {
  'gon': u'\U00011D00',
  'gno': u'\U00011D60',
  'esg': u'\U00011D00',
  'wsg': u'\U00011D60'
}

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

      req = webapp2.get_request()
      top_path = req.path.split('/')
      lang_code = top_path[1]

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

      new_links = []
      template_values = {
        'font': font,
        'language': lang_name_dict[lang_code],
        'langTag': lang_code,
          'encodingList': encoding_font_dict[lang_code],
          'encoding': encoding_font_dict[lang_code][0],
          'kb_list': kb_list_dict[lang_code],
          'unicodeFonts': unicode_font_dict[lang_code],
          'links': fixLinks(links, lang_code),
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
      req = webapp2.get_request()
      top_path = req.path.split('/')
      lang_code = top_path[1]

      template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
        'language': lang_name_dict[lang_code],
        'langTag': lang_code,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': fixLinks(links, lang_code),
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
        'links': fixLinks(links, lang_code),
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

    req = webapp2.get_request()
    top_path = req.path.split('/')
    lang_code = top_path[1]

    # Generate combinations of base + diacritic pairs
    inchars = self.request.get('base', None)
    if not inchars:
      base_consonant = default_base_consonant[lang_code]
    elif inchars[0] == 'u':
      base_consonant = unichr(int(''.join(inchars[1:]), 16))
    else:
      # A unicode character
      base_consonant = inchars

    combos = []
    table = []
    singles = [' ', 'none']
    for y in diacritic_lists[lang_code]:
      row = [y + ' (%4x)' %ord(y[0])]
      singles.append(base_consonant + y);
      for x in diacritic_lists[lang_code]:
        text = base_consonant + y + x
        combos.append({'text': text,
                       'codes': ['%4x ' % ord(c) for c in text]})
        row.append(text)
      table.append(row)

    template_values = {
        'language': Language,
        'base_char': base_consonant.encode('utf-8'),
        'base_hex': ['%4x' % ord(x) for x in base_consonant],
        'diacritics': [x for x in diacritic_lists[lang_code]],
        'diacritics_hex': ['%4x ' % ord(y[0]) for y in diacritic_lists[lang_code]],
        'singles': singles,
        'combinations': combos,
        'table': table,
        'unicode_font_list': unicode_font_dict[lang_code],
    }
    path = os.path.join(os.path.dirname(__file__), 'diacritics.html')
    self.response.out.write(template.render(path, template_values))

class DictionaryInput(webapp2.RequestHandler):
    def get(self):
      req = webapp2.get_request()
      top_path = req.path.split('/')
      lang_code = top_path[1]

      # user_info = getUserInfo(self.request.url)

      oldOsageInput = self.request.get("text", "")
      unicodeInput = self.request.get("utext", "")
      latinInput = self.request.get("latintext", "")

      template_values = {
        'lang': Language,
        'lang1': "English",
        'lang2': lang_name_dict[lang_code],
        'kb1': 'en',
        'kb2': kb_list_dict[lang_code][0]['shortName'],
        'unicodeFontList': unicode_font_dict[lang_code],
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'dictionaryInput.html')
      self.response.out.write(template.render(path, template_values))

# Declare the communications with the base class.
langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + 'esg' + '/', IndigenousHomeHandler),
  ('/' + 'gno' + '/', IndigenousHomeHandler),
  ('/' + 'wsg' + '/', IndigenousHomeHandler),
  ('/' + LanguageCode + '/', IndigenousHomeHandler),

  ('/' + 'esg' + '/convertUI/', ConvertUIHandler),
  ('/' + 'gno' + '/convertUI/', ConvertUIHandler),
  ('/' + 'wsg'+ '/convertUI/', ConvertUIHandler),
  ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', Downloads),

  ('/' + 'gon' + '/dictionaryInput/', DictionaryInput),
  ('/' + 'esg' + '/dictionaryInput/', DictionaryInput),
  ('/' + 'gno' + '/dictionaryInput/', DictionaryInput),
  ('/' + 'wsg' + '/dictionaryInput/', DictionaryInput),

  ('/' + 'esg' + '/encodingRules/', EncodingRules),
  ('/' + 'gno' + '/encodingRules/', EncodingRules),
  ('/' + 'wsg' + '/encodingRules/', EncodingRules),
  ('/' + LanguageCode + '/encodingRules/', EncodingRules),

  ('/' + 'esg' + '/diacritic/', DiacriticHandler),
  ('/' + 'gno' + '/diacritic/', DiacriticHandler),
  ('/' + 'wsg' + '/diacritic/', DiacriticHandler),
  ('/' + LanguageCode + '/diacritic/', DiacriticHandler),
  ('/' + langInstance.LanguageCode + '/dictionaryN/', base.DictionaryN),
], debug=True,
    config={'langInfo': langInstance}
)
