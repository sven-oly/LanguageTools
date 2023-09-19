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

import os
import webapp2

import base

from google.appengine.ext.webapp import template

Language = 'Igbo'
Language_native = '???ᰶ'
LanguageCode = 'ig'
ScriptCode = 'Nsib'

# New 30-May-2023. JSON symbols with additinoal information
# sym, pro, form, defs
output_json_file = 'js/nsibidi/output.json'

encoding_font_list = [
  {
    'font_path': '/fonts/Nsibidi/Akagu2020.ttf',
    'font_name': 'Akagu2020',
    'display_name': 'Akagu 2020',
  },
]

unicode_font_list = [
    {
        'family': 'Akagu2020',
        'longName': 'Akagu 2020',
        'source': '/fonts/Nsibidi/Akagu2020.ttf',
    },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Words',
     'ref': '/' + LanguageCode + '/words/'
    },    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    {'linkText': 'Radical input',
      'ref': '/' + LanguageCode + '/radicals/'
    },
    {'linkText': 'KB transforms',
     'ref': '/' + LanguageCode + '/kbtransforms/'
     },
    # {'linkText': 'Resources',
    #   'ref': '/' + LanguageCode + '/downloads/'
    # },
    # {'linkText': 'Unicode page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
    # },
    # {'linkText': 'Lepcha script',
    #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_alphabet'
    # },
    # {'linkText': 'Wikipedi page',
    #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_language'
    # },
    # {'linkText': 'Ethnolog',
    #  'ref': 'https://www.ethnologue.com/language/lep'
    # },
    # {'linkText': 'Combiners',
    #  'ref': '/lep/diacritic/'
    #  },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.unicode_font_list = unicode_font_list
    self.encoding_font_list = encoding_font_list

    self.lang_list = [LanguageCode]  # This may be extended

    self.kb_list = [
      {'shortName': 'ig',
       'longName': 'Igbo',
       'fontFamily':'arial',
       'instructions':
         'Type Igbo words and note options below. ' +
         'To add accents or dots, first type the base letter, then use keys for [, ], \\\\ and |.\u000a' +
         '• [ adds acute accent \u00b4 on a, e, i, o, u, m, n\u000a' +
         '• ] adds grave accent \u0060 on a, e, i, o, u, m, n\u000a' +
         '• \\\\ adds dot below \u0020\u0323 on a, e, i, o, u, m, n\u000a' +
         '• | after n gives ñ, | after m gives ṁ\u000a' +
         'To select a displayed option, type corresponding digit 0-9.\u000a' +
         'Use Page Up and Page Down to show more selection options.'
       },

      {'shortName': 'en',
       'longName': 'English',
       'fontFamily':'arial',
       'instructions': 'Type letters to look up nsibidi matches for English words.\u000a'
       },
      {'shortName': 'ig_nsi_radicals',
       'longName': 'Igbo Radical',
       'fontFamily':'Akagu2020',
       'instructions':
         'Type radical keys to get combinations.'
       },
    ]
    self.links = links

    # DUMMY range
    self.encodedRanges = [
      (0x20, 0xff),
    ]
    # For additional resources for download
    self.text_file_list = []

    # Special home handler for Nsibidi
    self.custom_home_template = 'HTML/home_nsibidi.html'

    # TODO: Fill in the rest of the common data.

# TODO: Fill in with diacritics
diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
#TODO: Fill in base consonant
default_base_consonant = u'\0x61'

# This is a clone of base.py's LanguagesHomeHandler, ignoring the special
class RadicalsHandler(webapp2.RequestHandler):
  def get(self, match=None):
      # Match is the actual url route matched.
      req = webapp2.get_request()
      # Can use this for additional information
      langInfo = self.app.config.get('langInfo')

      try:
        text_direction = langInfo.direction
      except AttributeError:
        text_direction = 'ltr'

      try:
        test_data = langInfo.test_data
      except AttributeError:
        test_data = ''
      try:
        variation_sequence = langInfo.variation_sequence
      except:
        variation_sequence = None

      try:
        encoded_ranges = langInfo.encoded_ranges
      except:
        encoded_ranges = None

      try:
        allFonts = langInfo.allFonts
      except:
        allFonts = False

      # Use the standard demo / keyboard template
      home_html = 'HTML/demo_general.html'

      kb_radical = [
        {'shortName': 'ig_nsi_radicals',
         'longName': 'Igbo Radical',
         'fontFamily':'Akagu2020',
         'instructions':
           'Type radical keys to get combinations.'
         },
      ]
      template_values = {
        'allFonts': allFonts,
        'direction': text_direction,
        'encoded_ranges': encoded_ranges,
        'language': langInfo.Language,
        'langTag': langInfo.LanguageCode,
        'font_list': langInfo.unicode_font_list,
        'lang_list': langInfo.lang_list,
        'kb_list': kb_radical,
        'langInfo': langInfo,
        'links': langInfo.links,
        'showTools': self.request.get('tools', None),
        'test_data': test_data,
        'variation_sequence': variation_sequence,
      }
      path = os.path.join(os.path.dirname(__file__), home_html)
      self.response.out.write(template.render(path, template_values))


class ShowWordsHandler(webapp2.RequestHandler):
  def get(self, match=None):
    # Match is the actual url route matched.
    req = webapp2.get_request()
    # Can use this for additional information
    langInfo = self.app.config.get('langInfo')
    template_values = {
      'language': langInfo.Language,
      'langTag': langInfo.LanguageCode,
      'font_list': langInfo.unicode_font_list,
      'lang_list': langInfo.lang_list,
      'kb_list': langInfo.kb_list,
      'langInfo': langInfo,
      'links': langInfo.links,
      'showTools': self.request.get('tools', None),
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/nsibidiWords.html')
    self.response.out.write(template.render(path, template_values))


class OutputHandler(webapp2.RequestHandler):
  # WOrks with nsibidi output.json data to look up info by symbol
  def get(self, match=None):
    # Match is the actual url route matched.
    req = webapp2.get_request()
    # Can use this for additional information
    langInfo = self.app.config.get('langInfo')
    template_values = {
      'language': langInfo.Language,
      'langTag': langInfo.LanguageCode,
      'font_list': langInfo.unicode_font_list,
      'lang_list': langInfo.lang_list,
      'kb_list': langInfo.kb_list,
      'langInfo': langInfo,
      'links': langInfo.links,
      'showTools': self.request.get('tools', None),
      'output_json_file': output_json_file,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/nsibidi_output.html')
    self.response.out.write(template.render(path, template_values))
    
langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  # Custom
  ('/' + LanguageCode + '/radicals/', RadicalsHandler),
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
  ('/' + LanguageCode + '/words/', ShowWordsHandler),
  ('/' + LanguageCode + '/output/', OutputHandler),
], debug=True, config={'langInfo': langInstance}
)
