// Convert from old font-encoding of Ahom text to Unicode forms:

// Mappings for Ahom old ASCII encoding to Unicode font
// Source: Stephen Morey
// Started 8-Nov-2017
var map_encoding_names = ['Ahom'];

// 11700
var private_use_map_combined = {
  //'XYZ': ['\ud805\udf05'],  // TODO: Find the key for this, if any
  //'XYZ2': ['\ud805\udf16'], // TODO: FIX
  //'XYZ3': ['\ud805\udf1F'], // TODO: Fix
  //'XYZ4': ['\ud805\udf3B'], // FIX

  'a': ['\ud805\udf21', '\ud805\udf12'],
  'b': ['\ud805\udf08', '\ud805\udf08'],
  'c': ['\ud805\udf0B', '\ud805\udf0B'],
  'd': ['\ud805\udf13', '\ud805\udf13'],  // \u0064
  'e': ['\ud805\udf26', '\ud805\udf26'],
  'f': ['\ud805\udf07', '\ud805\udf07'],
  'g': ['\ud805\udf15', '\ud805\udf15'],
  'h': ['\ud805\udf11', '\ud805\udf11'],
  'i': ['\ud805\udf22', '\ud805\udf22'],
  'j': ['\ud805\udf29', '\ud805\udf29'],
  'k': ['\ud805\udf00', '\ud805\udf00'],  // D805 DF08
  'l': ['\ud805\udf0E', '\ud805\udf0E'],
  'm': ['\ud805\udf09', '\ud805\udf09'],  // 006d
  'n': ['\ud805\udf03', '\ud805\udf03'],
  'o': ['\ud805\udf28', '\ud805\udf28'],
  'p': ['\ud805\udf06', '\ud805\udf06'],
  'q': ['\ud805\udf2B', '\ud805\udf2B'],
  'r': ['\ud805\udf0D', '\ud805\udf0D'],
  's': ['\ud805\udf0F', '\ud805\udf0F'],
  't': ['\ud805\udf04', '\ud805\udf04'],
  'u': ['\ud805\udf24', '\ud805\udf24'],
  'v': ['\ud805\udf0C', '\ud805\udf0C'],
  // 'w': ['\ud805\udf01', '\ud805\udf01'],
  'x': ['\ud805\udf01', '\ud805\udf01'],
  'y': ['\ud805\udf0A', '\ud805\udf0A'],

  'A': ['\ud805\udf12', ''],
  'B': ['\ud805\udf18', ''],
  'D': ['\ud805\udf14', ''],
  'G': ['\ud805\udf17', ''],
  'H': ['\ud805\udf3F'],
  'I': ['\ud805\udf23', ''],
  'J': ['\ud805\udf19', ''],
  'M': ['\ud805\udf2A', ''],
  // Medials
  'R': ['\ud805\udf1D', ''],
  'S': ['\ud805\udf1E', ''],
  'U': ['\ud805\udf25', ''],

  // Punctuation
  ',': ['\ud805\udf3C'],
  '.': ['\ud805\udf3D'],
  '@': ['\ud805\udf3E', '\ud805\udf3E'],
  ';': ['\ud805\udf20', ''],
  '[': ['\ud805\udf02', ''],
  ']': ['\ud805\udf27', ''],

  // Specified by hex values.
  '\u0020': [' ', ' ', ' '],  // Space
  '\u0021': ['!', '!', '\ud805\udf33\ud805\udf05'],  // #
  '\u0022': ['\"', '\"', '\ud805\udf33\ud805\udf05'],  // #
  '\u0023': ['\u1046', '\ud805\udf0a\ud805\udf22', '\ud805\udf33\ud805\udf05'],  // #
  '\u0024': ['\ud805\udf39', '\ud805\udf39', '\ud805\udf33\ud805\udf05'],  // #
  '\u0025': ['\ud805\udf36', '\ud805\udf36', '\ud805\udf33\ud805\udf05'],  // #
  '\u0026': ['&', '&', '\ud805\udf33\ud805\udf05'],  // #
  '\u0027': ['\'', '(', '\ud805\udf33\ud805\udf05'],  // #
  '\u0028': ['(', '(', '\ud805\udf33\ud805\udf05'],  // #
  '\u0029': [')', ')', '\ud805\udf33\ud805\udf05'],  // #
  '\u002a': ['*', '*', '\ud805\udf33\ud805\udf05'],  // #
  '\u002b': ['+', '+', '\ud805\udf33\ud805\udf05'],  // #
  '\u002c': [',', ',', '\ud805\udf33\ud805\udf05'],  // #
  '\u002d': ['-', '-', '\ud805\udf33\ud805\udf05'],  // #
  '\u002e': ['.', '\ud805\udf3c', '\ud805\udf33\ud805\udf05'],  // #
  '\u002f': ['\u104b', '\ud805\udf3d', '\ud805\udf33\ud805\udf05'],  // #
  
  '\u0030': ['\u1040', '\ud805\udf36', '\ud805\udf36'],  // 0
  '\u0031': ['\u1041', '\ud805\udf37', '\ud805\udf37'],  // 1
  '\u0032': ['\u1042', '\ud805\udf38', '\ud805\udf38'],  // 2
  '\u0033': ['\u1043', '\ud805\udf39', '\ud805\udf39'],  // 3
  '\u0034': ['\u1044', '\ud805\udf3a', '\ud805\udf3a'],  // 4
  '\u0035': ['\u1045', '\ud805\udf3b', '\ud805\udf3b'],  // 5
  '\u0036': ['\u1046', '\ud805\udf3c', '\ud805\udf3c'],  // 6
  '\u0037': ['\u1047', '\ud805\udf3d', '\ud805\udf3d'],  // 7
  '\u0038': ['\u1048', '\ud805\udf3e', '\ud805\udf3e'],  // 8
  '\u0039': ['\u1049', '\ud805\udf3f', '\ud805\udf3f'],  // 9
  '\u003a': [':', '\ud805\udf1f', '\ud805\udf34'],  // semicolon
  '\u003b': ['\ud805\udf20', '\ud805\udf1f', '\ud805\udf34'],  // semicolon
  '\u003c': ['\u003c', '\ud805\udf13', '<'],  // <
  '\u003d': ['\u003d', '\u003d', '='],  // =
  '\u003e': ['\u003e', '\ud805\udf12', '>'],  // >
  '\u003f': ['?', '\ud805\udf10', '?'],  // ?

  '\u0040': ['', '\ud805\udf3e', '\ud805\udf33\ud805\udf05'],  // @
  '\u0041': ['\ud805\udf12', '\ud805\udf12', '\ud805\udf33\ud805\udf05'],  // @
  '\u0042': ['\ud805\udf18', '\ud805\udf18-', '\ud805\udf33\ud805\udf05'],  // @
  '\u0043': ['', '\ud805\udf18', '\ud805\udf33\ud805\udf05'],  // @
  '\u0044': ['\ud805\udf14', '\ud805\udf14', '\ud805\udf33\ud805\udf05'],  // @
  '\u0045': ['\ud805\udf30\ud805\udf21', '\ud805\udf30\ud805\udf21', '\ud805\udf33\ud805\udf05'],  // @
  '\u0046': ['', '\ud805\udf30\ud805\udf27', '\ud805\udf33\ud805\udf05'],  // @
  '\u0047': ['\ud805\udf17', '\ud805\udf17', '\ud805\udf33\ud805\udf05'],  // @
  '\u0048': ['', '\ud805\udf29', '\ud805\udf33\ud805\udf05'],  // @
  '\u0049': ['\ud805\udf23', '\ud805\udf23', '\ud805\udf33\ud805\udf05'],  // @
  '\u004a': ['\ud805\udf19', '\ud805\udf19', '\ud805\udf33\ud805\udf05'],  // @
  '\u004b': ['\ud805\udf29', '\ud805\udf15', '\ud805\udf33\ud805\udf05'],  // @
  '\u004c': ['', '', '\ud805\udf33\ud805\udf05'],  // @
  '\u004d': ['\ud805\udf28', '\ud805\udf22', '\ud805\udf33\ud805\udf05'],  // @
  '\u004e': ['\ud805\udf10', '\ud805\udf10', '\ud805\udf33\ud805\udf05'],  // @
  '\u004f': ['\ud805\udf2a', '', '\ud805\udf33\ud805\udf05'],  // @

  '\u0051': ['\ud805\udf26', '\ud805\udf26', '\ud805\udf33\ud805\udf05'],  // @
  '\u0052': ['\ud805\udf1e', '\ud805\udf1d', '\ud805\udf33\ud805\udf05'],  // @
  '\u0053': ['', '\ud805\udf1e', '\ud805\udf33\ud805\udf05'],  // @
  '\u0055': ['\ud805\udf25', '\ud805\udf25', '\ud805\udf33\ud805\udf05'],  // @
  '\u0057': ['\ud805\udf28\ud805\udf29', '\ud805\udf28\ud805\udf29', '\ud805\udf33\ud805\udf05'],  // @
  '\u0059': ['\ud805\udf1d', '\ud805\udf1d', '\ud805\udf33\ud805\udf05'],  // @
  '\u005a': ['', '', '\ud805\udf33\ud805\udf05'],  // @
  '\u005b': ['\ud805\udf02', '\ud805\udf02', '\ud805\udf33\ud805\udf05'],  // @
  '\u005c': ['\\', '\\', '\ud805\udf33\ud805\udf05'],  // @
  '\u005d': ['\ud805\udf27', '\ud805\udf27', '\ud805\udf33\ud805\udf05'],  // @
  '\u005f': [' ', ' ', '\ud805\udf33\ud805\udf05'],  // @

  '\u0060': ['\ud805\udf3c', '\ud805\udf3c', '\ud805\udf33\ud805\udf05'],  // @
  '\u0061': ['\ud805\udf21', '\ud805\udf21', '\ud805\udf33\ud805\udf05'],  // @
  '\u0062': ['\ud805\udf08', '\ud805\udf08', '\ud805\udf33\ud805\udf05'],  // @
  '\u0063': ['\ud805\udf0b', '\ud805\udf0b', '\ud805\udf33\ud805\udf05'],  // @
  '\u0064': ['\ud805\udf0b', '\ud805\udf0b', '\ud805\udf33\ud805\udf05'],  // @
  
  '\u0077': ['\ud805\udf30\ud805\udf2b', '\ud805\udf30\ud805\udf2b', ''],  // w
  '\u007b': ['{', '{', '\ud805\udf33\ud805\udf05'],  // @
  '\u007c': ['|', '|', '\ud805\udf33\ud805\udf05'],  // @
  '\u007d': ['}', '}', '\ud805\udf33\ud805\udf05'],  // @
  '\u007e': ['~', '~', '\ud805\udf33\ud805\udf05'],  // @

  '\u00a0': ['', ' ', '\ud805\udf33\ud805\udf05'],  // @
  '\u00a1': ['\ud805\udf00', '\ud805\udf00', '\ud805\udf33\ud805\udf05'],  // @
  '\u00a2': ['\ud805\udf01', '\ud805\udf01', '\ud805\udf33\ud805\udf05'],  // @
  '\u00a3': ['', '', '\ud805\udf33\ud805\udf05'],  // @
  '\u00a4': ['\ud805\udf15', '', '\ud805\udf33\ud805\udf05'],  // @
  '\u00a5': ['\ud805\udf29', '\ud805\udf29', '\ud805\udf33\ud805\udf05'],  // @
  '\u00a6': ['\ud805\udf17', '\ud805\udf17', '\ud805\udf33\ud805\udf05'],  // @
  '\u00a7': ['\ud805\udf02', '\ud805\udf02', '\ud805\udf33\ud805\udf05'],  // @
  '\u00a8': ['\ud805\udf0b', '\ud805\udf0b', '\ud805\udf33\ud805\udf05'],  // @
  '\u00ac': ['\ud805\udf19', '\ud805\udf19', '\ud805\udf33\ud805\udf05'],  // @
  '\u00ad': ['\ud805\udf10', '\ud805\udf10', '\ud805\udf33\ud805\udf05'],  // @
  '\u00af': ['\ud805\udf0b', '', '\ud805\udf33\ud805\udf05'],  // @
  
  '\u00b4': ['\ud805\udf13', '\ud805\udf13', '\ud805\udf33\ud805\udf05'],  // @
  '\u00b5': ['\ud805\udf04', '\ud805\udf04', '\ud805\udf33\ud805\udf05'],  // @
  '\u00b6': ['\ud805\udf0c', '\ud805\udf0c', '\ud805\udf33\ud805\udf05'],  // @
  '\u00b7': ['\ud805\udf14', '\ud805\udf0c\ud805\udf27', '\ud805\udf33\ud805\udf05'],  // @
  '\u00b8': ['\ud805\udf14', '\ud805\udf14', '\ud805\udf33\ud805\udf05'],  // @
  '\u00b9': ['\ud805\udf03', '\ud805\udf03', '\ud805\udf33\ud805\udf05'],  // @
  '\u00ba': ['\ud805\udf08', '\ud805\udf08', '\ud805\udf33\ud805\udf05'],  // @
  '\u00bb': ['\ud805\udf06', '\ud805\udf06', '\ud805\udf33\ud805\udf05'],  // @
  '\u00bc': ['', '\ud805\udf07', '\ud805\udf33\ud805\udf05'],  // @
  '\u00bd': ['', '\ud805\udf12', '\ud805\udf33\ud805\udf05'],  // @
  '\u00be': ['', '\ud805\udf1f', '\ud805\udf33\ud805\udf05'],  // @
  '\u00bf': ['\ud805\udf1d', '\ud805\udf1d', '\ud805\udf33\ud805\udf05'],  // @

  '\u00c0': ['\ud805\udf18', '\ud805\udf18', '\ud805\udf33\ud805\udf05'],  // @
  '\u00c1': ['\ud805\udf09', '\ud805\udf09', '\ud805\udf33\ud805\udf05'],  // @
  '\u00c2': ['\ud805\udf0e', '\ud805\udf0e', '\ud805\udf33\ud805\udf05'],  // @
  '\u00c3': ['\ud805\udf0d', '\ud805\udf0d', '\ud805\udf33\ud805\udf05'],  // @
  '\u00c4': ['\ud805\udf1e', '\ud805\udf1e', '\ud805\udf33\ud805\udf05'],  // @
  '\u00c5': ['\ud805\udf1e', '\ud805\udf1e', '\ud805\udf33\ud805\udf05'],  // @
  '\u00c6': ['', '\ud805\udf0e', '\ud805\udf33\ud805\udf05'],  // @
  '\u00c7': ['\ud805\udf30\ud805\udf2b', '\ud805\udf08\ud805\udf1f', '\ud805\udf33\ud805\udf05'],  // @
  '\u00c8': ['\ud805\udf22', '\ud805\udf22', '\ud805\udf33\ud805\udf05'],  // @
  '\u00ca': ['\ud805\udf0f', '\ud805\udf0f', '\ud805\udf33\ud805\udf05'],  // @
  '\u00cb': ['\ud805\udf11', '\ud805\udf11', '\ud805\udf33\ud805\udf05'],  // @
  '\u00cd': ['\ud805\udf12', '\ud805\udf12', '\ud805\udf33\ud805\udf05'],  // @
  '\u00ce': ['\ud805\udf2b', '\ud805\udf2b', '\ud805\udf33\ud805\udf05'],  // @

  '\u00d0': ['\ud805\udf20', '\ud805\udf20', '\ud805\udf33\ud805\udf05'],  // @
  '\u00d2': ['\ud805\udf21', '\ud805\udf21', '\ud805\udf33\ud805\udf05'],  // @
  '\u00d4': ['\ud805\udf22', '\ud805\udf22', '\ud805\udf33\ud805\udf05'],  // @
  '\u00d5': ['\ud805\udf23', '\ud805\udf23', '\ud805\udf33\ud805\udf05'],  // @
  '\u00d6': ['\ud805\udf28\ud805\udf29', '\ud805\udf28\ud805\udf29', '\ud805\udf33\ud805\udf05'],  // @
  '\u00d7': ['\ud805\udf2b', '', '\ud805\udf33\ud805\udf05'],  // @
  '\u00d8': ['\ud805\udf24', '\ud805\udf24', '\ud805\udf33\ud805\udf05'],  // @
  '\u00d9': ['\ud805\udf25', '\ud805\udf25-', '\ud805\udf33\ud805\udf05'],  // @

  '\u00e0': ['\ud805\udf26', '\ud805\udf26', '\ud805\udf33\ud805\udf05'],  // @
  '\u00e1': ['\ud805\udf2b', '\ud805\udf2b', '\ud805\udf33\ud805\udf05'],  // @
  '\u00e2': ['\ud805\udf28', '\ud805\udf28', '\ud805\udf33\ud805\udf05'],  // @
  '\u00e3': ['\ud805\udf27', '\ud805\udf27', '\ud805\udf33\ud805\udf05'],  // @
  '\u00e4': ['\ud805\udf29', '\ud805\udf29', '\ud805\udf33\ud805\udf05'],  // @

  '\u00f1': ['\ud805\udf31', '\ud805\udf31-', '\ud805\udf33\ud805\udf05'],  // @
  
  '\u0112': ['.', '.', '\ud805\udf33\ud805\udf05'],  // @
  '\u0160': ['\u030c', '\u030c', '\ud805\udf33\ud805\udf05'],  // @
  '\u0161': ['\ud805\udf0f\u030c', '\ud805\udf0f\u030c', '\ud805\udf33\ud805\udf05'],  // @
  '\u02c6': ['\u030c', '\u030c', '\ud805\udf33\ud805\udf05'],  // @
  '\u02c7': ['\u0302', '\u0302', '\ud805\udf33\ud805\udf05'],  // @
  '\u2022': ['\u2022', '\u2022', '\ud805\udf33\ud805\udf05'],  // @
  '\u2122': ['\u2122', '\ud805\udf1e', '\ud805\udf33\ud805\udf05'],  // @
};


function toLower(instring) {
  // If code in range 13a0-1eef, add ab70-13a0
  // If code in range 1ef0-1ef5, add 8
  return instring.toLowerCase();  // Check if this actually works for AHOM.
}

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
  var newText = outtext;

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}

