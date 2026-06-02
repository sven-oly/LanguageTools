// Convert from old font-encoding of text to Unicode forms:
const langConverter = new langConverterClass('shn', 'Shan');

// Note that the second column is not correct for Zawgyi-Tai.
langConverter.one2oneMap = private_use_map_combined = {
  '\u0020': [' ', ' '],
    '\u0030': ['\u1040', '\u0030'],
    '\u0031': ['\u1041', '\u0031'],
    '\u0032': ['\u1042', '\u0032'],
    '\u0033': ['\u1043', '\u0033'],
    '\u0034': ['\u1044', '\u0034'],
    '\u0035': ['\u1045', '\u0035'],
    '\u0036': ['\u1046', '\u0036'],
    '\u0037': ['\u1047', '\u0037'],
    '\u0038': ['\u1048', '\u0038'],
    '\u0039': ['\u1049', '\u0039'],
    '\u003a': ['\u1038', '\u003a'],

    '\u0041': ['\u1022', '\u0041'],
    '\u0042': ['\u1062', '\u0042'],
    '\u0043': ['\u108a', '\u0043'],
    '\u0044': ['\u103c', '\u0044'],
    '\u0045': ['\u1082\u1072', '\u0045'],
    '\u0046': ['\u107e', '\u0046'],
    '\u0047': ['\u1087', '\u0047'],
    '\u0048': ['\u1088', '\u0048'],
    '\u0049': ['\u102e', '\u0049'],
    '\u004a': ['\u102d\u102f', '\u004a'],
    '\u004b': ['\u1075', '\u004b'],
    '\u004c': ['\u1038', '\u004c'],
    '\u004d': ['\u1036', '\u004d'],
    '\u004e': ['\u107a', '\u004e'],
    '\u004f': ['\u1089', '\u004f'],

    '\u0050': ['\u1080', '\u0050'],
    '\u0051': ['\u1083', '\u0051'],
    '\u0052': ['\u103c', '\u0052'],
    '\u0053': ['\u103b', '\u0053'],
    '\u0054': ['\u1082', '\u0054'],
    '\u0055': ['\u1030', '\u0055'],
    '\u0056': ['\u1035', '\u0056'],
    '\u0057': ['\u1084', '\u0057'],
    '\u0058': ['\u103a\u1083', '\u0058'],
    '\u0059': ['\u1085', '\u0059'],
    '\u005a': ['\u103A\u1036', '\u005a'],

    '\u0061': ['\u1083', '\u0061'],
    '\u0062': ['\u1017', '\u0062'],
    '\u0063': ['\u1078', '\u0063'],
    '\u0064': ['\u1012', '\u0064'],
    '\u0065': ['\u1031', '\u0065'],
    '\u0066': ['\u107d', '\u0066'],
    '\u0067': ['\u1004', '\u0067'],
    '\u0068': ['\u1081', '\u0068'],
    '\u0069': ['\u102d', '\u0069'],
    '\u006a': ['\u1086', '\u006a'],
    '\u006b': ['\u1075', '\u006b'],
    '\u006c': ['\u101c', '\u006c'],
    '\u006d': ['\u1019', '\u006d'],
    '\u006e': ['\u107c', '\u006e'],
    '\u006f': ['\u103d', '\u006f'],

    '\u0070': ['\u1015', '\u0070'],
    '\u0071': ['\u103a', '\u0071'],
    '\u0072': ['\u101b', '\u0072'],
    '\u0073': ['\u101e', '\u0073'],
    '\u0074': ['\u1010', '\u0074'],
    '\u0075': ['\u102f', '\u0075'],
    '\u0076': ['\u1011', '\u0076'],
    '\u0077': ['\u101d', '\u0077'],
    '\u0078': ['\u1076', '\u0078'],
    '\u0079': ['\u101a', '\u0079'],
    '\u007a': ['\u102d\u1030', '\u007a'],

    // Zawgyi-Tai --> Unicode
    // https://github.com/SaingHmineTun/TMKFontConverter/blob/master/app/src/main/java/it/saimao/tmkfontconverter/fontconverter/ShanZawgyiConverter.java
    "\u103c": ["\u103c", "\u103d"],
    "\u103a": ["\u103a", "\u103b"],
    "\u1039": ["\u1039", "\u103a"],
    "\u1094": ["\u1094", "\u1037"],
    "\u1095": ["\u1095", "\u1037"],
    "\uaa00": ['\uaa00', '\u1075'],
    '\uaa01': ['\uaa01', '\u1076'],
    '\uaa05': ['\uaa05', '\u1078'],

    "\uaa09": ['\uaa09', "\u107a"],
    "\uaa13": ['\uaa13', "\u107c"],
    "\uaa15": ['\uaa15', "\u107d"],
    "\uaa18": ['\uaa18', "\u107e"],
    "\uaa1f": ['\uaa1f', "\u1081"],
    "\uaa21": ['\uaa21', "\u1022"],
    "\uaa32": ['\uaa32', "\u1087"],
    "\uaa33": ['\uaa33', "\u1088"],
    "\uaa35": ['\uaa35', "\u1089"],
    "\uaa36": ['\uaa36', "\u108a"],
    "\uaa2c": ['\uaa2c', "\u1084"],
    "\uaa31": ['\uaa31', "\u1035"],
    "\uaa30": ['\uaa30', "\u1085"],
    "\uaa24": ['\uaa24', "\u1062"],
    "\uaa23": ['\uaa23', "\u1083"],
    "\uaa2e": ['\uaa2e', "\u1082"],
    "\uaa2f": ['\uaa2f', "\u1086"],
    "\uaa3c": ['\uaa3c', "\u1091"],
    "\uaa3d": ['\uaa3d', "\u1092"],
    "\uaa3e": ['\uaa3e', "\u1093"],
    "\uaa3f": ['\uaa3f', "\u1094"],
    "\uaa40": ['\uaa40', "\u1095"],
    "\uaa41": ['\uaa41', "\u1096"],
    "\uaa42": ['\uaa42', "\u1097"],
    "\uaa43": ['\uaa43', "\u1098"],
    "\uaa44": ['\uaa44', "\u1099"],
    "\uaa3b": ['\uaa3b', "\u1090"],
    "\uaa07": ['\uaa07', "\uaa61"],
    "\uaa11": ['\uaa11', "\u107b"],
    "\uaa0e": ['\uaa0e', "\ua9e3"],
    "\uaa02": ['\uaa02', "\u1077"],
    "\uaa12": ['\uaa12', "\uaa6a"],
    "\uaa03": ['\uaa03', "\ua9e0"],
    "\uaa20": ['\uaa20', "\uaa6e"],

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

