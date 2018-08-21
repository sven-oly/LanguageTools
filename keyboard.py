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
import re
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

from google.appengine.ext import db

# https://codereview.stackexchange.com/questions/101497/
#   parsing-a-list-of-single-numbers-and-number-ranges
# Change to hex.
def expand_ranges(s):
  return re.sub(
    r'\s*(0?x?[0-9a-fA-F]+)\s*-\s*(0?x?[0-9a-fA-F]+)\s*',
    lambda match: ','.join(
      str(i) for i in range(
        int(match.group(1),16),
        int(match.group(2),16) + 1
      )
    ),
    s
  )

# Functions to create and save keyboard layouts
class CreateKeyboardHandler(webapp2.RequestHandler):
  def get(self):

    coderanges = self.request.get('coderanges', None)

    if coderanges:
      cranges = expand_ranges(coderanges)
    else:
      # Character codes to place
      cranges = expand_ranges('0x1000- 0x109f, 0xAA60-0xAA7f, 0xA9E0-0xA9fe')
    logging.info("&&& %s" % cranges)

    characterSets = [unichr(int(c)) for c in cranges.split(',')]

    rows = []
    crow = u'`1234567890-='
    rows.append(list(crow))
    crow = u'qwertyuiop[]¡'  # Temporary stand in for backslash
    rows.append(list(crow))
    crow = u'asdfghjkl;\''
    rows.append(list(crow))
    crow = u'zxcvbnm,./'
    rows.append(list(crow))
    crow = ' '
    rows.append(list(crow))

    allChars = [val for sublist in rows for val in sublist]

    # The possible keyboard layer codes.
    layers = [
      ('d', 'default'),
      ('s', 'shift'),
      ('c', 'ctrl_alt'),
      ('sc', 'shift_ctrl_alt'),
       ('l', 'capslock'),
       ('ls', 'shift_lock'),
       ('lc', 'ctrl_alt_lock'),
       ('lsc', 'shift_ctr_alt_lock')
    ]

    langCode = self.request.get("langcode", "xyz")
    template_values = {
      'allchars': allChars,
      'charsets': characterSets,
      'langCode': langCode,
      'layers': layers,
      'rows': rows,
    }
    path = os.path.join(os.path.dirname(__file__), 'create_keyboard.html')
    self.response.out.write(template.render(path, template_values))

class KeyboardDB(db.Model):
  index = db.IntegerProperty()
  kbName = db.StringProperty(u'')
  langCode = db.StringProperty(u'')
  lastUpdate = db.DateTimeProperty(auto_now=True, auto_now_add=True)
  jsonKbData = db.Text(u'DEFAULT')
  kbdata = db.Text(u'intialized')
  jsonRules = db.Text(u'')
  creatorId = db.StringProperty(u'')

class SetUpKeyboardHandler(webapp2.RequestHandler):
  def get(self):
    # Get all defined keyboards
    qdb = KeyboardDB.all()

    results = qdb.run()
    entries = [r for r in results]
    names = [e.kbName for e in entries]
    logging.info('results = %s' % names)

    for e in entries:
      logging.info('Entry: %s %s' % (e.kbName, e.langCode))
      logging.info('  data: >%s<' % e.jsonKbData)
      logging.info('  update: %s' % e.lastUpdate)

    template_values = {
      'kboards': entries,
    }

    path = os.path.join(os.path.dirname(__file__), 'setup_keyboard.html')
    self.response.out.write(template.render(path, template_values))
    return


class SaveKbData(webapp2.RequestHandler):
  def get(self):
    # TODO: Finish saving
    return


# Does something reasonable with newly defined KB.
class UpdateKeyboardHandler(webapp2.RequestHandler):

  def get(self):
    # TODO: Finish
    kbid = self.request.get('kbid', 'DEFAULT')
    layoutInfo = self.request.get('kbLayout', None);
    logging.info('layoutInfo = %s' % layoutInfo)
    langCode = self.request.get('langCode', None);
    json_rules = self.request.get('rules', None);

    logging.info('langCode = %s' % langCode)

    #kbdata = urllib.unquote(layoutInfo)

    #logging.info('kbdata = %s' % kbdata)

    qdb = KeyboardDB.all()
    qdb.filter('kbName =', kbid)
    results = qdb.run()

    all_current = [r for r in results]
    logging.info('results = %s' % all_current)

    layoutStr = unicode(layoutInfo)
    logging.info('str(layoutInfo)= %s' % layoutStr)

    saved = 'KB %s already entered' % kbid
    if not all_current:
      obj = KeyboardDB(
        index= 1,
        kbName = kbid,
        langCode = langCode,
        jsonKbData = layoutStr,
        jsonRules = json_rules,
        creatorId = 'who',
        kbdata = layoutStr,
      )
      # Add to the database
      obj.put()
      logging.info('obj = %s' % obj)
      logging.info('obj.langCode = %s' % obj.langCode)

      logging.info('SAVED. data = %s' % obj.jsonKbData)
      saved = 'New KB %s saved' % kbid

    returnObj = {
      'saved': saved,
    }

    # Get name, kb data, update info, user info(?)
    self.response.out.write(json.dumps(returnObj))

    return

class ClearDBHandler(webapp2.RequestHandler):
  def get(self):
    query = KeyboardDB.all(keys_only=True)
    entries = query.fetch(1000)
    db.delete(entries)
    self.response.write('All %s items from keyboard database were removed.' % len(entries))

class ShowDBHandler(webapp2.RequestHandler):
  def get(self):
    query = KeyboardDB.all()
    entries = query.fetch(1000)
    self.response.write('All %s items from keyboard database.' % len(entries))
    for entry in entries:
      self.response.write('\n  Items %s.' % entry.kbName)
      self.response.write('      %s.' % entry.langCode)
      self.response.write('      %s.' % entry.jsonKbData)
      self.response.write('      %s.' % entry.kbdata)


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
        ('/kb/setup/', SetUpKeyboardHandler),
        ('/kb/', CreateKeyboardHandler),
        ('/kb/update/', UpdateKeyboardHandler),
        ('/kb/cleardb/', ClearDBHandler),
        ('/kb/showdb/', ShowDBHandler),

    ],
    debug=True)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
