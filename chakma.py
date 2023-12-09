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

#import transliterate
#import transrule_ccp

import json
import logging
import os
import sys
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

kb_list = [
  {'shortName': 'ccp',
   'longName': 'Chakma Unicode'
  },
  {'shortName': 'ccp_reorder',
   'longName': 'Chakma Unicode with reordering'
  }
]

LanguageCode = 'ccp'
Language = 'Chakma'
Language_native = '𑄌𑄋𑄴𑄟𑄳𑄦'

unicode_font_list = [
  {'family': 'RibengUni2022June',
   'longName': 'RibengUni June 2022',
   'source': '/fonts/Chakma/RibengUni-Regular_20220606.ttf',
   },
  {'family': 'RibengUni2020June',
   'longName': 'RibengUni June 2020',
   'source': '/fonts/Chakma/RibengUni-Regular.ttf',
   },
  { 'family': 'RibengUni2020',
    'longName': 'RibengUni 2020',
    'source': '/fonts/RibengUni-Regular.ttf',
  },
  { 'family': 'NotoSansChakma',
    'longName': 'NotoSans Chakma',
    'source': '/fonts/NotoSansChakma-Regular.ttf',
  },
  {'family': 'RibengUni2018018',
   'longName': 'RibengUni 2018-06-18',
   'source': '/fonts/RibengUni-Regular_20180618.ttf',
   },
  { 'family': 'extendedNotoSansChakma',
    'longName': 'extended NotoSans Chakma',
    'source': '/fonts/extendedNotoSansChakma-Regular.ttf',
  },
]

links = [
  {'linkText': 'Keyboard',
   'ref': '/ccp/'
  },
  {'linkText': 'Converter',
   'ref': '/ccp/convertUI/'},
  {'linkText': 'Font conversion summary',
    'ref': '/ccp/encodingRules/'
  },
  {'linkText': 'Chakma-Bangali-English dictionary builder',
   'ref': '/' + LanguageCode + '/dictionaryN/'
  },
  {'linkText': 'Resources',
      'ref': '/ccp/downloads/'
  },
  {'linkText': 'Unicode',
    'ref': 'http://unicode.org/charts/PDF/U11100.pdf'
  },
  {'linkText': 'Language',
   'ref': 'https://en.wikipedia.org/wiki/Chakma_language'
  },
  {'linkText': 'Hill Education Chakma Script',
   'ref': 'http://hilledu.com/'
  },
  {'linkText': 'Combiners',
   'ref': '/ccp/diacritic/'
  },
  {'linkText': 'Word search',
   'ref': '/' + LanguageCode + '/wordsearch/'
   },
  {'linkText': 'Video: Chakma technology',
   'ref': 'https://www.youtube.com/watch?v=xNfe8Sgm3Gk'
  },
  {'linkText': 'Chakma calculator',
   'ref': '/' + LanguageCode + '/numerals/'
  },
  {'linkText': 'Calendar',
   'ref': '/' + LanguageCode + '/calendar/'
  },
]

# Create a string with combinations of the combining characters,
# following the given base character.
def chakmaCombiningCombos(baseHexChar):

  combiners = [u'\ud804\udd00', u'\ud804\udd01', u'\ud804\udd02',
               u'\ud804\udd27', u'\ud804\udd28', u'\ud804\udd29',
               u'\ud804\udd2a',
               u'\ud804\udd2b', u'\ud804\udd2c', u'\ud804\udd2d',
               u'\ud804\udd2e', u'\ud804\udd2f',
               u'\ud804\udd30', u'\ud804\udd31', u'\ud804\udd32',
               u'\ud804\udd33', u'\ud804\udd34',
               u'\ud804\udd45', u'\ud804\udd46',
  ]
  testString = u''
  for c0 in combiners:
    for c1 in combiners:
      testString += baseHexChar + c0 + c1 + ' '
    testString += '\u000a'
  return testString

diacritic_list = [unichr(0xa802), unichr(0xa806), unichr(0xa80b)] + \
                 [unichr(x) for x in range(0xa823, 0xa828)]
# TODO!!!: Add in combinations.

class langInfo():
  def __init__(self):
    self.LanguageCode = 'ccp'
    self.Language = 'Chakma'
    self.Language_native = '𑄌𑄋𑄴𑄟𑄳𑄦'
    self.lang_list = ['ccp']

    logging.info('MAXUNICODE = %s' % sys.maxunicode)
    if sys.maxunicode >= 0x10000:
      self.vowels = [unichr(x) for x in range(0x11103, 0x11107)]
      self.consonants = [unichr(x) for x in range(0x11107, 0x11127)]
      self.diacritic_list = [unichr(x) for x in range(0x11100, 0x11103)]
      self.diacritic_list.extend([unichr(x) for x in range(0x11127, 0x11135)])
      self.diacritic_list.extend([unichr(x) for x in range(0x11145, 0x11147)])
      self.base_consonant = unichr(0x1110e)
    else:
      self.vowels = [unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x03, 0x07)]
      self.consonants = [unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x07, 0x027)]
      self.diacritic_list = [unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x00, 0x04)]
      self.diacritic_list.extend(unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x27, 0x35))
      self.diacritic_list.extend(unichr(0xd804) + unichr(0xdd00 + x) for x in range(0x45, 0x47))

      self.base_consonant = u'\ud804\udd0e'

    self.fillChars = self.vowels + self.consonants
    self.unicodeCombiningChars = self.diacritic_list

    self.encoding_font_list = encoding_font_list

    self.kb_list = kb_list
    self.links = links

    self.text_file_list = [
      {
        'name': 'Keyman 1.1 Chakma .kmp',
        'source': '/resources/ccp/chakma1.1.kmp',
        'description': 'Keyboard for desktop and mobile, 29-Nov-2023'
        },
      {
        'name': 'Keyman 1.0 Chakma .kmp',
        'source': '/resources/ccp/chakma.kmp',
        'description': 'Keyboard for desktop and mobile, 18-Nov-2023'
        }
    ]
    self.unicode_font_list = unicode_font_list

    # For dictionary
    self.dictionaryLang1 = "English"
    self.dictionaryLang2 = self.Language
    self.kb1 = 'en'
    self.kb2 = self.kb_list[0]['shortName']

    # For a multilingual dictionary builder
    # self.dictionaryLinks = {
    #   {'linkText': 'How to use this in Chakma',
    #    'ref': 'https://www.youtube.com/watch?v=olOq1R5IUhA&feature=youtu.be',
    #    },
    # }

    self.dictionaryNData = [
      {'langName': self.Language, 'langNative': '𑄌𑄋𑄴𑄟𑄳𑄦 𑄢𑄧',
       'languageCode': 'ccp',
        'kbShortName': 'ccp', 'kbLongName': 'Chakma Unicode',
        'font': { 'family': 'RibengUni2018018',
          'longName': 'RibengUni 2018-06-18',
          'source': '/fonts/RibengUni-Regular_20180618.ttf'},
        'direction': 'ltr',
        'helptext': '𑄣𑄢𑄴𑄌𑄢𑄧𑄢𑄴 𑄥𑄪𑄘𑄮𑄟𑄴'
      },
      {'langName': 'Bangali', 'langNative': 'বাংলা শব্দ',
       'languageCode': 'bn',
       'kbShortName': 'bn_b2', 'kbLongName': 'Bangali',
        'font': {'family': 'Bangali',
                'longName': 'Noto Sans Bengali',
                'source': '/fonts/NotoSansBengali-Regular.ttf'
                },
        'direction': 'ltr',
       'helptext': 'নির্দেশাবলী'
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
    self.numbersImage = 'ccp/ccpBgd.png'
    
    self.weekDays = [
      "𑄢𑄧𑄝𑄨",
      "𑄥𑄧𑄟𑄴",
      "𑄟𑄧𑄁𑄉𑄧𑄣𑄴",
      "𑄝𑄪𑄖𑄴",
      "𑄝𑄳𑄢𑄨𑄥𑄪𑄛𑄴",
      "𑄥𑄪𑄇𑄴𑄇𑄮𑄢𑄴",
      "𑄥𑄧𑄚𑄨",
    ]
    self.months = [
      " 𑄌𑄮𑄖𑄴",
      "𑄝𑄮𑄎𑄬𑄇𑄴",
      "𑄎𑄳𑄠𑄬𑄖𑄴",
      "𑄃𑄏𑄢𑄴",
      "𑄥𑄉𑄮𑄚𑄴",
      "𑄞𑄘𑄧",
      "𑄎𑄪𑄚𑄴",
      "𑄎𑄪𑄣𑄭",
      "𑄃𑄉𑄧𑄌𑄴𑄑𑄴",
      "𑄥𑄬𑄛𑄴𑄑𑄬𑄟𑄴𑄝𑄧𑄢𑄴",
      "𑄃𑄧𑄇𑄴𑄑𑄬𑄝𑄧𑄢𑄴",
      "𑄚𑄧𑄞𑄬𑄟𑄴𑄝𑄧𑄢𑄴",
      "𑄓𑄨𑄥𑄬𑄟𑄴𑄝𑄧𑄢𑄴"
      ]

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
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
      self.response.out.write(template.render(path, template_values))


class TestURLHandler(webapp2.RequestHandler):
    def get(self):
      langs = self.request.get('lang')
      name = self.request.get('name')
      route_args = self.request.route_args
      logging.info("TestURL langs = %s" % langs)
      logging.info("TestURL name = %s" % name)
      logging.info("TestURL route_args: %s" % str(route_args))


# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
  [('/demo_ccp/', base.LanguagesHomeHandler),
   ('/ccp/', base.LanguagesHomeHandler),
   ('/ccp/convertUI/', ChakmaConvertUIHandler),
   ('/ccp/downloads/', base.Downloads),
   ('/ccp/encodingRules/', base.EncodingRules),
   ('/ccp/diacritic/', base.DiacriticHandler),
   ('/' + langInstance.LanguageCode + '/dictionaryInput/', base.DictionaryInput),
   ('/' + langInstance.LanguageCode + '/dictionaryN/', base.DictionaryN),
   ('/' + langInstance.LanguageCode + '/wordsearch/', base.WordSearchHandler),
   ('/' + langInstance.LanguageCode + '/numerals/', base.NumeralsHandler),
   ('/' + langInstance.LanguageCode + '/calendar/', base.CalendarHandler),

     webapp2.Route('/' + langInstance.LanguageCode + '/testURL/', handler=TestURLHandler, name="testURL"),
  ], debug=True,
  config={'langInfo': langInstance}
)
