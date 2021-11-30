// Convert from old font-encoding of Oneida text to Unicode forms:
const langConverter = new langConverterClass('one', 'Oneida');

// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script. AkolkhetyN to Georgian Unicode.
langConverter.map_encoding_names = encoding_data = {
    'Oneida': [0, 'Unicode', 'Latin'],
    };

const map_translit_output = [];
const translit_source = 'Oneida';

const map_translit_sources = [
];

// Mappings for Oneida font encodings
var map_encoding_names = [
  'Oneida'];

langConverter.one2oneMap = private_use_map_combined = {
  '@': ['\u00e1'],
  '#': ['\u00e9'],
  '$': ['\u00ed'],
  '%': ['\u00f3'],
  '^': ['\u028c\u0301'],
  '&': ['\u00fa'],
  '<': ['\u028c'],
  '>': ['\u0294'],
  '=': ['\u00b7'],
};
