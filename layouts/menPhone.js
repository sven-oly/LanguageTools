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
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{\ud81a\udef2}}{{\ud81a\udef3}}{{\ud81a\udef4}}{{\ud81a\udef0}}{{\ud81a\udef1}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}'
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
    '\ud83a\udc26\u001De' : '\ud83a\udc25',  // ee
    'o' : '\ud83a\udc28',
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
    '\ud83a\udc04\u001De':  '\ud83a\udc03',  // kee
    '\ud83a\udc06\u001Do':  '\ud83a\udc05',  // koo
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
  },
}

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MEN_PHONE_LAYOUT);
