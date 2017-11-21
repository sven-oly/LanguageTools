# -*- coding: utf-8 -*-

import os
import re
import sys
import zipfile

import xml.etree.ElementTree as ET

import convertUtil
import osageConversion

# The version using docx
import convertWordOsage

# https://docs.python.org/2/library/xml.etree.elementtree.html
# https://docs.python.org/2/library/zipfile.html

# Font names:
OfficialOsageFont = 'Official Osage Language'
FONTS_TO_CONVERT = [OfficialOsageFont]

# Rule for detecting Latin text or Old Osage font.
# Some Old Osage text is in Latin CAPS, but with lower case a, e, and o.
latinOsagePattern2 = ur'[\^A-Z\[\]][A-Zaeo\[\]\^\\\'\/\._`,!]+'

# This identifies traditional Osage private use characters
traditionalOsageCharacters = ur'([\uf020-\uf05e]+)'

# To avoid converting English words
notOsageLatinLower = re.compile(r'[b-df-np-z]')

osageConvertPattern = latinOsagePattern2 + '|' + traditionalOsageCharacters

debug_output = False


def replFunc(matchObj):
  if matchObj.group(0):
    if notOsageLatinLower.search(matchObj.group(0)):
      return matchObj.group(0)
    else:
      return osageConversion.oldOsageToUnicode(matchObj.group(0))

# Check for Osage text and convert the Osage parts of the strings.
def checkAndConvertText(textIn):
  if not textIn:
    return textIn

  if textIn[0] == '=':
    # Ignore function calls
    return textIn
#  if notOsageLatinLower.search(textIn):
#    return textIn

  # Handle Latin and TraditionalOsage private use characters.
  tryResult = re.subn(osageConvertPattern, replFunc, textIn)
  if tryResult[1] >= 1:
    return tryResult[0]
  else:
    return textIn


# Replace the text in the first text element with the converted
# unicode string, remove text from other text elements in that,
# batch, and remove the empty elements.
# Should I reset the font in this function, too?
def processCollectedText(collectedText, textElementList, parent_map):
  # First, change the text
  if debug_output:
    print('** CONVERTING %s to Unicode. ' % collectedText)
  convertedText = osageConversion.oldOsageToUnicode(collectedText)
  convertedCount = 0
  if convertedText != collectedText:
    convertedCount = 1
  else:
    print('---- Not converted: %s' % collectedText)

  # 1. Reset text in first element
  if textElementList:
    textElementList[0].text = convertedText

  # 2. Clear text in other elements
  # 3. Delete empty elements:
  for element in textElementList[1:]:
    parent = parent_map[element]
    if parent is not None:
      parent.remove(element)

      countFontItems = 0
      countOtherItems = 0
      for item in parent.findall('*'):
        for child in item.findall('*'):
          if re.search('}rFonts', child.tag):
            countFontItems += 1
          else:
            countOtherItems +=1
        if re.search('}rFonts', item.tag):
          countFontItems += 1
        else:
          countOtherItems +=1

      # If each count == 1, then this contains only a font spec.
      # Remove empty parents
      if countFontItems == 1 and countOtherItems == 1:
        uberParent = parent_map[parent]
        if uberParent is not None:
          uberParent.remove(parent)

  return convertedCount

# Looks at text parts of the DOCX data, extracting each.
def parseDocXML(path_to_doc, unicodeFont='Pawhuska',
                saveConversion=False, outpath=None, isString=False):
  if isString:
    tree = ET.fromstring(path_to_doc)
    #tree = ET.parse(path_to_doc)
    root = tree
  else:
    tree = ET.parse(path_to_doc)
    root = tree.getroot()

  # TODO: Complete this.
  print ('Looking for drawing:')
  drawingCount = 0
  for p in tree.getiterator():
    if re.search('}drawing', p.tag):
      drawingCount += 1
      print (p)
  print ('%d drawing lines found' % drawingCount)
  print ('----------------------------')

  if drawingCount == 0:
    convertWordOsage.convertOneDoc(path_to_doc)
    return

  # So we can get the parents of each node.
  # http://elmpowered.skawaii.net/?p=74
  parent_map = dict((c, p) for p in tree.getiterator() for c in p)

  body = root.find('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body')

  osageNodeCount = 0
  convertCount = 0

  # Look for series of items
  textElements = []
  collectedText = ''

  for node in root.iter('*'):

    if re.search('}p$', node.tag):
      if textElements:
        convertCount += processCollectedText(collectedText, textElements, parent_map)
        collectedText = ''
        textElements = []

    if re.search('}rFonts', node.tag) and not isOsageFontNode(node):
      # Switching out of Osage mode.
      if textElements:
        # print ' &&&&&&&&&&& Not Osage font node %s' % node
        convertCount += processCollectedText(collectedText, textElements, parent_map)
        collectedText = ''
        textElements = []
    elif isOsageFontNode(node):
      osageNodeCount += 1
      # print '%d Osage node = %s' % (osageNodeCount, node.tag)

      rPr = parent_map[node]
      # print rPr
      rNode = parent_map[rPr]

      textItems = []
      convertedList = []

      for item in rNode.findall('*'):
        if re.search('}t$', item.tag):
          if debug_output:
            print '  Traditional Osage: %s' % item.text.encode('utf-8')

          collectedText += item.text
          textElements.append(item)

  if textElements:
    convertCount += processCollectedText(collectedText, textElements, parent_map)
    collectedText = ''
    textElements = []

  print '%d text items converted' % convertCount

  if isString:
    return ET.tostring(root, encoding='utf-8')

  if saveConversion:
    if not outpath:
      outpath = path_to_doc
    tree.write(outpath)
  return tree, convertedList


def isOsageFontNode(node):
  # Look for "rFonts", and check if any font contains "Official Osage"
  if re.search('}rFonts', node.tag):
    for key in node.attrib:
      if re.search('Official Osage', node.attrib[key]):
        return True
  return False


def processDOCX(path_to_doc, output_dir, unicodeFont='Pawhuska'):
  newzip = zipfile.ZipFile(path_to_doc)
  docfile_name = 'word/document.xml'
  compress_method = ''
  for info in newzip.infolist():
    if info.filename == docfile_name:
      compress_method = info.compress_type

  if debug_output:
    print 'COMPRESS TYPE = %s' % compress_method

  docXML = newzip.read(docfile_name)  # A file-like object

  new_docXML = parseDocXML(docXML, unicodeFont, isString=True)

  # Create a new zip archive
  if output_dir is not '':
    # String the directory tree to the file, substituting the output
    fileIn = os.path.split(path_to_doc)[1]
    baseWOextension = os.path.splitext(fileIn)[0]
    outpath = os.path.join(output_dir, baseWOextension + '_unicode.docx')
  else:
    baseWOextension = os.path.splitext(path_to_doc)[0]
    outpath = os.path.join(output_dir, baseWOextension + '_unicode.docx')

  print '  OUTPATH = %s' % outpath

  outzip = zipfile.ZipFile(outpath, 'w')  #, compress_method)
  outzip.comment = newzip.comment + ' Updated with Osage Unicode'

  # copy other things
  for info in newzip.infolist():
    if info.filename != docfile_name:
      # print '  COPY %s' % info.filename
      copyfile = newzip.read(info.filename)
      outzip.writestr(info, copyfile)
    else:
      # Skipping the new data for now.
      outzip.writestr(info, new_docXML)
      # print 'Adding %s' % info.filename
  if debug_output:
    outzip.printdir()
  outzip.close()

def unzipInputFile(infile, outdir):
  # https://docs.python.org/3/library/zipfile.html
  print 'unzipping %s to directory %s' % (infile, outdir)

  newzip = zipfile.ZipFile(infile)
  # Be careful on this.
  result = newzip.extractall(path=outdir, pwd=None)
  print 'zip extract result = %s' % result

  return newzip


def main(argv):
  args = convertUtil.parseArgs()

  paths_to_doc = args.filenames
  print 'ARGS = %s' % args

  for path in paths_to_doc:
    extension = os.path.splitext(path)[-1]
    if extension == '.docx':
      processDOCX(path, args.output_dir, args.font)
    else:
      print '!!! Not processing file %s !' % path


if __name__ == "__main__":
  main(sys.argv)
