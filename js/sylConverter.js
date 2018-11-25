// Convert from old font-encoding of Lepcha text to Unicode forms:

// Mappings for Lepcha font encodings
var map_encoding_names = [
  'SumraL'];

// aa00 is the base
var private_use_map_combined = {
    '\u0021': ['!'],
    '\u0022': ['\"'],
    '\u0023': ['#'],
    '\u0024': ['$'],
    '\u0025': ['%'],
    '\u0026': [''],
    '\u0027': ['\''],
    '\u0028': ['('],
    '\u0029': [')'],
    '\u002a': ['*'],
    '\u002b': ['+'],
    '\u002c': [','],
    '\u002d': ['-'],
    '\u002e': ['.'],
    '\u002f': ['/'],
    '\u0030': ['\u09e6'],
    '\u0031': ['\u09e7'],
    '\u0032': ['\u09e8'],
    '\u0033': ['\u09e9'],
    '\u0034': ['\u09ea'],
    '\u0035': ['\u09eb'],
    '\u0036': ['\u09ec'],
    '\u0037': ['\u09ed'],
    '\u0038': ['\u09ee'],
    '\u0039': ['\u09ef'],

    '\u0041': ['\ua800'],
    '\u0042': ['\ua801'],
    '\u0043': ['\ua803'],
    '\u0044': ['\ua804'],
    '\u0045': ['\ua805'],
    '\u0046': ['\ua807'],
    '\u0047': ['\ua808'],
    '\u0048': ['\ua809'],
    '\u0049': ['\ua80a'],
    '\u004a': ['\ua81b'],
    '\u004b': ['\ua80c'],
    '\u004c': ['\ua80d'],
    '\u004d': ['\ua80e'],
    '\u004e': ['\ua80f'],
    '\u004f': ['\ua810'],

    '\u0050': ['\ua811'],
    '\u0051': ['\ua812'],
    '\u0052': ['\ua813'],
    '\u0053': ['\ua814'],
    '\u0054': ['\ua815'],
    '\u0055': ['\ua816'],
    '\u0056': ['\ua817'],
    '\u0057': ['\ua818'],
    '\u0058': ['\ua819'],
    '\u0059': ['\ua81a'],
    '\u005a': ['\ua81b'],
    '\u005e': ['\ua806'],  // ???

    '\u0061': ['\ua81c'],
    '\u0062': ['\ua81d'],
    '\u0063': ['\ua81e'],
    '\u0064': ['\ua81f'],
    '\u0065': ['\ua820'],
    '\u0066': ['\ua821'],
    '\u0067': ['\ua822'],
    '\u0068': ['\ua823'],
    '\u0069': ['\ua824'],
    // '\u006a': ['\u1c08'],   // ???
    '\u006b': ['\ua825'],
    // '\u006c': ['\u1c08'],   // ???
    '\u006d': ['\u274b'],
    '\u006e': ['\ua826'],
    '\u006f': ['\ua826'],

    '\u0070': ['\ua802'],
    '\u0071': ['\ua80b'],
    '\u0072': ['\u1c1b'],
    '\u0073': ['\u1c20'],
    '\u0074': ['\u1c0a'],
    '\u0075': ['\u1c2a'],
    '\u0076': ['\u1c1f'],
    '\u0077': ['\ua828'],
    '\u0078': ['\ua829'],
    '\u0079': ['\ua82a'],
    '\u007a': ['\u1c19'],
    '\u007e': ['\u09f8'],

    '\u00c0': ['\u1c00\u1c24'],
    '\u00c1': ['\u1c02\u1c24'],
    '\u00c2': ['\u1c03\u1c24'],
    '\u00c3': ['\u1c0a\u1c24'],
    '\u00c4': ['\u1c0b\u1c24'],
    '\u00c5': ['\u1c0c\u1c24'],
    '\u00c8': ['\u1c0e\u1c24'],
    '\u00c9': ['\u1c10\u1c24'],
    '\u00ca': ['\u1c11\u1c24'],
    '\u00cb': ['\u1c13\u1c24'],
    '\u00cc': ['\u1c15\u1c24'],
    '\u00cd': ['\u1c16\u1c24'],
    '\u00ce': ['\u1c1c\u1c24'],
    '\u00cf': ['\u1c1d\u1c24'],

    '\u00d2': ['\u1c1f\u1c24'],
    '\u00d3': ['\u1c01\u1c24'],
    '\u00d4': ['\u1c04\u1c24'],
    '\u00d5': ['\u1c0f\u1c24'],
    '\u00d6': ['\u1c12\u1c24'],
    '\u00d9': ['\u1c13\u1c24'],
    '\u00da': ['\u1c15\u1c24'],
    '\u00db': ['\u1c1e\u1c24'],
    '\u00dc': ['\u1c23\u1c24'],
    '\u00dd': ['\u1c00\u1c25'],

    '\u00e0': ['\u1c03\u1c25'],
    '\u00e1': ['\u1c05\u1c25'],
    '\u00e2': ['\u1c1e\u1c25'],
    '\u00e3': ['\u1c11\u1c25'],
    '\u00e4': ['\u1c13\u1c25'],
    '\u00e5': ['\u1c15\u1c25'],
    '\u00e8': ['\u1c1d\u1c25\u1c24 '],
    '\u00e9': ['\u1c00\u1c25\u1c24'],
    '\u00ea': ['\u1c04\u1c25\u1c24'],
    '\u00eb': ['\u1c05\u1c25\u1c24'],
    '\u00ec': ['\u1c0e\u1c25\u1c24'],
    '\u00ed': ['\u1c11\u1c25\u1c24'],
    '\u00ee': ['\u1c13\u1c25\u1c24'],
    '\u00ef': ['\u1c15\u1c25\u1c24'],

    '\u00f2': ['\u1c1d\u1c25\u1c24'],
    '\u00f3': ['\u1c21\u1c25\u1c24'],
};


function toLower(instring) {
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
