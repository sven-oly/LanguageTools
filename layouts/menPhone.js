//javascript/keyboard/api/layouts/cpp.js
// Copyright 2017 Google Inc.
// All Rights Reserved.

// Prototype for Mende Kikakui, 6-Nov-2018
var MEN_PHONE_LAYOUT = {
  'id': 'menPhone',
  'dir': 'rtl',
  'title': 'Mende Kikakui Phonetic',
  'mappings': {
    ',c': {
      '':  '!{{\uD83A\uDCC7}}{{\uD83A\uDCC8}}{{\uD83A\uDCC9}}{{\uD83A\uDCCa}}{{\uD83A\uDCCb}}{{\uD83A\uDCcc}}{{\uD83A\uDCCd}}{{\uD83A\uDCCe}}{{\uD83A\uDCCf}}0-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'l': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
  },
  'transform' : {
    // Based on transliteration of Cherokee to English.
    'i' : '\ud83a\udc22',
    'a' : '\ud83a\udc23',
    'u' : '\ud83a\udc24',
    'e' : '\ud83a\udc26',
    'E' : '\ud83a\udc25',  // E -> ee
    '\ud83a\udc26\u001De' : '\ud83a\udc25',  // ee
    'o' : '\ud83a\udc28',
    'O' : '\ud83a\udc27',  // oo
    '\ud83a\udc28\u001Do' : '\ud83a\udc27',  // oo
    '\ud83a\udc26\u001Di' : '\ud83a\udc29',  // ei
    '\ud83a\udc22\u001Dn' : '\ud83a\udc2a',  // in
    '\ud83a\udc2a\u001Dn' : '\ud83a\udc2b',
    '\ud83a\udc23\u001Dn' : '\ud83a\udc2c',  // an
    '\ud83a\udc26\u001Dn' : '\ud83a\udc2d',  // en

    // Many more for the consonants and syllables.
    'k':  '\ud83a\udc00',
    '\ud83a\udc00\u001Di':  '\ud83a\udc00',  // ki
    '\ud83a\udc00\u001Da':  '\ud83a\udc01',  // ka
    '\ud83a\udc00\u001Du':  '\ud83a\udc02',  // ku
    '\ud83a\udc00\u001De':  '\ud83a\udc04',  // ke
    '\ud83a\udc00\u001Do':  '\ud83a\udc06',  // ko
    '\ud83a\udc04\u001De':  '\ud83a\udc03',  // ke + e -> kee
    '\ud83a\udc00\u001DE':  '\ud83a\udc03',  // kE -> kee
    '\ud83a\udc00\u001DO':  '\ud83a\udc05',  // kO -> koo
    '\ud83a\udc06\u001Do':  '\ud83a\udc05',  // ko + o -> koo
    '\ud83a\udc02\u001Da':  '\ud83a\udc07',  // kua

    'w':  '\ud83a\udc08',  // w

    '\ud83a\udc08\u001Dv':  '\ud83a\udc11',  // wv
    '\ud83a\udc11\u001Da':  '\ud83a\udc12',  // wva
    '\ud83a\udc11\u001De':  '\ud83a\udc13',  // wve

    'm':  '\ud83a\udc14',
    'b':  '\ud83a\udc1b',
    's':  '\ud83a\udc2e',
    'l':  '\ud83a\udc36',
    'd':  '\ud83a\udc3e',
    't':  '\ud83a\udc44',
    'j':  '\ud83a\udc4b',
    'y':  '\ud83a\udc53',
    'f':  '\ud83a\udc5a',
    'n':  '\ud83a\udc63',
    'h':  '\ud83a\udc68',
    'nng':  '\ud83a\udc77',
    'g':  '\ud83a\udc83',
    'ng':  '\ud83a\udc89',
    'p':  '\ud83a\udc8c',
    'mb':  '\ud83a\udc93',
    'kp':  '\ud83a\udc9f',
    'gb':  '\ud83a\udca6',
    'r':  '\ud83a\udcad',
    'nd':  '\ud83a\udcae',
    'nj':  '\ud83a\udcb5',

    'v':  '\ud83a\udcb9',
    'va':  '\ud83a\udcba',
    'vu':  '\ud83a\udcbb',
    'vE':  '\ud83a\udcbc',
    've':  '\ud83a\udcbd',
    'vO':  '\ud83a\udcbe',
    'vo':  '\ud83a\udcbf',

    'ny':  '\ud83a\udcc0',
    'nya':  '\ud83a\udcc1',
    'nyu':  '\ud83a\udcc2',
    'nye':  '\ud83a\udcc3',
    'nyo':  '\ud83a\udcc4',

    // Something for combining numbers?
    '0t':  '\ud83a\udcd0',  // Combining teens?
  },
  'historyPruneRegex': 'n|ng|ngg|ny|m|v'
}

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MEN_PHONE_LAYOUT);
