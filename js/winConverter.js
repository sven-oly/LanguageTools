// Convert from old font-encoding of Oneida text to Unicode forms:

let langConvertClass = function() {
  this.langCode = 'win';
  this.langName = 'Hoocąk';

  // Each element includes input, output, and compute options.
  this.transforms = [
    {input: 'Hocak Times Roman', output:'Unicode Latin',
      'compute': this.OldHocak2Latin},
  ];
};

// The object returned.
const langConverter = new langConvertClass();
// Mappings for Oneida font encodings
var map_encoding_names = [
  'Hocak Old'];

var private_use_map_combined = {
  '\\': ['\u0328'],
  '`': ['\u030C'],
  '~': ['\u030C'],
  '\u00e0': ['\u01CE'],
  '\u00c0': ['\u01CD'],
  '\u00cc': ['\u01cf'],
  '\u00f2': ['\u01D0'],
  '\u00ec': ['\u01d0'],
  '\u00d2': ['\u01D1'],
  '\u00f2': ['\u01D2'],
  '\u00d9': ['\u01D3'],
  '\u00f9': ['\u01D4'],
  '\u011e': ['Ǧ'],
  '\u011f': ['ǧ'],
};

langConvertClass.prototype.OldHocak2Latin = function(text_in) {
    const encodingIndex = 0;
    return transformText(text_in, private_use_map_combined, encodingIndex);
}

function toLower(instring) {
  // If code in range 13a0-1eef, add ab70-13a0
  // If code in range 1ef0-1ef5, add 8
  return instring.toLowerCase();
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
