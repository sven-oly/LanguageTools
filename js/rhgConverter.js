// Convert from old font-encoding ROhingya Kuna Leyka Noories to Unicode forms:

// Mappings for both arjyban, sujoyan, alaam, etc. encodings.
var map_encoding_names = [
  'Kuna Leyka', 'Gonya Leyka'];

var private_use_map_combined = {
  '\u0621': ['\ud803\udd1e', '\u0000'],  // null
  '\u0622': ['\ud803\udd00', '\u0009'],  // horizontal tab
  '\u0623': ['\ud803\udd00', '\u0009'],  // horizontal tab
  '\u0624': ['\ud803\udd1e', '\u0000'],  // Carriage return
  '\u0625': ['\ud803\udd00', ' ', ' '],  // Space
  '\u0626': ['\ud803\udd22', '\u003b', '\uD803\uDD33\uD803\uDD05'],  // #
  '\u0627': ['\ud803\udd00', ' ', '\uD803\uDD14'],  // $
  '\u0628': ['\ud803\udd01', '\u0025', '\ud803\udd33\ud803\udd22\ud803\udd2a'],  // %
  '\u0629': ['\ud803\udd17', '\u0026'],  // &
  '\u062a': ['\ud803\udd03', '\u0027', '\u0027'],  // '
  '\u062b': ['\ud803\udd02', '\u0000', '\uD803\uDD33\uD803\uDD05'],  // *
  '\u062c': ['\ud803\udd05', '\uD803\uDD36', '\uD803\uDD36'],  // 0
  '\u062d': ['\ud803\udd06', '\uD803\uDD37', '\uD803\uDD37'],  // 1
  '\u062e': ['\ud803\udd08', '\uD803\uDD38', '\uD803\uDD38'],  // 2
  '\u062f': ['\ud803\udd0a', '\uD803\uDD39', '\uD803\uDD39'],  // 3
  '\u0630': ['\uD803\uDD21', '\uD803\uDD3a', '\uD803\uDD3a'],  // 4
  '\u0631': ['\uD803\uDD0c', '\uD803\uDD3b', '\uD803\uDD3b'],  // 5
  '\u0632': ['\uD803\uDD0e', '\uD803\uDD3c', '\uD803\uDD3c'],  // 6
  '\u0633': ['\uD803\uDD0f', '\uD803\uDD3d', '\uD803\uDD3d'],  // 7
  '\u0634': ['\uD803\uDD10', '\uD803\uDD3e', '\uD803\uDD3e'],  // 8
  '\u0635': ['\uD803\uDD0d', '\uD803\uDD3f', '\uD803\uDD3f'],  // 9
  '\u0636': ['\uD803\uDD0b', '\u003a', ':'],  // colon
  '\u0637': ['\uD803\uDD04', '\ud803\udd1f', '\ud803\udd34'],  // semicolon
  '\u0638': ['\uD803\uDD1c', '\ud803\udd13', '<'],  // <
  '\u0639': ['\uD803\uDD1b', '\u003d', '='],  // =
  '\u063a': ['\uD803\uDD12', '\ud803\udd12', '>'],  // >
  '\u0641': ['\uD803\uDD09', '\u003f', '?'],  // ?
  '\u0642': ['\uD803\uDD1a', '-', '\ud803\udd33\ud803\udd05'],  // @
  '\u0643': ['\ud803\udd11', '\ud803\udd33\ud803\udd05', '\ud803\udd03'],  // A
  '\u0644': ['\uD803\uDD13', '\uD803\uDD41', '\ud803\udd43'],  // B
  '\u0645': ['\uD803\uDD1d', '', '\ud803\udd33\ud803\udd26'],  // C
  '\u0646': ['\uD803\uDD15', '\uD803\uDD2c', '\ud803\udd32'],  // D
  '\u0647': ['\uD803\uDD07', '\uD803\uDD2a', '\uD803\uDD33\uD803\uDD04'],  // E
  '\u0648': ['\ud803\udd16', '\ud803\udd00', '\uD803\uDD33\uD803\uDD06'],  // F
  '\u0649': ['\ud803\udd1f\u065c', '\ud803\udd01\ud803\udd28', '\uD803\udd06'],  // G
  '\u064a': ['\uD803\uDD18', '\uD803\uDD33\ud803\udd26', '\ud803\udd30'],  // H
  '\u064b': ['\uD803\uDD24', '\uD803\uDD27', '\ud803\udd2e'],  // I
  '\u064c': ['\ud803\udd23', '\ud803\udd33\ud803\udd1a', '\ud803\udd07'],  // K
  '\u064d': ['\ud803\udd25', '\ud803\udd33\ud803\udd22\ud803\udd2a', '\ud803\udd08'],  // L
  '\u064e': ['\uD803\uDD26', '\uD803\uDD24', '\ud803\udd09'],  // M
  '\u064f': ['\uD803\uDD1f', '\uD803\uDD33\ud803\udd26\ud803\udd2a', '\ud803\udd0a'],  //N
  '\u0650': ['\uD803\uDD14', '\uD803\uDD28', '\ud803\udd0b'],  // O
  '\u0651': ['\uD803\uDD27', '\uD803\uDD2d', '\ud803\udd0c'],  //P
  '\u0652': ['\uD803\uDD23', '\uD803\uDD33\uD803\uDD03', '\ud803\udd0d'],  //Q
  '\u0660': ['\ud803\udd30', '\ud803\udd33\ud803\udd04', '\ud803\udd0e'],  // R
  '\u0661': ['\uD803\uDD31', '\uD803\uDD01', '\ud803\udd0f'],  // S
  '\u0662': ['\uD803\uDD32', '\uD803\uDD26', '\ud803\udd10'],  //T
  '\u0663': ['\uD803\uDD33', '\uD803\uDD34', '\ud803\udd11'],  // U
  '\u0664': ['\uD803\uDD34', '\ud803\udd33\uD803\uDD20', '\ud803\udd12'],  // V
  '\u0665': ['\uD803\uDD35', '\uD803\uDD31', '\ud803\udd13'],  //W
  '\u0666': ['\uD803\uDD36', '\uD803\uDd2c', '\ud803\udd14'],  // X
  '\u0667': ['\uD803\uDD37', '\uD803\uDD33\uD803\uDD06', '\ud803\udd15'],  //Y
  '\u0668': ['\ud803\udd38', '\ud803\udd05', '\ud803\udd16'],  // Z
  '\u0669': ['\ud803\udd39', '[', '['],  // [

  '\u06cc': ['\ud803\udd1f\u065c', '\ud803\udd13\u065c', '\ud803\udd0e'],  // R

  '\u06f0': ['\ud803\udd30', '\ud803\udd30', '\ud803\udd0e'],  // R
  '\u06f1': ['\uD803\uDD31', '\uD803\uDD31', '\ud803\udd0f'],  // S
  '\u06f2': ['\uD803\uDD32', '\uD803\uDD32', '\ud803\udd10'],  //T
  '\u06f3': ['\uD803\uDD33', '\uD803\uDD33', '\ud803\udd11'],  // U
  '\u06f4': ['\uD803\uDD34', '\ud803\udd34', '\ud803\udd12'],  // V
  '\u06f5': ['\uD803\uDD35', '\uD803\uDD35', '\ud803\udd13'],  //W
  '\u06f6': ['\uD803\uDD36', '\uD803\uDd36', '\ud803\udd14'],  // X
  '\u06f7': ['\uD803\uDD37', '\uD803\uDD37', '\ud803\udd15'],  //Y
  '\u06f8': ['\ud803\udd38', '\ud803\udd38', '\ud803\udd16'],  // Z
  '\u06f9': ['\ud803\udd39', '\ud803\udd39', '['],  // [
};

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

  // TODO: Fix these for Rohingya.

  // Next, move some code points in context to get proper Unicode ordering.
  // Vowel sign to right of consonants:
  ePattern = /\uD803\uDD2c\uD803([\uDD03-\uDD26])/gi;
  eReplace = "\uD803$1\uD803\uDD2c";
  var newText = outtext.replace(ePattern, eReplace);

  // Move the eVowel over a virama.
  viramaEPattern = /\ud803([\udd01\udd27-\udd34])\ud803\udd33\ud803([\uDD03-\uDD26])/gi;
  viramaEReplace = "\ud803\udd33\ud803$2\ud803$1";
  var result = newText.search(viramaEPattern);
  while (result >= 0) {
    newText = newText.replace(viramaEPattern, viramaEReplace);
    result = newText.search(viramaEPattern);
  }

  dotPattern = /\ud803([\udd41\udd42])\ud803\udd01/gi;
  dotReplace = "\ud803\udd01\ud803$1";
  newText = newText.replace(dotPattern, dotReplace);

  // Replace CHAKMA VOWEL SIGN O + CHAKMA VOWEL SIGN AI with
  //    CHAKMA VOWEL SIGN OI + CHAKMA O MARK
  oIPattern = /\ud803\udd2e\ud803\udd2d/gi;
  oIReplace = "\ud803\udd30\ud803\udd31";
  newText = newText.replace(oIPattern, oIReplace);

  // Replace
  //
  uIPattern = /\ud803\udd2a\ud803\udd2d/gi;
  uIReplace = "\ud803\udd2d\ud803\udd2a";
  newText = newText.replace(uIPattern, uIReplace);

  // Replace
  //
  iZPattern = /\ud803\udd27\ud803\udd33\ud803\udd20/gi;
  iZReplace = "\ud803\udd33\ud803\udd20\ud803\udd27";
  newText = newText.replace(iZPattern, iZReplace);

  iGraveZPattern = /\ud803\udd27\ud803\udd01\ud803\udd33\ud803\udd20/gi;
  iGraveZReplace = "\ud803\udd33\ud803\udd20\ud803\udd27\ud803\udd01";
  newText = newText.replace(iGraveZPattern, iGraveZReplace);

  deRPattern = /\ud803\udd28\ud803\udd33\ud803\udd22/gi;
  deRReplace = "\ud803\udd33\ud803\udd22\ud803\udd28";
  newText = newText.replace(deRPattern, deRReplace);

  // Reorder with 11101.
  onePattern = /\ud803\udd01\ud803([\udd28])/gi;
  oneReplace = "\ud803$1\ud803\udd01";
  newText = newText.replace(onePattern, oneReplace);


  // Fix some modifiers after a space, newline or left parent.
  spaceModPattern = /([\u000a\u0020]|\u0020\u0040)\ud803([\udd00\udd27-\udd34])/gi;
  spaceModReplace = "\ud803$2$1";
  newText = newText.replace(spaceModPattern, spaceModReplace);

  // Fix some virama followed by space or new line.
  viramaSpacePattern = /\ud803\udd33([\u000a\u0020])\ud803([\udd05])/gi;
  viramaSpaceReplace = "\ud803\udd33\ud803$2$1";
  newText = newText.replace(viramaSpacePattern, viramaSpaceReplace);

  // Space modifier space
  spaceModSpacePattern = /\u0020\ud803([\udd00])\u0020/gi;
  spaceModSpaceReplace = "\ud803$1\u0020";
  newText = newText.replace(spaceModSpacePattern, spaceModSpaceReplace);

  // Virama pattern after space.
  spaceModSpacePattern = /\u0020\ud803\udd33\ud803([\uDD03-\uDD26])/gi;
  spaceModSpaceReplace = "\ud803\udd33\ud803$1\u0020";
  newText = newText.replace(spaceModSpacePattern, spaceModSpaceReplace);

  // Diacritics 131 before 130 space.
  spaceModSpacePattern = /\ud803\udd31\ud803\udd30/gi;
  spaceModSpaceReplace = "\ud803\udd30\ud803\udd31";
  newText = newText.replace(spaceModSpacePattern, spaceModSpaceReplace);

  // TODO: Run some reorderings again, e.g., 11131 11127

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
