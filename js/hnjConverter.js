// Mappings for Nyiakeng font
var map_encoding_names = [
  'Green Hmong'];

var private_use_map_combined = {
  '\u0020': [' '],
  '\u0021': ['!'],
  '\u0022': ['\"'],
  '\u0023': ['#'],
  '\u0024': ['\ud838\udd4e'],
  '\u0025': ['%'],
  '\u0026': ['&'],
  '\u0027': ['\ud838\udd39'],
  '\u0028': ['('],
  '\u0029': [')'],
  '\u002a': ['\u2605'],
  '\u002b': ['+'],
  '\u002c': [','],
  '\u002d': ['-'],
  '\u002e': ['.'],
  '\u002f': ['/'],

  '\u0030': ['\ud838\udd40'],
  '\u0031': ['\ud838\udd41'],
  '\u0032': ['\ud838\udd42'],
  '\u0033': ['\ud838\udd43'],
  '\u0034': ['\ud838\udd44'],
  '\u0035': ['\ud838\udd45'],
  '\u0036': ['\ud838\udd46'],
  '\u0037': ['\ud838\udd47'],
  '\u0038': ['\ud838\udd48'],
  '\u0039': ['\ud838\udd49'],
  '\u003a': [':'],
  '\u003b': [';'],
  '\u003c': ['\ud838\udd37'],
  '\u003d': ['='],
  '\u003e': ['\ud838\udd3c'],
  '\u003f': ['?'],
  '\u0040': ['\ud838\udd4f'],
  '\u0041': ['\ud838\udd25'],
  '\u0042': ['\ud838\udd1e'],
  '\u0043': ['\ud838\udd0c'],
  '\u0044': ['\ud838\udd1d'],
  '\u0045': ['\ud838\udd32'],
  '\u0046': ['\ud838\udd35'],
  '\u0047': ['\ud838\udd13'],
  '\u0048': ['\ud838\udd1f'],
  '\u0049': ['\ud838\udd31'],
  '\u004a': ['\ud838\udd0d'],
  '\u004b': ['\ud838\udd07'],
  '\u004c': ['\ud838\udd23'],
  '\u004d': ['\ud838\udd20'],
  '\u004e': ['\ud838\udd22'],
  '\u004f': ['\ud838\udd29'],

  '\u0050': ['\ud838\udd21'],
  '\u0051': ['\ud838\udd19'],
  '\u0052': ['\ud838\udd11'],
  '\u0053': ['\ud838\udd0a'],
  '\u0054': ['\ud838\udd02'],
  '\u0055': ['\ud838\udd2b'],
  '\u0056': ['\ud838\udd15'],
  '\u0057': ['\ud838\udd2a'],
  '\u0058': ['\ud838\udd1b'],
  '\u0059': ['\ud838\udd10'],
  '\u005a': ['\ud838\udd38'],
  '\u005b': ['\ud838\udd3d'],
  '\u005c': ['\\'],
  '\u005d': ['\ud838\udd36'],
  '\u005e': ['\u2192'],
  '\u005f': ['_'],

  '\u0060': ['`'],
  '\u0061': ['\ud838\udd24'],
  '\u0062': ['\ud838\udd1c'],
  '\u0063': ['\ud838\udd08'],
  '\u0064': ['\ud838\udd0f'],
  '\u0065': ['\ud838\udd30'],
  '\u0066': ['\ud838\udd34'],
  '\u0067': ['\ud838\udd01'],
  '\u0068': ['\ud838\udd04'],
  '\u0069': ['\ud838\udd33'],
  '\u006a': ['\ud838\udd14'],
  '\u006b': ['\ud838\udd0e'],
  '\u006c': ['\ud838\udd09'],
  '\u006d': ['\ud838\udd00'],
  '\u006e': ['\ud838\udd05'],
  '\u006f': ['\ud838\udd28'],

  '\u0070': ['\ud838\udd1a'],
  '\u0071': ['\ud838\udd17'],
  '\u0072': ['\ud838\udd16'],
  '\u0073': ['\ud838\udd26'],
  '\u0074': ['\ud838\udd03'],
  '\u0075': ['\ud838\udd27'],
  '\u0076': ['\ud838\udd12'],
  '\u0077': ['\ud838\udd2c'],
  '\u0078': ['\ud838\udd06'],
  '\u0079': ['\ud838\udd18'],
  '\u007a': ['\ud838\udd0b'],
  '\u007b': ['\ud838\udd3a'],
  '\u007c': ['\u2190'],
  '\u007d': ['\ud838\udd3b'],
  '\u007e': ['~'],
};

function toLower(instring) {
  // If code in range 13a0-1eef, add ab70-13a0
  // If code in range 1ef0-1ef5, add 8
  return instring.toLowerCase();  // Check if this actually works for CHR.
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
      // Only one mapping is implemented as of 25-Oct-2019
      var result = private_use_map_combined[c];  // [encodingIndex];
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
