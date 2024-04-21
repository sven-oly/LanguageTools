// Convert from old font-encoding Rohingya Kuna Leyka and Gonya Lekka
// Noories to Unicode forms:
const langConverter = new langConverterClass('nv', 'Navajo');

// Mappings for both encodings.
langConverter.map_encoding_names = map_encoding_names = [
  'Kuna Leyka', 'Gonya Leyka'];

// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'KunaLeykaNoories': {index:0, outputEncoding:'Unicode', outputScript:'Rohingya'},
    // Are they the same code points?
    'GuynaLeykaNoories': {index:0, outputEncoding:'Unicode', outputScript:'Rohingya'},
};

langConverter.one2oneMap =  private_use_map_combined = {
  '\u0621': ['\ud803\udd1e', '\u0000'],  // null
  '\u0622': ['\ud803\udd00', '\u0009'],  // horizontal tab
  '\u0623': ['\ud803\udd00', '\u0009'],  // horizontal tab
  '\u0624': ['\ud803\udd1e', '\u0000'],  // Carriage return
  '\u0625': ['\ud803\udd00', ' '],  // Space
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

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);
