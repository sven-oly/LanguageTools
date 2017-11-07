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

import chakma
import cherokee

import translit

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

# English name, language code, name in the language.
LanguageList = [
    ('Tibetan', 'bo'),
    ('Tamashek', 'tmh', 'ⵜⴰⵎⴰⵌⴰⵆ'),
    (u'A\u1e49angu Yol\u014bu', 'en_anangu', 'Aṉangu-Yolngu'),
    ('Otomanguean phonetic', 'omq'),
    ('Chakma', 'ccp'),
    ('Cherokee', 'chr'),
    ('Myanmar indigenous', 'myanmar'),
    ('Ahom, Aiton, Khamti', 'tai'),
  ]

class MainHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
        'langlist': LanguageList,
      }
      path = os.path.join(os.path.dirname(__file__), 'languagetools.html')
      self.response.out.write(template.render(path, template_values))


class TibetanHomeHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
        'langlist': LanguageList,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_tibetan.html')
      self.response.out.write(template.render(path, template_values))


class TamashekHomeHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
        'langlist': LanguageList,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_Tamashek.html')
      self.response.out.write(template.render(path, template_values))

class AnanuguYolnguHomeHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
        'langlist': LanguageList,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_anangu.html')
      self.response.out.write(template.render(path, template_values))

class OtomangueanHomeHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
        'langlist': LanguageList,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_omq.html')
      self.response.out.write(template.render(path, template_values))

class MyanmarIndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):
      lang_list = [
        {'shortName':  'shn',
         'longName': 'Shan'
        },
        {'shortName':  'mnw',
         'longName': 'Mon'
        },
        {'shortName':  'ksw',
         'longName': 'S\'gaw Karen'
        },

        {'shortName':  'aio',
         'longName': 'Aiton'
        },
        {'shortName':  'kht',
         'longName': 'Khamti'
        },
        {'shortName':  'phk',
         'longName': 'Phake'
        },
        ]
      template_values = {
        'langlist': LanguageList,
        'kb_list': lang_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_myanmar.html')
      self.response.out.write(template.render(path, template_values))

class ChakmaIndigenousHomeHandler(webapp2.RequestHandler):
    def get(self):
      font_list = [
        { 'family': 'NotoSansChakma',
          'longName': 'NotoSans Chakma',
          'source': '/fonts/NotoSansChakma-Regular.ttf',
        },    
        { 'family': 'RibengUni',
          'longName': 'RibengUni',
          'source': '/fonts/RibengUni-Regular_20170814.ttf',
        },
      ]
      kb_list = [
        {'shortName':  'ccp',
         'longName': 'Chakma'
        }
      ]
      links = [
        {'linkText': 'Chakma Unicode',
         'ref': 'http://unicode.org/charts/PDF/U11100.pdf'
         },
         {'linkText': 'Chakma Language',
         'ref': 'https://en.wikipedia.org/wiki/Chakma_language'
         },
         ]
      template_values = {
        'langlist': LanguageList,
        'language': 'Chakma',
        'font_list': font_list,
        'lang_list': None,
        'kb_list': kb_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))

class TaiLanguagesHomeHandler(webapp2.RequestHandler):
    def get(self):
      font_list = [
        { 'family': 'AHOMFONT_Unicode',
          'longName': 'AHOMFONT Unicode',
          'source': '/fonts/ahom_aiton/AHOMFONT_Unicode.ttf',
        },
        { 'family': 'AHOMFONT',
          'longName': 'AHOM FONT',
          'source': '/fonts/ahom_aiton/AHOMFONT.ttf',
        },
        { 'family': 'AhomUnicode',
          'longName': 'Ahom Unicode',
          'source': '/fonts/ahom_aiton/AhomUnicode.ttf',
        },
        { 'family': 'Ahom_Manuscript',
          'longName': 'Ahom Manuscript',
          'source': '/fonts/ahom_aiton/Ahom_Manuscript.ttf',
        },
        { 'family': 'NotoSansMyanmar',
          'longName': 'NotoSansMyanmar',
          'source': '/fonts/NotoSansMyanmar-Regular.otf',
        },
      ]
      lang_list = [
        {'shortName':  'aho',
         'longName': 'Tai Ahom'
        },
        {'shortName':  'aio',
         'longName': 'Aiton'
        },
        {'shortName':  'kht',
         'longName': 'Khamti'
        },
        {'shortName':  'phk',
         'longName': 'Phake'
        },
        {'shortName':  'shn',
         'longName': 'Shan'
        },
        {'shortName':  'ksw',
         'longName': 'S\'gaw Karen'
        },
      ]
      links = [
        {'linkText': 'Ahom Unicode',
         'ref': 'http://www.unicode.org/charts/PDF/U11700.pdf'
        },
        {'linkText': 'Aiton and Khamti Shan Unicode. Extended-A',
         'ref': 'http://www.unicode.org/charts/PDF/UAA60.pdf'
        },
        {'linkText': 'Myanmar Extended-B',
         'ref': 'http://www.unicode.org/charts/PDF/UA9E0.pdf'
        },
        {'linkText': 'Myanmar Unicode block',
         'ref': 'https://en.wikipedia.org/wiki/Myanmar_(Unicode_block)'
        },
      ]
      template_values = {
        'langlist': LanguageList,
        'language': 'Ahom',
        'font_list': font_list,
        'lang_list': lang_list,
        'kb_list': lang_list,
        'links': links,
      }
      path = os.path.join(os.path.dirname(__file__), 'demo_general.html')
      self.response.out.write(template.render(path, template_values))

class Downloads(webapp2.RequestHandler):
  def get(self):
    infile = self.request.get("infile", "")
    outfile = self.request.get("outfile", "")
    template_values = {
      'infile': infile,
      'outfile': outfile,
    }
    path = os.path.join(os.path.dirname(__file__), 'downloads.html')
    self.response.out.write(template.render(path, template_values))

class DownloadKBText(webapp2.RequestHandler):
  def get(self):
    infile = self.request.get("infile", "")
    outfile = self.request.get("outfile", "")
    template_values = {
      'infile': infile,
      'outfile': outfile,
    }    
    path = os.path.join(os.path.dirname(__file__), 'download/keyboardTemplate.html')
    self.response.out.write(template.render(path, template_values))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/demo_bo/', TibetanHomeHandler),
    ('/demo_tmh/', TamashekHomeHandler),
    ('/demo_omq/', OtomangueanHomeHandler),
    ('/demo_myanmar/', MyanmarIndigenousHomeHandler),
    ('/demo_en_anangu/', AnanuguYolnguHomeHandler),

    ('/downloads/', Downloads),
    ('/downloadsTest/', DownloadKBText),
    ('/transliterate/', translit.TranslitUIHandler),
    ('/dotransliterate/', translit.DoTranslitHandler),


#    ('/demo_ccp/', chakma.ChakmaIndigenousHomeHandler),
#    ('/ccp/convertUI/', chakma.ChakmaConvertUIHandler),
#    ('/ccp/downloads/', chakma.ChakmaDownloads),
#    ('/ccp/converter/', chakma.ChakmaConvertHandler),
#   ('/ccp/encodingRules/', chakma.ChakmaEncodingRules),

    ('/demo_tai/', TaiLanguagesHomeHandler),

], debug=True)
