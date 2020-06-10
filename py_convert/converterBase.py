 # -*- coding: utf-8 -*-
# !/usr/bin/env python3

# Base class for Docx converters
from __future__ import absolute_import, division, print_function

import re
import sys


thisDefaultOutputFont = 'NotoSansRegular'

class ConverterBase():

  def __init__(self, oldFontList=None, newFont=None,
               defaultOutputFont=thisDefaultOutputFont):
    self.forceFont = True  # May be used to set all font fields to the Unicode font

    #self.firstChar = self.adlamFirstUpper

    self.encoding = None
    self.debug = False  # False
    self.lower_mode = True
    self.sentence_mode = True

    self.oldFonts = []
    self.encodingScripts = []  # If given, tells the Script of incoming characters


    if newFont:
      self.unicodeFont = newFont
    else:
      self.unicodeFont = defaultOutputFont

  def isRtl(self):
    return False

  def convertText(self, textIn, fontTextInfo=None, fontIndex=0):
    return textIn

  def toLower(self, inText):
    return inText

  def convertString(self, textIn, fontInfo, conversion_map):
    return textIn

  def setLowerMode(self, lowerExpected):
    self.lower_mode = lowerExpected

  def setSentenceMode(self, sentence_mode):
    self.lower_mode = sentence_mode