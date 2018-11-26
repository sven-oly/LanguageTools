// Convert from old font-encoding of Lepcha text to Unicode forms:

// Mappings for Lepcha font encodings
var map_encoding_names = [
  'EFEO Panrang'];

// aa00 is the base
var private_use_map_combined = {
    '\u0021': ['\uaa44'],
    '\u0022': ['\"'],
    '\u0023': ['\uaa46'],
    '\u0024': ['\uaa47'],
    '\u0025': ['\uaa22'],
    '\u0026': ['\uaa24'],
    '\u0027': ['\''],
    '\u0028': ['\uaa4b'],
    '\u0029': ['\uaa43'],
    '\u002a': ['\uaa16\uaa36'],
    '\u002b': ['\uaa31\uaa4c'],
    '\u002d': ['\uaa43'],
    '\u002e': ['\uaa4c'],
    '\u002f': ['??'],
    '\u0030': ['\uaa50'],
    '\u0031': ['\uaa51'],
    '\u0032': ['\uaa52'],
    '\u0033': ['\uaa53'],
    '\u0034': ['\uaa54'],
    '\u0035': ['\uaa55'],
    '\u0036': ['\uaa56'],
    '\u0037': ['\uaa57'],
    '\u0038': ['\uaa58'],
    '\u0039': ['\uaa59'],
    '\u003b': ['\u2022'],
    '\u003c': ['\uaa23\uaa4c'],
    '\u003d': ['\uaa31\uaa23'],
    '\u003e': ['??'],
    '\u003f': ['?'],

    '\u0040': ['\uaa4a?'],
    '\u0041': ['\uaa04'],
    '\u0042': ['\uaa1e'],
    '\u0043': ['\uaa1e'],
    '\u0044': ['\uaa1b'],
    '\u0045': ['??'],
    '\u0046': ['('],
    '\u0047': ['\uaa09'],
    '\u0048': ['\uaa1e'],
    '\u0049': ['\uaa32'],
    '\u004a': ['\uaa0F'],
    '\u004b': ['\uaa07'],
    '\u004c': ['\uaa35'],
    '\u004d': ['\uaa2e'],
    '\u004e': ['\uaa30'],
    '\u004f': ['\uaa26'],

    '\u0050': ['\uaa10'],
    '\u0051': ['\uaa18'],
    '\u0052': ['\uaa34'],
    '\u0053': ['\uaa21'],
    '\u0054': ['\uaa0b'],
    '\u0055': ['\uaa2D'],
    '\u0056': ['\uaa35'],
    '\u0057': ['\uaa36'],
    '\u0058': [')'],
    '\u0059': ['??'],
    '\u005a': ['\uaa34'],
    '\u005b': ['\uaa2a'],
    '\u005c': ['\uaa29'],
    '\u005d': ['\uaa31'],
    '\u005e': ['\uaa49'],
    '\u005f': ['\uaa31'],

    '\u0060': ['\uaa40'],
    '\u0061': ['\uaa00\uaa36'],
    '\u0062': ['\uaa1d'],
    '\u0063': ['\uaa06'],
    '\u0064': ['\uaa0c'],
    '\u0065': ['\uaa03'],
    '\u0066': ['\uaa11'],
    '\u0067': ['\uaa03'],
    '\u0068': ['\uaa28'],
    '\u0069': ['\uaa01'],
    '\u006a': ['\uaa08'],
    '\u006b': ['\uaa06'],
    '\u006c': ['\uaa08'],
    '\u006e': ['\uaa0d'],
    '\u006f': ['\uaa05'],

    '\u0070': ['\uaa1a'],
    '\u0071': ['\uaa17'],
    '\u0072': ['\uaa23'],
    '\u0073': ['\uaa20'],
    '\u0074': ['\uaa13'],
    '\u0075': ['\uaa02'],
    '\u0076': ['\uaa1f'],
    '\u0077': ['\uaa22'],
    '\u0078': ['\uaa04'],
    '\u0079': ['\uaa22'],
    '\u007a': ['\uaa10'],
    '\u007b': ['\uaa2b'],
    '\u007c': ['\uaa2c'],
    '\u007d': ['\uaa2a\uaa4c'],
    '\u007e': ['\uaa19'],


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
