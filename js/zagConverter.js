// Converters from Non-Unicode Burmese encodings to Unicode.

// From ZaghawBeria
// TODO: fill these in with actual code points when the output range is
// defined.
private_use_map_combined = {
  '\u0020': ['\u0020'],
  '\u0021': ['\u0021'],
  '\u0022': ['\u0022'],
  '\u0023': ['\u0023'],
  '\u0024': ['\u0024'],  // ?
  '\u0025': ['\u0025'],
  '\u0026': ['\u0026'],
  '\u0027': ['\u0027'],
  '\u0028': ['\u0028'],
  '\u0029': ['\u0029'],
  '\u002a': ['\u002a'],
  '\u002b': ['\u002b'],
  '\u002c': ['\u002c'],
  '\u002d': ['\u002d'],
  '\u002e': ['\u002e'],
  '\u002f': ['\u002f'],

  '\u0030': ['\u0030'],
  '\u0031': ['\u0031'],
  '\u0032': ['\u0032'],
  '\u0033': ['\u0033'],
  '\u0034': ['\u0034'],
  '\u0035': ['\u0035'],
  '\u0036': ['\u0036'],
  '\u0037': ['\u0037'],
  '\u0038': ['\u0038'],
  '\u0039': ['\u0039'],
  '\u003a': ['\u003a'],
  '\u003b': ['\u003b'],
  '\u003c': ['\u003c'],
  '\u003d': ['\u003d'],
  '\u003e': ['\u003e'],
  '\u003f': ['\u003f'],

  '\u0040': ['\udb80\udc40'],
  '\u0041': ['\udb80\udc41'],
  '\u0042': ['\udb80\udc42'],
  '\u0043': ['\udb80\udc43'],
  '\u0044': ['\udb80\udc44'],
  '\u0045': ['\udb80\udc45'],
  '\u0046': ['\udb80\udc46'],
  '\u0047': ['\udb80\udc47'],  //?
  '\u0048': ['\udb80\udc48'],
  '\u0049': ['\udb80\udc49'],
  '\u004a': ['\udb80\udc4a'],
  '\u004b': ['\udb80\udc4b'],
  '\u004c': ['\udb80\udc4c'],
  '\u004d': ['\udb80\udc4d'],
  '\u004e': ['\udb80\udc4e'],
  '\u004f': ['\udb80\udc4f'],  // ?

  '\u0050': ['\udb80\udc50'],
  '\u0051': ['\udb80\udc51'],
  '\u0052': ['\udb80\udc52'],
  '\u0053': ['\udb80\udc53'],
  '\u0054': ['\udb80\udc54'],
  '\u0055': ['\udb80\udc55'],
  '\u0056': ['\udb80\udc56'],  // ?
  '\u0057': ['\udb80\udc57'],
  '\u0058': ['\udb80\udc58'],
  '\u0059': ['\udb80\udc59'],
  '\u005a': ['\udb80\udc5a'],
  '\u005b': ['\u005b'],
  '\u005c': ['\u005c'],
  '\u005d': ['\u005d'],
  '\u005e': ['\u005e'],
  '\u005f': ['\u005f'],

  '\u0060': ['\u0060'],
  '\u0061': ['\udb80\udc61'],
  '\u0062': ['\udb80\udc62'],
  '\u0063': ['\udb80\udc63'],
  '\u0064': ['\udb80\udc64'],
  '\u0065': ['\udb80\udc65'],
  '\u0066': ['\udb80\udc66'],
  '\u0067': ['\udb80\udc67'],
  '\u0068': ['\udb80\udc68'],
  '\u0069': ['\udb80\udc69'],
  '\u006a': ['\udb80\udc6a'],
  '\u006b': ['\udb80\udc6b'],
  '\u006c': ['\udb80\udc6c'],
  '\u006d': ['\udb80\udc6d'],

  '\u0070': ['\udb80\udc70'],
  '\u0071': ['\udb80\udc71'],
  '\u0072': ['\udb80\udc72'],
  '\u0073': ['\udb80\udc73'],
  '\u0074': ['\udb80\udc74'],
  '\u0075': ['\udb80\udc75'],
  '\u0076': [''],
  '\u0077': ['\udb80\udc77'],
  '\u0078': ['\udb80\udc78'],
  '\u0079': ['\udb80\udc79'],
  '\u007a': ['\udb80\udc7a'],
  '\u007b': ['\u007b'],
  '\u007c': ['\u007c'],
  '\u007d': ['\u007d'],
  '\u007e': ['\u007e'],
  '\u007f': ['\u007f'],

  // More to do but more unusual combinations
  '\u00a0': ['\u00a0'],
  '\u00a1': ['\u00a1'],
  '\u00a2': ['\u00a2'],
  '\u00a3': ['\u00a3'],
  '\u00a4': ['\u00a4'],
  '\u00a5': ['\u00a5'],
  '\u00a6': ['\u00a6'],
  '\u00a7': ['\u00a7'],
  '\u00a8': ['\u00a8'],
  '\u00a9': ['\u00a9'],
  '\u00aa': ['\u00aa'],
  '\u00ae': ['\u00ae'],

  '\u00b1': ['\u00b1'],
  '\u00b2': ['\u00b2'],
  '\u00b3': ['\u00b3'],
  '\u00b4': ['\u00b4', '?'],
  '\u00b5': ['\u00b5'],
  '\u00b6': ['\u00b6'],
  '\u00b7': ['\u00b7'],
  '\u00b8': ['\u00b8'],
  '\u00b9': ['\u00b9'],
  '\u00ba': ['\u00ba'],
  '\u00bb': ['\u00bb'],
  '\u00bc': ['\u00bc'],
  '\u00bd': ['\u00bd'],
  '\u00be': ['\u00be'],
  '\u00bf': ['\u00bf'],

  '\u00c0': ['\u00c0'],

  '\u00e6': ['\u00e6'],
  '\u00e7': ['\u00e7'],
  '\u00e8': ['\u00e8'],
  '\u00e9': ['\u00e9'],
  '\u00ea': ['\u00ea'],
  '\u00eb': ['\u00eb'],
  '\u00ec': ['\u00ec'],
  '\u00ed': ['\u00ed'],
  '\u00ee': ['\u00ee'],
  '\u00ef': ['\u00ef'],
  '\u00f0': ['\u00f0'],
  '\u00f1': ['\u00f1'],
  '\u00f2': ['\u00f2'],
  '\u00f3': ['\u00f3'],
  '\u00f4': ['\u00f4'],
  '\u00f5': ['\u00f5'],
  '\u00f6': ['\u00f6'],
  '\u00f7': ['\u00f7'],
  '\u00f8': ['\u00f8'],  }

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


// Converts Beria text to all lower case in the PUA
function lowerCasePUA(intext) {

}
