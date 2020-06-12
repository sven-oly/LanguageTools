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

    self.encodingScripts = []  # If given, tells the Script of incoming characters
    self.oldFonts = []

    if newFont:
      self.unicodeFont = newFont
    else:
      self.unicodeFont = defaultOutputFont

    # The fonts detected for conversion
    for item in oldFontList:
      if isinstance(item, list):
        self.oldFonts.append(item[0])
        self.encodingScripts.append(item[1])
      else:
        self.oldFonts.append(item)

    # Dictionary of script or other identifers for conversions
    # of individual characters.
    self.description = ''

    # Range of characters for simple alphabetic
    self.first = chr(0x20)
    self.last = chr(0x7f)
    self.first_upper = chr(0x41)
    self.first_lower = chr(0x61)
    self.lowerOffset = ord(self.first_lower) - ord(self.first_upper)

    self.encoding = None
    self.debug = False  # False
    self.lower_mode = True
    self.sentence_mode = True

  def setScriptRange(self, first, last):
    self.first = chr(first)
    self.last = chr(last)

  def setUpperCaseRange(self, first_upper, last_upper):
    self.first_upper = chr(first_upper)
    self.last_upper = chr(last_upper)

  def setLowerCaseRange(self, first, last):
    self.first_lower = chr(first)
    self.last_lower = chr(last)
    self.lowerOffset = ord(self.first_lower) - ord(self.first_upper)


  def isRtl(self):
    # Override for RTL langu
    return False

  def convertText(self, textIn, fontTextInfo=None, fontIndex=0):
    return textIn

  def toLower(self, inText):
    # Does this work for all scripts?
    return inText.lower()

  def convertString(self, textIn, fontInfo, conversion_map):
    return textIn

  def setLowerMode(self, lowerExpected):
    self.lower_mode = lowerExpected

  def setSentenceMode(self, sentence_mode):
    self.lower_mode = sentence_mode

  def toSentenceCase(self, inText):
    if not inText:
      return inText
    first = inText[0].upper()
    return first + inText[1:]