# -*- coding: utf-8 -*-

#
# Convert list of Office files (.docx, .xslx, .pptx) files from
# old text encoding to Unicode.

import os
import re
import sys

import convertOffice
import adlamConversion

import convertUtil

defaultOutputFont = "NotoSansAdlam-Regular"

def main(argv):

    args = convertUtil.parseArgs()
    if args.font:
      newUnicodeFont = args.font
    else:
      newUnicodeFont = defaultOutputFont

    # TODO: Handle other options?
    # Other Latin fonts to convert?


    print('** args = %s' % args)

    paths_to_doc = args.filenames

    # TODO: How to handle other Latin fonts?
    # List of [fontName, encodingScript]
    FONTS_TO_CONVERT = [
        ['Fulfulde - Aissata', 'arab'],
        ['Fulfulde - Fuuta' , 'arab'],
        ['Fulfulde - Pulaar', 'arab'],
        ['Times New Roman', 'latn'],
    ]

    converter = adlamConversion.converter(FONTS_TO_CONVERT, newUnicodeFont)

    for input in paths_to_doc:
      convertOffice.convertOffice(input, args.output_dir, converter)


if __name__ == "__main__":
  main(sys.argv)
