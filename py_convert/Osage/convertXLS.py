# -*- coding: utf-8 -*-

import copy
import os
import re
import sys

# Read and process Excel spreadsheets, converting Old Osage encoding into
# Unicode characters.

# Warning: Specialized to expect Old Osage text in column B.

# https://openpyxl.readthedocs.io/en/default/tutorial.html

from openpyxl import Workbook
from openpyxl import load_workbook

import convertUtil
import osageConversion

# Font names:
OfficialOsageFont = 'Official Osage Language'

# Rule for detecting Latin text or Old Osage font.
# Some Old Osage text is in Latin CAPS, but with lower case a, e, and o.
latinOsagePattern2 = r'[\^A-Z\[\]][A-Zaeo; \[\]\^\\\'\/\._`,!]+'

# This identifies traditional Osage private use characters
traditionalOsageCharacters = ur'([\uf020-\uf05e]+)'

# To avoid converting English words
notOsageLatinLower = re.compile(r'[b-df-np-z]')

osageConvertPattern = latinOsagePattern2 + '|' + traditionalOsageCharacters

def replFunc(matchObj):
  if matchObj.group(0):
    if notOsageLatinLower.search(matchObj.group(0)):
      return matchObj.group(0)
    else:
      return osageConversion.oldOsageToUnicode(matchObj.group(0))

# Check for Osage text and convert the Osage parts of the strings.
def checkAndConvertText(textIn):

  if textIn[0] == '=':
    # Ignore function calls
    return textIn
  if notOsageLatinLower.search(textIn):
    return textIn

  # Handle Latin and TraditionalOsage private use characters.
  tryResult = re.subn(osageConvertPattern, replFunc, textIn)
  if tryResult[1] >= 1:
    return tryResult[0]
  else:
    return textIn


def convertSheet(ws, unicodeFont):
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

      # print 'Cell (%d, %d) = %s' % (rowNum, col, cell.value)
      thisFont = cell.font
      if thisFont and thisFont.name == OfficialOsageFont:
        convertedText = checkAndConvertText(thisText)
        if thisText != convertedText:
          converted = True
          numConverts += 1
          cell.value = convertedText
          newFont = copy.copy(thisFont)
          newFont.name = unicodeFont
          cell.font = newFont
        else:
          converted = False
          notConverted += 1

        # This is specific for Osage text in column B.
        if not converted and col == 2:
          print '**** NOT CONVERTED **** %s, %s' % (rowNum, cell.value)

      col += 1
      rowNum += 1
  print ('    %d values converted to Unicode' % numConverts)
  return (numConverts, notConverted)


def convertAllSheets(wb, unicodeFont):
  totalConversions = 0

  for ws in wb.worksheets:
    (converted, notConverted) = convertSheet(ws, unicodeFont)
    totalConversions += converted

  return totalConversions


def processOneSpreadsheet(path_to_spreadsheet, output_dir,
                          unicodeFont='Pawhuska'):
  print 'PATH = %s' % path_to_spreadsheet
  wb = load_workbook(path_to_spreadsheet)

  print 'Converting Osage in file: %s' % path_to_spreadsheet

  numConverts = convertAllSheets(wb, unicodeFont)

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


def main(argv):
  args = convertUtil.parseArgs()

  paths_to_spreadsheet = args.filenames

  print 'files to process = %s' % paths_to_spreadsheet

  convertFileCount = 0

  for path in paths_to_spreadsheet:
    processOneSpreadsheet(path, args.output_dir, args.font)
    convertFileCount += 1

  print ('\n%d files processed' % convertFileCount)


if __name__ == "__main__":
  main(sys.argv)
