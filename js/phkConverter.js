const langConverter = new langConverterClass('phk', 'Tai Phake');

// Mappings for Phake font encodings
langConverter.map_encoding_names = map_encoding_names = [
  'Phake Script',
  'Phake Ramayana',
  'Aiton Script',
];

langConverter.encoding_data = {
    'Phake': {index:0, outputEncoding:'Unicode', outputScript:'Myanmar'},
    'Phakeramayana': {index:1, outputEncoding:'Unicode', outputScript:'Myanmar'},
    'Aiton': {index:2, outputEncoding:'Unicode', outputScript:'Myanmar'},
};

langConverter.transformRules = [
    [/([\u1031\u103c]\ufe00?)([\u1000-\u1029\u1075-\u1081\uaa60-\uaa7a]\ufe00?)/gi,
     "$2$1"],

    [/ ([\u102f\u103d])/gi, "$1 "],

    [/([\u103b\u103d]) \u102f/gi, "$1\u102f "],

    [/([\u1031]\ufe00?)([\u103a\u103d]+)/gi, "$2$1 "],

    // Doubled combiners
    [/\u103a\u103a/gi, "\u103a\u00a0\u103a"],

    [/\u102e\u102e/gi, "\u102e\u00a0\u102e"],

    [/\u1036\u1036/gi, "\u1036\u00a0\u1036"],

    [/\u109d\u109d/gi, "\u109d\u00a0\u109d"],
    
    // Remove duplicates
    [/\u103c\u103c/gi , "\u103c"],
    [/\u103b\u103b/gi , "\u103b"],
    [/\u105e\u105e/gi , "\u105e"],

    // Reorder signs
    [/([\u102d\u102e])([\u103a\u103b\u103c\u103d\u105e])/gi,
     "$2$1"],
    [/([\u102f\u1030\u1036])([\u103a\u103b\u103c\u103d\u105e\u109d\ua935])/gi,
     "$2$1"],
    [/([\u103b\u103c\u103d])(\u105e)/gi , "$2$1"],
    
  // Ellipsis
  [/\.\.\./gi, "\u2026"],
]

// These characters take variation sequence modifiers
var variation_sequence_code_points =
/([\u1000\u1002\u1004\u1010\u1011\u1015\u1019\u101a\u101c\u101d\u1022\u1031\u1075\u1078\u1080\uaa60\uaa61\uaa62\uaa63\uaa64\uaa65\uaa66\uaa6b\uaa6c\uaa6f\uaa7a])/g;
var variation_modifier = "\ufe00";

function vsReplacer(match, match_char, offset, string) {
  return match_char + variation_modifier;
}

function add_variation_modifiers(text) {
  const size = text.length;
  const out_text = text.replace(variation_sequence_code_points, vsReplacer);
  return out_text;
}

function remove_variation_modifiers(text) {
  size = text.length;
  index = 0;
  out_text = "";
  while (index < size) {
    var char = text[index];
    if (char != variation_modifier) {
      out_text += char;
    }
    index ++;
  }
  return out_text;
}

// This should be a map. But the output should not include U+FE00.
// They can be added by calling add_variation_modifiers.
private_use_map_combined = {
        "A": ["ဢ", "ဢ", "ဢ"],
        "B": ["ꩰ", "ꩰ", "ꩰ"],
        "C": ["\u108a", ":", "\u108a"],
        "D": ["ꩰ", "ꩰ", "ꩰ"],
        "E": ["\u105e\u103a", "\u105e\u103a", "\u105e\u103a"],
        "F": ["\u103a\u1036", "\u103a\u1036", "\u103a\u1036"],
        "G": ["\u1087", "\u1087", "\u1087"],
        "H": ["\u1088", "\u1088", "\u1088"],
        "I": ["\u102e", "ီ", "ီ"],
        "J": ["ို", "ို", "ို"],
        "K": ["\u1039\u1000", "\u1039\u1000", "\u1039\u1000"],
        "L": ["\u1038", "\u1038", "\u1038"],
        "M": ["ံ", "ံ", "ံ"],
        "N": ["\u107a", "\u107a", "\u107a"],
        "O": ["\u1089", "\u1089", "\u103d"],
        "P": ["\u1039\u1015", "\u1039\u1015", "\u1039\u1015"],
        "Q": ["\uaa77", "\uaa77", "\uaa77"],
        "R": ["ြ", "ြ", "ြ"],
        "S": ["꩷", "꩷", "꩷"],
        "T": ["\u1039\u1010", "\u1039\u1010", "\u1039\u1010"],
        // TODO: Resolve V for Aiton
        "U": ["\u1030", "\u1030", "\u1030"],
        "V": ["\ua9f2", "\ua9f2", "\u1030"],
        "W": ["ွ်", "ွ်", "ွ်"],
        "X": ["ႜ", "ႜ", "ႜ"],
        "Y": ["ျ", "ျ", "ျ"],
        "Z": ["ၞ", "ၞ", "ၞ"],
        "a": ["ႃ", "ႃ", "ႃ"],
        "b": ["ပ", "ပ", "ပ"],
        "c": ["ꩡ", "ꩡ", "ꩡ"],
        "d": ["ဒ", "ဒ", "ဒ"],
        "e": ["ေ", "ေ", "ေ"],
        "f": ["ၸ", "ၸ", "ၸ"],
        "g": ["င", "င", "င"],
        "h": ["\uaa6d", "\uaa6d", "\uaa6d"],
        "i": ["ိ", "ိ", "ိ"],
        "j": ["\u109d", "\u109d", "\u109d"],
        "k": ["က", "က", "က"],
        "l": ["လ", "လ", "လ"],
        "m": ["မ", "မ", "မ"],
        "n": ["ꩫ", "ꩫ", "ꩫ"],
        "o": ["ွ", "ွ", "ွ"],
        "p": ["ပ", "ပ", "ပ"],
        "q": ["်", "်", "်"],
        "r": ["\uAA7A", "\uAA7A", "\uAA7A"],
        "s": ["\uaa6c", "\uaa6c", "\uaa6c"],
        "t": ["တ", "တ", "တ"],
        "u": ["ု", "ု", "ု"],
        "v": ["ထ", "ထ", "ထ"],
        "w": ["ဝ", "ဝ", "ဝ"],
        "x": ["ၵ", "ၵ", "ၵ"],
        "y": ["ယ", "ယ", "ယ"],
        "z": ["\uAA78", "\uAA78", "\uAA78"],
        "@": ["\ua9f2", "\ua9f2", "\u1092"],
        "(": ["(", "(", "("],
        ")": [")", ")", ")"],
        "/": ["\u104b", "\u104b", "\u104b"],
        "\\": ["\u104a", "\u104a", "\u104a"],
        "[": ["\u103c", "\u103c", "\u103c"],
        "|": ["\u103c", "\u103c", "\u1039\u101c"],
        "]": ["\u103c", "\u103c", "\u103c"],
        "{": ["\u103c", "\u103c", "\u103c"],
        "}": ["\u103a\u103d", "\u103a\u103d", "\u105c"],
        "~": ["", "", "\u1039\u101a"],
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
        "#": ["\u1036", "\u1036", "\u1036"],
        "$": ["\u102e", "\u102e", "\u102e"],
        "^": ["\u102c", "\u102c", "\u102c"],
        "_": ["\u103a\u105e", "\u103a\u105e", "\u103a\u105e"],
        "%": ["\u00a0\u103a", "\u00a0\u103a", "\u00a0\u103a"],
        "&": ["\u00a0\u109d", "&", "\u00a0\u109d"],
        "`": ["`", "`",  "\u1039ꩡ"],
        "~": ["~", "~", "\u1039\u101a"]
};

// Get the data
langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

const banchobMap = {
  'N': 'ŋ',
  'M': 'ñ',
  'j': 'ɛ',
  'v': 'ü',
  'z': 'ə',
  'q': 'ɔ',
  'I': 'ī',
  'E': 'ē',
  'J': 'ɛ̄',
  'V': 'ǖ',
  'Z': 'ə̄',
  'A': 'ā',
  'U': 'ū',
  'O': 'ō',
  'Q': 'ɔ̄',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
};

function convertBanchob(intext) {
let outtext = [];
  let out;
  for (let index = 0; index < intext.length; index ++) {
    const c = intext[index];
    out = c;
    if (c in banchobMap) {
      const result = banchobMap[c];
      if (result) {
            out = result;
      }
    }
    outtext.apend(out);
  }
  return ''.join(outtext);
}
