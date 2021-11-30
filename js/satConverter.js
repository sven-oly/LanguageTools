// Convert from old font-encoding of Oneida text to Unicode forms:
const langConverter = new langConverterClass('sat', 'Santali');

langConverter.addOne2OneTransforms(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ:",
  "ᱟᱵᱪᱫᱮᱝᱜᱷᱤᱡᱠᱞᱬᱱᱳᱯᱧᱨᱥᱴᱩᱶᱣᱽᱭᱲᱺ"
);

langConverter.addOne2OneTransforms(
  "abcdefghijklmnopqrstuvwxyz",
  "ᱟᱵᱪᱫᱮᱝᱜᱦᱤᱡᱠᱞᱢᱱᱚᱯᱧᱨᱥᱴᱩᱶᱣᱽᱭᱲ"
);

langConverter.addOne2OneTransforms(
  "1234567890",
  "᱑᱒᱓᱔᱕᱖᱗᱘᱙᱐"
);



// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'Ol_Chiki_Classic': {index:0, outputEncoding:'Unicode', outputScript:'Ol Chiki'},
};

const map_translit_output = ['Wiki Latin', 'Oxford Handbook Latin', 'Wiki IPA'];
const translit_source = 'Santali';

const map_translit_sources = [
    "https://wesanthals.tripod.com/id19.html",
];

function convertEncodingToUnicode() {
}
