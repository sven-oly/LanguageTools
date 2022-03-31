# -*- coding: utf-8 -*-
#!/usr/bin/env python
#

#from __future__ import standard_library
#standard_library.install_aliases()
import re

import languageTemplate
import main

import wordsearch

from userDB import getUserInfo

import userDB

import json
import logging
import os
import sys
#import urllib.request, urllib.parse, urllib.error
import webapp2

from google.appengine.api import users
from google.appengine.ext.webapp import template


class WordSearchHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games WordSearchHandler')

    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()
    rawWordList = self.request.get('words', '')

    #wordList = re.findall(r"[\w']+", rawWordList)
    #logging.info('games WordSearchHandler wordList = %s' % wordList)
    #grid, answers, words = wordsearch.generateWordsGrid(wordList)

    #logging.info('games WordSearchHandler grid = %s' % grid)
    #logging.info('games WordSearchHandler answers = %s' % answers)
    #logging.info('games WordSearchHandler words = %s' % words)
    wordData = [];

    language = 'Sylheti'
    fonts = []
    template_values = {
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'language': Language,
      'fontFamilies': fonts,
      'wordTestData': wordData,
      'maxunicode': sys.maxunicode,
    }
    path = os.path.join(os.path.dirname(__file__), 'wordsearch.html')
    self.response.out.write(template.render(path, template_values))


class GenerateWordSearchHandler(webapp2.RequestHandler):
  def get(self):
    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()

    langInfo = self.app.config.get('langInfo')

    rawWordList = self.request.get('words', [])
    fillList = self.request.get('fillList', []).split('||')
    gridSize = self.request.get('size', 10)
    diacritics = self.request.get('diacritics', '').split('||')
    tokenGroups = self.request.get('tokenGroups', [])
    gridFactor = self.request.get('gridFactor', 1.4)

    # Get words separate by spaces, not commas, returns, or tabs
    # TODO: remove other punctuation, e.g., periods, parens, etc.
    wordList = rawWordList.replace(",", " ").replace("\r", " ").replace("\t", " ").replace(".", '').split()

    # TODO: move to wordsearch object
    wordSearchObj = wordsearch.WordSearch(gridSize)
    wordSearchObj.setFillLetters(fillList)
    wordSearchObj.setDiacritics(diacritics)
    wordSearchObj.setMode(True)  # It's indeed a word search
    grid, answers, words, grid_width, attempts = wordsearch.generateWordsGrid(
      wordList, fillList, diacritics)

    if not grid:
      message = 'Cannot create grid'
    else:
      message = 'Created a grid of size %s' % grid_width

    language = 'Sylheti'
    fonts = []
    template_values = {
      'message': message,
      #'user_nickname': user_info[1],
      #'user_logout': user_info[2],
      # 'user_login_url': user_info[3],
      'language': language,
      #'fontFamilies': fonts,
      'grid': grid,
      'grid_width': grid_width,
      'answers': answers,
      'words': words,
      'maxunicode': sys.maxunicode,
      'attempts' : attempts
    }
    self.response.out.write(json.dumps(template_values))


# Calls the depth first search method, along with parameters to support it.
class GenerateWordSearchDFSHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games GenerateWordSearchDFSHandler')

    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()

    rawWordList = self.request.get('words', '')

    # Suggested size for the grid
    raw_size = self.request.get('size', '0')
    logging.info('games WordSearchHandler raw_size = >%s<' % raw_size)
    if not raw_size or raw_size is '' or raw_size is ' ':
      grid_width = 0
    else:
      grid_width = int(raw_size)

    # A measure of when to quit the search
    max_tries =  self.request.get('max_tries', 1000)
    # How many solutions to generated
    max_solution_count =  self.request.get('max_solution_count', 1)

    # logging.info('games WordSearchHandler rawWordList = %s' % rawWordList)

    # Strip out white space.
    wordList = rawWordList.replace(",", " ").replace("\r", " ").replace("\t", " ").split()
    # logging.info('games WordSearchDFS Handler wordList = %s' % wordList)
    logging.info('games WordSearchDFS Handler size = %s' % grid_width)

    ws = wordsearch.generateDFSWordSearch(wordList,
                               grid_width, max_tries, max_solution_count)

    grid = ws.grid

    if not grid:
      message = 'Cannot create grid'
    else:
      message = 'Created a grid of size %s' % grid_width

    #logging.info('games WordSearchHandler grid = %s' % grid)
    #logging.info('games WordSearchHandler answers = %s' % answers)
    #logging.info('games WordSearchHandler words = %s' % words)

    template_values = {
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'language': main.Language,
      'fontFamilies': main.OsageFonts,
      'grid': grid,
      'answers': ws.formatAnswers(),
      'words': ws.words,
      'grid_width': ws.size,
      'maxunicode': sys.maxunicode,
    }
    self.response.out.write(json.dumps(template_values))


class CrosswordHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games CrosswordHandler')

    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()

    template_values = {
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'language': main.Language,
      'fontFamilies': main.OsageFonts,
    }
    path = os.path.join(os.path.dirname(__file__), 'crossword.html')
    self.response.out.write(template.render(path, template_values))


class GenerateCrosswordHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games GenerateCrosswordHandler')
    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()

    rawWordList = self.request.get('words', '')
    logging.info('games CrossWordHandler rawWordList = %s' % rawWordList)

    wordList = rawWordList.replace(",", " ").replace("\r", " ").replace("\t", " ").split()
    logging.info('games CrossWordHandler wordList = %s' % wordList)
    logging.info('games CrossWordHandler CALLING')

    grid, answers, words, grid_width = wordsearch.generateCrosswordsGrid(wordList)

    if not grid:
      message = 'Cannot create grid'
    else:
      message = 'Created a grid of size %s' % grid_width

    logging.info('games WordSearchHandler grid = %s' % grid)
    logging.info('games WordSearchHandler answers = %s' % answers)
    logging.info('games WordSearchHandler words = %s' % words)

    template_values = {
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'language': main.Language,
      'fontFamilies': main.OsageFonts,
      'grid': grid,
      'answers': answers,
      'words': words,
      'grid_width': grid_width,
      'maxunicode': sys.maxunicode,
    }
    self.response.out.write(json.dumps(template_values))
  
class TestHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games TestHandler')

app = webapp2.WSGIApplication([
    ('/games/wordsearch/', WordSearchHandler),
    ('/games/crossword/', CrosswordHandler),
    ('/games/generatewordsearch/', GenerateWordSearchHandler),
    ('/games/generatewordsearchDFS/', GenerateWordSearchDFSHandler),
    ('/games/generatecrossword/', GenerateCrosswordHandler),
    ('/games/test/', TestHandler),
], debug=True)


