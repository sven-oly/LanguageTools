#!/usr/bin/env python
# -*- coding: utf-8 -*-

from transliterate import Transliterate

#import transrule_knu

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

# Example rule:
sampleRule = u"""
$consonant = [A-Z];
A > E;
#($consonant) > X;
(x)(yz) > $2 | $1;
N > Y|es;
es > y\=;
"""
# A > a ; # A -> a
# c > CB ; # c -> CB
# e > H;
# ::Null;
# # Phase 1
# H([!-w])> h$1h@ ; # H<x> -> h<x>h
# ::Null;
# # Phase 2
# ph > 1234က;
# ::Null;
# # Phase 3
# (.)o(.) > $2 O $1 SWAPPED ;
# """

# Present the transliteration interface
class TranslitUIHandler(webapp2.RequestHandler): 
  def get(self):
    ruleID = self.request.get('ruleID', '')
    rules = self.request.get('rules', '')
    intext = self.request.get('input', '')

    logging.info('TranslitUIHandler: ruleID: %s rules: %s intext: %s' %
                 (ruleID, rules, intext))
    # TESTING ONLY - now only the first line is actually used.
    if not rules:
      rules = sampleRule
    if not intext:
      intext =\
"""A CY cy H 3AH. က\n Now is the time for All conscious people coming to califHorniA.
xyz
"""
    # TODO: Get from data store.
    if ruleID:
      # TODO: Look up rules in the datastore.
      rules = ''  # GET IT!

    template_values = {
      'intext' :  intext,
      'rules': rules,
      'ruleID': ruleID,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/transliterate.html')
    self.response.out.write(template.render(path, template_values))

    

# Perform the transliteration using the rules. Return as JSON to client. 
class DoTranslitHandler(webapp2.RequestHandler): 
  def get(self):
    # Get parameters
    logging.info('DoTranslitHandler')

    rules = self.request.get('rules', '').decode('unicode-escape')
    input = self.request.get('input', 'No input')
    input = urllib.unquote(input.encode('utf-8'))

    logging.info('DoTranslitHandler rules = %s' % rules)

    out_text = "not transliterated"
    try:
      trans = Transliterate(rules, 'description')
      logging.info('Transliterator = %s' % trans)
    except:
      e = sys.exc_info()[0]
      logging.error('!! Creating transliterator Error e = %s.' % (e))
      out_text = '~~~~~~~~~ Creation Error: %s' % e

    logging.info('PHASE STRINGS: %s' % trans.phaseStrings)

    try:
      out_text = trans.transliterate(input)
    except:
      e = sys.exc_info()[0]
      logging.error('!! Calling transliterate Error e = %s. trans=%s' % (e, trans))
      logging.info('outText = %s' % (out_text))

    message = ''  # TODO: Fill in with error or success message.
    error = ''
    summary = trans.getSummary()
    result = {
      'outText': out_text,
      #'outText' : outText,
      'message' : message,
      'error': error,
      'summary' : ','.join(summary['shortcuts'].values()),
      }
    return_string = json.dumps(result)
    self.response.out.write(return_string)


# app = webapp2.WSGIApplication(
#     [
#         ('/transliterate/', translit.TranslitUIHandler),
#         ('/dotransliterate/', translit.DoTranslitHandler),
#     ],
#     debug=True)
#
# app.error_handlers[404] = handle_404
# app.error_handlers[500] = handle_500