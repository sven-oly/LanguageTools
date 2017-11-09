// Convert from old font-encoding of Ahom text to Unicode forms:

// Mappings for Ahom old ASCII encoding to Unicode font
// Source: Stephen Morey
// Started 8-Nov-2017
var map_encoding_names = ['Ahom'];

var private_use_map_combined = {
  'k': ['\u11700'],
  'x': ['\u11701'],
  '[': ['\u11702'],
  'n': ['\u11703'],
  't': ['\u11704'],
  'XYZ'': ['\u11705'],  // TODO: Find the key for this, if any
'p': ['\u11706'],
'f': ['\u11707'],
'b': ['\u11708'],
'm': ['\u11709'],
'y': ['\u1170A'],
'c': ['\u1170B'],
'v': ['\u1170C'],
'r': ['\u1170D'],
'l': ['\u1170E'],
's': ['\u1170F'],
'N': ['\u11710'],
'h': ['\u11711'],
'A': ['\u11712'],
'd': ['\u11713'],
'D': ['\u11714'],
'g': ['\u11715'],
'XYZ2': ': ['\u11716'], // TODO: FIX
  'G': ['\u11717'],
  'B': ['\u11718'],
  'J': ['\u11719'],
  // Medials
  'R': ['\u1171D'],
  'S': ['\u1171E'],
'XYZ3': ['\u1171F'], // TODO: Fix
  ';': ['\u11720'],
  'a': ['\u11721'],
  'i': ['\u11722'],
  'I': ['\u11723'],
  'u': ['\u11724'],
  'U': ['\u11725'],
  'e': ['\u11726'],
  ']': ['\u11727'],
  'o': ['\u11728'],
  'j': ['\u11729'],
  'M': ['\u1172A'],
  'q': ['\u1172B'],
  // Numerals
  '0': ['\u11730'],
  '1': ['\u11731'],
  '2': ['\u11732'],
  '3': ['\u11733'],
  '4': ['\u11734'],
  '5': ['\u11735'],
  ['6': '\u11736'],
  ['\'7': u11737'],
['\'8': u11738'],
  '9': ['\u11739'],
  '(:)': ['\u1173A'],
'XYZ4': ['\u1173B'], // FIX

  // Punctuation
  ',': ['\u1173C'],
  '.': ['\u1173D'],
  '@': ['\u1173E'],
  'H': ['\u1173F'],
  // Not encoded section
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

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
