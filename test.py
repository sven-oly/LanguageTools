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

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template

import jsToCldrKb

class testHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
          'utext': 'ဂျာမန် ဓာတ်ပုံ သတင်းဌာန GEO အတွက် အလုပ် လုပ် ပေးနေတဲ့ မြန်မာ ဓာတ်ပုံ ',
          'ztext': 'ဓာတ္ပံုသတင္းေထာက္ ကိုမင္းေဇယ်ာဦးနဲ႔ ကိုခြန္လတ္တို႔အေပၚ သူလွ်ဳိလုပ္မႈနဲ႔ ဘဂၤလားေဒ့ရွ္ အာဏာပိုင္ေတြက စြပ္စြဲထားတာဟာ အဓိပၸါယ္မဲ့လြန္းတယ္လုိ႔ ကိုမင္းေဇယ်ာဦး အလြတ္တန္း ဓာတ္ပံုသတင္းေထာက္အျဖစ္ လုပ္ကိုင္ေနတဲ့ ၿဗိတိန္ အေျခစိုက္',

      }

      path = os.path.join(os.path.dirname(__file__), 'test_burmese.html')
      self.response.out.write(template.render(path, template_values))

class testLocaleHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
          'value': 1,
      }

      logging.info("user agent = %s" % self.request.headers['user-agent'])
      logging.info("country = %s" % self.request.headers['X-AppEngine-Country'])

      isMobile = self.request.get('mobile')
      uastring = self.request.headers.get('user_agent')
      if isMobile or ("Mobile" in uastring and "Safari" in uastring):
        logging.info('Mobile')
        isMobile = True
      else:
        logging.info('NOT Mobile')

      template_values = {
          'value': 1,
        'isMobile': isMobile,
      }
      path = os.path.join(os.path.dirname(__file__), 'testLocales.html')
      self.response.out.write(template.render(path, template_values))


class LayoutToKeyMan(webapp2.RequestHandler):
  def get(self):
    template_values = {
      'value': 1,
      'kb_js': "aho",
      'kb_layout': 'AHO_LAYOUT',
    }
    path = os.path.join(os.path.dirname(__file__), 'kbkeyman.html')
    self.response.out.write(template.render(path, template_values))

class LayoutToCldr(webapp2.RequestHandler):
  def get(self):
    kbname = self.request.get('kbname')
    template_values = {
      'value': 1,
      'kb_js': kbname,
      'kb_layout': kbname.upper() + '_LAYOUT',
    }
    path = os.path.join(os.path.dirname(__file__), 'kbks2cdr.html')
    self.response.out.write(template.render(path, template_values))

class ProcessJsToXml(webapp2.RequestHandler):
  def post(self):
    # Process it to xml
    json_txt = self.request.get('json_text', 'NOTHING');

    # TODO: replace with conversion to XML.
    # json_loaded = json.load(json_txt)
    outfilename = 'outputfilename.xml'
    layout_obj = jsToCldrKb.layout(outfilename)

    try:
      json_obj = json.loads(json_txt)
    except:
      json_obj = None
      logging.info('&&&&&&& Cannont run json.loads on json_txt = %s' % json_txt)

    xml_content = layout_obj.outputLdml(json_obj)  # urllib.parse.unquote(json_txt)
    # logging.info('*** Length of input = %d', len(xml_content))

    # TODO: set file name from keyboard data
    download_filename = 'CLDR_KB.xml'
    # Output to xml document
    # self.response.headers['Content-Type'] = 'text/xml'
    # self.response.headers['Content-Disposition'] = "attachment; filename=%s" % download_filename
    # self.response.out.write(xml_content)
    result = xml_content  #urllib.parse.quote(xml_content)
    # To return info the the caller's page.
    self.response.out.write(result)  # json.dumps(result))


app = webapp2.WSGIApplication([
    ('/test/', testHandler),
    ('/test/testLocale/', testLocaleHandler),
    ('/test/kbkm/', LayoutToKeyMan),
    ('/test/kbtocldr/', LayoutToCldr),
    ('/test/ProcessJsToXml/', ProcessJsToXml),
], debug=True)
