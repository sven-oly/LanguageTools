const langConverter = new langConverterClass('qiang', 'Qiang');

// Mappings for Phake font encodings
langConverter.map_encoding_names = map_encoding_names = [
    'Rma-serif ASCII',
    'Rma-serif ASCII bar'
];

langConverter.encoding_data = {
    'Rma-serif ASCII': {index:0, outputEncoding:'Unicode', outputScript:'Rma'},
    'Rma-serif ASCII bar': {index:0, outputEncoding:'Unicode', outputScript:'Rma'},
};

langConverter.transformRules = [
];


// This should be a map. But the output should not include U+FE00.
// They can be added by calling add_variation_modifiers.
private_use_map_combined = {
    "!": ["\ud818\udd7a"],
    "&": ["\ud818\udd77"],
    ",": ["\ud818\udd79"],
    // Unknown ones set to 3f
    "-": ["\ud818\udd3f"],
    ".": ["\ud818\udd78"],
    "?": ["\ud818\udd7b"],
    "A": ["\ud818\udd6b"],
    "B": ["\ud818\udd42"],
    "C": ["\ud818\udd65"],
    "D": ["\ud818\udd49"],
    "E": ["\ud818\udd6c"],
    "F": ["\ud818\udd5c"],
    "G": ["\ud818\udd50"],
    "H": ["\ud818\udd53"],
    "I": ["\ud818\udd70"],
    "J": ["\ud818\udd56"],
    "K": ["\ud818\udd4a"],
    "L": ["\ud818\udd4b"],
    "M": ["\ud818\udd51"],
    "N": ["\ud818\udd72"],
    "O": ["\ud818\udd69"],
    "P": ["\ud818\udd46"],
    "Q": ["\ud818\udd5a"],
    "R": ["\ud818\udd68"],
    "S": ["\ud818\udd63"],
    "T": ["\ud818\udd64"],
    "U": ["\ud818\udd67"],
    "V": ["\ud818\udd5e"],
    "W": ["\ud818\udd66"],
    "X": ["\ud818\udd59"],
    "Y": ["\ud818\udd4d"],
    "Z": ["\ud818\udd61"],
    "a": ["\ud818\udd6a"],
    "b": ["\ud818\udd40"],
    "c": ["\ud818\udd60"],
    "d": ["\ud818\udd47"],
    "e": ["\ud818\udd6e"],
    "f": ["\ud818\udd44"],
    "g": ["\ud818\udd4e"],
    "h": ["\ud818\udd52"],
    "i": ["\ud818\udd6f"],
    "j": ["\ud818\udd54"],
    "k": ["\ud818\udd4f"],
    "l": ["\ud818\udd4c"],
    "m": ["\ud818\udd43"],
    "n": ["\ud818\udd4a"],
    "o": ["\ud818\udd71"],
    "p": ["\ud818\udd41"],
    "q": ["\ud818\udd55"],
    "r": ["\ud818\udd73"],
    "s": ["\ud818\udd62"],
    "t": ["\ud818\udd48"],
    "u": ["\ud818\udd6d"],
    "v": ["\ud818\udd5d"],
    "w": ["\ud818\udd45"],
    "x": ["\ud818\udd58"],
    "y": ["\ud818\udd57"],
    "z": ["\ud818\udd5f"],
    "~": ["\ud818\udd3f"],
};

// Get the data
langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

