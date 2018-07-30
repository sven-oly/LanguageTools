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

# Functions to create and save keyboard layouts
class CreateKeyboardHandler(webapp2.RequestHandler):
  def get(self):

    # Character codes to place
    cranges = [(0x1000, 0x109f), (0xAA60, 0xAA7f), (0xA9E0, 0xA9fe)]
    characterSets = []
    for rng in cranges:
      print('Range = %s to %s' % (rng[0], rng[1]+1))
      cset = [unichr(c) for c in xrange(rng[0], rng[1]+1)]
      characterSets.extend(cset)

    rows = []
    crow = '`1234567890-='
    rows.append(list(crow))
    crow = 'qwertyuiop[]\\'
    rows.append(list(crow))
    crow = 'asdfghjkl;\''
    rows.append(list(crow))
    crow = 'zxcvbnm,./'
    rows.append(list(crow))
    crow = ' '
    rows.append(list(crow))

    # The possible keyboard layer codes.
    layers = [
      ('', 'default'),
      ('s', 'shift'),
      # ('c', 'ctrl_alt'),
      # ('sc', 'shift_ctrl_alt'),
      # ('l', 'capslock'),
      # ('ls', 'shift_lock'),
      # ('lc', 'ctrl_alt_lock'),
      # ('lsc', 'shift_ctr_alt_lock')
    ]

    langCode = self.request.get("langCode", "xyz")
    template_values = {
      'charsets': characterSets,
      'langCode': langCode,
      'layers': layers,
      'rows': rows,
    }
    path = os.path.join(os.path.dirname(__file__), 'create_keyboard.html')
    self.response.out.write(template.render(path, template_values))


# Does something reasonable with newly defined KB.
class UpdateKeyboardHandler(webapp2.RequestHandler):

  def get(self):
    # TODO: Finish

    # Get name, kb data, update info, user info(?)

    return

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
        ('/kb/',CreateKeyboardHandler),
        ('/kb/update/', UpdateKeyboardHandler),

    ],
    debug=True)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
