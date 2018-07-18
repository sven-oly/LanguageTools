# -*- coding: utf-8 -*-

import copy
import os
import re
import zipfile

import xml.etree.ElementTree as ET

# Read and process Excel spreadsheets, converting old encoding into
# Unicode characters.

# https://openpyxl.readthedocs.io/en/default/tutorial.html

from openpyxl import load_workbook, Workbook

debug = True

# TIMESTAMP for version information.
TIMESTAMP = "Version 2018-07-09"


def convertSheet(ws, converter):
  """
  :type ws: object
  :type converter: object
  """
  print('\n  Converting sheet: %s' % ws)
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
        print('Cell (%d, %d) = >%s<  font = %s' % (rowNum, col, cell.value, cell.font.name))
      thisFont = cell.font
      if thisFont and thisFont.name in converter.oldFonts:
        convertedText = converter.convertText(thisText, None)
        if thisText != convertedText:
          converted = True
          numConverts += 1
          cell.value = convertedText
          newFont = copy.copy(thisFont)
          newFont.name = converter.unicodeFont
          cell.font = newFont
          if debug:
            print('  Conversion = %s' % convertedText.encode('utf-8'))
        else:
          converted = False
          notConverted += 1

      col += 1
      rowNum += 1
  print ('    %d values converted to Unicode' % numConverts)
  return numConverts, notConverted


def ProcessXlsZip(path_to_doc, output_dir, converter):
  # TODO: Examine the sharedStrings.xml for the font
  newzip = zipfile.ZipFile(path_to_doc)
  docPartsOut = {}

  filename = 'xl/sharedStrings.xml'
  try:
    xlsXML = newzip.read(filename)  # A file-like object
  except KeyError:
    return None

  for info in newzip.infolist():
    if info.filename == filename:
      compress_method = info.compress_type

  # The real parsing of sharedStrings.xml
  (new_xlsXML, numConverts) = parseXlsXML(filename, xlsXML, converter)
  # Remember this piece for output.
  docPartsOut[filename] = new_xlsXML

  # All done with the pieces. Now create a new zip archive to save it.
  if output_dir is not '':
    # String the directory tree to the file, substituting the output
    fileIn = os.path.split(path_to_doc)[1]
    baseWOextension = os.path.splitext(fileIn)[0]
  else:
    baseWOextension = os.path.splitext(path_to_doc)[0]
  outpath = os.path.join(output_dir, baseWOextension + '_unicode.docx')
  outzip = zipfile.ZipFile(outpath, 'w')  # , compress_method)

  print('  OUTPATH = %s' % outpath)
  return numConverts

def parseXlsXML(file_name, theXML, converter):
  # TODO: Finish this, converting and update all with the input fonts.
  numConverts = 0
  isString = True
  if isString:
    tree = ET.fromstring(theXML)
    root = tree
  else:
    tree = ET.parse(theXML)
    root = tree.getroot()

  drawingCount = 0
  for p in tree.getiterator():
    if re.search('}r', p.tag):
      print('Found a:r: %s' % p.tag)
      for rprchild in p._children:
        foundFont = None
        if re.search('}rPr', rprchild.tag):
          print('Found a:rPr: %s' % rprchild.tag)
          # TODO: look for the children of this one for formatting,
          # and for the oldFonts.
          for format in rprchild._children:
            print('tag = %s' % format.tag)
            keys = format.attrib.keys()
            if re.search('}rFont', format.tag) >= 0:
              if 'val' in keys and format.attrib['val'] in converter.oldFonts:
                foundFont = format.attrib['val']
        elif re.search('}t', rprchild.tag):
          if foundFont:
            print('Found a:t: %s' % rprchild.tag)
          text = rprchild.text
          # TODO: Convert text
          # TODO: Update font.
          numConverts += 1

  return numConverts


def convertAllSheets(wb, converter):
  totalConversions = 0

  for ws in wb.worksheets:
    (converted, notConverted) = convertSheet(ws, converter)
    totalConversions += converted

  return totalConversions


def processOneSpreadsheet(path_to_spreadsheet, output_dir,
                          converter):
  wb = load_workbook(path_to_spreadsheet, read_only=True)  # type: Workbook

  print('Converting %s in file: %s' % (converter.oldFonts, path_to_spreadsheet))

  numConverts = ProcessXlsZip(path_to_spreadsheet, output_dir, converter)
  #TODO: remove the following if not needed.

  numConverts = convertAllSheets(wb, converter)

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
    print('Saved new version to file %s' % unicode_path_to_spreadsheet)
  else:
    print('  No conversion done, so no new file created.')
