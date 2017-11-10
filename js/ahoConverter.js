// Convert from old font-encoding of Ahom text to Unicode forms:

// Mappings for Ahom old ASCII encoding to Unicode font
// Source: Stephen Morey
// Started 8-Nov-2017
var map_encoding_names = ['Ahom'];

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
