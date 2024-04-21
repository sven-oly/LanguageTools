// Prototype for Mende Kikakui, 6-Nov-2018
var BETE_PHONE_LAYOUT = {
  'id': 'betePhone',
  'dir': 'rtl',
  'title': 'Bété Phonetic (PUA)',
  'mappings': {
    ',c': {
      '':  '!{{\ue749}}{{\ue74a}}{{\ue74b}}{{\ue74c}}' +
	  '{{\ue74d}}{{\ue74e}}{{\ue74f}}{{\ue750}}' +
	   '{{\ue751}}{{\ue748}}-=' +
          '{{}}wertyuiop[]\\' +
          'asdfghjkl;\'' +
          '{{}}{{}}cvbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QW{{\ue752}}{{\ue753}}TY{{\ue754}}{{\ue755}}OP{}|' +
          'ASD{{\ue756}}{{\ue757}}H{{\ue758}}{{\ue759}}L:"' +
          'ZXC{{\ue75a}}{{\ue75b}}{{\ue75c}}{{\ue75d}}<>?'
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
    // Based on transliteration of Latin to Bété.
    // Still under construction as of 9-Apr-2020
    'a' : '\ue623',
    'an' : '\ue62c',  // an    'u' : '\ue624',

    'b':  '\ue61b',
    'bi':  '\ue61b',
    'ba':  '\ue600',
    'bu':  '\ue606',
    'bE':  '\ue61e',
    'be':  '\ue602\ue602',
    'bee': '\ue601\ue601',
    'beu': '\ue600\ue600',
    'beu[-\ue74a]': '\ue603',   // "-" or 2
    'bhee':  '\ue614',
    'bheu':  '\ue616',
    'bhi':  '\ue617',
    'bhla':  '\ue622',
    'bhlo':  '\ue620',
    'bhloo[-\ue74a]':  '\ue621',   // "-" or 2
    'bhloo\ue74a':  '\ue621',
    'bho':  '\ue619',
    'bhoo':  '\ue618',
    'bhu':  '\ue62d',
    'bhyi':  '\ue616\ue616',
    'bi':  '\ue604',
    'bo':  '\ue605',
    'boo':  '\ue620',
    'bri':  '\ue60c',
    'bri[-\ue74a]':  '\ue60d\ue60d',   // "-" or 2
    'bra':  '\ue608',
    'bra[-\ue74a]':  '\ue609',   // "-" or 2
    'bre':  '\ue60b',
    'bree':  '\ue60a',
    'bree[-\ue74a]':  '\ue60d',   // "-" or 2
    'bro':  '\ue60f',
    'broe':  '\ue60e\ue60e',
    'broo':  '\ue60e',
    'brou':  '\ue610',
    'bru':  '\ue610',
    'bru[-\ue74a]':  '\ue611',  // "-" or 2
    'brui':  '\ue611\ue611',
    'brui[-\ue74a]':  '\ue612',  // "-" or 2
    'bui':  '\ue607\ue607',
    'byi':  '\ue603\ue603',

    // Many more for the consonants and syllables.
    'coo': '\ue626',
    'cui': '\ue626\ue626',

    'd':  '\ue63e',
    'di':  '\ue63e',
    'da':  '\ue63f',
    'du':  '\ue640',
    'dee':  '\ue628',
    'di':  '\ue62b',
    'djui':  '\ue65f\ue65f',
    'do':  '\ue62e',
    'do[-\ue74a]':  '\ue62f',    // "-" or 2
    'doo':  '\ue62c',
    'doo[-\ue74a]':  '\ue62d',   // "-" or 2
    'dro':  '\ue637',
    'dui':  '\ue62d\ue62d',
    'dwa':  '\ue632',

    'e' : '\ue626',
    'ee' : '\ue625',
    'ei' : '\ue629',  // ei
    'en' : '\ue62d',  // en

    'f':  '\ue65a',
    'fa':  '\ue65b',
    'fan':  '\ue662',
    'fee':  '\ue65d',
    'fe':  '\ue65e',
    'fi':  '\ue65a',
    'foo':  '\ue65f',
    'fo':  '\ue660',
    'fu':  '\ue65c',
    'fua':  '\ue661',

    'g':  '\ue683',
    'gi':  '\ue683',
    'ga':  '\ue684',
    'gba':  '\ue66a',
    'gu':  '\ue65b\ue65b',
    'gee':  '\ue686',
    'gue':  '\ue687',
    'gua':  '\ue688',
    'gb':  '\ue6a6',
    'gbi':  '\ue6a6',
    'gbu':  '\ue6a8',
    'gbee':  '\ue6a9',
    'gbe':  '\ue6aa',
    'gboo':  '\ue6ab',
    'gbo':  '\ue6ac',
    'goo':  '\ue65b',
    'gru': '\ue668',
    'grui': '\ue668\ue668',
    'gu[-\ue74a]': '\ue65f',   // "-" or 2

    'h':  '\ue668',   // HI
    'ha':  '\ue669',  // HA
    'han':  '\ue746',
    'hee':  '\ue66b', // HEE
    'he':  '\ue66c',  // He
    'hi':  '\ue668',  // HI
    'hin':  '\ue671', // HIN
    'hoo':  '\ue66d', // HOO
    'ho':  '\ue66e',  // HO
    'hei':  '\ue66f', // HEI
    'heei':  '\ue66f',// HEEI
    'hoou':  '\ue670',// HOOU
    'hun':  '\ue673', // HUN
    'hen':  '\ue674', // HEN
    'hon':  '\ue675', // HON
    'hu':  '\ue66a',  // HU
    'hua':  '\ue676', // HUAN

    'i' : '\ue622',
    'in' : '\ue62a',  // in
    'inn' : '\ue62b',  // inn

    'j':  '\ue64b',
    'ji':  '\ue64b',
    'ja':  '\ue64c',
    'ju':  '\ue64d',
    'jee':  '\ue64e',
    'je':  '\ue64f',
    'joo':  '\ue650',
    'jo':  '\ue651',
    'jjo':  '\ue652',
    'jol':  '\ue652',
    'Jo':  '\ue652',
    'JO':  '\ue652',

    'k':  '\ue600',
    'ki':  '\ue600',  // ki
    'ka':  '\ue601',  // ka
    'ku':  '\ue602',  // ku
    'ke':  '\ue604',  // ke
    'ko':  '\ue606',  // ko
    'kee':  '\ue603',  // ke + e -> kee
    'koo':  '\ue605',  // ko + o -> koo
    'kua':  '\ue607',  // kua
    'kp':  '\ue69f',
    'kpa':  '\ue6a0',
    'kpu':  '\ue6a1',
    'kpee':  '\ue6a2',
    'kpe':  '\ue6a3',
    'kpi':  '\ue69f',
    'kpoo':  '\ue6a4',
    'kpo':  '\ue6a5',
    'krwa':  '\ue699',

    'l':  '\ue636',
    'li':  '\ue636',
    'la':  '\ue637',
    'lu':  '\ue638',
    'le':  '\ue63a',
    'lee':  '\ue639',
    'loo':  '\ue63b',
    'lo':  '\ue63c',
    'lle':  '\ue63d',  // Long Le
    'Le':  '\ue63d',  // Long Le
    'LE':  '\ue63d',  // Long Le
    'lu':  '\ue6b0',
    'lui[-\ue74a]':  '\ue6b4',  // "-" or 2

    'm':  '\ue614',
    'mi':  '\ue614',
    'ma':  '\ue615',
    'mu':  '\ue616',
    'me':  '\ue617',
    'mo':  '\ue618',
    'mua':  '\ue619',
    'mue':  '\ue61a',

    'mb':  '\ue693',
    'mba':  '\ue694',
    'mbi':  '\ue693',
    'mbe':  '\ue698',
    'mbee':  '\ue696',
    'mbEE':  '\ue697',
    'mbO':  '\ue699',
    'mboo':  '\ue699',
    'mbo':  '\ue69a',
    'mbU':  '\ue69b',
    'mbel':  '\ue69c',  // Long MBE
    'mbOO':  '\ue69d',  // Long MBOO
    'mbOl':  '\ue69d',  // Long MBOO
    'mbol':  '\ue69e',  // Long MBO
    'M[bB]e':  '\ue69c',  // Long MBE
    'M[bB]O':  '\ue69d',  // Long MBOO
    'M[bB]oo':  '\ue69d',  // Long MBOO
    'M[bB]o':  '\ue69e',  // Long MBO
    'mbu':  '\ue695',
    'mbuu':  '\ue69b',

    'n':  '\ue663',
    'na':  '\ue664',
    'ne':  '\ue666',
    'ng':  '\ue745',
    'ngg':  '\ue677',
    'nggi':  '\ue677',
    'ngga':  '\ue678',
    'nggu':  '\ue679',
    'nggE':  '\ue67a',
    'nggee':  '\ue67a',
    'ngge':  '\ue67b',
    'nggO':  '\ue67c',
    'nggoo':  '\ue67c',
    'nggo':  '\ue67d',
    'nggA':  '\ue67e',
    'nggaa':  '\ue67e',
    'nggua':  '\ue67f',
    'nggEE':  '\ue680',
    'nggEl':  '\ue680',
    'nggel':  '\ue680',
    'nggOO':  '\ue681',
    'nggOl':  '\ue681',
    'nggol':  '\ue682',
    'ng':  '\ue689',
    'nge':  '\ue689',
    'ngo':  '\ue68a',
    'ngu':  '\ue68b',
    'nd':  '\ue6ae',
    'ndi':  '\ue6ae',
    'nda':  '\ue6af',
    'ndu':  '\ue6b0',
    'ndee':  '\ue6b1',
    'nde':  '\ue6b2',
    'ndoo':  '\ue6b3',
    'ndo':  '\ue6b4',
    'ni':  '\ue663',
    'nj':  '\ue6b5',
    'nja':  '\ue6b5',
    'nju':  '\ue6b6',
    'njee':  '\ue6b7',
    'njoo':  '\ue6b8',
    'no':  '\ue667',
    'nu':  '\ue665',
    'ny':  '\ue747',
    'nyi':  '\ue6c0',
    'nya':  '\ue6c1',
    'nyu':  '\ue6c2',
    'nye':  '\ue6c3',
    'nyo':  '\ue6c4',

    'o' : '\ue73e',
    'oi' : '\ue743',
    'oo' : '\ue73c',
    'oo-' : '\ue73d',
    'O' : '\ue627',  // oo  ?

    'p':  '\ue68c',
    'pa':  '\ue6d1',
    'pee':  '\ue68f',
    'peu':  '\ue6d1\ue6d1',
    'pe':  '\ue690',
    'pi':  '\ue68c',
    'po':  '\ue692',
    'poo':  '\ue691',
    'pu':  '\ue68e',

    'r':  '\ue6ad',

    's':  '\ue62e',
    'si':  '\ue62e',
    'sa':  '\ue62f',
    'su':  '\ue630',
    'see':  '\ue631',
    'se':  '\ue632',
    'so':  '\ue634',
    'so':  '\ue6f2',  // ???
    'soo':  '\ue633',
    'sia':  '\ue635',

    't':  '\ue644',
    'ta': '\ue6f7',
    'ti': '\ue6fa',
    'te':  '\ue648',
    'tee':  '\ue647',
    'to':  '\ue64a',
    'too':  '\ue649',
    'tre': '\ue702',
    'tu':  '\ue646',

    'ue': '\ue741',
    'uee': '\ue740',
    'ui': '\ue742',

    'v':  '\ue6b9',
    'va':  '\ue6ba',
    've':  '\ue6bd',
    'vee':  '\ue6bc',
    'vi':  '\ue6b9',
    'vO':  '\ue6be', // ???
    'vo':  '\uE70D',
    'voo':  '\uE70C',
    'vu':  '\ue6bb',

    'w':  '\ue608',  // w
    'wa': '\ue740',
    'we': '\ue60c',
    'wei': '\ue610',
    'wee':  '\ue60b',
    'wi':  '\ue608',  // w
    'woo':  '\ue60d',
    'wo':  '\ue60e',
    'wu':  '\ue60a',
    'wui':  '\ue60f',
    'wv':  '\ue611',  // wv
    'wvi':  '\ue611',  // wv
    'wva':  '\ue612',  // wva
    'wve':  '\ue613',  // wve

    'y':  '\ue653',
    'ya':  '\ue654',
    'ye':  '\ue657',
    'yee':  '\ue656',
    'yi':  '\ue653',
    'yo':  '\ue659',
    'yoo':  '\ue658',
    'yu':  '\ue655',

    // Remove ZWNB Space
    '\ufeff([a-zA-Z0-9])': '$1',
  },
  'historyPruneRegex': 'a|an|o|oo|u|ue|' +
      'b|be|beu|bh|bhe|bhl|bho|bhlo|bhloo|bhy|bo|br|bra|bre|bree|bri|bro|bru|brui|bu|by|' +
      'co|cu|' +
      'd|de|dj|dju|do|doo|dr|dru|du|dw|' +
      'e|E|' +
      'f|fa|fe|fo|fu|n|h|' +
      'g|gb|gbe|gbo|ge|go|gr|gru|gu|' +
      'he|hE|hi|ho|hoo|hO|hee|ha|hu|' +
      'i|in|' +
      'j|je|jj|jo|' +
      'k|ke|ko|kp|kpe|kpo|kr|krw|ku|' +
      'l|le|lo|ll|lu|lui|' +
      'm|mb|mbe|mbo|mbE|mbO|mbu|mu|' +
      'nd|nde|ndo|ng|ngg|ngga|ngge|nggE|nggo|nggO|Ngg|NGg|nggu|nj|nje|njo|ny|' +
      'o|oo|' +
      'p|pe|po|' +
      's|se|so|si|' +
      't|te|to|tr|' +
      'v|ve|vo|' +
      'w|we|wo|wu|wv|' +
      'y|ye|yo'
}

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(BETE_PHONE_LAYOUT);
betePhone = BETE_PHONE_LAYOUT;