// Convert from old font-encoding of Oneida text to Unicode forms:

// Mappings for Oneida font encodings
var map_encoding_names = [
  'Oneida'];

var private_use_map_combined = {
  '@': ['\u00e1'],
  '#': ['\u00e9'],
  '$': ['\u00ed'],
  '%': ['\u00f3'],
  '^': ['\u028c\u0301'],
  '&': ['\u00fa'],
  '<': ['\u028c'],
  '>': ['\u0294'],
  '=': ['\u00b7'],
};

function toLower(instring) {
  // If code in range 13a0-1eef, add ab70-13a0
  // If code in range 1ef0-1ef5, add 8
  return instring.toLowerCase();
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

  // Insert more complex replacements here.
  var newText = outtext;

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
