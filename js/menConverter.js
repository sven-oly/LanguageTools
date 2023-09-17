e// Convert from old font-encoding of Oneida text to Unicode forms:
const langConverter = new langConverterClass('men', 'Mru');

langConverter.one2oneMap = private_use_map_combined = {
};
langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

langConverter.addOne2OneTransforms(
  "123456789",
    "𞣇𞣈𞣉𞣊𞣋𞣌𞣍𞣎𞣏",  // The digits transform
  0
);
// Many more to do!
langConverter.addOne2OneTransforms(
  "\ue109\ue10b\ue10d",
    "\ud83a\udc00\ud83a\udc01\ud83a\udc02",  // The first few
  0
);

// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'JGMende': {index:0, outputEncoding:'Unicode', outputScript:'Mende'},
};

const map_translit_output = [];
const translit_source = 'Mru';

const map_translit_sources = [
];

