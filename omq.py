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

import transliterate

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Chatino'
Language_native = 'Chatino'
LanguageCode = 'omq'

encoding_font_list = [
  {
  },
]

unicode_font_list = [
  {'family': 'GentiumUnicode2020',
   'longName': 'Gentium Unicode 2020',
   'source': '/fonts/Chatino/GentiumUnicode2020.ttf',
   'provider': 'Kirk Miller, 3-Feb-2021',
   'ref': 'https://www.unicode.org/Public/14.0.0/ucd/UnicodeData-14.0.0d4.txt',
   },
  {'family': 'NotoSans',
   'longName': 'Noto Sans',
   'source': '/fonts/NotoSans-Regular.ttf',
   },
  {'family': 'Noto Serif',
   'longName': 'Noto Serif',
   },
  #{'family': 'Roboto',
  # 'longName': 'Roboto',
  # 'source': 'https://fonts.googleapis.com/css?family=Roboto',
  # },
]

kb_list = [
  {
    'shortName': 'omq_accents',
    'longName': 'Acentos fonéticos otomangues, teclado español',
    'instructions':
      ' Tone marks on digits. Numerals on CapsLock'
  },
  {
    'shortName': 'omq7',
    'longName': 'Chatino Unicode super A-W',
    'instructions':
      ' Tones on digits and shift-digits. Q and S not yet standardized. Numerals on CapsLock'
  },
  {
    'shortName': 'omq6',
    'longName': 'Chatino Unicode 14.0',
    'instructions':
      ' \u00a0'
  },
  {
        'shortName': 'omq2',
        'longName': 'Chatino alpha digits',
        'instructions':
        ' \u00a0'
    },
  {
    'shortName': 'omq4',
    'longName': 'Chatino alpha upper digits',
    'instructions':
      ' \u00a0'
  },
  {
    'shortName': 'omq3',
    'longName': 'Chatino small alpha diacritics',
    'instructions':
      ' \u00a0'
  },
  {
    'shortName': 'omq5',
    'longName': 'Chatino deadkey',
    'instructions':
      ' \u00a0'
  },
  {
    'shortName': 'omq',
    'longName': 'Chatino trial 1',
    'instructions':
      ' \u00a0'
  },
]


links = [
    # {'linkText': 'Keyboard',
    #  'ref': '/' + LanguageCode + '/'
    # },
    #{'linkText': 'Converter',
    # 'ref': '/' + LanguageCode + '/convertUI/'},
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
  {'linkText': 'Chatino',
    'ref': 'https://en.wikipedia.org/wiki/Chatino_language'
  },
  {'linkText': 'Simple dictionary entry',
   'ref': '/' + LanguageCode + '/dictionaryInput/'
   },
  {'linkText': 'Chatino-English dictionary builder',
   'ref': '/' + LanguageCode + '/dictionaryN/'
   },
  {'linkText': 'Resources & Downloads',
   'ref': '/' + LanguageCode + '/downloads/'
   },
]


class langInfo():
  def __init__(self):
    self.LanguageCode = 'omq'
    self.Language = 'Chatino'
    self.Language_native = 'Onʌyoteʔa·ká'

    self.info_text = {
      'title': 'Chatino with superscript tones',
      'text': 'News: Uppercase tones for C and F will be in Unicode 14.0',
      'source': 'https://www.unicode.org/Public/14.0.0/ucd/UnicodeData-14.0.0d4.txt',
    }
    self.lang_list = [
      {'shortName':  'omq',
       'longName': 'Chation',
       },
    ]
    # Update this!
    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0x11100, 0x11103)]
      self.diacritic_list.extend([unichr(x) for x in range(0x11127, 0x11133)])
      self.diacritic_list.extend([unichr(x) for x in range(0x11134, 0x11135)])
      self.diacritic_list.extend([unichr(x) for x in range(0x11145, 0x11147)])
      self.base_consonant = unichr(0x1110e)
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x00, 0x04)]
      self.diacritic_list.extend(unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x27, 0x33))
      self.diacritic_list.extend(unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x34, 0x35))
      self.diacritic_list.extend(unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x45, 0x47))
      self.base_consonant = u'\ud804\udd0e'

    self.encoding_font_list = encoding_font_list

    self.kb_list = kb_list
    self.links = links

    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    resource_list = [
      {
        'name': 'KeyMan 1.1 for Chatino',
        'source': '/resources/omq/chatino1.1.kmp',
        'description': 'Keyboard for Mobile & Desktop with superscripts A-W',
        'instructions': '',
      },
      {
        'name': 'KeyMan for Chatino',
        'source': '/resources/omq/chatino.kmp',
        'description': 'Keyboard for Mobile & Desktop',
        'instructions': '',
      },
    ]
    self.text_file_list = resource_list

    # For dictionary
    self.dictionaryLang1 = "English"
    self.dictionaryLang2 = self.Language
    self.kb1 = 'es'
    self.kb2 = self.kb_list[0]['shortName']

    self.dictionaryNData = [
      {'langName': self.Language, 'langNative': '',
       'languageCode': self.LanguageCode,
        'kbShortName': self.kb_list[0]['shortName'], 'kbLongName': self.Language,
        'font': { 'family': self.unicode_font_list[0]['family'],
          'longName': self.unicode_font_list[0]['longName'],
          'source':self.unicode_font_list[0]['source'],
                  },
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


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldChars = (u'' +
                  '0123456789:;<=>?@' +
                  '!@#$%^&*()_+' +
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
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
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


# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
  [
    ('/demo_' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/converter/', ConvertHandler),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
    ('/' + LanguageCode + '/dictionaryInput/', base.DictionaryInput),
    ('/' + langInstance.LanguageCode + '/dictionaryN/', base.DictionaryN),
  ],
  debug=True,
  config={'langInfo': langInstance}
)
