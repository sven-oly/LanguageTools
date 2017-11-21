# -*- coding: utf-8 -*-

# Convert list of Office files (.docx, .xslx, .pptx) files from
# Old Osage text to Unicode.

import os
import re
import sys

import convertDoc
import convertXLS
import convertOsagePPT

import convertUtil


def main(argv):
  args = convertUtil.parseArgs()
  UnicodeOsageFont = args.font

  paths_to_doc = args.filenames

  for path in paths_to_doc:
    extension = os.path.splitext(path)[-1]
    if extension == '.docx':
      convertDoc.processDOCX(path, args.output_dir, UnicodeOsageFont)
    elif extension == '.pptx':
      convertOsagePPT.processOnePresentation(path,
                                             UnicodeOsageFont, args.output_dir)
    elif extension == '.xlsx':
      convertXLS.processOneSpreadsheet(path, args.output_dir,
                                       UnicodeOsageFont)
    else:
      print '!!! Not processing file %s !' % path


if __name__ == "__main__":
  main(sys.argv)
