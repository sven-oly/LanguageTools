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

import transliterate

import transrule_knu

import json
import logging
import os
import urllib
import webapp2

from google.appengine.ext.webapp import template


# Example rule:
sampleRule = u"""
A > a ; # A -> a
c > CB ; # c -> CB
e > H;
::Null;
# Phase 1
H([!-w])> h$1h@ ; # H<x> -> h<x>h
::Null; 
# Phase 2
ph > 1234\u1000;
::Null;
# Phase 3
(.)o(.) > $2 O $1 SWAPPED ;
"""

# Present the transliteration interface
class TranslitUIHandler(webapp2.RequestHandler): 
  def get(self):
    ruleID = self.request.get('ruleID', '')
    rules = self.request.get('rules', '')
    intext = self.request.get('input', '')

    # TESTING ONLY - now only the first line is actually used.
    if not rules:
      rules = sampleRule # transrule_knu.KNU_UNICODE_TRANSLITERATE # sampleRule
    if not intext:
      intext = ' A CY cy H 3AH. က\n Now is the time for All conscious people coming to califHorniA'
    # TODO: Get from data store.
    if ruleID:
      # Look up rules in the datastore.
      rules = ''  # GET IT!

    template_values = {
      'intext' :  intext,
      'rules': rules,
      'ruleID': ruleID,
    }
    path = os.path.join(os.path.dirname(__file__), 'transliterate.html')
    self.response.out.write(template.render(path, template_values))

    

# Perform the transliteration using the rules. Return as JSON to client. 
class DoTranslitHandler(webapp2.RequestHandler): 
  def get(self):
    # Get parameters
    rules = self.request.get('rules', '').decode('unicode-escape')
    
    input = self.request.get('input', '')
    logging.info('INPUT = %s' % input)
    input = urllib.unquote(input)
    logging.info('INPUT = %s' % input)
    input = urllib.unquote(input)
    logging.info('INPUT = %s' % input)
    input = input.decode('unicode-escape')
    logging.info('INPUT = %s' % input)
    
    logging.info('RULES = %s' % rules)
    logging.info('INPUT = %s' % input)
 
    trans = transliterate.Transliterate(rules, True)
    outText = trans.transliterate(input)

    logging.info('rules = %s' % rules)
    logging.info('input = %s' % input)
    logging.info('trans = %s' % trans)
    logging.info('outText = %s' % outText)
  
    message = ''  # TODO: Fill in with error or success message.
    error = ''

    result = {
      'outText' : outText,
      'message' : message,
      'error': error,
      'summary' : trans.getSummary(),
      }
    self.response.out.write(json.dumps(result))
  
