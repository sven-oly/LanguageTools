// Convert from old font-encoding ROhingya Kuna Leyka Noories to Unicode forms:

// Mappings for both arjyban, sujoyan, alaam, etc. encodings.
var map_encoding_names = [
  'Kuna Leyka', 'Gonya Leyka'];

var private_use_map_combined = {
  '\u0621': ['\ud803\udd1d', '\u0000'],  // null
  '\u0622': ['\ud803\udd00', '\u0009'],  // horizontal tab
  '\u0623': ['\ud803\udd00', '\u0009'],  // horizontal tab
  '\u0624': ['\ud803\udd1d', '\u0000'],  // Carriage return
  '\u0625': ['\ud803\udd00', ' ', ' '],  // Space
  '\u0626': ['\ud803\udd21', '\u003b', '\uD803\uDD33\uD803\uDD05'],  // #
  '\u0627': ['\ud803\udd00', ' ', '\uD803\uDD14'],  // $
  '\u0628': ['\ud803\udd01', '\u0025', '\ud803\udd33\ud803\udd22\ud803\udd2a'],  // %
  '\u0629': ['\ud803\udd17', '\u0026'],  // &
  '\u062a': ['\ud803\udd03', '\u0027', '\u0027'],  // '
  '\u062b': ['\ud803\udd02', '\u0000', '\uD803\uDD33\uD803\uDD05'],  // *
  '\u062c': ['\ud803\udd05', '\uD803\uDD36', '\uD803\uDD36'],  // 0
  '\u062d': ['\ud803\udd06', '\uD803\uDD37', '\uD803\uDD37'],  // 1
  '\u062e': ['\ud803\udd08', '\uD803\uDD38', '\uD803\uDD38'],  // 2
  '\u062f': ['\ud803\udd0a', '\uD803\uDD39', '\uD803\uDD39'],  // 3
  // TO BE CONTINUED
  '\u0034': ['\uD803\uDD3a', '\uD803\uDD3a', '\uD803\uDD3a'],  // 4
  '\u0035': ['\uD803\uDD3b', '\uD803\uDD3b', '\uD803\uDD3b'],  // 5
  '\u0036': ['\uD803\uDD3c', '\uD803\uDD3c', '\uD803\uDD3c'],  // 6
  '\u0037': ['\uD803\uDD3d', '\uD803\uDD3d', '\uD803\uDD3d'],  // 7
  '\u0038': ['\uD803\uDD3e', '\uD803\uDD3e', '\uD803\uDD3e'],  // 8
  '\u0039': ['\uD803\uDD3f', '\uD803\uDD3f', '\uD803\uDD3f'],  // 9
  '\u003a': ['\u003a', '\u003a', ':'],  // colon
  '\u003b': ['\u003b', '\ud803\udd1f', '\ud803\udd34'],  // semicolon
  '\u003c': ['\u003c', '\ud803\udd13', '<'],  // <
  '\u003d': ['\u003d', '\u003d', '='],  // =
  '\u003e': ['\u003e', '\ud803\udd12', '>'],  // >
  '\u003f': ['\u003f', '\u003f', '?'],  // ?
  '\u0040': ['\uD803\uDD04', '-', '\ud803\udd33\ud803\udd05'],  // @
  '\u0041': ['\ud803\udd06', '\ud803\udd33\ud803\udd05', '\ud803\udd03'],  // A
  '\u0042': ['\uD803\uDD33\uD803\uDD23', '\uD803\uDD41', '\ud803\udd43'],  // B
  '\u0043': ['\uD803\uDD0d', '\uD803\uDD33\uD803\uDD05',
	     '\ud803\udd33\ud803\udd26'],  // C
  '\u0044': ['\uD803\uDD19', '\uD803\uDD2c', '\ud803\udd32'],  // D
  '\u0045': ['\uD803\uDD29', '\uD803\uDD2a', '\uD803\uDD33\uD803\uDD04'],  // E
  '\u0046': ['\ud803\udd03', '\ud803\udd00', '\uD803\uDD33\uD803\uDD06'],  // F
  '\u0047': ['\ud803\udd0a', '\ud803\udd01\ud803\udd28', '\uD803\udd06'],  // G
  '\u0048': ['\uD803\uDD33\ud803\udd26', '\uD803\uDD33\ud803\udd26', '\ud803\udd30'],  // H
  '\u0049': ['\uD803\uDD2d', '\uD803\uDD27', '\ud803\udd2e'],  // I
  '\u004a': ['\ud803\udd0f', '\ud803\udd33\uD803\uDD20', '\ud803\udd2f'],  // J
  '\u004b': ['\ud803\udd08', '\ud803\udd33\ud803\udd1a', '\ud803\udd07'],  // K
  '\u004c': ['\ud803\udd26\ud803\udd33\ud803\udd23', '\ud803\udd33\ud803\udd22\ud803\udd2a', '\ud803\udd08'],  // L
  '\u004d': ['\uD803\uDD34', '\uD803\uDD24', '\ud803\udd09'],  // M
  '\u004e': ['\uD803\uDD15', '\uD803\uDD33\ud803\udd26\ud803\udd2a', '\ud803\udd0a'],  //N
  '\u004f': ['\uD803\uDD27\uD803\uDD32', '\uD803\uDD28', '\ud803\udd0b'],  // O
  '\u0050': ['\uD803\uDD04', '\uD803\uDD2d', '\ud803\udd0c'],  //P
  '\u0051': ['\uD803\uDD12', '\uD803\uDD33\uD803\uDD03', '\ud803\udd0d'],  //Q
  '\u0052': ['\ud803\udd33\ud803\udd22', '\ud803\udd33\ud803\udd04', '\ud803\udd0e'],  // R
  '\u0053': ['\uD803\uDD05', '\uD803\uDD01', '\ud803\udd0f'],  // S
  '\u0054': ['\uD803\uDD17', '\uD803\uDD26', '\ud803\udd10'],  //T
  '\u0055': ['\uD803\uDD2b', '\uD803\uDD34', '\ud803\udd11'],  // U
  '\u0056': ['\uD803\uDD0b', '\ud803\udd33\uD803\uDD20', '\ud803\udd12'],  // V
  '\u0057': ['\uD803\uDD31', '\uD803\uDD31', '\ud803\udd13'],  //W
  '\u0058': ['\uD803\uDD14', '\uD803\uDd2c', '\ud803\udd14'],  // X
  '\u0059': ['\uD803\uDD10', '\uD803\uDD33\uD803\uDD06', '\ud803\udd15'],  //Y
  '\u005a': ['\ud803\udd33\ud803\udd20', '\ud803\udd05', '\ud803\udd16'],  // Z
  '\u005b': ['[', '[', '['],  // [
  '\u005c': ['\ud803\udd1d\ud803\udd33\ud803\udd1d\ud803\udd33\ud803\udd1d',
	     '\u005c', ';'],  // backslash
  '\u005d': ['\u005d', '\u005d', ']'],  // ]
  '\u005e': ['\uD803\uDD33\uD803\uDD1a', '\uD803\uDD26',
	     '\uD803\uDD33\uD803\uDD03'],  // ^
  '\u005f': ['\uD803\uDD34', '\uD803\uDD34', '\ud803\udd17'],  // _
  '\u0060': ['\uD803\uDD01', '\`', '\ud803\udd18'],  // `
  '\u0061': ['\uD803\uDD2c', '\uD803\uDD07', '\ud803\udd19'],  // a
  '\u0062': ['\uD803\uDD1d', '\uD803\uDD25', '\ud803\udd1a'],  // b
  '\u0063': ['\uD803\uDD0c', '\uD803\uDD0d', '\ud803\udd1b'],  // c
  '\u0064': ['\uD803\uDD18', '\uD803\uDD1e', '\ud803\udd1c'],  // d
  '\u0065': ['\uD803\uDD28', '\uD803\uDD1b', '\ud803\udd1d'],  // e
  '\u0066': ['\uD803\uDD1c', '\uD803\uDD0b', '\ud803\udd1e'],  // f
  '\u0067': ['\uD803\uDD09', '\uD803\uDD1a', '\ud803\udd1f'],  // g
  '\u0068': ['\uD803\uDD26', '\uD803\uDD22', '\ud803\udd21'],  // h
  '\u0069': ['\uD803\uDD27', '\uD803\uDD1c', '\ud803\udd22'],  // i
  '\u006a': ['\uD803\uDD0e', '\uD803\uDD1d', '\ud803\udd23'],  // j
  '\u006b': ['\uD803\uDD07', '\uD803\uDD0c', '\ud803\udd33\ud803\udd26'],  // k
  '\u006c': ['\uD803\uDD23', '\uD803\uDD26\uD803\uDD33\uD803\uDD23',
	     '\ud803\udd33\ud803\udd1a'],  // l
  '\u006d': ['\uD803\uDD1f', '\uD803\uDD0a', '\ud803\udd25'],  // m
  '\u006e': ['\uD803\uDD1a', '\uD803\uDD20', '\ud803\udd26'],  // n
  '\u006f': ['\uD803\uDD2e', '\uD803\uDD16', '\ud803\udd24'],  // o
  '\u0070': ['\uD803\uDD1b', '\uD803\uDD08', '\ud803\udd05'],  // p
  '\u0071': ['\uD803\uDD11', '\uD803\uDD03', '\ud803\udd20'],  // q
  '\u0072': ['\uD803\uDD22', '\uD803\uDD09', '\uD803\uDD26\uD803\uDD33\uD803\uDD23'],  // r
  '\u0073': ['\uD803\uDD25', '\uD803\uDD0e', '\ud803\udd01'],  // s
  '\u0074': ['\uD803\uDD16', '\uD803\uDD23', '\ud803\udd02'],  // t
  '\u0075': ['\uD803\uDD2a', '\uD803\uDD18', '\ud803\udd03'],  // u
  '\u0076': ['\uD803\uDD1e', '\uD803\uDD17', '\ud803\udd27'],  // v
  '\u0077': ['\uD803\uDD24', '\uD803\uDD19', '\ud803\udd28'],  // w
  '\u0078': ['\uD803\uDD13', '\uD803\uDD11', '\ud803\udd29'],  // x
  '\u0079': ['\uD803\uDD20', '\uD803\uDD0f', '\uD803\uDD2a'],  // y
  '\u007a': ['\uD803\uDD21', '\uD803\uDD14', '\uD803\uDD2a'],  // z
  '\u007c': ['\uD803\uDD33\ud803\udd03', '\uD803\uDD41', '\uD803\uDD41'],  // |
  '\u007e': ['\uD803\uDD02', '~', '\uD803\uDD2b'],  // ~
  '\u00a1': [' ', ' ', '\ud803\udd1d'],
  '\u00a2': [' ', ' ', '\ud803\udd1e'],
  '\u00a3': [' ', '\ud803\udd1a\ud803\udd33\ud803\udd1a',
	     '\ud803\udd1e'],  // registered TM symbol
  '\u00a4': [' ', ' ', '\ud803\udd1f'],
  '\u00a5': [' ', ' ', '\ud803\udd20'],
  '\u00a6': [' ', ' ', '\ud803\udd1d'],
  '\u00a7': [' ', ' ', '\ud803\udd07'],
  '\u00a8': [' ', ' ', '\ud803\udd33\ud803\udd20'],
  '\u00a9': [' ', ' ', '\ud803\udd31'],  // Copyright
  '\u00aa': [' ', ' ', '\ud803\udd33\ud803\udd22'],
  '\u00ab': [' ', ' ', '\ud803\udd33\ud803\udd22'],
  '\u00ac': [' ', ' ', '\ud803\udd01\ud803\udd28'],
  '\u00ae': [' ', '\ud803\udd29'],  // registered Circle
  '\u00af': [' ', ' ', '\ud803\udd25'],  // registered Circle
  '\u00b0': ['', ' ', '\ud803\udd07' ],
  '\u00b1': ['', ' ', '\ud803\udd07' ],
  '\u00b2': ['', ' ', '\ud803\udd21' ],    // TODO!
  '\u00b3': ['', ' ', '<' ],
  '\u00b4': ['', '\uD803\uDD34'],  // accute accent ? Should this be under?
  '\u00b5': ['', '\uD803\udd33\uD803\udd16', '\ud803\udd07' ],  // micro sign
  '\u00b6': ['', ' ', '\uD803\udd06\uD803\udd33\uD803\udd06'],
  '\u00b7': ['', ' ', '\ud803\udd07' ],  // micro sign
  '\u00b8': [' ', ' ', '\ud803\udd09'],
  '\u00ba': [' ', ' ', '\ud803\udd2a\ud803\udd33\ud803\udd26'],
  '\u00be': [' ', ' ', '\ud803\udd40'],
  '\u00bf': [' ', ' ', '\ud803\udd16'],
  '\u00c1': [' ', ' ', '\ud803\udd33\ud803\udd26'],
  '\u00c5': ['', '\uD803\udd10'],  // A ring
  '\u00c7': ['', '\uD803\udd15'],  // C cedilla
  '\u00c9': [' ', ' ', '\u00f7'],  // Division
  '\u00cb': [' ', ' ', '>'],
  '\u00cc': [' ', ' ', '\ud803\udd17'],
  '\u00cd': [' ', ' ', '\ud803\udd0e'],
  '\u00ce': [' ', ' ', '\ud803\udd16'],
  '\u00cf': [' ', ' ', '\ud803\udd16'],
  '\u00ce': [' ', ' ', '\ud803\udd16'],
  '\u00d0': [' ', ' ', '-'],
  '\u00d1': [' ', ' ', '\ud803\udd40'],
  '\u00d2': [' ', ' ', '\"'],
  '\u00d3': ['', '', '\uD803\udd42'],  //
  '\u00d4': ['', '', ';'],  //
  '\u00d5': ['', '', '\''],  //
  '\u00d6': [' ', ' ', '\ud803\udd33\ud803\udd22'],
  '\u00d8': [' ', ' ', '\ud803\udd28\ud803\udd34'],
  '\u00d9': ['', '\uD803\udd2b', '\uD803\udd43'],
  '\u00da': ['', '\uD803\udd2b', '\uD803\udd10'],
  '\u00db': ['', '\uD803\udd2b'],  // TODO!
  '\u00dc': ['', '\uD803\udd2b', '\uD803\udd04'],
  '\u00de': ['', '\uD803\udd00\ud803\udd02', '\uD803\udd02\ud803\udd00'],
  '\u00df': ['', '\uD803\udd2b', '\u00d7'],  // multiplication

  '\u00e0': ['', '\uD803\udd0c\ud803\udd33\uD803\udd07',
	     '\ud803\udd33\ud803\udd05'],
  '\u00e1': ['', '\uD803\udd0c\ud803\udd33\uD803\udd07',
	    '\ud803\udd2a\ud803\udd33\ud803\udd22'],  //
  '\u00e2': ['', '\uD803\udd0c\ud803\udd33\uD803\udd1c',
	    '\uD803\udd28\ud803\udd02'],  //
  '\u00e3': ['', '\uD803\udd0c\ud803\udd33\uD803\udd1f', '\uD803\udd0d'],
  '\u00e4': ['', '\uD803\udd0c\ud803\udd33\uD803\udd16', '\ud803\udd15'],
  '\u00e5': ['', '\uD803\udd0c\ud803\udd33\uD803\udd17',
	    '\ud803\udd1e'],  //
  '\u00e6': ['', ' ', '\ud803\udd28'],
  '\u00e7': ['', ' ', '\ud803\udd11'],
  '\u00e8': ['', '\uD803\udd28\uD803\udd34', '\ud803\udd1a'],  // A with ring
  '\u00e9': ['', ' ', '\ud803\udd01\ud803\udd00'],  //
  '\u00ea': ['', '\uD803\udd06'],  //
  '\u00eb': ['', '\uD803\udd06\uD803\udd33\uD803\udd06',
	     '\ud803\udd01\ud803\udd28'],
  '\u00ec': ['', '\uD803\udd07\ud803\udd33\uD803\udd08', ' '],  // TODO
  '\u00ed': ['', '\uD803\udd07\ud803\udd33\uD803\udd07', ' '],  // TODO
  '\u00ee': ['', '\uD803\udd07\ud803\udd33\uD803\udd0c', '\uD803\udd23'],  //
  '\u00ef': ['', '\uD803\udd07\ud803\udd33\uD803\udd0d', ' '],  // TODO

  '\u00f0': ['', ' ', '\uD803\udd0f'],
  '\u00f1': ['', '\uD803\udd07\ud803\udd33\uD803\udd0e', '\uD803\udd22'],
  '\u00f2': ['', '\uD803\udd07\ud803\udd33\uD803\udd12', '%'],  //
  '\u00f3': ['', '\uD803\udd07\ud803\udd33\uD803\udd0f', '\uD803\udd21'],  //
  '\u00f4': ['', '\uD803\udd07\ud803\udd33\uD803\udd16', ' '],  //
  '\u00f5': ['', '\uD803\udd07\ud803\udd33\uD803\udd23', '\uD803\udd12'],  //
  '\u00f6': ['', '\uD803\udd07\ud803\udd33\uD803\udd17', '\uD803\udd11'],  //
  '\u00f7': ['', ' ', '\uD803\udd11'],
  '\u00f8': ['', ' ', '\uD803\udd28\ud803\udd00'],
  '\u00f9': ['', '\uD803\udd0c\ud803\udd33\uD803\udd0c', '\uD803\udd25'],

  '\u00fa': ['', '\uD803\udd0c\ud803\udd33\uD803\udd25', '\uD803\udd1b'],
  '\u00fb': ['', '\uD803\udd16\ud803\udd33\uD803\udd16', '\ud803\udd26'],
  '\u00fc': ['', '\uD803\udd1b\ud803\udd33\uD803\udd1b', '\ud803\udd26'],
  '\u00fd': ['', ' ', '\ud803\udd26'],  //
  '\u00fe': ['', ' ', '\u00d7'],  //
  '\u00ff': ['', '\uD803\udd20', '\uD803\udd06\uD803\udd33\uD803\udd06'],

  '\u0152': [' ', '~', '\uD803\uDD07'],
  '\u0153': [' ', '~', '\uD803\uDD1a'],
  '\u0160': [' ', '~', '\uD803\uDD2f'],
  '\u0160': [' ', '~', '\uD803\uDD2f'],
  '\u0178': [' ', '~', '\uD803\uDD1d'],
  '\u017d': [' ', '~', '\u00d7'],
  '\u017e': [' ', '~', '\ud803\udd04'],
  '\u0192': [' ', '~', '\uD803\uDD2b'],

  '\u02c6': [' ', ' ', '\uD803\uDD2e'],

  '\u2013': [' ', '~', '\uD803\uDD2a'],
  '\u2014': [' ', ' ', ' '],
  '\u2018': [' ', '~', '\uD803\uDD16'],
  '\u2019': [' ', ' ', ' '],
  '\u201a': [' ', '~', '\uD803\uDD2b'],
  '\u201c': [' ', '~', '\uD803\uDD2a'],
  '\u201d': [' ', ' ', '\uD803\uDD2c'],
  '\u201e': [' ', ' ', '\uD803\uDD2d'],
  '\u2020': [' ', ' ', '\uD803\uDD2c'],
  '\u2021': [' ', ' ', '\uD803\uDD2c'],
  '\u2022': [' ', '\uD803\uDD32', '\ud803\udd0b'],
  '\u2026': [' ', ' ', '\uD803\uDD2d'],
  '\u2030': [' ', ' ', '\uD803\uDD30'],
  '\u2039': [' ', ' ', '\uD803\uDD07'],
  '\u203a': [' ', ' ', ' '],
  '\u203c': [' ', ' ', ' '],
  '\u20ac': [' ', ' ', '\u00f7'], // division
  '\u2122': ['\u0000', '\uD803\uDD33\ud803\udd26\ud803\udd31', ' '],
  '\u2202': ['\u0000', '\ud803\udd33\ud803\udd0c'],
  '\u2260': ['\u0000', '\u25cc'], // ≠ --> "dotted circle"

};

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  var intext = inarea.value;
  var outtext = "";
  var out;
  for (var index = 0; index < intext.length; index ++) {
    var c = intext[index];
    out = c;
    if (c in private_use_map_combined) {
      var result = private_use_map_combined[c][encodingIndex];
      if (result) {
	out = result;
      }
    }
    outtext += out;
  }

  // TODO: Fix these for Rohingya.

  // Next, move some code points in context to get proper Unicode ordering.
  // Vowel sign to right of consonants:
  ePattern = /\uD803\uDD2c\uD803([\uDD03-\uDD26])/gi;
  eReplace = "\uD803$1\uD803\uDD2c";
  var newText = outtext.replace(ePattern, eReplace);

  // Move the eVowel over a virama.
  viramaEPattern = /\ud803([\udd01\udd27-\udd34])\ud803\udd33\ud803([\uDD03-\uDD26])/gi;
  viramaEReplace = "\ud803\udd33\ud803$2\ud803$1";
  var result = newText.search(viramaEPattern);
  while (result >= 0) {
    newText = newText.replace(viramaEPattern, viramaEReplace);
    result = newText.search(viramaEPattern);
  }

  dotPattern = /\ud803([\udd41\udd42])\ud803\udd01/gi;
  dotReplace = "\ud803\udd01\ud803$1";
  newText = newText.replace(dotPattern, dotReplace);

  // Replace CHAKMA VOWEL SIGN O + CHAKMA VOWEL SIGN AI with
  //    CHAKMA VOWEL SIGN OI + CHAKMA O MARK
  oIPattern = /\ud803\udd2e\ud803\udd2d/gi;
  oIReplace = "\ud803\udd30\ud803\udd31";
  newText = newText.replace(oIPattern, oIReplace);

  // Replace
  //
  uIPattern = /\ud803\udd2a\ud803\udd2d/gi;
  uIReplace = "\ud803\udd2d\ud803\udd2a";
  newText = newText.replace(uIPattern, uIReplace);

  // Replace
  //
  iZPattern = /\ud803\udd27\ud803\udd33\ud803\udd20/gi;
  iZReplace = "\ud803\udd33\ud803\udd20\ud803\udd27";
  newText = newText.replace(iZPattern, iZReplace);

  iGraveZPattern = /\ud803\udd27\ud803\udd01\ud803\udd33\ud803\udd20/gi;
  iGraveZReplace = "\ud803\udd33\ud803\udd20\ud803\udd27\ud803\udd01";
  newText = newText.replace(iGraveZPattern, iGraveZReplace);

  deRPattern = /\ud803\udd28\ud803\udd33\ud803\udd22/gi;
  deRReplace = "\ud803\udd33\ud803\udd22\ud803\udd28";
  newText = newText.replace(deRPattern, deRReplace);

  // Reorder with 11101.
  onePattern = /\ud803\udd01\ud803([\udd28])/gi;
  oneReplace = "\ud803$1\ud803\udd01";
  newText = newText.replace(onePattern, oneReplace);


  // Fix some modifiers after a space, newline or left parent.
  spaceModPattern = /([\u000a\u0020]|\u0020\u0040)\ud803([\udd00\udd27-\udd34])/gi;
  spaceModReplace = "\ud803$2$1";
  newText = newText.replace(spaceModPattern, spaceModReplace);

  // Fix some virama followed by space or new line.
  viramaSpacePattern = /\ud803\udd33([\u000a\u0020])\ud803([\udd05])/gi;
  viramaSpaceReplace = "\ud803\udd33\ud803$2$1";
  newText = newText.replace(viramaSpacePattern, viramaSpaceReplace);

  // Space modifier space
  spaceModSpacePattern = /\u0020\ud803([\udd00])\u0020/gi;
  spaceModSpaceReplace = "\ud803$1\u0020";
  newText = newText.replace(spaceModSpacePattern, spaceModSpaceReplace);

  // Virama pattern after space.
  spaceModSpacePattern = /\u0020\ud803\udd33\ud803([\uDD03-\uDD26])/gi;
  spaceModSpaceReplace = "\ud803\udd33\ud803$1\u0020";
  newText = newText.replace(spaceModSpacePattern, spaceModSpaceReplace);

  // Diacritics 131 before 130 space.
  spaceModSpacePattern = /\ud803\udd31\ud803\udd30/gi;
  spaceModSpaceReplace = "\ud803\udd30\ud803\udd31";
  newText = newText.replace(spaceModSpacePattern, spaceModSpaceReplace);

  // TODO: Run some reorderings again, e.g., 11131 11127

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
