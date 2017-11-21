# -*- coding: utf-8 -*-

import os
import re
import sys
import zipfile

import xml.etree.ElementTree as ET

import convertUtil
import osageConversion

# https://docs.python.org/2/library/xml.etree.elementtree.html
# https://docs.python.org/2/library/zipfile.html

# Rule for detecting Latin text or Old Osage font.
# Some Old Osage text is in Latin CAPS, but with lower case a, e, and o.
latinOsagePattern2 = ur'[\^A-Z\[\]][A-Zaeo\[\]\^\\\'\/\._`,!]+'

# This identifies traditional Osage private use characters
traditionalOsageCharacters = ur'([\uf040-\uf05d]+)'

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
#  if notOsageLatinLower.search(textIn):
#    return textIn

  # Handle Latin and TraditionalOsage private use characters.
  tryResult = re.subn(osageConvertPattern, replFunc, textIn)
  if tryResult[1] >= 1:
    return tryResult[0]
  else:
    return textIn


# Looks at text parts of the DOCX data, extracting each.
def parseDocXML(path_to_doc, saveConversion=False, outpath=None, isString=False):
  if isString:
    tree = ET.fromstring(path_to_doc)
    #tree = ET.parse(path_to_doc)
    root = tree
    print 'PARSING TREE FROM STRING'
  else:
    tree = ET.parse(path_to_doc)
    root = tree.getroot()

  # So we can get the parents of each node.
  parent_map = dict((c, p) for p in tree.getiterator() for c in p)

  body = root.find('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body')

  osageNodeCount = 0
  convertCount = 0
  for node in root.iter('*'):
    if isOsageFontNode(node):
      osageNodeCount += 1
      # print '%d Osage node = %s' % (osageNodeCount, node.tag)

      rPr = parent_map[node]
      # print rPr
      rNode = parent_map[rPr]

      textItems = []
      convertedList = []
      for item in rNode.findall('*'):
        if re.search('}t$', item.tag):
          textItems.append(item)
          if re.search(traditionalOsageCharacters, item.text):
            print '  Traditional Osage: %s' % item.text.encode('utf-8')
          convertedText = checkAndConvertText(item.text)
          if convertedText != item.text:
            print ' Converted = %s' % convertedText.encode('utf-8')
            convertedList.append((item.text, convertedText))
            item.text = convertedText
            convertCount += 1
          else:
            print '     %s NOT CONVERTED' % item.text.encode('utf-8')
      if True:  # len(textItems):
        print 'rNode %d has %d Osage text items' % (osageNodeCount, len(convertedList))

  print '%d converted' % convertCount

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


def processDOCX(path_to_doc):
  newzip = zipfile.ZipFile(path_to_doc)
  docfile_name = 'word/document.xml'
  compress_method = ''
  for info in newzip.infolist():
    if info.filename == docfile_name:
      compress_method = info.compress_type

  print 'COMPRESS TYPE = %s' % compress_method

  docXML = newzip.read(docfile_name)  # A file-like object

  new_docXML = parseDocXML(docXML, isString=True)

  # Create a new zip archive
  baseWOextension = os.path.splitext(path_to_doc)[0]
  outpath = baseWOextension + '_unicode.docx'
  print 'OUTPATH = %s' % outpath

  outzip = zipfile.ZipFile(outpath, 'w')  #, compress_method)
  outzip.comment = newzip.comment + ' Updated with Osage Unicode'

  # copy other things
  for info in newzip.infolist():
    if info.filename != docfile_name:
      print '  COPY %s' % info.filename
      copyfile = newzip.read(info.filename)
      outzip.writestr(info, copyfile)
    else:
      # Skipping the new data for now.
      outzip.writestr(info, new_docXML)
      print 'Adding %s' % info.filename
  outzip.printdir()
  print 'CLOSING OUTZIP'
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

  if len(sys.argv) > 1:
    path_to_doc = sys.argv[1]
  else:
    path_to_doc = 'Harry Red Eagle Track 5.docx'

  print 'PATH = ', os.path.split(path_to_doc), os.path.splitext(path_to_doc)

  extension = os.path.splitext(path_to_doc)[-1]
  baseWOextension = os.path.splitext(path_to_doc)[0]
  print 'EXTENSION = %s' % extension
  if extension == '.docx':
    processDOCX(path_to_doc)
  else:
    doc_list = parseDocXML(path_to_doc)


if __name__ == "__main__":
  main(sys.argv)
