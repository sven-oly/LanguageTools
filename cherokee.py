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

import base

import transliterate
import transrule_chr

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Cherokee'
Language_native = 'ᏣᎳᎩ'
LanguageTag = 'chr'

# Handling Cherokee and other language codes for testing font and conversions.

encoding_font_list = [
    {
      'font_path':'/fonts/Cherokee/CherokeeOLD.ttf',
      'font_name':'Cherokee_Old',
      'display_name': 'Cherokee Old',
    },
]

unicode_font_list = [
    { 'family': 'NotoSansCheronee',
      'longName': 'Noto Sans Cherokee',
      'source': '/fonts/Cherokee/NotoSansCherokee-Regular.ttf'
    },
]

for f in all_cherokee_unicode_fonts:
  unicode_font_list.append(f)

links = [
    {'linkText': 'Keyboard',
     'ref': '/chr/'
    },
    {'linkText': 'Converter',
     'ref': '/chr/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/chr/encodingRules/'
    },
    {'linkText': 'Resources',
      'ref': '/chr/downloads/'
    },
    {'linkText': 'Unicode Cherokee',
      'ref': 'http://unicode.org/charts/PDF/U13A0.pdf'
    },
    {'linkText': 'Unicode Supplement',
     'ref': 'http://unicode.org/charts/PDF/UAB70.pdf'
    },
]


class langInfo:
  def __init__(self):
    self.LanguageCode = 'chr'
    self.Language = 'Cherokee'
    self.Language_native = 'ᏣᎳᎩ'
    self.unicodeChars = [unichr(x) for x in range(0x13a0, 0x13fd)]
    self.unicodeChars.extend([unichr(x) for x in range(0xaa70, 0xabbf)])
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.allFonts = True

    self.kb_list = [
      {'shortName':  'chr',
       'longName': 'Cherokee'
       },
      {'shortName':  'chr_phone',
       'longName': 'Cherokee Phonetic'
       }
    ]
    self.lang_list = ['chr']
    self.links = links

    self.dictionaryLang1 = self.LanguageCode
    self.dictionaryLang2 = 'en'
    self.kb1 = ''
    self.kb2 = ''

    self.dictionaryNData = [
      {'langName': self.Language, 'langNative': '',
       'languageCode': self.LanguageCode,
       'kbShortName': 'chr_phone', 'kbLongName': 'Cherokee Phonetic',
       'font': {'family': self.unicode_font_list[0]['family'],
                'longName': self.unicode_font_list[0]['longName'],
                'source': self.unicode_font_list[0]['source'],
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
       'helptext': 'Instructions',
       },
    ]


# Shows keyboard for Cherokee
class CherokeeIndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'chr',
         'longName': 'Cherokee Unicode'
        },
        {'shortName':  'chr_phone',
         'longName': 'Cherokee Phonetic'
        }
      ]
      template_values = {
        'language': Language,
        'font_list': unicode_font_list,
        'lang_list': None,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'HTML/demo_general.html')
      self.response.out.write(template.render(path, template_values))

# Presents UI for conversions from font encoding to Unicode.
class CherokeeConvertUIHandler(webapp2.RequestHandler):
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
        {'shortName':  'chr',
         'longName': 'Cherokee'
        },
        {'shortName':  'chr_phone',
         'longName': 'Cherokee Phonetic'
        }
      ]

      template_values = {
          'allFonts': True,
          'font': font,
          'language': Language,
          'langTag': 'chr',
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
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
      self.response.out.write(template.render(path, template_values))

# AJAX handler for Cherokee converter
class CherokeeConvertHandler(webapp2.RequestHandler):
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
        'langTag': 'chr',
        'showTools': self.request.get('tools', None),
        'summary' : transCcp.getSummary(),
      }
      self.response.out.write(json.dumps(result))


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

    path = os.path.join(os.path.dirname(__file__), 'HTML/allFonts.html')
    self.response.out.write(template.render(path, template_values))


langInstance = langInfo()

app = webapp2.WSGIApplication(
    [('/chr/', base.LanguagesHomeHandler),
     ('/chr/convertUI/', CherokeeConvertUIHandler),
     ('/chr/downloads/', base.Downloads),
     ('/chr/converter/', CherokeeConvertHandler),
     ('/chr/encodingRules/', base.EncodingRules),
     ('/chr/AllFonts/', AllFontTest ),
     ('/' + langInstance.LanguageCode + '/dictionaryN/', base.DictionaryN),

     ],
    debug=True,
    config={'langInfo': langInstance}
)
