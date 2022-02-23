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
from __future__ import print_function
from __future__ import unicode_literals

#from builtins import chr

import base

# import
import transliterate
# Special transliteration for Burmese to Latin
import translit_burmese_rules
import transrule_my_wwburn

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

# For Python 2.x. and Python
try:
    unichr
except NameError:
    unichr = chr

try:
    UNICODE_EXISTS = bool(type(unicode))
except NameError:
    unicode = lambda s: str(s)

try:
    xrange
except NameError:
    xrange = range

Language = 'Shan'
Language_native = 'မြန်မာဘာသာ'
LanguageCode = 'shn'

my_wwburn_converter_Unicode = None  # to Unicode
my_wwburn_converter_Z = None  # to Unicode or maybe to Z?

encoding_font_list = [
  {
    'font_path': '/fonts/Shan/Zawgyi-Tai.ttf',
    'font_name': 'ZawgyiTai',
    'display_name': 'Zawgyi-Tai',
  },
]

unicode_font_list = [
  {
    'family': 'NotoSansMyanmar',
    'longName': 'Noto Sans Myanmar',
    'source': '/fonts/Myanmar/NotoSansMyanmar-Regular.ttf',
  },
  {
    'family': 'GreatHorKhamYangon',
    'longName': 'Great Hor Kham Yangon',
    'source': '/fonts/Myanmar/GreatHorKhamYangon.otf',
  },
  {
    'family': 'KLO SHAN UNI ',
    'longName': 'Klo Shan Uni',
    'source': '/fonts/Myanmar/KLO SHAN UNI font.ttf',
  },
  {
    'family': 'NotoSerifsMyanmar',
    'longName': 'Noto Serif Myanmar',
    'source': '/fonts/Myanmar/NotoSerifMyanmar-Regular.ttf',
  },
  {
    'family': 'BeautiUNI-2',
    'longName': 'BeautiUNI-2',
    'source': '/fonts/burmese/BeautiUNI-2.ttf',
  },
  {
    'family': 'BeautiUNI-6',
    'longName': 'BeautiUNI-6',
    'source': '/fonts/burmese/BeautiUNI-6.ttf',
  },
  {
    'family': 'Padauk',
    'longName': 'Padauk',
    'source': '/fonts/burmese/Padauk.ttf',
  },
  {
    'family': 'Padauk-book',
    'longName': 'Padauk book',
    'source': '/fonts/Myanmar/Padauk-book.ttf',
  },
  {
    'family': 'Padauk-Bold',
    'longName': 'Padauk Bold',
    'source': '/fonts/Myanmar/Padauk-Bold.ttf',
  },
  {
    'family': 'Padauk Kyaungchikote',
    'longName': 'Padauk Kyaungchikote',
    'source': '/fonts/Myanmar/Padauk Kyaungchikote.ttf',
  },
  {
    'family': 'PadaukGrandPro v2',
    'longName': 'Padauk GrandPro v2',
    'source': '/fonts/Myanmar/PadaukGrandPro v2.ttf',
  },
  {
    'family': 'PadaukSagar',
    'longName': 'Padauk Sagar',
    'source': '/fonts/Myanmar/PadaukSagar.ttf',
  },
  {
    'family': 'PadaukSgaw',
    'longName': 'Padauk Sgaw',
    'source': '/fonts/Myanmar/PadaukSgaw.ttf',
  },
]


links = [
    {'linkText': 'Converter',
     'ref': '/shn/convertUI/'},
    {'linkText': 'Font conversion summary',
     'ref': '/shn/encodingRules/'
    },
    {'linkText': 'Diacritics',
     'ref': '/shn/diacritic/'
     },
    # {'linkText': 'Resources',
    #  'ref': '/shn/downloads/'
    # },
    {'linkText': 'Unicode Myanmar',
     'ref': 'http://unicode.org/charts/PDF/U1000.pdf'
    },
    {'linkText': 'Combiners',
     'ref': '/shn/diacritic/'},
    {'linkText': 'Wiki Shan language',
     'ref': 'https://en.wikipedia.org/wiki/Shan_language'},
    {'linkText': 'UN DHR',
     'ref': 'https://unicode.org/udhr/d/udhr_shn.txt'},
    # {'linkText': 'Transliteration',
    #  'ref': 'https://langtools3.wm.r.appspot.com/translit/',
    # },
]

# TODO
diacritic_list = [unichr(x) for x in range(0x102b, 0x103f)]

base_consonant = u'\u1000'

testStringList = [
]

kb_list = [
  {'shortName': 'shn_sil_keyman',
   'longName': 'Shan SIL'
   },
  {'shortName': 'shn_keyman',
   'longName': 'Shan'
   },
  {'shortName': 'shn',
   'longName': 'Shan Unicode'
   },
]


class testData():
  def __init__(self):
    self.basic_data = [
      ['ဘဲ ဓာတ် ဂျင် သား', '', '', '', ''],
      ['ဘဲ ', 'bhell', 'b-eh', 'yes', 'bɛ́'],
    ]


class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.LanguageTag = None
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.diacritic_list = diacritic_list
    self.base_consonant = u'\u107c'

    self.encoding_font_list = encoding_font_list
    self.unicode_font_list = unicode_font_list
    self.lang_list = ['shn']
    self.kb_list = kb_list
    self.links = links
    self.allFonts = True

    self.langCharacters = [0x1004, 0x1010, 0x1011, 0x1015, 0x1019, 0x101a]
    self.langCharacters.extend([0x101b, 0x101c, 0x101d, 0x1022, 0x102d, 0x102f, 0x102f])
    self.langCharacters.extend([0x103a, 0x103b, 0x103c, 0x103d, 0x103e, 0x103f])
    self.langCharacters.extend([c for c in range(0x1075, 0x109a)])
    self.langCharacters.extend([0x109e, 0x109f])
    self.all_chars = ' '.join([unichr(x) for x in self.langCharacters])

    self.text_file_list = []

    self.translit_test_data = testData().basic_data

langInstance = langInfo()

# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldChars = (u'')
      text = self.request.get('text', oldChars)
      font = self.request.get('font')

      oldInput = u''

      unicodeChars = ''
      unicodeCombiningChars = ''
      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language,
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
          'backend_convert': True,  # For the backend conversion.
          'converter_type': 'WWBURN_Unicode',
      }
      path = os.path.join(os.path.dirname(__file__), 'HTML/translit_general.html')
      self.response.out.write(template.render(path, template_values))


# Convert text in URL, with JSON return
class ConvertHandler(webapp2.RequestHandler):
  def post(self):
    self.response.headers['Content-Type'] = 'text/plain'

    print('ConvertHandler post received.')
    self.response.out.write('ConvertHandler post received.\n')

  def get(self):
    logging.info('ConvertHandler get received. %s' % self.request)
    global my_wwburn_converter_Unicode

    text = unicode(self.request.get('text'))
    #logging.info('text         = %s' % text)
    input_type = self.request.get('type', 'Z')
    strip_spaces = self.request.get('strip_spaces', None)
    debug = self.request.get('debug', None)

    input = urllib.unquote(text)  # .decode('utf-8')
    #logging.info('decoded text = %s' % text)

    noreturn = self.request.get('noreturn', None)
    msg = ''

    # THE ACTUAL CONVERSION.
    if True:  ## TODO: Fix later. not my_wwburn_converter_Unicode:
      my_wwburn_converter_Unicode = transliterate.Transliterate(
        transrule_my_wwburn.MY_WWBURN_UNICODE_TRANSLITERATE,
        transrule_my_wwburn.UNICODE_DESCRIPTION)

    subst = transrule_my_wwburn.Substitutions
    text = input
    for rep in subst:
      text = input.replace(rep[0], rep[1])
      input = text
    result = my_wwburn_converter_Unicode.transliterate(input, debug)


    self.response.headers['Content-Type'] = 'application/json'
    if input:
      if noreturn:
        returntext = ''
      else:
        returntext = text

      #logging.info('RESULT has %d characters' % len(result))

      # Call the converter on this text data.
      obj = {'input': returntext,
             'input_type': input_type,
             'msg': msg,
             'converted': result,
             'detector_description': transrule_my_wwburn.UNICODE_DESCRIPTION,
             'noreturn': noreturn,
             'inputSize': len(input),
             'resultSize': len(result),
             'errmsg': None}
    else:
      obj = {'input': text,
             'input_type': input_type,
             'msg': msg,
             'noreturn': noreturn,
             'errmsg': 'Null input'}
    self.response.out.write(json.dumps(obj))

# TODO: Perform transliteration using Okell/JKW and others
class TransliterateHandler(webapp2.RequestHandler):
  def get(self):
    # Load existing transliterations

    translit_rules_list = [
        ]

    template_values = {
      'language': langInstance.Language,
      'langTag': langInstance.LanguageCode,
      'font_list': langInstance.unicode_font_list,
      'lang_list': langInstance.lang_list,
      'kb_list': langInstance.kb_list,
      'langInfo': langInfo,
      'links': langInstance.links,
      'showTools': self.request.get('tools', None),
      'test_data': 'ဓာတ်',  ## !!! langInstance.translit_test_data,
      'translit_rules_list': translit_rules_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/burmese_transliteration.html')
    self.response.out.write(template.render(path, template_values))

# Globals
# OkellJKW_Translit = None


# !!! TODO: adapt to new transliteration for Burmese --> Latin
class DoTranslitHandler(webapp2.RequestHandler):
  def get(self):
    # Get parameters
    logging.info('DoTranslitHandler')

    rules = self.request.get('rules', '').decode('unicode-escape')
    inputData = self.request.get('input', 'No input')
    inputData = urllib.unquote(inputData.encode('utf-8'))

    logging.info('DoTranslitHandler rules = %s' % rules)

    error = ''  # Set if there's a problem.
    debug = True

    OkellJKW_Translit = None
    # Create transliterator(s) if needed
    OkellJKW_Translit = transliterate.Transliterate(
      translit_burmese_rules.TRANSLIT_MY_OKELL_JW, debug=True)
    try:
      if not OkellJKW_Translit:
        logging.info('NEW NEW OKELL')
        logging.info('*** %s lines' % len(translit_burmese_rules.TRANSLIT_MY_OKELL_JW.split('\n')))
        OkellJKW_Translit = transliterate.Transliterate(
          translit_burmese_rules.TRANSLIT_MY_OKELL_JW, debug=True)
    except:
      e = sys.exc_info()[0]
      error = '!!!!! Creating transliterator Error e = %s.' % (e)
      logging.error(error)
      out_text = '~~~~~~~~~ Creation Error: %s' % e

    # !!! FINISH THIS
    trans = OkellJKW_Translit

    out_text = "not transliterated"

    try:
      out_text = trans.transliterate(inputData)
    except:
      e = sys.exc_info()[0]
      logging.error('!! Calling transliterate Error e = %s. trans=%s' % (e, trans))
      logging.info('outText = %s' % (out_text))

    message = 'MESSAGE  #'''  # TODO: Fill in with error or success message.
    summary_text = "No summary available"
    if trans:
      try:
        summary = trans.getSummary()
        summary_text = ','.join(summary['shortcuts'].values())
      except AttributeError:
        summary_text = "No summary available"

    result = {
      'outText': out_text,
      #'outText' : outText,
      'message' : message,
      'error': error,
      'summary' : summary_text,
    }
    return_string = json.dumps(result)
    self.response.out.write(return_string)


app = webapp2.WSGIApplication([
    ('/shn/', base.LanguagesHomeHandler),
    ('/shn/', base.LanguagesHomeHandler),
    ('/shn/convertUI/', ConvertUIHandler),
    ('/shn/downloads/', base.Downloads),
    ('/shn/converter/', ConvertHandler),
    ('/shn/encodingRules/', base.EncodingRules),
    ('/shn/diacritic/', base.DiacriticHandler),
    ('/shn/transliterate/', TransliterateHandler),
    ('/shn/dotranslit/', DoTranslitHandler),
    ('/shn/AllFonts/', base.AllFontTest ),
  ],
  debug=True,
  config = {'langInfo': langInstance}
)