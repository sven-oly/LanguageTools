// Convert from old font-encoding Anangu/Yolngu text to Unicode forms:
const langConverter = new langConverterClass('ccp', 'Chakma');

// Mappings for both arjyban, sujoyan, alaam, etc. encodings.
langConverter.map_encoding_names = map_encoding_names = [
  'Arjyban', 'Sujoyan', 'Alaam'];

langConverter.encoding_data = {
    'Arjyban': {index:0, outputEncoding:'Unicode', outputScript:'Chakma'},
    // Are they the same code points?
    'Sujoyan': {index:1, outputEncoding:'Unicode', outputScript:'Chakma'},
    'Alaam': {index:1, outputEncoding:'Unicode', outputScript:'Chakma'},
};

private_use_map_combined = {
  '\u0000': ['\u0020', '\u0000', '\u0000'],  // null
  '\u0009': ['\u0009', '\u0009'],  // horizontal tab
  '\u000D': ['\u000D', '\u0000'],  // Carriage return
  '\u0020': [' ', ' ', ' '],  // Space
  '\u0023': ['\uD804\uDD42', '\u003b', '\uD804\uDD33\uD804\uDD05'],  // #
  '\u0024': ['\uD804\uDD41', ' ', '\uD804\uDD14'],  // $
  '\u0025': ['\u0025', '\u0025', '\ud804\udd33\ud804\udd22\ud804\udd2a'],  // %
  '\u0026': ['\uD804\uDD00', '\u0026'],  // &
  '\u0027': ['\u0027', '\u0027', '\u0027'],  // '
  '\u002a': ['\uD804\uDD33\uD804\uDD23', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *
  '\u0030': ['\uD804\uDD36', '\uD804\uDD36', '\uD804\uDD36'],  // 0
  '\u0031': ['\uD804\uDD37', '\uD804\uDD37', '\uD804\uDD37'],  // 1
  '\u0032': ['\uD804\uDD38', '\uD804\uDD38', '\uD804\uDD38'],  // 2
  '\u0033': ['\uD804\uDD39', '\uD804\uDD39', '\uD804\uDD39'],  // 3
  '\u0034': ['\uD804\uDD3a', '\uD804\uDD3a', '\uD804\uDD3a'],  // 4
  '\u0035': ['\uD804\uDD3b', '\uD804\uDD3b', '\uD804\uDD3b'],  // 5
  '\u0036': ['\uD804\uDD3c', '\uD804\uDD3c', '\uD804\uDD3c'],  // 6
  '\u0037': ['\uD804\uDD3d', '\uD804\uDD3d', '\uD804\uDD3d'],  // 7
  '\u0038': ['\uD804\uDD3e', '\uD804\uDD3e', '\uD804\uDD3e'],  // 8
  '\u0039': ['\uD804\uDD3f', '\uD804\uDD3f', '\uD804\uDD3f'],  // 9
  '\u003a': ['\u003a', '\u003a', ':'],  // colon
  '\u003b': ['\u003b', '\ud804\udd1f', '\ud804\udd34'],  // semicolon
  '\u003c': ['\u003c', '\ud804\udd13', '<'],  // <
  '\u003d': ['\u003d', '\u003d', '='],  // =
  '\u003e': ['\u003e', '\ud804\udd12', '>'],  // >
  '\u003f': ['\u003f', '\u003f', '?'],  // ?
  '\u0040': ['\uD804\uDD04', '-', '\ud804\udd33\ud804\udd05'],  // @
  '\u0041': ['\ud804\udd06', '\ud804\udd33\ud804\udd05', '\ud804\udd03'],  // A
  '\u0042': ['\uD804\uDD33\uD804\uDD23', '\uD804\uDD41', '\ud804\udd43'],  // B
  '\u0043': ['\uD804\uDD0d', '\uD804\uDD33\uD804\uDD05',
	     '\ud804\udd33\ud804\udd26'],  // C
  '\u0044': ['\uD804\uDD19', '\uD804\uDD2c', '\ud804\udd32'],  // D
  '\u0045': ['\uD804\uDD29', '\uD804\uDD2a', '\uD804\uDD33\uD804\uDD04'],  // E
  '\u0046': ['\ud804\udd03', '\ud804\udd00', '\uD804\uDD33\uD804\uDD06'],  // F
  '\u0047': ['\ud804\udd0a', '\ud804\udd01\ud804\udd28', '\uD804\udd06'],  // G
  '\u0048': ['\uD804\uDD33\ud804\udd26', '\uD804\uDD33\ud804\udd26', '\ud804\udd30'],  // H
  '\u0049': ['\uD804\uDD2d', '\uD804\uDD27', '\ud804\udd2e'],  // I
  '\u004a': ['\ud804\udd0f', '\ud804\udd33\uD804\uDD20', '\ud804\udd2f'],  // J
  '\u004b': ['\ud804\udd08', '\ud804\udd33\ud804\udd1a', '\ud804\udd07'],  // K
  '\u004c': ['\ud804\udd26\ud804\udd33\ud804\udd23', '\ud804\udd33\ud804\udd22\ud804\udd2a', '\ud804\udd08'],  // L
  '\u004d': ['\uD804\uDD34', '\uD804\uDD24', '\ud804\udd09'],  // M
  '\u004e': ['\uD804\uDD15', '\uD804\uDD33\ud804\udd26\ud804\udd2a', '\ud804\udd0a'],  //N
  '\u004f': ['\uD804\uDD27\uD804\uDD32', '\uD804\uDD28', '\ud804\udd0b'],  // O
  '\u0050': ['\uD804\uDD04', '\uD804\uDD2d', '\ud804\udd0c'],  //P
  '\u0051': ['\uD804\uDD12', '\uD804\uDD33\uD804\uDD03', '\ud804\udd0d'],  //Q
  '\u0052': ['\ud804\udd33\ud804\udd22', '\ud804\udd33\ud804\udd04', '\ud804\udd0e'],  // R
  '\u0053': ['\uD804\uDD05', '\uD804\uDD01', '\ud804\udd0f'],  // S
  '\u0054': ['\uD804\uDD17', '\uD804\uDD26', '\ud804\udd10'],  //T
  '\u0055': ['\uD804\uDD2b', '\uD804\uDD34', '\ud804\udd11'],  // U
  '\u0056': ['\uD804\uDD0b', '\ud804\udd33\uD804\uDD20', '\ud804\udd12'],  // V
  '\u0057': ['\uD804\uDD31', '\uD804\uDD31', '\ud804\udd13'],  //W
  '\u0058': ['\uD804\uDD14', '\uD804\uDd2c', '\ud804\udd14'],  // X
  '\u0059': ['\uD804\uDD10', '\uD804\uDD33\uD804\uDD06', '\ud804\udd15'],  //Y
  '\u005a': ['\ud804\udd33\ud804\udd20', '\ud804\udd05', '\ud804\udd16'],  // Z
  '\u005b': ['[', '[', '['],  // [
  '\u005c': ['\ud804\udd1d\ud804\udd33\ud804\udd1d\ud804\udd33\ud804\udd1d',
	     '\u005c', ';'],  // backslash
  '\u005d': ['\u005d', '\u005d', ']'],  // ]
  '\u005e': ['\uD804\uDD33\uD804\uDD1a', '\uD804\uDD26',
	     '\uD804\uDD33\uD804\uDD03'],  // ^
  '\u005f': ['\uD804\uDD34', '\uD804\uDD34', '\ud804\udd17'],  // _
  '\u0060': ['\uD804\uDD01', '\`', '\ud804\udd18'],  // `
  '\u0061': ['\uD804\uDD2c', '\uD804\uDD07', '\ud804\udd19'],  // a
  '\u0062': ['\uD804\uDD1d', '\uD804\uDD25', '\ud804\udd1a'],  // b
  '\u0063': ['\uD804\uDD0c', '\uD804\uDD0d', '\ud804\udd1b'],  // c
  '\u0064': ['\uD804\uDD18', '\uD804\uDD1e', '\ud804\udd1c'],  // d
  '\u0065': ['\uD804\uDD28', '\uD804\uDD1b', '\ud804\udd1d'],  // e
  '\u0066': ['\uD804\uDD1c', '\uD804\uDD0b', '\ud804\udd1e'],  // f
  '\u0067': ['\uD804\uDD09', '\uD804\uDD1a', '\ud804\udd1f'],  // g
  '\u0068': ['\uD804\uDD26', '\uD804\uDD22', '\ud804\udd21'],  // h
  '\u0069': ['\uD804\uDD27', '\uD804\uDD1c', '\ud804\udd22'],  // i
  '\u006a': ['\uD804\uDD0e', '\uD804\uDD1d', '\ud804\udd23'],  // j
  '\u006b': ['\uD804\uDD07', '\uD804\uDD0c', '\ud804\udd33\ud804\udd26'],  // k
  '\u006c': ['\uD804\uDD23', '\uD804\uDD26\uD804\uDD33\uD804\uDD23',
	     '\ud804\udd33\ud804\udd1a'],  // l
  '\u006d': ['\uD804\uDD1f', '\uD804\uDD0a', '\ud804\udd25'],  // m
  '\u006e': ['\uD804\uDD1a', '\uD804\uDD20', '\ud804\udd26'],  // n
  '\u006f': ['\uD804\uDD2e', '\uD804\uDD16', '\ud804\udd24'],  // o
  '\u0070': ['\uD804\uDD1b', '\uD804\uDD08', '\ud804\udd05'],  // p
  '\u0071': ['\uD804\uDD11', '\uD804\uDD03', '\ud804\udd20'],  // q
  '\u0072': ['\uD804\uDD22', '\uD804\uDD09', '\uD804\uDD26\uD804\uDD33\uD804\uDD23'],  // r
  '\u0073': ['\uD804\uDD25', '\uD804\uDD0e', '\ud804\udd01'],  // s
  '\u0074': ['\uD804\uDD16', '\uD804\uDD23', '\ud804\udd02'],  // t
  '\u0075': ['\uD804\uDD2a', '\uD804\uDD18', '\ud804\udd03'],  // u
  '\u0076': ['\uD804\uDD1e', '\uD804\uDD17', '\ud804\udd27'],  // v
  '\u0077': ['\uD804\uDD24', '\uD804\uDD19', '\ud804\udd28'],  // w
  '\u0078': ['\uD804\uDD13', '\uD804\uDD11', '\ud804\udd29'],  // x
  '\u0079': ['\uD804\uDD20', '\uD804\uDD0f', '\uD804\uDD2a'],  // y
  '\u007a': ['\uD804\uDD21', '\uD804\uDD14', '\uD804\uDD2a'],  // z
  '\u007c': ['\uD804\uDD33\ud804\udd03', '\uD804\uDD41', '\uD804\uDD41'],  // |
  '\u007e': ['\uD804\uDD02', '~', '\uD804\uDD2b'],  // ~
  '\u00a1': [' ', ' ', '\ud804\udd1d'],
  '\u00a2': [' ', ' ', '\ud804\udd1e'],
  '\u00a3': [' ', '\ud804\udd1a\ud804\udd33\ud804\udd1a',
	     '\ud804\udd1e'],  // registered TM symbol
  '\u00a4': [' ', ' ', '\ud804\udd1f'],
  '\u00a5': [' ', ' ', '\ud804\udd20'],
  '\u00a6': [' ', ' ', '\ud804\udd1d'],
  '\u00a7': [' ', ' ', '\ud804\udd07'],
  '\u00a8': [' ', ' ', '\ud804\udd33\ud804\udd20'],
  '\u00a9': [' ', ' ', '\ud804\udd31'],  // Copyright
  '\u00aa': [' ', ' ', '\ud804\udd33\ud804\udd22'],
  '\u00ab': [' ', ' ', '\ud804\udd33\ud804\udd22'],
  '\u00ac': [' ', ' ', '\ud804\udd01\ud804\udd28'],
  '\u00ae': [' ', '\ud804\udd29'],  // registered Circle
  '\u00af': [' ', ' ', '\ud804\udd25'],  // registered Circle
  '\u00b0': ['', ' ', '\ud804\udd07' ],
  '\u00b1': ['', ' ', '\ud804\udd07' ],
  '\u00b2': ['', ' ', '\ud804\udd21' ],    // TODO!
  '\u00b3': ['', ' ', '<' ],
  '\u00b4': ['', '\uD804\uDD34'],  // accute accent ? Should this be under?
  '\u00b5': ['', '\uD804\udd33\uD804\udd16', '\ud804\udd07' ],  // micro sign
  '\u00b6': ['', ' ', '\uD804\udd06\uD804\udd33\uD804\udd06'],
  '\u00b7': ['', ' ', '\ud804\udd07' ],  // micro sign
  '\u00b8': [' ', ' ', '\ud804\udd09'],
  '\u00ba': [' ', ' ', '\ud804\udd2a\ud804\udd33\ud804\udd26'],
  '\u00be': [' ', ' ', '\ud804\udd40'],
  '\u00bf': [' ', ' ', '\ud804\udd16'],
  '\u00c1': [' ', ' ', '\ud804\udd33\ud804\udd26'],
  '\u00c5': ['', '\uD804\udd10'],  // A ring
  '\u00c7': ['', '\uD804\udd15'],  // C cedilla
  '\u00c9': [' ', ' ', '\u00f7'],  // Division
  '\u00cb': [' ', ' ', '>'],
  '\u00cc': [' ', ' ', '\ud804\udd17'],
  '\u00cd': [' ', ' ', '\ud804\udd0e'],
  '\u00ce': [' ', ' ', '\ud804\udd16'],
  '\u00cf': [' ', ' ', '\ud804\udd16'],
  '\u00ce': [' ', ' ', '\ud804\udd16'],
  '\u00d0': [' ', ' ', '-'],
  '\u00d1': [' ', ' ', '\ud804\udd40'],
  '\u00d2': [' ', ' ', '\"'],
  '\u00d3': ['', '', '\uD804\udd42'],  //
  '\u00d4': ['', '', ';'],  //
  '\u00d5': ['', '', '\''],  //
  '\u00d6': [' ', ' ', '\ud804\udd33\ud804\udd22'],
  '\u00d8': [' ', ' ', '\ud804\udd28\ud804\udd34'],
  '\u00d9': ['', '\uD804\udd2b', '\uD804\udd43'],
  '\u00da': ['', '\uD804\udd2b', '\uD804\udd10'],
  '\u00db': ['', '\uD804\udd2b'],  // TODO!
  '\u00dc': ['', '\uD804\udd2b', '\uD804\udd04'],
  '\u00de': ['', '\uD804\udd00\ud804\udd02', '\uD804\udd02\ud804\udd00'],
  '\u00df': ['', '\uD804\udd2b', '\u00d7'],  // multiplication

  '\u00e0': ['', '\uD804\udd0c\ud804\udd33\uD804\udd07',
	     '\ud804\udd33\ud804\udd05'],
  '\u00e1': ['', '\uD804\udd0c\ud804\udd33\uD804\udd07',
	    '\ud804\udd2a\ud804\udd33\ud804\udd22'],  //
  '\u00e2': ['', '\uD804\udd0c\ud804\udd33\uD804\udd1c',
	    '\uD804\udd28\ud804\udd02'],  //
  '\u00e3': ['', '\uD804\udd0c\ud804\udd33\uD804\udd1f', '\uD804\udd0d'],
  '\u00e4': ['', '\uD804\udd0c\ud804\udd33\uD804\udd16', '\ud804\udd15'],
  '\u00e5': ['', '\uD804\udd0c\ud804\udd33\uD804\udd17',
	    '\ud804\udd1e'],  //
  '\u00e6': ['', ' ', '\ud804\udd28'],
  '\u00e7': ['', ' ', '\ud804\udd11'],
  '\u00e8': ['', '\uD804\udd28\uD804\udd34', '\ud804\udd1a'],  // A with ring
  '\u00e9': ['', ' ', '\ud804\udd01\ud804\udd00'],  //
  '\u00ea': ['', '\uD804\udd06'],  //
  '\u00eb': ['', '\uD804\udd06\uD804\udd33\uD804\udd06',
	     '\ud804\udd01\ud804\udd28'],
  '\u00ec': ['', '\uD804\udd07\ud804\udd33\uD804\udd08', ' '],  // TODO
  '\u00ed': ['', '\uD804\udd07\ud804\udd33\uD804\udd07', ' '],  // TODO
  '\u00ee': ['', '\uD804\udd07\ud804\udd33\uD804\udd0c', '\uD804\udd23'],  //
  '\u00ef': ['', '\uD804\udd07\ud804\udd33\uD804\udd0d', ' '],  // TODO

  '\u00f0': ['', ' ', '\uD804\udd0f'],
  '\u00f1': ['', '\uD804\udd07\ud804\udd33\uD804\udd0e', '\uD804\udd22'],
  '\u00f2': ['', '\uD804\udd07\ud804\udd33\uD804\udd12', '%'],  //
  '\u00f3': ['', '\uD804\udd07\ud804\udd33\uD804\udd0f', '\uD804\udd21'],  //
  '\u00f4': ['', '\uD804\udd07\ud804\udd33\uD804\udd16', ' '],  //
  '\u00f5': ['', '\uD804\udd07\ud804\udd33\uD804\udd23', '\uD804\udd12'],  //
  '\u00f6': ['', '\uD804\udd07\ud804\udd33\uD804\udd17', '\uD804\udd11'],  //
  '\u00f7': ['', ' ', '\uD804\udd11'],
  '\u00f8': ['', ' ', '\uD804\udd28\ud804\udd00'],
  '\u00f9': ['', '\uD804\udd0c\ud804\udd33\uD804\udd0c', '\uD804\udd25'],

  '\u00fa': ['', '\uD804\udd0c\ud804\udd33\uD804\udd25', '\uD804\udd1b'],
  '\u00fb': ['', '\uD804\udd16\ud804\udd33\uD804\udd16', '\ud804\udd26'],
  '\u00fc': ['', '\uD804\udd1b\ud804\udd33\uD804\udd1b', '\ud804\udd26'],
  '\u00fd': ['', ' ', '\ud804\udd26'],  //
  '\u00fe': ['', ' ', '\u00d7'],  //
  '\u00ff': ['', '\uD804\udd20', '\uD804\udd06\uD804\udd33\uD804\udd06'],

  '\u0152': [' ', '~', '\uD804\uDD07'],
  '\u0153': [' ', '~', '\uD804\uDD1a'],
  '\u0160': [' ', '~', '\uD804\uDD2f'],
  '\u0160': [' ', '~', '\uD804\uDD2f'],
  '\u0178': [' ', '~', '\uD804\uDD1d'],
  '\u017d': [' ', '~', '\u00d7'],
  '\u017e': [' ', '~', '\ud804\udd04'],
  '\u0192': [' ', '~', '\uD804\uDD2b'],

  '\u02c6': [' ', ' ', '\uD804\uDD2e'],

  '\u2013': [' ', '~', '\uD804\uDD2a'],
  '\u2014': [' ', ' ', ' '],
  '\u2018': [' ', '~', '\uD804\uDD16'],
  '\u2019': [' ', ' ', ' '],
  '\u201a': [' ', '~', '\uD804\uDD2b'],
  '\u201c': [' ', '~', '\uD804\uDD2a'],
  '\u201d': [' ', ' ', '\uD804\uDD2c'],
  '\u201e': [' ', ' ', '\uD804\uDD2d'],
  '\u2020': [' ', ' ', '\uD804\uDD2c'],
  '\u2021': [' ', ' ', '\uD804\uDD2c'],
  '\u2022': [' ', '\uD804\uDD32', '\ud804\udd0b'],
  '\u2026': [' ', ' ', '\uD804\uDD2d'],
  '\u2030': [' ', ' ', '\uD804\uDD30'],
  '\u2039': [' ', ' ', '\uD804\uDD07'],
  '\u203a': [' ', ' ', ' '],
  '\u203c': [' ', ' ', ' '],
  '\u20ac': [' ', ' ', '\u00f7'], // division
  '\u2122': ['\u0000', '\uD804\uDD33\ud804\udd26\ud804\udd31', ' '],
  '\u2202': ['\u0000', '\ud804\udd33\ud804\udd0c'],
  '\u2260': ['\u0000', '\u25cc'], // ≠ --> "dotted circle"

};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

langConverter.transformRules = [
  [/\uD804\uDD2c\uD804([\uDD03-\uDD26])/gi,
   "\uD804$1\uD804\uDD2c"],

  // Move the eVowel over a virama.
  [/\ud804([\udd01\udd27-\udd34])\ud804\udd33\ud804([\uDD03-\uDD26])/gi,
   "\ud804\udd33\ud804$2\ud804$1"],

  // dotPattern
  [/\ud804([\udd41\udd42])\ud804\udd01/gi, "\ud804\udd01\ud804$1"],

  // Replace CHAKMA VOWEL SIGN O + CHAKMA VOWEL SIGN AI with
  //    CHAKMA VOWEL SIGN OI + CHAKMA O MARK
  [/\ud804\udd2e\ud804\udd2d/gi,
   "\ud804\udd30\ud804\udd31"],

  // uIPattern
  [/\ud804\udd2a\ud804\udd2d/gi, "\ud804\udd2d\ud804\udd2a"],

  // iZPattern
  [/\ud804\udd27\ud804\udd33\ud804\udd20/gi,
   "\ud804\udd33\ud804\udd20\ud804\udd27"],

  // iGraveZPattern
  [/\ud804\udd27\ud804\udd01\ud804\udd33\ud804\udd20/gi,
   "\ud804\udd33\ud804\udd20\ud804\udd27\ud804\udd01"],
  // deRPattern
  [/\ud804\udd28\ud804\udd33\ud804\udd22/gi,
    "\ud804\udd33\ud804\udd22\ud804\udd28"],

  // Reorder with 11101.
  [/\ud804\udd01\ud804([\udd28])/gi,
   "\ud804$1\ud804\udd01"],

  // Fix some modifiers after a space, newline or left parent.
  [/([\u000a\u0020]|\u0020\u0040)\ud804([\udd00\udd27-\udd34])/gi,
   "\ud804$2$1"],

  // Fix some virama followed by space or new line.
  [/\ud804\udd33([\u000a\u0020])\ud804([\udd05])/gi,
   "\ud804\udd33\ud804$2$1"],

  // Space modifier space
  [/\u0020\ud804([\udd00])\u0020/gi,
   "\ud804$1\u0020"],

  // Virama pattern after space.
  [/\u0020\ud804\udd33\ud804([\uDD03-\uDD26])/gi,
   "\ud804\udd33\ud804$1\u0020"],

  // Diacritics 131 before 130 space.
  [/\ud804\udd31\ud804\udd30/gi,
   "\ud804\udd30\ud804\udd31"]
]

