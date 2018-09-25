// Convert from old font-encoding of Cherokee text to Unicode forms:

// Mappings for Navajo font encodings
var map_encoding_names = [
  'Times New Roman Navajo', 'Century Gothic Navajo', 'Verdana Navajo'];

var private_use_map_combined = {
      "A": ["ဢ", ''],
      "J": ["ို", ''],
      "R": ["ြ", ''],
      "S": ["꩷", ''],
      "Y": ["ျ", ''],
      "b": ["ပ", ''],
      "c": ["ꩡ", ''],
      "d": ["ဒ", ''],
      "g": ["င", ''],
      "h": ["ꩭ", ''],
      "k": ["က", ''],
      "l": ["လ", ''],
      "m": ["မ", ''],
      "n": ["ꩫ", ''],
      "p": ["ပ", ''],
      "s": ["ꩢ", ''],
      "t": ["တ", ''],
      "v": ["ထ", ''],
      "w": ["ဝ", ''],
      "y": ["ယ", ''],
      "I": ["ီ", ''],
      "W": ["ွ်", ''],
      "B": ["ꩰ", ''],
      'D': ['ꩰ', ''],
      "F": ["ံ်", ''],
      "E": ["ၞ်", ''],
      "L": [" ", ''],
      "M": ["ံ", ''],
      // "N": ['ꩥ', ''],
      "O": [" ", ''],
      "U": ["ူ", ''],
      "X": ["ႜ", ''],
      "Z": [" ၞ", ''],
      "a": ["ႃ", ''],
      "e": ["ေ", ''],
      "f": ['ၸ', ''],
      "i": ["ိ", ''],
      "j": ["\u109d", ''],
      "o": ["ွ", ''],
      "q": ["်", ''],
      'r': ['\uAA7A', ''],
      "u": ["ု", ''],
      "x": ["ၵ", ''],
      "z": ["ႃ", ''],
      "@": ["꩹", ''],
      "/": ["\u104b", ''],
      "\\": ["\u104a", ''],
      "[": ["\u103c", ''],
      "]": ["\u103c", ''],
      "{": ["\u103c", ''],
      "}": ["", ''],
      "1": ["၁", ''],
      "2": ["၂", ''],
      "3": ["၃", ''],
      "4": ["၄", ''],
      "5": ["၅", ''],
      "6": ["၆", ''],
      "7": ["၇", ''],
      "8": ["၈", ''],
      "9": ["၉", ''],
      "0": ["၀", ''],
      '\u0020': ['\u0020', '\u0020'],
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
  ePattern = /([\u1031\u103c\u103d])([\u1000-\u1029\u1075-\u1081\uaa60-\uaa76])/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  /*raPattern = /\u103c([\u1000-\u1029\uaa60-\uaa76])/gi;
  raReplace = "$1\u103c";
  newText = newText.replace(raPattern, raReplace);
  */
  spaceCombPattern = / ([\u102f\u103d]`)/gi;
  spaceCombReplace = "$1 ";
  newText = newText.replace(spaceCombPattern, spaceCombReplace);

  spaceCombPattern = /\u103d \u102f/gi;
  spaceCombReplace = "\u103d\u102f";
  newText = newText.replace(spaceCombPattern, spaceCombReplace);



  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
