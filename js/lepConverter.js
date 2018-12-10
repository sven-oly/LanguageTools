// Convert from old font-encoding of Lepcha text to Unicode forms:

// Mappings for Lepcha font encodings
var map_encoding_names = [
  'Shipmoo Lepcha', 'JG Lepcha'];

// 1c00 is the base
var private_use_map_combined = {
    '\u0021': ['', '\u1c29\u1c2d'],
    '\u0022': ['', '\u1c29\u1c2e'],
    '\u0023': ['', '\u1c29\u1c2f'],
    '\u0024': ['', '\u1c29\u1c30'],
    '\u0025': ['\u1c25', '\u1c29\u1c31'],
    '\u0026': ['\u1c24', '\u1c29\u1c32'],
    '\u0027': ['', '\u1c29\u1c33'],
    '\u0028': ['', '\u1c2d\u1c36'],
    '\u0029': ['\u1c25', '\u1c2e\u1c36'],
    '\u002a': ['\u1c24', '\u1c2f\u1c36'],
    '\u002b': ['\u1c36', '\u1c30\u1c36'],
    '\u002c': ['', '\u1c25'],
    '\u002d': ['-', '\u1c31\u1c36'],
    '\u002e': ['', '\u1c3f'],
    '\u0030': ['\u1c40', '\u1c40'],
    '\u0031': ['\u1c41', '\u1c41'],
    '\u0032': ['\u1c42', '\u1c42'],
    '\u0033': ['\u1c43', '\u1c43'],
    '\u0034': ['\u1c44', '\u1c44'],
    '\u0035': ['\u1c45', '\u1c45'],
    '\u0036': ['\u1c46', '\u1c46'],
    '\u0037': ['\u1c47', '\u1c47'],
    '\u0038': ['\u1c48', '\u1c48'],
    '\u0039': ['\u1c49', '\u1c49'],
    '\u003a': ['\u1c2e', '\u1c27\u1c35'],
    '\u003b': ['\u1c2f', '\u1c37'],
    '\u003c': ['\u1c31', '\u1c25'],
    '\u003e': ['\u1c30', '\u1c25'],
    '\u003f': ['\u1c32', '\u1c25'],

    '\u0040': ['', '\u1c32\u1c36'],
    '\u0041': ['\u1c00', '\u1c23'],
    '\u0042': ['\u1c02', '\u1c31'],
    '\u0043': ['\u1c03', '\u1c07'],
    '\u0044': ['\u1c05', '\u1c33'],
    '\u0045': ['\u1c06', '\u1c14'],
    '\u0046': ['\u1c07', '\u1c12'],
    '\u0047': ['\u1c08', '\u1c05'],
    '\u0048': ['\u1c09', '\u1c1e'],
    '\u0049': ['\u1c0a', '\u1c15'],
    '\u004a': ['\u1c0b', '\u1c09'],
    '\u004b': ['\u1c0c', '\u1c02'],
    '\u004c': ['\u1c0d', '\u1c2f'],
    '\u004d': ['\u1c0e', '\u1c2e'],
    '\u004e': ['\u1c10', '\u1c30'],
    '\u004f': ['\u1c11', '\u1c26'],

    '\u0050': ['\u1c13', '\u1c10'],
    '\u0051': ['\u1c15', '\u1c18'],
    '\u0052': ['\u1c17', '\u1c32'],
    '\u0053': ['\u1c18', '\u1c21'],
    '\u0054': ['\u1c19', '\u1c0b'],
    '\u0055': ['\u1c1a', '\u1c2b'],
    '\u0056': ['\u1c1b', '\u1c35'],
    '\u0057': ['\u1c1c', '\u1c01'],
    '\u0058': ['\u1c1d', '\u1c2d'],
    '\u0059': ['\u1c1f', '\u1c0f'],
    '\u005a': ['\u1c21', '\u1c34'],
    '\u005b': ['\u1c2d', '\u0000'],
    '\u005c': ['\u1c37', '\u0000'],
    '\u005d': ['\u1c35', '\u0000'],
    '\u005e': ['', '\u1c33\u1c36'],
    '\u005f': ['\u1c33', '\u1c36'],

    '\u0061': ['\u1c36', '\u1c28'],
    '\u0062': ['\u1c28', '\u1c13'],
    '\u0063': ['\u1c26', '\u1c06'],
    '\u0064': ['\u1c27', '\u1c0c'],
    '\u0065': ['\u1c36', '\u1c2c'],
    '\u0066': ['\u1c29', '\u1c11'],
    '\u0067': ['\u1c2a', '\u1c03'],

    // FIX BELOW
    '\u0068': ['\u1c2b', '\u1c1d'],
    '\u0069': ['\u1c2c', '\u1c27'],
    '\u006a': ['\u1c34', '\u1c08'],
    '\u006b': ['\u1c20', '\u1c00'],
    '\u006c': ['\u1c22', '\u1c1c'],
    '\u006d': ['\u1c01?', '\u1c15'],
    '\u006e': ['\u1c04', '\u1c0d'],
    '\u006f': ['\u1c01?', '\u1c29'],

    '\u0070': ['\u1c12', '\u1c0e'],
    '\u0071': ['\u1c14', '\u1c17'],
    '\u0072': ['\u1c1e', '\u1c1b'],
    '\u0073': ['\u1c16', '\u1c20'],
    '\u0074': ['\u1c4d', '\u1c0a'],
    '\u0075': ['\u1c4e', '\u1c2a'],
    '\u0076': ['\u1c4f', '\u1c1f'],
    '\u0077': ['\u1c23', '\u1c22'],
    '\u0078': ['', '\u1c04'],
    '\u0079': ['', '\u1c1a'],
    '\u007a': ['', '\u1c19'],
    '\u007b': ['\u1c2d', '\u1c19'],

    '\u00c0': ['', '\u1c00\u1c24'],
    '\u00c1': ['', '\u1c02\u1c24'],
    '\u00c2': ['', '\u1c03\u1c24'],
    '\u00c3': ['', '\u1c0a\u1c24'],
    '\u00c4': ['', '\u1c0b\u1c24'],
    '\u00c5': ['', '\u1c0c\u1c24'],
    '\u00c8': ['', '\u1c0e\u1c24'],
    '\u00c9': ['', '\u1c10\u1c24'],
    '\u00ca': ['', '\u1c11\u1c24'],
    '\u00cb': ['', '\u1c13\u1c24'],
    '\u00cc': ['', '\u1c15\u1c24'],
    '\u00cd': ['', '\u1c16\u1c24'],
    '\u00ce': ['', '\u1c1c\u1c24'],
    '\u00cf': ['', '\u1c1d\u1c24'],

    '\u00d2': ['', '\u1c1f\u1c24'],
    '\u00d3': ['', '\u1c01\u1c24'],
    '\u00d4': ['', '\u1c04\u1c24'],
    '\u00d5': ['', '\u1c0f\u1c24'],
    '\u00d6': ['', '\u1c12\u1c24'],
    '\u00d9': ['', '\u1c13\u1c24'],
    '\u00da': ['', '\u1c15\u1c24'],
    '\u00db': ['', '\u1c1e\u1c24'],
    '\u00dc': ['', '\u1c23\u1c24'],
    '\u00dd': ['', '\u1c00\u1c25'],

    '\u00e0': ['', '\u1c03\u1c25'],
    '\u00e1': ['', '\u1c05\u1c25'],
    '\u00e2': ['', '\u1c1e\u1c25'],
    '\u00e3': ['', '\u1c11\u1c25'],
    '\u00e4': ['', '\u1c13\u1c25'],
    '\u00e5': ['', '\u1c15\u1c25'],
    '\u00e8': ['', '\u1c1d\u1c25\u1c24 '],
    '\u00e9': ['', '\u1c00\u1c25\u1c24'],
    '\u00ea': ['', '\u1c04\u1c25\u1c24'],
    '\u00eb': ['', '\u1c05\u1c25\u1c24'],
    '\u00ec': ['', '\u1c0e\u1c25\u1c24'],
    '\u00ed': ['', '\u1c11\u1c25\u1c24'],
    '\u00ee': ['', '\u1c13\u1c25\u1c24'],
    '\u00ef': ['', '\u1c15\u1c25\u1c24'],

    '\u00f2': ['', '\u1c1d\u1c25\u1c24'],
    '\u00f3': ['', '\u1c21\u1c25\u1c24'],
};


function toLower(instring) {
  return instring.toLowerCase();  // Check if this actually works for CHR.
}

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

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
    var out = c;
    if (c in private_use_map_combined) {
      var result = private_use_map_combined[c][encodingIndex];
      if (result) {
	if (result == '\u0000') {
          out = '';
        } else {
	out = result;
        }
      }
    }
    outtext += out;
  }

  // Insert more complex replacements here.
  var newText = outtext;

  // Fix AA sign before letter to O sign
  pattern = /\u1c26([\u1c00-\u1c2d])/gi;
  replace = "\u1c28$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Move diacritics to right of letter
  pattern = /([\u1c27-\u1c29\u1c2c-\u1c37])([\u1c00-\u1c23\u1c2a-\u1c37])/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

/*  ePattern = /([\u1c27-\u1c37]+)([\u1c00-\u1c23\u1c40-\u1c49])/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);
  outtext = newText;
*/
  // Move left side diacritics to left of others
  pattern = /([\u1c26-\u1c26\u1c2a-\u1c37]*)([\u1c24-\u1c2b]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // General reordering - needs to be made clearer
  pattern = /([\u1c26]+)(\u1c2f)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  pattern = /([\u1c36]+)[\u1c24\u1c25\u1c2f]/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  pattern = /([\u1c28]+)([\u1c24\u1c27]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  pattern = /([\u1c27]+)(\u1c29)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  pattern = /([\u1c36]+)([\u1c30]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  pattern = /([\u1c2e]+)([\u1c25\u1c2c]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  pattern = /([\u1c33]+)([\u1c2c])/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  pattern = /([\u1c36]+)([\u1c2e\u1c32])/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // 1C27 1C36 1C37
  pattern = /(\u1c27)(\u1c36)(\u1c37)/gi;
  replace = "$3$1$2";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Fix diacritics after space.
  pattern = /\u0020([\u1c24-\u1c2f\u1c31\u1c33])/gi;
  replace = "$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Diacritics at start of the text

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
