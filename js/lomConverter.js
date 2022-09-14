// Convert from old font-encoding of Oneida text to Unicode forms:
const langConverter = new langConverterClass('lom', 'Loma');

langConverter.one2oneMap = private_use_map_combined = {
};
langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

langConverter.addOne2OneTransforms(
  "123456789",
    "123456789",
  0
);


// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'JGLoma': {index:0, outputEncoding:'Unicode', outputScript:'Loma'},
};

const map_translit_output = [];
const translit_source = 'lom';

const map_translit_sources = [
];

