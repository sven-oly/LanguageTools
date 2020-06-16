# -*- coding: utf-8 -*-

#
# Convert list of Office files (.docx, .xslx, .pptx) files from
# old text encoding to Unicode.

import os
import re
import sys

import adlamConversion
import convertOffice

# For conversion from Arabic encoding
# import adlamConversion

import convertUtil

defaultOutputFont = "Noto Sans Adlam New"

def main(argv):

    args = convertUtil.parseArgs()
    if args.font:
      newUnicodeFont = args.font
    else:
      newUnicodeFont = defaultOutputFont

    # Other Latin fonts to convert?
    paths_to_doc = args.filenames

    # List of [fontName, encodingScript]
    FONTS_TO_CONVERT = [
        ['Fulfulde - Aissata', 'arab'],
        ['Fulfulde - Fuuta' , 'arab'],
        ['Fulfulde - Pulaar', 'arab'],
        ['Times New Roman', 'latn'],
    ]

    converter = adlamConversion.converter()  # FONTS_TO_CONVERT, newUnicodeFont)
    # Set up parameters for conversion
    converter.lower_mode = args.lower
    converter.sentence_mode = args.sentence

    for input in paths_to_doc:
      convertOffice.convertOffice(input, args.output_dir, converter)


if __name__ == "__main__":
  main(sys.argv)
