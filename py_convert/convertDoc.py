# -*- coding: utf-8 -*-

import os
import re
import sys
import zipfile

import xml.etree.ElementTree as ET

import convertUtil
import convertWord

# The version using docx

# TIMESTAMP for version information.
TIMESTAMP = "Version 2018-06-28"

# Documentation here:
# https://docs.python.org/2/library/xml.etree.elementtree.html
# https://docs.python.org/2/library/zipfile.html

debug_output = True

# Flag controls if the conversion removes
# structure from replaced text when drawings are found
# in the .docx input.
removeOldText = False
# More aggressive removal of grandparents of empty text blocks.
removeOldTextParents = False

# If enabled, replaces old fonts in list in fontsTable.xml
convertFontsTable = False

# To keep track of data for an entire paragraph, to pass to conversion.
class paragraphData():
  def __init__(self):
    self.formatList = []
    self.textList = []
    self.textsize = 0
    self.startPoint = []

  def adddata(self, textNode, formatNode):
    self.formatList.append(formatNode)
    self.textList.append(textNode)
    self.startPoint.append(self.textsize)
    if textNode and textNode.text:
      self.textsize += len(textNode.text)


def fixElementAndParent(textElement, parent, newText, oldFontList, unicodeFont):
  removeList = []
  oldText = textElement.text
  for item in parent.findall('*'):
    for child in item.findall('*'):
      if re.search('}rFonts', child.tag):
        attrib = child.attrib
        for key in attrib:
          if attrib[key] in oldFontList:
            attrib[key] = unicodeFont
      elif re.search('}vertAlign', child.tag):
        # TODO: Fix! This is specific for Old Osage
        if (oldText == u'H' or oldText == u'\uf048'):
          keys = child.attrib.keys()
          if re.search('}val', keys[0]):
            child.attrib[keys[0]] = 'baseline'

  textElement.text = newText


# Replace the text in the first text element with the converted
# unicode string, remove text from other text elements in that,
# batch, and remove the empty elements.
# Should I reset the font in this function, too?
def processCollectedText(collectedText, textElementList, parent_map, superscriptNode,
                         converter, formatTextInfo, fontIndex):
  # type: (object, object, object, object, object, object) -> object
  clearedTextElements = []
  global debug_output

  # First, change the text
  if False and debug_output:
    print('** COLLECTED %s to Unicode. ' % collectedText)

  convertedText = converter.convertText(collectedText, fontTextInfo=formatTextInfo,
                                        fontIndex=fontIndex)
  # TODO: Add case conversion, if desired.

  convertedCount = 0
  if convertedText != collectedText:
    convertedCount = 1
    #if debug_output:
    #  print('  ++++ Converted: %s' % convertedText)
  else:
    if debug_output:
      print('  ---- Not converted: %s' % collectedText)

  # 1. Reset text in first element
  if not textElementList:
    print('!!!!!!!!!!!!!!! NO TEXT ELEMENT LIST')
    return 0

  parent = parent_map[textElementList[0]]

  # Fix font and superscripting
  fixElementAndParent(textElementList[0], parent, convertedText, converter.oldFonts,
                      converter.unicodeFont)  # Update the font in this item.
  if superscriptNode:  # This is special case for Osage. TODO: Move to Osage converter
    superscriptNode.val = 'baseline'

  # 2. Clear text in other elements
  for element in textElementList[1:]:
    element.text = ''
    clearedTextElements.append(element)

  # TODO: Consider removing cleared elements.
  return convertedCount, clearedTextElements


# Looks at text parts of the DOCX data, extracting each.
def parseDocXML(docfile_name, path_to_doc, docxml, converter,
                saveConversion=False, outpath=None, isString=False):
  global debug_output
  if isString:
    tree = ET.fromstring(path_to_doc)
    root = tree
  else:
    tree = ET.parse(path_to_doc)
    root = tree.getroot()

  drawingCount = 0
  for p in tree.getiterator():
    if re.search('}drawing', p.tag):
      drawingCount += 1
  print('@@@@@@ %d drawings found' % drawingCount)
  print('@@@@@@ docfile_name = %s' % docfile_name)

  if drawingCount == 0 and docfile_name == 'word/document.xml':  # CHECK THIS!
    convertWord.convertOneDoc(path_to_doc, docfile_name, converter)
    return

  # So we can get the parents of each node.
  # http://elmpowered.skawaii.net/?p=74
  parent_map = dict((c, p) for p in tree.getiterator() for c in p)

  # TODO: package the following in a separate function
  convertCount = 0

  allEmptiedTextElements = []
  # Look for series of items
  textElements = []
  collectedText = ''
  rprFormatData = []
  superscriptNode = False

  # Current font
  inEncodedFont = False
  fontFound = False
  fontIndex = -1
  paragraphCount = 0

  for node in root.iter('*'):

    if re.search('}p$', node.tag):
      print('--------------------------------------')
      # Accumulate data for all text in this paragraph.
      paragraphText = ""
      paragraphTextStarts = []
      paragraphTextElements = []
      paragraphFonts = []
      paragraphCount += 1
      paragraph_info = paragraphData()

      textElements = []
      formatTextInfo = []
      rprFormatData = []
      collectedText = ''
      superscriptNode = False
      inEncodedFont = False

      for pchild in node.iter('*'):
        if re.search('}r$', pchild.tag):
          # Look only at the rPr and <w:t> data
          for rchild in pchild.iter('*'):
            superscriptNode = None

            # Process <w:r>
            if re.search('}rPr', rchild.tag):
              processRtF(rchild, paragraph_info, rprFormatData, converter)
              fontFound = False
              actualFont = None
              fontNode = None
              for rprchild in rchild.iter('*'):
                # Collect all the formatting information
                rprFormatData.append(rprchild)

                # Process <w:rPr>
                # Gather formatting information as needed, e.g.,
                # superscript, subscript, style, underline, etc.
                if re.search('}vertAlign', rprchild.tag):
                  superscriptNode = rprchild
                elif re.search('}rFonts', rprchild.tag):
                  # Font info.
                  fontFound = True
                  fontNode = rprchild
                  (newFontIndex, actualFont) = isOldFontNode(rprchild, converter.oldFonts)
                  if newFontIndex >= 0:
                    # In font encoded node
                    inEncodedFont = True
                    fontIndex = newFontIndex
                  else:
                    # Check if we are switching out. If so, handle accumulated text
                    if inEncodedFont:
                      # TODO: Even if no text, reset the encoded font
                      if collectedText:
                        (newConvertedCount, emptiedElements) = processCollectedText(collectedText,
                                                                                    textElements,
                                                                                    parent_map,
                                                                                    superscriptNode,
                                                                                    converter,
                                                                                    formatTextInfo, fontIndex)
                        convertCount += newConvertedCount
                        allEmptiedTextElements.append(emptiedElements)
                      collectedText = ''
                      rprFormatData = []
                      formatTextInfo = []
                      textElements = []
                      inEncodedFont = False
            elif re.search('}t', rchild.tag):
              # For all the paragraph text.
              paragraphTextStarts.append(len(paragraphText))
              if rchild.text:
                paragraphText += rchild.text
              paragraphTextElements.append(rchild)
              paragraphFonts.append(actualFont)
              paragraph_info.adddata(rchild, fontNode)

              treat_as_no_break = converter.checkContentsForMerge(rchild.text)
              if treat_as_no_break:
                print('Contents treated as no break: %s' % rchild.text)

              if fontFound and (inEncodedFont or treat_as_no_break) and rchild.text:
                # Process <w:t>
                formatTextInfo.append([rchild.text, rprFormatData])
                collectedText += rchild.text
                rprFormatData = []
                textElements.append(rchild)

              else:
                notEncoded = rchild.text
                if notEncoded and False and debug_output:
                  print(' &&& fontFound = %s, inEncodedFont = %s, actual = %s' %
                        (fontFound, inEncodedFont, actualFont))
                  print('notEncoded = >%s<' % notEncoded)

      # End of the paragraph
      if debug_output:
        print('@P@P@P Paragraph %d text = %s' % (paragraphCount, paragraphText))
        print('     Starts = %s' % paragraphTextStarts)
        print('     Fonts = %s' % paragraphFonts)
        convertedText = converter.convertText(paragraphText, fontTextInfo=None,
                                            fontIndex=0)
        print('  --> Converted paragraph = %s' % convertedText)
        # TODO: Use the collect paragraph stuff to do better conversion, esp. sentence
       # and punctuation across font differences.

    # Whatever text is left.
    if collectedText:
      (newConvertedCount, emptiedElements) = processCollectedText(collectedText,
                                                                  textElements,
                                                                  parent_map, superscriptNode,
                                                                  converter,
                                                                  formatTextInfo, fontIndex)
      convertCount += newConvertedCount
      collectedText = ''
      textElements = []
      rprFormatData = []
      allEmptiedTextElements.append(emptiedElements)

  # TODO: remove all emptied text elements.
  removeOldTextElements(allEmptiedTextElements, parent_map)

  print( ' %s: %d text items converted' % (docfile_name, convertCount))

  # Save the new document data.
  if isString:
    return ET.tostring(root, encoding='utf-8')

  if saveConversion:
    if not outpath:
      outpath = path_to_doc
    tree.write(outpath)
  return tree

def processRtF(rchild, paragraph_info, rprFormatData, converter):
  # Deal with the font and text data for the paragraph.
  # Keep track of all the data for each chunk and
  inEncodedFont = False
  if re.search('}rPr', rchild.tag):
    fontFound = False
    actualFont = None
    for rprchild in rchild.iter('*'):
      # Collect all the formatting information
      rprFormatData.append(rprchild)

      # Process <w:rPr>
      if re.search('}vertAlign', rprchild.tag):
        superscriptNode = rprchild
      elif re.search('}rFonts', rprchild.tag):
        processFont(rprchild, converter)        # Font info.
        fontFound = True
        (newFontIndex, actualFont) = isOldFontNode(rprchild, converter.oldFonts)
        if newFontIndex >= 0:
          # In font encoded node
          inEncodedFont = True
          fontIndex = newFontIndex
        else:
          # Check if we are switching out. If so, handle accumulated text
          if inEncodedFont:
            # TODO: Even if no text, reset the encoded font
            if collectedText:
              (newConvertedCount, emptiedElements) = processCollectedText(collectedText,
                                                                          textElements,
                                                                          parent_map,
                                                                          superscriptNode,
                                                                          converter,
                                                                          formatTextInfo, fontIndex)
              convertCount += newConvertedCount
              allEmptiedTextElements.append(emptiedElements)
            collectedText = ''
            rprFormatData = []
            formatTextInfo = []
            textElements = []
            inEncodedFont = False
  elif re.search('}t', rchild.tag):
    processText(rchild, paragraphTextStarts, paragraphTextElements, paragraphFonts,
                collectedText, rprFormatData, textElements,
                fontFound, inEncodedFont, actualFont)

def processFont(rprchild, converter):
  fontFound = True
  (newFontIndex, actualFont) = isOldFontNode(rprchild, converter.oldFonts)
  inEncodedFont = False
  if newFontIndex >= 0:
    # In font encoded node
    inEncodedFont = True
    fontIndex = newFontIndex
  else:
    # Check if we are switching out. If so, handle accumulated text
    if inEncodedFont:
      # TODO: Even if no text, reset the encoded font
      if collectedText:
        (newConvertedCount, emptiedElements) = processCollectedText(collectedText,
                                                                    textElements,
                                                                    parent_map,
                                                                    superscriptNode,
                                                                    converter,
                                                                    formatTextInfo, fontIndex)
        convertCount += newConvertedCount
        allEmptiedTextElements.append(emptiedElements)
      collectedText = ''
      rprFormatData = []
      formatTextInfo = []
      textElements = []
      inEncodedFont = False

def processText(rchild, paragraphTextStarts, paragraphTextElements, paragraphFonts,
                collectedText, rprFormatData, textElements,
                fontFound, inEncodedFont, actualFont):
  paragraphTextStarts.append(len(paragraphText))
  if rchild.text:
    paragraphText += rchild.text
  paragraphTextElements.append(rchild)
  paragraphFonts.append(actualFont)

  treat_as_no_break = converter.checkContentsForMerge(rchild.text)
  if treat_as_no_break:
    # Prepare to handle this, too.
    print('Contents treated as no break: %s' % rchild.text)

  if fontFound and (inEncodedFont or treat_as_no_break) and rchild.text:
    # Process <w:t>
    v.append([rchild.text, rprFormatData])
    collectedText += rchild.text
    rprFormatData = []
    textElements.append(rchild)

  else:
    # Mostly a check for
    notEncoded = rchild.text
    if notEncoded and False and debug_output:
      print(' &&& fontFound = %s, inEncodedFont = %s, actual = %s' %
            (fontFound, inEncodedFont, actualFont))
      print('notEncoded = >%s<' % notEncoded)

def processParagraphText( paragraphTextStarts, paragraphTextElements, paragraphFonts):
  # TODO:
  #  For this, use the converter to handle each part.
  return

def removeOldTextElements(allElementsToRemove, parent_map):
  count = 0
  if not removeOldText:
    return count

  # This may be causing corruption in the MS Word file structure.
  for group in reversed(allElementsToRemove):
    for item in reversed(group):
      parent = parent_map[item]
      parent.remove(item)

      if not removeOldTextParents:
        continue
      # Can I remove the parent of this, too?
      grandparent = parent_map[parent]
      if grandparent is not None:
        grandparent.remove(parent)
      count += 1

  # And probably remove the siblings and the empty parent, too.
  return count


def isOldFontNode(node, oldFontList):
  # Look for "rFonts", and check if any font contains one of the old fonts
  # Returns index of font if found, else -1
  if re.search('}rFonts', node.tag):
    for key in node.attrib:
      fontIndex = 0
      for oldFont in oldFontList:
        if re.search(oldFont, node.attrib[key]):
          return (fontIndex, node.attrib[key])
        fontIndex += 1
  return (-1, node.attrib[key])


def parseFontTable(docXML, oldFontList, unicodeFont):
  tree = ET.fromstring(docXML)

  for node in tree.iter('*'):
    if re.search('}font$', node.tag):
      keys = node.attrib.keys()
      if re.search('}name', keys[0]) and node.attrib[keys[0]] in oldFontList:
        print( 'Replacing font %s with %s' % (node.attrib[keys[0]], unicodeFont))
        node.attrib[keys[0]] = unicodeFont
  return ET.tostring(tree, encoding='utf-8')


def tryFontUpdate(newzip, oldFontList, unicodeFont):
  filename = 'word/fontTable.xml'
  docXML = newzip.read(filename)  # A file-like object

  return parseFontTable(docXML, oldFontList, unicodeFont)


def processDOCX(path_to_doc, output_dir,
                converter, debug=False):
  if debug_output:
    print('processDOCX path = %s, output_dir = %s\n' % (path_to_doc, output_dir))
    print('    oldConvert = %s, oldFontList = %s' % (
      converter, converter.oldFonts))
  newzip = zipfile.ZipFile(path_to_doc)
  docfiles = ['word/document.xml', 'word/header1.xml', 'word/footer1.xml']
  docPartsOut = {}

  if convertFontsTable:
    newFontTable = tryFontUpdate(newzip, converter.oldFonts, converter.unicodeFont)
    docPartsOut['word/fontTable.xml'] = newFontTable

  for docfile_name in docfiles:

    compress_method = ''
    for info in newzip.infolist():
      if info.filename == docfile_name:
        compress_method = info.compress_type

    try:
      docXML = newzip.read(docfile_name)  # A file-like object
    except KeyError as err:
      print('ERROR %s' % err)
      continue

    # The real parsing.
    new_docXML = parseDocXML(docfile_name, path_to_doc, docXML, converter,
                             isString=True)
    # Remember this piece for output.
    docPartsOut[docfile_name] = new_docXML

  # All done with the pieces. Now create a new zip archive to save it.
  if output_dir:
    # String the directory tree to the file, substituting the output
    fileIn = os.path.split(path_to_doc)[1]
    baseWOextension = os.path.splitext(fileIn)[0]
  else:
    baseWOextension = os.path.splitext(path_to_doc)[0]
  outpath = os.path.join(output_dir, baseWOextension + '_unicode.docx')
  outzip = zipfile.ZipFile(outpath, 'w')  # , compress_method)

  print('  OUTPATH = %s' % outpath)

  # copy other things
  for info in newzip.infolist():
    if info.filename not in docPartsOut:
      copyfile = newzip.read(info.filename)
      outzip.writestr(info, copyfile)
    else:
      # Skipping the new data for now.
      outzip.writestr(info, docPartsOut[info.filename])
      if debug_output:
        print('Adding %s' % info.filename)

  outzip.comment = newzip.comment + 'Updated to Unicode text'.encode('utf-8')
  outzip.close()


def unzipInputFile(infile, outdir):
  # https://docs.python.org/3/library/zipfile.html
  print( 'unzipping %s to directory %s' % (infile, outdir))

  newzip = zipfile.ZipFile(infile)
  result = newzip.extractall(path=outdir, pwd=None)
  print('zip extract result = %s' % result)

  return newzip

 # For standalong and testing.
def main(argv):
  global debug_output

  args = convertUtil.parseArgs()

  paths_to_doc = args.filenames
  print('ARGS = %s' % args)

  for path in paths_to_doc:
    extension = os.path.splitext(path)[-1]
    if extension == '.docx':
      processDOCX(path, args.output_dir, args.font, debug_output)
    else:
      print('!!! Not processing file %s !' % path)


if __name__ == "__main__":
  main(sys.argv)
