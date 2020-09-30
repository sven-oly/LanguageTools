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


def convertOffice(input_path, output_dir, converter):

  # print('***** input_path = %s' % input_path)

  if input_path.find('unicode.') > 0:
    print('This file has UNICODE in the name. Not converted!')
    return

  extension = os.path.splitext(input_path)[-1]
  if extension == '.docx':
    docxProcessor = convertDoc.convertDocx(input_path, output_dir, converter)
    docxProcessor.processDocx()
  elif extension == '.pptx':
    convertPPT.processOnePresentation(input_path, output_dir,
                                      converter)
  elif extension == '.xlsx':
    convertXLS.processOneSpreadsheet(input_path, output_dir,
                                     converter)
  else:
    print('!!! Not processing file type %s: %s !' % (extension, input_path))
