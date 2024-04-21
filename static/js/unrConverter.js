// Mappings for Mundari Bani
const langConverter = new langConverterClass('unr', 'Mund');

var map_encoding_names = [
  'Mundari Lipi Arial',
];

langConverter.encoding_data = {
    'MundariLipiArial': {index:0, outputEncoding:'Unicode', outputScript:'Mund'},
    'MundariLipiRegular': {index:0, outputEncoding:'Unicode', outputScript:'Mund'},
    'MundariLipiStandard': {index:0, outputEncoding:'Unicode', outputScript:'Mund'},
    'MundariLipiJagaMohan': {index:0, outputEncoding:'Unicode', outputScript:'Mund'},
    'MundariLipiStoneage': {index:0, outputEncoding:'Unicode', outputScript:'Mund'},
};

private_use_map_combined = {
    '\u0030': ['\ud839\udcf0'],
    '\u0031': ['\ud839\udcf1'],
    '\u0032': ['\ud839\udcf2'],
    '\u0033': ['\ud839\udcf3'],
    '\u0034': ['\ud839\udcf4'],
    '\u0035': ['\ud839\udcf5'],
    '\u0036': ['\ud839\udcf6'],
    '\u0037': ['\ud839\udcf7'],
    '\u0038': ['\ud839\udcf8'],
    '\u0039': ['\ud839\udcf9'],

    '\u0044': ['\ud839\udce1'],
    '\u0047': ['\ud839\udcd4'],
    '\u0048': ['\ud839\udcd9'],
    '\u004a': ['\ud839\udcd8'],
    '\u004c': ['\ud839\udcf5'],
    '\u004e': ['\ud839\udce5'],

    '\u0054': ['\ud839\udce9'],
    '\u0058': ['\ud839\udceD'],

    '\u0060': ['\ud839\udcf0'],  // TODO
    '\u0061': ['\ud839\udcd5'],
    '\u0062': ['\ud839\udcd7'],
    '\u0063': ['\ud839\udce0'],
    '\u0064': ['\ud839\udcdc'],
    '\u0065': ['\ud839\udce4'],
    '\u0067': ['\ud839\udce6'],
    '\u0068': ['\ud839\udcde'],
    '\u0069': ['\ud839\udcda'],
    '\u006a': ['\ud839\udcd6'],
    '\u006b': ['\ud839\udce2'],
    '\u006c': ['\ud839\udcd2'],
    '\u006d': ['\ud839\udce7'],
    '\u006e': ['\ud839\udce8'],
    '\u006f': ['\ud839\udcd0'],

    '\u0070': ['\ud839\udcd1'],
    '\u0072': ['\ud839\udce3'],
    '\u0073': ['\ud839\udcdb'],
    '\u0074': ['\ud839\udcdd'],
    '\u0075': ['\ud839\udcdf'],
    '\u0076': ['\ud839\udcec'],
    '\u0077': ['\ud839\udcee'],
    '\u0078': ['\ud839\udceD'],
    '\u0079': ['\ud839\udcd3'],
    '\u007a': ['\ud839\udceb'],
    '\u007e': ['\ud839\udceF'],
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

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
  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
