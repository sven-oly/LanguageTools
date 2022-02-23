// Convert from old font-encoding of text to Unicode forms:
const langConverter = new langConverterClass('shn', 'Shan');

langConverter.one2oneMap = private_use_map_combined = {
  '\u0020': [' ', ' '],
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

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

langConverter.transformRules = [
  [/ ([\u1085-\u108C])/g, "$1"],
  [/([\u1031\u1084])([\u1000-\u1022\u1074-\u1080\uAA60-\uAA73])/g, "$2$1"],
];

// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'Zawgyi-Tai': {index:0, outputEncoding:'Unicode', outputScript:'Myan'},
};

const map_translit_output = [];
const translit_source = 'Shn';

const map_translit_sources = [
];

