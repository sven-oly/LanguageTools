// Convert from old font-encoding of Aiton text to Unicode forms:
const langConverter = new langConverterClass('aio', 'Tai Aiton');

// Mappings for Aiton old ASCII encoding to Unicode font
// Source: Stephen Morey
// Started 6-Jan-2026
langConverter.map_encoding_names = map_encoding_names = ['Aiton Script'];

langConverter.encoding_data = {
    'Aiton': {index:0, outputEncoding:'Unicode', outputScript:'Myanmar'},
    'Aiton Script': {index:0, outputEncoding:'Unicode', outputScript:'Myanmar'},
};

// The third column
private_use_map_combined = {
    '\u00a0': '\u00a0',
    ',': ',',
    "A": "ဢ",
    "B": "ꩰ",
    "C": "\u108a",
    "D": "ꩰ",
    "E": "\u105e\u103a",
    "F": "\u103a\u1036",
    "G": "\u1087",
    "H": "\u1088",
    "I": "ီ",
    "J": "ို",
    "K": "\u1039\u1000",
    "L": "\u1038",
    "M": "ံ",
    "N": "\u107a",
    "O": "\u103d",
    "P": "\u1039\u1015",
    "Q": "\uaa77",
    "R": "\u200c\u103c",
    "S": "꩷",
    "T": "\u1039\u1010",
    'U': "\u1030",
    "V": "\u1030",  // ???
    "W": "ွ်",
    "X": "ႜ",
    "Y": "ျ",
    "Z": "ၞ",
    "a": "ႃ",
    "b": "ပ",
    "c": "ꩡ",
    "d": "ဒ",
    "e": "\u200c\u1031",  // signal for non-reordered
    "f": "ၸ",
    "g": "င",
    "h": "\uaa6d",
    "i": "ိ",
    "j": "\u109d",
    "k": "က",
    "l": "လ",
    "m": "မ",
    "n": "ꩫ",
    "o": "ွ",
    "p": "ပ",
    "q": "်",
    "r": "\uAA7A",
    "s": "\uaa6c",
    "t": "တ",
    "u": "ု",
    "v": "ထ",
    "w": "ဝ",
    "x": "ၵ",
    "y": "ယ",
    "z": "\uAA78",
    "@": "\u1092",
    "(": "(",
    ")": ")",
    "/": "\u104b",
    "\\": "\u104a",
    "[": "\u200c\u103c",
    "|": "\u1039\u101c",
    "]": "\u200c\u103c",
    "{": "\u200c\u103c",
    "}": "\u105c",
    "~": "\u1039\u101a",
    "_": "꩹",
    "1": "၁",
    "2": "၂",
    "3": "၃",
    "4": "၄",
    "5": "၅",
    "6": "၆",
    "7": "၇",
    "8": "၈",
    "9": "၉",
    "0": "၀",
    "%": "\u00a0\u103a",
    "&": "\u00a0\u109d",
    "`": "\u1039ꩡ",
    ".": ".",
    " ": " ",
    "\t": "\t",
    "…": "…",
    '¥': '¥',

};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);


langConverter.convertEncodingToUnicode = function(inbox, outbox, encodingIndex) {
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
  var newText = outtext;

    // Consonants 11700-1171A
    // Medials 1171D-1171F
    // Vowels 11720-1172B

    // Next, move some code points in context to get proper Unicode ordering.
  // Vowel sign to right of consonants:
  ePattern = /\ud805([\udf1e\udf26])\ud805([\udf1d-\udf1f])\ud805([\udf00-\udf1a])/gi;
  eReplace = "\uD805$3\uD805$2\ud805$1";
    newText = outtext = newText.replace(ePattern, eReplace);
    
  ePattern = /\ud805([\udf1e\udf26])\ud805([\udf00-\udf1a])/gi;
  eReplace = "\uD805$2\uD805$1";
  newText = outtext = newText.replace(ePattern, eReplace);

  ePattern = /\ud805(\udf28)\ud805([\udf27\udf29])/gi;
  eReplace = "\uD805$2\uD805$1";
   newText = outtext = newText.replace(ePattern, eReplace);

  // Move e-Vowel to right of medials
  ePattern = /\ud805(\udf26)\ud805([\udf1d-\udf1f])/gi;
  eReplace = "\uD805$2\uD805$1";
   newText = outtext = newText.replace(ePattern, eReplace);

  ePattern = /\ud805(\udf24)\ud805([\udf22\udf29\udf2b\udf2a])/gi;
  eReplace = "\uD805$2\uD805$1";
  newText = outtext = newText.replace(ePattern, eReplace);

  // Diacritics after space - invert order
  ePattern = /\u0020\ud805([\udf2b])/gi;
  eReplace = "\uD805$1\u0020";
  newText = outtext = newText.replace(ePattern, eReplace);

  // Double full stop \ud805\udf3c to \ud805\udf3d
  ePattern = /\ud805\udf3c\ud805\udf3c/gi;
  eReplace = "\ud805\udf3d";
  newText = outtext = newText.replace(ePattern, eReplace);
  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
