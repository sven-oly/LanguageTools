// Convert from old font-encoding of Oneida text to Unicode forms:
const langConverter = new langConverterClass('mro', 'Mru');

langConverter.one2oneMap = private_use_map_combined = {
};
langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

langConverter.addOne2OneTransforms(
  "TQLNM",
  "𖩞𖩙𖩛𖩚𖩃", 0
);

langConverter.addOne2OneTransforms(
  "abcdefghijklmnopqrstuvwxyz",
  "𖩆𖩄𖩜𖩅𖩘𖩇𖩁𖩉𖩊𖩋𖩈𖩍𖩎𖩏𖩑𖩐𖩌𖩓𖩔𖩀𖩒𖩗𖩖𖩕𖩂𖩝", 0
);

langConverter.addOne2OneTransforms(
  "0123456789",
  "𖩠𖩡𖩢𖩣𖩤𖩥𖩦𖩧𖩨𖩩",
  0
);


// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'RiyenASCII': {index:0, outputEncoding:'Unicode', outputScript:'Mroo'},
};

const map_translit_output = [];
const translit_source = 'Mru';

const map_translit_sources = [
];

