import io
import re

# Combines tagged lines with the following extended lines, separating with ZWJ.

allLines = []
infileName = '/Users/craig/Desktop/Projects/PhakeData/Phake_Dictionary_Ailot_Final.txt'

with open(infileName, 'r', encoding='latin1') as f:
    for index, line in enumerate(f):
        if line and line[0] != '\\':
            line = '\u0020\u200d' + line
            print('line to merge = %s' % line)
        allLines.append(line.replace('\n', ''))

# Try to join, then split with tags
oneBigLine = ''.join(allLines)

longLines = oneBigLine.split('\\')

outFileName = 'joined.txt'

outfile = open(outFileName, 'w', encoding='utf-8')
# Separate with newlines.
outfile.writelines('\\' + s + '\n' for s in longLines)