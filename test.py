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

class testHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
          'utext': 'ဂျာမန် ဓာတ်ပုံ သတင်းဌာန GEO အတွက် အလုပ် လုပ် ပေးနေတဲ့ မြန်မာ ဓာတ်ပုံ ',
          'ztext': 'ဓာတ္ပံုသတင္းေထာက္ ကိုမင္းေဇယ်ာဦးနဲ႔ ကိုခြန္လတ္တို႔အေပၚ သူလွ်ဳိလုပ္မႈနဲ႔ ဘဂၤလားေဒ့ရွ္ အာဏာပိုင္ေတြက စြပ္စြဲထားတာဟာ အဓိပၸါယ္မဲ့လြန္းတယ္လုိ႔ ကိုမင္းေဇယ်ာဦး အလြတ္တန္း ဓာတ္ပံုသတင္းေထာက္အျဖစ္ လုပ္ကိုင္ေနတဲ့ ၿဗိတိန္ အေျခစိုက္',

      }

      path = os.path.join(os.path.dirname(__file__), 'test_burmese.html')
      self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
    ('/test/', testHandler),
], debug=True)