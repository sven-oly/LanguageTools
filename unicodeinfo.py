# Functions to read and manipulate data from Unicode public data
# https://www.unicode.org/Public/15.0.0/

import sys

# Python3 vs python2
try:
    unichr
except NameError:
    unichr = chr

class UnicodeData():
    def __init__(self, filename):
        self.id = None
        self.dataLines = []
        self.chrToName = {}
        self.numToName = {}
        self.readUdataSegment(filename)
        self.fileSource = None

    def readUdataSegment(self, fileName):
        try:
            file = open(fileName, mode='r')
            self.dataLines = file.readlines()
        except BaseException as error:
            print('Cannot open %s: %s' % (fileName, error))
            
        self.fileSource = fileName
        for line in self.dataLines:
            vals = line.split(';')
            num = int(vals[0], 16)
            # char = chr(num)
            name = vals[1]
            #self.chrToName[char] = name
            self.numToName[num] = name

    # List of hex:name;hex:name
    # 0x1e800:MENDE KIKAKUI SYLLABLE M001 KI;0x1e801:MENDE KIKAKUI SYLLABLE M002 KA;
    def numTextString(self):
        text = []
        for code in self.numToName.keys():
            text.append('0x%x:%s' % (code, self.numToName[code]))
        return ';'.join(text)

def main(argv):
    print('args = %s' % argv)

    u = UnicodeData(argv[1])
    print('chars = %s' % u.chrToName.keys())

    codes = u.numToName.keys()
    print('Codes = %s' % codes)

    print(u.numTextString())

if __name__ == '__main__':
    main(sys.argv)
            
