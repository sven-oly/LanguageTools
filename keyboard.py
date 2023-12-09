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

from main import LanguageList
import translit

import glob
import json
import logging
import os
import re
import time

import webapp2
import urllib

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

    shiftRows = [u'~!@#$%^&*()_+']
    shiftRows.append(u'QWERTYUIOP{}|')
    shiftRows.append(u'ASDFGHJKL:\"')
    shiftRows.append(u'ZXCVBNM<>?')

    allChars = [val for sublist in rows for val in sublist]

    # The possible keyboard layer codes.
    layers = [
      ('d', 'default'),
      ('s', 'shift'),
      ('c', 'ctrl_alt'),
      ('sc', 'shift_ctrl_alt'),
       ('l', 'lock'),
       ('ls', 'shift_lock'),
       ('lc', 'ctrl_alt_lock'),
       ('lsc', 'shift_ctr_alt_lock')
    ]
    unshiftedLayers = [
      ('d', 'default'),
      ('c', 'ctrl_alt'),
       ('l', 'lock'),
       ('lc', 'ctrl_alt_lock'),
    ]
    shiftedLayers = [
      ('s', 'shift'),
      ('sc', 'shift_ctrl_alt'),
      ('ls', 'shift_lock'),
      ('lsc', 'shift_ctr_alt_lock')
    ]
    langCode = self.request.get("langcode", "xyz")
    template_values = {
      'allchars': allChars,
      'charsets': characterSets,
      'langCode': langCode,
      'layers': layers,
      'rows': rows,
      'shiftRows': shiftRows,
      'unshiftedLayers': unshiftedLayers,
      'shiftedLayers': shiftedLayers,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/create_keyboard.html')
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

    path = os.path.join(os.path.dirname(__file__), 'HTML/setup_keyboard.html')
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


# Get all the currently defined keyman layouts in resources directory
# Show them to the user.
class  GetAvailableKeymanLayouts(webapp2.RequestHandler):
  def get(self):
    self.lang_dict = self.langDict() 
   
    code = self.request.get('code', None)

    kmp_files = glob.glob('resources/*/*.kmp')  #/*/*.kmp')

    self.response.write('<h2>%d Keyman files available</h2>' % len(kmp_files))

    message = """The following Keyman keyboard files are publicly available
       and downloadable. See <a href='https://keyman.com/'>keyman.com</a> to learn how to install
       and use these on your computer or mobile device.
       """
    self.response.write('<p>%s' % (message))
    # Now organize by language
    lang_kbs = {}

    self.response.write('<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">')
    for kmp in kmp_files:
      lang_code = os.path.basename(os.path.dirname(kmp))
      if lang_code in lang_kbs:
        lang_kbs[lang_code].append(kmp)
      else:
        lang_kbs[lang_code] = [kmp]
    
    for lang_code in sorted(lang_kbs.keys()):
      if lang_code not in self.lang_dict:
        # self.response.write('<h3>%s not found</h3>' % (lang_code))
        lang_name = [lang_code]
      else:
        lang_name = self.lang_dict[lang_code]
      lang_ref = '/' + lang_code + '/'
      self.response.write('<h3><a href="%s" target="_blank">%s</a> (%s)</h3>' %
                          (lang_ref, lang_name[0], lang_code))
      self.response.write('<ul>')
      for kmp in lang_kbs[lang_code]:
        kmp_file = os.path.basename(kmp)
        last_modified = os.path.getctime(kmp)
        last_mod = time.ctime(last_modified)
        
        ref = '/resources/' + lang_code + '/' + kmp_file
        self.response.write(
          '<li><a href="%s">%s</a>: %s</li>' %
          (ref, kmp_file, last_mod))
      self.response.write('</ul>')

  def langDict(self):
    # Gets the languages as a dictionary from main.LanguageList
    lang_dict = {}
    for item in LanguageList:
      #self.response.write('<br>Lang: %s' % item[0])
      
      code = item[1]
      lang_dict[code] = [item[0]]
      if len(item) > 2:
        lang_dict[code].append(item[2])

    return lang_dict


# Error catching
import urllib

def handle_404(request, response, exception):
    logging.exception(exception)
    response.write('Sorry, but we do not have that keyboard page. Please try again.')
    response.set_status(404)

def handle_500(request, response, exception):
    logging.exception(exception)
    response.write('A server error occurred!')
    response.set_status(500)


app = webapp2.WSGIApplication(
    [
        ('/kb/keyman/', GetAvailableKeymanLayouts),
        ('/kb/setup/', SetUpKeyboardHandler),
        ('/kb/', CreateKeyboardHandler),
        ('/kb/update/', UpdateKeyboardHandler),
        ('/kb/cleardb/', ClearDBHandler),
        ('/kb/showdb/', ShowDBHandler),

    ],
    debug=True)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
