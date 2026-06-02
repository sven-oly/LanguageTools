// Convert from old font-encoding of text to Unicode forms:
const langConverter = new langConverterClass('shn', 'Shan');

langConverter.one2oneMap = private_use_map_combined = {
  '\u0020': [' ', ' '],
    '\u0030': ['\u1040', '\u1040'],
    '\u0031': ['\u1041', '\u1041'],
    '\u0032': ['\u1042', '\u1042'],
    '\u0033': ['\u1043', '\u1043'],
    '\u0034': ['\u1044', '\u1044'],
    '\u0035': ['\u1045', '\u1045'],
    '\u0036': ['\u1046', '\u1046'],
    '\u0037': ['\u1047', '\u1047'],
    '\u0038': ['\u1048', '\u1048'],
    '\u0039': ['\u1049', '\u1049'],
    '\u003a': ['\u1038', '\u1038'],

    '\u0041': ['\u1022', '\u1022'],
    '\u0042': ['\u102b', '\u102b'],
    '\u0043': ['\u108a', '\u108a'],
    '\u0044': ['\u103c', '\u103c'],
    '\u0045': ['\u1082\u1072', '\u1082\u1072'],
    '\u0046': ['\u107e', '\u107e'],
    '\u0047': ['\u1087', '\u1087'],
    '\u0048': ['\u1088', '\u1088'],
    '\u0049': ['\u102e', '\u102e'],
    '\u004a': ['\u102d\u102f', '\u102d\u102f'],
    '\u004b': ['\u1075', '\u1077'],
    '\u004c': ['\u1038', '\u1038'],
    '\u004d': ['\u1036', '\u1036'],
    '\u004e': ['\u107a', '\u107a'],
    '\u004f': ['\u1089', '\u1089'],

    '\u0050': ['\u1080', '\u1080'],
    '\u0051': ['\u1083', '\u1083'],
    '\u0052': ['\u103c', '\u103c'],
    '\u0053': ['\u103b', '\u103b'],
    '\u0054': ['\u1082', '??'],
    '\u0055': ['\u1030', '\u1030'],
    '\u0056': ['\u1035', '\u1035'],
    '\u0057': ['\u1084', '\u1084'],
    '\u0058': ['\u103a\u1083', '\u103a\u1083'],
    '\u0059': ['\u1085', '\u1085'],
    '\u005a': ['\u1033', '\u1033'],

    '\u0061': ['\u1083', '\u1083'],
    '\u0062': ['\u1017', '\u1017'],
    '\u0063': ['\u1078', '\u1078'],
    '\u0064': ['\u1012', '\u1012'],
    '\u0065': ['\u1031', '\u1031'],
    '\u0066': ['ၽ', '\u1083'],
    '\u0067': ['\u1004', '\u1004'],
    '\u0068': ['ႁ', '\u1083'],
    '\u0069': ['\u102d', '\u102d'],
    '\u006a': ['\u1086', '\u1086'],
    '\u006b': ['\u1075', '\u1075'],
    '\u006c': ['\u101c', '\u101c'],
    '\u006d': ['\u1019', '\u1019'],
    '\u006e': ['\u107c', '\u107c'],
    '\u006f': ['\u103d', '\u103d'],

    '\u0070': ['\u1015', '\u1015'],
    '\u0071': ['\u103a', '\u103a'],
    '\u0072': ['\u101b', '\u101b'],
    '\u0073': ['\u101e', '\u101e'],
    '\u0074': ['\u1010', '\u1010'],
    '\u0075': ['\u102f', '\u102f'],
    '\u0076': ['\u1011', '\u1011'],
    '\u0077': ['\u101d', '\u101d'],
    '\u0078': ['\u1076', '\u1076'],
    '\u0079': ['\u101a', '\u101a'],
    '\u007a': ['\u102d\u1030', '\u102d\u1030'],
}

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

/*
langConverter.addOne2OneTransforms(
  "\u1039\u103c",
  "\u103a\u103b", 0
);

langConverter.addOne2OneTransforms(
  "\uAA13\uaa00\uaa01\uaa02\uaa03\uaa05\uaa06\uaa07\uaa08\uaa09\uaa0a\uaa0b\uaa0c\uaa0d\uaa0e",
  "\u107a\u1075\u1076\u1077\ua9e0\u1078\ua9e1\uaa63\ua9e2\u107a\uaa66\uaa67\uaa68\uaa69\uaae3",
  0
);
langConverter.addOne2OneTransforms(
  "\uaa11\uaa12\uaa13\uaa15\uaa16\uaa17\uaa18\uaa1f\uaa20\uaa21\uaa22\uaa23\uaa24\uaa2c\uaa2e\uaa2f",
  "\u107b\uaa6a\u107c\u107d\u107f\ua9e4\u107e\u1081\uaa6e\u1022\u1080\u1083\u1083\u1084\u1082\u1086",
  0
);
langConverter.addOne2OneTransforms(
  "\uaa30\uaa31\uaa32\uaa33\uaa34\uaa35\uaa36\uaa37\uaa38",
  "\u1085\u1035\u1087\u1088\u1038\u1089\u108a\u108b\"",
  0
);
*/

langConverter.transformRules = [
  [/ ([\u1085-\u108C])/g, "$1"],
  [/([\u1031\u1084])([\u1000-\u1022\u1074-\u1080\uAA60-\uAA73])/g, "$2$1"],
];

// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'SHAN TTF': {index:0, outputEncoding:'Unicode', outputScript:'Myan'},
    'Zawgyi-Tai': {index:1, outputEncoding:'Unicode', outputScript:'Myan'},
};

const map_translit_output = [];
const translit_source = 'Shn';

const map_translit_sources = [
];

