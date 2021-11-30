const langConverter = new langConverterClass('bod', 'Tibetan');

langConverter.transformRules = [
  [/[\u200b\u0000]/gi, replace = ""],
  [/\u0f7a\u0f7a/gi, "\u0f7b"],
  [/\u0f7c\u0f7c/gi, "\u0f7d"],
  [/(\u0f0b)([\u0f71-\u0f7d])/gi, "$2$1"],
  [/(\u0f85)([\u0f71-\u0f7d])([\u0f40-\u0f6a])/gi, "$1$3$2"]
];

langConverter.encoding_data = {
    'Ahom': {index:0, outputEncoding:'Unicode', outputScript:'Ahom'},
    // Are they the same code points?
    'AhomManuscript': {index:1, outputEncoding:'Unicode', outputScript:'Ahom'},
};

/**
 * Fix issues with Unicode text including:
 * 1. Reorder vowels right after 0f0b
 * 2. Reorder Paluta vowel letter
 * 3. Replace doubled O and E with OO and EE.
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

  // Replace doubled E with EE
  pattern = /\u0f7a\u0f7a/gi;
  replace = "\u0f7b";
  newText = intext.replace(pattern, replace);
  intext = newText;

  // Replace doubled O with OO
  pattern = /\u0f7c\u0f7c/gi;
  replace = "\u0f7d";
  newText = intext.replace(pattern, replace);
  intext = newText;

  // Fix vowel ordering with tshek
  pattern = /(\u0f0b)([\u0f71-\u0f7d])/gi;
  replace = "$2$1";
  newText = intext.replace(pattern, replace);
  intext = newText;  // Fix tshek-vowel ordering

  // Fix vowel after paluta
  pattern = /(\u0f85)([\u0f71-\u0f7d])([\u0f40-\u0f6a])/gi;
  replace = "$1$3$2";
  newText = intext.replace(pattern, replace);
  intext = newText;  // Fix tshek-vowel order

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

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
