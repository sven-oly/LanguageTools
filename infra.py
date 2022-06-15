# -*- coding: utf-8 -*-
# !/usr/bin/env python
#

import glob
import os
import re
import sys

services = ['Home', 'keyboard', 'converter', 'convertUI', 'downloads', 'encodingRules',
            'diacritic', 'wordsearch', 'calendar'
            ]
            
pyFiles = glob.glob('*.py')

print(pyFiles)

for f in pyFiles:
    print(f)
    i = 0  # line
    with open(f) as f:
        lines = f.readlines()

        for line in lines:
            match = re.match(r'Language = \W+(\w+)\W+', line)
            if match:
                print('match" %s' % match.groups())
            if re.search('Language =', line):
                langName = line
                print(langName)
            if re.search('LanguageCode =', line):
                langCode = line
                print(langCode)
            pattern = 'Handler'
            pattern = "\('/"
            # Find line with "WSGIApplication"
            if re.search(pattern, line):
                print('%d: %s' % (i, line))
            i += 1
    # TODO: record the handlers for each
    
