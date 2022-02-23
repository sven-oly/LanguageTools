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

capitalizeSentence = function(text) {
    let size = text.length;
    let i = 0;
    let done = false;
    // Skip verse number and spaces to find first word letter.
    while (i < size && !done) {
      let c = text.charAt(i);
      if (c == ' ' || (c >= '0' && c <= '9')) {
        i++;
      } else {
        // Capitalize this one
        const upper = text.substring(i, i+1).toUpperCase();
        const replaced =
          text.substring(0, i) +
          upper +
          text.substring(i + 1);
        text = replaced;
        done = true;
      }
    }
    return text;
}

// Capitalize at start of sentences?
langConverter.postProcessing = function(text) {
  if (text === null || undefined === text) return;

  // Find paragraph boundaries.
  // TODO: Find sentences within paragraphs, too!
  let blocks = text.split("\n");
  // For each block, move over the initial digits and space, then capitalize.
  for (let b in blocks) {
    let block = blocks[b];
    // Are there any ends of sentences in this block? How about questions or exclamations?
    let sentences = block.split('. ')
    for (let s in sentences) {
      sentences[s] = capitalizeSentence(sentences[s]);
    }
    // Rebuild the block.
    blocks[b] = sentences.join('. ');
  }
  result = blocks.join('\n');

  return result;
}


// These are words that were capitalized as names from first 13 chapters of Matthew.
const specialWordsToCapitalize = ['adanelvno', 'adanvdo', 'adina', 'adolehosgisgo', 'agata', 'ageyvno', 'aholino',
'ale', 'amoni', 'amonino', 'anasgidasgvno', 'ani', 'aniqualisino', 'anisgayano', 'anisginano', 'anitsusi',
'aquadilanaloyeno', 'aquayadi', 'aquayadino', 'aseno', 'asequo', 'asgayano', 'asgayasgo', 'asginano', 'asgohitsuquino',
'asiquo', 'awisgini', 'ayadoli', 'ayadoliyuyeno', 'ayelasdisgini', 'ayv', 'ayvyeno', 'dadiloni', 'dadilonino', 'dadiya',
 'damino,', 'deganotsalvno', 'detsayadotsehesdi', 'detseyadotsehesdi', 'dewi', 'dewino', 'didawosgi', 'dideloquasgi',
 'digesgivsiquono', 'dinigadolino', 'dinigatiyano', 'dinigewi', 'diniyoliquo', 'ditsadanvdvli', 'ditsakanvga',
 'dugohvno', 'dulawidvno', 'duleneno', 'dulenvno', 'egimi', 'egimino', 'ehasi', 'ehasino', 'elimi', 'elimino', 'eliqui',
  'elodv', 'elodvno', 'elodvyeno', 'elodvyi', 'emenv.', 'eminidaqui', 'equahami', 'equahami,', 'equaya', 'equayano',
  'esi', 'esigi', 'esigi,', 'esigino', 'esino', 'eso', 'esono', 'etsena,', 'gadoge', 'gaduhv', 'gaduhvno', 'gago',
  'gagoge', 'gagono', 'galitsodeno', 'galoneda', 'galonedv,', 'galonedv.', 'galvladisgini', 'galvladiyeno',
  'galvquodiyu', 'gehino', 'gelili', 'gelili,', 'gequani', 'getsinugowisvno', 'gila', 'gilaquono', 'gilo', 'gilono',
  'gilosgini', 'giloyeno', 'gomali,', 'gvniyuquo', 'gvniyuquono', 'gvwasdawadodohino', 'hesigaya', 'hesigayano', 'hia',
  'hiage', 'hiano', 'hiayeno', 'hinegvyeno', 'hnanano', 'hnaquale', 'hnaquo', 'hnaquono', 'hnawono', 'iga',
  'igvyisgini', 'igvyiyi', 'igvyu', 'ilaya', 'ilayadi', 'ilayadino', 'ilayagimi', 'ilayagimino', 'iliesa', 'iliesano',
  'ilvhitlvno', 'inadv', 'isaya', 'isaya,', 'isgoniditlvno', 'isilami', 'isilamino', 'isili', 'isiliyi', 'isiliyi,',
  'isiliyi.', 'itsadvganvhi', 'itsaisvno', 'itsaliheligesdi', 'itsenasgini,', 'itsesgini', 'itseyataheadi',
  'itsinanugowayogo', 'itsinegvsgini', 'itsitayoha,', 'itsiyoga,', 'itsiyv', 'iunenvno', 'iyu', 'iyuno', 'iyusgini',
  'iyusginino', 'iyuyeno', 'kanohedv,', 'lehawi', 'lemayi', 'lequiyano', 'letsili', 'loquoma', 'loquomano', 'lusi',
  'meli', 'madani', 'madanino', 'madu', 'maduno', 'mamani', 'manasi', 'manasino', 'meli', 'meli,', 'mosi', 'nahiyu',
  'nahna', 'nahnano', 'nahnayeno', 'nanivno', 'nanivyeno', 'naselidino', 'nasgi', 'nasgino', 'nasgisgini', 'nasgiyeno',
  'nasoni', 'nasonino', 'nasquosgini', 'nidadodaquisv', 'nigadvno', 'nigadvyeno', 'nigav', 'nigavsgini', 'nihi',
  'nihino', 'nihisgini', 'nulaquo', 'nusdv', 'nvgasgohino', 'nvwadaleno', 'ogidoda', 'oquedi', 'oquedino', 'osaya',
  'osayano', 'osdv', 'osiyu', 'quelisi', 'quelisino', 'quida', 'quiligino,', 'quosi', 'quosino', 'sadoni,',
  'saladayili', 'saladayilino', 'salima', 'salimano', 'sameli', 'sawani', 'sawanino', 'sedani', 'sedani,', 'sedogi',
  'sedogino', 'sela', 'sidoni,', 'siliyi', 'sodami', 'sodamiyi,', 'solimanv', 'solimanvno', 'solimonv', 'solimonv.',
  'taya', 'tegaqui', 'tema', 'tlasgi', 'tlasgini', 'tlasgo', 'tlaso', 'tlesdi', 'tlugv', 'tsagvwiyuhi', 'tsani', 'tsani',
  'tsani.', 'tsanino', 'tsaniyeno', 'tsatlonasdi!', 'tsatseligayeno', 'tsegaqui', 'tsegaqui,', 'tsegaquino',
  'tsegonaya', 'tsequalani', 'tsequidi', 'tsesi', 'tsesino', 'tsigo', 'tsilaqueli', 'tsilaquelino', 'tsilusilimi',
  'tsilusilimi,', 'tsimi', 'tsimino', 'tsinitsiyoiyv', 'tsisa', 'tsisa,', 'tsisano', 'tsiyuhino', 'tslamino', 'tsodami',
   'tsodamino', 'tsodani', 'tsodani,', 'tsodanino', 'tsohiyusv', 'tsolami', 'tsona', 'tsona.', 'tsonayeno', 'tsosaya',
   'tsosayano', 'tsosiqua', 'tsosiquano', 'tsowa', 'tsowa,', 'tsowano', 'tsuda', 'tsudano', 'tsudiyi', 'tsudiyi,',
   'tsuduyi,', 'tsunitlvgi', 'udohiyudiyi', 'udohiyuheyayeno', 'udohiyuhiya', 'udohiyuhiyayeno', 'ugvwiyuhi',
   'ugvwiyusesdisgini', 'ulisigv', 'unadvganonelvno', 'unelanvhi', 'unelanvhiyeno', 'unetsvno', 'uninugotsvno,',
   'unitsatino', 'unvsidasdino', 'usdi', 'usvnileno', 'usvno', 'utsadvyeno', 'uwowelanvhiayadolvi', 'uyoiyu', 'uyono',
   'vgvwayetsastanvquono.', 'vtla', 'vtlayeno', 'vv,', 'wasona', 'wasonasgo', 'widusonvno', 'widuyanvhvno', 'yeliquo',
   'yeliquoyeno', 'yitsigadovsesgini', 'yo', 'yulaya', 'yvwi', 'yvwiyeno'];
