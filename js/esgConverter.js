// Convert from old font-encoding Yoruba Ariya font to Unicode forms:

// Mappings for old Yoruba non-Unicode forms
var map_encoding_names = [
  'Masaram Gondi', ''];

// TODO: Fix Gondi Masaram mappings
var private_use_map_combined = {
  '\u0000': ['\u0000'],
  '\u0021': ['!', ''],
  '\u0022': ['\ud807\udd2a\ud807\udd45', ''],
  '\u0023': ['\ud807\udd26\ud807\udd34', ''],
  '\u0024': ['+', ''],
  '\u0025': ['\ud807\udd41', ''],
  '\u0026': ['-', ''],
  '\u0027': ['\ud807\udd29\ud807\udd45', ''],
  '\u0028': [';', ''],
  '\u002a': ['\'', ''],
  '\u002b': ['.', ''],
  '\u002c': ['\ud807\udd06\ud807\udd45', ''],
  '\u002d': ['\ud807\udd42', '\u1ecd\u0301'],
  '\u002e': ['???', ''],
  '\u002f': ['\ud807\udd1e\ud807\udd45', ''],
  '\u0030': ['\ud807\udd50', '\u1ecd\u0301'],
  '\u0031': ['\ud807\udd51', '\u1ecd\u0301'],
  '\u0032': ['\ud807\udd52', '\u1ecd\u0301'],
  '\u0033': ['\ud807\udd53', '\u1ecd\u0301'],
  '\u0034': ['\ud807\udd54', '\u1ecd\u0301'],
  '\u0035': ['\ud807\udd55', '\u1ecd\u0301'],
  '\u0036': ['\ud807\udd56', '\u1ecd\u0301'],
  '\u0037': ['\ud807\udd57', '\u1ecd\u0301'],
  '\u0038': ['\ud807\udd58', '\u1ecd\u0301'],
  '\u0039': ['\ud807\udd59', '\u1ecd\u0301'],
  '\u003a': ['\ud807\udd26\ud807\udd35', '\u1ecd\u0301'],
  '\u003b': ['\ud807\udd25', '\u1ecd\u0301'],
  '\u003c': ['\ud807\udd27\ud807\udd31', '\u1ecd\u0301'],
  '\u003d': ['\ud807\udd30', '\u1ecd\u0301'],
  '\u003e': ['\ud807\udd2e', ''],
  '\u003f': ['\ud807\udd0f\ud807\udd45', ''],
  '\u0040': ['\\', ''],
  '\u0041': ['???', ''],
  '\u0042': ['\ud807\udd17', ''],
  '\u0043': ['\ud807\udd22\ud807\udd45', ''],
  '\u0044': ['\ud807\udd0c\ud807\udd45', ''],
  '\u0045': ['\ud807\udd24\ud807\udd45', ''],
  '\u0046': ['\ud807\udd1c\ud807\udd45', ''],
  '\u0047': ['\ud807\udd2c\ud807\udd45', ''],
  '\u0048': ['\ud807\udd23\ud807\udd45', ''],
  '\u0049': ['\ud807\udd20\ud807\udd45', ''],
  '\u004a': ['???', ''],
  '\u004b': ['\ud807\udd2f', ''],
  '\u004c': ['\ud807\udd2b\ud807\udd45', ''],
  '\u004d': ['\ud807\udd18', ''],
  '\u004e': ['\ud807\udd12', ''],
  '\u004f': ['\ud807\udd0d\ud807\udd45', ''],
  '\u0050': ['\ud807\udd11\ud807\udd45', ''],
  '\u0051': ['\ud807\udd21', 'GB'],
  '\u0052': ['\ud807\udd1b\ud807\udd45', ''],
  '\u0053': ['\ud807\udd3c', 'GB'],
  '\u0054': ['\ud807\udd13\ud807\udd45', ''],
  '\u0055': ['\ud807\udd1f\ud807\udd45', ''],
  '\u0056': ['\ud807\udd16', 'GB'],
  '\u0057': ['\ud807\udd21\ud807\udd45', ''],
  '\u0058': ['\ud807\udd0e\ud807\udd45', ''],
  '\u0059': ['\ud807\udd27\ud807\udd45', ''],
  '\u005a': ['\ud807\udd43', '\u1e62'],
  '\u005b': ['\ud807\udd21\ud807\udd45', ''],
  '\u005c': ['?', ''],
  '\u005d': [',', ''],
  '\u0060': ['\ud807\udd43', ''],
  '\u0061': ['\ud807\udd40', ''],
  '\u0062': ['\ud807\udd02', ''],
  '\u0063': ['\ud807\udd22', ''],
  '\u0064': ['\ud807\udd0c', ''],
  '\u0065': ['\ud807\udd24', ''],
  '\u0066': ['\ud807\udd32', ''],
  '\u0068': ['\ud807\udd33', ''],
  '\u0067': ['\ud807\udd2c', ''],
  '\u0069': ['\ud807\udd20', ''],
  '\u006a': ['\ud807\udd26', ''],
  '\u006b': ['\ud807\udd31', ''],
  '\u006c': ['\ud807\udd2b', ''],
  '\u006d': ['\ud807\udd04', ''],
  '\u006e': ['\ud807\udd1d', ''],
  '\u006f': ['\ud807\udd28', ''],
  '\u0070': ['\ud807\udd11', ''],
  '\u0071': ['\ud807\udd34', ''],
  '\u0072': ['\ud807\udd1b', ''],
  '\u0073': ['\ud807\udd3a', ''],
  '\u0074': ['\ud807\udd13', ''],
  '\u0075': ['\ud807\udd1f', ''],
  '\u0076': ['\ud807\udd00', ''],
  '\u0077': ['\ud807\udd35', ''],
  '\u0078': ['\ud807\udd0e', ''],
  '\u0079': ['\ud807\udd27', ''],
  '\u007a': ['\ud807\udd36', ''],
  '\u007b': ['\ud807\udd2d\ud807\udd45', ''],
  '\u007c': ['\ud807\udd1e', ''],
  '\u007d': ['???', ''],
  '\u007e': ['\ud807\udd44', ''],
  '\u00a8': ['\ud807\udd3d', ''],
  '\u00a9': ['\ud807\udd3f', ''],
  '\u00b6': ['\ud807\udd21\ud807\udd45', ''],
  '\u00bc': ['(', ''],
  '\u00bd': [')', ''],
  '\u00a5': ['\u00a5', ''],
  '\u00a7': ['\u1eb8\u0300', ''],
  '\u2014': ['\ud807\udd0c\ud807\udd36', ''],
  '\u2018': ['\ud807\udd2a\ud807\udd45', ''],
  '\u2019': ['\ud807\udd2a\ud807\udd45', ''],
  '\u201d': ['\ud807\udd29\ud807\udd45', ''],
  '\u02c6': ['\u0302', '\u0302'],
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
