# -*- coding: utf-8 -*-

#
# Convert list of Office files (.docx, .xslx, .pptx) files from
# old text encoding to Unicode.
# A converter object is provided.

import os
import re
import sys

import convertDoc
import convertXLS
import convertPPT

import convertUtil


def main(argv):
  return


def convertOffice(input_path, output_dir, oldConverter, oldFontList, newUnicodeFont):

  print('***** input_path = %s' % input_path)

  extension = os.path.splitext(input_path)[-1]
  if extension == '.docx':
    convertDoc.processDOCX(input_path, output_dir, oldConverter)
  elif extension == '.pptx':
    convertPPT.processOnePresentation(input_path, output_dir,
                                      oldConverter, oldFontList,
                                      newUnicodeFont)
  elif extension == '.xlsx':
    convertXLS.processOneSpreadsheet(input_path, output_dir,
                                     oldConverter, oldFontList,
                                     newUnicodeFont)
  else:
    print('!!! Not processing file type %s: %s !' % (extension, input_path))



if __name__ == "__main__":
  main(sys.argv)
