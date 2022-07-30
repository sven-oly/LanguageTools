# -*- coding: utf-8 -*-
#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
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

from userDB import getUserInfo

import json
import logging
import os
import sys
import urllib
import webapp2

import adlam

#from fpdf import FPDF

from google.appengine.api import users

from google.appengine.ext.webapp import template

fontList = ['Noto Sans Adlam 2019', 'Noto Sans Adlam 2019 Bold', 'Noto Sans Adlam 2017',  'Adlam CWC', 'Aissata Unicode', 'Noto Sans Adlam Unjoined', 'Pulaar Unicode']
oldFontsList = ['Aissata Arabic', 'Fuuta Arabic', 'Pulaar Arabic']

LanguageCode = 'ff'

unicode_font_list = [
  {'family': 'NotoSansAdlamApril',
   'longName': 'Noto Sans Adlam 2020 (joined)',
   'source': '/fonts/Fulfulde/NotoSansAdlam-Regular.ttf',
   },
  {'family': 'NotoSansAdlamApril',
   'longName': 'Noto Sans Adlam 2020 (joined)',
   'source': '/fonts/Fulfulde/Fulfulde-PulaarUnicode.ttf',
   },
  {
    'family': 'MSAdlamDisplay',
    'longName': 'MS Adlam Display',
    'source': '/fonts/Fulfulde/ADLaMDisplay-Regular.ttf',
  },
  # { 'family': 'AissataUnicode',
  #   'longName': 'Aissata Unicode',
  #   'source': '/fonts/Fulfulde - Aissata.ttf'
  # },
  # {'family': 'PulaarUnicode',
  #  'longName': 'Pulaar Unicode',
  #  'source': '/fonts/Fulfulde-PulaarUnicode.ttf'
  #  }
]

encoding_font_list = [
    {
      'font_path':'/fonts/Fulfulde/Fulfulde-PulaarUnicode.ttf',
      'font_name':'Aissata',
      'display_name': 'Aissata',
    },
  {
    'font_path': '/fonts/Fulfulde/extendedNotoSansAdlam-Regular.ttf',
    'font_name': 'Latin',
    'display_name': 'Latin',
  },
  ]

# List of the individual javascript converters.
converters = [
  '/js/adlamConverterArabic.js',
  '/js/adlamConverterLatin.js',
]

kb_list = [
  {'shortName': 'ff_adlam',
   'longName': 'Fulfulde Adlam'
  },
]

links = [
  {
    'linkText': 'Main Adlam page',
    'text': 'Main Adlam page',
    'target': 'https://adlamtesting.appspot.com/',
    'ref': 'https://adlamtesting.appspot.com/',
  },
  {
    'target': '/ff/keyboard/',
    'text': 'Keyboard',
    'ref': '/ff/keyboard/',
    'linkText': 'Keyboard',
  },
  {
    'target': '/words/convert/',
    'text': 'Convert text',
    'ref': 'https://adlamtesting.appspot.com/words/convert/',
    'linkText': 'Convert text',
},
  {
    'ref': '/dictionaryN/',
    'linkText': 'Dictionary builder',
    'target': 'https://adlamtesting.appspot.com//dictionaryN/',
    'text': 'Dictionary builder'
  },
  {
    'target': 'http://www.unicode.org/charts/PDF/U1E900.pdf',
    'text': 'Adlam Unicode',
    'ref': 'http://www.unicode.org/charts/PDF/U1E900.pdf',
    'linkText': 'Adlam Unicode'
},
  {
    'target': 'http://www.unicode.org/L2/L2014/14219r-n4628-adlam.pdf',
    'text': 'Unicode Proposal',
    'ref': 'http://www.unicode.org/L2/L2014/14219r-n4628-adlam.pdf',
    'linkText': 'Unicode Proposal'
},
  {
    'target': 'https://www.theatlantic.com/technology/archive/2016/11/the-alphabet-that-will-save-a-people-from-disappearing/506987/',
    'text': 'Atlantic Adlam article',
    'ref': 'https://www.theatlantic.com/technology/archive/2016/11/the-alphabet-that-will-save-a-people-from-disappearing/506987/',
    'linkText': 'Atlantic Adlam article'
},
  {
    'target': '/downloads/',
    'text': 'Download Adlam Unicode fonts',
    'ref': 'https://adlamtesting.appspot.com//downloads/',
    'linkText': 'Download Adlam Unicode fonts'
  },
  {
    'target': '/ff/wordsearch/',
    'text': 'Word search',
    'ref': '/ff/wordsearch/',
    'linkText': 'Word search'
  },
  {
    'target': '/ff/numerals/',
    'text': 'Adlam calculator',
    'ref': '/ff/numerals/',
    'linkText': 'Adlam calculator'
  },
  {'linkText': 'Calendar',
   'ref': '/ff/calendar/'
  },
  
]

Language = "Fulfulde"
# TODO: Fill this in with RTL
Language_native = ''

Script = "Adlam"

class langInfo():
  def __init__(self):
    self.LanguageCode = 'ff'
    self.Language = 'Fulfulde'
    self.Language_native = u'Pular'
    self.lang_list = ['ff']

    self.direction = 'rtl'

    # Lower case letters
    self.letterCodes = [x for x in range(0x01e922, 0x01e944)]
    if sys.maxunicode >= 0x10000:
      self.diacritic_list = [unichr(x) for x in range(0x1e944, 0x1e94b)]
      self.base_consonant = unichr(0x1d900)
      self.letters = [unichr(x) for x in self.letterCodes]
    else:
      self.diacritic_list = [unichr(0xd83a) + unichr(0xdd00 + x) for x in range(0x44, 0x4b)]
      self.base_consonant = u'\ud83a\udd00'
      self.letters = [unichr(0xd83a) + unichr(0xdd00 + x - 0x1e900)
                      for x in self.letterCodes]

      self.encodedRanges = [
        (0x20, 0xff),
      ]

    self.encoding_font_list = encoding_font_list

    self.fillChars = self.letters
    self.unicodeCombiningChars = self.diacritic_list

    self.kb_list = kb_list
    self.links = links

    self.text_file_list = []
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
      {'langName': self.Language, 'kbShortName': 'ful', 'kbLongName': 'Fulfulde',
       'languageCode': 'ff',
       'direction': 'rtl',
       'font': { 'family': 'NotoSansAdlam',
         'longName': 'Noto Sans Adlam',
         'source': '/fonts/Fulfulde/NotoSansAdlamNew-Regular.ttf'},
      },
      {'langName': 'English', 'kbShortName': 'en', 'kbLongName': 'English',
       'languageCode': 'en',
       'font': {'family': 'NotoSansLatin',
                'longName': 'Noto Sans',
                'source': '/fonts/NotoSans-Regular.ttf'
                },
       'helptext': 'Instructions'
       },
      {'langName': 'Arabic', 'kbShortName': 'ar', 'kbLongName': 'Arabic',
       'languageCode': 'ar',
       'direction': 'rtl',
       'font': {'family': 'NotoSansArabic',
                'longName': 'Noto Sans Arabic UI',
                'source': '/fonts/NotoSansArabicUI-Regular.ttf'
                },
       'helptext': 'Instructions'
       },
    ]
    self.weekDays = [
        "𞤈𞤫𞤬",
        "𞤀𞥄𞤩𞤵",
        "𞤃𞤢𞤦",
        "𞤔𞤫𞤧",
        "𞤐𞤢𞥄𞤧",
        "𞤃𞤢𞤣",
        "𞤖𞤮𞤪",
      ]

    self.months = [
      "𞤅𞤭𞥅𞤤𞤮",
      "𞤕𞤮𞤤𞤼𞤮",
      "𞤐𞤦𞤮𞥅𞤴𞤮",
      "𞤅𞤫𞥅𞤼𞤮",
      "𞤁𞤵𞥅𞤶𞤮",
      "𞤑𞤮𞤪𞤧𞤮",
      "𞤃𞤮𞤪𞤧𞤮",
      "𞤔𞤵𞤳𞤮",
      "𞤅𞤭𞤤𞤼𞤮",
      "𞤒𞤢𞤪𞤳𞤮",
      "𞤔𞤮𞤤𞤮",
      "𞤄𞤮𞤱𞤼𞤮",
    ]    

class adlamCharData():
  def __init__(self, v):
    self.charcode = v
    self.charType = ''
    self.charName = ''
    if v in adlam.adlamProperties:
      self.charType = adlam.adlamProperties[v][1]
      self.charName = adlam.adlamProperties[v][0].replace("ADLAM ", "").replace("LETTER ", "").lower()

      # Handle small and large character spaces.
    caseOffset = 0x22
    if self.charType == "Ll":
      caseOffset = -caseOffset

    self.hextext = '%x' % v
    if sys.maxunicode <= 65535:
      # UTF-16: \uD83A\uDD1A
      if self.charType == 'Mn':
        # Punctuation
        self.unicodeChar =  unichr(0x20) + unichr(0xa0) + unichr(v - 0x1e900 + 0xDD00) + ' '
      else:
        self.unicodeChar = unichr(0xd83a) + unichr(v - 0x1e900 + 0xDD00) + ' '
      self.otherCase = unichr(0xd83a) + unichr(v - 0x1e900 + 0xDD00 + caseOffset) + ' '
    else:
      if self.charType == 'Mn':
        self.unicodeChar =  unichr(0x20) + unichr(0xa0) + unichr(v)
      else:
        self.unicodeChar = unichr(v)
      self.otherCase = unichr(v + caseOffset)

    self.asciiCode = 0
    if v in convert.reverseConvert:
      self.pulaarCode = convert.reverseConvert[v]
    else:
      if v - 0x22 in convert.reverseConvert:
        self.pulaarCode = convert.reverseConvert[v - 0x22];  # For lower case
      else:
        self.pulaarCode = 0
    self.pulaarHex = '%x' % self.pulaarCode
    self.pulaarChar = unichr(self.pulaarCode)

    if self.charType == 'Lu' or self.charType == 'Ll':
      self.isLetter = True
      self.mixedCase = self.unicodeChar + self.otherCase + self.otherCase
    else:
      self.isLetter = False
      self.mixedCase = self.unicodeChar

      
# Unicode characters
ranges = range(0x1e900, 0x1e94b)
ranges.extend(range(0x1e950, 0x1e95a))
ranges.extend(range(0x1e95e, 0x1e960))

class MainHandler(webapp2.RequestHandler):
    def get(self, match=None):
      user_info = getUserInfo(self.request.url)
      user = users.get_current_user()

      adlamText= ''
      for index in (ranges):
        if sys.maxunicode <= 65535:
          # UTF-16: \uD83A\uDD1A
          adlamText +=unichr(0xd83a) + unichr(index - 0x1e900 + 0xDD00) + ' '
        else:
          adlamText += unichr(index) + ' ' 

      template_values = {
        'fontFamilies': fontList,
        'adlamText': adlamText,
        'links': links,
        'user_nickname': user_info[1],
        'user_logout': user_info[2],
        'user_login_url': user_info[3],
        'editOrAdmin': user_info[4],
        'unicodeFonts': unicode_font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'index.html')
      self.response.out.write(template.render(path, template_values))


class KeyboardHandler(webapp2.RequestHandler):
    def get(self, match=None):
      user = users.get_current_user()
      user_info = getUserInfo(self.request.url)

      template_values = {
        'fontFamilies': fontList,
        'user_nickname': user_info[1],
        'user_logout': user_info[2],
        'user_login_url': user_info[3],
        'editOrAdmin': user_info[4],
        'unicodeFonts': unicode_font_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'HTML/demo_general.html')
      self.response.out.write(template.render(path, template_values))

# Show data from word list converted for human verification
class WordHandler(webapp2.RequestHandler):
    def get(self, match=None):
      user = users.get_current_user()
      user_info = getUserInfo(self.request.url)

      template_values = {
        'testTEMPLATE': '!!!test template!!!',
        'fontFamilies': fontList,
        'adlamText': adlamText,
        'keylayouts': ['ful'],
        'links': links,
        'oldFontFamilies': oldFontsList,
        'user_nickname': user_info[1],
        'user_logout': user_info[2],
        'user_login_url': user_info[3],
        'editOrAdmin': user_info[4],
        'unicodeFonts': unicode_font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'words.html')
      self.response.out.write(template.render(path, template_values))

class Download(webapp2.RequestHandler):
    def get(self, match=None):
        infile = self.request.get("infile", "")
        outfile = self.request.get("outfile", "")
        template_values = {
          'infile': infile,
          'outfile': outfile,
          'language': Language,
        }

        path = os.path.join(os.path.dirname(__file__), 'downloads.html')
        self.response.out.write(template.render(path, template_values))


# Run tests to verify converted data
class ConvertTestHandler(webapp2.RequestHandler):
  def get(self, match=None):
    user = users.get_current_user()
    user_info = getUserInfo(self.request.url)
    template_values = {'fontFamilies': unicode_font_list,
      'editOrAdmin': user_info[4],
      'oldFontFamilies': oldFontsList,
      'unicodeFonts': unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'convertTest.html')
    self.response.out.write(template.render(path, template_values))


# Show data from word list converted for human verification
class DownloadHandler(webapp2.RequestHandler):
    def get(self, match=None):
      template_values = {
          'language': Language,
          'language_native': Language_native,
          'unicode_font_list': unicode_font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'downloads.html')
      self.response.out.write(template.render(path, template_values))


# Test creating PDF file
class tryPDFHandler(webapp2.RequestHandler):
  def get(self, match=None):
    user = users.get_current_user()
    user_info = getUserInfo(self.request.url)

    logging.info('PDFFFFFFFF: tryPDFHandler')
    #pdf = FPDF()
    #outfilename = 'testAdlam.pdf'
    #logging.info('  **** pdf obj = %s' % pdf)
    #pdf.add_page()
    #pdf.set_font('Arial', 'B', 16)
    #pdf.cell(40, 10, 'Hello Adlam!')
    #logging.info('  pdf = %s' % pdf)
    #pdf.set_font('Noto Sans Adlam', 'R', 18)
    pdfResult = 'test'
    #pdfResult = pdf.output(outfilename, 'S')
    #pdf.close()
    logging.info('  pdfResult = %s' % pdfResult)
    self.response.headers['Content-Type'] = 'application/pdf'
    self.response.headers['Content-Disposition'] = 'attachment; filename=testAdlam.pdf'
    self.response.out.write(pdfResult)

class EncodingRules(webapp2.RequestHandler):
  def get(self, match=None):

    template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      'converters': converters,
    }
    path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
    self.response.out.write(template.render(path, template_values))

class FontCompareHandler(webapp2.RequestHandler):
  def get(self, match=None):

    sortType = self.request.get('sort', 'interleave')
    privateDir = self.request.get('privateDir', None)
    privateFile = self.request.get('privateFile', None)
    logging.info('Private dir and file = %s/%s' % (privateDir, privateFile))

    charData = []
    if sortType == 'interleave':
      adlamCodeList = adlam.adlamAlphaInterleave()
    else:
      adlamCodeList = adlam.adlamByCodepoint()

    for r in adlamCodeList:
      charInfo = adlamCharData(r)
      charData.append(charInfo)

    template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'links': links,
        'charData': charData,  ## The characters
        'converters': converters,
        'encoding_fonts': encoding_font_list,
        'unicode_fonts': unicode_font_list,
        'stdBase': '/img/StdFont_',
        'proposedBase': '/img/EbrimaFont_',
        'privateDir': privateDir,
    }
    if privateDir and privateFile:
      path = os.path.join(os.path.dirname(__file__), privateDir, privateFile)
      path = os.path.join(os.path.dirname(__file__), privateFile)
      logging.info('**** path = %s' % path)
    else:
      path = os.path.join(os.path.dirname(__file__), 'fontCompare.html')
    self.response.out.write(template.render(path, template_values))

langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/ff/keyboard/', KeyboardHandler),
    ('/ff/fontCompare/', FontCompareHandler),
    ('/ff/downloads/', DownloadHandler),
    ('/ff/encodingrules/', EncodingRules),
    ('/ff/convertTest/', ConvertTestHandler),
    ('/ff/dictionaryN/', base.DictionaryN),
    ('/' + langInstance.LanguageCode + '/wordsearch/', base.WordSearchHandler),
    ('/' + langInstance.LanguageCode + '/numerals/', base.NumeralsHandler),
    ('/' + langInstance.LanguageCode + '/calendar/', base.CalendarHandler),

    ('/tryPDF/', tryPDFHandler),

  ],
  debug=True,
  config={'langInfo': langInstance}
)

