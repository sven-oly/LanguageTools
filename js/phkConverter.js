// Convert from old font-encoding of Cherokee text to Unicode forms:

// Mappings for Navajo font encodings
var map_encoding_names = [
  'Phake Script',
  'Phake Ramayana',
  'Aiton Script',
  'Shan'
];

var private_use_map_combined = {
        "A": ["ဢ\ufe00", "ဢ\ufe00", "ဢ"],
        "B": ["ꩰ", "ꩰ", "ꩰ"],
        "C": ["\u108a", "ဢ\ufe00", "\u109c"],
        "D": ["ꩰ", "ꩰ", "ꩰ"],
        "E": ["\u105e\u103a", "\u105e\u103a", "\u105e\u103a"],
        "F": ["\u103a\u1036", "\u103a\u1036", "\u103a\u1036"],
        "G": ["\u1087", "\u1087", "\u1087"],
        "H": ["\u1088", "\u1088", "\u1088"],
        "I": ["\u102e", "ီ", "ီ"],
        "J": ["ို", "ို", "ို"],
        "K": ["\u1039\u1000\ufe00", "\u1039\u1000\ufe00", "\u1039\u1000\ufe00"],
  "L": ["\u1038", "\u1038", ""],
        "M": ["ံ", "ံ", "ံ"],
        "N": ["\u107a\ufe00", "\u107a\ufe00", "\u107a\ufe00"],
        "O": ["\u1089", "\u1089", "\u103d"],
        "P": ["\u1039\u1015\ufe00", "\u1039\u1015\ufe00", "\u1039\u1015\ufe00"],
        "Q": ["\uaa77", "\uaa77", "\uaa77"],
        "R": ["ြ", "ြ", "ြ"],
        "S": ["꩷", "꩷", "꩷"],
        "T": ["\u1039\u1010\ufe00", "\u1039\u1010\ufe00", "\u1039\u1010\ufe00"],
        // TODO: Resolve V for Aiton
        "U": ["\u1030", "\u1030", "\u1030"],
        "V": ["\ua9f2", "\ua9f2", "\u1030"],
        "W": ["ွ်", "ွ်", "ွ်"],
        "X": ["ႜ", "ႜ", "ႜ"],
        "Y": ["ျ", "ျ", "ျ"],
        "Z": ["ၞ", "ၞ", "ၞ"],
        "a": ["ႃ", "ႃ", "ႃ"],
        "b": ["ပ\ufe00", "ပ\ufe00", "ပ\ufe00"],
        "c": ["ꩡ\ufe00", "ꩡ\ufe00", "ꩡ\ufe00"],
        "d": ["ဒ", "ဒ", "ဒ"],
        "e": ["ေ\ufe00", "ေ\ufe00", "ေ\ufe00"],
        "f": ["ၸ\ufe00", "ၸ\ufe00", "ၸ\ufe00"],
        "g": ["င\ufe00", "င\ufe00", "င\ufe00"],
        "h": ["\uaa6d", "\uaa6d", "\uaa6d"],
        "i": ["ိ", "ိ", "ိ"],
        "j": ["\u109d", "\u109d", "\u109d"],
        "k": ["က\ufe00", "က\ufe00", "က\ufe00"],
        "l": ["လ\ufe00", "လ\ufe00", "လ\ufe00"],
        "m": ["မ\ufe00", "မ\ufe00", "မ\ufe00"],
        "n": ["ꩫ\ufe00", "ꩫ\ufe00", "ꩫ\ufe00"],
        "o": ["ွ", "ွ", "ွ"],
        "p": ["ပ\ufe00", "ပ\ufe00", "ပ\ufe00"],
        "q": ["်", "်", "်"],
        "r": ["\uAA7A\ufe00", "\uAA7A\ufe00", "\uAA7A\ufe00"],
        "s": ["\uaa6c\ufe00", "\uaa6c\ufe00", "\uaa6c\ufe00"],
        "t": ["တ\ufe00", "တ\ufe00", "တ\ufe00"],
        "u": ["ု", "ု", "ု"],
        "v": ["ထ\ufe00", "ထ\ufe00", "ထ\ufe00"],
        "w": ["ဝ\ufe00", "ဝ\ufe00", "ဝ\ufe00"],
        "x": ["ၵ\ufe00", "ၵ\ufe00", "ၵ\ufe00"],
        "y": ["ယ\ufe00", "ယ\ufe00", "ယ\ufe00"],
        "z": ["\uAA78", "ႃ", "ႃ"],
        "@": ["\ua9f2", "\ua9f2", "\u1092"],
        "(": ["(", "(", ", "],
        ")": [")", ")", ", "],
        "/": ["\u104b", "\u104b", "\u104b"],
        "\\": ["\u104a", "\u104a", "\u104a"],
        "[": ["\u103c", "\u103c", "\u103c"],
        "|": ["\u103c", "\u103c", "\u1039\u101c\ufe00"],
        "]": ["\u103c", "\u103c", "\u103c"],
        "{": ["\u103c", "\u103c", "\u103c"],
        "}": ["\u103a\u103d", "\u103a\u103d", "\u106c"],
        "~": ["", "", "\u1039\u101a\ufe00"],
        "1": ["၁", "၁", "၁"],
        "2": ["၂", "၂", "၂"],
        "3": ["၃", "၃", "၃"],
        "4": ["၄", "၄", "၄"],
        "5": ["၅", "၅", "၅"],
        "6": ["၆", "၆", "၆"],
        "7": ["၇", "၇", "၇"],
        "8": ["၈", "၈", "၈"],
        "9": ["၉", "၉", "၉"],
        "0": ["၀", "၀", "၀"],
        " ": ["\u0020", "\u0020", "\u0020"],
        "#": ["\u1036", "\u1036", "\u1036"],
        "$": ["\u102e", "\u102e", "\u102e"],
        "^": ["\u102c", "\u102c", "\u102c"],
        "_": ["\u103a\u105e", "\u103a\u105e", "\u103a\u105e"],
        "%": ["\u00a0\u103a", "\u00a0\u103a", "\u00a0\u103a"],
        "&": ["\u00a0\u109d", "&", "\u00a0\u109d"],
        "`": ["`", "`",  "\u1039ꩡ\ufe00"],
        "~": ["~", "~", "~"]
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
  ePattern = /([\u1031\u103c]\ufe00?)([\u1000-\u1029\u1075-\u1081\uaa60-\uaa7a]\ufe00?)/gi;
  eReplace = "$2$1";
  newText = outtext.replace(ePattern, eReplace);

  spaceCombPattern = / ([\u102f\u103d])/gi;
  spaceCombReplace = "$1 ";
  newText = newText.replace(spaceCombPattern, spaceCombReplace);

  spaceCombPattern = /([\u103b\u103d]) \u102f/gi;
  spaceCombReplace = "$1\u102f ";
  newText = newText.replace(spaceCombPattern, spaceCombReplace);

  pattern = /([\u1031]\ufe00?)([\u103a\u103d]+)/gi;
  replacement = "$2$1 ";
  newText = newText.replace(pattern, replacement);

  // Doubled combiners
  pattern = /\u103a\u103a/gi;
  replacement = "\u103a\u00a0\u103a";
  newText = newText.replace(pattern, replacement);

  pattern = /\u102e\u102e/gi;
  replacement = "\u102e\u00a0\u102e";
  newText = newText.replace(pattern, replacement);

  pattern = /\u1036\u1036/gi;
  replacement = "\u1036\u00a0\u1036";
  newText = newText.replace(pattern, replacement);

  pattern = /\u109d\u109d/gi;
  replacement = "\u109d\u00a0\u109d";
  newText = newText.replace(pattern, replacement);

  // Ellipsis
  pattern = /\.\.\./gi;
  replacement = "\u2026";
  newText = newText.replace(pattern, replacement);

  // Consider doubled combiners, e.g., 103a twice.
  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
