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
# import transrule_nv

import base

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

Language = 'Bamum'
Language_native = 'Need native name'
LanguageCode = 'bax'

encoding_font_list = [
]

unicode_font_list = [
    {
        'family': 'NotoSansBamum',
        'longName': 'Noto Sans Bamum',
        'source': '/fonts/NotoSansBamum-Regular.ttf',
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
    # {'linkText': 'Converter',
    # 'ref': '/' + LanguageCode + '/convertUI/'},
    #{'linkText': 'Font conversion summary',
    #  'ref': '/' + LanguageCode + '/encodingRules/'
    #},
    {'linkText': 'Resources',
      'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'Unicode Bamum page',
     'ref': 'https://www.unicode.org/charts/PDF/UA6A0.pdf'
    },
    {'linkText': 'Unicode Bamum Supplement page',
     'ref': 'https://www.unicode.org/charts/PDF/U16800.pdf'
     },
    {'linkText': 'Bamum script',
     'ref': 'https://en.wikipedia.org/wiki/Bamum_script'
    },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Bamum_language'
    },
    {'linkText': 'Ethnolog',
     'ref': 'https://www.ethnologue.com/language/baX'
    },
    {'linkText': 'Combiners',
     'ref': '/bax/diacritic/'
     },
]


diacritic_list = [unichr(x) for x in range(0xA6F0, 0xA6F2)]

default_base_consonant = u'\uA6A1'


class langInfo():
  def __init__(self):
    self.LanguageCode = LanguageCode
    self.Language = Language
    self.Language_native = Language_native
    self.test_data = u''
    self.unicode_font_list = unicode_font_list
    self.lang_list = [LanguageCode]
    self.kb_list = kb_list
    self.links = links

    self.text_file_list = []


langInstance = langInfo()

app = webapp2.WSGIApplication([
    ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
    ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
    ('/' + LanguageCode + '/downloads/', base.Downloads),
    ('/' + LanguageCode + '/converter/', base.ConvertHandler),
    ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ],
  debug=True,
  config = {'langInfo': langInstance}
)
