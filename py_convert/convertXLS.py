# -*- coding: utf-8 -*-

import copy
import os
import re
import sys

# Read and process Excel spreadsheets, converting old encoding into
# Unicode characters.

# https://openpyxl.readthedocs.io/en/default/tutorial.html

from openpyxl import Workbook
from openpyxl import load_workbook

debug = False

# TIMESTAMP for version information.
TIMESTAMP = "Version 2018-06-28"


def convertSheet(ws, oldConverterFunc, oldFontList, unicodeFont):
  print '\n  Converting sheet: %s' % ws
  numConverts = 0
  notConverted = 0
  rowNum = 1
  for row in ws.rows:
    col = 0

    for cell in row:
      thisText = cell.value
      if not thisText:
        continue

      if debug:
        print 'Cell (%d, %d) = >%s<  font = %s' % (rowNum, col, cell.value, cell.font.name)
      thisFont = cell.font
      if thisFont and thisFont.name in oldFontList:
        convertedText = oldConverterFunc(thisText)
        if thisText != convertedText:
          converted = True
          numConverts += 1
          cell.value = convertedText
          newFont = copy.copy(thisFont)
          newFont.name = unicodeFont
          cell.font = newFont
          if debug:
            print '  Conversion = %s' % convertedText.encode('utf-8')
        else:
          converted = False
          notConverted += 1

      col += 1
      rowNum += 1
  print ('    %d values converted to Unicode' % numConverts)
  return (numConverts, notConverted)


def convertAllSheets(wb, oldConverterFunc, oldFontList, unicodeFont):
  totalConversions = 0

  for ws in wb.worksheets:
    (converted, notConverted) = convertSheet(ws, oldConverterFunc, oldFontList, unicodeFont)
    totalConversions += converted

  return totalConversions


def processOneSpreadsheet(path_to_spreadsheet, output_dir,
                          oldConverterFunc, oldFontList,
                          unicodeFont):
  print 'PATH = %s' % path_to_spreadsheet
  wb = load_workbook(path_to_spreadsheet)

  print 'Converting %s in file: %s' % (oldFontList, path_to_spreadsheet)

  numConverts = convertAllSheets(wb, oldConverterFunc, oldFontList, unicodeFont)

  if numConverts:
    newName = os.path.splitext(path_to_spreadsheet)[0]
    if output_dir is not '':
      fileIn = os.path.split(path_to_spreadsheet)[1]
      baseWOextension = os.path.splitext(fileIn)[0]
      unicode_path_to_spreadsheet = os.path.join(
          output_dir, baseWOextension + '_unicode.xlsx')
    else:
      baseWOextension = os.path.splitext(path_to_spreadsheet)[0]
      unicode_path_to_spreadsheet = os.path.join(
          output_dir, baseWOextension + '_unicode.xlsx')
    wb.save(unicode_path_to_spreadsheet)
    print 'Saved new version to file %s' % unicode_path_to_spreadsheet
  else:
    print '  No conversion done, so no new file croeated.'
