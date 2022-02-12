// Mappings for Western and Eastern Cham font encodings
const langConverter = new langConverterClass('chr', 'Cherokee');

var map_encoding_names = [
  'Syllabary'
];

langConverter.encoding_data = {
  'Noto Sans Cherokee': {index:0, outputEncoding:'Unicode', outputScript:'Latn'}
  };

private_use_map_combined = {
  'Ꭰ': ['a'],
  'Ꭱ': ['e'],
  'Ꭲ': ['i'],
  'Ꭳ': ['o'],
  'Ꭴ': ['u'],
  'Ꭵ': ['v'],
  'Ꭶ': ['ga'],
  'Ꭷ': ['ka'],
  'Ꭸ': ['ge'],
  'Ꭹ': ['gi'],
  'Ꭺ': ['go'],
  'Ꭻ': ['gu'],
  'Ꭼ': ['gv'],
  'Ꭽ': ['ha'],
  'Ꭾ': ['he'],
  'Ꭿ': ['hi'],
  'Ꮀ': ['ho'],
  'Ꮁ': ['hu'],
  'Ꮂ': ['hv'],
  'Ꮃ': ['la'],
  'Ꮄ': ['le'],
  'Ꮅ': ['li'],
  'Ꮆ': ['lo'],
  'Ꮇ': ['lu'],
  'Ꮈ': ['lv'],
  'Ꮉ': ['ma'],
  'Ꮊ': ['me'],
  'Ꮋ': ['mi'],
  'Ꮌ': ['mo'],
  'Ꮍ': ['mu'],
  'Ꮎ': ['na'],
  'Ꮏ': ['hna'],
  'Ꮐ': ['nah'],
  'Ꮑ': ['ne'],
  'Ꮒ': ['ni'],
  'Ꮓ': ['no'],
  'Ꮔ': ['nu'],
  'Ꮕ': ['nv'],
  'Ꮖ': ['qua'],
  'Ꮗ': ['que'],
  'Ꮘ': ['qui'],
  'Ꮙ': ['quo'],
  'Ꮚ': ['quu'],
  'Ꮛ': ['quv'],
  'Ꮜ': ['sa'],
  'Ꮝ': ['s'],
  'Ꮞ': ['se'],
  'Ꮟ': ['si'],
  'Ꮠ': ['so'],
  'Ꮡ': ['su'],
  'Ꮢ': ['sv'],
  'Ꮣ': ['da'],
  'Ꮤ': ['ta'],
  'Ꮥ': ['de'],
  'Ꮦ': ['te'],
  'Ꮧ': ['di'],
  'Ꮨ': ['ti'],
  'Ꮩ': ['do'],
  'Ꮪ': ['du'],
  'Ꮫ': ['dv'],
  'Ꮬ': ['dla'],
  'Ꮭ': ['tla'],
  'Ꮮ': ['tle'],
  'Ꮯ': ['tli'],
  'Ꮰ': ['tlo'],
  'Ꮱ': ['tlu'],
  'Ꮲ': ['tlv'],
  'Ꮳ': ['tsa'],
  'Ꮴ': ['tse'],
  'Ꮵ': ['tsi'],
  'Ꮶ': ['tso'],
  'Ꮷ': ['tsu'],
  'Ꮸ': ['tsv'],
  'Ꮹ': ['wa'],
  'Ꮺ': ['we'],
  'Ꮻ': ['wi'],
  'Ꮼ': ['wo'],
  'Ꮽ': ['wu'],
  'Ꮾ': ['wv'],
  'Ꮿ': ['ya'],
  'Ᏸ': ['ye'],
  'Ᏹ': ['yi'],
  'Ᏺ': ['yo'],
  'Ᏻ': ['yu'],
  'Ᏼ': ['yv'],
  'Ᏽ': ['mv'],
  'ᏸ': ['ye'],
  'ᏹ': ['yi'],
  'ᏺ': ['yo'],
  'ᏻ': ['yu'],
  'ᏼ': ['yv'],
  'ᏽ': ['mv'],
  'ꭰ': ['a'],
  'ꭱ': ['e'],
  'ꭲ': ['i'],
  'ꭳ': ['o'],
  'ꭴ': ['u'],
  'ꭵ': ['v'],
  'ꭶ': ['ga'],
  'ꭷ': ['ka'],
  'ꭸ': ['ge'],
  'ꭹ': ['gi'],
  'ꭺ': ['go'],
  'ꭻ': ['gu'],
  'ꭼ': ['gv'],
  'ꭽ': ['ha'],
  'ꭾ': ['he'],
  'ꭿ': ['hi'],
  'ꮀ': ['ho'],
  'ꮁ': ['hu'],
  'ꮂ': ['hv'],
  'ꮃ': ['la'],
  'ꮄ': ['le'],
  'ꮅ': ['li'],
  'ꮆ': ['lo'],
  'ꮇ': ['lu'],
  'ꮈ': ['lv'],
  'ꮉ': ['ma'],
  'ꮊ': ['me'],
  'ꮋ': ['mi'],
  'ꮌ': ['mo'],
  'ꮍ': ['mu'],
  'ꮎ': ['na'],
  'ꮏ': ['hna'],
  'ꮐ': ['nah'],
  'ꮑ': ['ne'],
  'ꮒ': ['ni'],
  'ꮓ': ['no'],
  'ꮔ': ['nu'],
  'ꮕ': ['nv'],
  'ꮖ': ['qua'],
  'ꮗ': ['que'],
  'ꮘ': ['qui'],
  'ꮙ': ['quo'],
  'ꮚ': ['quu'],
  'ꮛ': ['quv'],
  'ꮜ': ['sa'],
  'ꮝ': ['s'],
  'ꮞ': ['se'],
  'ꮟ': ['si'],
  'ꮠ': ['so'],
  'ꮡ': ['su'],
  'ꮢ': ['sv'],
  'ꮣ': ['da'],
  'ꮤ': ['ta'],
  'ꮥ': ['de'],
  'ꮦ': ['te'],
  'ꮧ': ['di'],
  'ꮨ': ['ti'],
  'ꮩ': ['do'],
  'ꮪ': ['du'],
  'ꮫ': ['dv'],
  'ꮬ': ['dla'],
  'ꮭ': ['tla'],
  'ꮮ': ['tle'],
  'ꮯ': ['tli'],
  'ꮰ': ['tlo'],
  'ꮱ': ['tlu'],
  'ꮲ': ['tlv'],
  'ꮳ': ['tsa'],
  'ꮴ': ['tse'],
  'ꮵ': ['tsi'],
  'ꮶ': ['tso'],
  'ꮷ': ['tsu'],
  'ꮸ': ['tsv'],
  'ꮹ': ['wa'],
  'ꮺ': ['we'],
  'ꮻ': ['wi'],
  'ꮼ': ['wo'],
  'ꮽ': ['wu'],
  'ꮾ': ['wv'],
  'ꮿ': ['ya']
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

// Capitalize at start of sentences?
langConverter.postProcessing = function(text) {

  // Find paragraph boundaries.
  let blocks = text.split("\n");
  // For each block, move over the initial digits and space, then capitalize.
  for (let b in blocks) {
    let block = blocks[b];
    let size = block.length;
    let i = 0;
    let done = false;
    while (i < size && !done) {
      let c = block.charAt(i);
      if (c == ' ' || (c >= '0' && c <= '9')) {
        i++;
      } else {
        // Capitalize this one
        const upper = block.substring(i, i+1).toUpperCase();
        const replaced =
          block.substring(0, i) +
          upper +
          block.substring(i + 2);
        block = replaced;
        done = true;
      }
    }
    blocks[b] = block;
  }
  return blocks.join('\n');
}