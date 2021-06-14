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


def ProcessSharedStrings(path_to_doc, output_dir, converter):
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
  # Note that all the string data seems to be in sharedStrings
  (newSharedStrings, numConverts) = parseXlsXML(filename, xlsXML, converter)

  if numConverts <= 0:
    # Nothing should be done
    print('  No conversion done, so no new file was created.')
    return numConverts

  # Remember this piece for output.
  docPartsOut[filename] = newSharedStrings

  # All done with the pieces. Now create a new zip archive to save it.
  if output_dir is not '':
    # String the directory tree to the file, substituting the output
    fileIn = os.path.split(path_to_doc)[1]
    baseWOextension = os.path.splitext(fileIn)[0]
  else:
    baseWOextension = os.path.splitext(path_to_doc)[0]
  outpath = os.path.join(output_dir, baseWOextension + '_unicode.docx')
  outzip = zipfile.ZipFile(outpath, 'w')  # , compress_method)

  # copy other things
  for info in newzip.infolist():
    print ('COPY %s' % info.filename)
    if info.filename not in docPartsOut:
      copyfile = newzip.read(info.filename)
      outzip.writestr(info, copyfile)
    else:
      # Skipping the new data for now.
      outzip.writestr(info, docPartsOut[info.filename])

  if debug:
    outzip.printdir()
  outzip.comment = newzip.comment + ' Updated to Unicode text'
  outzip.close()

  print('Saved new version to file %s' % outpath)
  return numConverts

def parseXlsXML(file_name, theXML, converter):
  # TODO: Finish this, converting and update all with the input fonts.
  numConverts = 0
  tree = ET.fromstring(theXML)
  root = tree

  drawingCount = 0
  for p in tree.getiterator():
    if re.search('}r', p.tag):
      format_list = []
      found_font = None
      for rprchild in p._children:
        short_tag = rprchild.tag[rprchild.tag.find('}') + 1:]
        if short_tag == 'rPr':
          for format in rprchild._children:
            keys = format.attrib.keys()

            short_tag = format.tag[format.tag.find('}') + 1:]
            # Keep the tag, the value, and the format object itself
            # for later use.
            if 'val' in keys:
              format_list.append([short_tag, format.attrib['val'], format])
            else:
              format_list.append([short_tag, None, format])
            if short_tag == 'rFont':
              if 'val' in keys and format.attrib['val'] in converter.oldFonts:
                found_font = format  # remember the font object for change
        elif re.search('}t', rprchild.tag):
          if found_font != None:
            text = rprchild.text
            print('Found text a:t: %s: %s' % (rprchild.tag, text))
            print('  format list = %s' % format_list)
            new_text = converter.convertText(text, format_list)
            rprchild.text = new_text

            # TODO: Make sure that this updates font object.
            print('found_font = %s' % found_font)
            found_font.attrib['val'] = converter.unicodeFont
            numConverts += 1

  return (ET.tostring(root, encoding='utf-8'), numConverts)


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

  numConverts = ProcessSharedStrings(path_to_spreadsheet, output_dir, converter)
  return
  # TODO: remove the following if not needed.
  # THE FOLLOWING IS OLD
  ## numConverts = convertAllSheets(wb, converter)

  if numConverts > 0:
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
