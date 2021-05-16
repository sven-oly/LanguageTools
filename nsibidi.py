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

kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
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
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
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

    self.kb_list = kb_list
    self.links = links

    # For additional resources for download
    self.text_file_list = []

    # Special home handler for Nsibidi
    self.custom_home_template = 'HTML/home_nsibidi.html'

    # TODO: Fill in the rest of the common data.

# TODO: Fill in with diacritics
diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
#TODO: Fill in base consonant
default_base_consonant = u'\0x61'

kb_list = [
  {'shortName': LanguageCode,
   'longName': LanguageCode,
   },
]

encodedRanges = [
  (0x20, 0xff),
]

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

langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  # Custom
  ('/' + LanguageCode + '/words/', ShowWordsHandler),
], debug=True, config={'langInfo': langInstance}
)
