// Convert from encoded Bangla script for Assamese language to Unicode
const langConverter = new langConverterClass('asm', 'Assamese');

// Mappings for this font to Unicode
const map_encoding_names = [
  'Tanmatra Boishakhi',  // Gam Win and PUA to Unicode
];

langConverter.encoding_data = {
    'Tanmatra Boishakhi': {index:0, outputEncoding:'Unicode', outputScript:'Bengali'},
    'Noto Sans' : {index:1, outputEncoding:'Unicode', outputScript:'Bengali'},
};

langConverter.preTransforms = [
    [/'\u0067\u00b5\u00ea'/gi, '\u90b0\u09cd\u09ac\u09cd\u09ac'],
];

langConverter.transformRules = [
    [/(\u09a1\u09bc)/gi, '\u09dc'],
    [/(\u09a2\u09bc)/gi, '\u09dd'],
    [/(\u09af\u09bc)/gi, '\u09df'],
    [/(\u09bc\u09bc)/gi, '\u09bc'],  // Doubled!

    [/(\u098b\u09c3)/gi, '\u09e0'],

    [/([\u0981])(\u09be)/gi, '$2$1'],
    [/(\u0985\u09be)/gi, '\u0986'],

    // Hack - remove duplicate virama
    [/\u09cd\u09cd/gi, '\u09cd'],
    
    
    // Bare virama before some cases. Insert ZWSP
    [/\u09cd([\u09ab\u0964])/gi, '\u09cd\ufeff$1'],

    // 0xea and reversing - include following diacritic
    [/([\u0993-\u09b9][\u09be\09c0-09cc]?)(\u09cd[\u09a3-\u09af])?(\u09b0\u09cd)/gi, '$3$1$2'],
    
    // 0xea
    [/(\u09ae\u09cd)(\u09e9)/gi, '$1\u09ad'], // ??

    // vowel sign I moves over consonant
    [/([\u09bf\u09c7\u09c8])([\u0985-\u09b9\u09dc-\u09e1\u09f0\u09f1])/gi, '$2$1'],

    // next, vowel sign I moves over two conjuncts and following
    [/([\u09bf\u09c7\u09c8])(\u09cd)([\u0993-\u09b9\u09e6-\u09f1])(\u09cd)([\u0993-\u09b9\u09e6-\u09f1])/gi, '$2$3$4$5$1'],

    // next, vowel sign I moves over conjunct and following
    [/([\u09bf\u09c7\u09c8])(\u09cd)([\u0993-\u09b9\u09e6-\u09f1])/gi, '$2$3$1'],
    
    // // ?? [/(\u09A4)(\u09BF)/gi, '$2$1'],

    // Reorder combiners
    [/(\u09bf\u09bc)/gi, '\u09bc\u09bf'],  // Doubled?

    // [/(\u09AD\u007C\u09A5\u09CD)/gi, '\u09f0\u09cd\u09ad'],
    [/([\u0995-\u09b9\u9dc-\u09df\u9f0\09f1])\u09A5\u09CD/gi, '\u09f0\u09cd$1'],

    [/([\u09bf\u09c7])(\u09cd\u09a4)/gi, '$2$1'],
    // Specific to a3 df
    [/\u09a4\u09cd\u09a4\u09cd\u09a4/gi, '\u0995\u09cd\u09a4'],
    // For a2 df
    [/\u09a4\u09cd\u09f0(\u09c7?)\u09cd\u09a4/gi, '\u0995\u09cd\u09f0$1'],
    // Specific to ec e8
    [/\u09a8\u09cd\u098f/gi, '\u09ae\u09cd\u09b0'],
    // fe, e7 
    [/\u09B8\u09CD\u0993/gi, '\u09b8\u09cd\u09a4\u09c1'],
    // fe, e8 
    [/\u09B8\u09CD\u098f/gi, '\u09b8\u09cd\u09a4\u09cd\u09b0'],
    // ec e7
    [/\u09a8\u09CD\u0993/gi, '\u09a8\u09cd\u09a4\u09c1'],
    // ec e8
    [/\u09ae\u09CD([\u09b0\u09f0])/gi, '\u09a8\u09cd\u09a4\u09cd$1'],

    // A3 D8 - move 9bf over, too
    [/\u09A4\u09CD\u09A4(\u09bf)?\u09C1/gi, '\u0995\u09CD\u09A4$1'],
    // A9 AE special case
    [/\u09A6\u09CD\u09f0\u09b0\u09cd/gi, '\u09b0\u09CD\u09A6\u09cd\u09f0'],

    // Remove virama after U sign
    [/([\u09c1])\u09cd/gi, '$1'],

    // ??? Move killer over 9c7 & 9c8
    [/(\u09cd)([\u09c7\u09c8])/gi, '$2$1'],

];

private_use_map_combined = {
    // Extra
    '\u201e': '৷',
    // 0x20
    ' ': [' '],
    '!': ['!'],
    '\"': [ '\u2018'],
    '#': [ '\u09d7'],
    '$': [ '৮'],
    '%': [ '%'],
    '&': [ '\u25EF'],
    '\'': ['\u2019'],
    '(': [ '('],
    ')': [ ')'],
    '*': [ '\u00d7'],
    '+': [ '+'],
    ',': [ ','],
    '-': [ '-'],
    '.': [ '.'],
    '/': [ '/'],

    // 0x30
    '0': ['০'],
    '1': ['১'],
    '2': ['২'],
    '3': ['৩'],
    '4': ['৪'],
    '5': ['৫'],
    '6': ['৬'],
    '7': ['৭'],
    '8': ['৮'],
    '9': ['৯'],
    ':': ['\u0983'],
    ';': [';'],
    '<': ['<'],
    '=': ['='],
    '>': ['>'],
    '?': ['?'],
    
    // 0x40
    '@': ['@'],
    'A': ['\u0985'],
    'B': ['ই'],
    'C': ['ঈ'],
    'D': ['উ'],
    'E': ['\u098a'],
    'F': ['\u098b'],
    'G': ['\u098F'],
    'H': ['\u0990'],
    'I': ['\u0993'],
    'J': ['\u0994'],
    'K': ['\u0995'],
    'L': ['\u0996'],
    'M': ['\u0997'],
    'N': ['ঘ'],
    'O': [ 'ঙ'],

    // 0x50
    'P': ['চ'],
    'Q': ['ছ'],
    'R': ['জ'],
    'S': ['ঝ'],
    'T': ['ঞ'],
    'U': ['ট'],
    'V': ['ঠ'],
    'W': ['ড'],
    'X': ['ঢ'],
    'Y': ['ণ'],
    'Z': ['ত'],
    '[': ['['],
    '\\': ['\u09f1'],
    ']': [']'],
    '^': ['\u0981'],
    '_': ['_'],

    // 0x60
    '`': ['\u00f7'],
    'a': ['থ'],
    'b': ['দ'],
    'c': ['ধ'],
    'd': ['ন'],
    'e': ['প'],
    'f': ['ফ'],
    'g': ['ব'],
    'h': ['ভ'],
    'i': ['ম'],
    'j': ['য'],
    'k': ['\u09B0'],
    'l': ['ল'],
    'm': ['শ'],
    'n': ['ষ'],
    'o': ['স'],

    // 0x70
    'p': ['হ'],
    'q': ['ক্ষ'],
    'r': ['\u09dc'],
    's': ['\u09dd'],
    't': ['\u09df'],
    'u': ['ৎ'],
    'v': ['ং'],
    '\u0077': ['া'],
    'x': ['\u09bf'],
    'y': ['\u09c0'],
    'z': ['\u09cd'],
    '{': ['{'],
    '|': ['\u09be'],
    '}': ['}'],
    '~': ['\u0995\u09cd\u0995'],

    // 0xa0
    ' ': ['X'],
    '¡': ['\u09A3\u09CD\u09A1'], 
    '¢': ['\u09A4\u09CD\u09F0'],
    '£': ['\u0995'],
    '\u00a3': ['\u09a4\u09cd\u09a4'],
    '¤': ['\u09a4\u09CD\u09A5'],
    '¥': ['\u09A6\u09CD\u09A6'], 
    '¦': ['দ্ধ'],
    '\u00a7': ['\u09A6\u09CD\u09ac'],
    // ?? '§': ['দ্\u09A6\u09CD\u09Ac'], 
    '¨': ['\u09a6\u09CD\u09AD'],
    '©': ['\u09A6\u09CD\u09F0'], 
    'ª': ['\u09A3\u09CD\u09A0'],
    '\u00ab': ['\u09a8\u09cd\u09a1'],
    '\u00ac': ['\u09a8\u09cd\u09a7'],
    '­': ['ন্ড'], 
    '®': ['প্ত'],
    '¯': ['\u09AA\u09CD\u09AA'], 

    // 0xb0 
    '\u00b0': ['\u09ab\u09cd\u09f0'],
    '\u00b1': ['\u09ac\u09cd\u099c'],
    '\u00b2': ['\u09ac\u09cd\u09a6'],
    '\u00b3': ['\u09AC\u09CD\u09A6\u09CD\u09B9'],
    '\u00b4': ['\u09f0'],
    '\u00b5': ['\u09cd\u09ac'],
    '\u00b6': ['\u09a6\u09cd\u09a7'],
    '\u00b7': ['·'],
    '\u00b8': ['\u09AD\u09CD\u09b0'],
    '¹': ['\u09AE\u09CD\u09AC'],
    'º': ['\u09AE\u09CD\u09AD'],
    '»': ['\u09AE\u09CD\u09AD\u09CD\u09AC'],
    '¼': ['\u09F5\u2044\u09ea'],
    '½': ['\u09F5\u2044\u09e8'],
    '¾': ['\u09F8\u2044\u09ee'],
    '¿': ['\u09B2\u09CD\u0995'],

    // 0xc0
    '\u00c0': ['\u09B2\u09CD\u09A1'],
    '\u00c1': ['\u09B2\u09CD\u09B2'],
    '\u00c2': ['\u09B6\u09C1'],
    '\u00c3': ['\u09b6\u09cd\u09a4'],
    '\u00c4': ['\u09B7\u09CD\u099F'],
    '\u00c5': ['\u09B7\u09CD\u09A0'],
    '\u00c6': ['\u09b8\u09CD\u0995'],
    '\u00c7': ['\u09b8\u09cd\u0995\u09cd\u09f0'],
    '\u00c8': ['স্ব'],
    '\u00c9': ['হু'],
    '\u00ca': ['\u09b9\u09CD\u09ae'],
    '\u00cb': ['\u09c7'],
    '\u00cc': ['\u09c7'],  // ['হু'],
    '\u00cd': ['ন্ম'],
    '\u00ce': ['ন্ম'],
    '\u00cf': '॥',
    
    // 0d0
    '\u00d0': ['\u09c8'],
    '\u00d1': ['\u09c8'],
    '\u00d2': ['\u09a8\u09cd\u09a8'],  // Ò 
    '\u00d4': ['\u09c2'],
    '\u00d6': ['\u09c1'],
    '\u00d7': ['\u09c1'],
    '\u00d8': ['\u09c1'],
    '\u00d9': ['\u09c3'],
    '\u00da': ['\u09c3'],
    '\u00de': ['\u09cd\u09b0'],
    '\u00df': ['\u09cd\u09a4'],
    
    // 0xe0
    '\u00e0': ['গ'],
    '\u00e1': ['ঙ\u09cd'],
    '\u00e2': ['\u099a\u09cd'],
    '\u00e3': ['\u099E\u09CD\u099A'],
    '\u00e4': ['ও'],
    '\u00e5': ['\u09a3\u09cd'],
    '\u00e6': ['\u09a4'],
    '\u00e7': ['\u0993'],
    '\u00e8': ['\u098f'],
    '\u00e9': ['\u099E\u09CD\u099A'],
    '\u00ea': ['\u09b0\u09cd'],
    '\u00eb': ['\u09a8\u09cd'],
    '\u00ec': ['\u09a8\u09cd'],
    '\u00ed': ['\u09cd\u09a8'],
    '\u00ee': ['\u09cd\u09a8'],
    '\u00ef': [' '],

    // 0xf0
    '\u00f0': ['\u09cd\u09ac'],
    '\u00f1': ['\u09cd\u09ac'],
    '\u00f2': ['\u09cd\u09ac'],
    '\u00f3': ['\u09ae\u09cd'],
    '\u00f4': ['\u09cd\u09ae'],
    '\u00f5': ['\u09b2'],
    '\u00f6': ['\u09cd\u09b2'],
    '\u00f7': ['\u09a7'],
    // '\u00f8': ['\u09cd\u09af'],
    '\u00f8': ['\u09cd\u09af'],
    '\u00f9': ['\u09b2\u09cd'],  // OK
    '\u00fa': ['\u09b6\u09cd'],
    '\u00fb': ['\u09b7\u09cd'],
    '\u00fc': ['\u09b7\u09cd'],
    '\u00fd': ['\u09b8\u09cd'],
    '\u00fe': ['\u09b8\u09cd'],
    '\u00ff': ['\u09cd\u09a5'],

    '\u0152': ['\u099c\u09cd\u099c'],
    '\u0153': ['\u09a1\u09cd\u09a1'],
    '\u0160': ['\u0999\u09CD\u0997'],
    '\u0161': ['\u099C\u09CD\u099E'],
    '\u0178': ['\u09a3\u09CD\u09a0'],
    '\u2014': ['\u099e\u09cd\u099a'],
    '\u2018': ['\u2018'],
    '\u2019': ['\u2019'],
    '\u201c': ['\u201c'],
    '\u201d': ['\u201d'],
    '\u201e': ['\u0964'],
    '\u2020': ['\u0997\u09c1'],
    '\u2021': ['\u0997\u09cd\u0997'],
    '\u2022': ['???'],
    '\u2026': ['\u0995\u09cd\u09b8'],
    '\u2030': ['\u0999\u09cd\u0995'],
    '\u2039': ['???'],
    '\u203a': ['\u099f\u09cd\u099f'],
    '\u20ac': ['\u0965'],
    '\u2122': ['\u099e\u09cd\u099c'],
}

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);
