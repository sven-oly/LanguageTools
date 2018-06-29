# -*- coding: utf-8 -*-

#
# Convert list of Office files (.docx, .xslx, .pptx) files from
# old text encoding to Unicode.

import os
import re
import sys

import convertDoc
import convertXLS
import convertPPT

import convertUtil


def main(argv):
  return


def convertOffice(input_path, output_dir, oldConverterFunc, oldFontList, newUnicodeFont):

  args = convertUtil.parseArgs()
  UnicodeOsageFont = args.font
  print '** args = %s' % args

  paths_to_doc = args.filenames

  for path in paths_to_doc:
    extension = os.path.splitext(path)[-1]
    if extension == '.docx':
      convertDoc.processDOCX(input_path, output_dir,
                             oldConverterFunc, oldFontList,
                             newUnicodeFont)
    elif extension == '.pptx':
      convertPPT.processOnePresentation(input_path, output_dir,
                                        oldConverterFunc, oldFontList,
                                        newUnicodeFont)
    elif extension == '.xlsx':
      convertXLS.processOneSpreadsheet(input_path, output_dir,
                                       oldConverterFunc, oldFontList,
                                       newUnicodeFont)
    else:
      print '!!! Not processing file %s !' % input_path



if __name__ == "__main__":
  main(sys.argv)
