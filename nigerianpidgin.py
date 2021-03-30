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
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Naijíriá Píjin'
Language_native = 'Naijíriá Píjin'
LanguageCode = 'pcm'

encoding_font_list = [
]

unicode_font_list = [
  {
      'source': '/fonts/NotoSans-Regular.ttf',
      'family':  'NotoSans-Regular',
      'longName':  'Noto Sans',
  },
  {
      'source': '/fonts/NotoSerif-Regular.ttf',
      'family':  'NotoSerif-Regular',
      'longName':  'Noto Serif',
  },
  {
      'source': '/fonts/yoruba/NotoSans-Regular.ttf',
      'family':  'Noto fonts NotoSans-Regular',
      'longName':  'Noto fonts NotoSans-Regular',
  },
  {
      'source': '/fonts/yoruba/Roboto-Light.ttf',
      'family': 'Roboto-Light',
      'longName': 'Roboto Light'
  },
  {
      'source': '/fonts/yoruba/Roboto-BlackItalic.ttf',
      'family': 'Roboto-BlackItalic',
      'longName': 'Roboto BlackItalic'
  },
  {
      'source': '/fonts/yoruba/Roboto-MediumItalic.ttf',
      'family': 'Roboto-MediumItalic',
      'longName': 'Roboto MediumItalic'
  },
  {
      'source': '/fonts/yoruba/Roboto-Black.ttf',
      'family': 'Roboto-Black',
      'longName': 'Roboto Black'
  },
  {
      'source': '/fonts/yoruba/Roboto-Medium.ttf',
      'family': 'Roboto-Medium',
      'longName': 'Roboto Medium'
  },
  {
      'source': '/fonts/times new roman.ttf',
      'family': 'TimesNewRoman',
      'longName': 'Times New Roman'
  },
]
kb_list = [
  {'shortName': LanguageCode,
   'longName': Language,
   'source': 'nigerianpidgin.com'
   },
  {'shortName': 'pcm_t_k0_windows',
   'longName': 'PCM CLDR',
   'source': 'nigerianpidgin.com'
   },
]


links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    {'linkText': 'Resources',
      'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'nigerianpidgin.com',
     'ref': 'https://nigerianpidgin.com/'
    },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = 'Naijíriá Píjin'
    self.test_data = u'Naijíriá Píjin na impọ́tánt pát ọf... ' + u'I dé fọ awa hand to sí sé wi de yúz dís grẹ́t an ímpọ́tánt lángwej ték chénj awa pípol laif.'
    self.unicode_font_list = unicode_font_list
    self.lang_list = ['pcm']
    self.kb_list = kb_list
    self.links = links

    resource_list = [
      {
        'name': 'KeyMan for Naijíriá Píjin',
        'source': '/resources/pcm/pcm_13sept.kmp',
        'description': '1.03 Latest Keyboard (13-Sep-2020)',
        'instructions': 'Install KeyMan first. Next, Desk/laptop: download file and open.\nMobile: open link.',
      },
      {
        'name': 'KeyMan for Naijíriá Píjin',
        'source': '/resources/pcm/pcm_v1.kmp',
        'description': '1.01 Keyboard for Mobile & Desktop',
        'instructions': '',
      },
    ]
    self.text_file_list = resource_list


# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldChars = (u'' +
                  '0123456789:;<=>?@' +
                  '!@#$%^&*()_+' +
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ[ \\ ]^_`' +
                  'abcdefghijklmnopqrstuvwxyz{|}~\u00a4\u00a5\u00a7' +
                  ' \u02c6 \u02d9 \u2116 \u20a3 \u20a7 \u2116 \u00b7 \u00b9')
      text = self.request.get('text', oldChars)
      font = self.request.get('font')
      pua_list = [unichr(x) for x in xrange(0xe000, 0xe020)]
      testStringList = [
          {'name': 'Private Use', # Note: must escape the single quote.
           'string': ''.join(pua_list)
           },
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


langInstance = langInfo()
app = webapp2.WSGIApplication([
    ('/demo_' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/converter/', ConvertHandler),
    ('/' + LanguageCode + '/convertUI/', ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ],
  debug=True,
  config={'langInfo': langInstance}
)
