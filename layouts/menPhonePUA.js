// Using JG Mende PUA font for Mende Kikakui, 13-Aug-2022
//  Based on observation that Unicode for this script is incomplete
var MEN_PHONE_PUA_LAYOUT = {
  'id': 'menPhonePUA',
  'dir': 'rtl',
  'title': 'Mende Kikakui Phonetic PUA',
  'mappings': {
    ',c': {
      '':  '!{{\uD83A\uDCC7}}{{\uD83A\uDCC8}}{{\uD83A\uDCC9}}{{\uD83A\uDCCa}}' +
	  '{{\uD83A\uDCCb}}{{\uD83A\uDCcc}}{{\uD83A\uDCCd}}{{\uD83A\uDCCe}}' +
	   '{{\uD83A\uDCCf}}0-=' +
          '{{ɛ}}wertyuiop[]\\' +
          'asdfghjkl;\'' +
          '{{}}{{}}ɔvbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'l': { // ZWNB Space before signals to not transform
      '': '`1234567890-=' +
          '{{\ufeffq}}{{\ufeffw}}{{\ufeffe}}{{\ufeffr}}{{\ufefft}}{{\ufeffy}}{{\ufeffu}}{{\ufeffi}}{{\ufeffo}}{{\ufeffp}}[]\\' +
          '{{\ufeffa}}{{\ufeffs}}{{\ufeffd}}{{\ufefff}}{{\ufeffg}}{{\ufeffh}}{{\ufeffj}}{{\ufeffk}}{{\ufeffl}};\'' +
          '{{\ufeffz}}{{\ufeffx}}{{\ufeffc}}{{\ufeffv}}{{\ufeffb}}{{\ufeffn}}{{\ufeffm}},./'
    },
    'sl': {
      '': '~!@#$%^&*()_+' +
          '{{\ufeffQ}}{{\ufeffW}}{{\ufeffE}}{{\ufeffR}}{{\ufeffT}}{{\ufeffY}}{{\ufeffU}}{{\ufeffI}}{{\ufeffO}}{{\ufeffP}}{}|' +
          '{{\ufeffA}}{{\ufeffS}}{{\ufeffD}}{{\ufeffF}}{{\ufeffG}}{{\ufeffH}}{{\ufeffJ}}{{\ufeffK}}{{\ufeffL}}:"' +
          '{{\ufeffZ}}{{\ufeffX}}{{\ufeffC}}{{\ufeffV}}{{\ufeffB}}{{\ufeffN}}{{\ufeffM}}<>?'
    },
  },
  'transform' : {
    // Based on transliteration of Cherokee to English.
    'i' : '\ud83a\udc22',
    'a' : '\ud83a\udc23',
    'u' : '\ud83a\udc24',
    'e' : '\ud83a\udc26',
    'E' : '\ud83a\udc25',  // E -> ee
    //'\ud83a\udc26\u001De' : '\ud83a\udc25',  // ee
    'ee' : '\ud83a\udc25',  // ee
    'o' : '\ud83a\udc28',
    'O' : '\ud83a\udc27',  // oo
    'oo' : '\ud83a\udc27',  // oo
    'ei' : '\ud83a\udc29',  // ei
    'in' : '\ud83a\udc2a',  // in
    'inn' : '\ud83a\udc2b',  // inn
    'an' : '\ud83a\udc2c',  // an
    'en' : '\ud83a\udc2d',  // en

    // Many more for the consonants and syllables.
    'k':  '\ud83a\udc00',
    'ki':  '\ud83a\udc00',  // ki
    'ka':  '\ud83a\udc01',  // ka
    'ku':  '\ud83a\udc02',  // ku
    'ke':  '\ud83a\udc04',  // ke
    'ko':  '\ud83a\udc06',  // ko
    'ke':  '\ud83a\udc03',  // ke + e -> kee
    'kE':  '\ud83a\udc03',  // kE -> kee
    'kO':  '\ud83a\udc05',  // kO -> koo
    'ko':  '\ud83a\udc05',  // ko + o -> koo
    'kua':  '\ud83a\udc07',  // kua

    'w':  '\ud83a\udc08',  // w
    'wi':  '\ud83a\udc08',  // w
    'wa':  '\ud83a\udc09',  // wa
    'wu':  '\ud83a\udc0a',
    'wE':  '\ud83a\udc0b',
    'we':  '\ud83a\udc0c',
    'wee':  '\ud83a\udc0b',
    'wO':  '\ud83a\udc0d',
    'woo':  '\ud83a\udc0d',
    'wo':  '\ud83a\udc0e',
    'wui':  '\ud83a\udc0f',
    'wei':  '\ud83a\udc10',

    'wv':  '\ud83a\udc11',  // wv
    'wvi':  '\ud83a\udc11',  // wv
    'wva':  '\ud83a\udc12',  // wva
    'wve':  '\ud83a\udc13',  // wve

    'm':  '\ud83a\udc14',
    'mi':  '\ud83a\udc14',
    'ma':  '\ud83a\udc15',
    'mu':  '\ud83a\udc16',
    'me':  '\ud83a\udc17',
    'mo':  '\ud83a\udc18',
    'mua':  '\ud83a\udc19',
    'mue':  '\ud83a\udc1a',

    'b':  '\ud83a\udc1b',
    'bi':  '\ud83a\udc1b',
    'ba':  '\ud83a\udc1c',
    'bu':  '\ud83a\udc1d',
    'bE':  '\ud83a\udc1e',
    'bee':  '\ud83a\udc1e',
    'be':  '\ud83a\udc1f',
    'bO':  '\ud83a\udc20',
    'boo':  '\ud83a\udc20',
    'bo':  '\ud83a\udc21',

    's':  '\ud83a\udc2e',
    'si':  '\ud83a\udc2e',
    'sa':  '\ud83a\udc2f',
    'su':  '\ud83a\udc30',
    'sE':  '\ud83a\udc31',
    'see':  '\ud83a\udc31',
    'se':  '\ud83a\udc32',
    'sO':  '\ud83a\udc33',
    'soo':  '\ud83a\udc33',
    'so':  '\ud83a\udc34',
    'sia':  '\ud83a\udc35',

    'l':  '\ud83a\udc36',
    'li':  '\ud83a\udc36',
    'la':  '\ud83a\udc37',
    'lu':  '\ud83a\udc38',
    'lE':  '\ud83a\udc39',
    'lee':  '\ud83a\udc39',
    'le':  '\ud83a\udc3a',
    'lO':  '\ud83a\udc3b',
    'loo':  '\ud83a\udc3b',
    'lo':  '\ud83a\udc3c',
    'lee':  '\ud83a\udc3d',  // Long Le
    'Le':  '\ud83a\udc3d',  // Long Le
    'LE':  '\ud83a\udc3d',  // Long Le

    'd':  '\ud83a\udc3e',
    'di':  '\ud83a\udc3e',
    'da':  '\ud83a\udc3f',
    'du':  '\ud83a\udc40',
    'dE':  '\ud83a\udc41',
    'dee':  '\ud83a\udc41',
    'dO':  '\ud83a\udc42',
    'doo':  '\ud83a\udc42',
    'do':  '\ud83a\udc43',

    't':  '\ud83a\udc44',
    'ti':  '\ud83a\udc44',
    'ta':  '\ud83a\udc45',
    'tu':  '\ud83a\udc46',
    'tE':  '\ud83a\udc47',
    'tee':  '\ud83a\udc47',
    'te':  '\ud83a\udc48',
    'tO':  '\ud83a\udc49',
    'too':  '\ud83a\udc49',
    'to':  '\ud83a\udc4a',

    'j':  '\ud83a\udc4b',
    'ji':  '\ud83a\udc4b',
    'ja':  '\ud83a\udc4c',
    'ju':  '\ud83a\udc4d',
    'jE':  '\ud83a\udc4e',
    'jee':  '\ud83a\udc4e',
    'je':  '\ud83a\udc4f',
    'jO':  '\ud83a\udc50',
    'joo':  '\ud83a\udc50',
    'jo':  '\ud83a\udc51',
    'jjo':  '\ud83a\udc52',
    'jol':  '\ud83a\udc52',
    'Jo':  '\ud83a\udc52',
    'JO':  '\ud83a\udc52',

    'y':  '\ud83a\udc53',
    'yi':  '\ud83a\udc53',
    'ya':  '\ud83a\udc54',
    'yu':  '\ud83a\udc55',
    'yE':  '\ud83a\udc56',
    'yee':  '\ud83a\udc56',
    'ye':  '\ud83a\udc57',
    'yO':  '\ud83a\udc58',
    'yoo':  '\ud83a\udc58',
    'yo':  '\ud83a\udc59',

    'f':  '\ud83a\udc5a',
    'fi':  '\ud83a\udc5a',
    'fa':  '\ud83a\udc5b',
    'fu':  '\ud83a\udc5c',
    'fE':  '\ud83a\udc5d',
    'fee':  '\ud83a\udc5d',
    'fe':  '\ud83a\udc5e',
    'fO':  '\ud83a\udc5f',
    'foo':  '\ud83a\udc5f',
    'fo':  '\ud83a\udc60',
    'fua':  '\ud83a\udc61',
    'fan':  '\ud83a\udc62',

    'n':  '\ud83a\udc63',
    'ni':  '\ud83a\udc63',
    'na':  '\ud83a\udc64',
    'nu':  '\ud83a\udc65',
    'ne':  '\ud83a\udc66',
    'no':  '\ud83a\udc67',

    'h':  '\ud83a\udc68',   // HI
    'hi':  '\ud83a\udc68',  // HI
    'ha':  '\ud83a\udc69',  // HA
    'hu':  '\ud83a\udc6a',  // HU
    'hE':  '\ud83a\udc6b',  // HEE
    'hee':  '\ud83a\udc6b', // HEE
    'he':  '\ud83a\udc6c',  // He
    'hO':  '\ud83a\udc6d',  // HOO
    'hoo':  '\ud83a\udc6d', // HOO
    'ho':  '\ud83a\udc6e',  // HO
    'hei':  '\ud83a\udc6f', // HEI
    'hEi':  '\ud83a\udc6f', // HEEI
    'heei':  '\ud83a\udc6f',// HEEI
    'hOu':  '\ud83a\udc70', // HOOU
    'hoou':  '\ud83a\udc70',// HOOU
    'hin':  '\ud83a\udc71', // HIN
    'han':  '\ud83a\udc72', // HAN
    'hun':  '\ud83a\udc73', // HUN
    'hen':  '\ud83a\udc74', // HEN
    'hon':  '\ud83a\udc75', // HON
    'hua':  '\ud83a\udc76', // HUAN

    'ngg':  '\ud83a\udc77',
    'nggi':  '\ud83a\udc77',
    'ngga':  '\ud83a\udc78',
    'nggu':  '\ud83a\udc79',
    'nggE':  '\ud83a\udc7a',
    'nggee':  '\ud83a\udc7a',
    'ngge':  '\ud83a\udc7b',
    'nggO':  '\ud83a\udc7c',
    'nggoo':  '\ud83a\udc7c',
    'nggo':  '\ud83a\udc7d',
    'nggA':  '\ud83a\udc7e',
    'nggaa':  '\ud83a\udc7e',
    'nggua':  '\ud83a\udc7f',
    'nggEE':  '\ud83a\udc80',
    'nggEl':  '\ud83a\udc80',
    'nggel':  '\ud83a\udc80',
    'nggOO':  '\ud83a\udc81',
    'nggOl':  '\ud83a\udc81',
    'nggol':  '\ud83a\udc82',
    'N[gG][gG]e':  '\ud83a\udc80',
    'N[gG][gG]O':  '\ud83a\udc81',
    'N[gG][gG]oo':  '\ud83a\udc81',
    'N[gG][gG]o':  '\ud83a\udc82',

    'g':  '\ud83a\udc83',
    'gi':  '\ud83a\udc83',
    'ga':  '\ud83a\udc84',
    'gu':  '\ud83a\udc85',
    'gE':  '\ud83a\udc86',
    'gee':  '\ud83a\udc86',
    'gue':  '\ud83a\udc87',
    'gua':  '\ud83a\udc88',

    'ng':  '\ud83a\udc89',
    'nge':  '\ud83a\udc89',
    'ngo':  '\ud83a\udc8a',
    'ngu':  '\ud83a\udc8b',

    'p':  '\ud83a\udc8c',
    'pi':  '\ud83a\udc8c',
    'pa':  '\ud83a\udc8d',
    'pu':  '\ud83a\udc8e',
    'pE':  '\ud83a\udc8f',
    'pee':  '\ud83a\udc8f',
    'pe':  '\ud83a\udc90',
    'pO':  '\ud83a\udc91',
    'poo':  '\ud83a\udc91',
    'po':  '\ud83a\udc92',
    'pɛ':  '\ue00b',
    'pɛɛ':  '\ue00c',
    'pɔ':   '\ue00d',
    'pɔɔ':   '\ue00e',

    'mb':  '\ud83a\udc93',
    'mbi':  '\ud83a\udc93',
    'mba':  '\ud83a\udc94',
    'mbu':  '\ud83a\udc95',
    'mbE':  '\ud83a\udc96',
    'mbee':  '\ud83a\udc96',
    'mbEE':  '\ud83a\udc97',
    'mbe':  '\ud83a\udc98',
    'mbO':  '\ud83a\udc99',
    'mboo':  '\ud83a\udc99',
    'mbo':  '\ud83a\udc9a',
    'mbU':  '\ud83a\udc9b',
    'mbuu':  '\ud83a\udc9b',
    'mbel':  '\ud83a\udc9c',  // Long MBE
    'mbOO':  '\ud83a\udc9d',  // Long MBOO
    'mbOl':  '\ud83a\udc9d',  // Long MBOO
    'mbol':  '\ud83a\udc9e',  // Long MBO
    'M[bB]e':  '\ud83a\udc9c',  // Long MBE
    'M[bB]O':  '\ud83a\udc9d',  // Long MBOO
    'M[bB]oo':  '\ud83a\udc9d',  // Long MBOO
    'M[bB]o':  '\ud83a\udc9e',  // Long MBO

    'kp':  '\ud83a\udc9f',
    'kpi':  '\ud83a\udc9f',
    'kpa':  '\ud83a\udca0',
    'kpu':  '\ud83a\udca1',
    'kpE':  '\ud83a\udca2',
    'kpee':  '\ud83a\udca2',
    'kpe':  '\ud83a\udca3',
    'kpO':  '\ud83a\udca4',
    'kpoo':  '\ud83a\udca4',
    'kpo':  '\ud83a\udca5',

    'gb':  '\ud83a\udca6',
    'gbi':  '\ud83a\udca6',
    'gba':  '\ud83a\udca7',
    'gbu':  '\ud83a\udca8',
    'gbE':  '\ud83a\udca9',
    'gbee':  '\ud83a\udca9',
    'gbe':  '\ud83a\udcaa',
    'gbO':  '\ud83a\udcab',
    'gboo':  '\ud83a\udcab',
    'gbo':  '\ud83a\udcac',

    'r':  '\ud83a\udcad',

    'nd':  '\ud83a\udcae',
    'ndi':  '\ud83a\udcae',
    'nda':  '\ud83a\udcaf',
    'ndu':  '\ud83a\udcb0',
    'ndE':  '\ud83a\udcb1',
    'ndee':  '\ud83a\udcb1',
    'nde':  '\ud83a\udcb2',
    'ndO':  '\ud83a\udcb3',
    'ndoo':  '\ud83a\udcb3',
    'ndo':  '\ud83a\udcb4',

    'nj':  '\ud83a\udcb5',
    'nja':  '\ud83a\udcb5',
    'nju':  '\ud83a\udcb6',
    'njE':  '\ud83a\udcb7',
    'njee':  '\ud83a\udcb7',
    'njO':  '\ud83a\udcb8',
    'njoo':  '\ud83a\udcb8',

    'v':  '\ud83a\udcb9',
    'vi':  '\ud83a\udcb9',
    'va':  '\ud83a\udcba',
    'vu':  '\ud83a\udcbb',
    'vE':  '\ud83a\udcbc',
    'vee':  '\ud83a\udcbc',
    've':  '\ud83a\udcbd',
    'vO':  '\ud83a\udcbe',
    'voo':  '\ud83a\udcbe',
    'vo':  '\ud83a\udcbf',

    'ny':  '\ud83a\udcc0',
    'nyi':  '\ud83a\udcc0',
    'nya':  '\ud83a\udcc1',
    'nyu':  '\ud83a\udcc2',
    'nye':  '\ud83a\udcc3',
    'nyo':  '\ud83a\udcc4',

    // Something for combining numbers?
    '0t':  '\ud83a\udcd0',  // Combining teens
    '0d':  '\ud83a\udcd1',  // Combining tens
    '0c':  '\ud83a\udcd2',  // Combining hundreds
    '0m':  '\ud83a\udcd3',  // Combining thousands
    '0D':  '\ud83a\udcd4',  // Combining ten thousands
    '0C':  '\ud83a\udcd5',  // Combining hundred thousands
    '0M':  '\ud83a\udcd6',  // Combining millions

      // PUA values not in Unicode
      'pI':  '\ue001',
      'pii':  '\ue001',
      'paa':  '\ue003',
      'pA':  '\ue003',
      'pAa':  '\ue004',
      'pAA':  '\ue004', 
      'X':  '\ue006',
      'X':  '\ue007',
      'X':  '\ue008',
      'X':  '\ue009',
      'X':  '\ue00a',
      'X':  '\ue00b',
      'Po':  '\ue00e',
      'wI':  '\ue010',
      'wii':  '\ue010',
      'wA':  '\ue012',
      'waa':  '\ue012',
      'wU':  '\ue014',
      'wuu':  '\ue014',
      'wE':  '\ue016',
      'wee':  '\ue016',
      'wɛɛ':  '\ue018',
      'wɔɔ':  '\ue01a',
      'woo':  '\ue01c',
      'wO':  '\ue01c',
      'X':  '\ue01e',
      'X':  '\ue021',
      'X':  '\ue023',
      'X':  '\ue024',
      'X':  '\ue026',
      'X':  '\ue028',
      'X':  '\ue02a',
      'X':  '\ue02b',
      'X':  '\ue02c',
      'X':  '\ue02d',
      'X':  '\ue02e',
      'X':  '\ue030',
      'X':  '\ue031',
      'X':  '\ue032',
      'X':  '\ue033',
      'X':  '\ue034',
      'X':  '\ue036',
      'X':  '\ue037',
      'X':  '\ue039',
      'X':  '\ue03c',
      'X':  '\ue03e',
      'X':  '\ue040',
      'X':  '\ue042',
      'X':  '\ue045',
      'X':  '\ue047',
      'X':  '\ue048',
      'X':  '\ue04b',
      'X':  '\ue04c',
      'X':  '\ue04e',
      'X':  '\ue051',
      'X':  '\ue052',
      'X':  '\ue054',
      'X':  '\ue057',
      'X':  '\ue059',
      'X':  '\ue05c',
      'X':  '\ue05d',
      'X':  '\ue060',
      'X':  '\ue064',
      'X':  '\ue067',
      'X':  '\ue06a',
      'X':  '\ue06b',
      'X':  '\ue06e',
      'X':  '\ue070',
      'X':  '\ue072',
      'X':  '\ue074',
      'X':  '\ue076',
      'X':  '\ue078',
      'X':  '\ue07a',
      'X':  '\ue07c',
      'X':  '\ue07e',
      'X':  '\ue080',
      'X':  '\ue082',
      'X':  '\ue083',
      'X':  '\ue085',
      'X':  '\ue087',
      'X':  '\ue088',
      'X':  '\ue08a',
      'X':  '\ue08b',
      'X':  '\ue08c',
      'X':  '\ue08e',
      'X':  '\ue090',
      'X':  '\ue092',
      'X':  '\ue093',
      'X':  '\ue094',
      'X':  '\ue095',
      'X':  '\ue096',
      'X':  '\ue097',
      'X':  '\ue099',
      'X':  '\ue09b',
      'X':  '\ue09c',
      'X':  '\ue09d',
      'X':  '\ue09f',
      'X':  '\ue0a1',
      'X':  '\ue0a3',
      'X':  '\ue0a4',
      'X':  '\ue0a6',
      'X':  '\ue0a8',
      'X':  '\ue0a9',
      'X':  '\ue0ab',
      'X':  '\ue0ad',
      'X':  '\ue0b0',
      'X':  '\ue0b2',
      'X':  '\ue0b5',
      'X':  '\ue0b7',
      'X':  '\ue0b9',
      'X':  '\ue0bb',
      'X':  '\ue0bd',
      'X':  '\ue0be',
      'X':  '\ue0c1',
      'X':  '\ue0c3',
      'X':  '\ue0c5',
      'X':  '\ue0c7',
      'X':  '\ue0c9',
      'X':  '\ue0cb',
      'X':  '\ue0cc',
      'X':  '\ue0cd',
      'X':  '\ue0d0',
      'X':  '\ue0d2',
      'X':  '\ue0d4',
      'X':  '\ue0d5',
      'X':  '\ue0d7',
      'X':  '\ue0d9',
      'X':  '\ue0de',
      'X':  '\ue0df',
      'X':  '\ue0e0',
      'X':  '\ue0e3',
      'X':  '\ue0e5',
      'X':  '\ue0e7',
      'X':  '\ue0e9',
      'X':  '\ue0eb',
      'X':  '\ue0ed',
      'X':  '\ue0ee',
      'X':  '\ue0f0',
      'X':  '\ue0f1',
      'X':  '\ue0f3',
      'X':  '\ue0f5',
      'X':  '\ue0f7',
      'X':  '\ue0f9',
      'X':  '\ue0fa',
      'X':  '\ue0fc',
      'X':  '\ue0fe',
      'X':  '\ue100',
      'X':  '\ue102',
      'X':  '\ue104',
      'X':  '\ue106',
      'X':  '\ue108',
      'X':  '\ue10a',
      'X':  '\ue10c',
      'X':  '\ue10e',
      'X':  '\ue110',
      'X':  '\ue113',
      'X':  '\ue115',
      'X':  '\ue11a',
      'X':  '\ue11b',
      'X':  '\ue11e',
      'X':  '\ue120',
      'X':  '\ue121',
      'X':  '\ue124',
      'X':  '\ue126',
      'X':  '\ue129',
      'X':  '\ue12b',
      'X':  '\ue12d',
      'X':  '\ue12e',
      'X':  '\ue131',
      'X':  '\ue135',
      'X':  '\ue137',
      'X':  '\ue139',
      'X':  '\ue13b',
      'X':  '\ue13d',
      'X':  '\ue13f',
      'X':  '\ue146',
      'X':  '\ue148',
      'X':  '\ue149',
      'X':  '\ue14a',
      'X':  '\ue14b',
      'X':  '\ue14c',
      'X':  '\ue14d',
      'X':  '\ue14f',
      'X':  '\ue153',
      'X':  '\ue155',
      'X':  '\ue157',
      'X':  '\ue159',
      'X':  '\ue15b',
      'X':  '\ue15e',
      'X':  '\ue15f',
      'X':  '\ue162',
      
    // Remove ZWNB Space
    '\ufeff([a-zA-Z0-9])': '$1',
  },
  'historyPruneRegex':  'paa|pi|pa|pu|pe|pɛ|pɔ|po|pA|' +
	'k|ke|ko|ku|' +
	'wi|wa|we|wɛ|wo|wɔ|wu|wv|' +
	'mu|b|be|bo|s|se|so|si|le|lo|l|L|' +
	'de|do|t|te|to|j|je|jj|jo|J|y|ye|yo|' +
	'f|fa|fe|fo|fu|n|h|he|hE|hi|ho|hoo|hO|' +
	'hee|ha|hu|ngg|ngga|ngge|nggE|nggo|nggO|Ngg|NGg|nggu|' +
	'g|ge|gu|ng|p|pe|po|mb|' +
	'p|w||m|d|' +
	'mbe|mbo|mbE|mbO|mbu|kp|kpe|kpo|gb|gbe|gbo|' +
	'nd|nde|ndo|nj|nje|njo|v|ve|vo|ny|' +
	'i|in|a|e|o|'
}

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MEN_PHONE_PUA_LAYOUT);
menPhonePUA = MEN_PHONE_PUA_LAYOUT;
