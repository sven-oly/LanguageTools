# Python code to readlines()
# writing to file

import js2py
import re

js2py.translate_file('phkConverter.js', 'phkConverter.py')

# Converted from JavaScript
# import phkConverter


# Using readlines()
outputLines = []
infileName = 'joined.txt'  #  Originally wasq'Phake_Dictionary_Ailot_Final.txt'
count = 0

# These
phakeFields = ['lx', 'le', 'pl', 'xv']
banchobFields = ['ph', 'pd', 'xr']
textFields = ['de', 'ge', 'xe']
eval_res, converterFile = js2py.run_file('phkConverter.js')

encodingIndex = 0

banchobMap = {
  'N': 'ŋ',
  'M': 'ñ',
  'j': 'ɛ',
  'v': 'ü',
  'z': 'ə',
  'q': 'ɔ',
  'I': 'ī',
  'E': 'ē',
  'J': 'ɛ̄',
  'V': 'ǖ',
  'Z': 'ə̄',
  'A': 'ā',
  'U': 'ū',
  'O': 'ō',
  'Q': 'ɔ̄',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '*': 'Ɯ'
}

# Replaces characters one-for-one.
def convertBanchob(intext):
    outtext = []
    for c in intext:
        out = c
        if c in banchobMap:
            result = banchobMap[c]
            if result:
                out = result
        outtext.append(out)
    return ''.join(outtext)


bracketedRe = re.compile('<(.*?)[>$]')

# Debugging
debug = False

# Called by the regex sub function.
def replaceBonchob(match):
    # < stuff >
    text = match.group()
    result = convertBanchob(text[1:-1]).strip()
    result = result.replace('banchob', '')
    if debug:
        print(' *** %s (%s) --> %s' % (match, match.span(), result))
    return result

with open(infileName, 'r', encoding='utf-8') as f:
    # Lines with '\' at the start can be continued on subsequent lines.
    fullLine = ''
    for index, line in enumerate(f):
        if index % 1000 == 0:
            print('IN  %s' % (index))

        # Process this full line
        splot = line.split(' ')  # initial parse
        tag = splot[0][1:]
        if tag == 'lx':
          outputLines.append('\n')
        if len(splot) <= 1:
            # Nothing to do
            outputLines.append(line)
        else:
            # There's content to be processed!q
            tagSize = len(tag)
            content = line[tagSize + 2:]
            if tag in phakeFields:
              content =\
                    converterFile.convertPhkToUnicode(content, encodingIndex)
                # print('\ph == %s' % convertedLine)
            elif tag in banchobFields or tag in textFields:
              content = bracketedRe.sub(replaceBonchob, content)
            # Am I missing any Bonchob?
            output = '\\' + tag + ' ' + content
            #print('OUT %s = %s' % (index, output))
            outputLines.append(output)

# Convert each line
print('%d input lines found' % len(outputLines))

# outFileName = 'Phake_Dictionary_Ailot_Final_Unicode.txt'
outFileName = 'output.txt'

outfile = open(outFileName, 'w', encoding='utf-8')
# Separate with newlines and remove extra newlines.
#outfile.writelines(s + '\n' for s in outputLines)
for s in outputLines:
  if len(s) > 0:
    out = s.replace('\u200d', '\n').rstrip()
  else:
    out = s
  if s.find('\u200d') >= 0:
    print('output = %s\n         %s' % (s, out))
  outfile.write(out + '\n')
#
outfile.close()
