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

Language = 'Burmese'
Language_native = 'မြန်မာဘာသာ'
LanguageCode = 'my'

my_wwburn_converter_Unicode = None  # to Unicode
my_wwburn_converter_Z = None  # to Unicode or maybe to Z?

encoding_font_list = [
    {
      'font_path':'/fonts/burmese/ww_burn_.ttf',
      'font_name':'WWBurn',
      'display_name': 'WW Burn',
    },
  {
    'font_path': '/fonts/burmese/WwinBurmese.ttf',
    'font_name': 'WwinBurmese',
    'display_name': 'Wwin Burmese',
  },
]

unicode_font_list = [
  {
    'family': 'NotoSansMyanmar',
    'longName': 'Noto Sans Myanmar',
    'source': '/fonts/Myanmar/NotoSansMyanmar-Regular.ttf',
  },
  {
    'family': 'NotoSerifsMyanmar',
    'longName': 'Noto Serif Myanmar',
    'source': '/fonts/Myanmar/NotoSerifMyanmar-Regular.ttf',
  },
  {
    'family': 'Padauk',
    'longName': 'Padauk',
    'source': '/fonts/burmese/Padauk.ttf',
  },
  {
    'family': 'Padauk-book',
    'longName': 'Padauk-book',
    'source': '/fonts/burmese/Padauk-book.ttf',
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
]


links = [
    {'linkText': 'Converter',
     'ref': '/my/convertUI/'},
    {'linkText': 'Convert to Zawgyi',
    'ref': '/my/convertToZawgyi/'},
    {'linkText': 'Font conversion summary',
     'ref': '/my/encodingRules/'
    },
    {'linkText': 'Diacritics',
     'ref': '/my/diacritic/'
     },
    {'linkText': 'Resources',
     'ref': '/my/downloads/'
    },
    {'linkText': 'Unicode Myanmar',
     'ref': 'http://unicode.org/charts/PDF/U1000.pdf'
    },
    {'linkText': 'Combiners',
     'ref': '/my/diacritic/'
    },
    {'linkText': 'Transliteration',
     'ref': '/my/transliterate/',
    },
]


diacritic_list = [unichr(x) for x in range(0x102b, 0x103f)]

base_consonant = u'\u1000'

testStringList = [
  {'name': 'Test  ww_burn samples',
   'string': u'tÛudufqkH; ' + u't-uH^m%f ' +
             u'∫uGm;w,f ' + u'ac|;xGufw,f\ ' + u'tdyf&mxw,f ' + u'tawmftwefn' +
             'tjyefvufrSwf ' + ' tjypfusL;vGefo ' + ' u|rf;usifo ',
   },
]

kb_list = [
  {'shortName': 'my',
   'longName': 'Burmese Unicode'
   },
]

class testData():
  def __init__(self):
    self.basic_data = [
      ['ဘဲ ဓာတ် ဂျင် သား', '', '', '', ''],
      ['ဘဲ ', 'bhell', 'b-eh', 'yes', 'bɛ́'],
      [' ဓာတ်', 'dharat', 'd-', 'battery', 'daʔ'],
      ['ဂျင်', 'gyin', 'j-', 'gin', 'dʑɪ̀ɰ̃'],
      ['သား', 'sarr', 'dh-', 'son', 'ðá'],
      ['ဂုဏ်', 'gun', 'g-', 'honor', 'ɡòʊɰ̃'],

      ['ဟုတ်', '', 'h-', '', 'hoʊʔ'],
      ['ယား', '', 'y-', '', 'já'],
      ['ကုန်', '', 'k-', '', 'kòʊɰ̃'],
      ['ခုန်', '', 'hk-', '', 'kʰòʊɰ̃'],
      ['လုပ်', '', 'l-', '', 'loʊʔ'],
      ['လှုပ်', '', 'hl-', '', 'l̥oʊʔ'],

      ['မတ်', '', '', '', 'maʔ'],
      ['မှတ်', '', '', '', 'm̥aʔ'],
      ['နမ်း', '', '', '', 'náɰ̃'],
      ['နှမ်း', '', '', '', 'n̥áɰ̃'],
      ['ခန်း', '', '', '', 'kʰàɰ̃'],
      ['ညစ်', '', '', '', 'ɲɪʔ'],
      ['ညှစ်', '', '', '', 'ɲ̥ɪʔ'],
      ['ငါး', '', '', '', 'ŋá'],
      ['ငှါး', '', '', '', 'ŋ̊á'],
      ['ပဲ', '', '', '', 'pɛ́'],
      ['ဖဲ', '', '', '', 'pʰɛ́'],
      ['စာ', '', '', '', 'sà'],
      ['ဆာ', '', '', '', 'sʰà'],
      ['ရှာ', '', '', '', 'ʃà'],
      ['တတ်', '', '', '', 'taʔ'],
      ['ထပ်', '', '', '', 'tʰaʔ'],
      ['ကြဉ်', '', '', '', 'tɕɪ̀ɰ̃'],
      ['ချင်', '', '', '', 'tɕʰɪ̀ɰ̃'],
      ['သတ်', '', '', '', 'θaʔ'],
      ['ဝါး', '', '', '', 'wá'],
      ['လက်ဝှေ့', '', '', '', 'lɛʔʍḛ'],
      ['ဇာ', '', '', '', 'zà'],
      ['အုတ်', '', '', '', 'ʔoʊʔ'],
      # Vowels
      ['ီ', '', 'i', '', 'i'],
      ['ိ', '', 'i', '', 'ḭ'],
      ['ေ', '', 'ei', '', 'e'],
      ['လက်', '', 'eh', '', 'ɛ'],
      ['ာ', '', 'a', '', 'a'],
      ['ါ', '', 'a', '', 'a̰'],
      ['ော်', '', 'o', '', 'ɔ'],
      ['ော', '', 'o', '', 'ɔ'],
      ['ို', '', 'ou', '', 'o'],
      ['ု', '', 'u', '', 'u'],
      ['ူ', '', 'u', '', 'ṵ'],
      ['လောက် ကောင်း', '', 'au', '', 'aʊ'],
      ['ရိုက် တိုင်း', '', 'ai', '', 'ai'],
      ['ကုတ် ကုန်', '', 'ou', '', 'oʊ'],
      ['အခု', '', 'ə', '', 'əhku'],

    ]


class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.diacritic_list = diacritic_list
    self.base_consonant = u'\u1000'

    self.unicode_font_list = unicode_font_list
    self.lang_list = ['my']
    self.kb_list = kb_list
    self.links = links

    self.text_file_list = []

    self.translit_test_data = testData().basic_data

langInstance = langInfo()

# Presents UI for conversions from font encoding to Unicode.
class ConvertUIHandler(webapp2.RequestHandler):
    def get(self):

      # All old characters
      oldChars = (u'\u0001 !"\u0023\u0024%&\'()*+,-./' +
                  '0123456789:;<=>?@' +
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ[ \\ ]^_`' +
                  'abcdefghijklmnopqrstuvwxyz{|}~')
      text = self.request.get('text', oldChars)
      font = self.request.get('font')

      oldInput = u''
      for i in range(0x20, 0x80):
        oldInput += unichr(i)
        oldInput += unichr(0x20) + unichr(0x20)
      oldInput += unichr(0x000a)
      for i in xrange(0xa0, 0xaf):
        oldInput += unichr(i)
        oldInput += unichr(0x20) + unichr(0x20)
      oldInput += unichr(0x000a)
      for i in xrange(0xb0, 0xf9):
        oldInput += unichr(i)
        oldInput += unichr(0x20) + unichr(0x20)
      oldInput += unichr(0x000a)
      for i in xrange(0xb0, 0xf8):
        oldInput += unichr(i)
        oldInput += unichr(0x20) + unichr(0x20)
      oldInput += unichr(0x000a)
      oldInput += unichr(0xfb)
      oldInput += unichr(0xff)
      oldInput += unichr(0x152)
      oldInput += unichr(0x153)
      oldInput += unichr(0x160)
      oldInput += unichr(0x161)
      oldInput += unichr(0x192)
      oldInput += unichr(0x2c6)
      oldInput += unichr(0x000a)
      oldInput += unichr(0x2013)
      oldInput += unichr(0x2014)
      oldInput += unichr(0x2018)
      oldInput += unichr(0x2019)
      oldInput += unichr(0x201a)
      oldInput += unichr(0x201c)
      oldInput += unichr(0x201d)
      oldInput += unichr(0x201e)
      oldInput += unichr(0x2020)
      oldInput += unichr(0x2021)
      oldInput += unichr(0x2022)
      oldInput += unichr(0x2026)
      oldInput += unichr(0x2030)
      oldInput += unichr(0x2039)
      oldInput += unichr(0x2122)

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


class ConvertToZawgyiHandler(webapp2.RequestHandler):
  def get(self):

    # All old characters
    oldChars = (u'\u0001 !"\u0023\u0024%&\'()*+,-./' +
                '0123456789:;<=>?@' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ[ \\ ]^_`' +
                'abcdefghijklmnopqrstuvwxyz{|}~')
    text = self.request.get('text', oldChars)
    font = self.request.get('font')

    oldInput = u''
    for i in range(0x20, 0x80):
      oldInput += unichr(i)
      oldInput += unichr(0x20) + unichr(0x20)
    oldInput += unichr(0x000a)
    for i in range(0xa0, 0xaf):
      oldInput += unichr(i)
      oldInput += unichr(0x20) + unichr(0x20)
    oldInput += unichr(0x000a)
    for i in range(0xb0, 0xf9):
      oldInput += unichr(i)
      oldInput += unichr(0x20) + unichr(0x20)
    oldInput += unichr(0x000a)

    oldInput += unichr(0xfb)
    oldInput += unichr(0xff)
    oldInput += unichr(0x152)
    oldInput += unichr(0x153)
    oldInput += unichr(0x160)
    oldInput += unichr(0x161)
    oldInput += unichr(0x192)
    oldInput += unichr(0x2c6)
    oldInput += unichr(0x000a)
    oldInput += unichr(0x2013)
    oldInput += unichr(0x2014)
    oldInput += unichr(0x2018)
    oldInput += unichr(0x2019)
    oldInput += unichr(0x201a)
    oldInput += unichr(0x201c)
    oldInput += unichr(0x201d)
    oldInput += unichr(0x201e)
    oldInput += unichr(0x2020)
    oldInput += unichr(0x2021)
    oldInput += unichr(0x2022)
    oldInput += unichr(0x2026)
    oldInput += unichr(0x2030)
    oldInput += unichr(0x2039)
    oldInput += unichr(0x2122)

    unicodeChars = ''
    unicodeCombiningChars = ''
    kb_list = [
      {'shortName': LanguageCode,
       'longName': Language,
       }
    ]

    template_values = {
      'font': font,
      'language': Language,
      'langTag': 'myZawgyi',
      'encodingList': encoding_font_list,
      'kb_list': kb_list,
      'unicodeFonts': [{
        'family': 'ZawgyiOne',
        'longName': 'Zawgyi One',
        'source': '/fonts/burmese/ZawgyiOne.ttf',
      }],
      'links': links,
      'oldChars': oldChars,
      'oldInput': oldInput,
      'outputFont': 'Zawgyi',
      'text': text,
      'textStrings': testStringList,
      'showTools': self.request.get('tools', None),
      'unicodeChars': unicodeChars,
      'combiningChars': unicodeCombiningChars,
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

    #logging.info('CONVERT %d characters' % len(input))
    #logging.info('Input type = >%s<' % input_type)

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
      {'name': 'Okell/JKW',
       'rules': translit_burmese_rules.TRANSLIT_MY_OKELL_JW,
       },
      {'name': 'FONIPA', 'rules': translit_burmese_rules.TRANSLIT_MY_FONIPA,
        },
      {'name': 'Myanmar-Latin', 'rules': translit_burmese_rules.TRANSLIT_MY_LATIN,
       },
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
#

  def get(self):
    # Get parameters
    logging.info('DoTranslitHandler')

    rules = self.request.get('rules', '').decode('unicode-escape')
    input = self.request.get('input', 'No input')
    input = urllib.unquote(input.encode('utf-8'))

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
      out_text = trans.transliterate(input)
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
    ('/demo_my/', base.LanguagesHomeHandler),
    ('/my/', base.LanguagesHomeHandler),
    ('/my/convertUI/', ConvertUIHandler),
    ('/my/downloads/', base.Downloads),
    ('/my/converter/', ConvertHandler),
    ('/my/convertToZawgyi/', ConvertToZawgyiHandler),
    ('/my/encodingRules/', base.EncodingRules),
    ('/my/diacritic/', base.DiacriticHandler),
    ('/my/transliterate/', TransliterateHandler),
    ('/my/dotranslit/', DoTranslitHandler),
  ],
  debug=True,
  config = {'langInfo': langInstance}
)