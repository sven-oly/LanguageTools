// In order a-z, A-Z 1-9 0
// Mappings for Kurmali font encodings to Unicode (proosed)
const langConverter = new langConverterClass('kyw', 'Kurmali');

langConverter.encodingNames = map_encoding_names = [
  'Biswa Chisoi ASCII'];

langConverter.encoding_data = {
    'Biswa Chisoi ASCII': {index:0, outputEncoding:'Unicode', outputScript:'Chis'}
};

langConverter.transformRules = [
];

langConverter.one2oneMap =  private_use_map_combined = {
    '0': ['\ud81b\uddA0'],
    '1': ['\ud81b\uddA1'],
    '2': ['\ud81b\uddA2'],
    '3': ['\ud81b\uddA3'],
    '4': ['\ud81b\uddA4'],
    '5': ['\ud81b\uddA5'],
    '6': ['\ud81b\uddA6'],
    '7': ['\ud81b\uddA7'],
    '8': ['\ud81b\uddA8'],
    '9': ['\ud81b\uddA9'],

    'a': ['\ud81b\udd83'],
    'b': ['\ud81b\udd81'],
    'c': ['\ud81b\udd95'],
    'd': ['\ud81b\udd90'],
    'e': ['\ud81b\udd86'],
    'g': ['\ud81b\udd84'],
    'h': ['\ud81b\udd8D'],
    'i': ['\ud81b\udd89'],
    'j': ['\ud81b\udd96'],
    'k': ['\ud81b\udd8A'],
    'l': ['\ud81b\udd91'],
    'm': ['\ud81b\udd8C'],
    'n': ['\ud81b\udd88'],
    'o': ['\ud81b\udd80'],
    'p': ['\ud81b\udd97'],
    'r': ['\ud81b\udd8B'],
    's': ['\ud81b\udd87'],
    't': ['\ud81b\udd83'],
    'u': ['\ud81b\udd8F'],
    'D': ['\ud81b\udd9A'],
    'E': ['\ud81b\udd82'],
    'H': ['\ud81b\udd9C'],
    'N': ['\ud81b\udd94'],
    'O': ['\ud81b\udd92'],
    'P': ['\ud81b\udd8E'],
    'Q': ['\ud81b\udd8E'],
    'R': ['\ud81b\udd8E'],
    'T': ['\ud81b\udd9B'],
    'X': ['\ud81b\udd98'],
    'W': ['\ud81b\udd98'],
    'Y': ['\ud81b\udd93'],
};


langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);
