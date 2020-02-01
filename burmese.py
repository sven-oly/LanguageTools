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
import transrule_my_wwburn

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

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
    {'linkText': 'Resources',
      'ref': '/my/downloads/'
    },
    {'linkText': 'Unicode Myanmar',
      'ref': 'http://unicode.org/charts/PDF/U1000.pdf'
    },
    {'linkText': 'Combiners',
     'ref': '/my/diacritic/'
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

# Shows keyboard
class IndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  'my',
         'longName': 'Burmese Unicode'
        },
        {'shortName': 'shn_keyman',
         'longName': 'Shan Keyman layout'
        },
        {'shortName':  'shn',
         'longName': 'Shan'
        },
        {'shortName': 'mnw',
         'longName': 'Mon Unicode'
         },
        {'shortName': 'mnw_mul',
         'longName': 'MUL Unicode, Mon/Burmese'
         },
        {'shortName': 'ksw',
         'longName': 'S\'gaw Karen'
         },
      ]
      template_values = {
        'language': Language,
        'font_list': unicode_font_list,
        'lang_list': None,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))

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
      for i in xrange(0x20, 0x80):
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
      path = os.path.join(os.path.dirname(__file__), 'translit_general.html')
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
    for i in xrange(0x20, 0x80):
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
    path = os.path.join(os.path.dirname(__file__), 'translit_general.html')
    self.response.out.write(template.render(path, template_values))


class EncodingRules(webapp2.RequestHandler):
    def get(self):

      kb_list = [
        {'shortName':  LanguageCode,
         'longName': Language + ' Unicode'
        }
      ]
      template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
        'language': Language,
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


# Convert text in URL, with JSON return
class ConvertHandler(webapp2.RequestHandler):
  def post(self):
    self.response.headers['Content-Type'] = 'text/plain'

    print 'ConvertHandler post received.'
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


class DiacriticHandler(webapp2.RequestHandler):
  def get(self):
    # Generate combinations of base + diacritic pairs
    combos = []
    table = []
    for x in diacritic_list:
      row = [x + ' (%4x)' %ord(x[0])]
      for y in diacritic_list:
        text = base_consonant + x + y
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
        'combinations': combos,
        'table': table,
        'unicode_font_list': unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'diacritics.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
  ('/demo_my/', IndigenousHomeHandler),
  ('/my/', IndigenousHomeHandler),
  ('/my/convertUI/', ConvertUIHandler),
  ('/my/downloads/', Downloads),
  ('/my/converter/', ConvertHandler),
  ('/my/convertToZawgyi/', ConvertToZawgyiHandler),
  ('/my/encodingRules/', EncodingRules),
  ('/my/diacritic/', DiacriticHandler),
], debug=True)
