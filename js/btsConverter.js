// Convert from old font-encoding text to Unicode forms:
const langConverter = new langConverterClass('bts', 'Batak Simalungun');

// Mappings for multiple encodings
var map_encoding_names = ['Mandailing', 'Toba', 'Variants'];

// TODO: fill in Toba and Variants.
langConverter.encoding_data = {
    'Mandailing': {index:0, outputEncoding:'Unicode', outputScript:'Batak Simalungun'},
    'Toba': {index:1, outputEncoding:'Unicode', outputScript:'Batak Simalungun'},
    'Variants': {index:2, outputEncoding:'Unicode', outputScript:'Batak Simalungun'},
};

private_use_map_combined = {
  '\u0000': ['', '', ''],  // null
  '\u0009': ['', '', ''],  // horizontal tab
  '\u000D': ['', '', ''],  // Carriage return
  '\u0020': [' ', ' ', ' '],  // Space
  '\u0021': ['\u1bfc', '', ''],  // Space
  '\u0023': ['', '', ''],  // #
  '\u0024': ['', '', ''],  // $
  '\u0025': ['', '', ''],  // %
  '\u0026': ['', ''],  // &
  '\u0027': ['', '', ''],  // '
  '\u002a': ['', '', ''],  // *
  '\u0030': ['\u1bd4', '', ''],  // 0
  '\u0031': ['\u1bd4\u1bee', '', ''],  // 1
  '\u0032': ['\u1bc2', '', ''],  // 2
  '\u0033': ['\u1bc2\u1bee', '', ''],  // 3
  '\u0034': ['\u1bd5', '', ''],  // 4
  '\u0035': ['\u1bd5\u1bee', '', ''],  // 5
  '\u0036': ['\u1bc7\u1bea', '', ''],  // 6
  '\u0037': ['\u1bc7\u1bea\u1bee', '', ''],  // 7
  '\u0038': ['', '', ''],  // 8
  '\u0039': ['', '', ''],  // 9
  '\u003a': ['', '', ':'],  // colon
  '\u003b': ['', '', ''],  // semicolon
  '\u003c': ['\u1bdd', '', '<'],  // <
  '\u003d': ['\u1be6', '', ''],  // =
  '\u003e': ['\u1bdd\u1Bee', '', ''],  // >
  '\u003f': ['', '', ''],  // ?
  '\u0040': ['', '', ''],  // @
  '\u0041': ['\u1bc0\u1bee', '', ''],  // A
  '\u0042': ['\u1bc5\u1bee', '', ''],  // B
  '\u0043': ['\u1bda\u1be6\u1bee', '', ''],  // C
  '\u0044': ['\u1bd1\u1bee', '', ''],  // D
  '\u0045': ['\u1be9', '', ''],  // E
  '\u0046': ['\u1bdf\u1bee', '', ''],  // F
  '\u0047': ['\u1bce\u1bee', '', ''],  // G
  '\u0048': ['\u1bc4\u1bee', '', ''],  // H
  '\u0049': ['\u1be4', '', ''],  // I
  '\u004a': ['\u1bd0\u1bee', '', ''],  // J
  '\u004b': ['\u1bc4\u1be6\u1bee', '', ''],  // K
  '\u004c': ['\u1bde\u1bee', '', ''],  // L
  '\u004d': ['\u1bd4\u1bee', '', ''],  // M
  '\u004e': ['\u1bc9\u1bee', '', ''],  //N
  '\u004f': ['', '', ''],  // O
  '\u0050': ['\u1bc7\u1bee', '', ''],  //P
  '\u0051': ['\u1bca\u1bee', '', ''],  //Q
  '\u0052': ['\u1bd2\u1bee', '', ''],  // R
  '\u0053': ['\u1bda\u1bee', '', ''],  // S
  '\u0054': ['\u1bd6\u1bee', '', ''],  //T
  '\u0055': ['\u1be5', '', ''],  // U
  '\u0056': ['', '', ''],  // V
  '\u0057': ['\u1bcb\u1bee', '', ''],  //W
  '\u0058': ['\u1bcc\u1bee', '', ''],  // X
  '\u0059': ['\u1bdb\u1bee', '', ''],  //Y
  '\u005a': ['\u1bd8\u1bee', '', ''],  // Z
  '\u005b': ['\u1be0', '', ''],  // [
  '\u005c': ['\u1bf2', '', ''],  // backslash
  '\u005d': ['\u1be0\u1bee', '', ''],  // ]
  '\u005e': ['\u1bf0', '', ''],  // ^
  '\u005f': ['', '', ''],  // _
  '\u0060': ['', '', ''],  // `
  '\u0061': ['\u1bc0', '', ''],  // a
  '\u0062': ['\u1bc5', '', ''],  // b
  '\u0063': ['\u1bda\u1be6', '', ''],  // c
  '\u0064': ['\u1bd1', '', ''],  // d
  '\u0065': ['\u1be9', '', ''],  // e
  '\u0066': ['\u1bcc', '', ''],  // f
  '\u0067': ['\u1bce', '', ''],  // g
  '\u0068': ['\u1bc4', '', ''],  // h
  '\u0069': ['\u1bea', '', ''],  // i
  '\u006a': ['\u1bd0', '', ''],  // j
  '\u006b': ['\u1bc4\u1be6', '', ''],  // k
  '\u006c': ['\u1bde', '', ''],  // l
  '\u006d': ['\u1bd4', '', ''],  // m
  '\u006e': ['\u1bc9', '', ''],  // n
  '\u006f': ['\u1bec', '', ''],  // o
  '\u0070': ['\u1bc7', '', ''],  // p
  '\u0071': ['\u1bca', '', ''],  // q
  '\u0072': ['\u1bd2', '', ''],  // r
  '\u0073': ['\u1bda', '', ''],  // s
  '\u0074': ['\u1bd6', '', ''],  // t
  '\u0075': ['', '', ''],  // u
  '\u0076': ['\u1bda\u1bee', '', ''],  // v
  '\u0077': ['\u1bcb', '', ''],  // w
  '\u0078': ['\u1bd9', '', ''],  // x
  '\u0079': ['\u1bdb', '', ''],  // y
  '\u007a': ['\u1bd8', '', ''],  // z
  '\u007c': ['', '', ''],  // |
  '\u007e': ['', '', ''],  // ~
  '\u00a1': ['\u1bfc', '', ''],
  '\u00a2': ['', '', ''],
  '\u00a3': ['', '', ''],  // registered TM symbol
  '\u00a4': ['', '', ''],
  '\u00a5': ['', '', ''],
  '\u00a6': ['', '', ''],
  '\u00a7': ['', '', ''],
  '\u00a8': ['', '', ''],
  '\u00a9': ['', '', ''],  // Copyright
  '\u00aa': ['', '', ''],
  '\u00ab': ['', '', ''],
  '\u00ac': ['', '', ''],
  '\u00ae': ['', ''],  // registered Circle
  '': ['', '', '\ud804\udd25'],  // registered Circle
  '\u00b0': ['', '', '' ],
  '\u00b1': ['', '', '' ],
  '\u00b2': ['', '', '' ],    // TODO!
  '\u00b3': ['', '', '' ],
  '\u00b4': ['', ''],  // acute accent ? Should this be under?
  '': ['', '\uD804\udd33\uD804\udd16', '\ud804\udd07' ],  // micro sign
  '\u00b6': ['', '', ''],
  '\u00b7': ['', '', '' ],  // micro sign
  '\u00b8': ['', '', ''],
  '\u00ba': ['', '', ''],
  '\u00be': ['', '', ''],
  '\u00bf': ['', '', ''],
  '\u00c1': ['', '', ''],
  '\u00c5': ['', ''],  // A ring
  '': ['', '\uD804\udd15'],  // C cedilla
  '\u00c9': ['', '', ''],  // Division
  '\u00cb': ['', '', ''],
  '\u00cc': ['', '', ''],
  '\u00cd': ['', '', ''],
  '\u00ce': ['', '', ''],
  '\u00cf': ['', '', ''],
  '\u00ce': ['', '', ''],
  '\u00d0': ['', '', ''],
  '\u00d1': ['', '', ''],
  '\u00d2': ['', '', ''],
  '\u00d3': ['', '', ''],  //
  '\u00d4': ['', '', ''],  //
  '\u00d5': ['', '', ''],  //
  '\u00d6': ['', '', ''],
  '\u00d8': ['', '', ''],
  '\u00d9': ['', '', ''],
  '\u00da': ['', '', ''],
  '\u00db': ['', '', ''],  // TODO!
  '\u00dc': ['', '', ''],
  '\u00de': ['', '', ''],
  '\u00df': ['', '', ''],  // multiplication

  '\u00e0': ['', '', ''],
  '\u00e1': ['', '', ''],  //
  '\u00e2': ['', '', ''],  //
  '\u00e3': ['', '', ''],
  '\u00e4': ['', '', ''],
  '\u00e5': ['', '', ''],  //
  '\u00e6': ['', '', ''],
  '\u00e7': ['', '', ''],
  '\u00e8': ['', '', ''],  // A with ring
  '\u00e9': ['\u1bc1\u1be9', '', ''],  //
  '\u00ea': ['', '', ''],  //
  '\U00EB': ['', '', ''],
  '\u00ec': ['', '', ''],  // TODO
  '\u00ed': ['', '', ''],  // TODO
  '\u00ee': ['', '', ''],  //
  '\u00ef': ['', '', ''],  // TODO

  '\u00f0': ['', '', ''],
  '\u00f1': ['', '', ''],
  '\u00f2': ['', '', ''],  //
  '\u00f3': ['', '', ''],  //
  '\u00f4': ['', '', ''],  //
  '\u00f5': ['', '', ''],  //
  '\u00f6': ['', '', ''],  //
  '\u00f7': ['', '', ''],
  '\u00f8': ['', '', ''],
  '\u00f9': ['', '', ''],

  '\u00fa': ['', '', ''],
  '\u00fb': ['', '', ''],
  '\u00fc': ['', '', ''],
  '\u00fd': ['', '', ''],  //
  '\u00fe': ['', '', ''],  //
  '\u00ff': ['', '', ''],

  '\u0152': ['', '', ''],
  '\u0153': ['', '', ''],
  '\u0160': ['', '', ''],
  '\u0160': ['', '', ''],
  '\u0178': ['', '', ''],
  '\u017d': ['', '', ''],
  '\u017e': ['', '', ''],
  '\u0192': ['', '', ''],

  '\u02c6': ['', '', ''],

  '\u2013': ['', '', ''],
  '\u2014': ['', '', ''],
  '\u2018': ['', '', ''],
  '\u2019': ['', '', ''],
  '\u201a': ['', '', ''],
  '\u201c': ['', '', ''],
  '\u201d': ['', '', ''],
  '\u201e': ['', '', ''],
  '\u2020': ['', '', ''],
  '\u2021': ['', '', ''],
  '\u2022': ['', '', ''],
  '\u2026': ['', '', ''],
  '\u2030': ['', '', ''],
  '\u2039': ['', '', ''],
  '\u203a': ['', '', ''],
  '\u203c': ['', '', ''],
  '\u20ac': ['', '', ''], // division
  '\u2122': ['', '', ''],
  '\u2202': ['', '', ''],
  '\u2260': ['', '', ''], // ≠ --> "dotted circle"
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

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

  newText = outtext;
  // Move some code points in context to get proper Unicode ordering.
  // Vowel sign to right of consonants:

  // TODO: Reordering as needed.
  patternEAF2 = /([\u1BE9\u1BEA\u1BEC\u1bee])\u1BF2/gi;
  replaceEAF2 = "\u1BF2$1";
  newText = newText.replace(patternEAF2, replaceEAF2);

  patternEESwap = /\u1bee([\u1be6\u1be9])/gi;
  replaceEESwap = "$1\u1bee";
  TODO: newText = newText.replace(patternEESwap, replaceEESwap);

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
