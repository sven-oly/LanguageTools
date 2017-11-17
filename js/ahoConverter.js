// Convert from old font-encoding of Ahom text to Unicode forms:

// Mappings for Ahom old ASCII encoding to Unicode font
// Source: Stephen Morey
// Started 8-Nov-2017
var map_encoding_names = ['Ahom'];

// 11700
var private_use_map_combined = {
  'k': ['\ud805\udf00'],  // D805 DF08
  'x': ['\ud805\udf01'],
  '[': ['\ud805\udf02'],
  'n': ['\ud805\udf03'],
  't': ['\ud805\udf04'],
  'XYZ': ['\ud805\udf05'],  // TODO: Find the key for this, if any
'p': ['\ud805\udf06'],
'f': ['\ud805\udf07'],
'b': ['\ud805\udf08'],
'm': ['\ud805\udf09'],
'y': ['\ud805\udf0A'],
'c': ['\ud805\udf0B'],
'v': ['\ud805\udf0C'],
'r': ['\ud805\udf0D'],
'l': ['\ud805\udf0E'],
's': ['\ud805\udf0F'],
'N': ['\ud805\udf10'],
'h': ['\ud805\udf11'],
'A': ['\ud805\udf12'],
'd': ['\ud805\udf13'],
'D': ['\ud805\udf14'],
'g': ['\ud805\udf15'],
'XYZ2': ['\ud805\udf16'], // TODO: FIX
  'G': ['\ud805\udf17'],
  'B': ['\ud805\udf18'],
  'J': ['\ud805\udf19'],
  // Medials
  'R': ['\ud805\udf1D'],
  'S': ['\ud805\udf1E'],
'XYZ3': ['\ud805\udf1F'], // TODO: Fix
  ';': ['\ud805\udf20'],
  'a': ['\ud805\udf21'],
  'i': ['\ud805\udf22'],
  'I': ['\ud805\udf23'],
  'u': ['\ud805\udf24'],
  'U': ['\ud805\udf25'],
  'e': ['\ud805\udf26'],
  ']': ['\ud805\udf27'],
  'o': ['\ud805\udf28'],
  'j': ['\ud805\udf29'],
  'M': ['\ud805\udf2A'],
  'q': ['\ud805\udf2B'],
  // Numerals
  '0': ['\ud805\udf30'],
  '1': ['\ud805\udf31'],
  '2': ['\ud805\udf32'],
  '3': ['\ud805\udf33'],
  '4': ['\ud805\udf34'],
  '5': ['\ud805\udf35'],
  '6': ['\ud805\udf36'],
  '7': ['\ud805\udf37'],
  '8': ['\ud805\udf38'],
  '9': ['\ud805\udf39'],
  '(:)': ['\ud805\udf3A'],
'XYZ4': ['\ud805\udf3B'], // FIX

  // Punctuation
  ',': ['\ud805\udf3C'],
  '.': ['\ud805\udf3D'],
  '@': ['\ud805\udf3E'],
  'H': ['\ud805\udf3F'],
  // Not encoded section
  
  '\u0020': [' ', ' ', ' '],  // Space
  '\u0021': ['!', '\u003b', '\ud805\udf33\ud805\udf05'],  // #
  '\u0022': ['\"', '\u003b', '\ud805\udf33\ud805\udf05'],  // #
  '\u0023': ['\u1046', '\u003b', '\ud805\udf33\ud805\udf05'],  // #
  '\u0028': ['(', '(', '\ud805\udf33\ud805\udf05'],  // #
  '\u002c': [',', '(', '\ud805\udf33\ud805\udf05'],  // #
  '\u002e': ['.', '(', '\ud805\udf33\ud805\udf05'],  // #
  '\u002f': ['\u104b', '(', '\ud805\udf33\ud805\udf05'],  // #

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
  '\u003b': ['\ud805\udf20', '\ud805\udf1f', '\ud805\udf34'],  // semicolon
  '\u003c': ['\u003c', '\ud805\udf13', '<'],  // <
  '\u003d': ['\u003d', '\u003d', '='],  // =
  '\u003e': ['\u003e', '\ud805\udf12', '>'],  // >
  '\u003f': ['\u003f', '\u003f', '?'],  // ?
  '\u0041': ['\ud805\udf12', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u0042': ['\ud805\udf18', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u0044': ['\ud805\udf14', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u0045': ['\ud805\udf14', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u0047': ['\ud805\udf17', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u0049': ['\ud805\udf23', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u004a': ['\ud805\udf19', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u004b': ['\ud805\udf29', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u004c': ['\ud805\udf2b', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u004d': ['\ud805\udf2a', '-', '\ud805\udf33\ud805\udf05'],  // @
  '\u004e': ['\ud805\udf10', '-', '\ud805\udf33\ud805\udf05'],  // @
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
