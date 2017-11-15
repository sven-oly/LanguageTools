// Convert from old font-encoding of Cherokee text to Unicode forms:

// Mappings for both Old Cherokee font
var map_encoding_names = [
  'OldCherokee'];

var private_use_map_combined = {
  '\u0000': ['\u0000', '\u0000', '\u0000'],  // null
  '\u0001': ['\u0020', '\u0000', '\u0000'],  // null
  '\u0002': ['\u0020', '\u0000', '\u0000'],  // null
  '\u0020': ['\u0020', '\u0000', '\u0000'],  // null
  '\uf020': ['\u0020', '\u0000', '\u0000'],  // null
  '\u0021': ['\u13b1', '\u0000', '\u0000'],  // null
  '\uf021': ['\u13b1', '\u0000', '\u0000'],  // null
  '\u0022': ['\u0022', '\u0000', '\u0000'],  // null
  '\uf022': ['\u0022', '\u0000', '\u0000'],  // null
  '\u0023': ['\u13ab', '\u0000', '\u0000'],  // null
  '\uf023': ['\u13ab', '\u0000', '\u0000'],  // null
  '\u0024': ['\u13b0', '\u0000', '\u0000'],  // null
  '\uf024': ['\u13b0', '\u0000', '\u0000'],  // null
  '\u0025': ['\u13b9', '\u0000', '\u0000'],  // null
  '\uf025': ['\u13b9', '\u0000', '\u0000'],  // null
  '\u0026': ['\u13e1', '\u0009'],  // horizontal tab
  '\uf026': ['\u13e1', '\u0009'],  // horizontal tab
  '\u0027': ['\u0027', '\u0000'],  // Carriage return
  '\uf027': ['\u0027', '\u0000'],  // Carriage return
  '\u0028': ['\u0028', '\u0000'],  // Carriage return
  '\uf028': ['\u0028', '\u0000'],  // Carriage return
  '\u0029': ['\u0029', '\u0000'],  // Carriage return
  '\uf029': ['\u0029', '\u0000'],  // Carriage return
  '\u002a': ['\u13ba', '\u0000'],  // Carriage return
  '\uf02a': ['\u13ba', '\u0000'],  // Carriage return
  '\u002b': ['\u13bd', '\u0000'],  // Carriage return
  '\uf02b': ['\u13bd', '\u0000'],  // Carriage return
  '\u002c': ['\u002c', '\u0000'],  // Carriage return
  '\uf02c': ['\u002c', '\u0000'],  // Carriage return
  '\u002d': ['\u13c0', '\u0010', '\u0010'],  // TODO!
  '\uf02d': ['\u13c0', '\u0010', '\u0010'],  // TODO!
  '\u002e': ['\u002e', '\u0010', '\u0010'],  // null
  '\uf02e': ['\u002e', '\u0010', '\u0010'],  // null
  '\u002f': ['\u13c2', '\u0010', '\u0010'],  // null
  '\uf02f': ['\u13c2', '\u0010', '\u0010'],  // null

  '\u0030': ['\u13c4', '\u0010', '\u0010'],  // null
  '\uf030': ['\u13c4', '\u0010', '\u0010'],  // null
  '\u0031': ['ᏣᎳᎩ', '\u0010', '\u0010'],  // Tsa La Gi
  '\uf031': ['ᏣᎳᎩ', '\u0010', '\u0010'],  // Tsa La Gi
  '\u0032': ['ᎣᏏᏲ', '\u0010', '\u0010'],  // Osiyo
  '\uf032': ['ᎣᏏᏲ', '\u0010', '\u0010'],  // Osiyo
  '\u0033': ['ᏩᏙ', '\u0010', '\u0010'],  // Wado
  '\uf033': ['ᏩᏙ', '\u0010', '\u0010'],  // Wado
  '\u0034': ['\u13d9', '\u0010', '\u0010'],  // null
  '\uf034': ['\u13d9', '\u0010', '\u0010'],  // null
  '\u0035': ['\u13e6', '\u0010', '\u0010'],  // null
  '\uf035': ['\u13e6', '\u0010', '\u0010'],  // null
  '\u0036': ['\u13dc', '\u0019'],  // horizontal tab
  '\uf036': ['\u13dc', '\u0019'],  // horizontal tab
  '\u0037': ['\u13cb', '\u0010'],  // Carriage return
  '\uf037': ['\u13cb', '\u0010'],  // Carriage return
  '\u0038': ['\u13d6', '\u0010'],  // Carriage return
  '\uf038': ['\u13d6', '\u0010'],  // Carriage return
  '\u0039': ['\u13d2', '\u0010'],  // Carriage return
  '\uf039': ['\u13d2', '\u0010'],  // Carriage return
  '\u003a': ['\u13e0', '\u0010'],  // Carriage return
  '\uf03a': ['\u13e0', '\u0010'],  // Carriage return
  '\u003b': ['\u13e8', '\u0010'],  // Carriage return
  '\uf03b': ['\u13e8', '\u0010'],  // Carriage return
  '\u003c': ['\u13e2', '\u0000'],  // Carriage return
  '\uf03c': ['\u13e2', '\u0000'],  // Carriage return
  '\u003d': ['\u13f3', '\u0000'],  // Carriage return
  '\uf03d': ['\u13f3', '\u0000'],  // Carriage return
  '\u003e': ['', '\u0000'],  // Carriage return
  '\uf03e': ['', '\u0000'],  // Carriage return
  '\u003f': ['', '\u0000'],  // Carriage return
  '\uf03f': ['', '\u0000'],  // Carriage return

  '\u0040': ['\u13c7', '\u003b', '\uD804\uDD33\uD804\uDD05'],  // #
  '\uf040': ['\u13c7', '\u003b', '\uD804\uDD33\uD804\uDD05'],  // #
  '\u0041': ['\u13cc', ' ', '\uD804\uDD14'],  // $
  '\uf041': ['\u13cc', ' ', '\uD804\uDD14'],  // $
  '\u0042': ['\u13f0', '\u0025', '\ud804\udd33\ud804\udd22\ud804\udd2a'],  // %
  '\uf042': ['\u13f0', '\u0025', '\ud804\udd33\ud804\udd22\ud804\udd2a'],  // %
  '\u0043': ['\u13df', '\u0026'],  // &
  '\uf043': ['\u13df', '\u0026'],  // &
  '\u0044': ['\u13d0', '\u0027', '\u0027'],  // '
  '\uf044': ['\u13d0', '\u0027', '\u0027'],  // '
  '\u0045': ['\u13e3', '\u0000','\uD804\uDD33\uD804\uDD05'],  // *
  '\uf045': ['\u13e3', '\u0000','\uD804\uDD33\uD804\uDD05'],  // *
  '\u0046': ['\u13c8', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\uf046': ['\u13c8', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\u0047': ['\u13e5', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\uf047': ['\u13e5', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\u0048': ['\u13b2', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\uf048': ['\u13b2', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\u0049': ['\u13f1', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\uf049': ['\u13f1', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\u004a': ['\u13ab', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\uf04a': ['\u13ab', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\u004b': ['\u13a7', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\uf04b': ['\u13a7', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\u004c': ['\u13ae', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *
  '\uf04c': ['\u13ae', '\u0000', '\uD804\uDD33\uD804\uDD05'],  // *

  '\u004d': ['\u13b7', '\uD804\uDD36', '\uD804\uDD36'],  // 0
  '\uf04d': ['\u13b7', '\uD804\uDD36', '\uD804\uDD36'],  // 0
  '\u004e': ['\u13bb', '\uD804\uDD37', '\uD804\uDD37'],  // 1
  '\uf04e': ['\u13bb', '\uD804\uDD37', '\uD804\uDD37'],  // 1
  '\u004f': ['\u13ec', '\uD804\uDD38', '\uD804\uDD38'],  // 2
  '\uf04f': ['\u13ec', '\uD804\uDD38', '\uD804\uDD38'],  // 2

  '\u0050': ['\u13ea', '\uD804\uDD39', '\uD804\uDD39'],  // 3
  '\uf050': ['\u13ea', '\uD804\uDD39', '\uD804\uDD39'],  // 3
  '\u0051': ['\u13c6', '\uD804\uDD3a', '\uD804\uDD3a'],  // 4
  '\uf051': ['\u13c6', '\uD804\uDD3a', '\uD804\uDD3a'],  // 4
  '\u0052': ['\u13cf', '\uD804\uDD3b', '\uD804\uDD3b'],  // 5
  '\uf052': ['\u13cf', '\uD804\uDD3b', '\uD804\uDD3b'],  // 5
  '\u0053': ['\u13ce', '\uD804\uDD3c', '\uD804\uDD3c'],  // 6
  '\uf053': ['\u13ce', '\uD804\uDD3c', '\uD804\uDD3c'],  // 6
  '\u0054': ['\u13d8', '\uD804\uDD3d', '\uD804\uDD3d'],  // 7
  '\uf054': ['\u13d8', '\uD804\uDD3d', '\uD804\uDD3d'],  // 7
  '\u0055': ['\u13ad', '\uD804\uDD3e', '\uD804\uDD3e'],  // 8
  '\uf055': ['\u13ad', '\uD804\uDD3e', '\uD804\uDD3e'],  // 8
  '\u0056': ['\u13d3', '\uD804\uDD3f', '\uD804\uDD3f'],  // 9
  '\uf056': ['\u13d3', '\uD804\uDD3f', '\uD804\uDD3f'],  // 9
  '\u0057': ['\u13eb', '\u003a', ':'],  // colon
  '\uf057': ['\u13eb', '\u003a', ':'],  // colon
  '\u0058': ['\u13ed', '\ud804\udd1f', '\ud804\udd34'],  // semicolon
  '\uf058': ['\u13ed', '\ud804\udd1f', '\ud804\udd34'],  // semicolon
  '\u0059': ['\u13f2', '\ud804\udd13', '<'],  // <
  '\uf059': ['\u13f2', '\ud804\udd13', '<'],  // <
  '\u005a': ['\u13c3', '\u003d', '='],  // =
  '\uf05a': ['\u13c3', '\u003d', '='],  // =
  '\u005b': ['\u13d5', '\ud804\udd12', '>'],  // >
  '\uf05b': ['\u13d5', '\ud804\udd12', '>'],  // >
  '\u005c': ['\u13b6', '\u003f', '?'],  // ?
  '\uf05c': ['\u13b6', '\u003f', '?'],  // ?

  '\u005d': ['\u13bb', '-', '\ud804\udd33\ud804\udd05'],  // @
  '\uf05d': ['\u13bb', '-', '\ud804\udd33\ud804\udd05'],  // @
  '\u005e': ['\u13dd', '\ud804\udd33\ud804\udd05', '\ud804\udd03'],  // A
  '\uf05e': ['\u13dd', '\ud804\udd33\ud804\udd05', '\ud804\udd03'],  // A
  '\u005f': ['\u13bc', '\uD804\uDD41', '\ud804\udd43'],  // B
  '\uf05f': ['\u13bc', '\uD804\uDD41', '\ud804\udd43'],  // B

  '\u0060': ['', '\uD804\uDD33\uD804\uDD05', '\ud804\udd33\ud804\udd26'],  // C
  '\uf060': ['', '\uD804\uDD33\uD804\uDD05', '\ud804\udd33\ud804\udd26'],  // C
  '\u0061': ['\u13a0', 'uD804\uDD2c', '\ud804\udd32'],  // D
  '\uf061': ['\u13a0', 'uD804\uDD2c', '\ud804\udd32'],  // D
  '\u0062': ['\u13a8', 'uD804\uDD2a', '\uD804\uDD33\uD804\uDD04'],  // E
  '\uf062': ['\u13a8', 'uD804\uDD2a', '\uD804\uDD33\uD804\uDD04'],  // E
  '\u0063': ['\u13d3', '\ud804\udd00', '\uD804\uDD33\uD804\uDD06'],  // F
  '\uf063': ['\u13d3', '\ud804\udd00', '\uD804\uDD33\uD804\uDD06'],  // F
  '\u0064': ['\u13d7', '\ud804\udd01\ud804\udd28', '\uD804\udd06'],  // G
  '\uf064': ['\u13d7', '\ud804\udd01\ud804\udd28', '\uD804\udd06'],  // G
  '\u0065': ['\u13a1', '\uD804\uDD33\ud804\udd26', '\ud804\udd30'],  // H
  '\uf065': ['\u13a1', '\uD804\uDD33\ud804\udd26', '\ud804\udd30'],  // H
  '\u0066': ['\u13a9', '\uD804\uDD27', '\ud804\udd2e'],  // I
  '\uf066': ['\u13a9', '\uD804\uDD27', '\ud804\udd2e'],  // I
  '\u0067': ['\u13a6', '\ud804\udd33\uD804\uDD20', '\ud804\udd2f'],  // J
  '\uf067': ['\u13a6', '\ud804\udd33\uD804\uDD20', '\ud804\udd2f'],  // J
  '\u0068': ['\u13af', '\ud804\udd33\ud804\udd1a', '\ud804\udd07'],  // K
  '\uf068': ['\u13af', '\ud804\udd33\ud804\udd1a', '\ud804\udd07'],  // K
  '\u0069': ['\u13a2', '\ud804\udd33\ud804\udd22\ud804\udd2a', '\ud804\udd08'],   '\uf069': ['\u13a2', '\ud804\udd33\ud804\udd22\ud804\udd2a', '\ud804\udd08'],  // L
  '\u006a': ['\u13da', '\uD804\uDD24', '\ud804\udd09'],  // M
  '\uf06a': ['\u13da', '\uD804\uDD24', '\ud804\udd09'],  // M
  '\u006b': ['\u13b8', '\uD804\uDD33\ud804\udd26\ud804\udd2a', '\ud804\udd0a'],   '\uf06b': ['\u13b8', '\uD804\uDD33\ud804\udd26\ud804\udd2a', '\ud804\udd0a'],  //N
  '\u006c': ['\u13b5', '\uD804\uDD28', '\ud804\udd0b'],  // O
  '\uf06c': ['\u13b5', '\uD804\uDD28', '\ud804\udd0b'],  // O
  '\u006d': ['\u13c5', '\uD804\uDD2d', '\ud804\udd0c'],  //P
  '\uf06d': ['\u13c5', '\uD804\uDD2d', '\ud804\udd0c'],  //P
  '\u006e': ['\u13be', '\uD804\uDD33\uD804\uDD03', '\ud804\udd0d'],  //Q
  '\uf06e': ['\u13be', '\uD804\uDD33\uD804\uDD03', '\ud804\udd0d'],  //Q
  '\u006f': ['\u13a3', '\ud804\udd33\ud804\udd04', '\ud804\udd0e'],  // R
  '\uf06f': ['\u13a3', '\ud804\udd33\ud804\udd04', '\ud804\udd0e'],  // R

  '\u0070': ['\u13c1', '\ud804\udd0f'],  // S
  '\uf070': ['\u13c1', '\ud804\udd0f'],  // S
  '\u0071': ['\u13aa', '\uD804\uDD26', '\ud804\udd10'],  //T
  '\uf071': ['\u13aa', '\uD804\uDD26', '\ud804\udd10'],  //T
  '\u0072': ['\u13db', '\uD804\uDD34', '\ud804\udd11'],  // U
  '\uf072': ['\u13db', '\uD804\uDD34', '\ud804\udd11'],  // U
  '\u0073': ['\u13cd', '\ud804\udd33\uD804\uDD20', '\ud804\udd12'],  // V
  '\uf073': ['\u13cd', '\ud804\udd33\uD804\uDD20', '\ud804\udd12'],  // V
  '\u0074': ['\u13d4', '\uD804\uDD31', '\ud804\udd13'],  //W
  '\uf074': ['\u13d4', '\uD804\uDD31', '\ud804\udd13'],  //W
  '\u0075': ['\u13a4', '\uD804\uDd2c', '\ud804\udd14'],  // X
  '\uf075': ['\u13a4', '\uD804\uDd2c', '\ud804\udd14'],  // X
  '\u0076': ['\u13a5', '\uD804\uDD33\uD804\uDD06', '\ud804\udd15'],  //Y
  '\uf076': ['\u13a5', '\uD804\uDD33\uD804\uDD06', '\ud804\udd15'],  //Y
  '\u0077': ['\u13b3', '\ud804\udd05', '\ud804\udd16'],  // Z
  '\uf077': ['\u13b3', '\ud804\udd05', '\ud804\udd16'],  // Z
  '\u0078': ['\u13f4', '[', '['],  // [
  '\uf078': ['\u13f4', '[', '['],  // [
  '\u0079': ['\u13ef',  '\u005c', ';'],  // backslash
  '\uf079': ['\u13ef',  '\u005c', ';'],  // backslash
  '\u007a': ['\u13ac', '\u005d', ']'],  // ]
  '\uf07a': ['\u13ac', '\u005d', ']'],  // ]
  '\u007b': ['\u13d1', '\uD804\uDD26', '\uD804\uDD33\uD804\uDD03'],  // ^
  '\uf07b': ['\u13d1', '\uD804\uDD26', '\uD804\uDD33\uD804\uDD03'],  // ^
  '\u007c': ['\u13ee', '\uD804\uDD34', '\ud804\udd17'],  // _
  '\uf07c': ['\u13ee', '\uD804\uDD34', '\ud804\udd17'],  // _

  '\u007d': ['\u13e4', '\`', '\ud804\udd18'],  // `
  '\uf07d': ['\u13e4', '\`', '\ud804\udd18'],  // `
  '\u007e': ['\u13ca', '\uD804\uDD07', '\ud804\udd19'],  // a
  '\uf07e': ['\u13ca', '\uD804\uDD07', '\ud804\udd19'],  // a
  '\u007f': [' ', '\uD804\uDD25', '\ud804\udd1a'],  // b
  '\uf07f': [' ', '\uD804\uDD25', '\ud804\udd1a'],  // b

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
