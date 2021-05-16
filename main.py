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

import tibetan

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
  ('Bamum', 'bax'),
  (u'Bété', 'bete'),
  ('Batak Sinalungun', 'bts'),
  ('Chakma', 'ccp', u'\ud804\udd0c\ud804\udd0b\ud804\udd34\ud804\udd1f\ud804\udd33\ud804\udd26'),
  ('Gondi', 'gon', 'Gōndi family'),
  ('Gondi Northern (Gunjala)', 'gno', 'Northern Gōndi (Gunjala)'),
  ('Gondi Aheri (Masaram)', 'esg', 'Aheri Gōndi Masaram'),
  ('Igbo Nsibidi', 'ig', 'Aheri Gōndi Masaram'),
  ('Nyaikeng Puachue Hmong', 'Igbo Nsibidi'),
  ('Cherokee', 'chr', 'ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ'),
  ('Hoocąk (Ho-chunk)', 'win', 'Hoocąk'),
  ('Menoninee', 'mez', 'Oma͞eqnomenew'),
  ('Mende', 'men'),
  ('Myanmar', 'my', 'မြန်မာဘာသာ'),
  ('Navajo', 'nv', 'Diné bizaad'),
  ('Oneida', 'one', 'Onʌyoteʔa·ká·'),
  ('Otomanguean phonetic', 'omq'),
  ('Rohingya', 'rhg', ),
  ('Tamashek', 'tmh', 'ⵜⴰⵎⴰⵌⴰⵆ'),
  ('Tangsa', 'nst', 'Tangsa'),
  ('Tibetan', 'bod'),
]

class MainHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
        'langlist': LanguageList,
      }
      path = os.path.join(os.path.dirname(__file__), 'HTML/languagetools.html')
      self.response.out.write(template.render(path, template_values))


class DownloadKBText(webapp2.RequestHandler):
  def get(self):
    infile = self.request.get("infile", "")
    outfile = self.request.get("outfile", "")
    template_values = {
      'infile': infile,
      'outfile': outfile,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/keyboardTemplate.html')
    self.response.out.write(template.render(path, template_values))

# Error catching
def handle_404(request, response, exception):
    logging.exception(exception)
    response.write('Sorry, but we cannot find that page in MAIN. Please try again.\n\n')
    response.write('Request = %s\n' % request.url)
    response.set_status(404)

def handle_500(request, response, exception):
    logging.exception(exception)
    response.write('A server error occurred in MAIN!')
    response.write('Request = %s\n' % request.url)
    response.set_status(500)


app = webapp2.WSGIApplication(
    [
        ('/', MainHandler),
        ('/transliterate/', translit.TranslitUIHandler),
        ('/dotransliterate/', translit.DoTranslitHandler),
    ],
    debug=True)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
