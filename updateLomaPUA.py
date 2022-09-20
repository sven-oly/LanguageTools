# Read a file containing escaped Unicode values
# Convert each to another value
# Update the file

import re
import sys

def addHex(m):
    # print(m.groups())
    value = m.groups()[0]
    hexIn = int(value[2:], 16)
    hexOut = hexIn + 0xf15f
    if hexIn >= 0x01ca:
        hexOut -= 1
    #print('VALUE: %s %s' % (value, value[2:]))
    print('%04x -> %04x' % (hexIn, hexOut))
    return '\\u%04x' % hexOut

def transformLine(inline):
    newLine = re.sub(r'(\\u[0-9a-fA-f][0-9a-fA-f][0-9a-fA-f][0-9a-fA-f])',
                     addHex, inline)
    if inline == newLine:
        return None
    else:
        return newLine
    
def main(args):
    infile = open('layouts/lom_Loma_PUA.js.save', 'r')
    outfile = open('layouts/lom_Loma_PUA.js', 'w')
    lineNo = 0
    numConverted = 0
    for line in infile:
        # print('%3d %s' % (lineNo, line))
        newLine = transformLine(line)
        if newLine:
            print('OLD %s' % (line))
            print('    %s' % (newLine))
            outLine = newLine
            numConverted +=1
        else:
            outLine = line
            lineNo += 1
        outfile.write('%s' % outLine)

    print('%d lines converted' % numConverted)
    infile.close()
    outfile.close()

if __name__ == "__main__":
    print('ARGS = %s' % sys.argv) 
    sys.exit(main(sys.argv))
