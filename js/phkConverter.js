// Convert from old font-encoding of Cherokee text to Unicode forms:

// Mappings for Navajo font encodings
var map_encoding_names = [
      'Phake Script',
      'Phake Ramayana',
];

var private_use_map_combined = {
      "A": ["ဢ", ""],
      "B": ["ꩰ", ""],
      "C": ["\u109c", ""],
      "D": ["ꩰ", ""],
      "E": ["\u105e\u103a", ""],
      "F": ["\u103a\u1036", ""],
      "G": ["\u1087", ""],
      "H": ["\u1088", ""],
      "I": ["ီ", ""],
      "J": ["ို", ""],
      "K": ["\u1039\u1000", ""],
      "L": [" ", ""],
      "M": ["ံ", ""],
      "N": ["\u107a", ""],
      "O": ["\u103d", ""],
      "P": ["\u1039\u1015", ""],
      "Q": ["\uaa77", ""],
      "R": ["ြ", ""],
      "S": ["꩷", ""],
      "T": ["\u1039\u1010", ""],
      "U": ["\u1030", ""],
      // "V": ["\u1030", ""],
      "W": ["ွ်", ""],
      "X": ["ႜ", ""],
      "Y": ["ျ", ""],
      "Z": ["ၞ", ""],
      "a": ["ႃ", ""],
      "b": ["ပ", ""],
      "c": ["ꩡ", ""],
      "d": ["ဒ", ""],
      "e": ["ေ", ""],
      "f": ["ၸ", ""],
      "g": ["င", ""],
      "h": ["\uaa6d", ""],
      "i": ["ိ", ""],
      "j": ["\u109d", ""],
      "k": ["က", ""],
      "l": ["လ", ""],
      "m": ["မ", ""],
      "n": ["ꩫ", ""],
      "o": ["ွ", ""],
      "p": ["ပ", ""],
      "q": ["်", ""],
      "r": ["\uAA7A", ""],
      "s": ["\uaa6c", ""],
      "t": ["တ", ""],
      "u": ["ု", ""],
      "v": ["ထ", ""],
      "w": ["ဝ", ""],
      "x": ["ၵ", ""],
      "y": ["ယ", ""],
      "z": ["ႃ", ""],
      "@": ["", ""],
      "/": ["\u104b", ""],
      "\\": ["\u104a", ""],
      "[": ["\u103c", ""],
      "]": ["\u103c", ""],
      "{": ["\u103c", ""],
      "}": ["", ""],
      "1": ["၁", ""],
      "2": ["၂", ""],
      "3": ["၃", ""],
      "4": ["၄", ""],
      "5": ["၅", ""],
      "6": ["၆", ""],
      "7": ["၇", ""],
      "8": ["၈", ""],
      "9": ["၉", ""],
      "0": ["၀", ""],
      "\u0020": ["\u0020", "\u0020"],
      "#": ["\u1036", ""],
      "$": ["\u102e", ""],
      "^": ["\u102c", ""],
      "_": ["\u103a\u105e", ""],
      "}": ["\u103a\u103d", ""],
      // "%": ["\u103a\u1036", ""],
      // "&": ["\u103a\u1036", ""],
};

function toLower(instring) {
  return instring();  // Check if this actually works.
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
