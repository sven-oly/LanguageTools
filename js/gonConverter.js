// Convert from old font-encoding Yoruba Ariya font to Unicode forms:

// Mappings for old Yoruba non-Unicode forms
var map_encoding_names = [
  'Ariya', 'YorubaOK'];

// TODO: Fix YorubaOK mappings
var private_use_map_combined = {
  '\u0000': ['\u0000'],
  '\u0023': ['\ud807\udd26\ud807\udd34', '\ud807\udd26\ud807\udd34'],
  '\u0024': ['+', '\ud807\udd26\ud807\udd34'],
  '\u0025': ['\ud807\udd41', '\u1ecd\u0301'],
  '\u0026': ['-', '\u1ecd\u0301'],
  '\u0028': [';', '\u1ecd\u0301'],
  '\u002a': ['\'', '\u1ecd\u0301'],
  '\u002b': ['.', '\u1ecd\u0301'],
  '\u002d': ['\ud807\udd42', '\u1ecd\u0301'],
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
  '\u003c': ['\ud807\udd19', '\u1ecd\u0301'],
  '\u003d': ['\ud807\udd30', '\u1ecd\u0301'],
  '\u003e': ['\ud807\udd2e', '\u1ecd\u0301'],
  '\u003f': ['\u1ecc\u0301', '\u1ecc\u0301'],
  '\u0042': ['\ud807\udd17', '\u1ecc\u0301'],
  '\u0043': ['\u1eb8', '\u1eb8'],
  '\u0047': ['\ud807\udd2c', '\u1ecc\u0301'],
  '\u0048': ['\ud807\udd23', '\u1ecc\u0301'],
  '\u0049': ['\ud807\udd17', '\u1ecc\u0301'],
  '\u004a': ['\u1ecc\u0323', '\u1ecc\u0301'],
  '\u004b': ['\u1ecc\u0323', '\u1ecc\u0301'],
  '\u004c': ['\u1ecc\u0323', '\u1ecc\u0301'],
  '\u004d': ['\ud807\udd18', '\u1ecc\u0301'],
  '\u004e': ['\ud807\udd12', '\u1ecc\u0301'],
  '\u0051': ['\ud807\udd21', 'GB'],
  '\u0053': ['\ud807\udd3c', 'GB'],
  '\u0056': ['\ud807\udd16', 'GB'],
  '\u005a': ['\ud807\udd43', '\u1e62'],
  '\u005a': ['\u1ecc\u0300', '\u1ecc\u0300'],
  '\u005b': ['LTD', 'LTD'],
  '\u005d': ['PLC', 'PLC'],
  '\u0060': ['\ud807\udd43', 'gb'],
  '\u0061': ['\ud807\udd40', 'gb'],
  '\u0062': ['\ud807\udd02', 'gb'],
  '\u0063': ['\ud807\udd22', '\u1eb9'],
  '\u0064': ['\ud807\udd0c', 'gb'],
  '\u0065': ['\ud807\udd24', 'gb'],
  '\u0066': ['\ud807\udd32', 'gb'],
  '\u0068': ['\ud807\udd33', 'gb'],
  '\u0069': ['\ud807\udd20', 'gb'],
  '\u006a': ['\ud807\udd26', 'gb'],
  '\u006e': ['\ud807\udd1d', 'gb'],
  '\u006f': ['\ud807\udd0d', 'gb'],
  '\u0070': ['\ud807\udd11', 'gb'],
  '\u0071': ['\ud807\udd34', 'gb'],
  '\u0072': ['\ud807\udd1b', 'gb'],
  '\u0073': ['\ud807\udd47', 'gb'],
  '\u0076': ['\ud807\udd00', 'gb'],
  '\u0077': ['\ud807\udd35', 'gb'],
  '\u0079': ['\ud807\udd27', 'gb'],
  '\u007a': ['\ud807\udd36', 'gb'],
  '\u00a4': ['Gb', 'Gb'],
  '\u00a5': ['\u00a5', '\u00a5'],
  '\u00a7': ['\u1eb8\u0300', '\u1eb8\u0300'],
  '\u02c6': ['\u0302', '\u0302'],
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
