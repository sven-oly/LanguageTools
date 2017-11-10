// Convert from old font-encoding of Cherokee text to Unicode forms:

// Mappings for both Old Cherokee font
var map_encoding_names = [
  'OldCherokee'];

var private_use_map_combined = {
  '\u0000': ['\u0000', '\u0000', '\u0000'],  // null
  '\u0001': ['\u0020', '\u0000', '\u0000'],  // null
  '\u0002': ['\u0020', '\u0000', '\u0000'],  // null
  '\u0003': ['\u0020', '\u0000', '\u0000'],  // null
  '\u0004': ['\u1eb1', '\u0000', '\u0000'],  // null
  '\u0005': ['\u0022', '\u0000', '\u0000'],  // null
  '\u0006': ['\u13c7', '\u0000', '\u0000'],  // null
  '\u0007': ['\u13b0', '\u0000', '\u0000'],  // null
  '\u0008': ['\u13b9', '\u0000', '\u0000'],  // null
  '\u0009': ['\u13e1', '\u0009'],  // horizontal tab
  '\u000a': ['\u0027', '\u0000'],  // Carriage return
  '\u000b': ['\u0028', '\u0000'],  // Carriage return
  '\u000c': ['\u0029', '\u0000'],  // Carriage return
  '\u000d': ['\u13ba', '\u0000'],  // Carriage return
  '\u000e': ['\u138d', '\u0000'],  // Carriage return
  '\u000f': ['\u002c', '\u0000'],  // Carriage return

  '\u0010': ['\u13c0', '\u0010', '\u0010'],  // TODO!
  '\u0011': ['\u002e', '\u0010', '\u0010'],  // null
  '\u0012': ['\u1ec7', '\u0010', '\u0010'],  // null
  '\u0013': ['\u13c4', '\u0010', '\u0010'],  // null
  '\u0014': ['ᏣᎳᎩ', '\u0010', '\u0010'],  // Tsa La Gi
  '\u0015': ['ᎣᏏᏲ', '\u0010', '\u0010'],  // Osiyo
  '\u0016': ['ᏩᏙ', '\u0010', '\u0010'],  // Wado
  '\u0017': ['\u13d9', '\u0010', '\u0010'],  // null
  '\u0018': ['\u13e6', '\u0010', '\u0010'],  // null
  '\u0019': ['\u13dc', '\u0019'],  // horizontal tab
  '\u001a': ['\u13cb', '\u0010'],  // Carriage return
  '\u001b': ['\u13d6', '\u0010'],  // Carriage return
  '\u001c': ['\u13d2', '\u0010'],  // Carriage return
  '\u001d': ['\u13e0', '\u0010'],  // Carriage return
  '\u001e': ['\u13e8', '\u0010'],  // Carriage return
  '\u001f': ['\u13e2', '\u0000'],  // Carriage return

  '\u0020': ['\u13e3', ' ', ' '],  // Space
  '\u0021': ['\u13b4', ' ', ' '],  // Space
  '\u0022': ['\u13c9 ', ' ', ' '],  // Space
  '\u0023': ['\u13ef', '\u003b', '\uD804\uDD33\uD804\uDD05'],  // #
  '\u0024': ['\u13cc', ' ', '\uD804\uDD14'],  // $
  '\u0025': ['\u13f0', '\u0025', '\ud804\udd33\ud804\udd22\ud804\udd2a'],  // %
  '\u0026': ['\u13df', '\u0026'],  // &

  '\u0027': ['\u13d0', '\u0027', '\u0027'],  // '
  '\u0028': ['\u13e3', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *
  '\u0029': ['\u13c8', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *
  '\u002a': ['\u13e5', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *
  '\u002b': ['\u13b2', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *
  '\u002c': ['\u13f1', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *
  '\u002d': ['\u13ab', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *
  '\u002e': ['\u13a7', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *
  '\u002f': ['\u137e', '\u0000',
	     '\uD804\uDD33\uD804\uDD05'],  // *

  '\u0030': ['\u13b7', '\uD804\uDD36', '\uD804\uDD36'],  // 0
  '\u0031': ['\u13bb', '\uD804\uDD37', '\uD804\uDD37'],  // 1
  '\u0032': ['\u13ec', '\uD804\uDD38', '\uD804\uDD38'],  // 2
  '\u0033': ['\u13ea', '\uD804\uDD39', '\uD804\uDD39'],  // 3
  '\u0034': ['\u13c6', '\uD804\uDD3a', '\uD804\uDD3a'],  // 4
  '\u0035': ['\u13cf', '\uD804\uDD3b', '\uD804\uDD3b'],  // 5
  '\u0036': ['\u13ce', '\uD804\uDD3c', '\uD804\uDD3c'],  // 6
  '\u0037': ['\u13d8', '\uD804\uDD3d', '\uD804\uDD3d'],  // 7
  '\u0038': ['\u13ad', '\uD804\uDD3e', '\uD804\uDD3e'],  // 8
  '\u0039': ['\u13d3', '\uD804\uDD3f', '\uD804\uDD3f'],  // 9
  '\u003a': ['\u13eb', '\u003a', ':'],  // colon
  '\u003b': ['\u13ed', '\ud804\udd1f', '\ud804\udd34'],  // semicolon
  '\u003c': ['\u13f2', '\ud804\udd13', '<'],  // <
  '\u003d': ['\u13c3', '\u003d', '='],  // =
  '\u003e': ['\u13d5', '\ud804\udd12', '>'],  // >
  '\u003f': ['\u13e9', '\u003f', '?'],  // ?

  '\u0040': ['\u13bb', '-', '\ud804\udd33\ud804\udd05'],  // @
  '\u0041': ['\u13dd', '\ud804\udd33\ud804\udd05', '\ud804\udd03'],  // A
  '\u0042': ['\u13bc', '\uD804\uDD41', '\ud804\udd43'],  // B
  '\u0043': [' ', '\uD804\uDD33\uD804\uDD05',
	     '\ud804\udd33\ud804\udd26'],  // C
  '\u0044': ['\u13a0', 'uD804\uDD2c', '\ud804\udd32'],  // D
  '\u0045': ['\u13a8', 'uD804\uDD2a', '\uD804\uDD33\uD804\uDD04'],  // E
  '\u0046': ['\u13d3', '\ud804\udd00', '\uD804\uDD33\uD804\uDD06'],  // F
  '\u0047': ['\u13d7', '\ud804\udd01\ud804\udd28', '\uD804\udd06'],  // G
  '\u0048': ['\u13a1', '\uD804\uDD33\ud804\udd26', '\ud804\udd30'],  // H
  '\u0049': ['\u13a9', '\uD804\uDD27', '\ud804\udd2e'],  // I
  '\u004a': ['\u13a6', '\ud804\udd33\uD804\uDD20', '\ud804\udd2f'],  // J
  '\u004b': ['\u13af', '\ud804\udd33\ud804\udd1a', '\ud804\udd07'],  // K
  '\u004c': ['\u13a2', '\ud804\udd33\ud804\udd22\ud804\udd2a', '\ud804\udd08'],  // L
  '\u004d': ['\u13da', '\uD804\uDD24', '\ud804\udd09'],  // M
  '\u004e': ['\u13b8', '\uD804\uDD33\ud804\udd26\ud804\udd2a', '\ud804\udd0a'],  //N
  '\u004f': ['\u13b5\uDD27\uD804\uDD32', '\uD804\uDD28', '\ud804\udd0b'],  // O

  '\u0050': ['\u13c5', '\uD804\uDD2d', '\ud804\udd0c'],  //P
  '\u0051': ['\u13be', '\uD804\uDD33\uD804\uDD03', '\ud804\udd0d'],  //Q
  '\u0052': ['\u13a3', '\ud804\udd33\ud804\udd04', '\ud804\udd0e'],  // R
  '\u0053': ['\u13c1', '\ud804\udd0f'],  // S
  '\u0054': ['\u13aa', '\uD804\uDD26', '\ud804\udd10'],  //T
  '\u0055': ['\u13db', '\uD804\uDD34', '\ud804\udd11'],  // U
  '\u0056': ['\u13cd', '\ud804\udd33\uD804\uDD20', '\ud804\udd12'],  // V
  '\u0057': ['\u13d4', '\uD804\uDD31', '\ud804\udd13'],  //W
  '\u0058': ['\u13a4', '\uD804\uDd2c', '\ud804\udd14'],  // X
  '\u0059': ['\u13a5', '\uD804\uDD33\uD804\uDD06', '\ud804\udd15'],  //Y
  '\u005a': ['\u13b3', '\ud804\udd05', '\ud804\udd16'],  // Z
  '\u005b': ['\u13f4', '[', '['],  // [
  '\u005c': ['\u13c7',  '\u005c', ';'],  // backslash
  '\u005d': ['\u13ac', '\u005d', ']'],  // ]
  '\u005e': ['\u13d1', '\uD804\uDD26',
	     '\uD804\uDD33\uD804\uDD03'],  // ^
  '\u005f': ['\u13ee', '\uD804\uDD34', '\ud804\udd17'],  // _

  '\u0060': ['\u13e4', '\`', '\ud804\udd18'],  // `
  '\u0061': ['\u13ca', '\uD804\uDD07', '\ud804\udd19'],  // a
  '\u0062': [' ', '\uD804\uDD25', '\ud804\udd1a'],  // b
  '\u0063': [' ', '\uD804\uDD0d', '\ud804\udd1b'],  // c
  '\u0064': [' ', '\uD804\uDD1e', '\ud804\udd1c'],  // d

};

function toLower(instring) {
  // If code in range 13a0-1eef, add ab70-13a0
  // If code in range 1ef0-1ef5, add 8
  return instring.toLowerCase();  // Check if this actually works for CHR.
}

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

  // Insert more complex replacements here.
  var newText = outtext;

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
