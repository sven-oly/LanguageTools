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

import translit

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

# English name, language code, name in the language.
LanguageList = [
    (u'A\u1e49angu Yol\u014bu', 'en_anangu', 'Aṉangu-Yolngu'),
    ('Ahom/Tai/Aiton/Phake', 'aho'),
    ('Batak Sinalungun', 'bts'),
    ('Chakma', 'ccp'),
    ('Cherokee', 'chr'),
    ('Hoocąk (Ho-chunk)', 'win'),
    ('Navajo', 'nv'),
    ('Oneida', 'one'),
    ('Otomanguean phonetic', 'omq'),
    ('Myanmar indigenous', 'my'),
    ('Oneida', 'one'),
    ('Tamashek', 'tmh', 'ⵜⴰⵎⴰⵌⴰⵆ'),
    ('Tibetan', 'bo'),
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

# Error catching
def handle_404(request, response, exception):
    logging.exception(exception)
    response.write('Sorry, but we do not have that page. Please try again.')
    response.set_status(404)

def handle_500(request, response, exception):
    logging.exception(exception)
    response.write('A server error occurred!')
    response.set_status(500)


app = webapp2.WSGIApplication(
    [
        ('/', MainHandler),
        ('/bo/', TibetanHomeHandler),
        ('/tmh/', TamashekHomeHandler),
        ('/omq/', OtomangueanHomeHandler),
        ('/en_anangu/', AnanuguYolnguHomeHandler),
        ('/transliterate/', translit.TranslitUIHandler),
        ('/dotransliterate/', translit.DoTranslitHandler),
    ],
    debug=True)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
