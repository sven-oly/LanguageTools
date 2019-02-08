// Mappings for Western and Eastern Cham font encodings
var map_encoding_names = [
  'JG Cham Cambodia',
  'EFEO Panrang'
];

var private_use_map_combined = {
  '\u0020': [' ', ' '],
  '\u0021': ['\uaa44', '\uaa44'],
  '\u0022': ['\"', '\"'],
  '\u0023': ['\uaa46', '\uaa46'],
  '\u0024': ['\uaa47', '\uaa47'],
  '\u0025': ['\uaa22 ?', '\uaa48'],
  '\u0026': ['\uaa24 ?', '\uaa4a'],
    '\u0027': ['?', '\''],
    '\u0028': ['\uaa4b', '\uaa4b'],
    '\u0029': ['\uaa43', '\uaa43'],
    '\u002a': ['\uaa16\uaa36', '\uaa16\uaa36'],
    '\u002b': ['\uaa31\uaa4c', '\uaa31\uaa4c'],
    '\u002c': ['??', '\u002c'],
    '\u002d': ['\uaa43', '\uaa2e'],
    '\u002e': ['\uaa4c', '\uaa4c'],
    '\u002f': ['??', '??'],
    '\u0030': ['\uaa50', '\uaa50'],
    '\u0031': ['\uaa51', '\uaa51'],
    '\u0032': ['\uaa52', '\uaa52'],
    '\u0033': ['\uaa53', '\uaa53'],
    '\u0034': ['\uaa54', '\uaa54'],
    '\u0035': ['\uaa55', '\uaa55'],
    '\u0036': ['\uaa56', '\uaa56'],
    '\u0037': ['\uaa57', '\uaa57'],
    '\u0038': ['\uaa58', '\uaa58'],
    '\u0039': ['\uaa59', '\uaa59'],
    '\u003b': ['\u2022', '\u2022'],
    '\u003c': ['\uaa23\uaa4c', '\uaa2e\uaa4c'],
    '\u003d': ['\uaa31\uaa23', '\uaa31\uaa43'],
    '\u003e': ['??', '??'],
    '\u003f': ['?', '?'],

    '\u0040': ['\uaa4a?', '\uaa4a'],
    '\u0041': ['\uaa04', '\uaa04'],
    '\u0042': ['\uaa1e', '\uaa1e'],
    '\u0043': ['\uaa1e', '\uaa0d'],
    '\u0044': ['\uaa1b', '\uaa26'],
    '\u0045': ['??', '\uaa30'],
    '\u0046': ['(', '('],
    '\u0047': ['\uaa09', '\uaa09'],
    '\u0048': ['??', '\uaa4d'],
    '\u0049': ['\uaa32', '\uaa32'],
    '\u004a': ['\uaa0F', '\uaa0f'],
    '\u004b': ['\uaa07', '\uaa07'],
    '\u004c': ['\uaa35', '\uaa35'],
    '\u004d': ['??', '\uaa20'],
    '\u004e': ['??', '\uaa18'],
    '\u004f': ['??', '\uaa2f'],

    '\u0050': ['??', '\uaa1c'],
    '\u0051': ['??', '\uaa0b'],
    '\u0052': ['\uaa34', '\uaa34'],
    '\u0053': ['??', '\uaa26'],
    '\u0054': ['??', '\uaa14'],
    '\u0055': ['\uaa2D', '\uaa2D'],
    '\u0056': ['??', '\uaa19'],
    '\u0057': ['\uaa36', '\uaa36'],
    '\u0058': [')', ')'],
    '\u0059': ['??', '\uaa33'],
    '\u005a': ['??', '\uaa11'],
    '\u005b': ['\uaa2a', '\uaa2a'],
    '\u005c': ['\uaa29', '\uaa29'],
    '\u005d': ['??', '\uaa2c'],
    '\u005e': ['\uaa49', '\uaa49'],
    '\u005f': ['\uaa31', '\uaa31'],

    '\u0060': ['\uaa40', '\uaa40'],
    '\u0061': ['\uaa00\uaa36 ?', '\uaa00'],
    '\u0062': ['\uaa1d', '\uaa1d'],
    '\u0063': ['\uaa06', '\uaa06'],
    '\u0064': ['??', '\uaa15'],
    '\u0065': ['\uaa03', '\uaa03'],
    '\u0066': ['\uaa11', '\uaa11'],
    '\u0067': ['??', '\uaa08'],
    '\u0068': ['\uaa28', '\uaa28'],
    '\u0069': ['\uaa01', '\uaa01'],
    '\u006a': ['??', '\uaa0e'],
    '\u006b': ['\uaa06', '\uaa06'],
    '\u006c': ['\uaa08', '\uaa08'],
    '\u006d': ['??', '\uaa1f'],
    '\u006e': ['??', '\uaa17'],
    '\u006f': ['\uaa05', '\uaa05'],

    '\u0070': ['\uaa1a', '\uaa1a'],
    '\u0071': ['??', '\uaa0a'],
    '\u0072': ['\uaa23', '\uaa23'],
    '\u0073': ['??', '\uaa27'],
    '\u0074': ['\uaa13', '\uaa13'],
    '\u0075': ['\uaa02', '\uaa02'],
    '\u0076': ['\uaa1f ?', '\uaa21'],
    '\u0077': ['\uaa22 ?', '\uaa25'],
    '\u0078': ['??', '\uaa12'],
    '\u0079': ['\uaa22', '\uaa22'],
    '\u007a': ['\uaa10', '\uaa10'],
    '\u007b': ['\uaa2b', '\uaa2b'],
    '\u007c': ['\uaa2c', '\uaa2c'],
    '\u007d': ['\uaa2a\uaa4c', '\uaa2a\uaa4c'],
    '\u007e': ['??', '\uaa42'],
};


function toLower(instring) {
  return instring.toLowerCase();  // Check if this actually works for CHR.
}

/**
 * Fix issues with Unicode text including:
 * 1. Remove U+200b, zero width space
 * 2. Remove null bytes
 * 3. Reorder combining characters.
 */
function normalizeUnicodeBoxes(inbox, outbox) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  var intext = inarea.value;

  var newText = intext;

  // Remove ZWS and null characters.
  pattern = /[\u200b\u0000]/gi;
  replace = "";
  newText = intext.replace(pattern, replace);
  intext = newText;

  // Move some diacritics
  // Fix vowel ordering
  pattern = /([\uaa29\uaa32])([\uaa2a-\uaa2c\uaa2e-\uaa36])/gi;
  replace = "$2$1";
  newText = intext.replace(pattern, replace);
  intext = newText;  // Fix vowel ordering

  pattern = /([\uaa43\uaa4c\uaa4d])([\uaa29-\uaa36])/gi;
  replace = "$2$1";
  newText = intext.replace(pattern, replace);
  intext = newText;

  outarea.value = outarea.InnerHTML = intext;
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

  if (start != finish && finish != 0) {
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
  // Next, move some code points in context to get proper Unicode ordering.
  // Vowel sign to right of consonants:
  ePattern = /([\uaa2f\uaa30\uaa34]+)([\uaa00-\uaa28])/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  // Rearrange some vowel signs
  outtext = newText;
  ePattern = /([\uaa2d]+)([\uaa2e]+)/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  outtext = newText;
  ePattern = /([\uaa2f]+)([\uaa33-\uaa35]+)/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  outtext = newText;
  ePattern = /([\uaa4c]+)([\uaa2d]+)/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  outtext = newText;
  ePattern = /([\uaa36]+)([\uaa44]+)/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  outtext = newText;
  ePattern = /([\uaa30]+)([\uaa31-\uaa36]+)/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  outtext = newText;
  ePattern = /([\uaa29-\uaa2c])+([\uaa2d-\uaa2e\uaa31-\uaa36]+)/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  // Convert double 0x27!
  outtext = newText;
  ePattern = /\u0027\u0027/gi;
  eReplace = "\uaa5e";
  newText = outtext.replace(ePattern, eReplace);

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
