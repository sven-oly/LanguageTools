// Convert from old font-encoding Yoruba Ariya font to Unicode forms:

// Mappings for both arjyban, sujoyan, alaam, etc. encodings.
var map_encoding_names = [
  'Aryia', '', ''];

var private_use_map_combined = {
  '\u0000': ['\u0000'],
  '\u0023': ['\u20a6'],
  '\u003c': ['\u1ecd\u0301'],
  '\u003e': ['\u1ecc\u0301'],
  '\u0043': ['\u1eb8'],
  '\u0051': ['GB'],
  '\u0056': ['\u1ecc'],
  '\u0058': ['\u1e62'],
  '\u005a': ['\u1ecc\u0300'],
  '\u005b': ['LTD'],
  '\u005d': ['PLC'],
  '\u0063': ['\u1eb9'],
  '\u0071': ['gb'],
  '\u0076': ['\u1ecd'],
  '\u0078': ['\u1e63'],
  '\u007a': ['\u1ecd\u0300'],
  '\u007b': ['\u1eb8\u0300'],
  '\u007c': ['\u1eb9\u0300'],
  '\u007d': ['\u1eb9\u0301'],
  '\u00a4': ['Gb'],
  '\u00a5': ['\u00a5'],
  '\u00a7': ['\u1eb8\u0300'],
  '\u02c6': ['\u0302'],
  '\u02c6': ['\u0302'],

  // Private use
  '\ue000': ['{'],
  '\ue001': ['|'],
  '\ue002': ['}'],
  '\ue003': ['['],
  '\ue004': [']'],
  '\ue005': ['\u00a4'],
  '\ue006': ['q'],
  '\ue007': ['v'],
  '\ue008': ['x'],
  '\ue009': ['\u1ecd\u0302'],
  '\ue00a': ['\u1ecd\u0303'],
  '\ue00b': ['c'],
  '\ue00c': ['#'],
  '\ue00d': ['C'],
  '\ue00e': ['Q'],
  '\ue00f': ['V'],
  '\ue010': ['X'],
  '\ue011': ['\u1eb8\u0302'],
  '\ue012': ['\u1eb8\u0303'],
  '\ue013': ['\u1eb9\u0302'],
  '\ue014': ['\u1eb9\u0303'],
  '\ue015': ['\u2103'],
  '\ue016': ['\u2109'],
  '\ue017': ['\u0323'],
  '\ue018': ['<'],
  '\ue019': ['>'],
  '\ue01a': ['Z'],
  '\ue01b': ['z'],
  '\ue01c': ['\u00A7'],
  '\ue01d': ['\u1ecc\u0302'],
  '\ue01e': ['\u1ecc\u0302'],
  '\ue01f': ['\u0169'],
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
  newText = outtext;

  // Next, if needed, move some code points in context to get proper Unicode ordering.
  // Vowel sign to right of consonants:
  // ePattern = /\uD804\uDD2c\uD804([\uDD03-\uDD26])/gi;
  // eReplace = "\uD804$1\uD804\uDD2c";
  //var newText = outtext.replace(ePattern, eReplace);

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
