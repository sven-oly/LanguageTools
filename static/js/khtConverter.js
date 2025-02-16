const langConverter = new langConverterClass('kht', 'Tai Khamti');

// Mappings for Phake font encodings
langConverter.map_encoding_names = map_encoding_names = [
    'Tokmaaitai',
];

langConverter.encoding_data = {
    'Tokmaaitai': {index:0, outputEncoding:'Unicode', outputScript:'Myanmar'},
};


// Copied from Tai Phake
langConverter.transformRules = [
    [/([\u1031\u103c]\ufe00?)([\u1000-\u1029\u1075-\u1081\uaa60-\uaa7a]\ufe00?)/gi,
     "$2$1"],

    [/ ([\u102f\u103d])/gi, "$1 "],

    [/([\u103b\u103d])\u102f/gi, "$1\u102f "],

    [/([\u1031]\ufe00?)([\u103a-\u103d]+)/gi, "$2$1"],

    [/([\u103C\u103D])([\u103B])/gi, "$2$1"],
    [/([\u103D])([\u103C])/gi, "$2$1"],

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

// For each ["Tokmaaitai"]
langConverter.private_use_map_combined = {
    "u": ["\u1000\ufe00"],  // က
    "c": ["\u1075\ufe00"],  // ၵ
    "U": ["\uAA60\ufe00"],  // ꩠ
    "C": ["\u1077\ufe00"],  //ၷ
    "i": ["\u1004\ufe00"],  //င
    "p": ["\uAA61\ufe00"],  //ꩡ
    "Q": ["\uaa64\ufe00"],  // !!!
    "P": ["\uAA63\ufe00"],  //ꩣ
    "R": ["\uAA64"],  //ꩤ
    "N": ["\uAA65\ufe00"],  //ꩥ
    "T": ["\uAA66"],  //ꩦ
    "I": ["\uAA67"],  //ꩧ
    "F": ["\uAA68"],  //ꩨ
    "J": ["\uAA69"],  //ꩩ
    "E": ["\u107C\ufe00"],  //ၼ
    "w": ["\u1010\ufe00"],  //တ
    "x": ["\u1011"],  //ထ
    "W": ["\u107B"],  //ၻ
    "X": ["\uAA6A"],  //ꩪ
    "e": ["\uAA6B\ufe00"],  //ꩫ
    "y": ["\u1015\ufe00"],  //ပ
    "z": ["\u1078\ufe00"],  //ၸ
    "Y": ["\u107F"],  //ၿ
    "Z": ["\u1079"],  //ၹ
    "r": ["\u1019\ufe00"],  // မ
    ",": ["\u101A\ufe00"],  //ယ
    "V": ["\u101B"],  //ရ
    "v": ["\u101C\ufe00"],  //လ
    "o": ["\u101D"],  //ဝ
    "q": ["\uAA6C\ufe00"],  // ꩬ
    "[": ["\uAA6D"],  //ꩭ
    "`": ["\uAA6E"],  //ꩮ
    "t": ["\u1022\ufe00"],  //ဢ
    "m": ["\u1062"],  //ၢ
    "g": ["\u1083"],  //ႃ
    "d": ["\u102D"],  //  ိ 
    "D": ["\u102E"],  //  ီ
    "k": ["\u102F"],  //ု
    "l": ["\u1030"],  // ူ
    "a": ["\u1031"],  // ေ
    "O": ["\u1084"],  // ႄ
    "s": ["\u103a\u1082"],  //  ႂ်

    "K": ["\u103A\u1036"],  //်ံ
    // "j": ["\u1086"],  //ႆ
    "j": ["\u1032"],  //ႆ
    "S": ["\u103B"],  //ျ
    "L": ["\u103C"],  //ြ
    "H": ["\u1036"],  //ံ
    "G": ["\u103D"],  //  ွ
    "f": ["\u103A"],  //်
    "h": ["\u1088"],  //\u1038",  // း
    "b": ["\u109B"],  // ႛ
    "n": ["\u1087"],  // ႇ
    ".": ["\u1089"],  // ႉ
    ">": ["\u109A "],  // ႚ
    ":": ["\u108A"],  // ႊ 
    ";": ["\u1038"],  // ႊ 
    "B": ["\uAA74"],  //ꩴ
    // "K": ["ꩵ︀"], 
    // "L": ["ꩶ︀"],  //ꩶ︀
    "/": ["\u104B"],  //၊
    "^": ["\uAA70"],  // ꩰ
};

// Get the data
langConverter.one2oneMap = langConverter.dictionaryToMap(langConverter.private_use_map_combined);
