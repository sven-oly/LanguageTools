const langConverter = new langConverterClass('qiang', 'Qiang');

// Mappings for Phake font encodings
langConverter.map_encoding_names = map_encoding_names = [
    'Rma-serif ASCII to PUA',
    'Rma-serif ASCII to Unicode',
    'Rma-serif PUA'
];

langConverter.encoding_data = {
    'Rma-serif ASCII to PUA': {index:0, outputEncoding:'PUA', outputScript:'Rma'},
    'Rma-serif ASCII to Unicode': {index:1, outputEncoding:'Unicode', outputScript:'Rma'},
//    'Rma-serif ASCII': {index:1, outputEncoding:'Unicode', outputScript:'Rma'},
//    'Rma-serif ASCII bar': {index:1, outputEncoding:'Unicode', outputScript:'Rma'}
};

langConverter.transformRules = [
];

// For use in the HTML to ceate the UI options
langConvert.transformOptions = [
    {convertIndex: [0], inputEncoding: "ASCII", outputEncoding: "PUA"},
    {convertIndex: [1], inputEncoding: "ASCII", outputEncoding: "Unicode"},
    // How to indicate a reversed encoding? Or a composite?
    {convertIndex: [-1, 1], inputEncoding: "PUA", outputEncoding: "Unicode"}
];

// Describe the encodings in the private use map
langConverter.private_use_encodings = {
   -1: "ASCII",  // The mapping key
    0: "PUA",
    1: "Unicode"
    "ASCII": -1,
    "PUA": 0,
    "Unicode": 1
};

let langConverter.customConverter = none;

def langConverter.build_custom_map(input_index, output_index) {
    // Given two indices, build a converter from the
    // input_index to output_index from the private_use_map_combined.
    // index -1 is the key.

    var new_map = {};
    var new_key;
    var new_val;
    for (key in private_use_map_combined.keys()) {
        if (input_index == -1) {
            new_key = key;
            new_val = private_use_map_combined[key][output_index];
        } else {
            new_key = private_use_map_combined[key][input_index];
            new_val = private_use_map_combined[key][output_index];
        }
        new_map[new_key] =
            new_val;
    }
    // Remember the latest one.
    langConverter.customConverter = none;
    return new_map;
}

// This should be a map. But the output should not include U+FE00.
// They can be added by calling add_variation_modifiers.
private_use_map_combined = {
    "!": ["\ue17a", "\ud818\udd7a"],
    "&": ["\ue177", "\ud818\udd77"],
    ",": ["\ue179", "\ud818\udd79"],
    ".": ["\ue178", "\ud818\udd78"],
    "?": ["\ue17b", "\ud818\udd7b"],
    "A": ["\ue16b", "\ud818\udd6b"],
    "B": ["\ue142", "\ud818\udd42"],
    "C": ["\ue165", "\ud818\udd65"],
    "D": ["\ue149", "\ud818\udd49"],
    "E": ["\ue16c", "\ud818\udd6c"],
    "G": ["\ue150", "\ud818\udd50"],
    "H": ["\ue153", "\ud818\udd53"],
    "I": ["\ue170", "\ud818\udd70"],
    "J": ["\ue156", "\ud818\udd56"],
    "K": ["\ue15b", "\ud818\udd4a"],
    "L": ["\ue14b", "\ud818\udd4b"],
    "M": ["\ue151", "\ud818\udd51"],
    "N": ["\ue172", "\ud818\udd72"],
    "O": ["\ue15c", "\ud818\udd69"],
    "P": ["\ue146", "\ud818\udd46"],
    "Q": ["\ue15a", "\ud818\udd5a"],
    "R": ["\ue168", "\ud818\udd68"],
    "S": ["\ue163", "\ud818\udd63"],
    "T": ["\ue164", "\ud818\udd64"],
    "U": ["\ue167", "\ud818\udd67"],
    "V": ["\ue15e", "\ud818\udd5e"],
    "W": ["\ue166", "\ud818\udd66"],
    "X": ["\ue159", "\ud818\udd59"],
    "Y": ["\ue14d", "\ud818\udd4d"],
    "Z": ["\ue161", "\ud818\udd61"],
    "a": ["\ue16a", "\ud818\udd6a"],
    "b": ["\ue140", "\ud818\udd40"],
    "c": ["\ue160", "\ud818\udd60"],
    "d": ["\ue147", "\ud818\udd47"],
    "e": ["\ue16e", "\ud818\udd6e"],
    "f": ["\ue144", "\ud818\udd44"],
    "g": ["\ue14e", "\ud818\udd4e"],
    "h": ["\ue152", "\ud818\udd52"],
    "i": ["\ue16f", "\ud818\udd6f"],
    "j": ["\ue154", "\ud818\udd54"],
    "k": ["\ue14f", "\ud818\udd4f"],
    "l": ["\ue14c", "\ud818\udd4c"],
    "m": ["\ue143", "\ud818\udd43"],
    "n": ["\ue14a", "\ud818\udd4a"],
    "o": ["\ue171", "\ud818\udd71"],
    "p": ["\ue141", "\ud818\udd41"],
    "q": ["\ue155", "\ud818\udd55"],
    "r": ["\ue173", "\ud818\udd73"],
    "s": ["\ue162", "\ud818\udd62"],
    "t": ["\ue148", "\ud818\udd48"],
    "u": ["\ue16d", "\ud818\udd6d"],
    "v": ["\ue15d", "\ud818\udd5d"],
    "w": ["\ue145", "\ud818\udd45"],
    "x": ["\ue158", "\ud818\udd58"],
    "y": ["\ue157", "\ud818\udd57"],
    "z": ["\ue15f", "\ud818\udd5f"]
};

// Get the data
langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

