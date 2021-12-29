// Converters from Non-Unicode Burmese encodings to Unicode.
const langConverter = new langConverterClass('my', 'Myanmar');

langConverter.encoding_data = {
    'WWBurn': {index:0, outputEncoding:'Unicode', outputScript:'Myanmar'},
    'WwinBurmese': {index:1, outputEncoding:'Unicode', outputScript:'Myanmar'},

};

// ww_burn.ttf
// TODO: Should add WwinBurmese conversion as second
private_use_map_combined = {
  '\u0020': ['\u0020'],
  '\u0021': ['\u100a'],
  '\u0022': ['\u1013'],
  '\u0023': ['\u103b\u103e'],
  '\u0024': ['\u103d\u103e'],  // ?
  '\u0025': ['\u100f'],
  '\u0026': ['\u101b'],
  '\u0027': ['\u1012'],
  '\u0028': ['('],
  '\u0029': [')'],
  '\u002a': ['\u1002'],
  '\u002b': ['\u103c'],
  '\u002c': ['\u101a'],
  '\u002d': ['\u2014'],  // long dash?
  '\u002e': ['\u104f'],
  '\u002f': ['\u104a'],

  '\u0030': ['\u1040'],
  '\u0031': ['\u1041'],
  '\u0032': ['\u1042'],
  '\u0033': ['\u1043'],
  '\u0034': ['\u1044'],
  '\u0035': ['\u1045'],
  '\u0036': ['\u1046'],
  '\u0037': ['\u1047'],
  '\u0038': ['\u1048'],
  '\u0039': ['\u1049'],
  '\u003a': ['\u102b\u103a'],
  '\u003b': ['\u1038'],
  '\u003c': ['\u1039\u1013'],
  '\u003d': ['\u103c'],
  '\u003e': ['\u1039\u1006'],
  '\u003f': ['\u104b'],

  '\u0040': ['\u1037'],
  '\u0041': ['\u1017'],
  '\u0042': ['\u1039\u1018'],
  '\u0043': ['\u1003'],
  '\u0044': ['\u102e'],
  '\u0045': ['\u1014'],
  '\u0046': ['\u1004\u103a\u1039'],
  '\u0047': ['\u103d'],  //?
  '\u0048': ['\u1036'],
  '\u0049': ['\u104d'],
  '\u004a': ['\u1032'],
  '\u004b': ['\u102f'],
  '\u004c': ['\u1030'],
  '\u004d': ['\u1039\u1014'],
  '\u004e': ['\u1039\u1012'],
  '\u004f': ['\u1025'],  // ?

  '\u0050': ['\u1039\u1005'],
  '\u0051': ['\u1039\u1001'],
  '\u0052': ['\u1039\u1019'],
  '\u0053': ['\u103e'],
  '\u0054': ['\u1024'],
  '\u0055': ['\u1039\u1000'],
  '\u0056': ['\u1020'],  // ?
  '\u0057': ['\u1039\u1010'],
  '\u0058': ['\u100c'],
  '\u0059': ['\u104c'],
  '\u005a': ['\u1007'],
  '\u005b': ['\u101f'],
  '\u005c': ['\u103f'],
  '\u005d': ['='],
  '\u005e': ['\u1009'],
  '\u005f': ['\u103e\u102f'],

  '\u0060': ['\u1039\u1015'],
  '\u0061': ['\u1031'],
  '\u0062': ['\u1018'],
  '\u0063': ['\u1001'],
  '\u0064': ['\u102d'],
  '\u0065': ['\u1014'],
  '\u0066': ['\u103a'],
  '\u0067': ['\u102b'],
  '\u0068': ['\u1037'],
  '\u0069': ['\u1004'],
  '\u006a': ['\u103c'],
  '\u006b': ['\u102f'],
  '\u006c': ['\u1030'],
  '\u006d': ['\u102c'],
  '\u006e': ['\u100a'],
  '\u006f': ['\u101e'],

  '\u0070': ['\u1005'],
  '\u0071': ['\u1006'],
  '\u0072': ['\u1019'],
  '\u0073': ['\u103b'],
  '\u0074': ['\u1021'],
  '\u0075': ['\u1000'],
  '\u0076': ['\u101c'],
  '\u0077': ['\u1010'],
  '\u0078': ['\u1011'],
  '\u0079': ['\u1015'],
  '\u007a': ['\u1016'],
  '\u007b': ['\u1027'],
  '\u007c': ['\u103b\u103d'],
  '\u007d': ['\u103c'],
  '\u007e': ['\u1039\u1002'],
  '\u007f': ['\u0020'],

  // More to do but more unusual combinations
  '\u00a0': [' '],
  '\u00a1': ['['],
  '\u00a2': [']'],
  '\u00a3': ['\u00a3'],
  '\u00a4': ['$'],
  '\u00a5': ['\u00a5'],
  '\u00a6': ['Ks'],
  '\u00a7': ['/'],
  '\u00a8': ['\u0e3f'],
  '\u00a9': ['\u00a9'],
  '\u00aa': ['\u103e\u1030'],
  '\u00ae': ['\u00ae'],

  '\u00b1': ['\u101b'],
  '\u00b2': ['\u1037'],
  '\u00b3': ['\u1037'],
  '\u00b4': ['?', '?'],
  '\u00b5': ['%'],
  '\u00b6': ['\u101b'],
  '\u00b7': ['*'],
  '\u00b8': ['\u103d\u103e'],
  '\u00b9': ['\u103c'],
  '\u00ba': ['\u103c'],
  '\u00bb': ['\u00d7'],
  '\u00bc': ['\u1041/\u1043'],
  '\u00bd': ['\u1041/\u1042'],
  '\u00be': ['\u100f\u1039\u100d'],
  '\u00bf': ['\u100f\u1039\u100c'],

  '\u00c0': ['\u100f\u1039\u100f'],

  '\u00e6': ['\u2026'],
  '\u00e7': ['\u2234'],
  '\u00e8': ['\u2235'],
  '\u00e9': ['\u103b\u103d\u103e'],
  '\u00ea': ['\u103e'],
  '\u00eb': ['\u103d'],
  '\u00ec': ['\u103d\u103e'],
  '\u00ed': ['\u103b\u103d'],
  '\u00ee': ['\u103b\u103d\u103e'],
  '\u00ef': ['\u103d\u103e'],
  '\u00f0': ['\u103c\u102f'],
  '\u00f1': ['\u103c\u102f'],
  '\u00f2': ['\u103c\u102f'],
  '\u00f3': ['\u103c\u102f'],
  '\u00f4': ['\u1004\u103a\u1039\u102e'],
  '\u00f5': ['\u1004\u103a\u1039\u102d'],
  '\u00f6': ['\u102d\u1036'],
  '\u00f7': ['\u00f7'],
  '\u00f8': ['\u1004\u103a\u1039\u1036'],  }

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  var intext = inarea.value;
  var outtext = "";
  var out;
  for (var index = 0; index < intext.length; index ++) {
    var c = intext[index];
    out = c;
    if (c in private_use_map_combined) {
      var result = private_use_map_combined[c][encodingIndex];
      if (result) {
	out = result;
      }
    }
    outtext += out;
  }
  var newText = outtext;

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
