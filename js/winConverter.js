// Convert from old font-encoding of Oneida text to Unicode forms:
const langConverter = new langConverterClass('win', 'Hoocąk');

// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script. AkolkhetyN to Georgian Unicode.
const encoding_data = {
    'Hoocąk': [0, 'Unicode', 'Latin'],
    };

langConverter.map_translit_output = [];
langConverter.translit_source = 'Hoocąk';

// Mappings for Oneida font encodings
langConverter.map_encoding_names = [
  'Hocak Old'];

langConverter.one2oneMap =  private_use_map_combined = {
  '\\': ['\u0328'],
  '`': ['\u030C'],
  '~': ['\u030C'],
  '\u00e0': ['\u01CE'],
  '\u00c0': ['\u01CD'],
  '\u00cc': ['\u01cf'],
  '\u00f2': ['\u01D0'],
  '\u00ec': ['\u01d0'],
  '\u00d2': ['\u01D1'],
  '\u00f2': ['\u01D2'],
  '\u00d9': ['\u01D3'],
  '\u00f9': ['\u01D4'],
  '\u011e': ['Ǧ'],
  '\u011f': ['ǧ'],
};