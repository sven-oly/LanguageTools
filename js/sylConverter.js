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

    '\u0060': ['\ua826'],
    '\u0061': ['\ua81c'],
    '\u0062': ['\ua81d'],
    '\u0063': ['\ua81e'],
    '\u0064': ['\ua81f'],
    '\u0065': ['\ua820'],
    '\u0066': ['\ua821'],
    '\u0067': ['\ua822'],
    '\u0068': ['\ua823'],
    '\u0069': ['\ua824'],
    '\u006a': ['\ua825'],
    '\u006b': ['\ua825'],
    '\u006c': ['\ua825'],
    '\u006d': ['\ua826'],
    '\u006e': ['\ua826'],
    '\u006f': ['\ua826'],

    '\u0070': ['\ua802'],
    '\u0071': ['\ua80b'],
    '\u0072': ['\u1c1b'],
    '\u0073': ['\u1c20'],
    '\u0074': ['\u0000'],   // Diacritics for these?
    '\u0075': ['\u1c2a'],
    '\u0076': ['*'],  // Should this be another symbol?
    '\u0077': ['\ua828'],
    '\u0078': ['\ua829'],
    '\u0079': ['\ua82a'],
    '\u007a': ['\u1c19'],
    '\u007e': ['\u09f8'],

    '\u00c0': ['\ua807\ua806\ua807'],
    '\u00c1': ['\ua807\ua806\ua808'],
    '\u00c2': ['\ua807\ua806\ua810'],
    '\u00c3': ['\ua807\ua806\ua814'],
    '\u00c4': ['\ua807\ua806\ua81e'],
    '\u00c5': ['\ua807\ua806\ua81f'],
    '\u00c6': ['\ua807\ua806\ua821'],
    '\u00c7': ['\ua808\ua806\ua814'],
    '\u00c8': ['\ua808\ua806\ua81b'],
    '\u00c9': ['\ua809\ua806\ua818'],
    '\u00ca': ['\ua80d\ua806\ua815'],
    '\u00cb': ['\ua80c\ua806\ua80d'],
    '\u00cc': ['\ua80e\ua806\ua80e'],
    '\u00cd': ['\ua814\ua806\ua814'],
    '\u00ce': ['\ua814\ua806\ua815'],
    '\u00cf': ['\ua814\ua806\ua81e'],

    '\u00d0': ['\ua816\ua806\ua816'],
    '\u00d1': ['\ua818\ua806\ua807'],
    '\u00d2': ['\ua818\ua806\ua809'],
    '\u00d3': ['\ua818\ua806\ua80c'],
    '\u00d4': ['\ua818\ua806\ua80d'],
    '\u00d5': ['\ua818\ua806\ua80e'],
    '\u00d6': ['\ua818\ua806\ua810'],
    '\u00d7': ['\ua818\ua806\ua812'],
    '\u00d8': ['\ua818\ua806\ua814'],
    '\u00d9': ['\ua818\ua806\ua816'],
    '\u00da': ['\ua818\ua806\ua817'],
    '\u00db': ['\ua818\ua806\ua818'],
    '\u00dc': ['\ua818\ua806\ua821'],
    '\u00dd': ['\ua819\ua806\ua80d'],
    '\u00de': ['\ua819\ua806\ua810'],
    '\u00df': ['\ua819\ua806\ua814'],

    '\u00e0': ['\ua819\ua806\ua819'],
    '\u00e1': ['\ua819\ua806\ua821'],
    '\u00e2': ['\ua81a\ua806\ua80d'],
    '\u00e3': ['\ua81b\ua806\ua816'],
    '\u00e4': ['\ua81b\ua806\ua81b'],
    '\u00e5': ['\ua81d\ua806\ua819'],
    '\u00e6': ['\ua81d\ua806\ua81b'],
    '\u00e7': ['\ua81d\ua806\ua81d'],
    '\u00e8': ['\ua81f\ua806\ua81f'],
    '\u00e9': ['\ua821\ua806\ua807'],
    '\u00ea': ['\ua821\ua806\ua80c'],
    '\u00eb': ['\ua821\ua806\ua80d'],
    '\u00ec': ['\ua821\ua806\ua810'],
    '\u00ed': ['\ua821\ua806\ua811'],
    '\u00ee': ['\ua821\ua806\ua814'],
    '\u00ef': ['\ua821\ua806\ua815'],

    '\u00f0': ['\ua821\ua806\ua81b'],
    '\u00f1': ['\u200d'],  // Zero width joiner?
    '\u00f2': ['\ua807\ua806\ua807'],
    '\u00f3': ['\ua80c\ua806\ua80c'],
    '\u00f4': ['\ua806'],
};


function toLower(instring) {
  return instring.toLowerCase();  // Check if this actually works for CHR.
}

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  // First, replace all single characters with their Unicode equivalents.
  var start = inarea.selectionStart;
  // obtain the index of the last selected character
  var finish = inarea.selectionEnd;
  // obtain the selected text

  if (finish != 0) {
    var intext = inarea.value.substring(start, finish);
  } else {
    // Otherwise, the whole text.
    var intext = inarea.value;
  }

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
