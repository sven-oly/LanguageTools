# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Chakmak encoded text to Unicode.

debug = True  #False

# Mappings for both arjyban, sujoyan, alaam, etc. encodings.
FONTS_TO_CONVERT = {
    'Arjyban': 0,
    'Arjyaban Normal': 0,
    'Arjyaban CN': 0,
    'Sujoyan': 1,
    'Alaam': 2,
    }

private_use_map = {
  u'\u0000': [u'\u0020', u'\u0000', u'\u0000'],  # null
  u'\u0009': [u'\u0009', u'\u0009'],  # horizontal tab
  u'\u000D': [u'\u000D', u'\u0000'],  # Carriage return
  u'\u0020': [' ', ' ', ' '],  # Space
  u'\u0023': [u'\uD804\uDD42', u'\u003b', u'\uD804\uDD33\uD804\uDD05'],  # #
  u'\u0024': [u'\uD804\uDD41', ' ', u'\uD804\uDD14'],  # $
  u'\u0025': [u'\u0025', u'\u0025', u'\ud804\udd33\ud804\udd22\ud804\udd2a'],  # %
  u'\u0026': [u'\uD804\uDD00', u'\u0026'],  # &
  u'\u0027': [u'\u0027', u'\u0027', u'\u0027'],  # '
  u'\u002a': [u'\uD804\uDD33\uD804\uDD23', u'\u0000',
             u'\uD804\uDD33\uD804\uDD05'],  # *
  u'\u0030': [u'\uD804\uDD36', u'\uD804\uDD36', u'\uD804\uDD36'],  # 0
  u'\u0031': [u'\uD804\uDD37', u'\uD804\uDD37', u'\uD804\uDD37'],  # 1
  u'\u0032': [u'\uD804\uDD38', u'\uD804\uDD38', u'\uD804\uDD38'],  # 2
  u'\u0033': [u'\uD804\uDD39', u'\uD804\uDD39', u'\uD804\uDD39'],  # 3
  u'\u0034': [u'\uD804\uDD3a', u'\uD804\uDD3a', u'\uD804\uDD3a'],  # 4
  u'\u0035': [u'\uD804\uDD3b', u'\uD804\uDD3b', u'\uD804\uDD3b'],  # 5
  u'\u0036': [u'\uD804\uDD3c', u'\uD804\uDD3c', u'\uD804\uDD3c'],  # 6
  u'\u0037': [u'\uD804\uDD3d', u'\uD804\uDD3d', u'\uD804\uDD3d'],  # 7
  u'\u0038': [u'\uD804\uDD3e', u'\uD804\uDD3e', u'\uD804\uDD3e'],  # 8
  u'\u0039': [u'\uD804\uDD3f', u'\uD804\uDD3f', u'\uD804\uDD3f'],  # 9
  u'\u003a': [u'\u003a', u'\u003a', ':'],  # colon
  u'\u003b': [u'\u003b', u'\ud804\udd1f', u'\ud804\udd34'],  # semicolon
  u'\u003c': [u'\u003c', u'\ud804\udd13', '<'],  # <
  u'\u003d': [u'\u003d', u'\u003d', '='],  # =
  u'\u003e': [u'\u003e', u'\ud804\udd12', '>'],  # >
  u'\u003f': [u'\u003f', u'\u003f', '?'],  # ?
  u'\u0040': [u'\uD804\uDD04', '-', u'\ud804\udd33\ud804\udd05'],  # @
  u'\u0041': [u'\ud804\udd06', u'\ud804\udd33\ud804\udd05', u'\ud804\udd03'],  # A
  u'\u0042': [u'\uD804\uDD33\uD804\uDD23', u'\uD804\uDD41', u'\ud804\udd43'],  # B
  u'\u0043': [u'\uD804\uDD0d', u'\uD804\uDD33\uD804\uDD05',
             u'\ud804\udd33\ud804\udd26'],  # C
  u'\u0044': [u'\uD804\uDD19', u'\uD804\uDD2c', u'\ud804\udd32'],  # D
  u'\u0045': [u'\uD804\uDD29', u'\uD804\uDD2a', u'\uD804\uDD33\uD804\uDD04'],  # E
  u'\u0046': [u'\ud804\udd03', u'\ud804\udd00', u'\uD804\uDD33\uD804\uDD06'],  # F
  u'\u0047': [u'\ud804\udd0a', u'\ud804\udd01\ud804\udd28', u'\uD804\udd06'],  # G
  u'\u0048': [u'\uD804\uDD33\ud804\udd26', u'\uD804\uDD33\ud804\udd26', u'\ud804\udd30'],  # H
  u'\u0049': [u'\uD804\uDD2d', u'\uD804\uDD27', u'\ud804\udd2e'],  # I
  u'\u004a': [u'\ud804\udd0f', u'\ud804\udd33\uD804\uDD20', u'\ud804\udd2f'],  # J
  u'\u004b': [u'\ud804\udd08', u'\ud804\udd33\ud804\udd1a', u'\ud804\udd07'],  # K
  u'\u004c': [u'\ud804\udd26\ud804\udd33\ud804\udd23', u'\ud804\udd33\ud804\udd22\ud804\udd2a', u'\ud804\udd08'],  # L
  u'\u004d': [u'\uD804\uDD34', u'\uD804\uDD24', u'\ud804\udd09'],  # M
  u'\u004e': [u'\uD804\uDD15', u'\uD804\uDD33\ud804\udd26\ud804\udd2a', u'\ud804\udd0a'],  #N
  u'\u004f': [u'\uD804\uDD27\uD804\uDD32', u'\uD804\uDD28', u'\ud804\udd0b'],  # O
  u'\u0050': [u'\uD804\uDD04', u'\uD804\uDD2d', u'\ud804\udd0c'],  #P
  u'\u0051': [u'\uD804\uDD12', u'\uD804\uDD33\uD804\uDD03', u'\ud804\udd0d'],  #Q
  u'\u0052': [u'\ud804\udd33\ud804\udd22', u'\ud804\udd33\ud804\udd04', u'\ud804\udd0e'],  # R
  u'\u0053': [u'\uD804\uDD05', u'\uD804\uDD01', u'\ud804\udd0f'],  # S
  u'\u0054': [u'\uD804\uDD17', u'\uD804\uDD26', u'\ud804\udd10'],  #T
  u'\u0055': [u'\uD804\uDD2b', u'\uD804\uDD34', u'\ud804\udd11'],  # U
  u'\u0056': [u'\uD804\uDD0b', u'\ud804\udd33\uD804\uDD20', u'\ud804\udd12'],  # V
  u'\u0057': [u'\uD804\uDD31', u'\uD804\uDD31', u'\ud804\udd13'],  #W
  u'\u0058': [u'\uD804\uDD14', u'\uD804\uDd2c', u'\ud804\udd14'],  # X
  u'\u0059': [u'\uD804\uDD10', u'\uD804\uDD33\uD804\uDD06', u'\ud804\udd15'],  #Y
  u'\u005a': [u'\ud804\udd33\ud804\udd20', u'\ud804\udd05', u'\ud804\udd16'],  # Z
  u'\u005b': ['[', '[', '['],  # [
  u'\u005c': [u'\ud804\udd1d\ud804\udd33\ud804\udd1d\ud804\udd33\ud804\udd1d',
             u'\u005c', ';'],  # backslash
  u'\u005d': [u'\u005d', u'\u005d', ']'],  # ]
  u'\u005e': [u'\uD804\uDD33\uD804\uDD1a', u'\uD804\uDD26',
             u'\uD804\uDD33\uD804\uDD03'],  # ^
  u'\u005f': [u'\uD804\uDD34', u'\uD804\uDD34', u'\ud804\udd17'],  # _
  u'\u0060': [u'\uD804\uDD01', '\`', u'\ud804\udd18'],  # `
  u'\u0061': [u'\uD804\uDD2c', u'\uD804\uDD07', u'\ud804\udd19'],  # a
  u'\u0062': [u'\uD804\uDD1d', u'\uD804\uDD25', u'\ud804\udd1a'],  # b
  u'\u0063': [u'\uD804\uDD0c', u'\uD804\uDD0d', u'\ud804\udd1b'],  # c
  u'\u0064': [u'\uD804\uDD18', u'\uD804\uDD1e', u'\ud804\udd1c'],  # d
  u'\u0065': [u'\uD804\uDD28', u'\uD804\uDD1b', u'\ud804\udd1d'],  # e
  u'\u0066': [u'\uD804\uDD1c', u'\uD804\uDD0b', u'\ud804\udd1e'],  # f
  u'\u0067': [u'\uD804\uDD09', u'\uD804\uDD1a', u'\ud804\udd1f'],  # g
  u'\u0068': [u'\uD804\uDD26', u'\uD804\uDD22', u'\ud804\udd21'],  # h
  u'\u0069': [u'\uD804\uDD27', u'\uD804\uDD1c', u'\ud804\udd22'],  # i
  u'\u006a': [u'\uD804\uDD0e', u'\uD804\uDD1d', u'\ud804\udd23'],  # j
  u'\u006b': [u'\uD804\uDD07', u'\uD804\uDD0c', u'\ud804\udd33\ud804\udd26'],  # k
  u'\u006c': [u'\uD804\uDD23', u'\uD804\uDD26\uD804\uDD33\uD804\uDD23',
             u'\ud804\udd33\ud804\udd1a'],  # l
  u'\u006d': [u'\uD804\uDD1f', u'\uD804\uDD0a', u'\ud804\udd25'],  # m
  u'\u006e': [u'\uD804\uDD1a', u'\uD804\uDD20', u'\ud804\udd26'],  # n
  u'\u006f': [u'\uD804\uDD2e', u'\uD804\uDD16', u'\ud804\udd24'],  # o
  u'\u0070': [u'\uD804\uDD1b', u'\uD804\uDD08', u'\ud804\udd05'],  # p
  u'\u0071': [u'\uD804\uDD11', u'\uD804\uDD03', u'\ud804\udd20'],  # q
  u'\u0072': [u'\uD804\uDD22', u'\uD804\uDD09', u'\uD804\uDD26\uD804\uDD33\uD804\uDD23'],  # r
  u'\u0073': [u'\uD804\uDD25', u'\uD804\uDD0e', u'\ud804\udd01'],  # s
  u'\u0074': [u'\uD804\uDD16', u'\uD804\uDD23', u'\ud804\udd02'],  # t
  u'\u0075': [u'\uD804\uDD2a', u'\uD804\uDD18', u'\ud804\udd03'],  # u
  u'\u0076': [u'\uD804\uDD1e', u'\uD804\uDD17', u'\ud804\udd27'],  # v
  u'\u0077': [u'\uD804\uDD24', u'\uD804\uDD19', u'\ud804\udd28'],  # w
  u'\u0078': [u'\uD804\uDD13', u'\uD804\uDD11', u'\ud804\udd29'],  # x
  u'\u0079': [u'\uD804\uDD20', u'\uD804\uDD0f', u'\uD804\uDD2a'],  # y
  u'\u007a': [u'\uD804\uDD21', u'\uD804\uDD14', u'\uD804\uDD2a'],  # z
  u'\u007c': [u'\uD804\uDD33\ud804\udd03', u'\uD804\uDD41', u'\uD804\uDD41'],  # |
  u'\u007e': [u'\uD804\uDD02', '~', u'\uD804\uDD2b'],  # ~
  u'\u00a1': [' ', ' ', u'\ud804\udd1d'],
  u'\u00a2': [' ', ' ', u'\ud804\udd1e'],
  u'\u00a3': [' ', u'\ud804\udd1a\ud804\udd33\ud804\udd1a',
             u'\ud804\udd1e'],  # registered TM symbol
  u'\u00a4': [' ', ' ', u'\ud804\udd1f'],
  u'\u00a5': [' ', ' ', u'\ud804\udd20'],
  u'\u00a6': [' ', ' ', u'\ud804\udd1d'],
  u'\u00a7': [' ', ' ', u'\ud804\udd07'],
  u'\u00a8': [' ', ' ', u'\ud804\udd33\ud804\udd20'],
  u'\u00a9': [' ', ' ', u'\ud804\udd31'],  # Copyright
  u'\u00aa': [' ', ' ', u'\ud804\udd33\ud804\udd22'],
  u'\u00ab': [' ', ' ', u'\ud804\udd33\ud804\udd22'],
  u'\u00ac': [' ', ' ', u'\ud804\udd01\ud804\udd28'],
  u'\u00ae': [' ', u'\ud804\udd29'],  # registered Circle
  u'\u00af': [' ', ' ', u'\ud804\udd25'],  # registered Circle
  u'\u00b0': ['', ' ', u'\ud804\udd07' ],
  u'\u00b1': ['', ' ', u'\ud804\udd07' ],
  u'\u00b2': ['', ' ', u'\ud804\udd21' ],    # TODO!
  u'\u00b3': ['', ' ', '<' ],
  u'\u00b4': ['', u'\uD804\uDD34'],  # accute accent ? Should this be under?
  u'\u00b5': ['', u'\uD804\udd33\uD804\udd16', u'\ud804\udd07' ],  # micro sign
  u'\u00b6': ['', ' ', u'\uD804\udd06\uD804\udd33\uD804\udd06'],
  u'\u00b7': ['', ' ', u'\ud804\udd07' ],  # micro sign
  u'\u00b8': [' ', ' ', u'\ud804\udd09'],
  u'\u00ba': [' ', ' ', u'\ud804\udd2a\ud804\udd33\ud804\udd26'],
  u'\u00be': [' ', ' ', u'\ud804\udd40'],
  u'\u00bf': [' ', ' ', u'\ud804\udd16'],
  u'\u00c1': [' ', ' ', u'\ud804\udd33\ud804\udd26'],
  u'\u00c5': ['', u'\uD804\udd10'],  # A ring
  u'\u00c7': ['', u'\uD804\udd15'],  # C cedilla
  u'\u00c9': [' ', ' ', u'\u00f7'],  # Division
  u'\u00cb': [' ', ' ', '>'],
  u'\u00cc': [' ', ' ', u'\ud804\udd17'],
  u'\u00cd': [' ', ' ', u'\ud804\udd0e'],
  u'\u00ce': [' ', ' ', u'\ud804\udd16'],
  u'\u00cf': [' ', ' ', u'\ud804\udd16'],
  u'\u00ce': [' ', ' ', u'\ud804\udd16'],
  u'\u00d0': [' ', ' ', '-'],
  u'\u00d1': [' ', ' ', u'\ud804\udd40'],
  u'\u00d2': [' ', ' ', '\"'],
  u'\u00d3': ['', '', u'\uD804\udd42'],  #
  u'\u00d4': ['', '', ';'],  #
  u'\u00d5': ['', '', '\''],  #
  u'\u00d6': [' ', ' ', u'\ud804\udd33\ud804\udd22'],
  u'\u00d8': [' ', ' ', u'\ud804\udd28\ud804\udd34'],
  u'\u00d9': ['', u'\uD804\udd2b', u'\uD804\udd43'],
  u'\u00da': ['', u'\uD804\udd2b', u'\uD804\udd10'],
  u'\u00db': ['', u'\uD804\udd2b'],  # TODO!
  u'\u00dc': ['', u'\uD804\udd2b', u'\uD804\udd04'],
  u'\u00de': ['', u'\uD804\udd00\ud804\udd02', u'\uD804\udd02\ud804\udd00'],
  u'\u00df': ['', u'\uD804\udd2b', u'\u00d7'],  # multiplication

  u'\u00e0': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd07',
             u'\ud804\udd33\ud804\udd05'],
  u'\u00e1': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd07',
            u'\ud804\udd2a\ud804\udd33\ud804\udd22'],  #
  u'\u00e2': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd1c',
            u'\uD804\udd28\ud804\udd02'],  #
  u'\u00e3': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd1f', u'\uD804\udd0d'],
  u'\u00e4': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd16', u'\ud804\udd15'],
  u'\u00e5': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd17',
            u'\ud804\udd1e'],  #
  u'\u00e6': ['', ' ', u'\ud804\udd28'],
  u'\u00e7': ['', ' ', u'\ud804\udd11'],
  u'\u00e8': ['', u'\uD804\udd28\uD804\udd34', u'\ud804\udd1a'],  # A with ring
  u'\u00e9': ['', ' ', u'\ud804\udd01\ud804\udd00'],  #
  u'\u00ea': ['', u'\uD804\udd06'],  #
  u'\u00eb': ['', u'\uD804\udd06\uD804\udd33\uD804\udd06',
             u'\ud804\udd01\ud804\udd28'],
  u'\u00ec': ['', u'\uD804\udd07\ud804\udd33\uD804\udd08', ' '],  # TODO
  u'\u00ed': ['', u'\uD804\udd07\ud804\udd33\uD804\udd07', ' '],  # TODO
  u'\u00ee': ['', u'\uD804\udd07\ud804\udd33\uD804\udd0c', u'\uD804\udd23'],  #
  u'\u00ef': ['', u'\uD804\udd07\ud804\udd33\uD804\udd0d', ' '],  # TODO

  u'\u00f0': ['', ' ', u'\uD804\udd0f'],
  u'\u00f1': ['', u'\uD804\udd07\ud804\udd33\uD804\udd0e', u'\uD804\udd22'],
  u'\u00f2': ['', u'\uD804\udd07\ud804\udd33\uD804\udd12', '%'],  #
  u'\u00f3': ['', u'\uD804\udd07\ud804\udd33\uD804\udd0f', u'\uD804\udd21'],  #
  u'\u00f4': ['', u'\uD804\udd07\ud804\udd33\uD804\udd16', ' '],  #
  u'\u00f5': ['', u'\uD804\udd07\ud804\udd33\uD804\udd23', u'\uD804\udd12'],  #
  u'\u00f6': ['', u'\uD804\udd07\ud804\udd33\uD804\udd17', u'\uD804\udd11'],  #
  u'\u00f7': ['', ' ', u'\uD804\udd11'],
  u'\u00f8': ['', ' ', u'\uD804\udd28\ud804\udd00'],
  u'\u00f9': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd0c', u'\uD804\udd25'],

  u'\u00fa': ['', u'\uD804\udd0c\ud804\udd33\uD804\udd25', u'\uD804\udd1b'],
  u'\u00fb': ['', u'\uD804\udd16\ud804\udd33\uD804\udd16', u'\ud804\udd26'],
  u'\u00fc': ['', u'\uD804\udd1b\ud804\udd33\uD804\udd1b', u'\ud804\udd26'],
  u'\u00fd': ['', ' ', u'\ud804\udd26'],  #
  u'\u00fe': ['', ' ', u'\u00d7'],  #
  u'\u00ff': ['', u'\uD804\udd20', u'\uD804\udd06\uD804\udd33\uD804\udd06'],

  u'\u0152': [' ', '~', u'\uD804\uDD07'],
  u'\u0153': [' ', '~', u'\uD804\uDD1a'],
  u'\u0160': [' ', '~', u'\uD804\uDD2f'],
  u'\u0160': [' ', '~', u'\uD804\uDD2f'],
  u'\u0178': [' ', '~', u'\uD804\uDD1d'],
  u'\u017d': [' ', '~', u'\u00d7'],
  u'\u017e': [' ', '~', u'\ud804\udd04'],
  u'\u0192': [' ', '~', u'\uD804\uDD2b'],

  u'\u02c6': [' ', ' ', u'\uD804\uDD2e'],

  u'\u2013': [' ', '~', u'\uD804\uDD2a'],
  u'\u2014': [' ', ' ', ' '],
  u'\u2018': [' ', '~', u'\uD804\uDD16'],
  u'\u2019': [' ', ' ', ' '],
  u'\u201a': [' ', '~', u'\uD804\uDD2b'],
  u'\u201c': [' ', '~', u'\uD804\uDD2a'],
  u'\u201d': [' ', ' ', u'\uD804\uDD2c'],
  u'\u201e': [' ', ' ', u'\uD804\uDD2d'],
  u'\u2020': [' ', ' ', u'\uD804\uDD2c'],
  u'\u2021': [' ', ' ', u'\uD804\uDD2c'],
  u'\u2022': [' ', u'\uD804\uDD32', u'\ud804\udd0b'],
  u'\u2026': [' ', ' ', u'\uD804\uDD2d'],
  u'\u2030': [' ', ' ', u'\uD804\uDD30'],
  u'\u2039': [' ', ' ', u'\uD804\uDD07'],
  u'\u203a': [' ', ' ', ' '],
  u'\u203c': [' ', ' ', ' '],
  u'\u20ac': [' ', ' ', u'\u00f7'], # division
  u'\u2122': [u'\u0000', u'\uD804\uDD33\ud804\udd26\ud804\udd31', ' '],
  u'\u2202': [u'\u0000', u'\ud804\udd33\ud804\udd0c'],
  u'\u2260': [u'\u0000', u'\u25cc'], # ≠ --> "dotted circle"
}


def preParseOld(instring):
    outList = instring
    return outList

def oldEncodingToUnicode(textIn, encodingFont):
  convertResult = u''
  outputIsUTF16 = True

  print ('Font = %s' % (encodingFont ))
  if encodingFont in FONTS_TO_CONVERT:
    encodingIndex = FONTS_TO_CONVERT[encodingFont]
  else:
    # None of the above. Return the input
    return textIn
 
  print ('Processing font = %s, encoding index = %s' % (encodingFont, encodingIndex))
  parsedInput = preParseOld(textIn)
  if debug:
    print('&&&& Text in = >%s<' % textIn)
    print('&&& Convert parsed input = %s' % parsedInput)

  if not parsedInput:
    return ''

  for index in xrange(len(parsedInput)):
    print ('index = %s, encodingIndex = %s' % (index, encodingIndex))
    c = parsedInput[index]

    out = c
    if c in private_use_map:
      out = private_use_map[c][encodingIndex];
    convertResult += out

  print ('result = %s' % convertResult)
  return convertResult


def testConvert():
  return


def main():
  testConvert()


if __name__ == '__main__':
    main()
