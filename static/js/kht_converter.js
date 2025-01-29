const langConverter = new langConverterClass('phk', 'Tai Phake');

// Mappings for Phake font encodings
langConverter.map_encoding_names = map_encoding_names = [
    'Tokmaaitai',
];

langConverter.encoding_data = {
    'Tokmaaitai': {index:0, outputEncoding:'Unicode', outputScript:'Myanmar'},
};

langConverter.transformRules = {
    "Tokmaaitai": {
        "u": "1000",  // က
        "c": "1075",  // ၵ
        "U": "AA60",  // ꩠ
        "C": "\u1077",  //ၷ
        "i": "\u1004",  //င
        "p": "\uAA61",  //ꩡ
        "Q": "",  //
        "P": "\uAA63",  //ꩣ
        "R": "\uAA64",  //ꩤ
        "N": "\uAA65",  //ꩥ
        "T": "\uAA66",  //ꩦ
        "I": "\uAA67",  //ꩧ
        "F": "\uAA68",  //ꩨ
        "J": "\uAA69",  //ꩩ
        "E": "\u107C",  //ၼ
        "w": "\u1010",  //တ
        "x": "\u1011",  //ထ
        "W": "\u107B",  //ၻ
        "X": "\uAA6A",  //ꩪ
        "e": "\uAA6B",  //ꩫ
        "y": "\u1015",  //ပ
        "z": "\u1078",  //ၸ
        "Y": "\u107F",  //ၿ
        "Z": "\u1079",  //ၹ
        "r": "\u1019",  // မ
        ",": "\u101A ",  //ယ
        "V": "\u101B ",  //ရ
        "v": "\u101C ",  //လ
        "o": "\u101D",  //ဝ
        "q": "\uAA6C",  // ꩬ
        "[": "\uAA6D",  //ꩭ
        "`": "\uAA6E",  //ꩮ
        "t": "\u1022",  //ဢ
        "m": "\u1062",  //ၢ
        "g": "\u1083",  //ႃ
        "d": "\u102D",  //  ိ 
        "D": "\u102E",  //  ီ
        "k": "\u102F",  //ု
        "l": "\u1030",  // ူ
        "a": "\u1031",  // ေ
        "O": "\u1084 ",  // ႄ
        "s": "\u1082\u103A",  //  ႂ်
        "K": "\u103A\u1036",  //်ံ
        "j": "\u1086",  //ႆ
        "S": "\u103B ",  //ျ
        "L": "\u103C",  //ြ
        "H": "\u1036",  //ံ
        "G": "\u103D",  //  ွ
        "f": "\u103A",  //်
        "h": "\u1088 ",  //\u1038",  // း
        "b": "\u109B ",  // ႛ
        "n": "\u1087",  // ႇ
        ".": "\u1089",  // ႉ
        ">": "\u109A ",  // ႚ
        ":": "\u108A",  // ႊ 
        "B": "\uAA74",  //ꩴ
        "K": "\u1234",  //ꩵ︀
        "L": "\u1235",  //ꩶ︀
        "/": "\u104AV",  //၊
        "^": "\uAA70",  // ꩰ
    }
}
