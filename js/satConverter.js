// Convert from old font-encoding of Oneida text to Unicode forms:
const langConverter = new langConverterClass('sat', 'Santali');

langConverter.addOne2OneTransforms(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ:",
  "ᱟᱵᱪᱫᱮᱝᱜᱷᱤᱡᱠᱞᱬᱸᱳᱯᱧᱨᱥᱴᱩᱶᱣᱽᱭᱲᱺ", 0
);

langConverter.addOne2OneTransforms(
  "abcdefghijklmnopqrstuvwxyz",
  "ᱟᱵᱪᱫᱮᱝᱜᱦᱤᱡᱠᱞᱢᱱᱚᱯᱧᱨᱥᱴᱩᱶᱣᱽᱭᱲ", 0
);

langConverter.addOne2OneTransforms(
  "1234567890\\|",
  "᱑᱒᱓᱔᱕᱖᱗᱘᱙᱐᱿᱾",
  0
);
// TODO: Ad Usara conversions
//langConverter.addOne2OneTransforms(
//  "1234567890vxz",
//  "᱑᱒᱓᱔᱕᱖᱗᱘᱙᱐ᱶᱣᱲ",
//  1
//);

// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'Ol_Chiki_Classic': {index:0, outputEncoding:'Unicode', outputScript:'Ol Chiki'},
    'Ol_Chiki_Old': {index:0, outputEncoding:'Unicode', outputScript:'Ol Chiki'},
    'Ol_Chiki_Optimum': {index:0, outputEncoding:'Unicode', outputScript:'Ol Chiki'},
    'Ol_Chiki_Regular': {index:0, outputEncoding:'Unicode', outputScript:'Ol Chiki'},
    'Ol_Chiki_Royal': {index:0, outputEncoding:'Unicode', outputScript:'Ol Chiki'},
    //'olchiki_usara': {index:1, outputEncoding:'Unicode', outputScript:'Ol Chiki'},
};

const map_translit_output = ['Wiki Latin', 'Oxford Handbook Latin', 'Wiki IPA'];
const translit_source = 'Santali';

const map_translit_sources = [
    "https://wesanthals.tripod.com/id19.html",
];

