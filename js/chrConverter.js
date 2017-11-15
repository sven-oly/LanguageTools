// Convert from old font-encoding of Cherokee text to Unicode forms:

// Mappings for both Old Cherokee font
var map_encoding_names = [
  'OldCherokee'];

var private_use_map_combined = {
  '\u0020': ['\u0020'],
  '\uf020': ['\u0020'],
  '\u0021': ['\u13b1'],
  '\uf021': ['\u13b1'],
  '\u0022': ['\u0022'],
  '\uf022': ['\u0022'],
  '\u0023': ['\u13ab'],
  '\uf023': ['\u13ab'],
  '\u0024': ['\u13b0'],
  '\uf024': ['\u13b0'],
  '\u0025': ['\u13b9'],
  '\uf025': ['\u13b9'],
  '\u0026': ['\u13e1'],
  '\uf026': ['\u13e1'],
  '\u0027': ['\u0027'],
  '\uf027': ['\u0027'],
  '\u0028': ['\u0028'],
  '\uf028': ['\u0028'],
  '\u0029': ['\u0029'],
  '\uf029': ['\u0029'],
  '\u002a': ['\u13ba'],
  '\uf02a': ['\u13ba'],
  '\u002b': ['\u13bd'],
  '\uf02b': ['\u13bd'],
  '\u002c': ['\u002c'],
  '\uf02c': ['\u002c'],
  '\u002d': ['\u13c0'],
  '\uf02d': ['\u13c0'],
  '\u002e': ['\u002e'],
  '\uf02e': ['\u002e'],
  '\u002f': ['\u13c2'],
  '\uf02f': ['\u13c2'],

  '\u0030': ['\u13c4'],
  '\uf030': ['\u13c4'],
  '\u0031': ['ᏣᎳᎩ'],
  '\uf031': ['ᏣᎳᎩ'],
  '\u0032': ['ᎣᏏᏲ'],
  '\uf032': ['ᎣᏏᏲ'],
  '\u0033': ['ᏩᏙ'],
  '\uf033': ['ᏩᏙ'],
  '\u0034': ['\u13d9'],
  '\uf034': ['\u13d9'],
  '\u0035': ['\u13e6'],
  '\uf035': ['\u13e6'],
  '\u0036': ['\u13dc'],
  '\uf036': ['\u13dc'],
  '\u0037': ['\u13cb'],
  '\uf037': ['\u13cb'],
  '\u0038': ['\u13d6'],
  '\uf038': ['\u13d6'],
  '\u0039': ['\u13d2'],
  '\uf039': ['\u13d2'],
  '\u003a': ['\u13e0'],
  '\uf03a': ['\u13e0'],
  '\u003b': ['\u13e8'],
  '\uf03b': ['\u13e8'],
  '\u003c': ['\u13e2'],
  '\uf03c': ['\u13e2'],
  '\u003d': ['\u13f3'],
  '\uf03d': ['\u13f3'],
  '\u003e': [''],
  '\uf03e': [''],
  '\u000f': [''],
  '\uf03f': [''],

  '\u0040': ['\u13c7'],
  '\uf040': ['\u13c7'],
  '\u0041': ['\u13cc'],
  '\uf041': ['\u13cc'],
  '\u0042': ['\u13f0'],
  '\uf042': ['\u13f0'],
  '\u0043': ['\u13df'],
  '\uf043': ['\u13df'],
  '\u0044': ['\u13d0'],
  '\uf044': ['\u13d0'],
  '\u0045': ['\u13e3'],
  '\uf045': ['\u13e3'],
  '\u0046': ['\u13c8'],
  '\uf046': ['\u13c8'],
  '\u0047': ['\u13e5'],
  '\uf047': ['\u13e5'],
  '\u0048': ['\u13b2'],
  '\uf048': ['\u13b2'],
  '\u0049': ['\u13f1'],
  '\uf049': ['\u13f1'],
  '\u004a': ['\u13ab'],
  '\uf04a': ['\u13ab'],
  '\u004b': ['\u13a7'],
  '\uf04b': ['\u13a7'],
  '\u004c': ['\u13ae'],
  '\uf04c': ['\u13ae'],
  '\u004d': ['\u13b7'],
  '\uf04d': ['\u13b7'],
  '\u004e': ['\u13bb'],
  '\uf04e': ['\u13bb'],
  '\u004f': ['\u13ec'],
  '\uf04f': ['\u13ec'],

  '\u0050': ['\u13ea'],
  '\uf050': ['\u13ea'],
  '\u0051': ['\u13c6'],
  '\uf051': ['\u13c6'],
  '\u0052': ['\u13cf'],
  '\uf052': ['\u13cf'],
  '\u0053': ['\u13ce'],
  '\uf053': ['\u13ce'],
  '\u0054': ['\u13d8'],
  '\uf054': ['\u13d8'],
  '\u0055': ['\u13ad'],
  '\uf055': ['\u13ad'],
  '\u0056': ['\u13d3'],
  '\uf056': ['\u13d3'],
  '\u0057': ['\u13eb'],
  '\uf057': ['\u13eb'],
  '\u0058': ['\u13ed'],
  '\uf058': ['\u13ed'],
  '\u0059': ['\u13f2'],
  '\uf059': ['\u13f2'],
  '\u005a': ['\u13c3'],
  '\uf05a': ['\u13c3'],
  '\u005b': ['\u13d5'],
  '\uf05b': ['\u13d5'],
  '\u005c': ['\u13b6'],
  '\uf05c': ['\u13b6'],
  '\u005d': ['\u13bb'],
  '\uf05d': ['\u13bb'],
  '\u005e': ['\u13dd'],
  '\uf05e': ['\u13dd'],
  '\u005f': ['\u13bc'],
  '\uf05f': ['\u13bc'],

  '\u0060': [''],
  '\uf060': [''],
  '\u0061': ['\u13a0'],
  '\uf061': ['\u13a0'],
  '\u0062': ['\u13a8'],
  '\uf062': ['\u13a8'],
  '\u0063': ['\u13d3'],
  '\uf063': ['\u13d3'],
  '\u0064': ['\u13d7'],
  '\uf064': ['\u13d7'],
  '\u0065': ['\u13a1'],
  '\uf065': ['\u13a1'],
  '\u0066': ['\u13a9'],
  '\uf066': ['\u13a9'],
  '\u0067': ['\u13a6'],
  '\uf067': ['\u13a6'],
  '\u0068': ['\u13af'],
  '\uf068': ['\u13af'],
  '\u0069': ['\u13a2'],  '\uf069': ['\u13a2'],  // L
  '\u006a': ['\u13da'],
  '\uf06a': ['\u13da'],
  '\u006b': ['\u13b8'],  '\uf06b': ['\u13b8'],  //N
  '\u006c': ['\u13b5'],
  '\uf06c': ['\u13b5'],
  '\u006d': ['\u13c5'],
  '\uf06d': ['\u13c5'],
  '\u006e': ['\u13be'],
  '\uf06e': ['\u13be'],
  '\u006f': ['\u13a3'],
  '\uf06f': ['\u13a3'],

  '\u0070': ['\u13c1'],
  '\uf070': ['\u13c1'],
  '\u0071': ['\u13aa'],
  '\uf071': ['\u13aa'],
  '\u0072': ['\u13db'],
  '\uf072': ['\u13db'],
  '\u0073': ['\u13cd'],
  '\uf073': ['\u13cd'],
  '\u0074': ['\u13d4'],
  '\uf074': ['\u13d4'],
  '\u0075': ['\u13a4'],
  '\uf075': ['\u13a4'],
  '\u0076': ['\u13a5'],
  '\uf076': ['\u13a5'],
  '\u0077': ['\u13b3'],
  '\uf077': ['\u13b3'],
  '\u0078': ['\u13f4'],
  '\uf078': ['\u13f4'],
  '\u0079': ['\u13ef'],
  '\uf079': ['\u13ef'],
  '\u007a': ['\u13ac'],
  '\uf07a': ['\u13ac'],
  '\u007b': ['\u13d1'],
  '\uf07b': ['\u13d1'],
  '\u007c': ['\u13ee'],
  '\uf07c': ['\u13ee'],
  '\u007d': ['\u13e4'],
  '\uf07d': ['\u13e4'],
  '\u007e': ['\u13ca'],
  '\uf07e': ['\u13ca'],
  '\u007f': [' '],
  '\uf07f': [' '],
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
