const langConverter = new langConverterClass('nv', 'Navajo');

// Mappings for Navajo font encodings
langConverter.encodingNames = map_encoding_names = [
  'Times New Roman Navajo', 'Century Gothic Navajo', 'Verdana Navajo'];

langConverter.encoding_data = {
    'TimesNewRomanNavajo': {index:0, outputEncoding:'Unicode', outputScript:'Latn'},
    'VerdanaNavajo': {index:1, outputEncoding:'Unicode', outputScript:'Latn'},
    'CenturyGothicNavajo': {index:2, outputEncoding:'Unicode', outputScript:'Latn'},
};

langConverter.one2oneMap =  private_use_map_combined = {
  '\u0020': ['\u0020', '\u0020', '\u0020'],
  '\u0021': ['\u00c1', '\u00c1', '\u00c1'],
  '\u0022': ['\"', '\"', '\"'],
  '\u0023': ['\u0104\u0328', '\u0104\u0328', '\u0104\u0328'],
  '\u0024': ['\u00c9', '\u00c9', '\u00c9'],
  '\u0025': ['\u0118', '\u0118', '\u0118'],
  '\u0026': ['\u00cd', '\u00cd', '\u00cd'],
  '\u0027': ['\\', '\\', '\\'],
  '\u0028': ['\u00cd\u0328', '\u00cd\u0328', '\u00cd\u0328'],
  '\u0029': ['\u00d3', '\u00d3', '\u00d3'],
  '\u002a': ['I\u0328', 'I\u0328', 'I\u0328'],
  '\u002b': ['\u00d3\u0328', '\u00d3\u0328', '\u00d3\u0328'],
  '\u002c': [',', ',', ','],
  '\u002d': ['o\u0328', 'o\u0328', 'o\u0328'],
  '\u002e': ['.', '.', '.'],
  '\u002f': ['/', '/', '/'],

  '\u0030': ['\u00f3', '\u00f3', '\u00f3'],
  '\u0031': ['\u00e1', '\u00e1', '\u00e1'],
  '\u0032': ['\u0105', '\u0105', '\u0105'],
  '\u0033': ['\u00e1\u0328', '\u00e1\u0328', '\u00e1\u0328'],
  '\u0034': ['\u00e9', '\u00e9', '\u00e9'],
  '\u0035': ['e\u0328', 'e\u0328', 'e\u0328'],
  '\u0036': ['\u00e9\u0328', '\u00e9\u0328', '\u00e9\u0328'],
  '\u0037': ['\u00ed', '\u00ed', '\u00ed'],
  '\u0038': ['i\u0328', 'i\u0328', 'i\u0328'],
  '\u0039': ['\u00ed\u0328', '\u00ed\u0328', '\u00ed\u0328'],
  '\u003d': ['\u00f3\u0328', '\u00f3\u0328', '\u00f3\u0328'],
  '\u0040': ['\u0104', '\u0104', '\u0104'],

  '\u005b': ['\u0142', '\u0142', '\u0142'],
  '\u005c': ['\\', '\\', '\\'],
  '\u005d': ['\u0144', '\u0144', '\u0144'],
  '\u005e': ['\u00c9\u0328', '\u00c9\u0328', '\u00c9\u0328'],
  '\u005f': ['O\u0328', 'O\u0328', 'O\u0328'],

  '\u007b': ['\u0141', '\u0141', '\u0141'],
  '\u007c': ['|', '|', '|'],
  '\u007d': ['\u0143', '\u0143', '\u0143'],
  '\u007e': ['~', '~', '~'],
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

