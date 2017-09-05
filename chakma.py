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
import transrule_ccp

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

encoding_font_list = [
    {
      'font_path':'/fonts/ArjCN__.TTF',
      'font_name':'Arjyban',
      'display_name': 'Arjyban',
    },
    {
      'font_path':'/fonts/ChakmaSujoyan.ttf',
      'font_name':'Sujoyan',
      'display_name': 'Chakma Sujoyan',
    },
    {
      'display_name': 'Alaam',
      'font_name': 'Alaam',
      'font_path': '/fonts/Alaam.ttf',
   },
]

unicode_font_list = [
  { 'family': 'RibengUni',
    'longName': 'Ribeng Uni',
    'source': '/fonts/RibengUni-Regular_20170814.ttf',
  },
  { 'family': 'NotoSansChakma',
    'longName': 'NotoSans Chakma',
    'source': '/fonts/NotoSansChakma-Regular.ttf',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/demo_ccp/'
    },
    {'linkText': 'Converter',
     'ref': '/ccp/convertUI/'},
    {'linkText': 'Font conversion summary',
      'ref': '/ccp/encodingRules/'
    },
    {'linkText': 'Unicode',
    'ref': 'http://unicode.org/charts/PDF/U11100.pdf'
    },
    {'linkText': 'Language',
     'ref': 'https://en.wikipedia.org/wiki/Chakma_language'
    },
    {'linkText': 'Hill Education Chakma Script',
     'ref': 'http://hilledu.com/'
    }
]


# Shows keyboard for Chakma
class ChakmaIndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'ccp',
         'longName': 'Chakma Unicode'
        }
      ]
      template_values = {
        'language': 'Chakma',
        'font_list': unicode_font_list,
        'lang_list': None,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))

# Presents UI for conversions from font encoding to Unicode.
class ChakmaConvertUIHandler(webapp2.RequestHandler):
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
           'string': u'CVMmH picMCinM\\u0027 blobo vlikM velonM Fag 1409 b`l slitM'},
          {'name': 'Test 2',
           'string': 'Fag hIoayZ$` trar FitalayZ valde'},
          {'name': 'Test 3',
           'string': 'cVMmH alGy bodolnyM : gZnisnMti vnMat \\\\ kqR'},
          {'name': 'Test ordering',
           'string': 'Ti\`Z goI toIbc cniZ\` \u005c VyuI'},
          {'name': '7-June-2017',
           'string': 'jureH acI lG KcMc`ZVo pde'},
          {'name': 'long test',
           'string':
"""suneanI diZboan tirtVire koI FudelkM : nebo veal nebo, jamI nebo$ as ajar tr deboan apkM rGad vlikM brM trrM asI apkM Dbne  gEtMo agal-Fo asI ni adKZ mnucMo FilirM$ trM kini ri-si anI$\
bucZ t JeborM ribo sunelo$ at tirtVire kili"""
          },
          {'name': 'Sujoyan test a-d',
           'string': u'¡ ¢ £ ¥ § © ª ¬ ® ° ± ´ µ ¶ · º ¿ À Ã Ä Å Ç É Ñ Õ Ö Ø Ü ß'},
          {'name': 'Sujoyan test e-f',
           'string': u'\u00e0 á â ã ä å æ ç è é ê ë ì í î ï ð ñ ò ó ô õ ö ÷ ø ù ú û ü ý þ ÿ'},
          {'name': 'Sujoyan test other',
           'string': u'\u0152 \u0153 \u0178 \u0192 \u2013 \u2014 \u2018 \u2019 \u201a \u201c \u201d' +
            u'\u201e \u2020 \u2021 \u2022 \u2030 \u2039 \u203a \u2044 \u20ac \u2122 \u2126 \u2202 \u220f' +
            u'\u2044 \u221a \u221e \u222b \u2248 \u2260 \u2264 \u2265'},
          {'name': 'Alaam test1',
           'string':
           u'g„y Ag Nvivi; †eMv PwMIb; †f…eI| gvZ;Zzb; Agvbvi;'
           + u'fPmwNwei; AvgvKv`v ac; ‡Ajv| ‡mbvZ;‡Z¨ g„y gv g@'
           + u'Agvbvi; fP; Mv‡g `‡j„ mwNw j©qIO;| gy„ PO;gk †jN'
           + u'A¸yi; Mviw Aviv Av‡i„ g‡`„ civO; A@ †jNw'
           + u'civO;| mvg‡i g„y Aë‡iRx A@ esj K‰© civO;| g„y PO;gk'
           + u'AmwKw A@ PO;gk AwpybwKIZ; d«vb;U; e‡bqIO;| mvg‡i g„y'
           + u'PO;gk KweIZ;AI e‡bqIO;| g„y bv ms gv g@ fP; Av‡jnv‡b'
           + u'‡AK;`wb; Awqb;'
           + u'nSwRIK;|'
          },
      ]

      oldInput = 'CVMmH picMCinM\' blobo vlikM velonM Fag 1409 b`l slitM'
      unicodeChars = '\ud804\udd00'
      unicodeChars += '\ud804\udd03'
      unicodeChars += '\ud804\udd04'
      unicodeChars += '\ud804\udd05'
      unicodeChars += '\ud804\udd06'

      unicodeCombiningChars = chakmaCombiningCombos(u'\ud804\udd07')
      kb_list = [
        {'shortName':  'ccp',
         'longName': 'Chakma'
        }
      ]

      template_values = {
          'font': font,
          'language': 'Chakma',
          'langTag': 'ccp',
          'encodingList': encoding_font_list,
          'encoding': {
              'font_path':'/fonts/ArjCN__.TTF',
              'font_name':'ChakmaASCII',
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
      path = os.path.join(os.path.dirname(__file__), 'translit_general.html')
      self.response.out.write(template.render(path, template_values))

# AJAX handler for Chakma converter
class ChakmaConvertHandler(webapp2.RequestHandler):
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
        'language': 'Chakma',
        'langTag': 'ccp',
        'showTools': self.request.get('tools', None),
        'summary' : transCcp.getSummary(),
      }
      self.response.out.write(json.dumps(result))


class ChakmaEncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'ccp',
         'longName': 'Chakma Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/ccpConverter.js",
        'language': 'Chakma',
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
      self.response.out.write(template.render(path, template_values))

class ChakmaRenderPage(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'ccp',
         'longName': 'Chakma Unicode'
        }
      ]
      template_values = {
        'converterJS': "/js/ccpConverter.js",
        'language': 'Chakma',
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'renderCombos.html')
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
