# -*- coding: utf-8 -*-

#
# Convert list of Office files (.docx, .xslx, .pptx) files from
# old text encoding to Unicode.

import os
import re
import sys

import convertOffice
import oneConversion

import convertUtil


def main(argv):

  args = convertUtil.parseArgs()
  newUnicodeFont = "NotoSans-Regular"
  print '** args = %s' % args

  paths_to_doc = args.filenames

  print('Args = %s'% args)

  FONTS_TO_CONVERT = ['Oneida', ]

  for input in paths_to_doc:
    convertOffice.convertOffice(input, args.output_dir,
                                oneConversion.oldEncodingToUnicode,
                                FONTS_TO_CONVERT, newUnicodeFont)

if __name__ == "__main__":
  main(sys.argv)
